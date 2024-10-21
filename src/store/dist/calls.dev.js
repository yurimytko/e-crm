"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetCallsQuery = exports.callsApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var callsApi = (0, _react.createApi)({
  reducerPath: 'callsApi',
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
      getCalls: build.query({
        query: function query() {
          return 'calls';
        }
      })
    };
  }
});
exports.callsApi = callsApi;
var useGetCallsQuery = callsApi.useGetCallsQuery;
exports.useGetCallsQuery = useGetCallsQuery;