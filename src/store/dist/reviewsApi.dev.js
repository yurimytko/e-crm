"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeleteReviewsMutation = exports.usePutReviewsMutation = exports.useGetReviewsQuery = exports.reviewsApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var reviewsApi = (0, _react.createApi)({
  reducerPath: 'reviewsApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'https://superogshmal.pp.ua/admin/',
    prepareHeaders: function prepareHeaders(headers) {
      var authToken = localStorage.getItem('token');

      if (authToken) {
        headers.set('Authorization', "accessToken=".concat(authToken));
      }

      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  tagTypes: ['Review'],
  endpoints: function endpoints(build) {
    return {
      getReviews: build.query({
        query: function query() {
          return 'reviews';
        },
        providesTags: ['Review']
      }),
      putReviews: build.mutation({
        query: function query(body) {
          return {
            url: "reviews?id=".concat(body.id),
            method: "PUT",
            body: body
          };
        },
        invalidatesTags: ['Review']
      }),
      deleteReviews: build.mutation({
        query: function query(body) {
          return {
            url: "reviews?id=".concat(body.id),
            method: "DELETE"
          };
        },
        invalidatesTags: ['Review']
      })
    };
  }
});
exports.reviewsApi = reviewsApi;
var useGetReviewsQuery = reviewsApi.useGetReviewsQuery,
    usePutReviewsMutation = reviewsApi.usePutReviewsMutation,
    useDeleteReviewsMutation = reviewsApi.useDeleteReviewsMutation;
exports.useDeleteReviewsMutation = useDeleteReviewsMutation;
exports.usePutReviewsMutation = usePutReviewsMutation;
exports.useGetReviewsQuery = useGetReviewsQuery;