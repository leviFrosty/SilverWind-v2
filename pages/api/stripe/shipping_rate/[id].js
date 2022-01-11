const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function AddStripeProduct(req, res) {
  const id = req.query.id;
  try {
    if (!id.startsWith("shr_")) {
      throw Error("Incorrect checkout session ID");
    }
    const shippingRate = await stripe.shippingRates.retrieve(id);
    res.status(200).json(shippingRate);
  } catch (err) {
    res.status(400).json(err.message);
  }
}
