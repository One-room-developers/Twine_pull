import axios from 'axios';

export async function getStories(user_nickname:string){
    const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/my_episode/get_story_list`,
        data: {
            nickname: user_nickname
        }
    });
    const data = await response.data;
    return data;
}

export async function getPassages(story_pk:string){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/my_episode/get_passage_list/${story_pk}`);
    const data = response.data;
    return data;
}

export async function getOptions(passage_pk:string){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/my_episode/get_option_list/${passage_pk}`);
    const data = response.data;
    return data;
}