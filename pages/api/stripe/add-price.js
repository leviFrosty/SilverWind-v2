const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function AddStripePrice(req, res) {
  if (req.method === "POST") {
    const product = req.body;
    const price = await stripe.prices.create({
      currency: "usd",
      product: product.id,
      unit_amount: getPriceForStripe(product.price),
    });
    res.status(200).json(price);
  }
}
