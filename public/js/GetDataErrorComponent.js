// Компонент сообщения об ошибке ===================================
// Выдает сообщение об ошибке, если сервер недоступен при запросе каталога
const error = {
    data() {
        return {
            errorMsg: 'Не удалось выполнить запрос к серверу'
        }
    },
    template: `
    <div class="col-md-12">
        <div class="section-title text-center">
            <h3 class="error-data">{{errorMsg}}</h3>
        </div>
    </div>
    `
};
//====================================================================
export default error