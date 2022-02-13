// 產品資料格式

let productModal = {};
let delProductModal = {};

const app = {
    data(){
        return {
           url: 'https://vue3-course-api.hexschool.io/v2',
           path: 'kevinchang',
           products: [],
           tmpProduct: {
               imagesUrl: [],
           },
           isNew: false,
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
      },
      openModal(status, product){
        if(status == 'isNew') {
            this.tmpProduct = {
                imagesUrl: [],
            }
            productModal.show();
            this.isNew = true;
        }else if (status == 'edit'){
            this.tmpProduct = { ...product }
            productModal.show();
            this.isNew = false;
        }else if (status == 'delete'){
            delProductModal.show();
            this.tmpProduct = { ...product }
        }   
      },
      updateProduct(){
        let url = `${this.url}/api/${this.path}/admin/product`;
        let method = 'post';

        if(!this.isNew){
            url = `${this.url}/api/${this.path}/admin/product/${this.tmpProduct.id}`;
            method = 'put';
        }

        axios[method](url, { data: this.tmpProduct })
            .then(res=>{
                console.log(res);
                this.getAllProducts();
                productModal.hide();
            })
      },
      delProduct(){
        let url = `${this.url}/api/${this.path}/admin/product/${this.tmpProduct.id}`;
        axios.delete(url)
            .then(res=>{
                console.log(res);
                this.getAllProducts();
                delProductModal.hide();
            })
      }
    },

    mounted() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)loginToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;
      this.checkLogin();

      productModal = new bootstrap.Modal(document.getElementById('productModal'));
      delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));

    } 
}

Vue.createApp(app).mount('#app');