const handler = async (req, res) => {
    if (req.method === "GET") {
        const photoId = req.query.photoId;
        const APIHost = process.env.API_HOST;

        const response = await fetch(`${APIHost}/getComments/${photoId}`, {
            method: "GET",
        });

        console.log(response);

        const comments = await response.json();

        res.status(200).json(comments);
    }
};

export default handler;
