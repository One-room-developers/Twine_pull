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
export async function authRefreshToken(id:string):Promise<boolean>{
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
            return true;
        }
    })
    .catch((err) => {
        console.log(err);
    });

    return false;
}

//acess 토큰 유효성 검사
export async function authAccessToken():Promise<boolean>{
    axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/auth/access`,
        withCredentials: true,
    })
    .then((res) => {
        if(res.data === true) {
            // 인증 성공
            return true;
        }
    })
    .catch((err) => {
        console.log(err);
    });

    // 인증 실패
    // refresh 토큰 검사하는 함수 호출
    return false;
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
            authRefreshToken(id);
        }
    }
}

export async function idCheck(id:string):Promise<boolean> {
    axios.post(`${process.env.REACT_APP_API_URL}/auth/id_check/${id}`)
    .then((res) => {
        if(res.data === false) {
            // 중복된 아이디
            return false;
        }
    })
    .catch((err) => {
        console.log(err);
    });

    return true;
}