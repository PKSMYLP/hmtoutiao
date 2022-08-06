// 将file对象解析成base64，用 promise 管理
export const resolveToBase64 = (file) => {
  return new Promise((resolve) => {
    // new 一个阅读器
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = (e) => resolve(e.target.result)
  })
}
