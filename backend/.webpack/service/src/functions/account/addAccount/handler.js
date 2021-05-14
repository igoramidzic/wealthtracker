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

/***/ "./src/functions/account/addAccount/handler.ts":
/*!*****************************************************!*\
  !*** ./src/functions/account/addAccount/handler.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/apiGateway */ \"./src/libs/apiGateway.ts\");\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! uuid */ \"uuid\");\n/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _user_utils_getUserFromDynamo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../user/utils/getUserFromDynamo */ \"./src/functions/user/utils/getUserFromDynamo.ts\");\n/* harmony import */ var _functions_plaid_utils_plaid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @functions/plaid/utils/plaid */ \"./src/functions/plaid/utils/plaid.ts\");\n\n\n\n\n\n\n\nvar ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_4__.DynamoDB.DocumentClient();\nconst addAccount = async (event, context) => {\n    const accountTableName = process.env.ACCOUNT_TABLE;\n    const region = process.env.REGION;\n    aws_sdk__WEBPACK_IMPORTED_MODULE_4__.config.update({ region });\n    let userId = '68728214-2cfb-490a-bdc4-98e52c2b15fb';\n    let user;\n    try {\n        user = await (0,_user_utils_getUserFromDynamo__WEBPACK_IMPORTED_MODULE_5__.getUserFromDynamo)(userId);\n        if (!user)\n            return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    catch (e) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, null);\n    }\n    if (!userCanCreateAnAccount(user))\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(400, { error: \"Cannot create an account at this time\" });\n    let publicToken = (event.body.public_token);\n    let createTokenResponse;\n    try {\n        createTokenResponse = await _functions_plaid_utils_plaid__WEBPACK_IMPORTED_MODULE_6__.plaidClient.exchangePublicToken(publicToken);\n    }\n    catch (error) {\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, { error });\n    }\n    try {\n        let account = {\n            accountId: (0,uuid__WEBPACK_IMPORTED_MODULE_3__.v4)(),\n            userId,\n            mask: 1234,\n            itemId: createTokenResponse.item_id,\n            accessToken: createTokenResponse.access_token,\n            createdAt: new Date().toISOString(),\n        };\n        let ddbParams = {\n            Item: account,\n            TableName: accountTableName\n        };\n        console.log(account);\n        await ddb.put(ddbParams).promise();\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(200, { ...account });\n    }\n    catch (err) {\n        console.log(\"Error\", err);\n        return (0,_libs_apiGateway__WEBPACK_IMPORTED_MODULE_1__.formatJSONResponse)(500, {});\n    }\n};\nconst userCanCreateAnAccount = (user) => {\n    return user.onboarding.completed;\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(addAccount);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL2FjY291bnQvYWRkQWNjb3VudC9oYW5kbGVyLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvYWNjb3VudC9hZGRBY2NvdW50L2hhbmRsZXIudHM/ZmU2OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5cbmltcG9ydCB0eXBlIHsgVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudCB9IGZyb20gJ0BsaWJzL2FwaUdhdGV3YXknO1xuaW1wb3J0IHsgZm9ybWF0SlNPTlJlc3BvbnNlIH0gZnJvbSAnQGxpYnMvYXBpR2F0ZXdheSc7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSAnQGxpYnMvbGFtYmRhJztcbmltcG9ydCB7IHY0IGFzIHV1aWR2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0ICogYXMgYXdzIGZyb20gJ2F3cy1zZGsnO1xuXG5pbXBvcnQgc2NoZW1hIGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IGdldFVzZXJGcm9tRHluYW1vIH0gZnJvbSAnLi4vLi4vdXNlci91dGlscy9nZXRVc2VyRnJvbUR5bmFtbyc7XG5pbXBvcnQgeyBJVXNlciB9IGZyb20gJ3NyYy9tb2RlbHMvdXNlcic7XG5pbXBvcnQgeyBJQWNjb3VudCB9IGZyb20gJ3NyYy9tb2RlbHMvYWNjb3VudCc7XG5pbXBvcnQgeyBwbGFpZENsaWVudCB9IGZyb20gJ0BmdW5jdGlvbnMvcGxhaWQvdXRpbHMvcGxhaWQnO1xuaW1wb3J0IHsgVG9rZW5SZXNwb25zZSB9IGZyb20gJ3BsYWlkJztcblxudmFyIGRkYiA9IG5ldyBhd3MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcblxuY29uc3QgYWRkQWNjb3VudDogVmFsaWRhdGVkRXZlbnRBUElHYXRld2F5UHJveHlFdmVudDx0eXBlb2Ygc2NoZW1hPiA9IGFzeW5jIChldmVudCwgY29udGV4dCkgPT4ge1xuICBjb25zdCBhY2NvdW50VGFibGVOYW1lID0gcHJvY2Vzcy5lbnYuQUNDT1VOVF9UQUJMRTtcbiAgY29uc3QgcmVnaW9uID0gcHJvY2Vzcy5lbnYuUkVHSU9OO1xuXG4gIGF3cy5jb25maWcudXBkYXRlKHsgcmVnaW9uIH0pO1xuXG4gIC8vIGxldCB1c2VySWQgPSBldmVudC5yZXF1ZXN0Q29udGV4dC5hdXRob3JpemVyLmNsYWltcy5zdWI7XG4gIGxldCB1c2VySWQgPSAnNjg3MjgyMTQtMmNmYi00OTBhLWJkYzQtOThlNTJjMmIxNWZiJztcblxuICAvLyBGaXJzdCBmaW5kIHRoZSB1c2VyXG4gIGxldCB1c2VyOiBJVXNlcjtcbiAgdHJ5IHtcbiAgICB1c2VyID0gYXdhaXQgZ2V0VXNlckZyb21EeW5hbW8odXNlcklkKTtcblxuICAgIGlmICghdXNlcilcbiAgICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNTAwLCBudWxsKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNTAwLCBudWxsKTtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHVzZXIgY2FuIGNyZWF0ZSBhbiBhY2NvdW50XG4gIGlmICghdXNlckNhbkNyZWF0ZUFuQWNjb3VudCh1c2VyKSlcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDQwMCwgeyBlcnJvcjogXCJDYW5ub3QgY3JlYXRlIGFuIGFjY291bnQgYXQgdGhpcyB0aW1lXCIgfSk7XG5cbiAgbGV0IHB1YmxpY1Rva2VuOiBzdHJpbmcgPSA8c3RyaW5nPihldmVudC5ib2R5LnB1YmxpY190b2tlbik7XG5cbiAgbGV0IGNyZWF0ZVRva2VuUmVzcG9uc2U6IFRva2VuUmVzcG9uc2U7XG4gIHRyeSB7XG4gICAgY3JlYXRlVG9rZW5SZXNwb25zZSA9IGF3YWl0IHBsYWlkQ2xpZW50LmV4Y2hhbmdlUHVibGljVG9rZW4ocHVibGljVG9rZW4pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoNTAwLCB7IGVycm9yIH0pXG4gIH1cblxuICB0cnkge1xuICAgIGxldCBhY2NvdW50OiBJQWNjb3VudCA9IHtcbiAgICAgIGFjY291bnRJZDogdXVpZHY0KCksXG4gICAgICB1c2VySWQsXG4gICAgICBtYXNrOiAxMjM0LFxuICAgICAgaXRlbUlkOiBjcmVhdGVUb2tlblJlc3BvbnNlLml0ZW1faWQsXG4gICAgICBhY2Nlc3NUb2tlbjogY3JlYXRlVG9rZW5SZXNwb25zZS5hY2Nlc3NfdG9rZW4sXG4gICAgICBjcmVhdGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICB9O1xuXG4gICAgbGV0IGRkYlBhcmFtcyA9IHtcbiAgICAgIEl0ZW06IGFjY291bnQsXG4gICAgICBUYWJsZU5hbWU6IGFjY291bnRUYWJsZU5hbWVcbiAgICB9O1xuXG4gICAgY29uc29sZS5sb2coYWNjb3VudClcbiAgICBhd2FpdCBkZGIucHV0KGRkYlBhcmFtcykucHJvbWlzZSgpO1xuICAgIHJldHVybiBmb3JtYXRKU09OUmVzcG9uc2UoMjAwLCB7IC4uLmFjY291bnQgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZXJyKTtcbiAgICByZXR1cm4gZm9ybWF0SlNPTlJlc3BvbnNlKDUwMCwge30pO1xuICB9XG59XG5cbmNvbnN0IHVzZXJDYW5DcmVhdGVBbkFjY291bnQgPSAodXNlcjogSVVzZXIpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIHVzZXIub25ib2FyZGluZy5jb21wbGV0ZWQ7XG59XG5cbmV4cG9ydCBjb25zdCBtYWluID0gbWlkZHlmeShhZGRBY2NvdW50KTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFHQTtBQUdBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/account/addAccount/handler.ts\n");

