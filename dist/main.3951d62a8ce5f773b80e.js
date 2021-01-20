/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./css/style.css?");

/***/ }),

/***/ "./js/CartComponent.js":
/*!*****************************!*\
  !*** ./js/CartComponent.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n\n// Компоненты для построения корзины =================================\nconst basketitem = {\n  props: ['product'],\n  // data() {\n  //     return {\n  //         imgBasket: 'https://placehold.it/100x100'\n  //     }\n  // },\n  template: `\n    <div>\n      <div class=\"product-widget\">\n          <div class=\"product-img\">\n              <img :src=\"'img/' + product.img\" alt=\"Some img\" style=\"width: 45px;\">\n          </div>\n          <div class=\"product-body\">\n              <h4 class=\"product-name\"><a\n                      href=\"#\">{{product.product_name}}</a></h4>\n              <h5 class=\"product-price\"><span\n                      class=\"qty\">{{product.quantity}}\n                      шт.&nbsp</span>&nbsp{{product.price}} &#8381/шт.\n              </h5>\n          </div>\n          \n          <button class=\"delete\" :data-id=\"product.id_product\"\n          @click=\"$parent.$emit('remove-product', product)\"><i\n              class=\"fa fa-close\"></i></button>\n\n      </div>\n    </div>\n  `\n};\n//====================================================================\n\nconst basket = {\n  props: ['basket'],\n  components: { 'basket-item': basketitem },\n  computed: {\n    calcBasket: function () {\n      return [this.basket.reduce((acc, currentValue) => acc + currentValue.price * currentValue.quantity, 0),\n      this.basket.reduce((acc, currentValue) => acc + currentValue.quantity, 0)]\n    }\n  },\n  template: `\n      <div class=\"cart-list\">\n        <p v-if=\"!basket.length\"><strong>Нет данных. Корзина пуста</strong> </p>\n        <basket-item v-for=\"product of basket\" :key=\"product.id_product\"\n        :data-id=\"product.id_product\" :product=\"product\"></basket-item>\n        <div class=\"cart-summary\">\n            <small>В корзине {{calcBasket[1]}} ед. товара</small>\n            <h5>Сумма заказа: {{calcBasket[0]}} &#8381</h5>\n        </div>\n      </div>\n    `\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (basket);\n\n\n\n//# sourceURL=webpack:///./js/CartComponent.js?");

/***/ }),

/***/ "./js/FavoriteComponent.js":
/*!*********************************!*\
  !*** ./js/FavoriteComponent.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Компонент добавления товара в избранное ============================\r\nconst favoriteitem = {\r\n    props: ['product'],\r\n    template: `\r\n    <div class=\"card\" style=\"width: 18rem; margin: 5px;\">\r\n        <div class=\"card-body card-favorite\">\r\n            <img :src=\"'img/' + product.img\" alt=\"Some img\" class=\"card-img-top\"\">\r\n            <div>\r\n                <h5 class=\"card-title\">{{product.product_name}}</h5>\r\n                <p class=\"card-text\">{{product.price}} &#8381</p>\r\n            </div>\r\n            <div class=\"favorite-btns\">\r\n                <a @click=\"$parent.$emit('add-product', product)\" class=\"btn btn-info btn-sm\">Купить</a>\r\n                <a @click=\"$parent.$emit('remove-favorite', product)\"\r\n                    class=\"btn btn-danger btn-sm\">Удалить</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    `\r\n};\r\n\r\nconst favorite = {\r\n    props: ['favorites'],\r\n    components: { 'favorite-item': favoriteitem },\r\n    template: `\r\n    <div>\r\n        <div class=\"popup__body\">\r\n            <div class=\"popup__content\">\r\n                <p v-if=\"!favorites.length\"><strong>В избранном нет товаров</strong> </p>\r\n                <div v-else class=\"favorite-list\">\r\n                    <favorite-item v-for=\"product of favorites\" :product=\"product\" :img=\"img\" :key=\"product.id_product\" :data-id=\"product.id_product\">\r\n                    </favorite-item>\r\n                </div>\r\n                <button @click=\"$emit('show-favorite')\" type=\"button\" class=\"btn btn-info\"\r\n                    style=\"margin: 5px 5px 5px 10px;\">Закрыть избранное</button>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n    `\r\n};\r\n//====================================================================\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (favorite);\r\n\n\n//# sourceURL=webpack:///./js/FavoriteComponent.js?");

/***/ }),

/***/ "./js/GetDataErrorComponent.js":
/*!*************************************!*\
  !*** ./js/GetDataErrorComponent.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Компонент сообщения об ошибке ===================================\r\n// Выдает сообщение об ошибке, если сервер недоступен при запросе каталога\r\nconst error = {\r\n    data() {\r\n        return {\r\n            errorMsg: 'Не удалось выполнить запрос к серверу'\r\n        }\r\n    },\r\n    template: `\r\n    <div class=\"col-md-12\">\r\n        <div class=\"section-title text-center\">\r\n            <h3 class=\"error-data\">{{errorMsg}}</h3>\r\n        </div>\r\n    </div>\r\n    `\r\n};\r\n//====================================================================\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (error);\n\n//# sourceURL=webpack:///./js/GetDataErrorComponent.js?");

/***/ }),

