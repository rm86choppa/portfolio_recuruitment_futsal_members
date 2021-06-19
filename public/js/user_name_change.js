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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/user_name_change.js":
/*!******************************************!*\
  !*** ./resources/js/user_name_change.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\n  $('#user_name_change_button').on('click', function () {\n    //ユーザ名変更の入力欄に初期値として今のユーザネームを取得\n    var name = $('#user_name_text').text(); //入力した変更後のnameを取得\n\n    var user_name_after_change = window.prompt(\"新しいユーザ名を入力してください\", name); //ユーザ名が入力されてない(空文字)かキャンセル押下(null)してないとき、変更開始\n\n    if (user_name_after_change == null || user_name_after_change == \"\") {//何もしない\n    } else if (user_name_after_change == name) {\n      alert(\"違う値で登録してください\");\n    } else {\n      //更新対象のユーザを検索するためユーザIDを取得\n      var user_id = $('#login_user_id').val();\n      $.ajax({\n        type: 'get',\n        url: '/name_change',\n        //web.phpのURLと同じ形にする\n        data: {\n          'name': user_name_after_change,\n          //ここはサーバーに贈りたい情報。\n          'user_id': user_id\n        },\n        dataType: 'json',\n        //json形式で受け取る\n        timeout: 900000,\n        beforeSend: function beforeSend() {}\n      }).done(function (data) {\n        $('.myPostName').each(function () {\n          //変更後のnameの値で表示されてるネーム情報更新\n          $(this).text(data['name']);\n        });\n        alert('ユーザ名を変更しました');\n      }).fail(function () {\n        alert(\"通信に失敗しました\");\n      });\n    }\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdXNlcl9uYW1lX2NoYW5nZS5qcz9mMmRmIl0sIm5hbWVzIjpbIiQiLCJvbiIsIm5hbWUiLCJ0ZXh0IiwidXNlcl9uYW1lX2FmdGVyX2NoYW5nZSIsIndpbmRvdyIsInByb21wdCIsImFsZXJ0IiwidXNlcl9pZCIsInZhbCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwidGltZW91dCIsImJlZm9yZVNlbmQiLCJkb25lIiwiZWFjaCIsImZhaWwiXSwibWFwcGluZ3MiOiJBQUFBQSxDQUFDLENBQUMsWUFBWTtBQUVWQSxHQUFDLENBQUMsMEJBQUQsQ0FBRCxDQUE4QkMsRUFBOUIsQ0FBaUMsT0FBakMsRUFBMEMsWUFBVztBQUVqRDtBQUNBLFFBQU1DLElBQUksR0FBR0YsQ0FBQyxDQUFDLGlCQUFELENBQUQsQ0FBcUJHLElBQXJCLEVBQWIsQ0FIaUQsQ0FLakQ7O0FBQ0EsUUFBTUMsc0JBQXNCLEdBQUdDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLGtCQUFkLEVBQWtDSixJQUFsQyxDQUEvQixDQU5pRCxDQVFqRDs7QUFDQSxRQUFHRSxzQkFBc0IsSUFBSSxJQUExQixJQUFrQ0Esc0JBQXNCLElBQUksRUFBL0QsRUFBb0UsQ0FDaEU7QUFDSCxLQUZELE1BRU8sSUFBR0Esc0JBQXNCLElBQUlGLElBQTdCLEVBQW1DO0FBQ3RDSyxXQUFLLENBQUMsY0FBRCxDQUFMO0FBQ0gsS0FGTSxNQUVBO0FBQ0g7QUFDQSxVQUFNQyxPQUFPLEdBQUdSLENBQUMsQ0FBQyxnQkFBRCxDQUFELENBQW9CUyxHQUFwQixFQUFoQjtBQUVBVCxPQUFDLENBQUNVLElBQUYsQ0FBTztBQUNIQyxZQUFJLEVBQUUsS0FESDtBQUVIQyxXQUFHLEVBQUUsY0FGRjtBQUVrQjtBQUNyQkMsWUFBSSxFQUFFO0FBQ0Ysa0JBQVFULHNCQUROO0FBQzhCO0FBQ2hDLHFCQUFXSTtBQUZULFNBSEg7QUFPSE0sZ0JBQVEsRUFBRSxNQVBQO0FBT2U7QUFDbEJDLGVBQU8sRUFBRSxNQVJOO0FBU0hDLGtCQUFVLEVBQUUsc0JBQVksQ0FDdkI7QUFWRSxPQUFQLEVBV0dDLElBWEgsQ0FXUSxVQUFTSixJQUFULEVBQWM7QUFFbEJiLFNBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJrQixJQUFqQixDQUFzQixZQUFXO0FBQzdCO0FBQ0FsQixXQUFDLENBQUMsSUFBRCxDQUFELENBQVFHLElBQVIsQ0FBYVUsSUFBSSxDQUFDLE1BQUQsQ0FBakI7QUFDSCxTQUhEO0FBSUFOLGFBQUssQ0FBQyxhQUFELENBQUw7QUFFSCxPQW5CRCxFQW1CR1ksSUFuQkgsQ0FtQlEsWUFBVTtBQUNkWixhQUFLLENBQUMsV0FBRCxDQUFMO0FBQ0gsT0FyQkQ7QUFzQkg7QUFDSixHQXhDRDtBQXlDSCxDQTNDQSxDQUFEIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL3VzZXJfbmFtZV9jaGFuZ2UuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAkKCcjdXNlcl9uYW1lX2NoYW5nZV9idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgLy/jg6bjg7zjgrblkI3lpInmm7Tjga7lhaXlipvmrITjgavliJ3mnJ/lgKTjgajjgZfjgabku4rjga7jg6bjg7zjgrbjg43jg7zjg6DjgpLlj5blvpdcclxuICAgICAgICBjb25zdCBuYW1lID0gJCgnI3VzZXJfbmFtZV90ZXh0JykudGV4dCgpO1xyXG5cclxuICAgICAgICAvL+WFpeWKm+OBl+OBn+WkieabtOW+jOOBrm5hbWXjgpLlj5blvpdcclxuICAgICAgICBjb25zdCB1c2VyX25hbWVfYWZ0ZXJfY2hhbmdlID0gd2luZG93LnByb21wdChcIuaWsOOBl+OBhOODpuODvOOCtuWQjeOCkuWFpeWKm+OBl+OBpuOBj+OBoOOBleOBhFwiLCBuYW1lKTtcclxuXHJcbiAgICAgICAgLy/jg6bjg7zjgrblkI3jgYzlhaXlipvjgZXjgozjgabjgarjgYQo56m65paH5a2XKeOBi+OCreODo+ODs+OCu+ODq+aKvOS4iyhudWxsKeOBl+OBpuOBquOBhOOBqOOBjeOAgeWkieabtOmWi+Wni1xyXG4gICAgICAgIGlmKHVzZXJfbmFtZV9hZnRlcl9jaGFuZ2UgPT0gbnVsbCB8fCB1c2VyX25hbWVfYWZ0ZXJfY2hhbmdlID09IFwiXCIgKSB7XHJcbiAgICAgICAgICAgIC8v5L2V44KC44GX44Gq44GEXHJcbiAgICAgICAgfSBlbHNlIGlmKHVzZXJfbmFtZV9hZnRlcl9jaGFuZ2UgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICBhbGVydChcIumBleOBhuWApOOBp+eZu+mMsuOBl+OBpuOBj+OBoOOBleOBhFwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+abtOaWsOWvvuixoeOBruODpuODvOOCtuOCkuaknOe0ouOBmeOCi+OBn+OCgeODpuODvOOCtklE44KS5Y+W5b6XXHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJfaWQgPSAkKCcjbG9naW5fdXNlcl9pZCcpLnZhbCgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnL25hbWVfY2hhbmdlJywgLy93ZWIucGhw44GuVVJM44Go5ZCM44GY5b2i44Gr44GZ44KLXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ25hbWUnOiB1c2VyX25hbWVfYWZ0ZXJfY2hhbmdlLCAvL+OBk+OBk+OBr+OCteODvOODkOODvOOBq+i0iOOCiuOBn+OBhOaDheWgseOAglxyXG4gICAgICAgICAgICAgICAgICAgICd1c2VyX2lkJzogdXNlcl9pZCxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLCAvL2pzb27lvaLlvI/jgaflj5fjgZHlj5bjgotcclxuICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDkwMDAwMCxcclxuICAgICAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQoJy5teVBvc3ROYW1lJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WkieabtOW+jOOBrm5hbWXjga7lgKTjgafooajnpLrjgZXjgozjgabjgovjg43jg7zjg6Dmg4XloLHmm7TmlrBcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnRleHQoZGF0YVsnbmFtZSddKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ+ODpuODvOOCtuWQjeOCkuWkieabtOOBl+OBvuOBl+OBnycpO1xyXG5cclxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLpgJrkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ9cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./resources/js/user_name_change.js\n");

/***/ }),

/***/ 3:
/*!************************************************!*\
  !*** multi ./resources/js/user_name_change.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laradocks\recuruitment_futsal_members\app\laravel_app\resources\js\user_name_change.js */"./resources/js/user_name_change.js");


/***/ })

/******/ });