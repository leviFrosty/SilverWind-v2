import * as admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";

const { private_key } = JSON.parse(process.env.ADMIN_PRIVATE_KEY);

// Init firebase admin sdk
const ADMIN_FIREBASE_CREDS: ServiceAccount = {
  projectId: process.env.ADMIN_PROJECT_ID,
  privateKey: private_key,
  clientEmail: process.env.ADMIN_CLIENT_EMAIL,
};
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(ADMIN_FIREBASE_CREDS),
    databaseURL: "https://silverwind-ca60d.firebaseio.com",
  });
}
export default admin;
