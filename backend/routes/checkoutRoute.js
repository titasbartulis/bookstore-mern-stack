import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.SK_TEST);

router.post("/", async (request, response) => {
  const items = request.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.stripeId,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.WEB_URL}/home?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.WEB_URL}/home`,
  });

  response.send(JSON.stringify({ url: session.url }));
});

router.get('/confirm', async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    // Perform any additional logic here, such as verifying the session status, etc.

    res.json({
      message: "Payment successful",
      session
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
})

export default router;
