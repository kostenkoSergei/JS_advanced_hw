// Компонент для поиска товара в каталоге ============================
Vue.component('product-search', {
    data() {
        return {
            searchValue: ''
        }
    },
    template: `
    <div class="col-md-6">
    <div class="header-search">
        <form onsubmit="return false">
            <input type="text" class="search-field" v-model="searchValue" @input="$emit('product-search', searchValue)">
            <button class="search-btn" @click="$emit('product-search', searchValue)"><slot></slot></button>
        </form>
    </div>
</div>
    `
});
//====================================================================

// Компоненты для построения корзины =================================
Vue.component('basket-list', {
    props: ['basket'],
    computed: {
        calcBasket: function () {
            return [this.basket.reduce((acc, currentValue) => acc + currentValue.price * currentValue.quantity, 0),
            this.basket.reduce((acc, currentValue) => acc + currentValue.quantity, 0)]
        }
    },
    template: `
      <div>
        <p v-if="!basket.length"><strong>Нет данных. Корзина пуста</strong> </p>
        <basket-item v-for="product of basket" :key="product.id_product"
        :data-id="product.id_product" :product="product" v-on:remove-product="$emit('remove-product', product)"></basket-item>
        <div class="cart-summary">
            <small>В корзине {{calcBasket[1]}} ед. товара</small>
            <h5>Сумма заказа: {{calcBasket[0]}} &#8381</h5>
        </div>
      </div>
    `
});

Vue.component('basket-item', {
    props: ['product'],
    data() {
        return {
            imgBasket: 'https://placehold.it/100x100'
        }
    },
    template: `
      <div>
        <div class="product-widget">
            <div class="product-img">
                <img :src="imgBasket" alt="Some img">
            </div>
            <div class="product-body">
                <h4 class="product-name"><a
                        href="#">{{product.product_name}}</a></h4>
                <h5 class="product-price"><span
                        class="qty">{{product.quantity}}
                        шт.&nbsp</span>&nbsp{{product.price}} &#8381/шт.
                </h5>
            </div>
            
            <button class="delete" :data-id="product.id_product"
            @click="$emit('remove-product', product)"><i
                class="fa fa-close"></i></button>

        </div>
      </div>
    `
});
//====================================================================


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
        // imgBasket: 'https://placehold.it/100x100',

        // userSearch: '',
        userEmail: '',
        placeholder: 'Введите Вашу почту',
        isError: false


    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        sayHello() {
            console.log('hello')
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
            console.log('hi')
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
            // userSearch получаем из дочернего компонента через emit
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
        },
        sayhello() {
            console.log('hello')
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
