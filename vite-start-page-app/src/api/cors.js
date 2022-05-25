const name = 'cors'

//const baseURL = 'http://localhost:6789'
const baseURL = process.env.CORS_BASE_URL

const apis = {
  getBackGround: {
    url: '/cors/bing/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN',
    method: 'get'
  }
}

export default {
  baseURL: baseURL,
  name: name,
  apis: apis
}
