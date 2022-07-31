module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75),
      propList: ['*']
    }
  }
}
