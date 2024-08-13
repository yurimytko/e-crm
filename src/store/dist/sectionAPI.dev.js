"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetSectionsQuery = exports.sectionApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var sectionApi = (0, _react.createApi)({
  reducerPath: 'sectionApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'http://46.149.190.25:5000/'
  }),
  // Ensure the protocol is included
  endpoints: function endpoints(build) {
    return {
      getSections: build.query({
        query: function query() {
          return '/catalog';
        }
      })
    };
  }
});
exports.sectionApi = sectionApi;
var useGetSectionsQuery = sectionApi.useGetSectionsQuery;
exports.useGetSectionsQuery = useGetSectionsQuery;