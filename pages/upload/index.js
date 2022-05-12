import UploadForm from "../../components/Upload/UploadForm";

const Upload = () => {
    return <UploadForm />;
};

export default Upload;

export const getStaticProps = () => {
    return {
        props: {},
    };
};
