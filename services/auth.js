export const requestLoginAPI = async (email, password, authAPIKey) => {
    const apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        authAPIKey;
    const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const requestLogonAPI = async (email, password, authAPIKey) => {
    const apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        authAPIKey;
    const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const requestUpdateProfileAPI = async (tokenId, name, authAPIKey) => {
    const apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
        authAPIKey;
    const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            idToken: tokenId,
            displayName: name,
            photoUrl: "",
            deleteAttribute: [],
            returnSecureToken: true,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};

export const requestGetProfileAPI = async (tokenId, authAPIKey) => {
    const apiURL =
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" +
        authAPIKey;
    const response = await fetch(apiURL, {
        method: "POST",
        body: JSON.stringify({
            idToken: tokenId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response;
};
