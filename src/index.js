import { message } from 'antd'
import dva from 'dva'
import createLoading from 'dva-loading'
import { browserHistory } from 'dva/router'
import 'babel-polyfill'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true,
  }),
  history: browserHistory,
  onError (error) {
    message.error(error.message)
  },
})

require('./mock/common');
require('./mock/dashboard');
require('./mock/menu');
require('./mock/post');
require('./mock/user');


// 2. Model
app.model(require('./models/app'))
app.model(require('./models/report'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

