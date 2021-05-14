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

/***/ "./src/functions/onboarding/completeOnboarding/handler.ts":
/*!****************************************************************!*\
  !*** ./src/functions/onboarding/completeOnboarding/handler.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nconst completeOnboarding = async (event, context) => {\n    const tableName = process.env.USER_TABLE;\n    const region = process.env.REGION;\n    aws_sdk__WEBPACK_IMPORTED_MODULE_3__.config.update({ region });\n    var ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_3__.DynamoDB.DocumentClient();\n    if (!event.requestContext.authorizer.claims) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(401, null);\n    }\n    let onboardingObj = mapBodyToOnboarding(event.body);\n    if (!validateOnboarding(onboardingObj)) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(400, {\n            error: \"Onboarding not valid\"\n        });\n    }\n    let userId = event.requestContext.authorizer.claims.sub;\n    try {\n        let item = {\n            id: userId,\n            onboarding: onboardingObj\n        };\n        let params = createUpdateParams(tableName, item, \"id\");\n        let user = await ddb.update(params).promise();\n        if (user.Attributes) {\n            console.log(\"Success\");\n            return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, user.Attributes.onboarding);\n        }\n        else {\n            console.log(\"User not found\");\n            return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(404, { error: 'User not found' });\n        }\n    }\n    catch (err) {\n        console.log(\"Error\", err);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, {});\n    }\n};\nconst mapBodyToOnboarding = (body) => {\n    return {\n        completed: body.completed,\n    };\n};\nconst validateOnboarding = (onboarding) => {\n    if (onboarding == undefined)\n        return false;\n    if (onboarding.completed !== true && onboarding.completed !== false)\n        return false;\n    return true;\n};\nconst createUpdateParams = (tableName, item, idAttributeName) => {\n    var params = {\n        TableName: tableName,\n        Key: {},\n        ExpressionAttributeValues: {},\n        ExpressionAttributeNames: {},\n        UpdateExpression: \"\",\n        ReturnValues: \"UPDATED_NEW\"\n    };\n    params[\"Key\"][idAttributeName] = item[idAttributeName];\n    let prefix = \"set \";\n    let attributes = Object.keys(item);\n    for (let i = 0; i < attributes.length; i++) {\n        let attribute = attributes[i];\n        if (attribute != idAttributeName) {\n            params[\"UpdateExpression\"] += prefix + \"#\" + attribute + \" = :\" + attribute;\n            params[\"ExpressionAttributeValues\"][\":\" + attribute] = item[attribute];\n            params[\"ExpressionAttributeNames\"][\"#\" + attribute] = attribute;\n            prefix = \", \";\n        }\n    }\n    return params;\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(completeOnboarding);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL29uYm9hcmRpbmcvY29tcGxldGVPbmJvYXJkaW5nL2hhbmRsZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLy4vc3JjL2Z1bmN0aW9ucy9vbmJvYXJkaW5nL2NvbXBsZXRlT25ib2FyZGluZy9oYW5kbGVyLnRzPzM2NzYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgdHlwZSB7IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQgfSBmcm9tICdAbGlicy9hcGlHYXRld2F5JztcbmltcG9ydCB7IGZvcm1hdEpTT05SZXNwb25zZSB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgbWlkZHlmeSB9IGZyb20gJ0BsaWJzL2xhbWJkYSc7XG5pbXBvcnQgKiBhcyBhd3MgZnJvbSAnYXdzLXNkayc7XG5cbmltcG9ydCBzY2hlbWEgZnJvbSAnLi9zY2hlbWEnO1xuaW1wb3J0IHsgSU9uYm9hcmRpbmcgfSBmcm9tICdzcmMvbW9kZWxzL3VzZXInO1xuXG5jb25zdCBjb21wbGV0ZU9uYm9hcmRpbmc6IFZhbGlkYXRlZEV2ZW50QVBJR2F0ZXdheVByb3h5RXZlbnQ8dHlwZW9mIHNjaGVtYT4gPSBhc3luYyAoZXZlbnQsIGNvbnRleHQpID0+IHtcbiAgY29uc3QgdGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuVVNFUl9UQUJMRTtcbiAgY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG4gIGF3cy5jb25maWcudXBkYXRlKHsgcmVnaW9uIH0pO1xuXG4gIHZhciBkZGIgPSBuZXcgYXdzLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbiAgaWYgKCFldmVudC5yZXF1ZXN0Q29udGV4dC5hdXRob3JpemVyLmNsYWltcykge1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNDAxLCBudWxsKTtcbiAgfVxuXG4gIGxldCBvbmJvYXJkaW5nT2JqOiBJT25ib2FyZGluZyA9IG1hcEJvZHlUb09uYm9hcmRpbmcoZXZlbnQuYm9keSk7XG5cbiAgaWYgKCF2YWxpZGF0ZU9uYm9hcmRpbmcob25ib2FyZGluZ09iaikpIHtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDQwMCwge1xuICAgICAgZXJyb3I6IFwiT25ib2FyZGluZyBub3QgdmFsaWRcIlxuICAgIH0pXG4gIH1cblxuICBsZXQgdXNlcklkID0gZXZlbnQucmVxdWVzdENvbnRleHQuYXV0aG9yaXplci5jbGFpbXMuc3ViO1xuXG4gIHRyeSB7XG4gICAgbGV0IGl0ZW0gPSB7XG4gICAgICBpZDogdXNlcklkLFxuICAgICAgb25ib2FyZGluZzogb25ib2FyZGluZ09ialxuICAgIH1cbiAgICBsZXQgcGFyYW1zID0gY3JlYXRlVXBkYXRlUGFyYW1zKHRhYmxlTmFtZSwgaXRlbSwgXCJpZFwiKTtcblxuICAgIGxldCB1c2VyID0gYXdhaXQgZGRiLnVwZGF0ZShwYXJhbXMpLnByb21pc2UoKTtcblxuICAgIGlmICh1c2VyLkF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcbiAgICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoMjAwLCB1c2VyLkF0dHJpYnV0ZXMub25ib2FyZGluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiVXNlciBub3QgZm91bmRcIilcbiAgICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNDA0LCB7IGVycm9yOiAnVXNlciBub3QgZm91bmQnIH0pO1xuICAgIH1cblxuXG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZXJyKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwge30pO1xuICB9XG59XG5cbmNvbnN0IG1hcEJvZHlUb09uYm9hcmRpbmcgPSAoYm9keTogYW55KTogSU9uYm9hcmRpbmcgPT4ge1xuICByZXR1cm4ge1xuICAgIGNvbXBsZXRlZDogYm9keS5jb21wbGV0ZWQsXG4gIH1cbn1cblxuY29uc3QgdmFsaWRhdGVPbmJvYXJkaW5nID0gKG9uYm9hcmRpbmc6IElPbmJvYXJkaW5nKTogYm9vbGVhbiA9PiB7XG4gIGlmIChvbmJvYXJkaW5nID09IHVuZGVmaW5lZCkgcmV0dXJuIGZhbHNlO1xuICBpZiAob25ib2FyZGluZy5jb21wbGV0ZWQgIT09IHRydWUgJiYgb25ib2FyZGluZy5jb21wbGV0ZWQgIT09IGZhbHNlKVxuICAgIHJldHVybiBmYWxzZTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY29uc3QgY3JlYXRlVXBkYXRlUGFyYW1zID0gKHRhYmxlTmFtZTogc3RyaW5nLCBpdGVtOiBhbnksIGlkQXR0cmlidXRlTmFtZTogc3RyaW5nKTogYXdzLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50LlVwZGF0ZUl0ZW1JbnB1dCA9PiB7XG5cbiAgdmFyIHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgICBLZXk6IHt9LFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXM6IHt9LFxuICAgIEV4cHJlc3Npb25BdHRyaWJ1dGVOYW1lczoge30sXG4gICAgVXBkYXRlRXhwcmVzc2lvbjogXCJcIixcbiAgICBSZXR1cm5WYWx1ZXM6IFwiVVBEQVRFRF9ORVdcIlxuICB9O1xuXG4gIHBhcmFtc1tcIktleVwiXVtpZEF0dHJpYnV0ZU5hbWVdID0gaXRlbVtpZEF0dHJpYnV0ZU5hbWVdO1xuXG4gIGxldCBwcmVmaXggPSBcInNldCBcIjtcbiAgbGV0IGF0dHJpYnV0ZXMgPSBPYmplY3Qua2V5cyhpdGVtKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbaV07XG4gICAgaWYgKGF0dHJpYnV0ZSAhPSBpZEF0dHJpYnV0ZU5hbWUpIHtcbiAgICAgIHBhcmFtc1tcIlVwZGF0ZUV4cHJlc3Npb25cIl0gKz0gcHJlZml4ICsgXCIjXCIgKyBhdHRyaWJ1dGUgKyBcIiA9IDpcIiArIGF0dHJpYnV0ZTtcbiAgICAgIHBhcmFtc1tcIkV4cHJlc3Npb25BdHRyaWJ1dGVWYWx1ZXNcIl1bXCI6XCIgKyBhdHRyaWJ1dGVdID0gaXRlbVthdHRyaWJ1dGVdO1xuICAgICAgcGFyYW1zW1wiRXhwcmVzc2lvbkF0dHJpYnV0ZU5hbWVzXCJdW1wiI1wiICsgYXR0cmlidXRlXSA9IGF0dHJpYnV0ZTtcbiAgICAgIHByZWZpeCA9IFwiLCBcIjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgY29uc3QgbWFpbiA9IG1pZGR5ZnkoY29tcGxldGVPbmJvYXJkaW5nKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBR0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/onboarding/completeOnboarding/handler.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/onboarding/completeOnboarding/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;