"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetOrderQuery = exports.usePutOrderMutation = exports.useDeleteOrderMutation = exports.useGetOrdersQuery = exports.ordersApi = void 0;

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
  tagTypes: ['Orders'],
  endpoints: function endpoints(build) {
    return {
      getOrders: build.query({
        query: function query() {
          return 'orders';
        },
        providesTags: ['Orders']
      }),
      getOrder: build.query({
        query: function query(body) {
          return "orders?id=".concat(body.id);
        },
        providesTags: ['Orders']
      }),
      deleteOrder: build.mutation({
        query: function query(body) {
          return {
            url: "https://superogshmal.pp.ua/admin/orders?id=".concat(body.id),
            method: 'DELETE'
          };
        },
        invalidatesTags: ['Orders']
      }),
      putOrder: build.mutation({
        query: function query(body) {
          return {
            url: "orders?id=".concat(body.id),
            method: "PUT",
            body: body
          };
        },
        invalidatesTags: ['Orders']
      })
    };
  }
});
exports.ordersApi = ordersApi;
var useGetOrdersQuery = ordersApi.useGetOrdersQuery,
    useDeleteOrderMutation = ordersApi.useDeleteOrderMutation,
    usePutOrderMutation = ordersApi.usePutOrderMutation,
    useGetOrderQuery = ordersApi.useGetOrderQuery;
exports.useGetOrderQuery = useGetOrderQuery;
exports.usePutOrderMutation = usePutOrderMutation;
exports.useDeleteOrderMutation = useDeleteOrderMutation;
exports.useGetOrdersQuery = useGetOrdersQuery;