/***/ "./js/ProductComponent.js":
/*!********************************!*\
  !*** ./js/ProductComponent.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Компоненты для построения каталога =================================\n\nconst productitem = {\n    props: ['product'],\n    // data() {\n    //     return {\n    //         imgCatalog: 'https://placehold.it/200x150'\n    //     }\n    // },\n    template: `\n    <div class=\"col-md-3 col-xs-6\">\n        <div class=\"product\">\n            <div class=\"product-img\">\n                <img :src=\"'img/' + product.img\" alt=\"Some img\">\n            </div>\n            <div class=\"product-body\">\n                <p class=\"product-category\">Электробритвы</p>\n                <h3 class=\"product-name\"><a href=\"#\">{{product.product_name}}</a></h3>\n                <h4 class=\"product-price\">{{product.price}} &#8381</h4>\n                <div class=\"product-btns\">\n                    <button @click=\"$parent.$emit('add-favorite', product)\" class=\"add-to-wishlist\"><i\n                            class=\"fa fa-heart-o\"></i><span class=\"tooltipp\">В\n                            избранное</span></button>\n                    <button class=\"add-to-compare\"><i class=\"fa fa-exchange\"></i><span\n                            class=\"tooltipp\">К сравнению</span></button>\n                    <button class=\"quick-view\"><i class=\"fa fa-eye\"></i><span\n                            class=\"tooltipp\">Просмотр</span></button>\n                </div>\n            </div>\n            <div class=\"add-to-cart\">\n                <button class=\"add-to-cart-btn\" @click=\"$parent.$emit('add-product', product)\"><i\n                        class=\"fa fa-shopping-cart\"></i> Купить</button>\n            </div>\n        </div>\n    </div>\n    `\n};\n//====================================================================\n\nconst products = {\n    props: ['products'],\n    components: { 'product-item': productitem },\n    template: `\n    <div>\n        <product-item class=\"product-item\" v-for=\"product of products\" :key=\"product.id_product\"\n        :data-id=\"product.id_product\" :product=\"product\"></product-item>\n    </div>\n    `\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (products);\n\n\n//# sourceURL=webpack:///./js/ProductComponent.js?");

/***/ }),

