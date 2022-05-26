import React, { useState, useEffect } from "react";
import generateRandomAnimalName from "random-animal-name-generator";

const AuthContext = React.createContext({
    displayName: "",
    tokenId: "",
    initialized: false,
    loginHandler: () => {},
    logonHandler: () => {},
    logoutHandler: () => {},
});

export const AuthProvider = (props) => {
    const [displayName, setDisplayName] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [expireTimerId, setExpireTimerId] = useState(0);
    // true once context initialized
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        initiateAuthContext();
    }, []);

    const initiateAuthContext = async () => {
        const tokenId = localStorage.getItem("AUTH_TOKEN");
        const expireDatetime = localStorage.getItem("AUTH_EXPIRE_DATETIME");

        if (tokenId && expireDatetime) {
            const expireIn = (expireDatetime - new Date().getTime()) / 1000;
            console.log(`expire in: ${expireIn}`);
            if (expireIn > 0) {
                // token not expired yet, auto-login with existing token
                //   intentionally not await since result is not needed
                await loginHandler(tokenId, expireIn);
            } else {
                // token expired
                logoutHandler();
            }
        }

        setInitialized(true);
    };

    const loginHandler = async (tokenId, expireIn) => {
        const expireAt = new Date().getTime() + expireIn * 1000;
        const timer = setTimeout(() => {
            logoutHandler();
        }, expireIn * 1000);

        localStorage.setItem("AUTH_TOKEN", tokenId);
        localStorage.setItem("AUTH_EXPIRE_DATETIME", expireAt);

        const response = await fetch("/api/authenticate/getProfile", {
            method: "POST",
            body: JSON.stringify({
                tokenId: tokenId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const status = response.status;
        if (status === 200) {
            const data = await response.json();
            const account = data.users[0];
            setTokenId(tokenId);
            setExpireTimerId(timer);
            setDisplayName(account.displayName);
        } else {
            // getProfile api response failed due to expired token
            //   clear localStorage to allow users re-login
            logoutHandler();
        }
    };

    const logonHandler = async (tokenId, expireIn) => {
        const randomDisplayName = generateRandomAnimalName();

        const response = await fetch("/api/authenticate/updateProfile", {
            method: "POST",
            body: JSON.stringify({
                tokenId: tokenId,
                name: randomDisplayName,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const status = response.status;
        if (status === 200) {
            await loginHandler(tokenId, expireIn);
        } else {
            const data = await response.json(); 
            console.log(data);
        }
    };

    const logoutHandler = () => {
        clearTimeout(expireTimerId);
        setDisplayName("");
        setTokenId("");
        setExpireTimerId("");
        localStorage.removeItem("AUTH_TOKEN");
        localStorage.removeItem("AUTH_EXPIRE_DATETIME");
    };

    const value = {
        displayName: displayName,
        tokenId: tokenId,
        initialized: initialized,
        loginHandler: loginHandler,
        logonHandler: logonHandler,
        logoutHandler: logoutHandler,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
