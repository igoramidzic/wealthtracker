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

/***/ "./src/functions/plaid/createLinkToken/handler.ts":
/*!********************************************************!*\
  !*** ./src/functions/plaid/createLinkToken/handler.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _secrets_secrets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../secrets/secrets */ \"./src/secrets/secrets.ts\");\n/* harmony import */ var _utils_plaid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/plaid */ \"./src/functions/plaid/utils/plaid.ts\");\n\n\n\n\n\n\nconst ssm = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.SSM();\nconst createLinkToken = async (event, context) => {\n    let userId = event.requestContext.authorizer.claims.sub;\n    let parameters;\n    try {\n        let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();\n        parameters = res.Parameters;\n    }\n    catch (e) {\n        console.log(e);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    let plaidClient = (0,_utils_plaid__WEBPACK_IMPORTED_MODULE_5__.createPlaidClient)({\n        client_id: (0,_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_CLIENT_ID_PATH),\n        secret: (0,_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_SECRET_PATH),\n        env: (0,_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_ENV_PATH),\n    });\n    const configs = {\n        user: {\n            client_user_id: userId,\n        },\n        client_name: 'WealthTracker',\n        language: 'en',\n        country_codes: (0,_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_COUNTRY_CODES_PATH).split(','),\n        products: (0,_secrets_secrets__WEBPACK_IMPORTED_MODULE_4__.getParameterValue)(parameters, process.env.PLAID_PRODUCTS_PATH).split(','),\n    };\n    try {\n        let createTokenResponse = await plaidClient.createLinkToken(configs);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, { ...createTokenResponse });\n    }\n    catch (error) {\n        console.log(error);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(createLinkToken);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL2NyZWF0ZUxpbmtUb2tlbi9oYW5kbGVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvcGxhaWQvY3JlYXRlTGlua1Rva2VuL2hhbmRsZXIudHM/YWRlMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5cbmltcG9ydCB0eXBlIHsgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgZm9ybWF0SlNPTlJlc3BvbnNlIH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSAnQGxpYnMvbGFtYmRhJztcblxuaW1wb3J0IHNjaGVtYSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBDcmVhdGVMaW5rVG9rZW5PcHRpb25zIH0gZnJvbSAncGxhaWQnO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL3NzbSc7XG5pbXBvcnQgeyBnZXRQYXJhbWV0ZXJWYWx1ZSB9IGZyb20gJy4uLy4uLy4uL3NlY3JldHMvc2VjcmV0cyc7XG5pbXBvcnQgeyBjcmVhdGVQbGFpZENsaWVudCB9IGZyb20gJy4uL3V0aWxzL3BsYWlkJztcbmltcG9ydCB7IEVQbGFpZEVudmlyb25tZW50IH0gZnJvbSAnc3JjL21vZGVscy9wbGFpZCc7XG5cbmNvbnN0IHNzbSA9IG5ldyBhd3MuU1NNKCk7XG5cbmNvbnN0IGNyZWF0ZUxpbmtUb2tlbjogVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudDx0eXBlb2Ygc2NoZW1hPiA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4ge1xuXG4gIGxldCB1c2VySWQgPSBldmVudC5yZXF1ZXN0Q29udGV4dC5hdXRob3JpemVyLmNsYWltcy5zdWI7XG5cbiAgbGV0IHBhcmFtZXRlcnM6IFBhcmFtZXRlcltdO1xuICB0cnkge1xuICAgIGxldCByZXMgPSBhd2FpdCBzc20uZ2V0UGFyYW1ldGVyc0J5UGF0aCh7IFBhdGg6IHByb2Nlc3MuZW52LlBBUkFNRVRFUlNfUEFUSCB9KS5wcm9taXNlKCk7XG4gICAgcGFyYW1ldGVycyA9IHJlcy5QYXJhbWV0ZXJzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSlcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwgbnVsbCk7XG4gIH1cblxuICBsZXQgcGxhaWRDbGllbnQgPSBjcmVhdGVQbGFpZENsaWVudCh7XG4gICAgY2xpZW50X2lkOiBnZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9DTElFTlRfSURfUEFUSCksXG4gICAgc2VjcmV0OiBnZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9TRUNSRVRfUEFUSCksXG4gICAgZW52OiA8RVBsYWlkRW52aXJvbm1lbnQ+Z2V0UGFyYW1ldGVyVmFsdWUocGFyYW1ldGVycywgcHJvY2Vzcy5lbnYuUExBSURfRU5WX1BBVEgpLFxuICB9KTtcblxuICBjb25zdCBjb25maWdzOiBDcmVhdGVMaW5rVG9rZW5PcHRpb25zID0ge1xuICAgIHVzZXI6IHtcbiAgICAgIC8vIFRoaXMgc2hvdWxkIGNvcnJlc3BvbmQgdG8gYSB1bmlxdWUgaWQgZm9yIHRoZSBjdXJyZW50IHVzZXIuXG4gICAgICBjbGllbnRfdXNlcl9pZDogdXNlcklkLFxuICAgIH0sXG4gICAgY2xpZW50X25hbWU6ICdXZWFsdGhUcmFja2VyJyxcbiAgICBsYW5ndWFnZTogJ2VuJyxcbiAgICBjb3VudHJ5X2NvZGVzOiBnZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9DT1VOVFJZX0NPREVTX1BBVEgpLnNwbGl0KCcsJyksXG4gICAgcHJvZHVjdHM6IGdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX1BST0RVQ1RTX1BBVEgpLnNwbGl0KCcsJyksXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBsZXQgY3JlYXRlVG9rZW5SZXNwb25zZSA9IGF3YWl0IHBsYWlkQ2xpZW50LmNyZWF0ZUxpbmtUb2tlbihjb25maWdzKVxuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoMjAwLCB7IC4uLmNyZWF0ZVRva2VuUmVzcG9uc2UgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwgbnVsbClcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbWFpbiA9IG1pZGR5ZnkoY3JlYXRlTGlua1Rva2VuKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBSUE7QUFFQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/plaid/createLinkToken/handler.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/plaid/createLinkToken/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;