import * as React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { useState } from "react";
import {useParams} from 'react-router-dom'
//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
import AllPageNumContainer from './components/pageNum/AllPageNum';
import BugPageNumContainer from './components/pageNum/BugPageNum';
import NormalPageNumContainer from './components/pageNum/NormalPageNum';
import PopularPageNumContainer from './components/pageNum/PopularPageNum';
import SuggestionPageNumContainer from './components/pageNum/SuggestionPageNum';

import AllPostList from './components/postList/AllPostList';
import BugPostList from './components/postList/BugPostList';
import NormalPostList from './components/postList/NormalPostList';
import SuggestionPostList from './components/postList/SuggestionPostList';
import PopularPostList from './components/postList/PopularPostList';
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
const CategoryTag_disabled = styled(CategoryTag)`
    opacity: 0.5;
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
const Loader = styled.h2`
    font-size: 20px;
    font-weight: 500;
    font-family: "godicM";
    margin-left: 10px;
`
//삭제
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

interface RouteParams {
    category: string;
}

export const BoardRoute: React.FC = () => {

    //url에 따라 componet를 다른걸 뿌리고, 그 component내부에 다 함수 써야될듯. 왜? if문으로 useParm에 따라 달리
    //페이지를 불러오는게 안되기 때문. 그렇게 하지 않으면 모든 배열을 다 불러오게 되버림
    //각각의 페이지도 같음.
    
    //const {isLoading:isPostLoading, data:postsData} = useQuery<PostInfo[]>("postLists", ()=> fetchPostList(endPageNum));

    ///:category 써야겠는데?
    const { category } = useParams<RouteParams>();


    //카테고리 더미 데이터
    const categoryArr = [{name: "전체", url:"all", id:1},{name: "일반", url:"normal", id:2}, {name: "버그제보", url:"bugReport", id:3}, {name: "기능제안", url:"suggestion", id:4}];

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
                                    <Link to={`/board/${cat.url}/1`}>
                                        {
                                            (cat.url === category) ? (
                                                <CategoryTag key={cat.id}>
                                                    {cat.name}
                                                </CategoryTag>
                                            ) : (
                                            <CategoryTag_disabled key={cat.id}>
                                                {cat.name}
                                            </CategoryTag_disabled>)
                                        }
                                        
                                    </Link>
                                )
                            }
                        </CategoryContainer>
                            <Link to={`/write`}>
                                <WriteBtn>글쓰기</WriteBtn>
                            </Link>
                    </PostCategoryHeader>

                    <Switch>
                        <Route path={`/board/all/:pageNum`}>
                            <AllPageNumContainer />
                            <AllPostList />
                            <AllPageNumContainer />
                        </Route>
                        <Route path={`/board/popular/:pageNum`}>
                            <PopularPageNumContainer />
                            <PopularPostList />
                            <PopularPageNumContainer />
                        </Route>
                        <Route path={`/board/normal/:pageNum`}>
                            <NormalPageNumContainer />
                            <NormalPostList />
                            <NormalPageNumContainer />
                        </Route>
                        <Route path={`/board/bugReport/:pageNum`}>
                            <BugPageNumContainer />
                            <BugPostList />
                            <BugPageNumContainer />
                        </Route>
                        <Route path={`/board/suggestion/:pageNum`}>
                            <SuggestionPageNumContainer />
                            <SuggestionPostList />
                            <SuggestionPageNumContainer />
                        </Route>
                        <Route path={`/board`}>
                            <AllPageNumContainer />
                            <AllPostList />
                            <AllPageNumContainer />
                        </Route>
                    </Switch>

                </Mid>

                <RightSide>
                    <PostSearchContainer>
                        <SidePostHeader>
                            작성글 검색
                        </SidePostHeader>
                        <SearchForm>
                            <SearchPost placeholder='미구현' disabled/>
                            <SearchButton>검색</SearchButton>
                        </SearchForm>
                        <Btn>
                            <Link to={"/board"}>
                                전체글
                            </Link>
                        </Btn>
                        <LikeBtn>
                            <Link to={"/board/popular/1"}>
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