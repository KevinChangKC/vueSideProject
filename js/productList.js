// 產品資料格式


const app = {
    data(){
        return {
           url: 'https://vue3-course-api.hexschool.io/v2',
           path: 'kevinchang',
           products: [],
           tmpProduct: {}
        }
    },

    methods: {
      
      checkLogin() {
          axios.post(`${this.url}/api/user/check`)
              .then(res => {
                  this.getAllProducts ( ) ;
              })
              .catch(error => {
                  alert(error.data.message)
                  window.location.href = 'index.html';
              })
      },
      
      getAllProducts ()  {
          axios.get(`${this.url}/api/${this.path}/admin/products`)
              .then(res => {
                  this.products = res.data.products;
              })
              .catch(error => {
                  console.log(error.data);
              })

      } ,
      checkProductDetail(item) {
          this.tmpProduct = item;
      } ,
      changeState(item) {
          item.is_enabled = !item.is_enabled;
      }
    },

    created() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      this.checkLogin();
    } 
}

Vue.createApp(app).mount('#app');