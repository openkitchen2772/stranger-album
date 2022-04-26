import { MongoClient } from "mongodb";

const handler = async (req, res) => {
    if (req.method === "GET") {
        let client;
        try {
            client = await MongoClient.connect(
                "mongodb+srv://admin:admin@cluster0.sdez4.mongodb.net/albumPhotos?retryWrites=true&w=majority"
            );

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
