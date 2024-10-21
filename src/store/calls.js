import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const callsApi = createApi({
    reducerPath: 'callsApi',

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
        getCalls: build.query({
            query:() => 'calls'
        })
    })
})


export const { useGetCallsQuery } = callsApi