import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        users: {},
        staff: {},
        inbox: {},
        outbox: {}
        // disposisi_masuk: {}
    },
    mutations: {
        auth_user(state, user){
            state.users = user
        },
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, token){
            state.status = 'success'
            state.token = token
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
            state.users = {}
            state.staff = {}
        },
        get_staff(state, staff){
            state.staff = staff
        },
        get_inbox(state, inbox){
            inbox.sort(
                function(a, b){
                    return b.idSurat - a.idSurat
                }
            )
            state.inbox = inbox
        },
        get_outbox(state, outbox){
            outbox.sort(
                function(a, b){
                    return b.idSurat - a.idSurat
                }
            )
            state.outbox = outbox
        },
        // get_disposisi_masuk(state, inbox){
        //     inbox.filter(item => {
        //         return item.statusApp === 'Jawaban Disposisi'
        //     })
        //     state.disposisi_masuk = inbox
        // }
    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                var loginData = new FormData();
                loginData.append('password', user.password);
                loginData.append('username', user.email);
                loginData.append('grant_type', 'password');
                var session_url = 'https://intranet.lan.go.id:8444/oauth/token';
                var credentials = btoa('cliente' + ':' + 'password');
    
                var headers = {
                    'Authorization': 'Basic ' + credentials 
                }
    
                commit('auth_request')
    
                axios.post(session_url, loginData, {headers: headers})
                .then(resp => {
                    const token = resp.data.access_token
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    // commit('auth_msg', resp.data)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        getUsers({commit}){
            return new Promise((resolve, reject) => {
                let headers = {
                    'Authorization': 'Bearer '+localStorage.getItem('token') 
                }
                axios.get('https://intranet.lan.go.id:8445/employee', {headers: headers})
                .then(resp => {
                    commit('auth_user', resp.data)
                    resolve(resp)
                    // return this.$store.state.users
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        this.$router.push({name: 'login'})
                    }
                    reject(err)
                })
            })
        },
        getStaff({commit}){
            return new Promise((resolve, reject) => {
                let headers = {
                    'Authorization': 'Bearer '+localStorage.getItem('token') 
                }
                axios.get('https://intranet.lan.go.id:8445/employee/unit', {headers: headers})
                .then(resp => {
                    commit('get_staff', resp.data)
                    resolve(resp)
                    // return this.$store.state.users
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        this.$router.push({name: 'login'})
                    }
                    reject(err)
                })
            })
        },
        getSuratMasuk({commit}){
            return new Promise((resolve, reject) => {
                let headers = {
                    'Authorization': 'Bearer '+localStorage.getItem('token') 
                }
                axios.get('https://intranet.lan.go.id:8446/surat/inbox', {headers: headers})
                .then(resp => {
                    commit('get_inbox', resp.data )
                    // commit('get_disposisi_masuk', resp.data )
                    resolve(resp)
                    // return this.$store.state.users
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        this.$router.push({name: 'login'})
                    }
                    reject(err)
                })
            })
        },
        getSuratKeluar({commit}){
            return new Promise((resolve, reject) => {
                let headers = {
                    'Authorization': 'Bearer '+localStorage.getItem('token') 
                }
                axios.get('https://intranet.lan.go.id:8446/surat/outbox', {headers: headers})
                .then(resp => {
                    commit('get_outbox', resp.data)
                    resolve(resp)
                    // return this.$store.state.users
                })
                .catch(err => {
                    if (err.response.status == 401) {
                        commit('logout')
                        localStorage.removeItem('token')
                        delete axios.defaults.headers.common['Authorization']
                        this.$router.push({name: 'login'})
                    }
                    reject(err)
                })
            })
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getToken: state => state.token,
        getUser: state => state.users,
        getStatusChanged: state => state.statusChanged
    }
})