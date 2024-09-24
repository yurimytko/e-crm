import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";



export const reviewsApi = createApi({

    reducerPath: 'reviewsApi',

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
    tagTypes: ['Review'],

    endpoints: (build) => ({
        getReviews: build.query({
            query: () => 'reviews',
            providesTags: ['Review'],
        }),
        putReviews: build.mutation({
            query: (body) => ({
                url: `reviews?id=${body.id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['Review'],
        }),
        deleteReviews: build.mutation({
            query: (body) => ({
                url: `reviews?id=${body.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Review'],
        })
    })
})


export const {useGetReviewsQuery, usePutReviewsMutation, useDeleteReviewsMutation} = reviewsApi