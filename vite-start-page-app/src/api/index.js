import register from '@/utils/request.js'
import hitokoto from './hitokoto.js'
import cors from './cors.js'

const api = {
  hitokoto: register(hitokoto),
  cors: register(cors)
}

//export default function(name){
  //console.log(name)
  //return api[name]
//}

export default api
