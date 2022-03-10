import Stripe from "stripe";
import { buffer } from "micro";
import admin from "../../../lib/fbAdminInstance";

const db = admin.firestore();

// Init stripe admin sdk
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      // 1. Retrieve the event by verifying the signature using the raw body and secret
      const rawBody = await buffer(req);
      const signature = req.headers["stripe-signature"];

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Successfully constructed event
    console.log("✅ Success:", event.id);

    // 2. Handle event type (add business logic here)
    if (event.type === "checkout.session.completed") {
      console.log(`💰  Payment received!`);
      const checkoutSession = event.data.object;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkoutSession.id
      );
      // Loops through each line item to handle Firestore DB product stock and availability
      for (const lineItem of lineItems.data) {
        console.log(`${lineItem} PRICE:`, lineItem.price.product);
        // Retrieves product data from Firestore DB based on lineItem.id (priceId)
        const col = db.collection("products");
        const queryRes = await col.where("priceId", "==", lineItem.id).get();
        const productData = queryRes.docs[0].data();
        // Checks quantity against lineItem.quantity
        const productQuantity = parseInt(productData.quantity);
        const purchasedQuantity = parseInt(lineItem.quantity);
        const productRef = db.collection("products").doc(productData.id);
        // Handles quantity cases based on how much was purchased
        // Merges into existing product data
        if (productQuantity - purchasedQuantity > 0) {
          const res = await productRef.set(
            {
              quantity: productQuantity - purchasedQuantity,
            },
            { merge: true }
          );
        }
        if (productQuantity - purchasedQuantity <= 0) {
          const res = await productRef.set(
            {
              quantity: productQuantity - purchasedQuantity,
              active: false,
            },
            { merge: true }
          );
        }
      }
    } else {
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    // 3. Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
