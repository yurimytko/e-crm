import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://superogshmal.pp.ua/' }), // Ensure the protocol is included
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => 'products'
        }),
        addProduct: build.mutation({
            query: (body) => ({
                url: "products",
                method: "POST",
                body
            })
        })
    })
});

export const { useGetProductsQuery, useAddProductMutation } = productApi;