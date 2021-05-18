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

/***/ "./src/functions/items/getItems/handler.ts":
/*!*************************************************!*\
  !*** ./src/functions/items/getItems/handler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _functions_plaid_utils_item_table_env__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @functions/plaid/utils/item_table_env */ \"./src/functions/plaid/utils/item_table_env.ts\");\n/* harmony import */ var src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/secrets/secrets */ \"./src/secrets/secrets.ts\");\n\n\n\n\n\n\nconst ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.DynamoDB.DocumentClient();\nconst ssm = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.SSM();\nconst getItems = async (event, context) => {\n    let userId = event.requestContext.authorizer.claims.sub;\n    let parameters;\n    try {\n        let res = await ssm.getParametersByPath({ Path: process.env.PARAMETERS_PATH }).promise();\n        parameters = res.Parameters;\n    }\n    catch (e) {\n        console.log(e);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    const itemsTableName = (0,_functions_plaid_utils_item_table_env__WEBPACK_IMPORTED_MODULE_4__.getItemsTableName)((0,src_secrets_secrets__WEBPACK_IMPORTED_MODULE_5__.getParameterValue)(parameters, process.env.PLAID_ENV_PATH));\n    try {\n        let params = {\n            TableName: itemsTableName,\n            KeyConditionExpression: '#userId = :userId',\n            ExpressionAttributeNames: {\n                '#userId': 'userId',\n            },\n            ExpressionAttributeValues: {\n                ':userId': userId,\n            },\n        };\n        let res = await ddb.query(params).promise();\n        let items = res.Items;\n        items.forEach(item => {\n            delete item.accessToken;\n        });\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, { items });\n    }\n    catch (err) {\n        console.log(\"Error\", err);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(getItems);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2l0ZW1zL2dldEl0ZW1zL2hhbmRsZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLy4vc3JjL2Z1bmN0aW9ucy9pdGVtcy9nZXRJdGVtcy9oYW5kbGVyLnRzP2I1ZTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgdHlwZSB7IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQgfSBmcm9tICdAbGlicy9hcGlHYXRld2F5JztcbmltcG9ydCB7IGZvcm1hdEpTT05SZXNwb25zZSB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgbWlkZHlmeSB9IGZyb20gJ0BsaWJzL2xhbWJkYSc7XG5cbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ2F3cy1zZGsnO1xuaW1wb3J0IHsgSUl0ZW0gfSBmcm9tICdzcmMvbW9kZWxzL2l0ZW0nO1xuaW1wb3J0IHsgZ2V0SXRlbXNUYWJsZU5hbWUgfSBmcm9tICdAZnVuY3Rpb25zL3BsYWlkL3V0aWxzL2l0ZW1fdGFibGVfZW52JztcbmltcG9ydCB7IEVQbGFpZEVudmlyb25tZW50IH0gZnJvbSAnc3JjL21vZGVscy9wbGFpZCc7XG5pbXBvcnQgeyBnZXRQYXJhbWV0ZXJWYWx1ZSB9IGZyb20gJ3NyYy9zZWNyZXRzL3NlY3JldHMnO1xuaW1wb3J0IHsgUGFyYW1ldGVyIH0gZnJvbSAnYXdzLXNkay9jbGllbnRzL3NzbSc7XG5cbmNvbnN0IGRkYiA9IG5ldyBhd3MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKVxuY29uc3Qgc3NtID0gbmV3IGF3cy5TU00oKTtcblxuY29uc3QgZ2V0SXRlbXM6IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQ8dHlwZW9mIHNjaGVtYT4gPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbiAgbGV0IHVzZXJJZCA9IGV2ZW50LnJlcXVlc3RDb250ZXh0LmF1dGhvcml6ZXIuY2xhaW1zLnN1YjtcblxuICBsZXQgcGFyYW1ldGVyczogUGFyYW1ldGVyW107XG4gIHRyeSB7XG4gICAgbGV0IHJlcyA9IGF3YWl0IHNzbS5nZXRQYXJhbWV0ZXJzQnlQYXRoKHsgUGF0aDogcHJvY2Vzcy5lbnYuUEFSQU1FVEVSU19QQVRIIH0pLnByb21pc2UoKTtcbiAgICBwYXJhbWV0ZXJzID0gcmVzLlBhcmFtZXRlcnM7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwgbnVsbCk7XG4gIH1cblxuICBjb25zdCBpdGVtc1RhYmxlTmFtZSA9IGdldEl0ZW1zVGFibGVOYW1lKDxFUGxhaWRFbnZpcm9ubWVudD5nZXRQYXJhbWV0ZXJWYWx1ZShwYXJhbWV0ZXJzLCBwcm9jZXNzLmVudi5QTEFJRF9FTlZfUEFUSCkpXG5cbiAgLy8gLy8gQ2FsbCBEeW5hbW9EQlxuICB0cnkge1xuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICBUYWJsZU5hbWU6IGl0ZW1zVGFibGVOYW1lLFxuICAgICAgS2V5Q29uZGl0aW9uRXhwcmVzc2lvbjogJyN1c2VySWQgPSA6dXNlcklkJyxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge1xuICAgICAgICAnI3VzZXJJZCc6ICd1c2VySWQnLFxuICAgICAgfSxcbiAgICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHtcbiAgICAgICAgJzp1c2VySWQnOiB1c2VySWQsXG4gICAgICB9LFxuICAgIH1cblxuICAgIGxldCByZXMgPSBhd2FpdCBkZGIucXVlcnkocGFyYW1zKS5wcm9taXNlKCk7XG4gICAgbGV0IGl0ZW1zOiBJSXRlbVtdID0gPElJdGVtW10+cmVzLkl0ZW1zO1xuXG4gICAgaXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGRlbGV0ZSBpdGVtLmFjY2Vzc1Rva2VuO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdEpTT05SZXNwb25zZSgyMDAsIHsgaXRlbXMgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZXJyKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwgbnVsbCk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1haW4gPSBtaWRkeWZ5KGdldEl0ZW1zKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFHQTtBQUNBO0FBR0E7QUFFQTtBQUVBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/items/getItems/handler.ts\n");

