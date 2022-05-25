const name = 'hitokoto'

const baseURL = 'https://v1.hitokoto.cn'

const apis = {
  get: {
    url: '/',
    method: 'get',
    params: {
      c: 'i'
    }
  }
}

export default {
  baseURL: baseURL,
  name: name,
  apis: apis
}
