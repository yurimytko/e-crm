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
        })
    })

})

export const {useGetOrdersQuery} = ordersApi