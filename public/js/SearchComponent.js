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