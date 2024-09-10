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
    endpoints: (build) => ({
        getSections: build.query({
            query: () => 'catalog'
        }),

        postSection: build.mutation({
            query: (body) => ({
                url: 'catalog',
                method: 'POST',
                body

            })

        }),
        postSubSection: build.mutation({
            query: (body) => ({
                url: `catalog/subsection?id=${body._id}`,
                method: 'POST',
                body
            })
        })
    })
});

export const { useGetSectionsQuery, usePostSectionMutation, usePostSubSectionMutation } = sectionApi;
