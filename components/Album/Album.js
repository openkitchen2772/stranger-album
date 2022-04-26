import { useState } from "react";

import ImageCard from "./ImageCard";
import styles from "./Album.module.css";
import Modal from "../UI/Modal/Modal";

const Album = ({ photos }) => {
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const closeModalHandler = () => {
        setSelectedPhoto(null);
    };

    const selectPhotoHandler = (photo) => {
        setSelectedPhoto(photo);
    };

    const albumPhotosContent = photos.map((photo, i) => {
        return (
            <ImageCard
                photo={photo}
                key={`photo_${i}`}
                onSelect={selectPhotoHandler}
            />
        );
    });

    let modalContent;
    if (selectedPhoto) {
        modalContent = (
            <Modal onClose={closeModalHandler}>
                <div className={styles.modalContent}>
                    <h1>{selectedPhoto.title}</h1>
                    <img src={selectedPhoto.imageURL} alt="Photo" />
                    <p>
                        <i>Uploaded By {selectedPhoto.creator}</i>
                    </p>
                </div>
            </Modal>
        );
    }

    return (
        <>
            {modalContent}
            <div className={styles.album}>{albumPhotosContent}</div>
        </>
    );
};

export default Album;
