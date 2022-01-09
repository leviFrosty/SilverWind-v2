import Stripe from "stripe";
import {
  FREE_STANDARD_SHIPPING_ID,
  FREE_STANDARD_SHIPPING_ORDER_MIN,
  FREE_EXPRESS_SHIPPING_ORDER_MIN,
  UPS_NEXT_DAY_AIR_ID,
  USPS_FIRST_CLASS_ID,
  USPS_PRIORTY_MAIL_ID,
  FREE_EXPRESS_SHIPPING_ID,
} from "../../../../lib/PRODUCT_KEYS";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    let freeStandardShipping = false;
    let freeExpressShipping = false;
    try {
      let totalCost = 0;
      for (const product of req.body.items) {
        const { unit_amount } = await stripe.prices.retrieve(product.price);
        const productTotalCost = unit_amount * product.quantity;
        totalCost = totalCost + productTotalCost;
      }
      if (totalCost > FREE_STANDARD_SHIPPING_ORDER_MIN) {
        freeStandardShipping = true;
      }
      if (totalCost > FREE_EXPRESS_SHIPPING_ORDER_MIN) {
        freeExpressShipping = true;
      }
      console.log(`🤑 Total: ${totalCost}`);
    } catch (err) {
      console.log(err);
    }

    console.log("STRIPE CUSTOMER ID:", req.body.stripeCustomerId);

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        line_items: req?.body?.items ?? [],
        customer: req.body.stripeCustomerId,
        success_url: `${req.headers.origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cart`,
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          {
            shipping_rate: freeStandardShipping
              ? FREE_STANDARD_SHIPPING_ID
              : USPS_FIRST_CLASS_ID,
          },
          {
            shipping_rate: freeExpressShipping
              ? FREE_EXPRESS_SHIPPING_ID
              : USPS_PRIORTY_MAIL_ID,
          },
          { shipping_rate: UPS_NEXT_DAY_AIR_ID },
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
