import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({


    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://superogshmal.pp.ua/',
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('token');
            
            if (authToken) {
              headers.set('Authorization', `accessToken=${authToken}`);
            }
        
            headers.set('Content-Type', 'application/json');
            
            return headers;
          }
    }),

    endpoints: (build) => ({
        getPosts: build.query({
            query: () => 'posts'
        }),
        createPost: build.mutation({
            query: (body)=> ({
                url: 'posts',
                method: 'POST',
                body
            })
        })
    })

})

export const {useGetPostsQuery, useCreatePostMutation} = blogApi 