import { useState, useMemo } from "react";

import styles from "./UploadForm.module.css";

const uploadImageToImgur = async (formData) => {
    return fetch("https://api.imgur.com/3/image", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Client-ID a3492a5941a6bf8",
        },
    })
        .then((response) => response.json())
        .then(({ data }) => {
            return {
                imageURL: data.link,
                title: data.title,
                creator: "admin",
            };
        });
};

const addNewPhotoAPI = async (imageData) => {
    return fetch("/api/photos/new-photo", {
        method: "POST",
        body: JSON.stringify(imageData),
        headers: {
            "Content-Type": "application/json",
        },
    });
};

const UploadForm = () => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const titleChangedHandler = (event) => {
        setTitle(event.target.value);
    };

    const fileUploadHandler = (event) => {
        setFile(event.target.files[0]);
    };

    const SubmitHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("image", file, file.name);
        formData.append("title", title);

        let imageData = await uploadImageToImgur(formData);
        let response = await addNewPhotoAPI(imageData);
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

    return (
        <div>
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
