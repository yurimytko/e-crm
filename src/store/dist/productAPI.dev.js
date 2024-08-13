"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePutProductMutation = exports.useGetProductQuery = exports.useDeleteProductMutation = exports.useAddProductMutation = exports.useGetProductsQuery = exports.productApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var productApi = (0, _react.createApi)({
  reducerPath: 'productApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'http://46.149.190.25:5000/',
    prepareHeaders: function prepareHeaders(headers) {
      var authToken = "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmFmMzExNmJkNTBmNjBhMGU5Nzg3ZjQiLCJ1c2VybmFtZSI6IkFkYXNkIiwiX192IjowLCJjYWxscyI6W3siY3JlYXRlZEF0IjoiMjAyNC0wOC0wN1QxMDoxODo1OS41NzBaIn0seyJjcmVhdGVkQXQiOiIyMDI0LTA4LTA3VDEwOjE5OjA3LjY0OFoifSx7ImNyZWF0ZWRBdCI6IjIwMjQtMDgtMDdUMTA6MTk6NDQuODkwWiJ9XSwiaWF0IjoxNzIzNTU4ODg0LCJleHAiOjE3MjM2NDUyODR9.ZkJX1Nj5Em_ELsRGQEXuT_BFUJH_aX8QWmeC7lmu1L0; Path=/; HttpOnly; Secure";
      headers.set('Authorization', "".concat(authToken));
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: function endpoints(build) {
    return {
      getProducts: build.query({
        query: function query() {
          return 'products';
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
      })
    };
  }
});
exports.productApi = productApi;
var useGetProductsQuery = productApi.useGetProductsQuery,
    useAddProductMutation = productApi.useAddProductMutation,
    useDeleteProductMutation = productApi.useDeleteProductMutation,
    useGetProductQuery = productApi.useGetProductQuery,
    usePutProductMutation = productApi.usePutProductMutation;
exports.usePutProductMutation = usePutProductMutation;
exports.useGetProductQuery = useGetProductQuery;
exports.useDeleteProductMutation = useDeleteProductMutation;
exports.useAddProductMutation = useAddProductMutation;
exports.useGetProductsQuery = useGetProductsQuery;