/***/ }),

/***/ "./src/functions/plaid/utils/plaid.ts":
/*!********************************************!*\
  !*** ./src/functions/plaid/utils/plaid.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PLAID_ENV\": () => (/* binding */ PLAID_ENV),\n/* harmony export */   \"PLAID_PRODUCTS\": () => (/* binding */ PLAID_PRODUCTS),\n/* harmony export */   \"PLAID_COUNTRY_CODES\": () => (/* binding */ PLAID_COUNTRY_CODES),\n/* harmony export */   \"plaidClient\": () => (/* binding */ plaidClient)\n/* harmony export */ });\n/* harmony import */ var plaid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! plaid */ \"plaid\");\n/* harmony import */ var plaid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(plaid__WEBPACK_IMPORTED_MODULE_0__);\n\nconst PLAID_ENV = process.env.PLAID_ENV || 'sandbox';\nconst PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || 'transactions').split(',');\nconst PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',');\nconst plaidClient = new plaid__WEBPACK_IMPORTED_MODULE_0__.Client({\n    clientID: process.env.PLAID_CLIENT_ID || '',\n    secret: process.env.PLAID_SECRET || '',\n    env: plaid__WEBPACK_IMPORTED_MODULE_0__.environments[PLAID_ENV],\n    options: {\n        version: '2019-05-29',\n    },\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3BsYWlkL3V0aWxzL3BsYWlkLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VydmVybGVzcy8uL3NyYy9mdW5jdGlvbnMvcGxhaWQvdXRpbHMvcGxhaWQudHM/ZWFlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQsIGVudmlyb25tZW50cyB9IGZyb20gXCJwbGFpZFwiO1xuXG5leHBvcnQgY29uc3QgUExBSURfRU5WID0gcHJvY2Vzcy5lbnYuUExBSURfRU5WIHx8ICdzYW5kYm94JztcblxuLy8gUExBSURfUFJPRFVDVFMgaXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBwcm9kdWN0cyB0byB1c2Ugd2hlbiBpbml0aWFsaXppbmdcbi8vIExpbmsuIE5vdGUgdGhhdCB0aGlzIGxpc3QgbXVzdCBjb250YWluICdhc3NldHMnIGluIG9yZGVyIGZvciB0aGUgYXBwIHRvIGJlXG4vLyBhYmxlIHRvIGNyZWF0ZSBhbmQgcmV0cmlldmUgYXNzZXQgcmVwb3J0cy5cbmV4cG9ydCBjb25zdCBQTEFJRF9QUk9EVUNUUyA9IChwcm9jZXNzLmVudi5QTEFJRF9QUk9EVUNUUyB8fCAndHJhbnNhY3Rpb25zJykuc3BsaXQoXG4gICcsJyxcbik7XG5cbi8vIFBMQUlEX0NPVU5UUllfQ09ERVMgaXMgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBjb3VudHJpZXMgZm9yIHdoaWNoIHVzZXJzXG4vLyB3aWxsIGJlIGFibGUgdG8gc2VsZWN0IGluc3RpdHV0aW9ucyBmcm9tLlxuZXhwb3J0IGNvbnN0IFBMQUlEX0NPVU5UUllfQ09ERVMgPSAocHJvY2Vzcy5lbnYuUExBSURfQ09VTlRSWV9DT0RFUyB8fCAnVVMnKS5zcGxpdChcbiAgJywnLFxuKTtcblxuZXhwb3J0IGNvbnN0IHBsYWlkQ2xpZW50ID0gbmV3IENsaWVudCh7XG4gIGNsaWVudElEOiBwcm9jZXNzLmVudi5QTEFJRF9DTElFTlRfSUQgfHwgJycsXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuUExBSURfU0VDUkVUIHx8ICcnLFxuICBlbnY6IGVudmlyb25tZW50c1tQTEFJRF9FTlZdLFxuICBvcHRpb25zOiB7XG4gICAgdmVyc2lvbjogJzIwMTktMDUtMjknLFxuICB9LFxufSk7XG5cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUtBO0FBTUE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/functions/plaid/utils/plaid.ts\n");

