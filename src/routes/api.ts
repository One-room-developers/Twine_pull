import axios from 'axios';

export {};

export async function fetchPostList(page_num:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_post_list/${page_num}`);
    const data = await response.data;
    return data;
}

export async function getPostCount(){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_post_count`);
    const data = await response.data;
    return data;
}

export async function getPost(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/search_by_id/${post_id}`);
    const data = await response.data;
    return data;
}

// 카테고리별 게시물 리스트
export async function fetchPostListByCategory(category:number, page_num:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/search_by_category/${category}/${page_num}`)
    const data = await response.data;
    return data;
}

// 카테고리별 게시물 개수
export async function getPostCountByCategory(category:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_count_by_category/${category}`)
    const data = await response.data;
    return data;
}

export async function fetchPopularPostList(page_num:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_popular_post/${page_num}`);
    const data = await response.data;
    return data;
}

export async function getPopularPostCount() {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/post/get_popular_post_count`);
    const data = await response.data;
    return data;
}

export async function updatePost(post_id:number, title:string, content:string) {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/post/update`,
    {
        "post_id": post_id,
        "title": title,
        "content": content,
    });
    const data = response.data;
    return data;
}

export async function updatePostViewApi(post_id:number) {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/post/update_view/${post_id}`);
    const data = response.data;
    return data;
}

export async function updatePostLike(player_id:string, post_id:number) {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/post/update_like`,
        {
            "player_id": player_id,
            "post_id": post_id
        });
    const data = await response.data;
    return data;
}

export async function checkPostPassword(post_id:number, password:string) {
    const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/post/check_password`,
        data: {
            id: post_id,
            password: password,
        }
    });
    const data = response.data;
    return data;
}

export async function deletePostApi(post_id:number, password:string) {
    const response = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/post/delete`,
        data: {
            id: post_id,
            password: password,
        }
    });
    const data = response.data;
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
    return data;
}

// 게시물에 달린 댓글 개수
export async function getCommentCount(post_id:number){
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/comment/get_comment_count/${post_id}`);
    const data = await response.data;
    return data;
}

export async function updateComment(comment_id:number, comment:string) {
    const response = await axios.patch(`${process.env.REACT_APP_API_URL}/comment/update`,
    {
        "comment_id": comment_id,
        "comment": comment,
    });
    const data = response.data;
    return data;
}

export async function checkCommentPassword(comment_id:number, password:string) {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/comment/check_password`,
    {
        "id": comment_id,
        "password": password,
    });
    const data = response.data;
    return data;
}

export async function deleteComment(comment_id:number, password:string) {
    const response = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/comment/delete`,
        data: {
            id: comment_id,
            password: password,
        }
    });
    const data = response.data;
    return data;
}