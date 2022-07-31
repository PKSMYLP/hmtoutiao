// class 三大特性 封装 继承 多态
// 对 localStorage.getItem setItem 进行封装
class Storage {
  // get 会自动进行JSON.stringify()
  get (key) {
    const value = localStorage.getItem(key)
    // 通过try catch 判断是否为JSON字符串 并进行捕获
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set (key, value) {
    // 判断value是否为对象且不是null typeof的返回值是字符串
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    // value 不是对象
    localStorage.setItem(key, value)
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
// 默认导出 new 实例
export default new Storage()
