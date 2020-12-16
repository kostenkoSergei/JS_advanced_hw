/*
1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или сократить запись функций?
3. * Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит? Как это исправить?
*/


const products = [
    { id: 1, title: 'Notebook', price: 2000 },
    { id: 2, title: 'Mouse', price: 20 },
    { id: 3, title: 'Keyboard', price: 200 },
    { id: 4, title: 'Gamepad', price: 50 },
];

/*
   Так как стрелочная функция в данном случае только возвращает значение, можно убрать
   return и фигурные скобки (для лучшей читаемости я бы оставил). На вход функции передаем весь объект. 
   В теле функции используем конкретные свойства.
*/
const renderProduct = (obj) =>
    `<div class="card w-50 products-item">
    <img class="card-img-top" src="img/test.jpg" alt="Item img">
    <div class="card-body">
      <h4 class="card-title">${obj.title}</h4>
      <p class="card-text">Цена: ${obj.price}</p>
      <div class="card-btn">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Добавить</button>
        <button type="button" class="btn btn-light btn-favour">&#9825</button>
      </div>
    </div>
  </div>`;

// в качестве аргумента по умолчанию передал список из одного продукта 
const renderPage = (list = [{ id: 1, title: 'unknown', price: 0 },]) => {
    let productsList = list.map(item => renderProduct(item));
    /*
    При записи в InnerHTML массив преобразуется в строку. По умолчанию разделитель ','.
    Принудительно перед записью переводим в строку, в качестве переноса используя
    символ переноса строки.
    */
    document.querySelector('.products').innerHTML = productsList.join('\n');
}

renderPage(products);
// renderPage();
