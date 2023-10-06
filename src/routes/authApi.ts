import CookieStorageAPI from "./login/cookies";
import axios from "axios";

export async function checkAccessToken() : Promise<boolean | string>{
    const CookieStorage = new CookieStorageAPI();
    const accessToken = CookieStorage.getCookies("Access");
    if(accessToken === null){
        return false;
    }
    else{
        return accessToken;
    }
}

export async function checkRefreshToken(){
    const CookieStorage = new CookieStorageAPI();
    const refreshToken = CookieStorage.getCookies("Refresh");
    
    if(refreshToken === null){
        return false;
    }
    else{
        return refreshToken;
    }
}

//refresh 토큰 유효성 검사
export async function authRefreshToken(refreshToken:string){
    axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh`)
}

//acess 토큰 유효성 검사
export async function authAccessToken(){

}

export async function authentication():Promise<boolean>{
    //acess 토큰 보내는 함수
    const accessToken = await checkAccessToken();
    
    if(accessToken === false){
        const refreshToken = await checkRefreshToken();
        if(refreshToken === false){//refresh토큰 비었을 때
            //이 함수를 썼을 때, false가 반환되면 로그인이 필요하다고 안내.
            return false;
        }
        else{
            authRefreshToken(refreshToken);
        }
    }
}