import moment from "moment";

import styles from "./PhotoComment.module.css";

const PhotoComment = ({ creator, comment, date }) => {
    return (
        <div className={styles.photoComment}>
            <div className={styles.commentUser}>
                <b>{creator}</b> said:
                <div className={styles.date}>
                    {moment(date).format("YYYY-MM-DD hh:mm:ss A")}
                </div>
            </div>

            <div>{comment}</div>
        </div>
    );
};

export default PhotoComment;
