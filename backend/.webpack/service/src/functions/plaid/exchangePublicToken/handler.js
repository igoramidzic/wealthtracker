/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/functions/plaid/exchangePublicToken/handler.ts":
/*!************************************************************!*\
  !*** ./src/functions/plaid/exchangePublicToken/handler.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var _utils_plaid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/plaid */ \"./src/functions/plaid/utils/plaid.ts\");\n/* harmony import */ var src_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/secrets/secrets */ \"./src/secrets/secrets.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nconst ssm = new aws_sdk__WEBPACK_IMPORTED_MODULE_5__.SSM();\nconst getPlaidLinkToken = async (event, context) => {\n    let publicToken = (event.body.public_token);\n    let parameters;\n    try {\n        let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();\n        parameters = res.Parameters;\n    }\n    catch (e) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    let plaidClient = (0,_utils_plaid__WEBPACK_IMPORTED_MODULE_3__.createPlaidClient)({\n        client_id: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_CLIENT_ID_PATH),\n        secret: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_SECRET_PATH),\n        env: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_ENV_PATH),\n    });\n    try {\n        let createTokenResponse = await plaidClient.exchangePublicToken(publicToken);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, { ...createTokenResponse });\n    }\n    catch (error) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, { error });\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(getPlaidLinkToken);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL2V4Y2hhbmdlUHVibGljVG9rZW4vaGFuZGxlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlcmxlc3MvLi9zcmMvZnVuY3Rpb25zL3BsYWlkL2V4Y2hhbmdlUHVibGljVG9rZW4vaGFuZGxlci50cz84NDIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHR5cGUgeyBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBmb3JtYXRKU09OUmVzcG9uc2UgfSBmcm9tICdAbGlicy9hcGlHYXRld2F5JztcbmltcG9ydCB7IG1pZGR5ZnkgfSBmcm9tICdAbGlicy9sYW1iZGEnO1xuXG5pbXBvcnQgc2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IGNyZWF0ZVBsYWlkQ2xpZW50IH0gZnJvbSAnLi4vdXRpbHMvcGxhaWQnO1xuaW1wb3J0IHsgZ2V0UGFyYW1ldGVyVmFsdWUgfSBmcm9tICdzcmMvc2VjcmV0cy9zZWNyZXRzJztcbmltcG9ydCB7IFBhcmFtZXRlciB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zc20nO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgRVBsYWlkRW52aXJvbm1lbnQgfSBmcm9tICdzcmMvbW9kZWxzL3BsYWlkJztcblxuY29uc3Qgc3NtID0gbmV3IGF3cy5TU00oKTtcblxuY29uc3QgZ2V0UGxhaWRMaW5rVG9rZW46IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQ8dHlwZW9mIHNjaGVtYT4gPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcblxuICAvLyBsZXQgdXNlcklkID0gZXZlbnQucmVxdWVzdENvbnRleHQuYXV0aG9yaXplci5jbGFpbXMuc3ViO1xuXG4gIGxldCBwdWJsaWNUb2tlbjogc3RyaW5nID0gPHN0cmluZz4oZXZlbnQuYm9keS5wdWJsaWNfdG9rZW4pO1xuXG4gIGxldCBwYXJhbWV0ZXJzOiBQYXJhbWV0ZXJbXTtcbiAgdHJ5IHtcbiAgICBsZXQgcmVzID0gYXdhaXQgc3NtLmdldFBhcmFtZXRlcnNCeVBhdGgoeyBQYXRoOiBwcm9jZXNzLmVudi5QQVJBTUVURVJTX1BBVEggfSkucHJvbWlzZSgpO1xuICAgIHBhcmFtZXRlcnMgPSByZXMuUGFyYW1ldGVycztcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNTAwLCBudWxsKTtcbiAgfVxuXG4gIGxldCBwbGFpZENsaWVudCA9IGNyZWF0ZVBsYWlkQ2xpZW50KHtcbiAgICBjbGllbnRfaWQ6IGdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX0NMSUVOVF9JRF9QQVRIKSxcbiAgICBzZWNyZXQ6IGdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX1NFQ1JFVF9QQVRIKSxcbiAgICBlbnY6IDxFUGxhaWRFbnZpcm9ubWVudD5nZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9FTlZfUEFUSCksXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgbGV0IGNyZWF0ZVRva2VuUmVzcG9uc2UgPSBhd2FpdCBwbGFpZENsaWVudC5leGNoYW5nZVB1YmxpY1Rva2VuKHB1YmxpY1Rva2VuKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDIwMCwgeyAuLi5jcmVhdGVUb2tlblJlc3BvbnNlIH0pXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZSg1MDAsIHsgZXJyb3IgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFpbiA9IG1pZGR5ZnkoZ2V0UGxhaWRMaW5rVG9rZW4pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFHQTtBQUNBO0FBRUE7QUFHQTtBQUVBO0FBSUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/plaid/exchangePublicToken/handler.ts\n");

