const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function CreateCustomer(req, res) {
  if (req.method === "POST") {
    try {
      const { email, name, uid } = req.body;
      const stripeCustomer = await stripe.customers.create({
        email,
        name,
        metadata: {
          firebaseid: uid,
        },
      });
      res.status(200).json(stripeCustomer);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }

  // Send back product information from stripe api in res
}
