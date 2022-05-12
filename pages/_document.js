import Document, { Head, Main, NextScript, Html } from "next/document";

class DocumentTemplate extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
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
                <Main />
                <div id="portalElement" />
                <NextScript />
            </Html>
        );
    }
}

export default DocumentTemplate;
