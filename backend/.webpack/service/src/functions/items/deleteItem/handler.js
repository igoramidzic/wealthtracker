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

/***/ "./src/functions/items/deleteItem/handler.ts":
/*!***************************************************!*\
  !*** ./src/functions/items/deleteItem/handler.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _functions_plaid_utils_plaid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @functions/plaid/utils/plaid */ \"./src/functions/plaid/utils/plaid.ts\");\n/* harmony import */ var src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/secrets/secrets */ \"./src/secrets/secrets.ts\");\n/* harmony import */ var _functions_plaid_utils_item_table_env__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @functions/plaid/utils/item_table_env */ \"./src/functions/plaid/utils/item_table_env.ts\");\n\n\n\n\n\n\n\nvar ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.DynamoDB.DocumentClient();\nvar ssm = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.SSM();\nconst addItem = async (event, context) => {\n    let parameters;\n    try {\n        let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();\n        parameters = res.Parameters;\n    }\n    catch (e) {\n        console.log(e);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    const region = process.env.REGION;\n    const itemsTableName = (0,_functions_plaid_utils_item_table_env__WEBPACK_IMPORTED_MODULE_6__.getItemsTableName)((0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__.getParameterValue)(parameters, process.env.PLAID_ENV_PATH));\n    aws_sdk__WEBPACK_IMPORTED_MODULE_3__.config.update({ region });\n    let userId = event.requestContext.authorizer.claims.sub;\n    let itemId = (event.body.itemId);\n    let item;\n    try {\n        let ddbParams = {\n            TableName: itemsTableName,\n            Key: {\n                userId,\n                itemId\n            },\n            ReturnValues: 'ALL_OLD'\n        };\n        let res = await ddb.delete(ddbParams).promise();\n        item = ({ ...res.Attributes });\n    }\n    catch (e) {\n        console.log(e);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    let plaidClient = (0,_functions_plaid_utils_plaid__WEBPACK_IMPORTED_MODULE_4__.createPlaidClient)({\n        client_id: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__.getParameterValue)(parameters, process.env.PLAID_CLIENT_ID_PATH),\n        secret: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__.getParameterValue)(parameters, process.env.PLAID_SECRET_PATH),\n        env: (0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__.getParameterValue)(parameters, process.env.PLAID_ENV_PATH),\n    });\n    try {\n        let res = await plaidClient.removeItem(item.accessToken);\n        console.log(res);\n        delete item.accounts;\n        delete item.accessToken;\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, { ...item });\n    }\n    catch (e) {\n        console.log(e);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(addItem);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2l0ZW1zL2RlbGV0ZUl0ZW0vaGFuZGxlci50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnZlcmxlc3MvLi9zcmMvZnVuY3Rpb25zL2l0ZW1zL2RlbGV0ZUl0ZW0vaGFuZGxlci50cz81OWY4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcblxuaW1wb3J0IHR5cGUgeyBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50IH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBmb3JtYXRKU09OUmVzcG9uc2UgfSBmcm9tICdAbGlicy9hcGlHYXRld2F5JztcbmltcG9ydCB7IG1pZGR5ZnkgfSBmcm9tICdAbGlicy9sYW1iZGEnO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ2F3cy1zZGsnO1xuXG5pbXBvcnQgc2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IFBhcmFtZXRlciB9IGZyb20gJ2F3cy1zZGsvY2xpZW50cy9zc20nO1xuaW1wb3J0IHsgY3JlYXRlUGxhaWRDbGllbnQgfSBmcm9tICdAZnVuY3Rpb25zL3BsYWlkL3V0aWxzL3BsYWlkJztcbmltcG9ydCB7IGdldFBhcmFtZXRlclZhbHVlIH0gZnJvbSAnc3JjL3NlY3JldHMvc2VjcmV0cyc7XG5pbXBvcnQgeyBFUGxhaWRFbnZpcm9ubWVudCB9IGZyb20gJ3NyYy9tb2RlbHMvcGxhaWQnO1xuaW1wb3J0IHsgSUl0ZW0gfSBmcm9tICdzcmMvbW9kZWxzL2l0ZW0nO1xuaW1wb3J0IHsgZ2V0SXRlbXNUYWJsZU5hbWUgfSBmcm9tICdAZnVuY3Rpb25zL3BsYWlkL3V0aWxzL2l0ZW1fdGFibGVfZW52JztcblxudmFyIGRkYiA9IG5ldyBhd3MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcbnZhciBzc20gPSBuZXcgYXdzLlNTTSgpO1xuXG5jb25zdCBhZGRJdGVtOiBWYWxpZGF0ZWRFdmVudEFQSUdhdGV3YXlQcm94eUV2ZW50PHR5cGVvZiBzY2hlbWE+ID0gYXN5bmMgKGV2ZW50LCBjb250ZXh0KSA9PiB7XG5cbiAgbGV0IHBhcmFtZXRlcnM6IFBhcmFtZXRlcltdO1xuICB0cnkge1xuICAgIGxldCByZXMgPSBhd2FpdCBzc20uZ2V0UGFyYW1ldGVyc0J5UGF0aCh7IFBhdGg6IHByb2Nlc3MuZW52LlBBUkFNRVRFUlNfUEFUSCB9KS5wcm9taXNlKCk7XG4gICAgcGFyYW1ldGVycyA9IHJlcy5QYXJhbWV0ZXJzO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZSg1MDAsIG51bGwpO1xuICB9XG5cbiAgY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG4gIGNvbnN0IGl0ZW1zVGFibGVOYW1lID0gZ2V0SXRlbXNUYWJsZU5hbWUoPEVQbGFpZEVudmlyb25tZW50PmdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX0VOVl9QQVRIKSlcblxuICBhd3MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbiB9KTtcblxuICBsZXQgdXNlcklkID0gZXZlbnQucmVxdWVzdENvbnRleHQuYXV0aG9yaXplci5jbGFpbXMuc3ViO1xuICBsZXQgaXRlbUlkOiBzdHJpbmcgPSA8c3RyaW5nPihldmVudC5ib2R5Lml0ZW1JZCk7XG5cbiAgbGV0IGl0ZW06IElJdGVtO1xuICB0cnkge1xuICAgIGxldCBkZGJQYXJhbXMgPSB7XG4gICAgICBUYWJsZU5hbWU6IGl0ZW1zVGFibGVOYW1lLFxuICAgICAgS2V5OiB7XG4gICAgICAgIHVzZXJJZCxcbiAgICAgICAgaXRlbUlkXG4gICAgICB9LFxuICAgICAgUmV0dXJuVmFsdWVzOiAnQUxMX09MRCdcbiAgICB9O1xuXG4gICAgbGV0IHJlcyA9IGF3YWl0IGRkYi5kZWxldGUoZGRiUGFyYW1zKS5wcm9taXNlKCk7XG4gICAgaXRlbSA9IDxJSXRlbT4oeyAuLi5yZXMuQXR0cmlidXRlcyB9KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKGUpO1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNTAwLCBudWxsKTtcbiAgfVxuXG4gIGxldCBwbGFpZENsaWVudCA9IGNyZWF0ZVBsYWlkQ2xpZW50KHtcbiAgICBjbGllbnRfaWQ6IGdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX0NMSUVOVF9JRF9QQVRIKSxcbiAgICBzZWNyZXQ6IGdldFBhcmFtZXRlclZhbHVlKHBhcmFtZXRlcnMsIHByb2Nlc3MuZW52LlBMQUlEX1NFQ1JFVF9QQVRIKSxcbiAgICBlbnY6IDxFUGxhaWRFbnZpcm9ubWVudD5nZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9FTlZfUEFUSCksXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IHBsYWlkQ2xpZW50LnJlbW92ZUl0ZW0oaXRlbS5hY2Nlc3NUb2tlbik7XG4gICAgY29uc29sZS5sb2cocmVzKTtcbiAgICBkZWxldGUgaXRlbS5hY2NvdW50cztcbiAgICBkZWxldGUgaXRlbS5hY2Nlc3NUb2tlbjtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDIwMCwgeyAuLi5pdGVtIH0pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwgbnVsbCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1haW4gPSBtaWRkeWZ5KGFkZEl0ZW0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBR0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/items/deleteItem/handler.ts\n");

