import Document, { Head, Main, NextScript, Html } from "next/document";

class DocumentTemplate extends Document {
    render() {
        return (
            <Html>
                <Head />
                <Main />
                <div id="portalElement" />
                <NextScript />
            </Html>
        );
    }
}

export default DocumentTemplate;
