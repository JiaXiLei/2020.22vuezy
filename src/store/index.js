import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: '',
        tableData: [],
        editData: []
    },
    mutations: {
        'LOGIN_USER'(state, action) {
            state.user = action
        },
        // 获取表格数据
        'FETACH_DATA'(state, action) {
            state.tableData = action
        },
        'FETACH_EDIT'(state, action) {
            state.editData = action
        }
    },
    actions: {
        'FETCH_LOGIN'({ commit }, action) {
            axios.post('http://api.baxiaobu.com/index.php/home/v1/login', qs.stringify(action))
                .then(res => {
                    if (res.data.status === '200') {
                        console.log(res.data.message, 'ok')
                        commit('LOGIN_USER', res.data.data)
                        localStorage.setItem('token', res.data.data.user_name)
                    } else {
                        console.log(res.data.message, 'err')
                    }
                })
        },
        'FETACH_TABLE_DATA'({ commit }) {
            axios.get('http://api.baxiaobu.com/index.php/home/v5/findUser')
                .then(res => {
                    commit('FETACH_DATA', res.data.users)
                })
        },
        // 表格添加
        'FETACH_TABLE_ADD'(context, action) {
            axios.post('https://api.baxiaobu.com/index.php/home/v5/add', qs.stringify(action))
                .then(() => {
                    context.dispatch('FETACH_TABLE_DATA')
                })
        },

        //表格删除
        'FETACH_TABLE_DELETE'(context, action) {
            axios.post('https://api.baxiaobu.com/index.php/home/v5/deleteUser', qs.stringify({ id: action }))
                .then(() => {
                    context.dispatch('FETACH_TABLE_DATA')
                })
        },

        //表格回显
        'FETACH_EDIT_DATA'({ commit }, action) {
            commit('FETACH_EDIT', { ...action })
        },

        //表格修改
        'FETACH_TABLE_EDIT'(context, action) {
            axios.post('http://api.baxiaobu.com/index.php/home/v5/updateUser', qs.stringify({ id: action.id, name: action.name, msg: action.msg }))
                .then(() => {
                    context.dispatch('FETACH_TABLE_DATA')
                })
        }
    },
    modules: {
    }
})
