import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    return isMounted ? createPortal(children, document.querySelector("#portalElement")) : null;
};

export default Portal;
