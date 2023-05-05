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

  res.json({ email, stripeId: customer.id });
});

app.get("/products", async  (req, res)=>{
  const {data}=await axios.get("http://localhost:4000/products");
  res.json(data)
  
})



app.post("/api/checkout_session", async (req, res) => {
  if(items.length===0){
    return res.status(400).json({message:"No items in cart"})
  }
  if(!email){
    return res.status(400).json({message:"No email provided"})
  }
  if(!customerId){
    return res.status(400).json({message:"No customer id provided"})
  }
const {items, email, customerId}=req.body
  const checkoutObject={
    payment_method_types: ["card"],
    line_items:items,
    metadata:{
      email,
    
    },
    customer:customerId,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/failure",
  }

  const session=await stripe.checkout.sessions.create(checkoutObject)
  res.json({id:session.id})
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
