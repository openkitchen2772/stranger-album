const handler = async (req, res) => {
    if (req.method === "POST") {
        const APIHost = process.env.API_HOST;
        await fetch(`${APIHost}/newComment`, {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        res.status(200).send(`Comment (photo id: ${req.body.photoId}) inserted successfully.`);
    }
};

export default handler;
