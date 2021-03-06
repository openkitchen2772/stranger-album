import { MongoClient } from "mongodb";
import fs from "fs";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { id, imageURL, title, creator } = req.body;

        let client;
        try {
            client = await MongoClient.connect(process.env.CONNECTION_URL);

            const db = client.db();
            const collection = db.collection("photos");

            const result = await collection.insertOne({
                id: id,
                imageURL: imageURL,
                title: title,
                creator: creator,
                creationTime: new Date(),
            });

            const now = new Date();
            fs.appendFile(
                `${now.getFullYear().toString()}-${now
                    .getMonth()
                    .toString()}-${now.getDay().toString()}-log.txt`,
                result.toString(),
                (err) => {
                    console.log(err);
                }
            );
            res.status(201).send("Photo inserted sueccessfully.");
        } catch (error) {
            fs.appendFile(
                `${now.getFullYear().toString()}-${now
                    .getMonth()
                    .toString()}-${now.getDay().toString()}-log.txt`,
                error,
                (err) => {
                    console.log(err);
                }
            );
            console.log(error);
        } finally {
            client.close();
        }
    }
};

export default handler;
