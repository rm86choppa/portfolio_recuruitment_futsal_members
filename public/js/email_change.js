/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/email_change.js":
/*!**************************************!*\
  !*** ./resources/js/email_change.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\n  $('#email_change_button').on('click', function () {\n    //今のメールアドレスを取得\n    var email = $('#email_text').text(); //入力した変更後のメールアドレスを取得\n\n    var email_after_change = window.prompt(\"新しいメールアドレスを入力してください\", email); //メールアドレスが入力されてない(空文字)かキャンセル押下(null)してないとき、変更開始\n\n    if (email_after_change == null || email_after_change == \"\") {//何もしない\n    } else if (email_after_change == email) {\n      alert(\"違う値で入力してください\");\n    } else {\n      //更新対象のユーザを検索するためユーザIDを取得\n      var user_id = $('#login_user_id').val();\n      $.ajax({\n        type: 'get',\n        url: '/email',\n        //web.phpのURLと同じ形にする\n        data: {\n          'new_email': email_after_change,\n          //ここはサーバーに贈りたい情報。\n          'user_id': user_id\n        },\n        dataType: 'json',\n        //json形式で受け取る\n        timeout: 900000,\n        beforeSend: function beforeSend() {}\n      }).done(function (data) {\n        if (data['message'] !== 'undefined') {\n          alert(data['message']);\n        }\n      }).fail(function () {\n        alert(\"通信に失敗しました\");\n      });\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZW1haWxfY2hhbmdlLmpzP2YxMTUiXSwibmFtZXMiOlsiJCIsIm9uIiwiZW1haWwiLCJ0ZXh0IiwiZW1haWxfYWZ0ZXJfY2hhbmdlIiwid2luZG93IiwicHJvbXB0IiwiYWxlcnQiLCJ1c2VyX2lkIiwidmFsIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhIiwiZGF0YVR5cGUiLCJ0aW1lb3V0IiwiYmVmb3JlU2VuZCIsImRvbmUiLCJmYWlsIl0sIm1hcHBpbmdzIjoiQUFBQUEsQ0FBQyxDQUFDLFlBQVk7QUFFVkEsR0FBQyxDQUFDLHNCQUFELENBQUQsQ0FBMEJDLEVBQTFCLENBQTZCLE9BQTdCLEVBQXNDLFlBQVc7QUFFN0M7QUFDQSxRQUFNQyxLQUFLLEdBQUdGLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJHLElBQWpCLEVBQWQsQ0FINkMsQ0FLN0M7O0FBQ0EsUUFBTUMsa0JBQWtCLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLHFCQUFkLEVBQXFDSixLQUFyQyxDQUEzQixDQU42QyxDQVE3Qzs7QUFDQSxRQUFHRSxrQkFBa0IsSUFBSSxJQUF0QixJQUE4QkEsa0JBQWtCLElBQUksRUFBdkQsRUFBNEQsQ0FDeEQ7QUFDSCxLQUZELE1BRU8sSUFBR0Esa0JBQWtCLElBQUlGLEtBQXpCLEVBQWdDO0FBQ25DSyxXQUFLLENBQUMsY0FBRCxDQUFMO0FBQ0gsS0FGTSxNQUVBO0FBQ0g7QUFDQSxVQUFNQyxPQUFPLEdBQUdSLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CUyxHQUFwQixFQUFoQjtBQUVBVCxPQUFDLENBQUNVLElBQUYsQ0FBTztBQUNIQyxZQUFJLEVBQUUsS0FESDtBQUVIQyxXQUFHLEVBQUUsUUFGRjtBQUVZO0FBQ2ZDLFlBQUksRUFBRTtBQUNGLHVCQUFhVCxrQkFEWDtBQUMrQjtBQUNqQyxxQkFBV0k7QUFGVCxTQUhIO0FBT0hNLGdCQUFRLEVBQUUsTUFQUDtBQU9lO0FBQ2xCQyxlQUFPLEVBQUUsTUFSTjtBQVNIQyxrQkFBVSxFQUFFLHNCQUFZLENBQ3ZCO0FBVkUsT0FBUCxFQVdHQyxJQVhILENBV1EsVUFBU0osSUFBVCxFQUFjO0FBRWxCLFlBQUdBLElBQUksQ0FBQyxTQUFELENBQUosS0FBb0IsV0FBdkIsRUFBb0M7QUFDaENOLGVBQUssQ0FBQ00sSUFBSSxDQUFDLFNBQUQsQ0FBTCxDQUFMO0FBQ0g7QUFFSixPQWpCRCxFQWlCR0ssSUFqQkgsQ0FpQlEsWUFBVTtBQUNkWCxhQUFLLENBQUMsV0FBRCxDQUFMO0FBQ0gsT0FuQkQ7QUFvQkg7QUFDSixHQXRDRDtBQXVDSCxDQXpDQSxDQUFEIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL2VtYWlsX2NoYW5nZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQoJyNlbWFpbF9jaGFuZ2VfYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8v5LuK44Gu44Oh44O844Or44Ki44OJ44Os44K544KS5Y+W5b6XXHJcbiAgICAgICAgY29uc3QgZW1haWwgPSAkKCcjZW1haWxfdGV4dCcpLnRleHQoKTtcclxuXHJcbiAgICAgICAgLy/lhaXlipvjgZfjgZ/lpInmm7Tlvozjga7jg6Hjg7zjg6vjgqLjg4njg6zjgrnjgpLlj5blvpdcclxuICAgICAgICBjb25zdCBlbWFpbF9hZnRlcl9jaGFuZ2UgPSB3aW5kb3cucHJvbXB0KFwi5paw44GX44GE44Oh44O844Or44Ki44OJ44Os44K544KS5YWl5Yqb44GX44Gm44GP44Gg44GV44GEXCIsIGVtYWlsKTtcclxuXHJcbiAgICAgICAgLy/jg6Hjg7zjg6vjgqLjg4njg6zjgrnjgYzlhaXlipvjgZXjgozjgabjgarjgYQo56m65paH5a2XKeOBi+OCreODo+ODs+OCu+ODq+aKvOS4iyhudWxsKeOBl+OBpuOBquOBhOOBqOOBjeOAgeWkieabtOmWi+Wni1xyXG4gICAgICAgIGlmKGVtYWlsX2FmdGVyX2NoYW5nZSA9PSBudWxsIHx8IGVtYWlsX2FmdGVyX2NoYW5nZSA9PSBcIlwiICkge1xyXG4gICAgICAgICAgICAvL+S9leOCguOBl+OBquOBhFxyXG4gICAgICAgIH0gZWxzZSBpZihlbWFpbF9hZnRlcl9jaGFuZ2UgPT0gZW1haWwpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLpgZXjgYblgKTjgaflhaXlipvjgZfjgabjgY/jgaDjgZXjgYRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mm7TmlrDlr77osaHjga7jg6bjg7zjgrbjgpLmpJzntKLjgZnjgovjgZ/jgoHjg6bjg7zjgrZJROOCkuWPluW+l1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyX2lkID0gJCgnI2xvZ2luX3VzZXJfaWQnKS52YWwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgIHVybDogJy9lbWFpbCcsIC8vd2ViLnBocOOBrlVSTOOBqOWQjOOBmOW9ouOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICduZXdfZW1haWwnOiBlbWFpbF9hZnRlcl9jaGFuZ2UsIC8v44GT44GT44Gv44K144O844OQ44O844Gr6LSI44KK44Gf44GE5oOF5aCx44CCXHJcbiAgICAgICAgICAgICAgICAgICAgJ3VzZXJfaWQnOiB1c2VyX2lkLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsIC8vanNvbuW9ouW8j+OBp+WPl+OBkeWPluOCi1xyXG4gICAgICAgICAgICAgICAgdGltZW91dDogOTAwMDAwLFxyXG4gICAgICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YVsnbWVzc2FnZSddICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGFbJ21lc3NhZ2UnXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIumAmuS/oeOBq+WkseaVl+OBl+OBvuOBl+OBn1wiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/email_change.js\n");

/***/ }),

/***/ 11:
/*!********************************************!*\
  !*** multi ./resources/js/email_change.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laradocks\recuruitment_futsal_members\app\laravel_app\resources\js\email_change.js */"./resources/js/email_change.js");


/***/ })

/******/ });