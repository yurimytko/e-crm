import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const exportApi = createApi({
    reducerPath: 'exportApi',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://superogshmal.pp.ua/admin/",
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('token');

            if (authToken) {
                headers.set('Authorization', `accessToken=${authToken}`);
            }

            headers.set('Content-Type', 'application/json'); // Keep JSON for requests
            return headers;
        },
        responseHandler: 'text' // Handle the response as plain text (for CSV)
    }),
    endpoints: (build) => ({
        exportProduct: build.query({
            query: () => 'export?collection=products'
        }),
        exportProductById: build.query({
            query: (body) => `export?collection=products&id=${body.id}` 
        }),
        exportUsers: build.query({
            query: () => 'export?collection=users' 
        }),
        exportOrders: build.query({
            query: () => 'export?collection=orders' 
        }),
        exportOrdersById: build.query({
            query: (body) => `export?collection=orders&id=${body.id}` 
        }),
        exportPacks: build.query({
            query: () => 'export?collection=packs' 
        }),
        exportPacksById: build.query({
            query: (body) => `export?collection=packs&id=${body.id}` 
        }),
    })
});

export const {
    useLazyExportProductQuery,
    useLazyExportUsersQuery,
    useLazyExportOrdersQuery,
    useLazyExportProductByIdQuery,
    useLazyExportOrdersByIdQuery,
    useLazyExportPacksQuery,
    useLazyExportPacksByIdQuery
} = exportApi;