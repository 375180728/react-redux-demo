/**
 * 联动中间件
 * @param  {[type]} store [description]
 * @return {[type]}       [description]
 */
export default store => next => action => {

    if(!action.relations || action.relations.length === 0) {
        return next(action);
    }

    _.forEach(action.relations, function(item, index){ 
        store.dispatch( item ) 
    })

    return next(action);

}
