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
            query: () => 'export?collection=products' // Your export endpoint
        }),
        exportUsers: build.query({
            query: () => 'export?collection=users' // Your export endpoint
        }),
        exportOrders: build.query({
            query: () => 'export?collection=orders' // Your export endpoint
        }),
    })
});

export const {
    useLazyExportProductQuery,
    useLazyExportUsersQuery,
    useLazyExportOrdersQuery
} = exportApi;