import styles from "./Modal.module.css";
import Portal from "../../hoc/Portal";
import { useEffect, useState } from "react";

const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onClose} />;
};

const ModalOverlay = (props) => {
    return <div className={styles.modal}>{props.children}</div>;
};

const Modal = (props) => {
    return (
        <Portal>
            <Backdrop onClose={props.onClose} />
            {props.isLoading ? (
                <div className={styles.isLoading}>Loading ...</div>
            ) : (
                <ModalOverlay>{props.children}</ModalOverlay>
            )}
        </Portal>
    );
};

export default Modal;
