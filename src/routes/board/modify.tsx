import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getPost } from '../api';
import { useQuery } from 'react-query';

import {useEffect} from 'react';

//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
import { PopularPost } from './components/PopularPost';
import { count } from 'console';

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
`

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
    padding:0 10px 0 0;
`
const Box = styled.div`
    height: 32px;
    border-bottom: 1px solid rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`
const BoxName = styled.div`
    height: 100%;
    width: 60px;
    background-color: var(--main-dark);
    color: var(--main-white);
    font-family: "godicM";
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CategoryContainer = styled(Box)`
    
`
const CategorySelect = styled.select`
    font-family: "godicM";
    font-size: 15px;
    height: 100%;
    border: none;
    background-color: var(--main-white);
    color: var(--main-dark);
    margin-left: 4px;
`
const ContentsCotainer = styled(Box)`
    width: 200px;
    border: none;
`
const WriterInputContainer =styled(Box)`
    border: none;
`
const BackBtn = styled.div`
    margin: 0;
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
    }
`
const WriteFrom = styled.form`
    display: flex;
    flex-direction: column;

`
const WriteInput = styled.input`
    height: 100%;
    width: calc(100% - 60px);
    border: none;
    background-color: var(--main-white);
    border-bottom: 1px solid rgba(0,0,0,0.3);
    font-size: 16px;
    padding-left: 6px;
    &:focus{
        border-bottom: 1px solid var(--main-dark);
    }
`
const Contents = styled(WriteInput)`
    
`

const LeftSide = styled.div`
    width: 300px;
`
const RightSide = styled.div`
    width: 300px;
`
const Mid = styled.div`
    width: 720px;
    margin: 0 23px;
    height: 900px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
`
const WriteContainer = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px 50px;
`
const WriterTextArea = styled.textarea`
    padding: 12px;
    font-size: 15px;
    font-family: "godicThin";
    width: 100%;
    height: 500px;
    background-color: var(--main-white);
    margin: 16px 0;
    border: 1px solid rgba(0,0,0,0.3);
    &:focus{
        border: 1px solid var(--main-dark);
    }
`

const PostBtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const PostBtn = styled.button`
    background-color: rgba(0, 173, 181, 1);
    color: var(--main-white);
    border: none;
    box-shadow: 0 0 4px rgba(0,0,0,0.5);
    font-family: "godicM";
    font-size: 17px;
    font-weight: 500;
    width: 60px;
    height: 30px;
    &:hover{
        cursor: pointer;
    }
`

interface RouteParams {
    viewId: string;
};
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

export const ModifyRoute:React.FC = () => {

    const {viewId} = useParams<RouteParams>();
    let data;

    const history = useHistory();

    const [nickname, setNickname] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [category, setCategory] = React.useState("");

    useEffect(()=>{
        data = getPost(parseInt(viewId));
    },
    []);
    useEffect(()=>{
        setNickname(data.writer);
        setTitle(data.title);
        setContent(data.content);
        setCategory(data.category);
        console.log("nickname: ", nickname);
        console.log("title: ", title);
        console.log("content: ", content);
        console.log("category: ", category);
    },
    [data]);

    const onChangeNickname = React.useCallback((e) => setNickname(e.target.value), []);
    const onChangeTitle = React.useCallback((e) => setTitle(e.target.value), []);
    const onChangeContent = React.useCallback((e) => setContent(e.target.value), []);
    const onChangeCategory = React.useCallback((e) => setCategory(e.target.value), []);

    function modify(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

    }

    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>글 수정</Title>
            </Header>

            <Main>
                <LeftSide>
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>
                <Mid>
                    <WriteContainer>
                        <WriteFrom method='POST' onSubmit={modify}>
                            <CategoryHeader>
                                <CategoryContainer>
                                    <BoxName>태그</BoxName>
                                    <CategorySelect required onChange={onChangeCategory}>
                                        <option value={""}>카테고리 선택</option>
                                        <option value={1}>일반</option>
                                        <option value={2}>버그제보</option>
                                    </CategorySelect>
                                </CategoryContainer>
                                <Link to={`/board`}>
                                    <BackBtn>글목록으로</BackBtn>
                                </Link>
                            </CategoryHeader>
                            <WriterInputContainer>
                                <BoxName>제목</BoxName>
                                <WriteInput type="text" required onChange={onChangeTitle}/>
                            </WriterInputContainer>
                            <ContentsCotainer>
                                <BoxName>작성자</BoxName>
                                <Contents type="text" required onChange={onChangeNickname}/>
                            </ContentsCotainer>
                            <WriterTextArea className="content" placeholder='본문을 입력해 주세요.' required onChange={onChangeContent}/>
                            <PostBtnContainer>
                                <PostBtn>등록</PostBtn>
                            </PostBtnContainer>
                        </WriteFrom>
                    </WriteContainer>
                </Mid>

                <RightSide>
                    <PopularPost />
                    <AdContainer />
                </RightSide>
            </Main>

        </Container>
    )
}