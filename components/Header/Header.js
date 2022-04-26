import styles from './Header.module.css';
import NavigationItems from './NavigationItems';

const Header = () => {
    return (
        <header className={styles.header}>
            <NavigationItems />
        </header>
    )
}

export default Header;