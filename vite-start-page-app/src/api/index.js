import register from '@/utils/request.js'
import hitokoto from './hitokoto.js'

const api = {
  hitokoto: register(hitokoto)
}

//export default function(name){
  //console.log(name)
  //return api[name]
//}

export default api
