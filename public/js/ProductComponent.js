// Компоненты для построения каталога =================================

const productitem = {
    props: ['product'],
    // data() {
    //     return {
    //         imgCatalog: 'https://placehold.it/200x150'
    //     }
    // },
    template: `
    <div class="col-md-3 col-xs-6">
        <div class="product">
            <div class="product-img">
                <img :src="'img/' + product.img" alt="Some img">
            </div>
            <div class="product-body">
                <p class="product-category">Электробритвы</p>
                <h3 class="product-name"><a href="#">{{product.product_name}}</a></h3>
                <h4 class="product-price">{{product.price}} &#8381</h4>
                <div class="product-btns">
                    <button @click="$parent.$emit('add-favorite', product)" class="add-to-wishlist"><i
                            class="fa fa-heart-o"></i><span class="tooltipp">В
                            избранное</span></button>
                    <button class="add-to-compare"><i class="fa fa-exchange"></i><span
                            class="tooltipp">К сравнению</span></button>
                    <button class="quick-view"><i class="fa fa-eye"></i><span
                            class="tooltipp">Просмотр</span></button>
                </div>
            </div>
            <div class="add-to-cart">
                <button class="add-to-cart-btn" @click="$parent.$emit('add-product', product)"><i
                        class="fa fa-shopping-cart"></i> Купить</button>
            </div>
        </div>
    </div>
    `
};
//====================================================================

const products = {
    props: ['products'],
    components: { 'product-item': productitem },
    template: `
    <div>
        <product-item class="product-item" v-for="product of products" :key="product.id_product"
        :data-id="product.id_product" :product="product"></product-item>
    </div>
    `
};

export default products
