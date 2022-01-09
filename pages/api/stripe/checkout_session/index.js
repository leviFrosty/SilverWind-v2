import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      let totalCost = 0;
      for (const product of req.body.items) {
        const { unit_amount } = await stripe.prices.retrieve(product.price);
        const productTotalCost = unit_amount * product.quantity;
        totalCost = totalCost + productTotalCost;
      }
      console.log(`🤑 Total: ${totalCost}`);
    } catch (err) {
      console.log(err);
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req?.body?.items ?? [],
        success_url: `${req.headers.origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          { shipping_rate: "shr_1KG6p8LnQbDSCNA3drFPUER6" },
          { shipping_rate: "shr_1KG6mPLnQbDSCNA3yzBkSVQd" },
          { shipping_rate: "shr_1KG78iLnQbDSCNA3QVnvUhDC" },
        ],
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
  }
}
