import { useContext } from "react";

import styles from "./Header.module.css";
import NavigationItems from "./NavigationItems";
import LoginButton from "../Login/LoginButton/LoginButton";
import AuthContext from "../../store/context/auth-context";

const Header = () => {
    const authCtx = useContext(AuthContext);

    return (
        <header className={styles.header}>
            {authCtx.initialized ? <LoginButton /> : null}
            {authCtx.initialized && authCtx.displayName ? (
                <div className={styles.greet}>Hi, {authCtx.displayName}!</div>
            ) : null}
            <NavigationItems />
        </header>
    );
};

export default Header;
