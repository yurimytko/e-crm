import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./productAPI";
import { sectionApi } from "./sectionAPI";
import { adminApi } from "./adminApi";
import { blogApi } from "./blogApi";
import { ordersApi } from "./ordersApi";
import { exportApi } from "./exportApi";

export const store = configureStore({
    reducer: {
        [productApi.reducerPath]: productApi.reducer,
        [sectionApi.reducerPath]: sectionApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,
        [exportApi.reducerPath]: exportApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(productApi.middleware)
            .concat(sectionApi.middleware)
            .concat(adminApi.middleware)
            .concat(blogApi.middleware)
            .concat(ordersApi.middleware)
            .concat(exportApi.middleware),
});

export default store;
