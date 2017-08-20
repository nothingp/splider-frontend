import { routerRedux } from 'dva/router'
import { queryURL } from 'utils'
import moment  from 'moment'
import { report,props } from 'services/reports'

export default {
  namespace: 'report',
  state: {
    data:[],
    prop:[],
    form:{
      code:'600000',
      props:['现金及存放中央银行款项'],
      date:[moment("20160101", "YYYYMMDD"),moment("20161231", "YYYYMMDD")]
    },
    loginLoading: false,
  },

  effects: {
    * report ({
      payload,
    }, { put, call }) {
      //yield put({ type: 'showLoading' })
      const data = yield call(report, payload)
       console.log('1231231231231',data)
      yield put({ type: 'hideLoading',payload:{data:data.list,form:payload} })
    },

    * prop ({
      payload,
    }, { put, call }) {
      const data = yield call(props, payload)
      yield put({ type: 'hidePropLoading',payload:{data:data.list} })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/chart/reportChart') {
          dispatch({ type: 'prop', payload: {} })
          dispatch({ type: 'report', payload: {code:'600000',props:['现金及存放中央银行款项'],date:[moment("20160101", "YYYYMMDD"),moment("20161231", "YYYYMMDD")]} })
        }
      });
    },
  },
  reducers: {
    showLoading (state, action) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoading (state,action) {
      console.log(state,action);
      action.payload.data.forEach(value=>value[value.prop]=value.value);
      console.log(action);
      return {
        ...state,
        data:action.payload.data,
        form:action.payload.form,
        loginLoading: false,
      }
    },
    hidePropLoading (state,action) {
      console.log(state,action);
      console.log(action);
      return {
        ...state,
        prop:action.payload.data,
        loginLoading: false,
      }
    },
  },
}
