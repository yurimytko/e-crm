"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetPackByIdQuery = exports.useDeletePacksMutation = exports.usePutPacksMutation = exports.usePostPacksMutation = exports.useGetPacksQuery = exports.packsApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var packsApi = (0, _react.createApi)({
  reducerPath: 'packsApi',
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
  tagTypes: ['Packs'],
  endpoints: function endpoints(build) {
    return {
      getPacks: build.query({
        query: function query() {
          return "packs";
        },
        providesTags: ['Packs']
      }),
      postPacks: build.mutation({
        query: function query(body) {
          return {
            url: 'packs',
            method: 'POST',
            body: body
          };
        },
        invalidatesTags: ['Packs']
      }),
      putPacks: build.mutation({
        query: function query(body) {
          return {
            url: "packs?id=".concat(body.id),
            method: "PUT",
            body: body
          };
        },
        invalidatesTags: ['Packs']
      }),
      deletePacks: build.mutation({
        query: function query(body) {
          return {
            url: "packs?id=".concat(body.id),
            method: "DELETE"
          };
        },
        invalidatesTags: ['Packs']
      }),
      getPackById: build.query({
        query: function query(body) {
          return "packs?id=".concat(body.id);
        }
      })
    };
  }
});
exports.packsApi = packsApi;
var useGetPacksQuery = packsApi.useGetPacksQuery,
    usePostPacksMutation = packsApi.usePostPacksMutation,
    usePutPacksMutation = packsApi.usePutPacksMutation,
    useDeletePacksMutation = packsApi.useDeletePacksMutation,
    useGetPackByIdQuery = packsApi.useGetPackByIdQuery;
exports.useGetPackByIdQuery = useGetPackByIdQuery;
exports.useDeletePacksMutation = useDeletePacksMutation;
exports.usePutPacksMutation = usePutPacksMutation;
exports.usePostPacksMutation = usePostPacksMutation;
exports.useGetPacksQuery = useGetPacksQuery;