import { useEffect, useState } from "react";

import styles from "./Notification.module.css";
import Portal from "../../hoc/Portal";

const Notification = (props) => {
    const [gone, setGone] = useState(false);
    const lastTime = props.lastTime ? props.lastTime : 3000;

    useEffect(() => {
        setTimeout(() => {
            setGone(true);
        }, lastTime);
    }, [lastTime]);

    return (
        <Portal>
            <div
                className={`${styles.notification} ${gone ? styles.gone : ""}`}
            >
                {props.children}
            </div>
        </Portal>
    );
};

export default Notification;
