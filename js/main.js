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
