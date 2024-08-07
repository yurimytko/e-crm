"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetSectionsQuery = exports.sectionApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var sectionApi = (0, _react.createApi)({
  reducerPath: 'sectionApi',
  baseQuery: (0, _react.fetchBaseQuery)({
    baseUrl: 'https://superogshmal.pp.ua'
  }),
  // Ensure the protocol is included
  endpoints: function endpoints(build) {
    return {
      getSections: build.query({
        query: function query() {
          return '/catalog/1';
        }
      })
    };
  }
});
exports.sectionApi = sectionApi;
var useGetSectionsQuery = sectionApi.useGetSectionsQuery;
exports.useGetSectionsQuery = useGetSectionsQuery;