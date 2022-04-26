import Image from "next/image";

import styles from "./Logo.module.css";
import LogoImage from "../../../public/Logo.png";

const Logo = () => {
    return (
        <div className={styles.logo}>
            {/* <Image src={LogoImage} width="120" height="120" alt="Logo" /> */}
            <div className={styles.caption}>
                Stranger Album
            </div>
        </div>
    );
};

export default Logo;
