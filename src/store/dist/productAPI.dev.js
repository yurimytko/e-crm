"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDeleteProductsMutation = exports.usePutProductMutation = exports.useGetProductQuery = exports.useDeleteProductMutation = exports.useAddProductMutation = exports.useGetProductsQuery = exports.productApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var productApi = (0, _react.createApi)({
  reducerPath: 'productApi',
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
      getProducts: build.query({
        query: function query(url) {
          return "products".concat(url);
        }
      }),
      getProduct: build.query({
        query: function query(id) {
          return {
            url: "products/?id=".concat(id),
            method: "GET"
          };
        }
      }),
      addProduct: build.mutation({
        query: function query(body) {
          return {
            url: "products/",
            method: "POST",
            body: body
          };
        }
      }),
      deleteProduct: build.mutation({
        query: function query(id) {
          return {
            url: "products?id=".concat(id),
            method: "DELETE"
          };
        }
      }),
      putProduct: build.mutation({
        query: function query(body) {
          return {
            url: "products/?id=".concat(body.id),
            method: "PUT",
            body: body
          };
        }
      }),
      deleteProducts: build.mutation({
        query: function query(ids) {
          return {
            url: "products?id=".concat(ids),
            method: "DELETE"
          };
        }
      })
    };
  }
});
exports.productApi = productApi;
var useGetProductsQuery = productApi.useGetProductsQuery,
    useAddProductMutation = productApi.useAddProductMutation,
    useDeleteProductMutation = productApi.useDeleteProductMutation,
    useGetProductQuery = productApi.useGetProductQuery,
    usePutProductMutation = productApi.usePutProductMutation,
    useDeleteProductsMutation = productApi.useDeleteProductsMutation;
exports.useDeleteProductsMutation = useDeleteProductsMutation;
exports.usePutProductMutation = usePutProductMutation;
exports.useGetProductQuery = useGetProductQuery;
exports.useDeleteProductMutation = useDeleteProductMutation;
exports.useAddProductMutation = useAddProductMutation;
exports.useGetProductsQuery = useGetProductsQuery;