import styles from "./Logo.module.css";

const Logo = () => {
    return (
        <div className={styles.logo}>
            <div className={styles.caption}>
                Stranger Album
            </div>
        </div>
    );
};

export default Logo;
