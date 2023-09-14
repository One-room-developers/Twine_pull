import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { getPost } from '../api';
import { useHistory, useParams } from 'react-router-dom';
import likeSvg from './img/like.svg';
//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
import { PopularPost } from './components/PopularPost';

const Container = styled.body`
    height: 100vh;
`
const Header = styled.div`
    width: 100%;
    height: 250px;
    background-color: var(--main-gray);
    display: flex;
    justify-content: center;
    align-items: flex-end;
`
const Title = styled.h1`
    color: var(--main-white);
    font-size: 55px;
    font-family: "gameBold";
`;
const Main = styled.div`
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, var(--main-gray) 40px, var(--main-white) 41px, var(--main-white) 100%);
    padding: 0 80px;
`
const CategoryHeader = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding:0 10px 0 0;
    margin-bottom: 25px;
`
const BoxName = styled.div`
    padding: 8px 10px;
    background-color: var(--main-dark);
    color: var(--main-white);
    font-family: "godicM";
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
`
const BackBtn = styled.button`
    margin: 0;
    border: none;
    width: 120px;
    height: 32px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    font-family: "gameBold";
    &:hover{
        background-color: #b0b0b0;
        color: black;
        cursor: pointer;
    }
`
const LikeBtn = styled(BackBtn)`
    width: 100px;
    height: 48px;
    &:hover{
        background-color: var(--main-white);
        color: var(--main-gray);
        cursor: pointer;
    }
`
const LikeSvg = styled.img.attrs({src: likeSvg})`
    width: 16px;
    height: 16px;
    margin: 0 4px 0 2px;
`

const LeftSide = styled.div`
    width: 300px;
`
const RightSide = styled.div`
    width: 300px;
`
const Mid = styled.div`
`
const ThreadContainer = styled.div`
    width: 720px;
    min-height: 250px;
    margin: 0 23px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    padding: 30px 50px;
    margin-bottom: 20px;
`
const ThreadInfoHeader = styled.div`
    
`
const Divider = styled.div`
    font-family: "gameBold";
    font-size: 24px;
    margin: 0 3px;
`
const SemiInfo1 = styled.div`
    font-size: 16px;
    color: rgba(0,0,0, 0.5);
    font-family: "godicM";
`
const SemiInfo2 = styled.div`
    font-size: 14px;
    color: rgba(0,0,0, 0.5);
    font-family: "godicThin";
`
const PostContainer = styled.div`
    font-size: 17px;
    font-family: "godicThin";
    color: var(--main-gray);
    margin-bottom: 60px;
`

const CommentContainer = styled(ThreadContainer)`

`
const SemiInfoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 64px;
`
const LikeBtnContainer = styled.div`
    display: flex;
    justify-content: center;
`

const PostContent = styled.div`
`
const PostTitle = styled.h1`
    color: black;
    font-family: "godicM";
    font-size: 21px;
    margin-bottom: 8px;
`
const Loader = styled.h2`
    font-size: 24px;
    font-weight: 500;
`

interface Post {
    post_id: number,
    writer: string,
    category: number,
    title: string,
    content: string,
    createdAt: Date,
    view: number,
    like: number,
};
interface RouteParams {
    viewId: string;
}

export const ThreadRoute: React.FC = () => {
    const history = useHistory();
    const {viewId} = useParams<RouteParams>();

    const toBack = () => {
        history.goBack();
    }

    //좋아요 버튼 누르면 실행되는 함수
    const clickLikeBtn = () => {

    }

    const [content, setContent] = React.useState([]);
    const post_id = 1;

    const {isLoading:isPostLoading, data:postData} = useQuery<Post>("post", ()=> getPost(parseInt(viewId)));
    
    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티</Title>
            </Header>
            
            <Main>
                <LeftSide>
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>
                <Mid>
                    <ThreadContainer>
                        <CategoryHeader>
                            <BoxName>태그</BoxName>
                            <BackBtn onClick={toBack}>이전으로</BackBtn>
                        </CategoryHeader>
                        <ThreadInfoHeader>
                            {isPostLoading ? (<Loader>불러오는 중...</Loader>) : (
                                <PostTitle>
                                    {postData.title}
                                </PostTitle>
                            )}
                        </ThreadInfoHeader>

                        <SemiInfoContainer>
                            {isPostLoading ? (<></>) : (
                                <>
                                    <SemiInfo1>작성자 {postData.writer}</SemiInfo1>
                                    <Divider>·</Divider>
                                    <SemiInfo1>일자 {postData.createdAt}</SemiInfo1>
                                    <Divider>·</Divider>
                                    <SemiInfo2>조회수 {postData.view}</SemiInfo2>
                                    <Divider>·</Divider>
                                    <SemiInfo2>댓글수 {postData.category}</SemiInfo2>
                                    <Divider>·</Divider>
                                    <SemiInfo2>좋아요 {postData.like}</SemiInfo2>
                                </>
                            )}
                        </SemiInfoContainer>
                        
                        <PostContainer>
                            {isPostLoading ? (<></>) : (
                                <PostContent>
                                    {postData.content}
                                </PostContent>
                            )}
                        </PostContainer>
                        <LikeBtnContainer>
                            <LikeBtn onClick={clickLikeBtn}>
                                추천
                                <LikeSvg />
                                {isPostLoading ? (<></>) : (
                                    <>
                                        {postData.like}
                                    </>
                            )}
                            </LikeBtn>
                        </LikeBtnContainer>
                    </ThreadContainer>
                    
                    <CommentContainer>
                        댓글
                    </CommentContainer>
                </Mid>
                <RightSide>
                    <PopularPost />
                    <AdContainer />
                </RightSide>
            </Main>
        </Container>
    );
};