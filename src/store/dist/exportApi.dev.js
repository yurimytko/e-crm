"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLazyExportOrdersQuery = exports.useLazyExportUsersQuery = exports.useLazyExportProductQuery = exports.exportApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var exportApi = (0, _react.createApi)({
  reducerPath: 'exportApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: "https://superogshmal.pp.ua/admin/",
    prepareHeaders: function prepareHeaders(headers) {
      var authToken = localStorage.getItem('token');

      if (authToken) {
        headers.set('Authorization', "accessToken=".concat(authToken));
      }

      headers.set('Content-Type', 'application/json'); // Keep JSON for requests

      return headers;
    },
    responseHandler: 'text' // Handle the response as plain text (for CSV)

  }),
  endpoints: function endpoints(build) {
    return {
      exportProduct: build.query({
        query: function query() {
          return 'export?collection=products';
        } // Your export endpoint

      }),
      exportUsers: build.query({
        query: function query() {
          return 'export?collection=users';
        } // Your export endpoint

      }),
      exportOrders: build.query({
        query: function query() {
          return 'export?collection=orders';
        } // Your export endpoint

      })
    };
  }
});
exports.exportApi = exportApi;
var useLazyExportProductQuery = exportApi.useLazyExportProductQuery,
    useLazyExportUsersQuery = exportApi.useLazyExportUsersQuery,
    useLazyExportOrdersQuery = exportApi.useLazyExportOrdersQuery;
exports.useLazyExportOrdersQuery = useLazyExportOrdersQuery;
exports.useLazyExportUsersQuery = useLazyExportUsersQuery;
exports.useLazyExportProductQuery = useLazyExportProductQuery;