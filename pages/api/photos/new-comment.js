const handler = async (req, res) => {
    if (req.method === "POST") {
        await fetch("http://localhost:8080/newComment", {
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
