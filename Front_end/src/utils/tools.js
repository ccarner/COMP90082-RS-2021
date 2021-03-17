class Tools {
  // eslint-disable-next-line class-methods-use-this
  getLoctionParams(params) {
    const query = window.location.search.substring(1)
    const vars = query.split("&")
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split("=")
      if (pair[0] === params) {
        return pair[1]
      }
    }
    return false
  }

  // eslint-disable-next-line class-methods-use-this
  addParamsToUrl(url, key, val) {
    if (!val) {
      return url
    }
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i")
    const separator = url.indexOf("?") !== -1 ? "&" : "?"
    if (url.match(re)) {
      return url.replace(re, `$1${key}=${val}$2`)
    }

    return `${url + separator + key}=${val}`
  }
}
export default new Tools()
