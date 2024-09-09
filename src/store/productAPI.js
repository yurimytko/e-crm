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
      
          headers.set('Content-Type', 'application/json');
          
          return headers;
        }
      }),
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => 'products',
        }),
        getProduct: build.query({
            query: (id) => ({
                url: `products/?id=${id}`,
                method: "GET",
            }),
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: "products/",
                method: "POST",
                body,
            }),
        }),
        deleteProduct: build.mutation({
            query: (id) => ({
                url: `products?id=${id}`,
                method: "DELETE",        
            }),
        }),
        putProduct: build.mutation({
            query: (body) => ({
                url: `products/?id=${body.id}`,
                method: "PUT",
                body,
            }),
        }),
        deleteProducts: build.mutation({
            query: (ids) => ({
                url: `products?id=${ids}`,
                method: "DELETE",        
            }),
        }),
        getProductByFilter: build.query({
            query: (url) => ({
                url: `products/?${url}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetProductsQuery, useAddProductMutation,useDeleteProductMutation,useGetProductQuery,usePutProductMutation, useDeleteProductsMutation, useGetProductByFilterQuery } = productApi;
