abstract class CookieStorage<T>{
    abstract setCookies(key:string, value:T) : void;
    abstract getCookies(key:string): string|null;
    abstract clearCookies(key:string) : void;
}

class CookieStorageAPI<T> extends CookieStorage<T>{
    setCookies(key:string, value:T){

    }

    getCookies(key:string){

        return "";
    }

    clearCookies(key:string){

    }
}

export default CookieStorageAPI;