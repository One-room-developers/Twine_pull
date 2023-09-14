import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { fetchPostList } from '../api';
import { useQuery } from 'react-query';
//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
//이미지
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
const Btn = styled.div`
    width: 264px;
    height: 35px;
    font-size: 17px;
    font-weight:600;
    margin-top: 10px;
    border: 1px solid var(--main-dark);
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
        cursor: pointer;
    }
`
const LikeBtn = styled(Btn)`
    background-color: var(--main-blue);
    color: white;
    border: none;
`
const WriteBtn = styled(Btn)`
    margin: 0;
    width: 120px;
    height: 32px;
    font-size: 16px;
    border: none;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    &:hover{
        background-color: #b0b0b0;
        color: black;
    }
`


const Main = styled.div`
    width: 100%;
    min-height: 470px;
    display: flex;
    justify-content: center;
    background: linear-gradient(to bottom, var(--main-gray) 40px, var(--main-white) 41px, var(--main-white) 100%);
    padding: 0 80px;
`
const LeftSide = styled.div`
    width: 300px;
`
const Mid = styled.div`
    width: 720px;
    margin: 0 23px;
`
const PostCategoryHeader = styled.div`
    width: 100%;
    height: 65px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px 0 18px;
`
const CategoryContainer = styled.ul`
    display: flex;
`
const CategoryTag = styled.li`
    height: 30px;
    padding: 0 3px 3px 3px;
    margin-left: 15px;
    border-bottom: 2px solid var(--main-gray);
    color: var(--main-gray);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-family: "godicM";
`
const CategoryTagSelected = styled(CategoryTag)`
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
    height: 230px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    padding: 18px;
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

const SidePostHeader = styled.h2`
    font-size: 21px;
    font-family: "godicM";
    margin-bottom: 21px;
`
const SearchForm = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`
const SearchPost = styled.input`
    width: 184px;
    height: 28px;
    padding: 3px 12px 3px 12px;
    background-color: var(--main-white);
    border: 1px solid #848484;
    z-index: 2;
    &:focus{
        box-shadow: 0 0 4px var(--main-blue);
    }
`
const SearchButton = styled.button`
    height: 28px;
    background-color: var(--main-white);
    border: 1px solid #848484;
    &:hover{
        background-color: #b0b0b0;
        cursor: pointer;
    }
    &:active{
        z-index: 3;
        box-shadow: 0 0 4px var(--main-blue);
    }
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
    //const [board, setBoard] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const post_id = page*30 + 1;
    
    const {isLoading:isPostLoading, data:postsData} = useQuery<PostInfo[]>("postLists", ()=> fetchPostList(post_id));

    //카테고리 더미 데이터
    const categoryArr = [{name: "일반", url:"/board", id:1}, {name: "버그제보", url:"", id:2}];

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
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>

                <Mid>
                    <PostCategoryHeader>
                        <CategoryContainer>
                            {
                                categoryArr?.map( cat => 
                                    <Link to={cat.url}>
                                        <CategoryTag key={cat.id}>
                                            {cat.name}
                                        </CategoryTag>
                                    </Link>
                                )
                            }
                        </CategoryContainer>
                        <WriteBtn>
                            <Link to={`/board/write`}>글쓰기</Link>
                        </WriteBtn>
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
                        <SidePostHeader>
                            작성글 검색
                        </SidePostHeader>
                        <SearchForm>
                            <SearchPost />
                            <SearchButton>검색</SearchButton>
                        </SearchForm>
                        <Btn>
                            <Link to={"/board"}>
                                전체글
                            </Link>
                        </Btn>
                        <LikeBtn>
                            <Link to={"./"}>
                                인기글
                            </Link>
                        </LikeBtn>
                    </PostSearchContainer>
                    <AdContainer />
                </RightSide>
            </Main>
        </Container>
    );
};