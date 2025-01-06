import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const ordersApi = createApi({

    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://superogshmal.pp.ua/admin/',
        prepareHeaders: (headers) => {
            const authToken = localStorage.getItem('token');
            
            if (authToken) {
              headers.set('Authorization', `accessToken=${authToken}`);
            }
        
            headers.set('Content-Type', 'application/json');
            
            return headers;
          }
    }),

    tagTypes: ['Orders'],

    endpoints: (build) => ({
        getOrders: build.query({
            query: ()=> 'orders',
            providesTags: ['Orders'],

        }),
        getOrder: build.query({
            query: (body)=> `orders?id=${body.id}`,
            providesTags: ['Orders'],

        }),
        deleteOrder: build.mutation({
            query: (body) => ({
                url: `https://superogshmal.pp.ua/admin/orders?id=${body.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Orders'],

        }),
        putOrder: build.mutation({
            query: (body) => ({
                url: `orders?id=${body.id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ['Orders'],

        })
    })

})

export const {useGetOrdersQuery, useDeleteOrderMutation, usePutOrderMutation, useGetOrderQuery} = ordersApi