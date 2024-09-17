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

    endpoints: (build) => ({
        getOrders: build.query({
            query: ()=> 'orders'
        }),
        deleteOrder: build.mutation({
            query: (body) => ({
                url: `https://superogshmal.pp.ua/admin/orders?id=${body.id}`,
                method: 'DELETE'
            })
        }),
        putOrder: build.mutation({
            query: (body) => ({
                url: `orders?id=${body.id}`,
                method: "PUT",
                body
            })
        })
    })

})

export const {useGetOrdersQuery, useDeleteOrderMutation, usePutOrderMutation} = ordersApi