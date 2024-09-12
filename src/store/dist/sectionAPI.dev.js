"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGetSubSectionQuery = exports.useDeleteSectionMutation = exports.usePostSubSectionMutation = exports.usePostSectionMutation = exports.useGetSectionsQuery = exports.sectionApi = void 0;

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
  tagTypes: ['Section'],
  // Define a tag type
  endpoints: function endpoints(build) {
    return {
      getSections: build.query({
        query: function query() {
          return '/catalog';
        },
        providesTags: ['Section'] // Provide this tag for automatic refetching

      }),
      postSection: build.mutation({
        query: function query(body) {
          return {
            url: 'admin/sections',
            method: 'POST',
            body: body
          };
        },
        invalidatesTags: ['Section'] // Invalidate the 'Section' tag to refetch sections

      }),
      deleteSection: build.mutation({
        query: function query(body) {
          return {
            url: "admin/sections?".concat(body.id),
            method: 'DELETE',
            body: body
          };
        }
      }),
      getSubSection: build.query({
        query: function query() {
          return 'catalog/subsections';
        }
      }),
      postSubSection: build.mutation({
        query: function query(body) {
          return {
            url: "admin/subsections?id=".concat(body._id),
            method: 'POST',
            body: body
          };
        },
        invalidatesTags: ['Section'] // Invalidate the 'Section' tag to refetch sections

      })
    };
  }
});
exports.sectionApi = sectionApi;
var useGetSectionsQuery = sectionApi.useGetSectionsQuery,
    usePostSectionMutation = sectionApi.usePostSectionMutation,
    usePostSubSectionMutation = sectionApi.usePostSubSectionMutation,
    useDeleteSectionMutation = sectionApi.useDeleteSectionMutation,
    useGetSubSectionQuery = sectionApi.useGetSubSectionQuery;
exports.useGetSubSectionQuery = useGetSubSectionQuery;
exports.useDeleteSectionMutation = useDeleteSectionMutation;
exports.usePostSubSectionMutation = usePostSubSectionMutation;
exports.usePostSectionMutation = usePostSectionMutation;
exports.useGetSectionsQuery = useGetSectionsQuery;