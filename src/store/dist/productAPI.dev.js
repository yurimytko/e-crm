"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddProductMutation = exports.useGetProductsQuery = exports.productApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var productApi = (0, _react.createApi)({
  reducerPath: 'productApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'https://superogshmal.pp.ua/'
  }),
  // Ensure the protocol is included
  endpoints: function endpoints(build) {
    return {
      getProducts: build.query({
        query: function query() {
          return 'products';
        }
      }),
      addProduct: build.mutation({
        query: function query(body) {
          return {
            url: "products",
            method: "POST",
            body: body
          };
        }
      })
    };
  }
});
exports.productApi = productApi;
var useGetProductsQuery = productApi.useGetProductsQuery,
    useAddProductMutation = productApi.useAddProductMutation;
exports.useAddProductMutation = useAddProductMutation;
exports.useGetProductsQuery = useGetProductsQuery;