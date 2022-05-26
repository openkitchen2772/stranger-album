import { useState, useRef, useReducer, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import styles from "./LoginForm.module.css";
import Notification from "../UI/Notification/Notification";
import AuthContext from "../../store/context/auth-context";

const initialState = {
    loading: false,
    isValidForm: false,
    isAuthSuccess: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "START_SUBMIT_FORM":
            return {
                loading: true,
                isValidForm: false,
                isAuthSuccess: false,
            };
        case "FINISH_SUBMIT_FORM":
            return {
                loading: false,
                isValidForm: action.isValidForm,
                isAuthSuccess: action.isAuthSuccess,
            };
        default:
            return state;
    }
};

const LoginForm = ({ authAPIKey }) => {
    const [formState, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();
    const authCtx = useContext(AuthContext);

    const [onLogin, setOnLogin] = useState(true);
    const [showNotification, setShowNotification] = useState(false);
    const [hideNotification, setHideNotification] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        let timer;
        if (showNotification) {
            timer = setTimeout(() => {
                onHideNotification();
            }, 3000);
        }

        return () => {
            clearTimeout(timer);
        };
    });

    // toggle between login and logon form
    const toggleFormHandler = () => {
        setOnLogin(!onLogin);
        onResetNotification();
    };

    const StartSubmitForm = () => {
        dispatch({ type: "START_SUBMIT_FORM" });
    };

    const FinishSubmitForm = (isValidForm, isAuthSuccess) => {
        dispatch({
            type: "FINISH_SUBMIT_FORM",
            isValidForm: isValidForm,
            isAuthSuccess: isAuthSuccess,
        });
        onShowNotification();
    };

    const onShowNotification = () => {
        setShowNotification(true);
        setHideNotification(false);
    };

    const onHideNotification = () => {
        setShowNotification(false);
        setHideNotification(true);
    };

    const onResetNotification = () => {
        setShowNotification(false);
        setHideNotification(false);
    }

    const submitFormHandler = async (event) => {
        event.preventDefault();
        StartSubmitForm();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        // validate form
        const emailRegex = /^\w+@\w+\.[a-z|A-Z]+$/;
        if (email.trim().length === 0 || !emailRegex.test(email)) {
            FinishSubmitForm(false, false);
            return;
        }

        if (password.trim().length === 0) {
            FinishSubmitForm(false, false);
            return;
        }

        let response;
        if (onLogin) {
            response = await fetch("/api/authenticate/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const status = response.status;
            const result = await response.json();
            if (status !== 200) {
                FinishSubmitForm(true, false);
                return;
            }

            await authCtx.loginHandler(
                result.idToken,
                parseInt(result.expiresIn)
            );
        } else {
            response = await fetch("/api/authenticate/logon", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const status = response.status;
            const result = await response.json();
            if (status !== 200) {
                FinishSubmitForm(true, false);
                return;
            }

            await authCtx.logonHandler(
                result.idToken,
                parseInt(result.expiresIn)
            );
        }

        router.push("/");
    };

    return (
        <form onSubmit={submitFormHandler} className={styles.loginForm}>
            <Notification show={showNotification} gone={hideNotification}>
                {!formState.isValidForm && (
                    <span style={{ color: "salmon" }}>
                        Please ensure the email/password entered is valid!
                    </span>
                )}
                {formState.isValidForm && !formState.isAuthSuccess && (
                    <span style={{ color: "salmon" }}>
                        {onLogin
                            ? "Email/password is incorrect!"
                            : "Email is already used!"}
                    </span>
                )}
                {formState.isValidForm && formState.isAuthSuccess && (
                    <span style={{ color: "#08aa20" }}>
                        {onLogin
                            ? "Login success!"
                            : "Registered Successfully!"}
                    </span>
                )}
            </Notification>

            <div className={styles.formControl}>
                <label htmlFor="auth_email">Email</label>
                <input
                    type="text"
                    id="auth_email"
                    ref={emailRef}
                    disabled={formState.loading}
                />
            </div>

            <div className={styles.formControl}>
                <label htmlFor="auth_password">Password</label>
                <input
                    type="password"
                    id="auth_password"
                    minLength={6}
                    ref={passwordRef}
                    disabled={formState.loading}
                />
            </div>

            <div className={styles.buttonControl}>
                <button
                    type="submit"
                    className={styles.authButton}
                    disabled={formState.loading}
                >
                    {onLogin ? "Login" : "Register"}
                </button>
                <button
                    type="button"
                    className={styles.toggleButton}
                    onClick={toggleFormHandler}
                    disabled={formState.loading}
                >
                    {onLogin ? "New User?" : "Already have account?"}
                </button>
            </div>
        </form>
    );
};

export default LoginForm;
