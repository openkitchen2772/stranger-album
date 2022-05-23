import { useState, useMemo, useEffect } from "react";

import styles from "./UploadForm.module.css";
import Notification from "../UI/Notification/Notification";

const uploadImageToImgur = async (formData, imgurClientId) => {
    let error, responseStatus;
    const imageData = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Client-ID " + imgurClientId,
        },
    })
        .then((response) => {
            responseStatus = response.status;
            return response.json()
        })
        .then(({ data }) => {
            return {
                id: data.id,
                imageURL: data.link,
                title: data.title,
                creator: "stranger",
            };
        })
        .catch((err) => (error = err));

    if (error || responseStatus !== 200) {
        console.log(responseStatus);
        console.log(error);
        return false;
    }

    // add image data to our mongo DB backend
    const response = await fetch("/api/photos/new-photo", {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status !== 201) {
        console.log(response);
        return false;
    }

    return true;
};

const UploadForm = ({ imgurClientId }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    useEffect(() => {
        let timer;
        if (uploaded) {
            timer = setTimeout(() => {
                setIsUploadSuccess(false);
                setUploaded(false);
            }, 4000);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [uploaded]);

    const titleChangedHandler = (event) => {
        setTitle(event.target.value);
    };

    const fileUploadHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const SubmitHandler = async (event) => {
        event.preventDefault();
        setIsUploadSuccess(false);

        const formData = new FormData();

        formData.append("image", file, file.name);
        formData.append("title", title);

        let uploadSuccess = await uploadImageToImgur(formData, imgurClientId);

        setUploaded(true);
        setIsUploadSuccess(uploadSuccess);
        clearUploadForm();
    };

    const clearUploadForm = () => {
        setTitle("");
        setFile(null);
    };

    let uploadBoxContent = useMemo(() => {
        if (file) {
            return (
                <>
                    <img
                        src={URL.createObjectURL(file)}
                        style={{
                            width: "100%",
                            height: "200px",
                            objectFit: "contain",
                        }}
                        alt="Upload Photo"
                    />
                    <div>{file.name}</div>
                </>
            );
        } else {
            return (
                <>
                    <div>Click to upload the photo you want to share ...</div>
                    <div>(Support all *.jpg *.gif *.png)</div>
                </>
            );
        }
    }, [file]);

    let notificationContent;
    if (uploaded) {
        if (!isUploadSuccess) {
            notificationContent = (
                <Notification lastTime={3000}>
                    <span style={{ color: "red" }}>
                        {"Oh no, something went wrong!"}
                    </span>
                </Notification>
            );
        } else {
            notificationContent = (
                <Notification lastTime={3000}>
                    <span style={{ color: "green" }}>
                        {"Your photo is uploaded! :)"}
                    </span>
                </Notification>
            );
        }
    }

    return (
        <div>
            {notificationContent}
            <form className={styles.uploadForm} onSubmit={SubmitHandler}>
                <div className={styles.formControl}>
                    <label htmlFor="name">Photo Title</label>
                    <input
                        name="name"
                        id="name"
                        type="text"
                        size="30"
                        value={title}
                        onChange={titleChangedHandler}
                        required
                    />
                </div>

                <div className={`${styles.formControl} ${styles.file}`}>
                    <label htmlFor="uploadFile">{uploadBoxContent}</label>
                    <input
                        name="uploadFile"
                        id="uploadFile"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        onChange={fileUploadHandler}
                        required
                    />
                </div>

                <button className={styles.submitButton}>Submit Photo</button>
            </form>
        </div>
    );
};

export default UploadForm;
