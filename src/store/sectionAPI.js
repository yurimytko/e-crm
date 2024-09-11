import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://superogshmal.pp.ua/' ,
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('token');
          
            if (authToken) {
              headers.set('Authorization', `accessToken=${authToken}`);
            }
            headers.set('Content-Type', 'application/json');

            return headers;
        }
    }), // Ensure the protocol is included
    tagTypes: ['Section'], // Define a tag type
    endpoints: (build) => ({
        getSections: build.query({
            query: () => '/catalog',
            providesTags: ['Section'], // Provide this tag for automatic refetching
        }),

        postSection: build.mutation({
            query: (body) => ({
                url: 'admin/sections',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Section'], // Invalidate the 'Section' tag to refetch sections
        }),

        deleteSection: build.mutation({
            query: (body) => ({
                url: `admin/sections?${body.id}`,
                method: 'DELETE',
                body
            })
        }),

        getSubSection: build.query({
            query: () => 'catalog/subsections'
        }),

        postSubSection: build.mutation({
            query: (body) => ({
                url: `admin/catalog/subsection?id=${body._id}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Section'], // Invalidate the 'Section' tag to refetch sections
        }),
    }),
});

export const { useGetSectionsQuery, usePostSectionMutation, usePostSubSectionMutation, useDeleteSectionMutation, useGetSubSectionQuery } = sectionApi;
