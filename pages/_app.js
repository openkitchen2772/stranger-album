import Head from "next/head";
import { Provider } from "react-redux";

import "../styles/globals.css";
import Layout from "../components/Layout";
import store from "../store/index";
import Modal from '../components/UI/Modal/Modal';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Ms+Madi&family=Nunito:wght@200&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
