"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist\\client\\components\\action-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist\\client\\components\\request-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!*********************************************************************************************!*\
  !*** external "next/dist\\client\\components\\static-generation-async-storage.external.js" ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist\\client\\components\\static-generation-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_HP_OneDrive_Desktop_teacher_login_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\HP\\\\OneDrive\\\\Desktop\\\\teacher login\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_HP_OneDrive_Desktop_teacher_login_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/auth/[...nextauth]/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNIUCU1Q09uZURyaXZlJTVDRGVza3RvcCU1Q3RlYWNoZXIlMjBsb2dpbiU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q1VzZXJzJTVDSFAlNUNPbmVEcml2ZSU1Q0Rlc2t0b3AlNUN0ZWFjaGVyJTIwbG9naW4maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDd0M7QUFDckg7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZWFjaGVyLWxvZ2luLW1vZHVsZS8/N2U5YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvZnV0dXJlL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJDOlxcXFxVc2Vyc1xcXFxIUFxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXHRlYWNoZXIgbG9naW5cXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcSFBcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFx0ZWFjaGVyIGxvZ2luXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIGhlYWRlckhvb2tzLCBzdGF0aWNHZW5lcmF0aW9uQmFpbG91dCB9ID0gcm91dGVNb2R1bGU7XG5jb25zdCBvcmlnaW5hbFBhdGhuYW1lID0gXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFnQztBQUNRO0FBRXhDLE1BQU1FLFVBQVVGLGdEQUFRQSxDQUFDQyxrREFBV0E7QUFFTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RlYWNoZXItbG9naW4tbW9kdWxlLy4vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHM/YzhhNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTmV4dEF1dGggZnJvbSAnbmV4dC1hdXRoJ1xuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tICdAL2xpYi9hdXRoJ1xuXG5jb25zdCBoYW5kbGVyID0gTmV4dEF1dGgoYXV0aE9wdGlvbnMpXG5cbmV4cG9ydCB7IGhhbmRsZXIgYXMgR0VULCBoYW5kbGVyIGFzIFBPU1QgfSJdLCJuYW1lcyI6WyJOZXh0QXV0aCIsImF1dGhPcHRpb25zIiwiaGFuZGxlciIsIkdFVCIsIlBPU1QiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./validators */ \"(rsc)/./lib/validators.ts\");\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_1__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    return null;\n                }\n                const validation = _validators__WEBPACK_IMPORTED_MODULE_4__.loginSchema.safeParse({\n                    email: credentials.email,\n                    password: credentials.password\n                });\n                if (!validation.success) {\n                    return null;\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) {\n                    return null;\n                }\n                const isPasswordValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    return null;\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    role: user.role,\n                    subject: user.subject\n                };\n            }\n        })\n    ],\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.role = user.role;\n                token.subject = user.subject;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token) {\n                session.user.id = token.sub;\n                session.user.role = token.role;\n                session.user.subject = token.subject;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/teacher/login\"\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ2lFO0FBQ1I7QUFDNUI7QUFDSTtBQUNTO0FBRW5DLE1BQU1LLGNBQStCO0lBQzFDQyxTQUFTTCx3RUFBYUEsQ0FBQ0UsMkNBQU1BO0lBQzdCSSxXQUFXO1FBQ1RQLDJFQUFtQkEsQ0FBQztZQUNsQlEsTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBWUMsTUFBTTtnQkFBVztZQUNsRDtZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVO29CQUNqRCxPQUFPO2dCQUNUO2dCQUVBLE1BQU1FLGFBQWFYLG9EQUFXQSxDQUFDWSxTQUFTLENBQUM7b0JBQ3ZDTixPQUFPRCxZQUFZQyxLQUFLO29CQUN4QkcsVUFBVUosWUFBWUksUUFBUTtnQkFDaEM7Z0JBRUEsSUFBSSxDQUFDRSxXQUFXRSxPQUFPLEVBQUU7b0JBQ3ZCLE9BQU87Z0JBQ1Q7Z0JBRUEsTUFBTUMsT0FBTyxNQUFNZiwyQ0FBTUEsQ0FBQ2UsSUFBSSxDQUFDQyxVQUFVLENBQUM7b0JBQ3hDQyxPQUFPO3dCQUFFVixPQUFPRCxZQUFZQyxLQUFLO29CQUFDO2dCQUNwQztnQkFFQSxJQUFJLENBQUNRLE1BQU07b0JBQ1QsT0FBTztnQkFDVDtnQkFFQSxNQUFNRyxrQkFBa0IsTUFBTW5CLHVEQUFjLENBQzFDTyxZQUFZSSxRQUFRLEVBQ3BCSyxLQUFLTCxRQUFRO2dCQUdmLElBQUksQ0FBQ1EsaUJBQWlCO29CQUNwQixPQUFPO2dCQUNUO2dCQUVBLE9BQU87b0JBQ0xFLElBQUlMLEtBQUtLLEVBQUU7b0JBQ1hiLE9BQU9RLEtBQUtSLEtBQUs7b0JBQ2pCRixNQUFNVSxLQUFLVixJQUFJO29CQUNmZ0IsTUFBTU4sS0FBS00sSUFBSTtvQkFDZkMsU0FBU1AsS0FBS08sT0FBTztnQkFDdkI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsU0FBUztRQUNQQyxVQUFVO0lBQ1o7SUFDQUMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsS0FBSyxFQUFFWixJQUFJLEVBQUU7WUFDdkIsSUFBSUEsTUFBTTtnQkFDUlksTUFBTU4sSUFBSSxHQUFHTixLQUFLTSxJQUFJO2dCQUN0Qk0sTUFBTUwsT0FBTyxHQUFHUCxLQUFLTyxPQUFPO1lBQzlCO1lBQ0EsT0FBT0s7UUFDVDtRQUNBLE1BQU1KLFNBQVEsRUFBRUEsT0FBTyxFQUFFSSxLQUFLLEVBQUU7WUFDOUIsSUFBSUEsT0FBTztnQkFDVEosUUFBUVIsSUFBSSxDQUFDSyxFQUFFLEdBQUdPLE1BQU1DLEdBQUc7Z0JBQzNCTCxRQUFRUixJQUFJLENBQUNNLElBQUksR0FBR00sTUFBTU4sSUFBSTtnQkFDOUJFLFFBQVFSLElBQUksQ0FBQ08sT0FBTyxHQUFHSyxNQUFNTCxPQUFPO1lBQ3RDO1lBQ0EsT0FBT0M7UUFDVDtJQUNGO0lBQ0FNLE9BQU87UUFDTEMsUUFBUTtJQUNWO0FBQ0YsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RlYWNoZXItbG9naW4tbW9kdWxlLy4vbGliL2F1dGgudHM/YmY3ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tICduZXh0LWF1dGgnXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJ1xuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gJ0BuZXh0LWF1dGgvcHJpc21hLWFkYXB0ZXInXG5pbXBvcnQgYmNyeXB0IGZyb20gJ2JjcnlwdGpzJ1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi9wcmlzbWEnXG5pbXBvcnQgeyBsb2dpblNjaGVtYSB9IGZyb20gJy4vdmFsaWRhdG9ycydcblxuZXhwb3J0IGNvbnN0IGF1dGhPcHRpb25zOiBOZXh0QXV0aE9wdGlvbnMgPSB7XG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiAnY3JlZGVudGlhbHMnLFxuICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgZW1haWw6IHsgbGFiZWw6ICdFbWFpbCcsIHR5cGU6ICdlbWFpbCcgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6ICdQYXNzd29yZCcsIHR5cGU6ICdwYXNzd29yZCcgfVxuICAgICAgfSxcbiAgICAgIGFzeW5jIGF1dGhvcml6ZShjcmVkZW50aWFscykge1xuICAgICAgICBpZiAoIWNyZWRlbnRpYWxzPy5lbWFpbCB8fCAhY3JlZGVudGlhbHM/LnBhc3N3b3JkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb24gPSBsb2dpblNjaGVtYS5zYWZlUGFyc2Uoe1xuICAgICAgICAgIGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCxcbiAgICAgICAgICBwYXNzd29yZDogY3JlZGVudGlhbHMucGFzc3dvcmQsXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF2YWxpZGF0aW9uLnN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKCF1c2VyKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKFxuICAgICAgICAgIGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgICAgICAgIHVzZXIucGFzc3dvcmRcbiAgICAgICAgKVxuXG4gICAgICAgIGlmICghaXNQYXNzd29yZFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIHJvbGU6IHVzZXIucm9sZSxcbiAgICAgICAgICBzdWJqZWN0OiB1c2VyLnN1YmplY3QsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICBdLFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6ICdqd3QnLFxuICB9LFxuICBjYWxsYmFja3M6IHtcbiAgICBhc3luYyBqd3QoeyB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBpZiAodXNlcikge1xuICAgICAgICB0b2tlbi5yb2xlID0gdXNlci5yb2xlXG4gICAgICAgIHRva2VuLnN1YmplY3QgPSB1c2VyLnN1YmplY3RcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlblxuICAgIH0sXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBzZXNzaW9uLnVzZXIuaWQgPSB0b2tlbi5zdWIhXG4gICAgICAgIHNlc3Npb24udXNlci5yb2xlID0gdG9rZW4ucm9sZSBhcyBzdHJpbmdcbiAgICAgICAgc2Vzc2lvbi51c2VyLnN1YmplY3QgPSB0b2tlbi5zdWJqZWN0IGFzIHN0cmluZ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb25cbiAgICB9LFxuICB9LFxuICBwYWdlczoge1xuICAgIHNpZ25JbjogJy90ZWFjaGVyL2xvZ2luJyxcbiAgfSxcbn0iXSwibmFtZXMiOlsiQ3JlZGVudGlhbHNQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJiY3J5cHQiLCJwcmlzbWEiLCJsb2dpblNjaGVtYSIsImF1dGhPcHRpb25zIiwiYWRhcHRlciIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ2YWxpZGF0aW9uIiwic2FmZVBhcnNlIiwic3VjY2VzcyIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJpc1Bhc3N3b3JkVmFsaWQiLCJjb21wYXJlIiwiaWQiLCJyb2xlIiwic3ViamVjdCIsInNlc3Npb24iLCJzdHJhdGVneSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic3ViIiwicGFnZXMiLCJzaWduSW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxDQUFDO0lBQy9ESSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFFO0FBRUYsSUFBSUMsSUFBeUIsRUFBY0osZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVhY2hlci1sb2dpbi1tb2R1bGUvLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XG4gIHByaXNtYTogUHJpc21hQ2xpZW50IHwgdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBjb25zdCBwcmlzbWEgPSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/IG5ldyBQcmlzbWFDbGllbnQoe1xuICBsb2c6IFsncXVlcnknXSxcbn0pXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSBnbG9iYWxGb3JQcmlzbWEucHJpc21hID0gcHJpc21hIl0sIm5hbWVzIjpbIlByaXNtYUNsaWVudCIsImdsb2JhbEZvclByaXNtYSIsImdsb2JhbFRoaXMiLCJwcmlzbWEiLCJsb2ciLCJwcm9jZXNzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/validators.ts":
