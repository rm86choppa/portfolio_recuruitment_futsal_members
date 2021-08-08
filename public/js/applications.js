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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/applications.js":
/*!**************************************!*\
  !*** ./resources/js/applications.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\n  //応募ボタンのクリックイベントを監視する\n  $('.application_button').each(function () {\n    $(this).on('click', function () {\n      var application_button = $(this);\n      var applicationButtonText = $(this).text();\n      var doApplication = false;\n\n      if (applicationButtonText.includes('応募取消') === true) {\n        doApplication = window.confirm('応募取消してよろしいですか');\n      } else {\n        doApplication = window.confirm('応募してよろしいですか');\n      }\n\n      if (doApplication == true) {\n        //いいねされた投稿ID、ユーザID取得\n        var post_id = $(this).parent().find('#application_post_id').val();\n        var user_id = $(this).parent().find('#application_user_id').val();\n        $.ajax({\n          type: 'GET',\n          url: '/application',\n          //web.phpのURLと同じ形にする\n          data: {\n            'post_id': post_id,\n            //ここはサーバーに贈りたい情報。\n            'user_id': user_id\n          },\n          dataType: 'json',\n          //json形式で受け取る\n          timeout: 900000,\n          beforeSend: function beforeSend() {}\n        }).done(function (data) {\n          //応募済かどうかで応募ボタンのテキスト変更(未応募なら\"応募\"、応募済なら\"応募取消\"に文言修正する)\n          if (data['isApplied'] === true) {\n            alert(\"応募しました\");\n            application_button.text(\"応募取消\");\n          } else {\n            alert(\"応募取消しました\");\n            application_button.text(\"応募\");\n          }\n        }).fail(function () {\n          alert(\"通信に失敗しました\");\n        });\n      } else {//何もしない\n      }\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvYXBwbGljYXRpb25zLmpzP2VhODYiXSwibmFtZXMiOlsiJCIsImVhY2giLCJvbiIsImFwcGxpY2F0aW9uX2J1dHRvbiIsImFwcGxpY2F0aW9uQnV0dG9uVGV4dCIsInRleHQiLCJkb0FwcGxpY2F0aW9uIiwiaW5jbHVkZXMiLCJ3aW5kb3ciLCJjb25maXJtIiwicG9zdF9pZCIsInBhcmVudCIsImZpbmQiLCJ2YWwiLCJ1c2VyX2lkIiwiYWpheCIsInR5cGUiLCJ1cmwiLCJkYXRhIiwiZGF0YVR5cGUiLCJ0aW1lb3V0IiwiYmVmb3JlU2VuZCIsImRvbmUiLCJhbGVydCIsImZhaWwiXSwibWFwcGluZ3MiOiJBQUFBQSxDQUFDLENBQUMsWUFBWTtBQUVWO0FBQ0FBLEdBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCQyxJQUF6QixDQUE4QixZQUFXO0FBQ3JDRCxLQUFDLENBQUMsSUFBRCxDQUFELENBQVFFLEVBQVIsQ0FBVyxPQUFYLEVBQW9CLFlBQVc7QUFFM0IsVUFBTUMsa0JBQWtCLEdBQUdILENBQUMsQ0FBQyxJQUFELENBQTVCO0FBQ0EsVUFBTUkscUJBQXFCLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUssSUFBUixFQUE5QjtBQUVBLFVBQUlDLGFBQWEsR0FBRyxLQUFwQjs7QUFDQSxVQUFHRixxQkFBcUIsQ0FBQ0csUUFBdEIsQ0FBK0IsTUFBL0IsTUFBMkMsSUFBOUMsRUFBb0Q7QUFDaERELHFCQUFhLEdBQUdFLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLGVBQWYsQ0FBaEI7QUFDSCxPQUZELE1BRU87QUFDSEgscUJBQWEsR0FBR0UsTUFBTSxDQUFDQyxPQUFQLENBQWUsYUFBZixDQUFoQjtBQUNIOztBQUVELFVBQUdILGFBQWEsSUFBSSxJQUFwQixFQUEwQjtBQUN0QjtBQUNBLFlBQU1JLE9BQU8sR0FBR1YsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRVyxNQUFSLEdBQWlCQyxJQUFqQixDQUFzQixzQkFBdEIsRUFBOENDLEdBQTlDLEVBQWhCO0FBQ0EsWUFBTUMsT0FBTyxHQUFHZCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFXLE1BQVIsR0FBaUJDLElBQWpCLENBQXNCLHNCQUF0QixFQUE4Q0MsR0FBOUMsRUFBaEI7QUFFQWIsU0FBQyxDQUFDZSxJQUFGLENBQU87QUFDSEMsY0FBSSxFQUFFLEtBREg7QUFFSEMsYUFBRyxFQUFFLGNBRkY7QUFFa0I7QUFDckJDLGNBQUksRUFBRTtBQUNGLHVCQUFXUixPQURUO0FBQ2tCO0FBQ3BCLHVCQUFXSTtBQUZULFdBSEg7QUFPSEssa0JBQVEsRUFBRSxNQVBQO0FBT2U7QUFDbEJDLGlCQUFPLEVBQUUsTUFSTjtBQVNIQyxvQkFBVSxFQUFFLHNCQUFZLENBQ3ZCO0FBVkUsU0FBUCxFQVdHQyxJQVhILENBV1EsVUFBU0osSUFBVCxFQUFjO0FBRWxCO0FBQ0EsY0FBR0EsSUFBSSxDQUFDLFdBQUQsQ0FBSixLQUFzQixJQUF6QixFQUErQjtBQUMzQkssaUJBQUssQ0FBQyxRQUFELENBQUw7QUFDQXBCLDhCQUFrQixDQUFDRSxJQUFuQixDQUF3QixNQUF4QjtBQUNILFdBSEQsTUFHTztBQUNIa0IsaUJBQUssQ0FBQyxVQUFELENBQUw7QUFDQXBCLDhCQUFrQixDQUFDRSxJQUFuQixDQUF3QixJQUF4QjtBQUNIO0FBRUosU0F0QkQsRUFzQkdtQixJQXRCSCxDQXNCUSxZQUFVO0FBQ2RELGVBQUssQ0FBQyxXQUFELENBQUw7QUFDSCxTQXhCRDtBQXlCSCxPQTlCRCxNQThCTyxDQUNIO0FBQ0g7QUFDSixLQTdDRDtBQThDSCxHQS9DRDtBQWdESCxDQW5EQSxDQUFEIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL2FwcGxpY2F0aW9ucy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8v5b+c5Yuf44Oc44K/44Oz44Gu44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI44KS55uj6KaW44GZ44KLXHJcbiAgICAkKCcuYXBwbGljYXRpb25fYnV0dG9uJykuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAkKHRoaXMpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYXBwbGljYXRpb25fYnV0dG9uID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgY29uc3QgYXBwbGljYXRpb25CdXR0b25UZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICBsZXQgZG9BcHBsaWNhdGlvbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZihhcHBsaWNhdGlvbkJ1dHRvblRleHQuaW5jbHVkZXMoJ+W/nOWLn+WPlua2iCcpID09PSB0cnVlKSB7IFxyXG4gICAgICAgICAgICAgICAgZG9BcHBsaWNhdGlvbiA9IHdpbmRvdy5jb25maXJtKCflv5zli5/lj5bmtojjgZfjgabjgojjgo3jgZfjgYTjgafjgZnjgYsnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHsgIFxyXG4gICAgICAgICAgICAgICAgZG9BcHBsaWNhdGlvbiA9IHdpbmRvdy5jb25maXJtKCflv5zli5/jgZfjgabjgojjgo3jgZfjgYTjgafjgZnjgYsnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYoZG9BcHBsaWNhdGlvbiA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAvL+OBhOOBhOOBreOBleOCjOOBn+aKleeov0lE44CB44Om44O844K2SUTlj5blvpdcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc3RfaWQgPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJyNhcHBsaWNhdGlvbl9wb3N0X2lkJykudmFsKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB1c2VyX2lkID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKCcjYXBwbGljYXRpb25fdXNlcl9pZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ0dFVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2FwcGxpY2F0aW9uJywgLy93ZWIucGhw44GuVVJM44Go5ZCM44GY5b2i44Gr44GZ44KLXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAncG9zdF9pZCc6IHBvc3RfaWQsIC8v44GT44GT44Gv44K144O844OQ44O844Gr6LSI44KK44Gf44GE5oOF5aCx44CCXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VyX2lkJzogdXNlcl9pZCxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsIC8vanNvbuW9ouW8j+OBp+WPl+OBkeWPluOCi1xyXG4gICAgICAgICAgICAgICAgICAgIHRpbWVvdXQ6IDkwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICBiZWZvcmVTZW5kOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBcclxuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSl7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v5b+c5Yuf5riI44GL44Gp44GG44GL44Gn5b+c5Yuf44Oc44K/44Oz44Gu44OG44Kt44K544OI5aSJ5pu0KOacquW/nOWLn+OBquOCiVwi5b+c5YufXCLjgIHlv5zli5/muIjjgarjgolcIuW/nOWLn+WPlua2iFwi44Gr5paH6KiA5L+u5q2j44GZ44KLKVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGFbJ2lzQXBwbGllZCddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5b+c5Yuf44GX44G+44GX44GfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBsaWNhdGlvbl9idXR0b24udGV4dChcIuW/nOWLn+WPlua2iFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuW/nOWLn+WPlua2iOOBl+OBvuOBl+OBn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbGljYXRpb25fYnV0dG9uLnRleHQoXCLlv5zli59cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIumAmuS/oeOBq+WkseaVl+OBl+OBvuOBl+OBn1wiKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/kvZXjgoLjgZfjgarjgYRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/applications.js\n");

/***/ }),

/***/ 9:
/*!********************************************!*\
  !*** multi ./resources/js/applications.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laradocks\recuruitment_futsal_members\app\laravel_app\resources\js\applications.js */"./resources/js/applications.js");


/***/ })

/******/ });