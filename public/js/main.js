

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
        userEmail: '',
        placeholder: 'Введите Вашу почту',
        isError: false,
        dataError: false


    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                    this.dataError = true;
                })
        },
        //без использования бэкенда
        // addProduct(product) {
        //     this.getJson(`${API}/addToBasket.json`)
        //         .then(data => {
        //             if (data.result === 1) {
        //                 let productId = product.id_product;
        //                 let find = this.basket.find(product => product.id_product === productId);
        //                 if (find) {
        //                     find.quantity++;
        //                 } else {
        //                     let basketProduct = Object.assign({ quantity: 1 }, product);
        //                     this.basket.push(basketProduct);
        //                 }
        //             } else {
        //                 alert('Error');
        //             }
        //         })
        // },

        //с использованием бэкенда
        addProduct(item) {
            let find = this.basket.find(el => el.id_product === item.id_product);
            if (find) {
                this.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++
                        }
                    })
            } else {
                let basketProduct = Object.assign({ quantity: 1 }, item);
                this.basket.push(basketProduct);
                // const prod = Object.assign({ quantity: 1 }, item);
                // this.postJson(`/api/cart`, prod)
                //     .then(data => {
                //         if (data.result === 1) {
                //             this.basket.push(prod)
                //         }
                //     })
            }
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addFavorite(product) {
            let productId = product.id_product;
            let find = this.favorites.find(product => product.id_product === productId);
            if (!find) {
                let favoriteProduct = Object.assign({}, product);
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
        filter(userSearch) {
            const regexp = new RegExp(userSearch, 'i');
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
        // вариант без использования бэкенда
        // this.getJson(`${API + this.catalogUrl}`)
        //     .then(data => {
        //         for (let el of data) {
        //             this.products.push(el);
        //         }
        //     });

        // вариант с использованием бэкенда
        this.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });

        // получаем содержимое корзины с сервера без использования бэкенда
        // this.getJson(`${API + this.basketUrl}`)
        //     .then(data => {
        //         for (let el of data.contents) {
        //             this.basket.push(el);
        //         }
        //     });

        // получаем содержимое корзны с сервера с использованием бэкенда
        this.getJson(`/api/cart`)
            .then(data => {
                for (let el of data.contents) {
                    this.basket.push(el);
                }
            });
    }
})
