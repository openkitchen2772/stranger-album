import { MongoClient } from "mongodb";

// Potentially obsolete, photos data fetching handled by server-side rendering now
//   instead of client side to api interaction

const handler = async (req, res) => {
    if (req.method === "GET") {
        let client;
        try {
            client = await MongoClient.connect(process.env.CONNECTION_URL);

            const db = client.db();
            const collection = db.collection("photos");

            const result = await collection.find({}).toArray();

            res.status(200).json(result);
        } catch (error) {
            console.log(error);
        } finally {
            client.close();
        }
    }
};

export default handler;
