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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/follow.js":
/*!********************************!*\
  !*** ./resources/js/follow.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(function () {\n  //全フォローリンクのクリックイベントを監視する\n  $('.follow_btn').on('click', function (e) {\n    e.preventDefault(); //いいねされた投稿ID、ユーザID取得\n\n    var followed_user_id = $(this).children('#followed_user_id').val();\n    var user_id = $(this).children('#user_id').val();\n    $.ajax({\n      type: 'GET',\n      url: '/follow',\n      //web.phpのURLと同じ形にする\n      data: {\n        'followed_user_id': followed_user_id,\n        //ここはサーバーに贈りたい情報。\n        'user_id': user_id\n      },\n      dataType: 'json',\n      //json形式で受け取る\n      timeout: 900000,\n      beforeSend: function beforeSend() {}\n    }).done(function (data) {\n      //同じユーザが複数件投稿してる可能性があるので、\n      $('.follow_btn').each(function () {\n        //今処理してる投稿のユーザID取得\n        var post_user_id = $(this).children('#followed_user_id').val(); //フォローリンクを押下したときの投稿のユーザIDと今ループで処理してる投稿のユーザIDが一致したらリンクの表示変更\n\n        if (followed_user_id === post_user_id) {\n          //フォロー/フォロー解除完了後、サーバから来た情報で以下のようにする\n          //フォロー：リンクの文字は「フォロー解除」へ変更\n          //フォロー解除：リンクの文字を「フォローする」へ変更\n          if (data['isFollowed'] === true) {\n            $(this).children('.follow_link').text('フォロー解除');\n          } else {\n            $(this).children('.follow_link').text('フォローする');\n          }\n        }\n      });\n\n      if (data['isFollowed'] === true) {\n        alert('フォローしました');\n      } else {\n        alert('フォロー解除しました');\n      }\n    }).fail(function () {\n      alert(\"通信に失敗しました\");\n    });\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvZm9sbG93LmpzPzc2ZDQiXSwibmFtZXMiOlsiJCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiZm9sbG93ZWRfdXNlcl9pZCIsImNoaWxkcmVuIiwidmFsIiwidXNlcl9pZCIsImFqYXgiLCJ0eXBlIiwidXJsIiwiZGF0YSIsImRhdGFUeXBlIiwidGltZW91dCIsImJlZm9yZVNlbmQiLCJkb25lIiwiZWFjaCIsInBvc3RfdXNlcl9pZCIsInRleHQiLCJhbGVydCIsImZhaWwiXSwibWFwcGluZ3MiOiJBQUFBQSxDQUFDLENBQUMsWUFBWTtBQUVWO0FBQ0FBLEdBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJDLEVBQWpCLENBQW9CLE9BQXBCLEVBQTZCLFVBQVNDLENBQVQsRUFBWTtBQUNyQ0EsS0FBQyxDQUFDQyxjQUFGLEdBRHFDLENBR3JDOztBQUNBLFFBQU1DLGdCQUFnQixHQUFHSixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFLLFFBQVIsQ0FBaUIsbUJBQWpCLEVBQXNDQyxHQUF0QyxFQUF6QjtBQUNBLFFBQU1DLE9BQU8sR0FBR1AsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSyxRQUFSLENBQWlCLFVBQWpCLEVBQTZCQyxHQUE3QixFQUFoQjtBQUVBTixLQUFDLENBQUNRLElBQUYsQ0FBTztBQUNIQyxVQUFJLEVBQUUsS0FESDtBQUVIQyxTQUFHLEVBQUUsU0FGRjtBQUVhO0FBQ2hCQyxVQUFJLEVBQUU7QUFDRiw0QkFBb0JQLGdCQURsQjtBQUNvQztBQUN0QyxtQkFBV0c7QUFGVCxPQUhIO0FBT0hLLGNBQVEsRUFBRSxNQVBQO0FBT2U7QUFDbEJDLGFBQU8sRUFBRSxNQVJOO0FBU0hDLGdCQUFVLEVBQUUsc0JBQVksQ0FDdkI7QUFWRSxLQUFQLEVBV0dDLElBWEgsQ0FXUSxVQUFTSixJQUFULEVBQWM7QUFFbEI7QUFDQVgsT0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQmdCLElBQWpCLENBQXNCLFlBQVc7QUFDN0I7QUFDQSxZQUFNQyxZQUFZLEdBQUdqQixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFLLFFBQVIsQ0FBaUIsbUJBQWpCLEVBQXNDQyxHQUF0QyxFQUFyQixDQUY2QixDQUk3Qjs7QUFDQSxZQUFHRixnQkFBZ0IsS0FBS2EsWUFBeEIsRUFBc0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsY0FBR04sSUFBSSxDQUFDLFlBQUQsQ0FBSixLQUF1QixJQUExQixFQUFnQztBQUM1QlgsYUFBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSyxRQUFSLENBQWlCLGNBQWpCLEVBQWlDYSxJQUFqQyxDQUFzQyxRQUF0QztBQUNILFdBRkQsTUFFTztBQUNIbEIsYUFBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSyxRQUFSLENBQWlCLGNBQWpCLEVBQWlDYSxJQUFqQyxDQUFzQyxRQUF0QztBQUNIO0FBQ0o7QUFDSixPQWZEOztBQWlCQSxVQUFHUCxJQUFJLENBQUMsWUFBRCxDQUFKLEtBQXVCLElBQTFCLEVBQWdDO0FBQzVCUSxhQUFLLENBQUMsVUFBRCxDQUFMO0FBQ0gsT0FGRCxNQUVPO0FBQ0hBLGFBQUssQ0FBQyxZQUFELENBQUw7QUFDSDtBQUVKLEtBckNELEVBcUNHQyxJQXJDSCxDQXFDUSxZQUFVO0FBQ2RELFdBQUssQ0FBQyxXQUFELENBQUw7QUFDSCxLQXZDRDtBQXdDSCxHQS9DRDtBQWdESCxDQW5EQSxDQUFEIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL2ZvbGxvdy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIC8v5YWo44OV44Kp44Ot44O844Oq44Oz44Kv44Gu44Kv44Oq44OD44Kv44Kk44OZ44Oz44OI44KS55uj6KaW44GZ44KLXHJcbiAgICAkKCcuZm9sbG93X2J0bicpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIC8v44GE44GE44Gt44GV44KM44Gf5oqV56i/SUTjgIHjg6bjg7zjgrZJROWPluW+l1xyXG4gICAgICAgIGNvbnN0IGZvbGxvd2VkX3VzZXJfaWQgPSAkKHRoaXMpLmNoaWxkcmVuKCcjZm9sbG93ZWRfdXNlcl9pZCcpLnZhbCgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJfaWQgPSAkKHRoaXMpLmNoaWxkcmVuKCcjdXNlcl9pZCcpLnZhbCgpO1xyXG5cclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAnR0VUJyxcclxuICAgICAgICAgICAgdXJsOiAnL2ZvbGxvdycsIC8vd2ViLnBocOOBrlVSTOOBqOWQjOOBmOW9ouOBq+OBmeOCi1xyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAnZm9sbG93ZWRfdXNlcl9pZCc6IGZvbGxvd2VkX3VzZXJfaWQsIC8v44GT44GT44Gv44K144O844OQ44O844Gr6LSI44KK44Gf44GE5oOF5aCx44CCXHJcbiAgICAgICAgICAgICAgICAndXNlcl9pZCc6IHVzZXJfaWQsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsIC8vanNvbuW9ouW8j+OBp+WPl+OBkeWPluOCi1xyXG4gICAgICAgICAgICB0aW1lb3V0OiA5MDAwMDAsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgfSBcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgLy/lkIzjgZjjg6bjg7zjgrbjgYzopIfmlbDku7bmipXnqL/jgZfjgabjgovlj6/og73mgKfjgYzjgYLjgovjga7jgafjgIFcclxuICAgICAgICAgICAgJCgnLmZvbGxvd19idG4nKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgLy/ku4rlh6bnkIbjgZfjgabjgovmipXnqL/jga7jg6bjg7zjgrZJROWPluW+l1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9zdF91c2VyX2lkID0gJCh0aGlzKS5jaGlsZHJlbignI2ZvbGxvd2VkX3VzZXJfaWQnKS52YWwoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+ODleOCqeODreODvOODquODs+OCr+OCkuaKvOS4i+OBl+OBn+OBqOOBjeOBruaKleeov+OBruODpuODvOOCtklE44Go5LuK44Or44O844OX44Gn5Yem55CG44GX44Gm44KL5oqV56i/44Gu44Om44O844K2SUTjgYzkuIDoh7TjgZfjgZ/jgonjg6rjg7Pjgq/jga7ooajnpLrlpInmm7RcclxuICAgICAgICAgICAgICAgIGlmKGZvbGxvd2VkX3VzZXJfaWQgPT09IHBvc3RfdXNlcl9pZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8v44OV44Kp44Ot44O8L+ODleOCqeODreODvOino+mZpOWujOS6huW+jOOAgeOCteODvOODkOOBi+OCieadpeOBn+aDheWgseOBp+S7peS4i+OBruOCiOOBhuOBq+OBmeOCi1xyXG4gICAgICAgICAgICAgICAgICAgIC8v44OV44Kp44Ot44O877ya44Oq44Oz44Kv44Gu5paH5a2X44Gv44CM44OV44Kp44Ot44O86Kej6Zmk44CN44G45aSJ5pu0XHJcbiAgICAgICAgICAgICAgICAgICAgLy/jg5Xjgqnjg63jg7zop6PpmaTvvJrjg6rjg7Pjgq/jga7mloflrZfjgpLjgIzjg5Xjgqnjg63jg7zjgZnjgovjgI3jgbjlpInmm7RcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhWydpc0ZvbGxvd2VkJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLmZvbGxvd19saW5rJykudGV4dCgn44OV44Kp44Ot44O86Kej6ZmkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfeOAgGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuZm9sbG93X2xpbmsnKS50ZXh0KCfjg5Xjgqnjg63jg7zjgZnjgosnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYoZGF0YVsnaXNGb2xsb3dlZCddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgn44OV44Kp44Ot44O844GX44G+44GX44GfJyk7XHJcbiAgICAgICAgICAgIH3jgIBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCfjg5Xjgqnjg63jg7zop6PpmaTjgZfjgb7jgZfjgZ8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIFxyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgYWxlcnQoXCLpgJrkv6HjgavlpLHmlZfjgZfjgb7jgZfjgZ9cIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/follow.js\n");

/***/ }),

/***/ 13:
/*!**************************************!*\
  !*** multi ./resources/js/follow.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\laradocks\recuruitment_futsal_members\app\laravel_app\resources\js\follow.js */"./resources/js/follow.js");


/***/ })

/******/ });