import axios from "axios";

export async function checkAccessToken(userId) : Promise<boolean>{

    if(await authAccessToken() === false){//access토큰 없어
        console.log("userID", userId);

        if(await authRefreshToken(userId) === true){
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
    try{
        if(id === null){
            console.log("id 없어");
            return false;
        }
        else{
                const reponse = await axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_API_URL}/auth/refresh`,
                    data: id,
                    withCredentials: true,
                });
                //const reponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {data : id, withCredentials:true})
                console.log("res.data: ", reponse.data);
        
                if(reponse.data === true) {
                    console.log("true임?");

                    // 쿠키에 새로운 엑세스 토큰 저장됨
                    // 원래 서비스로 돌아가기
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    catch(err){
        console.log(err)
        return false;
    }
}

//acess 토큰 유효성 검사
export async function authAccessToken():Promise<boolean>{
    try {
        const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/access`,
            withCredentials: true,
        });
        //const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/access`, {withCredentials : true})
        if(response.data === true) {
            // 인증 성공
            return true;
        }
        else{
            return false;
        }
    }
    catch(err){
        console.log(err);
        return false;
    }
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

export async function nicknameCheck(nickname:string):Promise<boolean>{
    try{
        const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/nickname_check/`,
            data: {
                nickname: nickname
            }
        });

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

export async function logout():Promise<boolean>{
    localStorage.removeItem("recoil-persist");

    try{
        const response = await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/auth/logout/`,
            withCredentials: true
        });

        window.location.href = "/";
        return true;
    }
    catch(err){
        console.log(err);
        return false;
    }
}