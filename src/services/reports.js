import { request, config } from 'utils'

const { api } = config
const { reportApi,propApi } = api

export async function report (data) {
  data.propsArr = data.props.join(',');
  data.time = [data.date[0].format("YYYYMMDD"),data.date[1].format("YYYYMMDD")].join(',')
  return request({
    url: reportApi,
    method: 'get',
    data,
  })
}

export async function props (data) {
  return request({
    url: propApi,
    method: 'get',
    data,
  })
}
