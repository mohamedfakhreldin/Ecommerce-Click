const { default: Cookies } = require("universal-cookie");

const mainCookies = new Cookies()
 class CookiesManagement {
    get(key){
        return mainCookies.get(key)
    }


    set(key, value, options){
        return mainCookies.set(key,value,options)
    }


    remove(key,options){
        return mainCookies.remove(key,options)
    }


};
export const cookies=new CookiesManagement();
