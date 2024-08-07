import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://superogshmal.pp.ua' }), // Ensure the protocol is included
    endpoints: (build) => ({
        getSections: build.query({
            query: () => '/catalog/1'
        })
    })
});

export const { useGetSectionsQuery } = sectionApi;
