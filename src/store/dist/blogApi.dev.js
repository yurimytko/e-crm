"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeletePostMutation = exports.useUpdatePostMutation = exports.useGetPostsByIdQuery = exports.useCreatePostMutation = exports.useGetPostsQuery = exports.blogApi = void 0;

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

      return headers;
    }
  }),
  tagTypes: ["Blogs"],
  endpoints: function endpoints(build) {
    return {
      getPosts: build.query({
        query: function query() {
          return 'admin/posts';
        },
        providesTags: ["Blogs"]
      }),
      createPost: build.mutation({
        query: function query(body) {
          return {
            url: 'admin/posts',
            method: 'POST',
            body: body
          };
        },
        invalidatesTags: ['Blogs']
      }),
      getPostsById: build.query({
        query: function query(id) {
          return "posts?id=".concat(id);
        }
      }),
      updatePost: build.mutation({
        query: function query(body) {
          return {
            url: "admin/posts?id=".concat(body._id),
            method: 'PUT',
            body: body
          };
        }
      }),
      deletePost: build.mutation({
        query: function query(id) {
          return {
            url: "admin/posts?id=".concat(id),
            method: 'DELETE'
          };
        },
        invalidatesTags: ['Blogs']
      })
    };
  }
});
exports.blogApi = blogApi;
var useGetPostsQuery = blogApi.useGetPostsQuery,
    useCreatePostMutation = blogApi.useCreatePostMutation,
    useGetPostsByIdQuery = blogApi.useGetPostsByIdQuery,
    useUpdatePostMutation = blogApi.useUpdatePostMutation,
    useDeletePostMutation = blogApi.useDeletePostMutation;
exports.useDeletePostMutation = useDeletePostMutation;
exports.useUpdatePostMutation = useUpdatePostMutation;
exports.useGetPostsByIdQuery = useGetPostsByIdQuery;
exports.useCreatePostMutation = useCreatePostMutation;
exports.useGetPostsQuery = useGetPostsQuery;