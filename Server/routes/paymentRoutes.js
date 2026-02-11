import express from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET)
const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    console.log("body received: ",req.body)
  const { products, quantity } = req.body;

  const lineItems = products.map((product, idx) => {
    const usdPrice = product.price / 133; //convert npr to usd
    return{ 
      price_data: {
      currency: "usd",
      product_data: {
        name: product.title,
        // images: [product.image],
      },
      unit_amount: Math.round(usdPrice * 100), //in cents
    },
    quantity: quantity[idx] || 1, //product.quantity
  }});
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/payment/success",
      cancel_url: "http://localhost:5173/payment/cancel",
    });
  
    return res.json({ id: session.id });
  } catch (error) {
    console.log("stripe error: ",error);
    return res.status(500).json({error: error.message})
  }
});

export default router;
