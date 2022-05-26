import { Provider } from "react-redux";

import "../styles/globals.css";
import Layout from "../components/Layout";
import store from "../store/index";
import { AuthProvider } from "../store/context/auth-context";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <AuthProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </AuthProvider>
        </Provider>
    );
}

export default MyApp;
