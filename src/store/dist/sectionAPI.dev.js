"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddPromotionMutation = exports.useGetSectionQuery = exports.useDeleteSubSectionMutation = exports.useGetSubSectionQuery = exports.useDeleteSectionMutation = exports.usePostSubSectionMutation = exports.usePostSectionMutation = exports.useGetSectionsQuery = exports.sectionApi = void 0;

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

      return headers;
    }
  }),
  // Ensure the protocol is included
  tagTypes: ['Section', 'SubSection'],
  // Define a tag type
  endpoints: function endpoints(build) {
    return {
      getSections: build.query({
        query: function query() {
          return '/catalog';
        },
        providesTags: ['Section'] // Provide this tag for automatic refetching

      }),
      getSection: build.query({
        query: function query(body) {
          return "/catalog?id=".concat(body.id);
        },
        providesTags: ['Section']
      }),
      postSection: build.mutation({
        query: function query(formData) {
          return {
            url: 'admin/sections',
            method: 'POST',
            body: formData
          };
        },
        invalidatesTags: ['Section'] // Invalidate the 'Section' tag to refetch sections

      }),
      deleteSection: build.mutation({
        query: function query(body) {
          return {
            url: "admin/sections?id=".concat(body.id),
            method: 'DELETE',
            body: body
          };
        }
      }),
      getSubSection: build.query({
        query: function query() {
          return 'catalog/subsections';
        },
        providesTags: ['Section']
      }),
      postSubSection: build.mutation({
        query: function query(_ref) {
          var id = _ref.id,
              formData = _ref.formData;
          return {
            url: "admin/subsections?id=".concat(id),
            method: 'POST',
            body: formData
          };
        },
        invalidatesTags: ['Section']
      }),
      deleteSubSection: build.mutation({
        query: function query(body) {
          return {
            url: "admin/subsections?id=".concat(body.id),
            method: 'DELETE',
            body: body
          };
        },
        invalidatesTags: ['Section']
      }),
      addPromotion: build.mutation({
        query: function query(body) {
          return {
            url: "admin/promotion?id=".concat(body.id),
            method: 'PUT',
            body: body
          };
        }
      })
    };
  }
});
exports.sectionApi = sectionApi;
var useGetSectionsQuery = sectionApi.useGetSectionsQuery,
    usePostSectionMutation = sectionApi.usePostSectionMutation,
    usePostSubSectionMutation = sectionApi.usePostSubSectionMutation,
    useDeleteSectionMutation = sectionApi.useDeleteSectionMutation,
    useGetSubSectionQuery = sectionApi.useGetSubSectionQuery,
    useDeleteSubSectionMutation = sectionApi.useDeleteSubSectionMutation,
    useGetSectionQuery = sectionApi.useGetSectionQuery,
    useAddPromotionMutation = sectionApi.useAddPromotionMutation;
exports.useAddPromotionMutation = useAddPromotionMutation;
exports.useGetSectionQuery = useGetSectionQuery;
exports.useDeleteSubSectionMutation = useDeleteSubSectionMutation;
exports.useGetSubSectionQuery = useGetSubSectionQuery;
exports.useDeleteSectionMutation = useDeleteSectionMutation;
exports.usePostSubSectionMutation = usePostSubSectionMutation;
exports.usePostSectionMutation = usePostSectionMutation;
exports.useGetSectionsQuery = useGetSectionsQuery;