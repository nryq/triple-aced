const files = require.context('.', false, /\.png$/)
const modules = {}
files.keys().forEach((key) => {
  if (key === './index.js') return
  modules[ key.replace(/(\.\/|\.png)/g, '') ] = files(key)
})
export default modules