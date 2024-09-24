"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLazyExportPacksByIdQuery = exports.useLazyExportPacksQuery = exports.useLazyExportOrdersByIdQuery = exports.useLazyExportProductByIdQuery = exports.useLazyExportOrdersQuery = exports.useLazyExportUsersQuery = exports.useLazyExportProductQuery = exports.exportApi = void 0;

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
        }
      }),
      exportProductById: build.query({
        query: function query(body) {
          return "export?collection=products&id=".concat(body.id);
        }
      }),
      exportUsers: build.query({
        query: function query() {
          return 'export?collection=users';
        }
      }),
      exportOrders: build.query({
        query: function query() {
          return 'export?collection=orders';
        }
      }),
      exportOrdersById: build.query({
        query: function query(body) {
          return "export?collection=orders&id=".concat(body.id);
        }
      }),
      exportPacks: build.query({
        query: function query() {
          return 'export?collection=packs';
        }
      }),
      exportPacksById: build.query({
        query: function query(body) {
          return "export?collection=packs&id=".concat(body.id);
        }
      })
    };
  }
});
exports.exportApi = exportApi;
var useLazyExportProductQuery = exportApi.useLazyExportProductQuery,
    useLazyExportUsersQuery = exportApi.useLazyExportUsersQuery,
    useLazyExportOrdersQuery = exportApi.useLazyExportOrdersQuery,
    useLazyExportProductByIdQuery = exportApi.useLazyExportProductByIdQuery,
    useLazyExportOrdersByIdQuery = exportApi.useLazyExportOrdersByIdQuery,
    useLazyExportPacksQuery = exportApi.useLazyExportPacksQuery,
    useLazyExportPacksByIdQuery = exportApi.useLazyExportPacksByIdQuery;
exports.useLazyExportPacksByIdQuery = useLazyExportPacksByIdQuery;
exports.useLazyExportPacksQuery = useLazyExportPacksQuery;
exports.useLazyExportOrdersByIdQuery = useLazyExportOrdersByIdQuery;
exports.useLazyExportProductByIdQuery = useLazyExportProductByIdQuery;
exports.useLazyExportOrdersQuery = useLazyExportOrdersQuery;
exports.useLazyExportUsersQuery = useLazyExportUsersQuery;
exports.useLazyExportProductQuery = useLazyExportProductQuery;