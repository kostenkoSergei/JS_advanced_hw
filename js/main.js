const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];// массив товаров
        this.allProducts = [];// массив объектов
        this._getProducts()
            .then(data => { // data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
            let addToBasketBtn = document.querySelector(`.buy-btn-${productObj.id}`);
            addToBasketBtn.productId = productObj; // привязываем к кнопке продукт каталога
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn buy-btn-${this.id}" data-id="${this.id}">Купить</button>
                </div>
            </div>`
    }
}

let list = new ProductsList();


class Basket {
    constructor(container = '.basket-content') {
        this.container = container;
        this.goods = [];// массив товаров корзины
        this._getBasket()
            .then(data => { // data - объект js
                this.goods = [...data.contents];
                this.render();
            });
    }


    _getBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    // универсальный листенер для кнопок увеличения/уменьшения кол-ва товара в корзине
    _changeAmountListener(event, sign) {
        this.goods.forEach(el => {
            if (el.id_product == event.target.productId.id) {
                (sign == "+") ? el.quantity += 1 : el.quantity -= 1;
                if (el.quantity < 1) {
                    this.goods.splice(this.goods.indexOf(this.goods.find(el => el.quantity == 0)), 1);
                }
            }
            this.render();
        })
    }

    // листенер для добавления товара из каталога в корзину
    _addFromCatalogListener(event) {
        let basketItemIndex = this.goods.indexOf(this.goods.find(el => el.id_product == event.target.dataset.id));
        if (basketItemIndex !== -1) {
            this.goods[basketItemIndex].quantity += 1;
        } else {
            let itemToBasket = event.target.productId;
            this.goods.push({
                "id_product": itemToBasket.id,
                "product_name": itemToBasket.title,
                "price": itemToBasket.price,
                "quantity": 1
            })
        }
        this.render();
    }

    calcSumBasket() {
        return this.goods.reduce((accum, item) => accum += item.price * item.quantity, 0);
    }

    render() {

        const block = document.querySelector(this.container);
        block.innerHTML = '';

        for (let product of this.goods) {
            const basketObj = new BasketItem(product);
            block.insertAdjacentHTML('beforeend', basketObj.render());

            // кнопка увеличения кол-ва определенного товара в корзине
            let addAmountBtn = document.querySelector(`.add-btn-${basketObj.id}`);
            addAmountBtn.productId = basketObj; // привязываем к кнопке продукт корзины
            addAmountBtn.onclick = event => this._changeAmountListener(event, "+");

            // кнопка уменьшения кол-ва определенного товара в корзине
            let subAmountBtn = document.querySelector(`.sub-btn-${basketObj.id}`);
            subAmountBtn.productId = basketObj;
            subAmountBtn.onclick = event => this._changeAmountListener(event, "-");

            // кнопка удаления товара из корзины
            let delFromBasketBtn = document.querySelector(`.del-btn-${basketObj.id}`);
            delFromBasketBtn.productId = basketObj;
            delFromBasketBtn.onclick = event => {
                this.goods.splice(this.goods.indexOf(this.goods.find(el => el.id_product == event.target.productId.id)), 1);
                this.render();
            }

            // кнопка добавления товара из каталога в корзину
            let addToBasketBtn = document.querySelector(`.buy-btn-${basketObj.id}`);
            // addToBasketBtn.addEventListener('click', event => this._addFromCatalogListener(event))
            addToBasketBtn.onclick = event => this._addFromCatalogListener(event);

        }
        //const calcBasketBtn = document.querySelector('.btn-calc');
        const calcText = document.querySelector('.basket-text')
        //calcBasketBtn.onclick = () => calcText.innerHTML = `${this.calcSumBasket()}`
        calcText.innerHTML = `Суммарная стоимость товаров в корзине: ${this.calcSumBasket()} $`
    }
}

class BasketItem {
    constructor(product, img = 'https://placehold.it/70x90') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }

    render() {
        return `<li class="item-list list-group-item">
                    <img src="${this.img}" alt="Some img">
                    <div>Товар: ${this.title} | Цена: ${this.price} $ | Количество: ${this.quantity} шт.</div>
                    <div>
                    <button type="button"  class="btn btn-secondary add-btn-${this.id}">+1</button>
                    <button type="button"  class="btn btn-primary del-btn-${this.id}">Удалить</button>
                    <button type="button"  class="btn btn-secondary sub-btn-${this.id}">-1</button>
                    </div>
                </li>`
    }

}

let userBasket = new Basket();
