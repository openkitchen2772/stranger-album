import LoginForm from "../../components/Login/LoginForm";

const Login = ({ authAPIKey }) => {
    return <LoginForm authAPIKey={authAPIKey} />;
};

export const getStaticProps = () => {
    return {
        props: {
            authAPIKey: process.env.GOOGLE_API_KEY,
        },
        revalidate: 2,
    };
};

export default Login;
