"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _productAPI = require("./productAPI");

var _sectionAPI = require("./sectionAPI");

var _adminApi = require("./adminApi");

var _blogApi = require("./blogApi");

var _ordersApi = require("./ordersApi");

var _exportApi = require("./exportApi");

var _packsApi = require("./packsApi");

var _reviewsApi = require("./reviewsApi");

var _calls = require("./calls");

var _reducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var store = (0, _toolkit.configureStore)({
  reducer: (_reducer = {}, _defineProperty(_reducer, _productAPI.productApi.reducerPath, _productAPI.productApi.reducer), _defineProperty(_reducer, _sectionAPI.sectionApi.reducerPath, _sectionAPI.sectionApi.reducer), _defineProperty(_reducer, _adminApi.adminApi.reducerPath, _adminApi.adminApi.reducer), _defineProperty(_reducer, _blogApi.blogApi.reducerPath, _blogApi.blogApi.reducer), _defineProperty(_reducer, _ordersApi.ordersApi.reducerPath, _ordersApi.ordersApi.reducer), _defineProperty(_reducer, _exportApi.exportApi.reducerPath, _exportApi.exportApi.reducer), _defineProperty(_reducer, _packsApi.packsApi.reducerPath, _packsApi.packsApi.reducer), _defineProperty(_reducer, _reviewsApi.reviewsApi.reducerPath, _reviewsApi.reviewsApi.reducer), _defineProperty(_reducer, _calls.callsApi.reducerPath, _calls.callsApi.reducer), _reducer),
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(_productAPI.productApi.middleware).concat(_sectionAPI.sectionApi.middleware).concat(_adminApi.adminApi.middleware).concat(_blogApi.blogApi.middleware).concat(_ordersApi.ordersApi.middleware).concat(_exportApi.exportApi.middleware).concat(_packsApi.packsApi.middleware).concat(_reviewsApi.reviewsApi.middleware).concat(_calls.callsApi.middleware);
  }
});
exports.store = store;
var _default = store;
exports["default"] = _default;