/***/ }),

/***/ "./src/functions/plaid/utils/plaid.ts":
/*!********************************************!*\
  !*** ./src/functions/plaid/utils/plaid.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createPlaidClient\": () => (/* binding */ createPlaidClient)\n/* harmony export */ });\n/* harmony import */ var plaid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plaid */ \"plaid\");\n/* harmony import */ var plaid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plaid__WEBPACK_IMPORTED_MODULE_0__);\n\nconst createPlaidClient = (config) => {\n    return new plaid__WEBPACK_IMPORTED_MODULE_0__.Client({\n        clientID: config.client_id,\n        secret: config.secret,\n        env: plaid__WEBPACK_IMPORTED_MODULE_0__.environments[config.env],\n        options: {\n            version: '2019-05-29',\n        },\n    });\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL3V0aWxzL3BsYWlkLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvcGxhaWQvdXRpbHMvcGxhaWQudHM/ZWFlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQsIGVudmlyb25tZW50cyB9IGZyb20gXCJwbGFpZFwiO1xuaW1wb3J0IHsgRVBsYWlkRW52aXJvbm1lbnQgfSBmcm9tIFwic3JjL21vZGVscy9wbGFpZFwiO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlUGxhaWRDbGllbnQgPSAoY29uZmlnOiB7IGNsaWVudF9pZDogc3RyaW5nLCBzZWNyZXQ6IHN0cmluZywgZW52OiBFUGxhaWRFbnZpcm9ubWVudCB9KSA9PiB7XG4gIHJldHVybiBuZXcgQ2xpZW50KHtcbiAgICBjbGllbnRJRDogY29uZmlnLmNsaWVudF9pZCxcbiAgICBzZWNyZXQ6IGNvbmZpZy5zZWNyZXQsXG4gICAgZW52OiBlbnZpcm9ubWVudHNbY29uZmlnLmVudl0sXG4gICAgb3B0aW9uczoge1xuICAgICAgdmVyc2lvbjogJzIwMTktMDUtMjknLFxuICAgIH0sXG4gIH0pO1xufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/plaid/utils/plaid.ts\n");

/***/ }),

/***/ "./src/libs/apiGateway.ts":
/*!********************************!*\
  !*** ./src/libs/apiGateway.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"formatJSONResponse\": () => (/* binding */ formatJSONResponse)\n/* harmony export */ });\nconst formatJSONResponse = (statusCode, response) => {\n    return {\n        statusCode: statusCode,\n        body: JSON.stringify(response),\n        headers: {\n            \"Access-Control-Allow-Origin\": \"*\",\n            \"Access-Control-Allow-Credentials\": true,\n        }\n    };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9hcGlHYXRld2F5LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9saWJzL2FwaUdhdGV3YXkudHM/NjI1MSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFQSUdhdGV3YXlQcm94eUV2ZW50LCBBUElHYXRld2F5UHJveHlSZXN1bHQsIEhhbmRsZXIgfSBmcm9tIFwiYXdzLWxhbWJkYVwiXG5pbXBvcnQgdHlwZSB7IEZyb21TY2hlbWEgfSBmcm9tIFwianNvbi1zY2hlbWEtdG8tdHNcIjtcblxudHlwZSBWYWxpZGF0ZWRBUElHYXRld2F5UHJveHlFdmVudDxTPiA9IE9taXQ8QVBJR2F0ZXdheVByb3h5RXZlbnQsICdib2R5Jz4gJiB7IGJvZHk6IEZyb21TY2hlbWE8Uz4gfVxuZXhwb3J0IHR5cGUgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudDxTPiA9IEhhbmRsZXI8VmFsaWRhdGVkQVBJR2F0ZXdheVByb3h5RXZlbnQ8Uz4sIEFQSUdhdGV3YXlQcm94eVJlc3VsdD5cblxuZXhwb3J0IGNvbnN0IGZvcm1hdEpTT05SZXNwb25zZSA9IChzdGF0dXNDb2RlOiBudW1iZXIsIHJlc3BvbnNlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPikgPT4ge1xuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IHN0YXR1c0NvZGUsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiLFxuICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiB0cnVlLFxuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/libs/apiGateway.ts\n");

/***/ }),

