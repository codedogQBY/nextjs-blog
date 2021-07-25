export function decodeHtml(html) {
    let temp
    temp = html.replaceAll('<','&lt;')
    temp = html.replaceAll('>','&gt;')
    return temp
}

export const dateStr = (date: number) => {
    //获取js 时间戳
    let time = new Date().getTime()
    //去掉 js 时间戳后三位
    time = (time - date) / 1000
    //存储转换值
    let s: string | number
    if (time < 60 * 10) {
      //十分钟内
      return '刚刚'
    } else if (time < 60 * 60 && time >= 60 * 10) {
      //超过十分钟少于1小时
      s = Math.floor(time / 60)
      return s + '分钟前'
    } else if (time < 60 * 60 * 24 && time >= 60 * 60) {
      //超过1小时少于24小时
      s = Math.floor(time / 60 / 60)
      return s + '小时前'
    } else if (time < 60 * 60 * 24 * 30 && time >= 60 * 60 * 24) {
      //超过1天少于30天内
      s = Math.floor(time / 60 / 60 / 24)
      return s + '天前'
    } else {
      //超过30天ddd
      let d = new Date(date)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    }
  }