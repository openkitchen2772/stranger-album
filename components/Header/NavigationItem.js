import Link from 'next/link';

import styles from './NavigationItem.module.css';

const NavigationItem = (props) => {
    return (
        <li className={styles.navigationItem}>
            <Link {...props}>{props.children}</Link>
        </li>
    )
}

export default NavigationItem;