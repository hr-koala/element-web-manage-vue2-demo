
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

const state = {
  adminInfo: {
    avatar: 'default.jpg'
  },
}

const mutations = {
  saveAdminInfo(state, adminInfo){
    state.adminInfo = adminInfo;
  }
}

const actions = {
  async getAdminData({commit}){
    api.getAdminInfo().then(data=>{
      console.log(data)
      const res = data.data
      if (res.status == 1) {
        commit('saveAdminInfo', res.data);
      }else{
        throw new Error(res.type)
      }
    }).catch(err=>{
      console.log('',err)
    })
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations,
})
