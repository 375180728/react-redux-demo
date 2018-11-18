/**
 * 异步中间件
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
export default store => next => action => {

    if(!action.delayAction || action.delayAction === 0) {
        return next(action);
    }

    window.setTimeout(() => next(action), action.delayAction * 1000)


}
