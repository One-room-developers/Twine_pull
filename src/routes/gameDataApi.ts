import axios from 'axios';

export async function getUploadedStoriesApi(genre:number){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/uploaded_episode/get_story_list/${genre}`,
    });
    const data = await response.data;
    return data;
}

export async function getStoryByPk(story_pk:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/uploaded_episode/get_story/${story_pk}`,
    });
    const data = await response.data;
    return data;
}

export async function getUploadedPassagesApi(story_pk:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/uploaded_episode/get_passage_list/${story_pk}`,
    });
    const data = await response.data;
    return data;
}

export async function getUploadedOptionsApi(passage_pk:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/uploaded_episode/get_option_list/${passage_pk}`,
    });
    const data = await response.data;
    return data;
}

export async function getMyStoriesApi(user_nickname:string){
    const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/my_episode/get_story_list`,
        data: {
            nickname: user_nickname
        }
    });
    const data = await response.data;
    return data;
}

export async function getMyPassagesApi(story_pk:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/my_episode/get_passage_list/${story_pk}`,
    });
    const data = response.data;
    return data;
}

export async function getMyOptionsApi(passage_pk:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/my_episode/get_option_list/${passage_pk}`,
    });
    const data = response.data;
    return data;
}

export async function deleteStoryApi(user_id:string, story_pk:string){
    const response = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/my_episode/delete_upload_story/${story_pk}`,
        data: { id: user_id },
        withCredentials: true,
    })
    .catch((err) => {
        return null;      // 리프레시 토큰이 유효하지 않으면 null 반환
    })

    /**
     * data.msg === 42 => 삭제 성공, 41 => 서버 문제로 삭제 실패
     * data가 null이면 id 변조
     */
    const data = response.data;
    return data;
}

export async function updateLikeApi(user_id:string, story_pk:string){
    const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/game_play/update_like`,
        data: {
            player_id: user_id,
            storyPk: story_pk
        }
    });
    const data = response.data;
    return data;                  // data === true면 추천 성공, false면 이미 추천한 상태
}

export async function updateDislikeApi(user_id:string, story_pk:string){
    const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/game_play/update_dislike`,
        data: {
            player_id: user_id,
            storyPk: story_pk
        }
    });
    const data = response.data;
    return data;               // 추천이랑 같음
}