import { useDispatch, useSelector } from "react-redux";

import ImageCard from "./ImageCard";
import styles from "./Album.module.css";
import Modal from "../UI/Modal/Modal";
import PhotoModal from "./PhotoModal/PhotoModal";
import { albumActions, fetchSelectedPhoto } from "../../store/album";

const Album = ({ photos }) => {
    const dispatch = useDispatch();

    const { selectedPhoto, isLoading } = useSelector((state) => {
        return {
            selectedPhoto: state.album.selectedPhoto,
            isLoading: state.album.isLoading,
        };
    });

    const selectPhotoHandler = (photo) => {
        const photoURLChunks = photo.imageURL.split("/");
        const photoId = photoURLChunks[photoURLChunks.length - 1].split(".")[0];

        const photoData = {
            photoId: photoId,
            ...photo,
        };

        dispatch(fetchSelectedPhoto(photoData));
    };

    const closeModalHandler = () => {
        dispatch(albumActions.resetSelectedPhoto());
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
    if (selectedPhoto.url) {
        modalContent = (
            <Modal onClose={closeModalHandler} isLoading={isLoading}>
                <PhotoModal selectedPhoto={selectedPhoto} />
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
