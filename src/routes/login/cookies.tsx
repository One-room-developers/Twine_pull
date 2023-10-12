abstract class CookieStorage<T>{
    abstract setCookies(key:string, value:T, path:string, date:string) : void;
    //abstract getCookies(key:string): string|null;
    abstract clearCookies(key:string) : void;
}

class CookieStorageAPI<T> extends CookieStorage<T>{
    setCookies(key:string, value:T, path:string, date:string){
        document.cookie = key+"="+value+"; path=" + path + "; expires=" + date + ";";
    }

    clearCookies(key:string){

    }
}

export default CookieStorageAPI;