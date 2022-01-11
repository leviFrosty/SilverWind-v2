const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function GetCustomerOrders(req, res) {
  if (req.method === "POST") {
    const { customer_id } = req.body;
    if (!customer_id) {
      return res.status(400);
    }
    try {
      const { data: paymentsList } = await stripe.paymentIntents.list({
        customer: customer_id,
      });
      let checkout_sessions = [];

      for (let i = 0; i < paymentsList.length; i++) {
        const session = await stripe.checkout.sessions.list({
          payment_intent: paymentsList[i].id,
        });
        checkout_sessions.push(session);
      }
      res.status(200).json(checkout_sessions);
    } catch (err) {
      res.status(400).json(err.message);
    }
  }
}