/***/ }),

/***/ "./src/functions/plaid/utils/item_table_env.ts":
/*!*****************************************************!*\
  !*** ./src/functions/plaid/utils/item_table_env.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getItemsTableName\": () => (/* binding */ getItemsTableName)\n/* harmony export */ });\n/* harmony import */ var src_models_plaid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/models/plaid */ \"./src/models/plaid.ts\");\n\nconst getItemsTableName = (plaidEnv) => {\n    switch (plaidEnv) {\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.SANDBOX:\n            return process.env.ITEMS_TABLE_PLAID_SANDBOX;\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.DEVELOPMENT:\n            return process.env.ITEMS_TABLE_PLAID_DEVELOPMENT;\n        case src_models_plaid__WEBPACK_IMPORTED_MODULE_0__.EPlaidEnvironment.PRODUCTION:\n            return process.env.ITEMS_TABLE_PLAID_PRODUCTION;\n        default:\n            return process.env.ITEMS_TABLE_PLAID_SANDBOX;\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL3V0aWxzL2l0ZW1fdGFibGVfZW52LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvcGxhaWQvdXRpbHMvaXRlbV90YWJsZV9lbnYudHM/MjY0YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFUGxhaWRFbnZpcm9ubWVudCB9IGZyb20gXCJzcmMvbW9kZWxzL3BsYWlkXCJcblxuZXhwb3J0IGNvbnN0IGdldEl0ZW1zVGFibGVOYW1lID0gKHBsYWlkRW52OiBFUGxhaWRFbnZpcm9ubWVudCk6IHN0cmluZyA9PiB7XG4gICAgc3dpdGNoIChwbGFpZEVudikge1xuICAgICAgICBjYXNlIEVQbGFpZEVudmlyb25tZW50LlNBTkRCT1g6XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuSVRFTVNfVEFCTEVfUExBSURfU0FOREJPWDtcbiAgICAgICAgY2FzZSBFUGxhaWRFbnZpcm9ubWVudC5ERVZFTE9QTUVOVDpcbiAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudi5JVEVNU19UQUJMRV9QTEFJRF9ERVZFTE9QTUVOVDtcbiAgICAgICAgY2FzZSBFUGxhaWRFbnZpcm9ubWVudC5QUk9EVUNUSU9OOlxuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52LklURU1TX1RBQkxFX1BMQUlEX1BST0RVQ1RJT047XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnYuSVRFTVNfVEFCTEVfUExBSURfU0FOREJPWDtcbiAgICB9XG59Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/plaid/utils/item_table_env.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/items/getItems/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;