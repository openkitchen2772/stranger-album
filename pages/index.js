import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Logo from "../components/UI/Logo/Logo";
import Album from "../components/Album/Album";
import { fetchAllPhotos } from "../store/album";

export default function Home() {
    const dispatch = useDispatch();
    const { photos } = useSelector((state) => {
        return {
            photos: state.album.photos,
        };
    });

    useEffect(() => {
        dispatch(fetchAllPhotos());
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>Stranger Album</title>
                <meta
                    name="description"
                    content="An album created and managed by all internet citizen!"
                />
            </Head>
            <Logo />
            <Album photos={photos}/>
        </div>
    );
}
