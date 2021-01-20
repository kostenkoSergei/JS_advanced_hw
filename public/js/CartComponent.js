
// Компоненты для построения корзины =================================
const basketitem = {
  props: ['product'],
  // data() {
  //     return {
  //         imgBasket: 'https://placehold.it/100x100'
  //     }
  // },
  template: `
    <div>
      <div class="product-widget">
          <div class="product-img">
              <img :src="'img/' + product.img" alt="Some img" style="width: 45px;">
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
          @click="$parent.$emit('remove-product', product)"><i
              class="fa fa-close"></i></button>

      </div>
    </div>
  `
};
//====================================================================

const basket = {
  props: ['basket'],
  components: { 'basket-item': basketitem },
  computed: {
    calcBasket: function () {
      return [this.basket.reduce((acc, currentValue) => acc + currentValue.price * currentValue.quantity, 0),
      this.basket.reduce((acc, currentValue) => acc + currentValue.quantity, 0)]
    }
  },
  template: `
      <div class="cart-list">
        <p v-if="!basket.length"><strong>Нет данных. Корзина пуста</strong> </p>
        <basket-item v-for="product of basket" :key="product.id_product"
        :data-id="product.id_product" :product="product"></basket-item>
        <div class="cart-summary">
            <small>В корзине {{calcBasket[1]}} ед. товара</small>
            <h5>Сумма заказа: {{calcBasket[0]}} &#8381</h5>
        </div>
      </div>
    `
};

export default basket

