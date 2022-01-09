import Stripe from "stripe";
import { buffer } from "micro";

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
      console.log(event.data.object);
      // Example event object
      const exampleObj = {
        id: 'cs_test_a10SKNQLEra9Jo4DoKadynTTwkAF22juWvLBHbaF68lsG1AHp60oYNLJBN',
        object: 'checkout.session',
        after_expiration: null,
        allow_promotion_codes: null,
        amount_subtotal: 4998,
        amount_total: 5456,
        automatic_tax: { enabled: false, status: null },
        billing_address_collection: null,
        cancel_url: 'http://localhost:3000/cart',
        client_reference_id: null,
        consent: null,
        consent_collection: null,
        currency: 'usd',
        customer: 'cus_Kw2B7nN2cSmrxk',
        customer_details: {
          email: 'chelleas123@gmail.com',
          phone: null,
          tax_exempt: 'none',
          tax_ids: []
        },
        customer_email: null,
        expires_at: 1641853509,
        livemode: false,
        locale: null,
        metadata: {},
        mode: 'payment',
        payment_intent: 'pi_3KG9p4LnQbDSCNA30tlTlESl',
        payment_method_options: {},
        payment_method_types: [ 'card' ],
        payment_status: 'paid',
        phone_number_collection: { enabled: false },
        recovered_from: null,
        setup_intent: null,
        shipping: {
          address: {
            city: 'Louisville',
            country: 'US',
            line1: '702 Yorkwood Place',
            line2: null,
            postal_code: '40223',
            state: 'KY'
          },
          name: 'Levi'
        },
        shipping_address_collection: { allowed_countries: [ 'US' ] },
        shipping_options: [
          {
            shipping_amount: 458,
            shipping_rate: 'shr_1KG6p8LnQbDSCNA3drFPUER6'
          },
          {
            shipping_amount: 849,
            shipping_rate: 'shr_1KG6mPLnQbDSCNA3yzBkSVQd'
          },
          {
            shipping_amount: 4299,
            shipping_rate: 'shr_1KG78iLnQbDSCNA3QVnvUhDC'
          }
        ],
        shipping_rate: 'shr_1KG6p8LnQbDSCNA3drFPUER6',
        status: 'complete',
        submit_type: null,
        subscription: null,
        success_url: 'http://localhost:3000/cart/success?session_id={CHECKOUT_SESSION_ID}',
        total_details: { amount_discount: 0, amount_shipping: 458, amount_tax: 0 },
        url: null
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
