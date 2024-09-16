import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const adminApi = createApi({


    reducerPath: 'admintApi',
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
        singIn: build.mutation({
            query: (body) =>({
                url: 'admin/login',
                method: 'POST',
                body
            })
        }),
        getUsers:build.query({
           query: () => 'admin/users/' 
        }),
        
        deleteUser: build.mutation({
            query:(body)=> ({
                url: `admin/users?id=${body.id}`,
                method: 'DELETE',
            })
        })
    })

}) 


export const {useSingInMutation, useGetUsersQuery, useDeleteUserMutation} = adminApi