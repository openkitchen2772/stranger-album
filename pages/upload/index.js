import Head from "next/head";

import UploadForm from "../../components/Upload/UploadForm";
import LogoImage from "../../public/Logo.png";

const Upload = ({ imgurClientId }) => {
    return (
        <>
            <Head>
                <title>Album Upload</title>
                <meta
                    name="description"
                    content="Upload your photo, stranger! :)"
                />
                <meta name="og:title" content="Stranger Album Upload" />
                <meta
                    name="og:description"
                    content="Upload your photo, stranger! :)"
                />
                <meta name="og:image" content={LogoImage} />
            </Head>
            <UploadForm imgurClientId={imgurClientId} />
        </>
    );
};

export default Upload;

export const getStaticProps = () => {
    return {
        props: {
            imgurClientId: process.env.IMGUR_CLIENT_ID,
        },
    };
};
