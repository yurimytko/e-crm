import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({




    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://46.149.190.25:5000/',
        prepareHeaders: (headers) => {
            const authToken = "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFmMzExNmJkNTBmNjBhMGU5Nzg3ZjQiLCJ1c2VybmFtZSI6IkFkYXNkIiwiX192IjowLCJjYWxscyI6W3siY3JlYXRlZEF0IjoiMjAyNC0wOC0wN1QxMDoxODo1OS41NzBaIn0seyJjcmVhdGVkQXQiOiIyMDI0LTA4LTA3VDEwOjE5OjA3LjY0OFoifSx7ImNyZWF0ZWRBdCI6IjIwMjQtMDgtMDdUMTA6MTk6NDQuODkwWiJ9XSwiaWF0IjoxNzIzNTU4ODg0LCJleHAiOjE3MjM2NDUyODR9.ZkJX1Nj5Em_ELsRGQEXuT_BFUJH_aX8QWmeC7lmu1L0; Path=/; HttpOnly; Secure"
            headers.set('Authorization', `${authToken}`);
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
    }),
});

export const { useGetProductsQuery, useAddProductMutation,useDeleteProductMutation,useGetProductQuery,usePutProductMutation } = productApi;
