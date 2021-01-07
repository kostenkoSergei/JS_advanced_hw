const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        basket: [],
        filtered: [],
        favorites: [],
        imgCatalog: 'https://placehold.it/200x150',
        imgBasket: 'https://placehold.it/100x100',

        userSearch: '',
        userEmail: '',
        placeholder: 'Введите Вашу почту',
        isError: false


    },
    computed: {
        calcBasket: function () {
            return [this.basket.reduce((acc, currentValue) => acc + currentValue.price * currentValue.quantity, 0), this.basket.reduce((acc, currentValue) => acc + currentValue.quantity, 0)]
        }
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = product.id_product;
                        let find = this.basket.find(product => product.id_product === productId);
                        if (find) {
                            find.quantity++;
                        } else {
                            let basketProduct = {
                                id_product: productId,
                                price: product.price,
                                product_name: product.product_name,
                                quantity: 1
                            };
                            this.basket.push(basketProduct);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        addFavorite(product) {
            let productId = product.id_product;
            let find = this.favorites.find(product => product.id_product === productId);
            if (!find) {
                let favoriteProduct = {
                    id_product: productId,
                    price: product.price,
                    product_name: product.product_name,
                };
                this.favorites.push(favoriteProduct);
            }

        },
        removeProduct(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let productId = product.id_product;
                        let find = this.basket.find(product => product.id_product === productId);
                        if (find.quantity > 1) {
                            find.quantity--;
                        } else {
                            this.basket.splice(this.basket.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        },
        removeFavorite(product) {
            let productId = product.id_product;
            let find = this.favorites.find(product => product.id_product === productId);
            this.favorites.splice(this.basket.indexOf(find), 1);

        },
        filter() {
            const regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(product => regexp.test(product.product_name));
            this.products.forEach(el => {
                const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
                if (!this.filtered.includes(el)) {
                    block.classList.add('invisible');
                } else {
                    block.classList.remove('invisible');
                }
            })
        },
        showBasket() {
            const cart = document.querySelector('.cart-dropdown');
            cart.classList.toggle('invisible');
        },
        showFavorites() {
            const favorite = document.querySelector('.popup');
            favorite.classList.toggle('open');
        },
        checkEmail() {
            this.isError = false;
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.isError = !re.test(String(this.userEmail).toLowerCase())
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        // получаем содержимое корзны с сервера
        this.getJson(`${API + this.basketUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.push(el);
                }
            });
    }
})

// class List {
//     constructor(url, container, list = list2){
//         this.container = container;
//         this.list = list;
//         this.url = url;
//         this.goods = [];
//         this.allProducts = [];
//         this.filtered = [];
//         this._init();
//     }
//     getJson(url){
//         return fetch(url ? url : `${API + this.url}`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     handleData(data){
//         this.goods = [...data];
//         this.render();
//     }
//     calcSum(){
//         return this.allProducts.reduce((accum, item) => accum += item.price, 0);
//     }
//     render(){
//         const block = document.querySelector(this.container);
//         for (let product of this.goods){
//             const productObj = new this.list[this.constructor.name](product);
//             console.log(productObj);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }
//     filter(value){
//         const regexp = new RegExp(value, 'i');
//         this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
//         this.allProducts.forEach(el => {
//             const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
//             if(!this.filtered.includes(el)){
//                 block.classList.add('invisible');
//             } else {
//                 block.classList.remove('invisible');
//             }
//         })
//     }
//     _init(){
//         return false
//     }
// }
//
// class Item{
//     constructor(el, img = 'https://placehold.it/200x150'){
//         this.product_name = el.product_name;
//         this.price = el.price;
//         this.id_product = el.id_product;
//         this.img = img;
//     }
//     render(){
//         return `<div class="product-item" data-id="${this.id_product}">
//                 <img src="${this.img}" alt="Some img">
//                 <div class="desc">
//                     <h3>${this.product_name}</h3>
//                     <p>${this.price} $</p>
//                     <button class="buy-btn"
//                     data-id="${this.id_product}"
//                     data-name="${this.product_name}"
//                     data-price="${this.price}">Купить</button>
//                 </div>
//             </div>`
//     }
// }
//
// class ProductsList extends List{
//     constructor(cart, container = '.products', url = "/catalogData.json"){
//         super(url, container);
//         this.cart = cart;
//         this.getJson()
//             .then(data => this.handleData(data));
//     }
//     _init(){
//         document.querySelector(this.container).addEventListener('click', e => {
//             if(e.target.classList.contains('buy-btn')){
//                 this.cart.addProduct(e.target);
//             }
//         });
//         document.querySelector('.search-form').addEventListener('submit', e => {
//             e.preventDefault();
//             this.filter(document.querySelector('.search-field').value)
//         })
//     }
// }
//
//
// class ProductItem extends Item{}
//
// class Cart extends List{
//     constructor(container = ".cart-block", url = "/getBasket.json"){
//         super(url, container);
//         this.getJson()
//             .then(data => {
//                 this.handleData(data.contents);
//             });
//     }
//     addProduct(element){
//         this.getJson(`${API}/addToBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find){
//                         find.quantity++;
//                         this._updateCart(find);
//                     } else {
//                         let product = {
//                             id_product: productId,
//                             price: +element.dataset['price'],
//                             product_name: element.dataset['name'],
//                             quantity: 1
//                         };
//                         this.goods = [product];
//                         this.render();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     removeProduct(element){
//         this.getJson(`${API}/deleteFromBasket.json`)
//             .then(data => {
//                 if(data.result === 1){
//                     let productId = +element.dataset['id'];
//                     let find = this.allProducts.find(product => product.id_product === productId);
//                     if(find.quantity > 1){
//                         find.quantity--;
//                         this._updateCart(find);
//                     } else {
//                         this.allProducts.splice(this.allProducts.indexOf(find), 1);
//                         document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//                     }
//                 } else {
//                     alert('Error');
//                 }
//             })
//     }
//     _updateCart(product){
//        let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//        block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
//        block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
//     }
//     _init(){
//         document.querySelector('.btn-cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('del-btn')){
//                this.removeProduct(e.target);
//            }
//         })
//     }
//
// }
//
// class CartItem extends Item{
//     constructor(el, img = 'https://placehold.it/50x100'){
//         super(el, img);
//         this.quantity = el.quantity;
//     }
//     render(){
//     return `<div class="cart-item" data-id="${this.id_product}">
//             <div class="product-bio">
//             <img src="${this.img}" alt="Some image">
//             <div class="product-desc">
//             <p class="product-title">${this.product_name}</p>
//             <p class="product-quantity">Quantity: ${this.quantity}</p>
//         <p class="product-single-price">$${this.price} each</p>
//         </div>
//         </div>
//         <div class="right-block">
//             <p class="product-price">$${this.quantity*this.price}</p>
//             <button class="del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//     }
// }
// const list2 = {
//     ProductsList: ProductItem,
//     Cart: CartItem
// };
//
// let cart = new Cart();
// let products = new ProductsList(cart);
// products.getJson(`getProducts.json`).then(data => products.handleData(data));

