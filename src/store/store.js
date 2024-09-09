import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productAPI";
import { sectionApi } from "./sectionAPI";
import { adminApi } from "./adminApi";
import { blogApi } from "./blogApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(sectionApi.middleware)
            .concat(adminApi.middleware)
            .concat(blogApi.middleware),
});

export default store;
