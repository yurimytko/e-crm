import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";


export const packsApi = createApi({

    reducerPath: 'packsApi',

    baseQuery: fetchBaseQuery({
        baseUrl: 'https://superogshmal.pp.ua/admin/',
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('token');

            if (authToken) {
                headers.set('Authorization', `accessToken=${authToken}`);
            }

            headers.set('Content-Type', 'application/json');

            return headers;
        }
    }),
    tagTypes: ['Packs'],
    endpoints: (build) => ({
        getPacks: build.query({
            query: () => `packs`,
            providesTags: ['Packs'],
        }),
        postPacks: build.mutation({
            query: (body) => ({
                url: 'packs',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Packs'],

        }),
        putPacks: build.mutation({
            query: (body) => ({
                url: `packs?id=${body.id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['Packs'],

        }),
        deletePacks: build.mutation({
            query: (body) => ({
                url: `packs?id=${body.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Packs'],

        }),

        getPackById: build.query({
            query: (body) => `packs?id=${body.id}`
        })
    })
})



export const {useGetPacksQuery, usePostPacksMutation, usePutPacksMutation, useDeletePacksMutation, useGetPackByIdQuery} = packsApi