/***/ }),

/***/ "./src/functions/user/utils/getUserFromDynamo.ts":
/*!*******************************************************!*\
  !*** ./src/functions/user/utils/getUserFromDynamo.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getUserFromDynamo\": () => (/* binding */ getUserFromDynamo)\n/* harmony export */ });\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_0__);\n\nconst getUserFromDynamo = async (userId) => {\n    aws_sdk__WEBPACK_IMPORTED_MODULE_0__.config.update({ region: process.env.REGION });\n    var ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_0__.DynamoDB.DocumentClient();\n    let params = {\n        Key: {\n            id: userId\n        },\n        TableName: process.env.USER_TABLE\n    };\n    let userDoc = await ddb.get(params).promise();\n    let user = userDoc.Item;\n    if (user)\n        return (user);\n    throw new Error(\"User not found.\");\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3VzZXIvdXRpbHMvZ2V0VXNlckZyb21EeW5hbW8udHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLy4vc3JjL2Z1bmN0aW9ucy91c2VyL3V0aWxzL2dldFVzZXJGcm9tRHluYW1vLnRzPzY3YTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVVzZXIgfSBmcm9tIFwic3JjL21vZGVscy91c2VyXCI7XG5pbXBvcnQgKiBhcyBhd3MgZnJvbSAnYXdzLXNkayc7XG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyRnJvbUR5bmFtbyA9IGFzeW5jICh1c2VySWQ6IHN0cmluZyk6IFByb21pc2U8SVVzZXI+ID0+IHtcbiAgICBhd3MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcHJvY2Vzcy5lbnYuUkVHSU9OIH0pO1xuXG4gICAgdmFyIGRkYiA9IG5ldyBhd3MuRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcblxuICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIEtleToge1xuICAgICAgICAgICAgaWQ6IHVzZXJJZFxuICAgICAgICB9LFxuICAgICAgICBUYWJsZU5hbWU6IHByb2Nlc3MuZW52LlVTRVJfVEFCTEVcbiAgICB9O1xuXG4gICAgbGV0IHVzZXJEb2MgPSBhd2FpdCBkZGIuZ2V0KHBhcmFtcykucHJvbWlzZSgpO1xuXG4gICAgbGV0IHVzZXIgPSB1c2VyRG9jLkl0ZW07XG5cbiAgICBpZiAodXNlcilcbiAgICAgICAgcmV0dXJuIDxJVXNlcj4odXNlcik7XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJVc2VyIG5vdCBmb3VuZC5cIik7XG59Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQTtBQUNBO0FBRUE7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/functions/user/utils/getUserFromDynamo.ts\n");

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

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("uuid");;

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/account/addAccount/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;