/*!***************************!*\
  !*** ./lib/validators.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   forgotPasswordSchema: () => (/* binding */ forgotPasswordSchema),\n/* harmony export */   loginSchema: () => (/* binding */ loginSchema),\n/* harmony export */   registerSchema: () => (/* binding */ registerSchema),\n/* harmony export */   resetPasswordSchema: () => (/* binding */ resetPasswordSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\nconst registerSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2, \"Name must be at least 2 characters\"),\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(\"Invalid email address\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(8, \"Password must be at least 8 characters\"),\n    subject: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2, \"Subject must be at least 2 characters\")\n});\nconst loginSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(\"Invalid email address\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1, \"Password is required\"),\n    rememberMe: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().optional()\n});\nconst forgotPasswordSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(\"Invalid email address\")\n});\nconst resetPasswordSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    token: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1, \"Token is required\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(8, \"Password must be at least 8 characters\"),\n    confirmPassword: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(8, \"Password confirmation is required\")\n}).refine((data)=>data.password === data.confirmPassword, {\n    message: \"Passwords don't match\",\n    path: [\n        \"confirmPassword\"\n    ]\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdmFsaWRhdG9ycy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF1QjtBQUVoQixNQUFNQyxpQkFBaUJELHVDQUFRLENBQUM7SUFDckNHLE1BQU1ILHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO0lBQ3hCQyxPQUFPTix1Q0FBUSxHQUFHTSxLQUFLLENBQUM7SUFDeEJDLFVBQVVQLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO0lBQzVCRyxTQUFTUix1Q0FBUSxHQUFHSyxHQUFHLENBQUMsR0FBRztBQUM3QixHQUFFO0FBRUssTUFBTUksY0FBY1QsdUNBQVEsQ0FBQztJQUNsQ00sT0FBT04sdUNBQVEsR0FBR00sS0FBSyxDQUFDO0lBQ3hCQyxVQUFVUCx1Q0FBUSxHQUFHSyxHQUFHLENBQUMsR0FBRztJQUM1QkssWUFBWVYsd0NBQVMsR0FBR1ksUUFBUTtBQUNsQyxHQUFFO0FBRUssTUFBTUMsdUJBQXVCYix1Q0FBUSxDQUFDO0lBQzNDTSxPQUFPTix1Q0FBUSxHQUFHTSxLQUFLLENBQUM7QUFDMUIsR0FBRTtBQUVLLE1BQU1RLHNCQUFzQmQsdUNBQVEsQ0FBQztJQUMxQ2UsT0FBT2YsdUNBQVEsR0FBR0ssR0FBRyxDQUFDLEdBQUc7SUFDekJFLFVBQVVQLHVDQUFRLEdBQUdLLEdBQUcsQ0FBQyxHQUFHO0lBQzVCVyxpQkFBaUJoQix1Q0FBUSxHQUFHSyxHQUFHLENBQUMsR0FBRztBQUNyQyxHQUFHWSxNQUFNLENBQUMsQ0FBQ0MsT0FBU0EsS0FBS1gsUUFBUSxLQUFLVyxLQUFLRixlQUFlLEVBQUU7SUFDMURHLFNBQVM7SUFDVEMsTUFBTTtRQUFDO0tBQWtCO0FBQzNCLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZWFjaGVyLWxvZ2luLW1vZHVsZS8uL2xpYi92YWxpZGF0b3JzLnRzPzU2YjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gJ3pvZCdcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyU2NoZW1hID0gei5vYmplY3Qoe1xuICBuYW1lOiB6LnN0cmluZygpLm1pbigyLCAnTmFtZSBtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVycycpLFxuICBlbWFpbDogei5zdHJpbmcoKS5lbWFpbCgnSW52YWxpZCBlbWFpbCBhZGRyZXNzJyksXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig4LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMnKSxcbiAgc3ViamVjdDogei5zdHJpbmcoKS5taW4oMiwgJ1N1YmplY3QgbXVzdCBiZSBhdCBsZWFzdCAyIGNoYXJhY3RlcnMnKSxcbn0pXG5cbmV4cG9ydCBjb25zdCBsb2dpblNjaGVtYSA9IHoub2JqZWN0KHtcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoJ0ludmFsaWQgZW1haWwgYWRkcmVzcycpLFxuICBwYXNzd29yZDogei5zdHJpbmcoKS5taW4oMSwgJ1Bhc3N3b3JkIGlzIHJlcXVpcmVkJyksXG4gIHJlbWVtYmVyTWU6IHouYm9vbGVhbigpLm9wdGlvbmFsKCksXG59KVxuXG5leHBvcnQgY29uc3QgZm9yZ290UGFzc3dvcmRTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGVtYWlsOiB6LnN0cmluZygpLmVtYWlsKCdJbnZhbGlkIGVtYWlsIGFkZHJlc3MnKSxcbn0pXG5cbmV4cG9ydCBjb25zdCByZXNldFBhc3N3b3JkU2NoZW1hID0gei5vYmplY3Qoe1xuICB0b2tlbjogei5zdHJpbmcoKS5taW4oMSwgJ1Rva2VuIGlzIHJlcXVpcmVkJyksXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig4LCAnUGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnMnKSxcbiAgY29uZmlybVBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig4LCAnUGFzc3dvcmQgY29uZmlybWF0aW9uIGlzIHJlcXVpcmVkJyksXG59KS5yZWZpbmUoKGRhdGEpID0+IGRhdGEucGFzc3dvcmQgPT09IGRhdGEuY29uZmlybVBhc3N3b3JkLCB7XG4gIG1lc3NhZ2U6IFwiUGFzc3dvcmRzIGRvbid0IG1hdGNoXCIsXG4gIHBhdGg6IFtcImNvbmZpcm1QYXNzd29yZFwiXSxcbn0pXG5cbmV4cG9ydCB0eXBlIFJlZ2lzdGVySW5wdXQgPSB6LmluZmVyPHR5cGVvZiByZWdpc3RlclNjaGVtYT5cbmV4cG9ydCB0eXBlIExvZ2luSW5wdXQgPSB6LmluZmVyPHR5cGVvZiBsb2dpblNjaGVtYT5cbmV4cG9ydCB0eXBlIEZvcmdvdFBhc3N3b3JkSW5wdXQgPSB6LmluZmVyPHR5cGVvZiBmb3Jnb3RQYXNzd29yZFNjaGVtYT5cbmV4cG9ydCB0eXBlIFJlc2V0UGFzc3dvcmRJbnB1dCA9IHouaW5mZXI8dHlwZW9mIHJlc2V0UGFzc3dvcmRTY2hlbWE+Il0sIm5hbWVzIjpbInoiLCJyZWdpc3RlclNjaGVtYSIsIm9iamVjdCIsIm5hbWUiLCJzdHJpbmciLCJtaW4iLCJlbWFpbCIsInBhc3N3b3JkIiwic3ViamVjdCIsImxvZ2luU2NoZW1hIiwicmVtZW1iZXJNZSIsImJvb2xlYW4iLCJvcHRpb25hbCIsImZvcmdvdFBhc3N3b3JkU2NoZW1hIiwicmVzZXRQYXNzd29yZFNjaGVtYSIsInRva2VuIiwiY29uZmlybVBhc3N3b3JkIiwicmVmaW5lIiwiZGF0YSIsIm1lc3NhZ2UiLCJwYXRoIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/validators.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/jose","vendor-chunks/zod","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5CHP%5COneDrive%5CDesktop%5Cteacher%20login&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();