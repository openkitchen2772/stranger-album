import { MongoClient } from "mongodb";
import fs from 'fs';

const handler = async (req, res) => {
    if (req.method === "POST") {
        const {
            imageURL,
            title,
            creator
        } = req.body;

        let client;
        try {
            client = await MongoClient.connect(
                "mongodb+srv://admin:admin@cluster0.sdez4.mongodb.net/albumPhotos?retryWrites=true&w=majority"
            );
    
            const db = client.db();
            const collection = db.collection('photos');
    
            const result = await collection.insertOne({
                imageURL: imageURL,
                title: title,
                creator: creator,
                creationTime: new Date()
            });
    
            const now = new Date();
            fs.appendFile(`${now.getFullYear().toString()}-${now.getMonth().toString()}-${now.getDay().toString()}-log.txt`, result.toString(), (err) => { console.log(err) })
            res.status(201).send('Photo inserted sueccessfully.');
        } catch(error) {
            fs.appendFile(`${now.getFullYear().toString()}-${now.getMonth().toString()}-${now.getDay().toString()}-log.txt`, error, err => { console.log(err) });
            console.log(error);
        } finally {
            client.close();
        }
    }
};

export default handler;
