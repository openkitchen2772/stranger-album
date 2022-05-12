const handler = async (req, res) => {
    if (req.method === "GET") {
        const photoId = req.query.photoId;

        const response = await fetch(`http://localhost:8080/getComments/${photoId}`, {
            method: "GET",
        });
        const comments = await response.json();

        res.status(200).json(comments);
    }
};

export default handler;
