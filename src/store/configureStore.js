if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod')
} else {
    console.log('dev');
    module.exports = require('./configureStore.dev')
}