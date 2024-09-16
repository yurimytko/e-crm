"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeleteUserMutation = exports.useGetUsersQuery = exports.useSingInMutation = exports.adminApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var adminApi = (0, _react.createApi)({
  reducerPath: 'admintApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'https://superogshmal.pp.ua/',
    prepareHeaders: function prepareHeaders(headers) {
      var authToken = localStorage.getItem('token');

      if (authToken) {
        headers.set('Authorization', "accessToken=".concat(authToken));
      }

      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: function endpoints(build) {
    return {
      singIn: build.mutation({
        query: function query(body) {
          return {
            url: 'admin/login',
            method: 'POST',
            body: body
          };
        }
      }),
      getUsers: build.query({
        query: function query() {
          return 'admin/users/';
        }
      }),
      deleteUser: build.mutation({
        query: function query(body) {
          return {
            url: "admin/users?id=".concat(body.id),
            method: 'DELETE'
          };
        }
      })
    };
  }
});
exports.adminApi = adminApi;
var useSingInMutation = adminApi.useSingInMutation,
    useGetUsersQuery = adminApi.useGetUsersQuery,
    useDeleteUserMutation = adminApi.useDeleteUserMutation;
exports.useDeleteUserMutation = useDeleteUserMutation;
exports.useGetUsersQuery = useGetUsersQuery;
exports.useSingInMutation = useSingInMutation;