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

/***/ "./src/functions/user/createUserOnSignUp/handler.ts":
/*!**********************************************************!*\
  !*** ./src/functions/user/createUserOnSignUp/handler.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"main\": () => (/* binding */ main)\n/* harmony export */ });\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! source-map-support/register */ \"source-map-support/register\");\n/* harmony import */ var source_map_support_register__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(source_map_support_register__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aws-sdk */ \"aws-sdk\");\n/* harmony import */ var aws_sdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aws_sdk__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @libs/lambda */ \"./src/libs/lambda.ts\");\n\n\n\nvar ddb = new aws_sdk__WEBPACK_IMPORTED_MODULE_1__.DynamoDB.DocumentClient();\nconst createUserOnSignUp = async (event, context) => {\n    console.log(event);\n    let date = new Date();\n    const tableName = process.env.DYNAMODB_USER_TABLE;\n    const region = process.env.DYNAMODB_USER_TABLE_REGION;\n    aws_sdk__WEBPACK_IMPORTED_MODULE_1__.config.update({ region: region });\n    if (event.request.userAttributes.sub) {\n        let ddbParams = {\n            Item: {\n                id: event.request.userAttributes.sub,\n                name: event.request.userAttributes.name,\n                onboarding: {\n                    completed: false,\n                },\n                email: event.request.userAttributes.email,\n                createdAt: date.toISOString(),\n            },\n            TableName: tableName\n        };\n        try {\n            await ddb.put(ddbParams).promise();\n            console.log(\"Success\");\n        }\n        catch (err) {\n            console.log(\"Error\", err);\n        }\n        console.log(\"Success: Everything executed correctly\");\n        context.done(null, event);\n    }\n    else {\n        console.log(\"Error: Nothing was written to DDB or SQS\");\n        context.done(null, event);\n    }\n};\nconst main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_2__.middyfy)(createUserOnSignUp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvZnVuY3Rpb25zL3VzZXIvY3JlYXRlVXNlck9uU2lnblVwL2hhbmRsZXIudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXJsZXNzLy4vc3JjL2Z1bmN0aW9ucy91c2VyL2NyZWF0ZVVzZXJPblNpZ25VcC9oYW5kbGVyLnRzP2NhZjkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuXG5pbXBvcnQgeyBQb3N0Q29uZmlybWF0aW9uQ29uZmlybVNpZ25VcFRyaWdnZXJFdmVudCB9IGZyb20gJ2F3cy1sYW1iZGEnO1xuXG5pbXBvcnQgKiBhcyBhd3MgZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBtaWRkeWZ5IH0gZnJvbSAnQGxpYnMvbGFtYmRhJztcbnZhciBkZGIgPSBuZXcgYXdzLkR5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbmNvbnN0IGNyZWF0ZVVzZXJPblNpZ25VcCA9IGFzeW5jIChldmVudDogUG9zdENvbmZpcm1hdGlvbkNvbmZpcm1TaWduVXBUcmlnZ2VyRXZlbnQsIGNvbnRleHQpID0+IHtcbiAgY29uc29sZS5sb2coZXZlbnQpO1xuXG4gIGxldCBkYXRlID0gbmV3IERhdGUoKTtcblxuICBjb25zdCB0YWJsZU5hbWUgPSBwcm9jZXNzLmVudi5EWU5BTU9EQl9VU0VSX1RBQkxFO1xuICBjb25zdCByZWdpb24gPSBwcm9jZXNzLmVudi5EWU5BTU9EQl9VU0VSX1RBQkxFX1JFR0lPTjtcblxuICBhd3MuY29uZmlnLnVwZGF0ZSh7IHJlZ2lvbjogcmVnaW9uIH0pO1xuXG4gIC8vIElmIHRoZSByZXF1aXJlZCBwYXJhbWV0ZXJzIGFyZSBwcmVzZW50LCBwcm9jZWVkXG4gIGlmIChldmVudC5yZXF1ZXN0LnVzZXJBdHRyaWJ1dGVzLnN1Yikge1xuXG4gICAgLy8gLS0gV3JpdGUgZGF0YSB0byBEREJcbiAgICBsZXQgZGRiUGFyYW1zID0ge1xuICAgICAgSXRlbToge1xuICAgICAgICBpZDogZXZlbnQucmVxdWVzdC51c2VyQXR0cmlidXRlcy5zdWIsXG4gICAgICAgIG5hbWU6IGV2ZW50LnJlcXVlc3QudXNlckF0dHJpYnV0ZXMubmFtZSxcbiAgICAgICAgb25ib2FyZGluZzoge1xuICAgICAgICAgIGNvbXBsZXRlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiBldmVudC5yZXF1ZXN0LnVzZXJBdHRyaWJ1dGVzLmVtYWlsLFxuICAgICAgICBjcmVhdGVkQXQ6IGRhdGUudG9JU09TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZVxuICAgIH07XG5cbiAgICAvLyBDYWxsIER5bmFtb0RCXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRkYi5wdXQoZGRiUGFyYW1zKS5wcm9taXNlKClcbiAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2Vzc1wiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3JcIiwgZXJyKTtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhcIlN1Y2Nlc3M6IEV2ZXJ5dGhpbmcgZXhlY3V0ZWQgY29ycmVjdGx5XCIpO1xuICAgIGNvbnRleHQuZG9uZShudWxsLCBldmVudCk7XG5cbiAgfSBlbHNlIHtcbiAgICAvLyBOb3RoaW5nIHRvIGRvLCB0aGUgdXNlcidzIGVtYWlsIElEIGlzIHVua25vd25cbiAgICBjb25zb2xlLmxvZyhcIkVycm9yOiBOb3RoaW5nIHdhcyB3cml0dGVuIHRvIEREQiBvciBTUVNcIik7XG4gICAgY29udGV4dC5kb25lKG51bGwsIGV2ZW50KTtcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1haW4gPSBtaWRkeWZ5KGNyZWF0ZVVzZXJPblNpZ25VcCk7Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUlBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/functions/user/createUserOnSignUp/handler.ts\n");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/functions/user/createUserOnSignUp/handler.ts");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;