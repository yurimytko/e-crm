import {
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({




    reducerPath: 'productApi',
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
    tagTypes: ['Product'],
    endpoints: (build) => ({
        getProducts: build.query({
            query: (url) => `admin/products${url}`,
            providesTags: ['Product'],
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `admin/products/?id=${id}`,
                method: "GET",
            }),
            providesTags: ['Product'],

        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: "admin/products/",
                method: "POST",
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `admin/products?id=${id}`,
                method: "DELETE",
            }),
        }),
        putProduct: build.mutation({
            query: (body) => ({
                url: `admin/products/?id=${body.id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ['Product'],

        }),
        putProductModels: build.mutation({
            query: (body) => ({
                url: `admin/products/?id=${body.id}&modelId=${body.model}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ['Product'],

        }),

        addModels: build.mutation({
            query: (body) => {
                console.log('Request body:', body);


                return {
                    url: `admin/products/?id=${body.id}&modelId=new`,
                    method: "PUT",
                    body,
                };
            },
        }),
        deleteProducts: build.mutation({
            query: (ids) => ({
                url: `admin/products?id=${ids}`,
                method: "DELETE",
            }),
        }),

        postImg: build.mutation({
            query: (body) => ({
                url: `admin/images`,
                method: "POST",
                body
            })
        })
    }),
});

export const {
    useGetProductsQuery,
    useAddProductMutation,
    useDeleteProductMutation,
    useGetProductQuery,
    usePutProductMutation,
    useDeleteProductsMutation,
    useAddModelsMutation,
    usePostImgMutation,
    usePutProductModelsMutation
} = productApi;