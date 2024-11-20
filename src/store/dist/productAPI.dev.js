"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePutProductModelsMutation = exports.usePostImgMutation = exports.useAddModelsMutation = exports.useDeleteProductsMutation = exports.usePutProductMutation = exports.useGetProductQuery = exports.useDeleteProductMutation = exports.useAddProductMutation = exports.useGetProductsQuery = exports.productApi = void 0;

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

      return headers;
    }
  }),
  tagTypes: ['Product'],
  endpoints: function endpoints(build) {
    return {
      getProducts: build.query({
        query: function query(url) {
          return "admin/products".concat(url);
        },
        providesTags: ['Product']
      }),
      getProduct: build.query({
        query: function query(id) {
          return {
            url: "admin/products/?id=".concat(id),
            method: "GET"
          };
        },
        providesTags: ['Product']
      }),
      addProduct: build.mutation({
        query: function query(body) {
          return {
            url: "admin/products/",
            method: "POST",
            body: body
          };
        },
        invalidatesTags: ['Product']
      }),
      deleteProduct: build.mutation({
        query: function query(id) {
          return {
            url: "admin/products?id=".concat(id),
            method: "DELETE"
          };
        }
      }),
      putProduct: build.mutation({
        query: function query(body) {
          return {
            url: "admin/products/?id=".concat(body.id),
            method: "PUT",
            body: body
          };
        },
        invalidatesTags: ['Product']
      }),
      putProductModels: build.mutation({
        query: function query(body) {
          return {
            url: "admin/products/?id=".concat(body.id, "&modelId=").concat(body.model),
            method: "PUT",
            body: body
          };
        },
        invalidatesTags: ['Product']
      }),
      addModels: build.mutation({
        query: function query(body) {
          console.log('Request body:', body);
          return {
            url: "admin/products/?id=".concat(body.id, "&modelId=new"),
            method: "PUT",
            body: body
          };
        }
      }),
      deleteProducts: build.mutation({
        query: function query(ids) {
          return {
            url: "admin/products?id=".concat(ids),
            method: "DELETE"
          };
        }
      }),
      postImg: build.mutation({
        query: function query(body) {
          return {
            url: "admin/images",
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
    useAddProductMutation = productApi.useAddProductMutation,
    useDeleteProductMutation = productApi.useDeleteProductMutation,
    useGetProductQuery = productApi.useGetProductQuery,
    usePutProductMutation = productApi.usePutProductMutation,
    useDeleteProductsMutation = productApi.useDeleteProductsMutation,
    useAddModelsMutation = productApi.useAddModelsMutation,
    usePostImgMutation = productApi.usePostImgMutation,
    usePutProductModelsMutation = productApi.usePutProductModelsMutation;
exports.usePutProductModelsMutation = usePutProductModelsMutation;
exports.usePostImgMutation = usePostImgMutation;
exports.useAddModelsMutation = useAddModelsMutation;
exports.useDeleteProductsMutation = useDeleteProductsMutation;
exports.usePutProductMutation = usePutProductMutation;
exports.useGetProductQuery = useGetProductQuery;
exports.useDeleteProductMutation = useDeleteProductMutation;
exports.useAddProductMutation = useAddProductMutation;
exports.useGetProductsQuery = useGetProductsQuery;