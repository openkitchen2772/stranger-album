import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photos: [],
    selectedPhoto: {
        photoId: "",
        url: "",
        title: "",
        creator: "",
        comments: [
            {
                id: "",
                creator: "",
                comment: "",
                date: null,
            },
        ],
    },
    isLoading: false,
};

const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {
        setAlbumPhotos(state, action) {
            state.photos = action.payload;
        },
        setSelectedPhoto(state, action) {
            state.selectedPhoto.photoId = action.payload.photoId;
            state.selectedPhoto.url = action.payload.url;
            state.selectedPhoto.title = action.payload.title;
            state.selectedPhoto.creator = action.payload.creator;
        },
        setComments(state, action) {
            state.selectedPhoto.comments = action.payload;
        },
        resetSelectedPhoto(state, action) {
            state.selectedPhoto = {
                photoId: "",
                url: "",
                title: "",
                creator: "",
                comments: [],
            };
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload
        },
    },
});

// Commented since fetchAllPhotos is handled by nextjs server-side rendering

// export const fetchAllPhotos = () => {
//     return async (dispatch) => {
//         albumSlice.actions.setIsLoading(true);
        
//         const response = await fetch("/api/photos", {
//             method: "GET",
//         });
//         const imageData = await response.json();

//         albumSlice.actions.setIsLoading(false);

//         dispatch(albumSlice.actions.setAlbumPhotos(imageData));
//     };
// };

/**
 *
 * @param {Object{photoId:string,imageURL:string,title:string,creator:string}} photo
 * @returns
 */
export const fetchSelectedPhoto = (photo) => {
    return async (dispatch) => {
        albumSlice.actions.setIsLoading(true);

        const response = await fetch(`/api/photos/${photo.photoId}`, {
            method: "GET",
        });
        const commentsData = await response.json();

        albumSlice.actions.setIsLoading(false);

        const comments = commentsData.map((comment) => {
            return {
                id: comment.photo_id,
                creator: comment.creator,
                comment: comment.content,
                date: comment.create_time,
            };
        });

        dispatch(albumSlice.actions.setComments(comments));
        dispatch(
            albumSlice.actions.setSelectedPhoto({
                photoId: photo.photoId,
                url: photo.imageURL,
                title: photo.title,
                creator: photo.creator,
            })
        );
    };
};

export const albumActions = albumSlice.actions;

export default albumSlice.reducer;