/***/ "./js/SearchComponent.js":
/*!*******************************!*\
  !*** ./js/SearchComponent.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n// Компонент для поиска товара в каталоге ============================\r\nconst search = {\r\n    data() {\r\n        return {\r\n            searchValue: ''\r\n        }\r\n    },\r\n    template: `\r\n    <div class=\"col-md-6\">\r\n    <div class=\"header-search\">\r\n        <form onsubmit=\"return false\">\r\n            <input type=\"text\" class=\"search-field\" v-model=\"searchValue\" @input=\"$emit('product-search', searchValue)\">\r\n            <button class=\"search-btn\" @click=\"$emit('product-search', searchValue)\"><slot></slot></button>\r\n        </form>\r\n    </div>\r\n</div>\r\n    `\r\n};\r\n//====================================================================\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);\n\n//# sourceURL=webpack:///./js/SearchComponent.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _SearchComponent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SearchComponent.js */ \"./js/SearchComponent.js\");\n/* harmony import */ var _CartComponent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CartComponent.js */ \"./js/CartComponent.js\");\n/* harmony import */ var _ProductComponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ProductComponent.js */ \"./js/ProductComponent.js\");\n/* harmony import */ var _GetDataErrorComponent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./GetDataErrorComponent.js */ \"./js/GetDataErrorComponent.js\");\n/* harmony import */ var _FavoriteComponent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FavoriteComponent.js */ \"./js/FavoriteComponent.js\");\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../css/style.css */ \"./css/style.css\");\n\n\n\n\n\n\n\n\n\n//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';\n\nconst app = new Vue({\n    el: '#app',\n    data: {\n        catalogUrl: '/catalogData.json',\n        basketUrl: '/getBasket.json',\n        products: [],\n        basket: [],\n        filtered: [],\n        favorites: [],\n        userEmail: '',\n        placeholder: 'Введите Вашу почту',\n        isError: false,\n        dataError: false,\n        API: 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'\n\n\n    },\n    components: {\n        search: _SearchComponent_js__WEBPACK_IMPORTED_MODULE_0__.default,\n        basket: _CartComponent_js__WEBPACK_IMPORTED_MODULE_1__.default,\n        products: _ProductComponent_js__WEBPACK_IMPORTED_MODULE_2__.default,\n        error: _GetDataErrorComponent_js__WEBPACK_IMPORTED_MODULE_3__.default,\n        favorite: _FavoriteComponent_js__WEBPACK_IMPORTED_MODULE_4__.default\n    },\n    methods: {\n        getJson(url) {\n            return fetch(url)\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error);\n                    this.dataError = true;\n                })\n        },\n        //без использования бэкенда\n        // addProduct(product) {\n        //     this.getJson(`${API}/addToBasket.json`)\n        //         .then(data => {\n        //             if (data.result === 1) {\n        //                 let productId = product.id_product;\n        //                 let find = this.basket.find(product => product.id_product === productId);\n        //                 if (find) {\n        //                     find.quantity++;\n        //                 } else {\n        //                     let basketProduct = Object.assign({ quantity: 1 }, product);\n        //                     this.basket.push(basketProduct);\n        //                 }\n        //             } else {\n        //                 alert('Error');\n        //             }\n        //         })\n        // },\n\n        //с использованием бэкенда\n        addProduct(item) {\n            let find = this.basket.find(el => el.id_product === item.id_product);\n            if (find) {\n                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })\n                    .then(data => {\n                        if (data.result === 1) {\n                            find.quantity++\n                        }\n                    })\n            } else {\n                let basketProduct = Object.assign({ quantity: 1 }, item);\n                this.basket.push(basketProduct);\n                // const prod = Object.assign({ quantity: 1 }, item);\n                // this.postJson(`/api/cart`, prod)\n                //     .then(data => {\n                //         if (data.result === 1) {\n                //             this.basket.push(prod)\n                //         }\n                //     })\n            }\n        },\n        postJson(url, data) {\n            return fetch(url, {\n                method: 'POST',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error)\n                })\n        },\n        putJson(url, data) {\n            return fetch(url, {\n                method: 'PUT',\n                headers: {\n                    \"Content-Type\": \"application/json\"\n                },\n                body: JSON.stringify(data)\n            })\n                .then(result => result.json())\n                .catch(error => {\n                    console.log(error)\n                })\n        },\n        addFavorite(product) {\n            let productId = product.id_product;\n            let find = this.favorites.find(product => product.id_product === productId);\n            if (!find) {\n                let favoriteProduct = Object.assign({}, product);\n                this.favorites.push(favoriteProduct);\n            }\n\n        },\n        removeProduct(product) {\n            this.getJson(`${this.API}/deleteFromBasket.json`)\n                .then(data => {\n                    if (data.result === 1) {\n                        let productId = product.id_product;\n                        let find = this.basket.find(product => product.id_product === productId);\n                        if (find.quantity > 1) {\n                            find.quantity--;\n                        } else {\n                            this.basket.splice(this.basket.indexOf(find), 1);\n                        }\n                    } else {\n                        alert('Error');\n                    }\n                })\n        },\n        removeFavorite(product) {\n            let productId = product.id_product;\n            let find = this.favorites.find(product => product.id_product === productId);\n            this.favorites.splice(this.basket.indexOf(find), 1);\n\n        },\n        filter(userSearch) {\n            const regexp = new RegExp(userSearch, 'i');\n            this.filtered = this.products.filter(product => regexp.test(product.product_name));\n            this.products.forEach(el => {\n                const block = document.querySelector(`.product-item[data-id=\"${el.id_product}\"]`);\n                if (!this.filtered.includes(el)) {\n                    block.classList.add('invisible');\n                } else {\n                    block.classList.remove('invisible');\n                }\n            })\n        },\n        showBasket() {\n            const cart = document.querySelector('.cart-dropdown');\n            cart.classList.toggle('invisible');\n        },\n        showFavorites() {\n            const favorite = document.querySelector('.popup');\n            favorite.classList.toggle('open');\n        },\n        checkEmail() {\n            this.isError = false;\n            const re = /^(([^<>()[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\n            this.isError = !re.test(String(this.userEmail).toLowerCase())\n        }\n    },\n    mounted() {\n        // вариант без использования бэкенда\n        // this.getJson(`${API + this.catalogUrl}`)\n        //     .then(data => {\n        //         for (let el of data) {\n        //             this.products.push(el);\n        //         }\n        //     });\n\n        // вариант с использованием бэкенда\n        this.getJson(`/api/products`)\n            .then(data => {\n                for (let el of data) {\n                    this.products.push(el);\n                }\n            });\n\n        // получаем содержимое корзины с сервера без использования бэкенда\n        // this.getJson(`${API + this.basketUrl}`)\n        //     .then(data => {\n        //         for (let el of data.contents) {\n        //             this.basket.push(el);\n        //         }\n        //     });\n\n        // получаем содержимое корзны с сервера с использованием бэкенда\n        this.getJson(`/api/cart`)\n            .then(data => {\n                for (let el of data.contents) {\n                    this.basket.push(el);\n                }\n            });\n    }\n})\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/main.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;