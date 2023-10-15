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