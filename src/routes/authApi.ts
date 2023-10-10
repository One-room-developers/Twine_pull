import SessionStorageAPI from "./login/session";
import axios from "axios";

export async function checkAccessToken() : Promise<boolean>{
    
    const sessionStorage = new SessionStorageAPI();

    if(await authAccessToken() === false){//access토큰 없어
        console.log("access 토큰 없어");

        if(await authRefreshToken(sessionStorage.getItem("userId")) === true){
            //true 반환 받은 순간 이미 access토큰도 발급 받았음.
            return true;
        }
        else{//access토큰이 없는데 체크해보니까 refresh 토큰이 없어.
            console.log("refesh 토큰 없어");

            return false;
        }
    }
    else{//access토큰이 있네?
        console.log("access 토큰 있어");

        return true;
    }
}

//refresh 토큰 유효성 검사
export async function authRefreshToken(id:string|null):Promise<boolean>{
    if(id === null){
        console.log("id 없어");

        return false;
    }
    else{
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/refresh`,
            data: id,
            withCredentials: true,
        })
        .then((res) => {
            console.log("res.data: ", res.data);
            if(res.data === true) {
                console.log("true임?");

                // 쿠키에 새로운 엑세스 토큰 저장됨
                // 원래 서비스로 돌아가기
                return true;
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

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

export async function idCheck(id:string):Promise<boolean>{
    try{
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/id_check/${id}`)
        if(response.data === false) {
            console.log("api에서 false");
            // 중복된 아이디
            console.log('진입');
            return false;
        }else{
            console.log("api에서 true");
            return true;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
}