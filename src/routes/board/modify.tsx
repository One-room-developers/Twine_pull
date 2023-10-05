import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { Link, useHistory, useParams } from 'react-router-dom';
import { getPost, checkPostPassword, updatePost } from '../api';
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
const Writer = styled.h1`
    font-size: 16px;
    font-family: "godicThin";
    margin-left: 8px;
`

const LeftSide = styled.div`
    width: 300px;
`
const RightSide = styled.div`
    width: 300px;
`
const Mid = styled.div`
    width: 720px;
    min-height: 900px;
    margin: 0 23px;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;

`
const WriteContainer = styled.div`
    width: 100%;
    height: 900px;
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

const ConfirmFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 130px;
`
const ConfirmTitle = styled.h2`
    font-family: "godicM";
    font-size: 20px;
    margin-bottom: 9px;
`
const ConfirmPwdForm = styled.form`
    width: 254px;
    height: 44px;
    padding: 5px 0 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--main-blue);
`
const ConfirmPwdInput = styled.input`
    width: 205px;
    height: 34px;
    font-size: 16px;
    padding-left: 8px;
    border: none;
    background-color:white;
`
const ConfirmPwdButton = styled.button`
    width: 44px;
    height: 44px;
    font-size: 16px;
    padding: 0;
    border: none;
    font-family: "godicM";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:var(--main-blue);
    color: white;
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
    const history = useHistory();
    const {viewId} = useParams<RouteParams>();
    const {isLoading, data} = useQuery<Post>(["modify", viewId], ()=> getPost(parseInt(viewId)));

    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    //비번 여부 판단
    const [isCertification, setIsCetification] = React.useState(false);

    const [userPostPwd, setUserPostPwd] = React.useState("");
    const onChangeUserPostPwd = React.useCallback((e) => setUserPostPwd(e.target.value), []);

    async function checkPostPwd(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let result = await checkPostPassword(parseInt(viewId), userPostPwd);

        if(result.errorMsg === 15){
            alert("잘못된 비밀번호입니다.");
        }
        else {        
            setIsCetification(true);
            
            if(isLoading === true){
                alert("로딩에 실패했습니다.");
            }
            else{
                setTitle(data.title);
                setContent(data.content);
            }
        }
    }

    const onChangeTitle = React.useCallback((e) => setTitle(e.target.value), []);
    const onChangeContent = React.useCallback((e) => setContent(e.target.value), []);

    async function modify(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        await updatePost(parseInt(viewId), title, content);

        history.push("/board/all/1");
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
                    {isCertification ? (
                        <WriteContainer>
                            <WriteFrom method='POST' onSubmit={modify}>
                                <CategoryHeader>
                                    <CategoryContainer>
                                        <BoxName>{isLoading ? (<></>) :
                                        data.category === 1 ? (<>일반</>) :
                                        data.category === 2 ? (<>버그제보</>) : (<></>)}</BoxName>
                                    </CategoryContainer>
                                    <Link to={`/board`}>
                                        <BackBtn>글목록으로</BackBtn>
                                    </Link>
                                </CategoryHeader>
                                <WriterInputContainer>
                                    <BoxName>제목</BoxName>
                                    <WriteInput type="text" required onChange={onChangeTitle} value={title}/>
                                </WriterInputContainer>
                                <ContentsCotainer>
                                    <BoxName>작성자</BoxName>
                                    <Writer>{data.writer}</Writer>
                                </ContentsCotainer>
                                <WriterTextArea className="content" placeholder='본문을 입력해 주세요.' required onChange={onChangeContent} value={content}/>
                                <PostBtnContainer>
                                    <PostBtn>등록</PostBtn>
                                </PostBtnContainer>
                            </WriteFrom>
                        </WriteContainer>
                    ) : (
                        <ConfirmFormContainer>
                            <ConfirmTitle>비밀번호를 입력해주세요</ConfirmTitle>
                            <ConfirmPwdForm onSubmit={checkPostPwd}>
                                <ConfirmPwdInput onChange={onChangeUserPostPwd} type="password" required placeholder='비밀번호' />
                                <ConfirmPwdButton>확인</ConfirmPwdButton>
                            </ConfirmPwdForm>
                        </ConfirmFormContainer>
                    )}
                </Mid>

                <RightSide>
                    <PopularPost />
                    <AdContainer />
                </RightSide>
            </Main>

        </Container>
    )
}