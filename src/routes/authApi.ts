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

export async function checkRefreshToken(): Promise<any>{
    const CookieStorage = new CookieStorageAPI();
    const refreshToken = CookieStorage.getCookies("Refresh");
    const id = CookieStorage.getCookies("userId");
    
    if(refreshToken === null || id === null){
        return false;
    }
    else{
        return { refreshToken, id };
    }
}

//refresh 토큰 유효성 검사
export async function authRefreshToken(refreshToken:string, id:string){
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/auth/refresh`,
        data: id,
        withCredentials: true,
    })
    .then((res) => {
        if(res.data === true) {
            // 쿠키에 새로운 엑세스 토큰 저장됨
            // 원래 서비스로 돌아가기
            console.log('새로운 엑세스 토큰 발급');
        }
        else {
            // 로그인 화면으로 튕기기
            console.log('재로그인');
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

//acess 토큰 유효성 검사
export async function authAccessToken(){
    // 유저가 접근한 기능 axios 요청
    // 유효하지 않은 토큰이면 authRefreshToken()으로 튕기기
}

export async function authentication():Promise<boolean>{
    //acess 토큰 보내는 함수
    const accessToken = await checkAccessToken();
    
    if(accessToken === false){
        const { refreshToken, id } = await checkRefreshToken();
        if(refreshToken === false){//refresh토큰 비었을 때
            //이 함수를 썼을 때, false가 반환되면 로그인이 필요하다고 안내.
            return false;
        }
        else{
            // refreshToken 전달 안 해도 됨
            authRefreshToken(refreshToken, id);
        }
    }
}