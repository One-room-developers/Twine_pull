import axios from 'axios';


export {};

// export function fetchPostList (post_id:number){
//     return axios.get(`http://localhost:3001/post/getPostList/${post_id}`).then((res) => {
//         res.json();
//     });
// }

export async function fetchPostList(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/getPostList/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}