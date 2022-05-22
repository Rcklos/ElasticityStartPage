const local = {
  set(key = '', value = '') {
    console.log(JSON.stringify(value))
    localStorage.setItem(key, JSON.stringify(value))
  },

  get(key = undefined) {
    return JSON.parse(localStorage.getItem(key)) || undefined
  },

  clear() {
    localStorage.clear()
  },

  remove(key = '') {
    localStorage.removeItem(key)
  }
}


export default local
