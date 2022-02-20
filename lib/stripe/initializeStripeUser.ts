import axios from "axios";

const initializeStripeUser = async (
  firstName: string,
  lastName: string,
  email: string,
  uid: string
) => {
  let stripeCustomerId: string;
  await axios
    .post("/api/stripe/create-customer", {
      name: `${firstName} ${lastName}`,
      email,
      uid,
    })
    .then((res) => (stripeCustomerId = res.data.id));
  return stripeCustomerId;
};

export default initializeStripeUser;
