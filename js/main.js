
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.29/vue.esm-browser.min.js";

const url = 'https://vue3-course-api.hexschool.io/v2';

const app = createApp({
    
    data(){
        return{
            url: url,
            userInfo: {
                "username": "",
                "password": ""
            }
        }
    },

    methods: {
        loginfunc() {
            axios.post(`${this.url}/admin/signin`,this.userInfo)
                .then(res => {
                    const { token, expired } = res.data;
                    console.log(res.data);
                    console.log(token);
                    document.cookie = `loginToken = ${token}; expires=${new Date(expired)};`;
                    //redirect to product (homepage)
                    window.location.href = 'products.html'
                })
                .catch(error => {
                    console.log(error.data)
                    alert(error.data.message)
                })
        }
    }
});

app.mount('#app');