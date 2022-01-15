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
    <div className="border-2 border-violet-100 text-violet-900 w-full max-w-[500px] px-1 overflow-hidden shadow-sm rounded-md">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl">
          Total:{" "}
          <span className="font-bold text-lg">
            ${(checkoutSession.amount_total * 0.01).toFixed(2)}
            {checkoutSession.curreny}
          </span>
        </h2>
        <h3 className="opacity-60 text-sm">
          Payment Status:{" "}
          <span className="uppercase">{checkoutSession.payment_status}</span>
        </h3>
      </div>
      <div>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Shipping:</th>
              <th className="flex justify-end">
                <span className="font-semibold bg-violet-100 rounded-full px-4 py-1">
                  {shippingRateDisplayName}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">
                Deliver to:
              </td>
              <td>{checkoutSession.shipping.name}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">Street:</td>
              <td>{checkoutSession.shipping.address.line1}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">
                Unit / Apt #:
              </td>
              <td>{checkoutSession.shipping.address.line2}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">City:</td>
              <td>{checkoutSession.shipping.address.city}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">State:</td>
              <td>{checkoutSession.shipping.address.state}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">Zip Code:</td>
              <td>{checkoutSession.shipping.address.postal_code}</td>
            </tr>
            <tr>
              <td className="text-right pr-2 opacity-70 text-sm">Country:</td>
              <td>{checkoutSession.shipping.address.country}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
