import styles from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem";

const NavigationItems = () => {
    return (
        <nav className={styles.navigationItems}>
            <ul>
                <NavigationItem href="/">Album</NavigationItem>
                <NavigationItem href="/upload">Upload</NavigationItem>
            </ul>
        </nav>
    );
};

export default NavigationItems;
