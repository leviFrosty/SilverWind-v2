const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function GetCustomer(req, res) {
  console.log("recieved request");
  if (req.method === "POST") {
    try {
      const { id } = req.body;
      const customer = await stripe.customers.retrieve(id);
      res.status(200).json(customer);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
  res.status(400);
}
