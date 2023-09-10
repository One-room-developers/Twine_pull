import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { fetchPostList } from '../api';
import { useQuery } from 'react-query';
import starImg from './img/star.png';
import upImg from './img/up.png';


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
const TestBtn = styled.div`
    width: 100px;
    height: 30px;
    background-color: black;
    color: var(--main-white);
    border: 1px solid var(--main-blue);
    display: flex;
    justify-content: center;
    align-items: center;
`
const Main = styled.div`
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: space-between;
    background: linear-gradient(to bottom, var(--main-gray) 40px, var(--main-white) 41px, var(--main-white) 100%);
    padding: 0 80px;
`
const LeftSide = styled.div`
    width: 300px;
`
const PopularGameListContainer = styled.div`
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;
`
const AdContainer = styled.div`
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
`
const Mid = styled.div`
    width: 720px;
`
const PostCategoryHeader = styled.div`
    width: 100%;
    height: 65px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;

`
const PageNumContainer = styled.div`
    width: 100%;
    height: 40px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 10px;

`
const PostListWrapper = styled.div`
    min-height: 54px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

`

const RightSide = styled.div`
    width: 300px;
`
const PostSearchContainer = styled.div`
    min-height: 470px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;
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
    font-size: 24px;
    font-weight: 500;
`
const PostList = styled.ul`
    width: 100%;
`

interface PostInfo {
    post_id: number,
    writer: string,
    title: string,
    createdAt: Date,
    view: number,
    like: number,
    category: string,
};

export const BoardRoute: React.FC = () => {
    const [board, setBoard] = React.useState([]);
    const post_id = 31;
    
    const {isLoading:isPostLoading, data:postsData} = useQuery<PostInfo[]>("postLists", ()=> fetchPostList(post_id));

    const category = "일반";
    // axios에 pagination이라는 기능이 있는데 페이지 구현할 때 참고하면 좋을듯

    return (
        <Container>
            <HeaderBar />
            <Header>
                <Title>커뮤니티</Title>
            </Header>
            


            <Main>
                <LeftSide>
                    <PopularGameListContainer>
                        최근 추천수가 높은 게임 리스트
                    </PopularGameListContainer>
                    <AdContainer>
                        광고
                    </AdContainer>
                </LeftSide>

                <Mid>
                    <PostCategoryHeader>

                    </PostCategoryHeader>
                    <PageNumContainer>

                    </PageNumContainer>
                    <PostListWrapper>
                        {isPostLoading ? (<Loader>불러오는 중...</Loader>) :
                        (
                            <PostList>
                                {
                                    postsData?.map( post =>
                                        <PostContainer key={post.post_id}>
                                            <PostHead>{category}</PostHead>
                                            
                                            <PostMain>
                                                <PostMainTop>
                                                    <Link to={`/board/thread/${post_id}`}>{post.title}</Link>
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
                                }
                            </PostList>
                        )
                        }
                    </PostListWrapper>
                    <PageNumContainer>

                    </PageNumContainer>
                </Mid>

                <RightSide>
                    <PostSearchContainer>
                        카테고리 모음
                    </PostSearchContainer>
                    <AdContainer>
                        광고
                    </AdContainer>
                </RightSide>
            </Main>
            <TestBtn>
                <Link to={`/board/write`}>전체글</Link>
            </TestBtn>
            <TestBtn>
                <Link to={`/board/write`}>인기글</Link>
            </TestBtn>
            <TestBtn>
                <Link to={`/board/write`}>공지</Link>
            </TestBtn>
            <TestBtn>
                <Link to={`/board/thread/1`}>첫번째글</Link>
            </TestBtn>
            <TestBtn>
                <Link to={`/board/write`}>글쓰기</Link>
            </TestBtn>
            <Route path={"/board/recommend"}></Route>
        </Container>
    );
};