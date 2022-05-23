import axios from 'axios'
import qs from 'querystring'

const pool = {}

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params)
}

function registerRequest(props) {
  const name = props.name || 'default'
  const url = props.baseURL || 'https://localhost:8080'
  const timeout = props.timeout || 3000

  const apis = props.apis

  const request = axios.create({
    baseURL: url,
    timeout: timeout
  })

  const methods = {}
  for(const key in apis) {
    const method = (params) => {
      const api = apis[key]
      const body = {
        method: api.method,
        url: api.url
      }
      if(api.method === 'get' || api.method === 'GET') {
        body['params'] = {
          ...params,
          ...api.params
        }
      } else {
        body['data'] = {
          ...params,
          ...api.data
        }
      }
      const http = request(body)
      return http
    }
    methods[key] = method
  }

  pool[name] = methods

  return pool[name]
}

export default registerRequest
