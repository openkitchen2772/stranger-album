import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photos: [],
};

const albumSlice = createSlice({
    name: "album",
    initialState: initialState,
    reducers: {
        setAlbumPhotos(state, action) {
            state.photos = action.payload;
        },
    },
});

export const fetchAllPhotos = () => {
    return async (dispatch) => {
        const response = await fetch("/api/photos", {
            method: "GET",
        });

        const imageData = await response.json();
        dispatch(albumSlice.actions.setAlbumPhotos(imageData));
    };
};

export const albumActions = albumSlice.actions;

export default albumSlice.reducer;
