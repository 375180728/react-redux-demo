import 'isomorphic-fetch'
import * as $$BASE from '../actions/baseAction'
import $CACHE from '../helpers/cache'
import { DOMAIN } from '../constants/config'

window._FETCHING={};

function checkStatus(response) {
    if(response.status === 200) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

function request({ url, method, data }, successCallback, errorCallback) {
    fetch(DOMAIN + encodeURI(url),{
        // credentials: 'include',
        method: method || 'GET',
        headers: {
        },
        body: data ? JSON.stringify(data) : undefined
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(successCallback)
    .catch(errorCallback);
}

// 生成请求 KEY
function uniqueFetch(url, method, data={}){
    return $.Hex_MD5(url + method + JSON.stringify({}));
}

export default store => next => action => {

    if(!action.payload || !action.payload.url) {
        return next(action);
    }

    const { loading, cache, errorProcess, url, method, data } = action.payload;
    /**
     * _error_ : 错误时额外操作
     * _success_ : 成功时额外操作
     */
    const { type, _error_, _success_, _done_, ignoreError } = action;

    // LS CACHE
    if (cache) {
        const _lsCache = $CACHE.get(cache.key);
        if (_lsCache) {
            // 成功额外后续
            if (_success_ && _success_.length > 0) {
                _.forEach(_success_, function(item, index){ 
                    if (item.takeParam) {
                        store.dispatch( item.action(_lsCache, action) ) 
                    }else{
                        store.dispatch( item.action ) 
                    }
                })
            };
            return next({type: type, result: {data: _lsCache.data}, status: 0, request: action.payload, extend: action.extend, origin: action});
        };    
    };

    // 唯一请求
    const requestUniqueKey = uniqueFetch(url, method, data);

    if (window._FETCHING[requestUniqueKey]) {
        return;
    }else{
        window._FETCHING[requestUniqueKey] = true;
    }

    // 后端防重复请求
    // if (_.includes(['PUT', 'POST'], _.upperCase(method))) {
    //     data.nonce = Hex_MD5(requestUniqueKey + _.random(9999999) + Hex_MD5(JSON.stringify(data)));
    // }
    
    // LOADING
    // if (loading) {
    //     if (_.isObject(loading)) {
    //         store.dispatch( $$BASE.openLoading(loading.text) );
    //     }else{
    //         store.dispatch( $$BASE.openLoading() );
    //     }
    // };

    return request({ url, method, data }, 
    payload => {

        // 开发环境打印响应
        if (window.MODEL=='dev') {
            console.group('#REQUEST LOG @DATE:' + new Date());
            console.info('#请求地址: ' + url);
            console.info('#请求方法: ' + method);
            console.info('#请求参数: ');
            console.log(data);
            console.info('#响应: ');
            console.log(payload);
            console.groupEnd();
        }

        // 关闭重复请求限制
        delete window._FETCHING[requestUniqueKey];


        // 完成时
        if (_done_ && _done_.length > 0) {
            _.forEach(_done_, function(item, index){ 
                if (item.takeParam) {
                    store.dispatch( item.action(payload, action) ) 
                }else{
                    store.dispatch( item.action ) 
                }
            })
        }

        // 业务错误
        if (payload.status != 1) {
            if (_error_ && _error_.length > 0) {
                _.forEach(_error_, function(item, index){ 
                    if (item.takeParam) {
                        store.dispatch( item.action(payload, action) ) 
                    }else{
                        store.dispatch( item.action ) 
                    }
                })
            };
            if (ignoreError) {
                return next({type: 'NOTHING_TO_DO'});
            }else{
                const errorsMsg = payload.errors ? _.chain(payload.errors).values().join('<br/>').value() : payload.message;
                return next( $$BASE.openAlert(errorsMsg) );
            }
        };
        
        // 缓存
        if (cache) {
            $CACHE.put(cache.key, payload.data, cache.expires);
        };
       
        // 成功额外后续
        if (_success_ && _success_.length > 0) {
            _.forEach(_success_, function(item, index){ 
                if (item.takeParam) {
                    store.dispatch( item.action(payload, action) ) 
                }else{
                    store.dispatch( item.action ) 
                }
            })
        };
       
        // DISPATCH TYPE
        return next({type: type, result: payload, request: action.payload, extend: action.extend, origin: action});
    },
    error => {
        window.setTimeout(function(){
            const requestUniqueKey = uniqueFetch(action.payload.url, action.payload.method);
            delete window._FETCHING[requestUniqueKey];
        }, 500)
        if (loading) {
            store.dispatch( $$BASE.closeLoading() )
        };
        if (process.env.NODE_ENV === 'production') {
            console.log(error);
        }
    })
}
