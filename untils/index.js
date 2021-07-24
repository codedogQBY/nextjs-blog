export function decodeHtml(html) {
    let temp
    temp = html.replaceAll('<','&lt;')
    temp = html.replaceAll('>','&gt;')
    return temp
}