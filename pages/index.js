import { MongoClient } from "mongodb";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Logo from "../components/UI/Logo/Logo";
import Album from "../components/Album/Album";
import { albumActions } from "../store/album";

export default function Home({ photosData }) {
    const dispatch = useDispatch();

    // Commented since now the index rendering happen on the server-side
    //   but not relying on the redux initial data fetching anymore

    // const { photos } = useSelector((state) => {
    //     return {
    //         photos: state.album.photos,
    //     };
    // });

    useEffect(() => {
        dispatch(albumActions.setAlbumPhotos(photosData));
    }, [dispatch, photosData]);

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
            <Album photos={photosData} />
        </div>
    );
}

export const getStaticProps = async () => {
    let client;
    let imageData = [];

    try {
        client = await MongoClient.connect(
            "mongodb+srv://admin:admin@cluster0.sdez4.mongodb.net/albumPhotos?retryWrites=true&w=majority"
        );

        const db = client.db();
        const collection = db.collection("photos");

        imageData = await collection.find({}).toArray();
    } catch (error) {
        console.log(error);
    } finally {
        client.close();
    }

    return {
        props: {
            photosData: imageData.map((image) => ({
                id: image.id ?? "",
                imageURL: image.imageURL,
                title: image.title,
                creator: image.creator,
                creationTime: image.creationTime.toString(),
                _id: image._id.toString(),
            })),
        },
        revalidate: 10,
    };
};
