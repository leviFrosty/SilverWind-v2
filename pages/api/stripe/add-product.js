const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function AddStripeProduct(req, res) {
  if (req.method === "POST") {
    const product = req.body;
    const stripeProduct = await stripe.products.create({
      id: product.id,
      name: product.name,
      images: [product.coverPhotoURL, ...product.otherImagesURLs],
      description: product.description,
      shippable: true,
    });
    res.status(200).json(stripeProduct);
  }
}
