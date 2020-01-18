const requireModules = require.context('./modules/', false, /\.js$/)
const modules = {}
requireModules.keys().forEach(moduleName => {
  moduleName = requireModules(moduleName)
  for (const value of Object.values(moduleName)) {
    Object.assign(modules, value)
  }
})

export default modules
