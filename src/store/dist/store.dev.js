"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.store = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _productAPI = require("./productAPI");

var _sectionAPI = require("./sectionAPI");

var _reducer;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var store = (0, _toolkit.configureStore)({
  reducer: (_reducer = {}, _defineProperty(_reducer, _productAPI.productApi.reducerPath, _productAPI.productApi.reducer), _defineProperty(_reducer, _sectionAPI.sectionApi.reducerPath, _sectionAPI.sectionApi.reducer), _reducer),
  middleware: function middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(_productAPI.productApi.middleware).concat(_sectionAPI.sectionApi.middleware);
  }
});
exports.store = store;
var _default = store;
exports["default"] = _default;