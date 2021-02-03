// 考勤管理导出excel
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'
const attendence = {
  state: {
    equip:[],
    recoder:[],
    order:[],
    income:[]
  },
  getters: {
    get_Equipment: state => state.equip,
    get_Rcoder: state => state.recoder,
    get_Order: state => state.order,
    get_Income: state => state.income,
  },
  mutations: {
    set_equipList:(state,data) =>state.equip = data,
    set_recoderList:(state,data) =>state.recoder = data,
    set_OrderList:(state,data) =>state.order = data,
    set_IncomeList:(state,data) =>state.income = data,
  },
  actions: {
    // /equipment/insertEquipment 添加设备信息
    addEquip({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/insertEquipment`;
        let methods = 'post';
        fx.setConnect({url,methods, data})
        .then(res => {
          resolve(1)
          
        }).catch(err => {

        })
      })
    },
    // /equipment/getEquipmentByPage 分页查询设备信息
    getEquipmentAll({state, commit},page) {
      return new Promise((resolve, reject) => {
        if(!page) {
          page = state.page;
        }else{
          state.page = page;
        }
      let url = `/equipment/getEquipmentByPage?pageNum=${page.pageNum}&pageSize=${page.pageSize}&numberingOrMacId=${page.numberingOrMacId}`;
      fx.setConnect( {url})
      .then( res => { 
        commit('set_equipList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch( error => {
        
      })
    })
    }, 
    
  // /equipment/updateEquipment 修改设备信息
  updateEquip({state, dispatch}, data) {
    return new Promise( (resolve, reject) => {
      let url = `/equipment/updateEquipment`;
      let methods = "post";
      fx.setConnect({url,methods, data})
      .then(res => {
        resolve(1);
        dispatch('getEquipmentAll');
      }).catch(err => {

      })
    })
  },
  // /equipment/removeEquipment 设备删除
  deleteEquipment({state, dispatch}, id) {
    return new Promise( (resolve, reject) => {
      let url = `/equipment/removeEquipment?id=${id}`;
      fx.setConnect({url})
      .then(res => {
        dispatch('getEquipmentAll');
        resolve(1);
      }).catch(err => {

      })
    })
  },
  
// /commodity/insertCommodity 添加商品信息
  addRcoder({state, dispatch}, data) {
    return new Promise( (resolve, reject) => {
      let url = `/commodity/insertCommodity`;
      let methods = "post";
      fx.setConnect({url,methods, data})
      .then(res => {
        resolve(1)
        
      }).catch(err => {

      })
    })
  },
// /commodity/getCommodityPage 分页查询商品信息
  getRcoderAll({state, commit},page) {
    return new Promise((resolve, reject) => {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
    let url = `/commodity/getCommodityPage?pageNum=${page.pageNum}&pageSize=${page.pageSize}&name=${page.name}`;
    fx.setConnect( {url})
    .then( res => { 
      commit('set_recoderList', res.data.data);
      page.total = res.data.data.total * 1;
    }).catch( error => {
      
    })
  })
  }, 
// /commodity/updateCommodity 修改商品信息
  updateRcoder({state, dispatch}, data) {
    return new Promise( (resolve, reject) => {
      let url = `/commodity/updateCommodity `;
      let methods = "post";
      fx.setConnect({url,methods, data})
      .then(res => {
        resolve(1);
        dispatch('getRcoderAll');
      }).catch(err => {

      })
    })
  },
// /commodity/removeCommodity 删除商品信息
  deleteRcoder({state, dispatch}, id) {
    return new Promise( (resolve, reject) => {
      let url = `/commodity/removeCommodity?id=${id}`;
      fx.setConnect({url})
      .then(res => {
        dispatch('getRcoderAll');
        resolve(1);
      }).catch(err => {

      })
    })
  },
  // /equipment/updateEquipmentStatus 设备上线下线接口
  updateStatus({state, dispatch}, data) {
    return new Promise( (resolve, reject) => {
      let url = `/equipment/updateEquipmentStatus`;
      fx.setConnect({url, data})
      .then(res => {
        resolve(1);
        dispatch('getEquipmentAll');
      }).catch(err => {

      })
    })
  },
  // /order/getOrderListByPage 查询订单列表
  getOrderAll({state, commit},page) {
    return new Promise((resolve, reject) => {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
    let url = `/order/getOrderListByPage?pageNum=${page.pageNum}&pageSize=${page.pageSize}&startTime=${page.startTime}
    &endTime=${page.endTime}&orderStatus=${page.orderStatus}`;
    fx.setConnect( {url})
    .then( res => { 
      commit('set_OrderList', res.data.data);
      page.total = res.data.data.total * 1;
    }).catch( error => {
      
    })
  })
  }, 
  ///order/removeOrder 删除订单信息
  deleteOrder({state, dispatch}, id) {
    return new Promise( (resolve, reject) => {
      let url = `/order/removeOrder?id=${id}`;
      let methods = "post";
      fx.setConnect({url,methods})
      .then(res => {
        dispatch('getOrderAll');
        resolve(1);
      }).catch(err => {

      })
    })
  },
  // /order/updateOrder 修改订单信息
  updateOder({state, dispatch}, data) {
    return new Promise( (resolve, reject) => {
      let url = `/order/updateOrder`;
      let methods = "post";
      fx.setConnect({url,methods, data})
      .then(res => {
        resolve(1);
        dispatch('getOrderAll');
      }).catch(err => {

      })
    })
  },
  
// /income/getEquipmentIncome 查询设备收益列表
getIncomeAll({state, commit},page) {
  return new Promise((resolve, reject) => {
    if(!page) {
      page = state.page;
    }else{
      state.page = page;
    }
  let url = `/income/getEquipmentIncome?startTime=${page.startTime}
  &endTime=${page.endTime}&equipmentId=${page.equipmentId}`;
  fx.setConnect( {url})
  .then( res => { 
    commit('set_IncomeList', res.data.data);
    page.total = res.data.data.total * 1;
  }).catch( error => {
    
  })
})
}, 
  }
}
export default attendence
