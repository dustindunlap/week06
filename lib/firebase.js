let admin = require("firebase-admin");


const serviceAccount = JSON.parse(
    process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATE_KEY
);

try{
    admin.initializeApp(
        {
            credential: admin.credential.cert(serviceAccount),
            databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
        }
    );
} catch(err) {
    console.log("firebase err:", err.stack);
}

export default admin.firestore();