import { useState, useEffect } from "react";
import Image from "next/image";

import styles from "./ImageCard.module.css";
import Image404 from "../../public/404_image.png";

const ImageCard = ({ photo, onSelect }) => {
    const [src, setSrc] = useState("");

    useEffect(() => {
        fetch(photo.imageURL).then((response) => {
            if (response.status !== 200) {
                setSrc(Image404);
            } else {
                setSrc(photo.imageURL);
            }
        });
    }, []);

    return (
        <div
            className={styles.imageCard}
            onClick={
                src !== photo.imageURL ? () => {} : onSelect.bind(null, photo)
            }
        >
            <div className={styles.title}>{photo.title}</div>
            <div className={styles.content}>
                {/* 
                    next/Image layout fill adding following properties to img:
                        - position: absolute
                        - min-height, min-width=100%
                    * Position absolute will follow the height, width of 
                    *   entire document / next relative position container
                    *   so here a relative position container is added to limit the
                    *   image height and allow the parent styles.content to 
                    *   apply padding property
                */}
                <div className={styles.nextImage}>
                    {src && (
                        <Image
                            layout="fill"
                            objectFit="cover"
                            src={src}
                            alt="Cover Image"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageCard;
