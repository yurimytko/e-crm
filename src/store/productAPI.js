import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
                url: `products/?id=${id}`,
                method: "GET",
            }),
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
        }),

addModels: build.mutation({
    query: (body) => {
        console.log('Request body:', body); // Log the body before sending the request
        
        // Extract the id from the FormData object
        const id = body.get('id'); // Ensure you have appended 'id' to the FormData

        return {
            url: `admin/products/?id=${id}&modelId=new`, // Construct URL with extracted ID
            method: "PUT",
            body, // Send the FormData as body
        };
    },
}),
        deleteProducts: build.mutation({
            query: (ids) => ({
                url: `admin/products?id=${ids}`,
                method: "DELETE",        
            }),
        }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation,useDeleteProductMutation,useGetProductQuery,usePutProductMutation, useDeleteProductsMutation, useAddModelsMutation } = productApi;
