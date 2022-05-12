import Image from "next/image";

import styles from "./ImageCard.module.css";

const ImageCard = ({ photo, onSelect }) => {
    return (
        <div className={styles.imageCard} onClick={onSelect.bind(null, photo)}>
            <div className={styles.title}>{photo.title}</div>
            <div className={styles.content}>
                {/* 
                    next/Image layout fill adding following properties to img:
                        - position: absolute
                        - min-height, min-width=100%
                    * Position absolute will follow the height, width of 
                    *   entire document / next position relative container
                    *   so a position relative container is added to limit the
                    *   image height and allow the parent styles.content to 
                    *   apply padding property
                */}
                <div className={styles.nextImage}>
                    <Image
                        layout="fill"
                        objectFit="cover"
                        src={photo.imageURL}
                        alt="Cover Image"
                    />
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
