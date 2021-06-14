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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/user_name_change.js":
/*!******************************************!*\
  !*** ./resources/js/user_name_change.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\n  $('#user_name_change_button').on('click', function () {\n    //ユーザ名変更の入力欄に初期値として今のユーザネームを取得\n    var name = $('#user_name_text').text(); //入力した変更後のnameを取得\n\n    var user_name_after_change = window.prompt(\"新しいユーザ名を入力してください\", name); //ユーザ名が入力されてない(空文字)かキャンセル押下(null)してないとき、変更開始\n\n    if (user_name_after_change == null || user_name_after_change == \"\") {//何もしない\n    } else if (user_name_after_change == name) {\n      alert(\"違う値で登録してください\");\n    } else {\n      //更新対象のユーザを検索するためユーザIDを取得\n      var user_id = $('#login_user_id').val();\n      $.ajax({\n        type: 'get',\n        url: '/name_change',\n        //web.phpのURLと同じ形にする\n        data: {\n          'name': user_name_after_change,\n          //ここはサーバーに贈りたい情報。\n          'user_id': user_id\n        },\n        dataType: 'json',\n        //json形式で受け取る\n        timeout: 900000,\n        beforeSend: function beforeSend() {}\n      }).done(function (data) {\n        $('.name').each(function () {\n          //変更後のnameの値で表示されてるネーム情報更新\n          $(this).text(data['name']);\n        });\n        alert('ユーザ名を変更しました');\n      }).fail(function () {\n        alert(\"通信に失敗しました\");\n      });\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdXNlcl9uYW1lX2NoYW5nZS5qcz9mMmRmIl0sIm5hbWVzIjpbIiQiLCJvbiIsIm5hbWUiLCJ0ZXh0IiwidXNlcl9uYW1lX2FmdGVyX2NoYW5nZSIsIndpbmRvdyIsInByb21wdCIsImFsZXJ0IiwidXNlcl9pZCIsInZhbCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwidGltZW91dCIsImJlZm9yZVNlbmQiLCJkb25lIiwiZWFjaCIsImZhaWwiXSwibWFwcGluZ3MiOiJBQUFBQSxDQUFDLENBQUMsWUFBWTtBQUVWQSxHQUFDLENBQUMsMEJBQUQsQ0FBRCxDQUE4QkMsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVztBQUVqRDtBQUNBLFFBQU1DLElBQUksR0FBR0YsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJHLElBQXJCLEVBQWIsQ0FIaUQsQ0FLakQ7O0FBQ0EsUUFBTUMsc0JBQXNCLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLGtCQUFkLEVBQWtDSixJQUFsQyxDQUEvQixDQU5pRCxDQVFqRDs7QUFDQSxRQUFHRSxzQkFBc0IsSUFBSSxJQUExQixJQUFrQ0Esc0JBQXNCLElBQUksRUFBL0QsRUFBb0UsQ0FDaEU7QUFDSCxLQUZELE1BRU8sSUFBR0Esc0JBQXNCLElBQUlGLElBQTdCLEVBQW1DO0FBQ3RDSyxXQUFLLENBQUMsY0FBRCxDQUFMO0FBQ0gsS0FGTSxNQUVBO0FBQ0g7QUFDQSxVQUFNQyxPQUFPLEdBQUdSLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CUyxHQUFwQixFQUFoQjtBQUVBVCxPQUFDLENBQUNVLElBQUYsQ0FBTztBQUNIQyxZQUFJLEVBQUUsS0FESDtBQUVIQyxXQUFHLEVBQUUsY0FGRjtBQUVrQjtBQUNyQkMsWUFBSSxFQUFFO0FBQ0Ysa0JBQVFULHNCQUROO0FBQzhCO0FBQ2hDLHFCQUFXSTtBQUZULFNBSEg7QUFPSE0sZ0JBQVEsRUFBRSxNQVBQO0FBT2U7QUFDbEJDLGVBQU8sRUFBRSxNQVJOO0FBU0hDLGtCQUFVLEVBQUUsc0JBQVksQ0FDdkI7QUFWRSxPQUFQLEVBV0dDLElBWEgsQ0FXUSxVQUFTSixJQUFULEVBQWM7QUFFbEJiLFNBQUMsQ0FBQyxPQUFELENBQUQsQ0FBV2tCLElBQVgsQ0FBZ0IsWUFBVztBQUN2QjtBQUNBbEIsV0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRRyxJQUFSLENBQWFVLElBQUksQ0FBQyxNQUFELENBQWpCO0FBQ0gsU0FIRDtBQUlBTixhQUFLLENBQUMsYUFBRCxDQUFMO0FBRUgsT0FuQkQsRUFtQkdZLElBbkJILENBbUJRLFlBQVU7QUFDZFosYUFBSyxDQUFDLFdBQUQsQ0FBTDtBQUNILE9BckJEO0FBc0JIO0FBQ0osR0F4Q0Q7QUF5Q0gsQ0EzQ0EsQ0FBRCIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy91c2VyX25hbWVfY2hhbmdlLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgJCgnI3VzZXJfbmFtZV9jaGFuZ2VfYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIC8v44Om44O844K25ZCN5aSJ5pu044Gu5YWl5Yqb5qyE44Gr5Yid5pyf5YCk44Go44GX44Gm5LuK44Gu44Om44O844K244ON44O844Og44KS5Y+W5b6XXHJcbiAgICAgICAgY29uc3QgbmFtZSA9ICQoJyN1c2VyX25hbWVfdGV4dCcpLnRleHQoKTtcclxuXHJcbiAgICAgICAgLy/lhaXlipvjgZfjgZ/lpInmm7Tlvozjga5uYW1l44KS5Y+W5b6XXHJcbiAgICAgICAgY29uc3QgdXNlcl9uYW1lX2FmdGVyX2NoYW5nZSA9IHdpbmRvdy5wcm9tcHQoXCLmlrDjgZfjgYTjg6bjg7zjgrblkI3jgpLlhaXlipvjgZfjgabjgY/jgaDjgZXjgYRcIiwgbmFtZSk7XHJcblxyXG4gICAgICAgIC8v44Om44O844K25ZCN44GM5YWl5Yqb44GV44KM44Gm44Gq44GEKOepuuaWh+WtlynjgYvjgq3jg6Pjg7Pjgrvjg6vmirzkuIsobnVsbCnjgZfjgabjgarjgYTjgajjgY3jgIHlpInmm7Tplovlp4tcclxuICAgICAgICBpZih1c2VyX25hbWVfYWZ0ZXJfY2hhbmdlID09IG51bGwgfHwgdXNlcl9uYW1lX2FmdGVyX2NoYW5nZSA9PSBcIlwiICkge1xyXG4gICAgICAgICAgICAvL+S9leOCguOBl+OBquOBhFxyXG4gICAgICAgIH0gZWxzZSBpZih1c2VyX25hbWVfYWZ0ZXJfY2hhbmdlID09IG5hbWUpIHtcclxuICAgICAgICAgICAgYWxlcnQoXCLpgZXjgYblgKTjgafnmbvpjLLjgZfjgabjgY/jgaDjgZXjgYRcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/mm7TmlrDlr77osaHjga7jg6bjg7zjgrbjgpLmpJzntKLjgZnjgovjgZ/jgoHjg6bjg7zjgrZJROOCkuWPluW+l1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyX2lkID0gJCgnI2xvZ2luX3VzZXJfaWQnKS52YWwoKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0JyxcclxuICAgICAgICAgICAgICAgIHVybDogJy9uYW1lX2NoYW5nZScsIC8vd2ViLnBocOOBrlVSTOOBqOWQjOOBmOW9ouOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICduYW1lJzogdXNlcl9uYW1lX2FmdGVyX2NoYW5nZSwgLy/jgZPjgZPjga/jgrXjg7zjg5Djg7zjgavotIjjgorjgZ/jgYTmg4XloLHjgIJcclxuICAgICAgICAgICAgICAgICAgICAndXNlcl9pZCc6IHVzZXJfaWQsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJywgLy9qc29u5b2i5byP44Gn5Y+X44GR5Y+W44KLXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiA5MDAwMDAsXHJcbiAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB9IFxyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkKCcubmFtZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpInmm7Tlvozjga5uYW1l44Gu5YCk44Gn6KGo56S644GV44KM44Gm44KL44ON44O844Og5oOF5aCx5pu05pawXHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KGRhdGFbJ25hbWUnXSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfjg6bjg7zjgrblkI3jgpLlpInmm7TjgZfjgb7jgZfjgZ8nKTtcclxuXHJcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi6YCa5L+h44Gr5aSx5pWX44GX44G+44GX44GfXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/user_name_change.js\n");

/***/ }),

/***/ 4:
/*!************************************************!*\
  !*** multi ./resources/js/user_name_change.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laradocks\recuruitment_futsal_members\app\laravel_app\resources\js\user_name_change.js */"./resources/js/user_name_change.js");


/***/ })

/******/ });