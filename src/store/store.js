import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productAPI";
import { sectionApi } from "./sectionAPI";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(sectionApi.middleware),
});

export default store;
