const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");
const checkId = require("./utils/checkId");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const customer = await stripe.customers.create({
    email,

    address: {
      line1: "510 Townsend St",
      postal_code: "98140",
      city: "San Francisco",
      state: "CA",
      country: "US",
    },
  });

  axios
    .post("http://localhost:5000/users", {
      email,
      password,
      stripeId: customer.id,
    })
    .then((response) => {
      console.log(response.data);
    });

  res.json({ email, stripeId: customer.id });
});

app.get("/products", async (req, res) => {
  const { data } = await axios.get("http://localhost:4000/products");

  res.json(data);
});

app.post("/api/create-product", async (req, res) => {
  const { name, imageURL, productPrice } = req.body;
  if (!name || !imageURL || !productPrice) {
    return res.status(400).json({ message: "Please provide all the fields" });
  }

  // creating the product
  try {
    const product = await stripe.products.create({
      name,
      images: [imageURL],
    });

    // creating the price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: productPrice,

      currency: "usd",
    });
    // This is where you acutally create the product in your database
    await axios.post("http://localhost:4000/products", {
      id: product.id,
      name,
      imageURL,
      quantity: 1,
      price: price.id,
      originalPrice: productPrice,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post("/api/checkout_session", async (req, res) => {
  const { items, email, customerId } = req.body;
  if (items.length === 0) {
    return res.status(400).json({ message: "No items in cart" });
  }
  if (!email) {
    return res.status(400).json({ message: "No email provided" });
  }
  if (!customerId) {
    return res.status(400).json({ message: "No customer id provided" });
  }
  const { data } = await axios.get("http://localhost:4000/products");

  const checkoutObject = {
    payment_method_types: ["card"],
    line_items: items.map((item) => {
      if (checkId(item, data)) {
        return {
          price: item.price,
          quantity: item.quantity,
        };
      }
    }),
    metadata: {
      email,
    },
    customer: customerId,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/failure",
  };

  const session = await stripe.checkout.sessions.create(checkoutObject);
  res.json({ url: session.url });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
