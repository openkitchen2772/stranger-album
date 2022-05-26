import { useEffect, useState } from "react";

import styles from "./Notification.module.css";
import Portal from "../../hoc/Portal";

const Notification = ({ show, gone, children }) => {
    let classes = `
        ${styles.notification} 
        ${show ? styles.show : ""} 
        ${gone ? styles.gone : ""}`;

    return (
        <Portal>
            <div className={classes}>{children}</div>
        </Portal>
    );
};

export default Notification;
