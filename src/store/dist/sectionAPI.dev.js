"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePostSectionMutation = exports.useGetSectionsQuery = exports.sectionApi = void 0;

var _react = require("@reduxjs/toolkit/query/react");

var sectionApi = (0, _react.createApi)({
  reducerPath: 'sectionApi',
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
  // Ensure the protocol is included
  endpoints: function endpoints(build) {
    return {
      getSections: build.query({
        query: function query() {
          return 'catalog';
        }
      }),
      postSection: build.mutation({
        query: function query(body) {
          return {
            url: 'catalog',
            method: 'POST',
            body: body
          };
        }
      })
    };
  }
});
exports.sectionApi = sectionApi;
var useGetSectionsQuery = sectionApi.useGetSectionsQuery,
    usePostSectionMutation = sectionApi.usePostSectionMutation;
exports.usePostSectionMutation = usePostSectionMutation;
exports.useGetSectionsQuery = useGetSectionsQuery;