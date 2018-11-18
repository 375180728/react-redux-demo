export default{
    // 设置缓存 [expires - 过期天数, -1 代表同session一同过期]
    put(key, value, expires){

        if (!window.localStorage) {return null};

        if (this.get('key')) {

            this.remove('key');

        };

        var o = {"expires": expires, "createDate": new Date(), "data":value };
        window.localStorage.setItem(key, JSON.stringify(o));

    },

    // 获取缓存
    get(key){
        if (!window.localStorage) {return null};
        if (!window.localStorage.getItem(key)) {return null};

        try{
            var o = JSON.parse( window.localStorage.getItem(key) );
        }catch(e){
            return null;
        }
        if(o.expires !== -1 && parseInt( ((new Date()).getTime() - (new Date(o.createDate).getTime())) / 1000 ) > (o.expires * 60 * 60 * 24)){
            window.localStorage.removeItem(key);
            return null;

        }
        return o;

    },

    // 删除缓存
    remove(key){

        if (!window.localStorage) {return null};
        if (!window.localStorage.getItem(key)) {return null};

        window.localStorage.removeItem(key);

    },

    // 清空缓存
    clear(){
        window.localStorage.clear(); 
    },

    // 删除过期本地缓存
    removeExpired(){
        var di = [];
        for (var i = 0; i < window.localStorage.length; i++) {
          try{
            var o = JSON.parse( window.localStorage[window.localStorage.key(i)] );
            if (o && o.expires && o.expires === -1) {
              di.push(window.localStorage.key(i));
            };
          }catch(e){
            //do nothing
          }
        };
        _.forEach(di, function(val, index) {
           window.localStorage.removeItem(val);
        });
    }

}