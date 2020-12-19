const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];
//Функция для формирования верстки каждого товара
const renderProduct = (product, img = 'https://placehold.it/200x150') => {
    return `<div class="product-item">
                <img src="${img}">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    document.querySelector('.products').innerHTML = list.map(item => renderProduct(item)).join('');
};

renderPage(products);


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
        this.stuffing.push(topping);
        this.totalPrice = 0;
        this.totalCalories = 0;
        this._renderOrder();
    };

    getMayonnaise() {
        this.stuffing.push('mayonnaise');
        this.totalPrice = 0;
        this.totalCalories = 0;
        this._renderOrder();
    }

    removeTopping(topping) {
        this.stuffing.splice(this.stuffing.indexOf(topping), 1);
        this.totalPrice = 0;
        this.totalCalories = 0;
        this._renderOrder();
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