/***/ }),

/***/ "./src/functions/plaid/utils/item_table_env.ts":
/*!*****************************************************!*\
  !*** ./src/functions/plaid/utils/item_table_env.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getItemsTableName\": () => (/* binding */ getItemsTableName)\n/* harmony export */ });\n/* harmony import */ var src_models_plaid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/models/plaid */ \"./src/models/plaid.ts\");\n\nconst getItemsTableName = (plaidEnv) => {\n    switch (plaidEnv) {\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.SANDBOX:\n            return process.env.ITEMS_TABLE_PLAID_SANDBOX;\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.DEVELOPMENT:\n            return process.env.ITEMS_TABLE_PLAID_DEVELOPMENT;\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.PRODUCTION:\n            return process.env.ITEMS_TABLE_PLAID_PRODUCTION;\n        default:\n            return process.env.ITEMS_TABLE_PLAID_SANDBOX;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL3V0aWxzL2l0ZW1fdGFibGVfZW52LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvcGxhaWQvdXRpbHMvaXRlbV90YWJsZV9lbnYudHM/MjY0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFUGxhaWRFbnZpcm9ubWVudCB9IGZyb20gXCJzcmMvbW9kZWxzL3BsYWlkXCJcblxuZXhwb3J0IGNvbnN0IGdldEl0ZW1zVGFibGVOYW1lID0gKHBsYWlkRW52OiBFUGxhaWRFbnZpcm9ubWVudCk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChwbGFpZEVudikge1xuICAgICAgICBjYXNlIEVQbGFpZEVudmlyb25tZW50LlNBTkRCT1g6XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuSVRFTVNfVEFCTEVfUExBSURfU0FOREJPWDtcbiAgICAgICAgY2FzZSBFUGxhaWRFbnZpcm9ubWVudC5ERVZFTE9QTUVOVDpcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudi5JVEVNU19UQUJMRV9QTEFJRF9ERVZFTE9QTUVOVDtcbiAgICAgICAgY2FzZSBFUGxhaWRFbnZpcm9ubWVudC5QUk9EVUNUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52LklURU1TX1RBQkxFX1BMQUlEX1BST0RVQ1RJT047XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuSVRFTVNfVEFCTEVfUExBSURfU0FOREJPWDtcbiAgICB9XG59Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/plaid/utils/item_table_env.ts\n");

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

/***/ "./src/models/plaid.ts":
/*!*****************************!*\
  !*** ./src/models/plaid.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EPlaidEnvironment\": () => (/* binding */ EPlaidEnvironment)\n/* harmony export */ });\nvar EPlaidEnvironment;\n(function (EPlaidEnvironment) {\n    EPlaidEnvironment[\"SANDBOX\"] = \"sandbox\";\n    EPlaidEnvironment[\"DEVELOPMENT\"] = \"development\";\n    EPlaidEnvironment[\"PRODUCTION\"] = \"production\";\n})(EPlaidEnvironment || (EPlaidEnvironment = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbW9kZWxzL3BsYWlkLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9tb2RlbHMvcGxhaWQudHM/Y2FjMyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSBFUGxhaWRFbnZpcm9ubWVudCB7XG4gICAgU0FOREJPWCA9ICdzYW5kYm94JyxcbiAgICBERVZFTE9QTUVOVCA9ICdkZXZlbG9wbWVudCcsXG4gICAgUFJPRFVDVElPTiA9ICdwcm9kdWN0aW9uJ1xufSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/models/plaid.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/items/deleteItem/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;