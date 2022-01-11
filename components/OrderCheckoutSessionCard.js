import axios from "axios";
import { useEffect, useState } from "react";
export default function OrderCheckoutSessionCard({ checkoutSession }) {
  const [shippingRateDisplayName, setshippingRateDisplayName] = useState("");

  useEffect(() => {
    axios
      .get(`/api/stripe/shipping_rate/${checkoutSession.shipping_rate}`)
      .then((res) => setshippingRateDisplayName(res.data.display_name))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className="border-2 border-violet-100 text-violet-900">
      <div className="flex flex-row justify-between">
        <h2>
          Total:{" "}
          <span className="font-semibold">
            ${(checkoutSession.amount_total * 0.01).toFixed(2)}
            {checkoutSession.curreny}
          </span>
        </h2>
        <h2>
          Payment Status: <span>{checkoutSession.payment_status}</span>
        </h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Shipping</th>
              <th className="font-semibold">{shippingRateDisplayName}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Deliver to:</td>
              <td>{checkoutSession.shipping.name}</td>
            </tr>
            <tr>
              <td>Street</td>
              <td>{checkoutSession.shipping.address.line1}</td>
            </tr>
            <tr>
              <td>Unit / Apt #</td>
              <td>{checkoutSession.shipping.address.line2}</td>
            </tr>
            <tr>
              <td>City</td>
              <td>{checkoutSession.shipping.address.city}</td>
            </tr>
            <tr>
              <td>State</td>
              <td>{checkoutSession.shipping.address.state}</td>
            </tr>
            <tr>
              <td>Zip Code</td>
              <td>{checkoutSession.shipping.address.postal_code}</td>
            </tr>
            <tr>
              <td>Country</td>
              <td>{checkoutSession.shipping.address.country}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
