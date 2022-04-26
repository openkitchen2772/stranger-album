import Header from './Header/Header';

import styles from './Layout.module.css';

const Layout = (props) => {
    return (
        <main className={styles.layout}>
            <Header />
            <div className={styles.content}>
                {props.children}
            </div>
        </main>
    )
}

export default Layout;