const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const axios = require("axios");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;
  const customer = await stripe.customers.create({
    email,
    description: "My First Test Customer (created for API docs)",
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

  res.json(customer);
});

app.post("/api/checkout_session", async (req, res) => {});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
