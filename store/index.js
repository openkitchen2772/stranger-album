import { configureStore } from '@reduxjs/toolkit';

import albumReducer from './album';

const store = configureStore({
    reducer: {
        album: albumReducer
    }
});

export default store;