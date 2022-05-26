import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./NavigationItem.module.css";

const NavigationItem = ({ href, children }) => {
    const router = useRouter();
    const activePath = router.pathname;

    return (
        <li
            className={`${styles.navigationItem} ${
                activePath === href ? styles.active : ""
            }`}
        >
            <Link href={href}>{children}</Link>
        </li>
    );
};

export default NavigationItem;
