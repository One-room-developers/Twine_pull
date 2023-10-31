abstract class CookieStorage<T>{
    abstract setCookies(key:string, value:T, path:string, date:string) : void;
    //abstract getCookies(key:string): string|null;
    abstract getCookie(cookieName:string): Promise<string> | Promise<null>;
    abstract clearCookies(key:string) : void;
}

class CookieStorageAPI<T> extends CookieStorage<T>{
    setCookies(key:string, value:T, path:string, date:string){
        document.cookie = key+"="+value+"; path=" + path + "; expires=" + date + ";";
    }

    async getCookie(cookieName:string) {
        cookieName = `${cookieName}=`;
        let cookieData = document.cookie;
        console.log("cookieData: ", cookieData);
      
        let cookieValue = "";
        let start = await cookieData.indexOf(cookieName);
      
        //쿠키가 있으면
        if (start !== -1) {
          start += cookieName.length;
          let end = cookieData.indexOf(";", start);
          if (end === -1) end = cookieData.length;
          cookieValue = cookieData.substring(start, end);
        }
        console.log("cookieValue: ", cookieValue);
        
        return cookieValue;
    }

    clearCookies(key:string){

    }
}

export default CookieStorageAPI;