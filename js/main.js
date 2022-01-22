const app = {
    data(){

        return{
            url: 'https://vue3-course-api.hexschool.io/v2',
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
                    console.log(token);
                    document.cookie = `loginToken = ${token}; expires=${new Date(expired)};`;
                    //redirect to product (homepage)
                    window.location.href = 'productList.html'
                })
                .catch(error => {
                    console.log(error.data)
                    alert(error.data.message)
                })
        }
    }
}

Vue.createApp(app).mount('#app');