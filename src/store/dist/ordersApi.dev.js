"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetOrdersQuery = exports.ordersApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var ordersApi = (0, _react.createApi)({
  reducerPath: 'ordersApi',
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
  endpoints: function endpoints(build) {
    return {
      getOrders: build.query({
        query: function query() {
          return 'orders';
        }
      })
    };
  }
});
exports.ordersApi = ordersApi;
var useGetOrdersQuery = ordersApi.useGetOrdersQuery;
exports.useGetOrdersQuery = useGetOrdersQuery;