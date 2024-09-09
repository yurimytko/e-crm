"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreatePostMutation = exports.useGetPostsQuery = exports.blogApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var blogApi = (0, _react.createApi)({
  reducerPath: 'blogApi',
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
      getPosts: build.query({
        query: function query() {
          return 'posts';
        }
      }),
      createPost: build.mutation({
        query: function query(body) {
          return {
            url: 'posts',
            method: 'POST',
            body: body
          };
        }
      })
    };
  }
});
exports.blogApi = blogApi;
var useGetPostsQuery = blogApi.useGetPostsQuery,
    useCreatePostMutation = blogApi.useCreatePostMutation;
exports.useCreatePostMutation = useCreatePostMutation;
exports.useGetPostsQuery = useGetPostsQuery;