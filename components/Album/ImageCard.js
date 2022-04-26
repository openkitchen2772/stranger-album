import styles from "./ImageCard.module.css";

const ImageCard = ({ photo, onSelect }) => {
    return (
        <div className={styles.imageCard} onClick={onSelect.bind(null, photo)}>
            <div className={styles.title}>{photo.title}</div>
            <div className={styles.content}>
                <img src={photo.imageURL} />
            </div>
        </div>
    );
};

export default ImageCard;
