// Компонент добавления товара в избранное ============================
const favoriteitem = {
    props: ['product'],
    template: `
    <div class="card" style="width: 18rem; margin: 5px;">
        <div class="card-body card-favorite">
            <img :src="'img/' + product.img" alt="Some img" class="card-img-top"">
            <div>
                <h5 class="card-title">{{product.product_name}}</h5>
                <p class="card-text">{{product.price}} &#8381</p>
            </div>
            <div class="favorite-btns">
                <a @click="$parent.$emit('add-product', product)" class="btn btn-info btn-sm">Купить</a>
                <a @click="$parent.$emit('remove-favorite', product)"
                    class="btn btn-danger btn-sm">Удалить</a>
            </div>
        </div>
    </div>
    `
};

const favorite = {
    props: ['favorites'],
    components: { 'favorite-item': favoriteitem },
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
};
//====================================================================

export default favorite