/***/ "./src/libs/lambda.ts":
/*!****************************!*\
  !*** ./src/libs/lambda.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"middyfy\": () => (/* binding */ middyfy)\n/* harmony export */ });\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ \"@middy/core\");\n/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ \"@middy/http-json-body-parser\");\n/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst middyfy = (handler) => {\n    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbGlicy9sYW1iZGEudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLy4vc3JjL2xpYnMvbGFtYmRhLnRzPzZiMjUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1pZGR5IGZyb20gXCJAbWlkZHkvY29yZVwiXG5pbXBvcnQgbWlkZHlKc29uQm9keVBhcnNlciBmcm9tIFwiQG1pZGR5L2h0dHAtanNvbi1ib2R5LXBhcnNlclwiXG5cbmV4cG9ydCBjb25zdCBtaWRkeWZ5ID0gKGhhbmRsZXIpID0+IHtcbiAgcmV0dXJuIG1pZGR5KGhhbmRsZXIpLnVzZShtaWRkeUpzb25Cb2R5UGFyc2VyKCkpXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/libs/lambda.ts\n");

/***/ }),

/***/ "./src/secrets/secrets.ts":
/*!********************************!*\
  !*** ./src/secrets/secrets.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getParameterValue\": () => (/* binding */ getParameterValue)\n/* harmony export */ });\nconst getParameterValue = (parameters, path) => {\n    return parameters.filter(parameter => parameter.Name == path)[0].Value;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2VjcmV0cy9zZWNyZXRzLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9zZWNyZXRzL3NlY3JldHMudHM/YmRmYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQYXJhbWV0ZXIgfSBmcm9tIFwiYXdzLXNkay9jbGllbnRzL3NzbVwiO1xuXG5leHBvcnQgY29uc3QgZ2V0UGFyYW1ldGVyVmFsdWUgPSAocGFyYW1ldGVyczogUGFyYW1ldGVyW10sIHBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIHBhcmFtZXRlcnMuZmlsdGVyKHBhcmFtZXRlciA9PiBwYXJhbWV0ZXIuTmFtZSA9PSBwYXRoKVswXS5WYWx1ZTtcbn0iXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/secrets/secrets.ts\n");

/***/ }),

/***/ "@middy/core":
/*!******************************!*\
  !*** external "@middy/core" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("@middy/core");;

/***/ }),

/***/ "@middy/http-json-body-parser":
/*!***********************************************!*\
  !*** external "@middy/http-json-body-parser" ***!
  \***********************************************/
/***/ ((module) => {

module.exports = require("@middy/http-json-body-parser");;

/***/ }),

/***/ "aws-sdk":
/*!**************************!*\
  !*** external "aws-sdk" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("aws-sdk");;

/***/ }),

/***/ "plaid":
/*!************************!*\
  !*** external "plaid" ***!
  \************************/
/***/ ((module) => {

module.exports = require("plaid");;

/***/ }),

/***/ "source-map-support/register":
/*!**********************************************!*\
  !*** external "source-map-support/register" ***!
  \**********************************************/
/***/ ((module) => {

module.exports = require("source-map-support/register");;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/plaid/exchangePublicToken/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;