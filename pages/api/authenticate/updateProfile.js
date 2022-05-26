const handler = async (req, res) => {
    if (req.method === "POST") {
        const apiURL =
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
            process.env.GOOGLE_API_KEY;
        const response = await fetch(apiURL, {
            method: "POST",
            body: JSON.stringify({
                idToken: req.body.tokenId,
                displayName: req.body.name,
                photoUrl: "",
                deleteAttribute: [],
                returnSecureToken: true,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const status = response.status;
        const data = await response.json();
        res.status(status).json(data);
    }
};

export default handler;
