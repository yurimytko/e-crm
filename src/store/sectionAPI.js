import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const sectionApi = createApi({
            reducerPath: 'sectionApi',
            baseQuery: fetchBaseQuery({
                    baseUrl: 'https://superogshmal.pp.ua/',
                    prepareHeaders: (headers) => {
                        const authToken = localStorage.getItem('token');

                        if (authToken) {
                            headers.set('Authorization', `accessToken=${authToken}`);
                        }
                            return headers;
                        }
                    }), // Ensure the protocol is included
                tagTypes: ['Section', 'SubSection'], // Define a tag type
                endpoints: (build) => ({
                    getSections: build.query({
                        query: () => '/catalog',
                        providesTags: ['Section'], // Provide this tag for automatic refetching
                    }),
                    getSection: build.query({
                        query: (body) => `/catalog?id=${body.id}`,
                        providesTags: ['Section']
                    }),

                    postSection: build.mutation({
                        query: (formData) => ({
                            url: 'admin/sections',
                            method: 'POST',
                            body: formData,
                        }),
                        invalidatesTags: ['Section'], // Invalidate the 'Section' tag to refetch sections
                    }),

                    deleteSection: build.mutation({
                        query: (body) => ({
                            url: `admin/sections?id=${body.id}`,
                            method: 'DELETE',
                            body
                        })
                    }),

                    getSubSection: build.query({
                        query: () => 'catalog/subsections',
                        providesTags: ['Section']
                    }),

                    postSubSection: build.mutation({
                        query: ({ id, formData }) => ({
                            url: `admin/subsections?id=${id}`,
                            method: 'POST',
                            body: formData, 
                        }),
                        invalidatesTags: ['Section'],
                    }),
                    deleteSubSection: build.mutation({
                        query: (body) => ({
                            url: `admin/subsections?id=${body.id}`,
                            method: 'DELETE',
                            body
                        }),
                        invalidatesTags: ['Section'],
                    }),
                    addPromotion: build.mutation({
                        query: (body) => ({
                            url: `admin/promotion?id=${body.id}`,
                            method: 'PUT',
                            body

                        })
                    })
                }),
            });

        export const {
            useGetSectionsQuery,
            usePostSectionMutation,
            usePostSubSectionMutation,
            useDeleteSectionMutation,
            useGetSubSectionQuery,
            useDeleteSubSectionMutation,
            useGetSectionQuery,
            useAddPromotionMutation
        } = sectionApi;