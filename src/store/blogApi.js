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
        
            
            return headers;
          }
    }),
    tagTypes: ["Blogs"],
    endpoints: (build) => ({
        getPosts: build.query({
            query: () => 'admin/posts',
            providesTags: ["Blogs"],
        }),
        createPost: build.mutation({
            query: (body)=> ({
                url: 'admin/posts',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Blogs'],
        }),
        getPostsById: build.query({
            query: (id) => `posts?id=${id}`
        }),
        updatePost: build.mutation({
            query: (body)=> ({
                url: `admin/posts?id=${body._id}`,
                method: 'PUT',
                body
            })
        }),
        deletePost: build.mutation({
            query: (id)=> ({
                url: `admin/posts?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blogs'],

        }),
    })

})

export const {useGetPostsQuery, useCreatePostMutation, useGetPostsByIdQuery, useUpdatePostMutation, useDeletePostMutation} = blogApi 