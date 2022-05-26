import { useRef, useContext } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/fontawesome-free-solid";
import Image from "next/image";

import styles from "./PhotoModal.module.css";
import PhotoComment from "./PhotoComment";
import { fetchSelectedPhoto } from "../../../store/album";
import AuthContext from "../../../store/context/auth-context";

const addNewComment = async (commentData, callback) => {
    await fetch("/api/photos/new-comment", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => callback());
};

const PhotoModal = ({ selectedPhoto }) => {
    const commentRef = useRef();
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const comments = selectedPhoto.comments.map((comment, i) => {
        return (
            <PhotoComment
                key={`comment_${i}`}
                creator={comment.creator}
                comment={comment.comment}
                date={comment.date}
            />
        );
    });

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const comment = commentRef.current.value;
        if (comment.trim().length === 0 ) {
            return;
        }

        const commentData = {
            id: "",
            photo_Id: selectedPhoto.photoId,
            creator: authCtx.displayName,
            create_time: new Date().toISOString(),
            content: comment,
        };

        commentRef.current.value = "";

        await addNewComment(commentData, () => {
            dispatch(
                fetchSelectedPhoto({
                    photoId: selectedPhoto.photoId,
                    imageURL: selectedPhoto.url,
                    title: selectedPhoto.title,
                    creator: selectedPhoto.creator,
                })
            );
        });
    };

    let commentForm = <p style={{ fontWeight: "bold", color: "#999" }}>{`Login to leave comments :)`}</p>;
    if (authCtx.tokenId) {
        commentForm = (
            <form
                onSubmit={commentSubmitHandler}
                className={styles.commentHeader}
            >
                <textarea
                    ref={commentRef}
                    className={styles.commentBox}
                    type="textarea"
                    rows="1"
                    placeholder="I want to comment..."
                />
                <button type="submit" className={styles.commentSubmitButton}>
                    <FontAwesomeIcon icon={faReply} size="sm" />
                </button>
            </form>
        );
    }

    return (
        <div className={styles.photoModal}>
            <div className={styles.imageSide}>
                <h1>{selectedPhoto.title} </h1>
                <div className={styles.imageSideImg}>
                    <Image
                        layout="fill"
                        objectFit="contain"
                        src={selectedPhoto.url}
                        alt="Photo"
                    />
                </div>
                <p>
                    <i>Uploaded By {selectedPhoto.creator}</i>
                </p>
            </div>

            <div className={styles.commentSide}>
                {commentForm}
                <div className={styles.commentArea}>
                    {comments.length > 0 ? (
                        comments
                    ) : (
                        <div style={{ color: "#999", fontSize: "11pt" }}>
                            {"Lets be the first to comment here! ;)"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoModal;
