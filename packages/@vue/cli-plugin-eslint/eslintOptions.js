exports.config = (api, config) => {
  const config = {
    root: true,
    env: { node: true },
    extends: ['plugin:vue/essential'],
    rules: {
      'no-console': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'error' : 'off'`),
      'no-debugger': makeJSOnlyValue(`process.env.NODE_ENV === 'production' ? 'error' : 'off'`)
    }
  }
  if (config === 'airbnb') {
    config.rules['no-param-reassign'] = ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
        'ctx', // for Koa routing
        'req', // for Express requests
        'request', // for Express requests
        'res', // for Express responses
        'response', // for Express responses
        '$scope', // for Angular 1 scopes
      ]
    }]
  } 
  if (!api.hasPlugin('typescript')) {
    config.parserOptions = {
      parser: 'babel-eslint'
    }
  }
  return config
}

// __expression is a special flag that allows us to customize stringification
// output when extracting configs into standalone files
function makeJSOnlyValue (str) {
  const fn = () => {}
  fn.__expression = str
  return fn
}

const baseExtensions = ['.js', '.jsx', '.vue']
exports.extensions = api => api.hasPlugin('typescript')
  ? baseExtensions.concat('.ts', '.tsx')
  : baseExtensions
