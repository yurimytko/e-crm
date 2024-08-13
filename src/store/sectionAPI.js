import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://46.149.190.25:5000/' }), // Ensure the protocol is included
    endpoints: (build) => ({
        getSections: build.query({
            query: () => '/catalog'
        })
    })
});

export const { useGetSectionsQuery } = sectionApi;
