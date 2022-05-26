import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/fontawesome-free-solid";

import styles from "./LoginButton.module.css";
import AuthContext from "../../../store/context/auth-context";

const LoginButton = () => {
    const router = useRouter();
    const activePath = router.pathname;
    const authCtx = useContext(AuthContext);

    let buttonContent;
    if (authCtx.tokenId) {
        // show logout button
        buttonContent = (
            <div className={styles.logoutButton} onClick={authCtx.logoutHandler}>
                Logout
            </div>
        );
    } else {
        // show login button
        buttonContent = (
            <Link href="/login">
                <div
                    className={`${styles.loginButton} ${
                        activePath === "/login" ? styles.hide : ""
                    }`}
                >
                    Login
                </div>
            </Link>
        );
    }

    return buttonContent;
};

export default LoginButton;
