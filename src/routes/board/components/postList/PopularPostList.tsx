import styled from "styled-components";
import { Link } from 'react-router-dom';
import { fetchPopularPostList } from '../../../api';
import { useQuery } from 'react-query';
import {useParams} from "react-router-dom";
import { useState } from "react";
//이미지
import starImg from '../../img/star.png';
import upImg from '../../img/up.png';


const PostListWrapper = styled.div`
    min-height: 54px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const PostList = styled.ul`
    width: 100%;
`
const PostContainer = styled.li`
    width: 100%;
    height: 58px;
    padding: 9px 10px 8px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover{
        background-color: rgb(202, 209, 217);
    }
`
const PostHead = styled.div`
    width: 65px;
    height: 26px;
    background-color: var(--main-gray);
    color: var(--main-white);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-family: "godicM";
    font-size: 14px;
`
const PostMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 540px;
    height: 100%;
`
const PostMainTop = styled.div`
    width: 100%;
    font-family: "godicM";
    font-size: 17px;
`
const PostMainBottom = styled.div`
    width: 100%;
    font-family: "godicThin";
    font-size: 14px;
    display: flex;
    margin-bottom: 3px;
    opacity: 0.8;
`
const PostBottomInfo = styled.div`
    margin-right: 14px;
`

const PostFooter = styled.div`
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
const StarImg = styled.img.attrs({src: starImg})`
    width: 20px;
    height: 20px;
`
const LikesImg = styled.img.attrs({src: upImg})`
    width: 20px;
    height: 20px;
`
const LikesNumContainer = styled.div`
    font-family: "godicM";
    margin-bottom: 5px;
`

const Loader = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-family: "godicM";
    margin-left: 10px;
`

interface PostInfo {
    post_id: number,
    writer: string,
    title: string,
    createdAt: Date,
    view: number,
    like: number,
    category: number,
};
interface PostProps{
    pageNum: number;
}
interface RouteParams{
    pageNum: string;
}

function PopularPostList(){
    const { pageNum } = useParams<RouteParams>();

    const [page, setPage] = useState(1);

    if(pageNum === undefined){
    }
    else if (parseInt(pageNum) !== page){
        setPage(parseInt(pageNum));
    }

    const {isLoading:isPostLoading, data:postsData} = useQuery<PostInfo[]>(["PopularPostList", page], ()=> fetchPopularPostList(page));

    return(
        <PostListWrapper>
            {isPostLoading ? (<Loader>불러오는 중...</Loader>) :
            (
                <PostList>
                    {
                        (postsData?.length === 0) ? (<Loader>글이 없습니다.</Loader>) : 
                        (
                            postsData?.map( post =>
                                <PostContainer key={post.post_id}>
                                    {post.category === 1 ? (<PostHead>일반</PostHead>) : 
                                        post.category === 2 ? (<PostHead>버그제보</PostHead>):
                                        post.category === 3 ? (<PostHead>기능제안</PostHead>):
                                        (<></>)
                                    }
                                    
                                    <PostMain>
                                        <PostMainTop>
                                            <Link to={`/thread/${post.post_id}`}>{post.title}</Link>
                                        </PostMainTop>
                                        <PostMainBottom>
                                            <PostBottomInfo>{post.writer}</PostBottomInfo>
                                            <PostBottomInfo>{post.createdAt}</PostBottomInfo>
                                            <PostBottomInfo>조회수 {post.view}</PostBottomInfo>
                                        </PostMainBottom>
                                    </PostMain>
                                    
                                    <PostFooter>
                                        {post.like > 10 ?
                                        (<StarImg />) :
                                        (<LikesImg />)
                                        }
                                        <LikesNumContainer>
                                            {post.like}
                                        </LikesNumContainer>
                                    </PostFooter>
                                </PostContainer>
                            )
                        )
                    }
                </PostList>
            )
            }
        </PostListWrapper>
    )
}

export default PopularPostList;