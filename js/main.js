class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров
        //        this.allProducts=[];//массив объектов
        this._fetchProducts();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
    }

    /*
    2. Добавьте для GoodsList метод, определяющий суммарную стоимость всех товаров.
     */
    getTotalPrice() {
        return `Суммарная стоимость всех товаров: ${this.goods.reduce((acc, currentValue) => acc + currentValue.price, 0)}`
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObject = new ProductItem(product);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
}

class ProductItem {
    constructor(product, img = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

/*
1. Добавьте пустые классы для корзины товаров и элемента корзины товаров. Продумайте, какие методы 
понадобятся для работы с этими сущностями.
 */
class Basket {
    constructor() {

    };

    // внешний вид корзины
    render() {

    };

    // для удаления продукта из корзины
    removeItem() {

    }

    // для применения промокода
    getPromo() {

    }

    // подсчет полной стоимости корзины
    getTotalPrice() {

    }
}

class BasketItem extends ProductItem {
    /*
    При создании экземпляра класса BasketItem по умолчанию будет вызван конструктор базового класса ProductItem, 
    поэтому в явном виде пока не прописываем
     */

    // для отрисовки продукта в корзине 
    render() {
        super.render();
    }

    // для увеличения кол-ва конкретного товара в корзине
    addItemAmount() {

    }

    // для уменьшения кол-ва конкретного товара в корзине
    subItemAmount() {

    }

}



let list = new ProductsList();
list.render();
console.log(list.getTotalPrice());


/*
3. *Некая сеть фастфуда предлагает несколько видов гамбургеров:
### Маленький (50 рублей, 20 калорий).
### Большой (100 рублей, 40 калорий). ### Гамбургер может быть с одним из нескольких видов начинок (обязательно):
### С сыром (+10 рублей, +20 калорий).
### С салатом (+20 рублей, +5 калорий).
### С картофелем (+15 рублей, +10 калорий). ### Дополнительно гамбургер можно посыпать приправой (+15 рублей, +0 калорий) 
и полить майонезом (+20 рублей, +5 калорий). ### 3Напишите программу, рассчитывающую стоимость и калорийность гамбургера. 
Можно использовать примерную архитектуру класса из методички, но можно использовать и свою
class Hamburger {
  constructor(size, stuffing) { ... }
  addTopping(topping) {    // Добавить добавку }
  removeTopping(topping) { // Убрать добавку }
  getToppings(topping) {   // Получить список добавок }
  getSize() {              // Узнать размер гамбургера }
  getStuffing() {          // Узнать начинку гамбургера }
  calculatePrice() {       // Узнать цену }
  calculateCalories() {    // Узнать калорийность }
}
 */

class Hamburger {
    static stuffings = {
        cheese: { price: 10, calories: 20 },
        salad: { price: 20, calories: 5 },
        potato: { price: 15, calories: 10 },
        mayonnaise: { price: 20, calories: 5 },
    };

    static getToppings() {
        return `Доступные к заказу добавки: ${Object.keys(Hamburger.stuffings)}`;
    };

    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = [stuffing]; // список добавок для данного экземпляра класса
        if (size == 'small') {
            this.initialPrice = 50;
            this.initialCalories = 20;
        };
        if (size == 'big') {
            this.initialPrice = 100;
            this.initialCalories = 40;
        };
        this.totalPrice = 0;
        this.totalCalories = 0;
    }

    _renderOrder() {
        this.stuffing.forEach(el => {
            this.totalPrice += Hamburger.stuffings[el].price;
            this.totalCalories += Hamburger.stuffings[el].calories;
        });
    }

    addTopping(topping) {
        if (this.stuffing.includes(topping)) {
            console.log('Такая добавка уже была учтена')
        }
        else {
            this.stuffing.push(topping);
            this.totalPrice = 0;
            this.totalCalories = 0;
            this._renderOrder();
        }

    };

    getMayonnaise() {
        this.stuffing.push('mayonnaise');
        this.totalPrice = 0;
        this.totalCalories = 0;
        this._renderOrder();
    }

    removeTopping(topping) {
        if (this.stuffing.includes(topping)) {
            this.stuffing.splice(this.stuffing.indexOf(topping), 1);
            this.totalPrice = 0;
            this.totalCalories = 0;
            this._renderOrder();
        }
        else {
            console.log('Такой добавки не было в заказе')
        }

    }

    getStuffing() {
        return `На данный момент добавлены: ${this.stuffing}`;
    }

    calculatePrice() {
        return `${this.getStuffing()}. Цена гамбургера составляет: ${this.totalPrice + this.initialPrice} рублей`
    }

    calculateCalories() {
        return `${this.getStuffing()}. Калорийность составляет: ${this.totalCalories + this.initialCalories} калорий`
    }

    getSize() {
        return `Размер гамбургера: ${this.size}`;
    }
}

console.log(Hamburger.getToppings()); // получаем список возможных добавок
let smallHamburger = new Hamburger('small', 'cheese');
console.log(smallHamburger.calculatePrice());
let bigHamburger = new Hamburger('big', 'potato');
console.log(bigHamburger.calculatePrice());
smallHamburger.addTopping('salad');
smallHamburger.addTopping('potato');
console.log(smallHamburger.getSize());
console.log(smallHamburger.getStuffing()); // смотрим, что добавлено на текущий момент
console.log(smallHamburger.calculatePrice());
console.log(smallHamburger.calculateCalories());
smallHamburger.removeTopping('potato'); // удаляем добавку
console.log(smallHamburger.getStuffing()); // смотрим, что добавлено на текущий момент
console.log(smallHamburger.calculatePrice());
console.log(smallHamburger.calculateCalories());
smallHamburger.getMayonnaise(); // добавляем майонез
console.log(smallHamburger.getStuffing()); // смотрим, что добавлено на текущий момент
console.log(smallHamburger.calculatePrice());
console.log(smallHamburger.calculateCalories());
smallHamburger.addTopping('salad'); // добавляем повторно уже добавленное
console.log(smallHamburger.getStuffing()); // смотрим, что добавлено на текущий момент
smallHamburger.removeTopping('potato'); // пробуем удалить то, чего нет (удалено ранее)

