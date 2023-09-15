import axios from 'axios';


export {};

// export function fetchPostList (post_id:number){
//     return axios.get(`http://localhost:3001/post/getPostList/${post_id}`).then((res) => {
//         res.json();
//     });
// }

export async function fetchPostList(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_post_list/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}

export async function getPostCount(){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_post_count`);
    const data = await response.data;
    console.log(data);
    return data;
}

export async function getPost(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/search_by_id/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}

//념글 아이디만큼 긁어오는거
export async function fetchPopularPostList(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_popular_post/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}
//념글 전체갯수
export async function getPopularPostCount() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_popular_post_count`);
    const data = await response.data;
    console.log(data);
    return data;
}

// 댓글 작성
// 이대로 복사해서 현재 게시글 정보만 추가해주면 됨
/**
 * 반환값
 * { msg: 'success', successMsg: 30 }
 * pr
 * { msg: 'fail', errorMsg: 31 }
 * successMsg 값이 32면 저장 성공
 * errorMsg 값이 33이면 실패
 */
export async function createComment(post_id:number, writer:string, comment:string){
    const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/comment/create`,
        data: {
            post_id: 1,     // 현재 게시물 아이디
            writer: "종쌤",    // 작성자
            comment: "끼에엑"   // 댓글 내용
        }
    })
    const data = await response.data;
    console.log(data);
    return data;
}

// 게시물 아이디로 댓글 가져오기
/**
 * 반환값
 * {
 *  comment_id: number,    댓글 아이디
 *  post_id: number,       게시물 아이디
 *  writer: string,        작성자
 *  comment: string,       댓글 내용
 *  createdAt: Date,       작성일자
 *  like: number,          좋아요
 * }
 */
export async function fetchCommentList(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/search_by_post_id/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}

export async function getCommentCount(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/get_comment_count/${post_id}`);
    const data = await response.data;
    console.log(data);
    return data;
}