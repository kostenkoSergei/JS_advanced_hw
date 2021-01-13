// Компонент добавления товара в избранное ============================
Vue.component('favorites', {
    props: ['favorites', 'img'],
    template: `
    <div>
        <div class="popup__body">
            <div class="popup__content">
                <p v-if="!favorites.length"><strong>В избранном нет товаров</strong> </p>
                <div v-else class="favorite-list">
                    <favorite-item v-for="product of favorites" :product="product" :img="img" :key="product.id_product" :data-id="product.id_product">
                    </favorite-item>
                </div>
                <button @click="$emit('show-favorite')" type="button" class="btn btn-info"
                    style="margin: 5px 5px 5px 10px;">Закрыть избранное</button>
            </div>

        </div>
    </div>
    `
});

Vue.component('favorite-item', {
    props: ['product', 'img'],
    template: `
    <div class="card" style="width: 18rem; margin: 5px;">
        <img :src="img" class="card-img-top" alt="Some img">
        <div class="card-body">
            <h5 class="card-title">{{product.product_name}}</h5>
            <p class="card-text">{{product.price}} &#8381</p>
            <div class="favorite-btns">
                <a @click="$parent.$emit('add-product', product)" class="btn btn-info btn-sm">Купить</a>
                <a @click="$parent.$emit('remove-favorite', product)"
                    class="btn btn-danger btn-sm">Удалить</a>
            </div>
        </div>
    </div>
    `
});
//====================================================================
