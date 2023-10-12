abstract class SessionStorage<T> {
    abstract setItem(key:string, value:T) :void;
    abstract getItem(key:string) : string | null;
    abstract clearItem(key:string): void;
}

class SessionStorageAPI<T> extends SessionStorage<T> {
    setItem(key:string, value:T) {
        //value에 무슨 값이 들어오던 string으로 변환 후 저장
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    //userId
    //userNickname
    getItem(key: string): string {
        let value : string | null;

        value = window.sessionStorage.getItem(key);
        
        if(value === null){
            return null;
        }
        else{
            return JSON.parse(value);
        }
    }
    
    clearItem(key: string): void {
        window.sessionStorage.removeItem(key);
    }
}

export default SessionStorageAPI;