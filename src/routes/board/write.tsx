import * as React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { HeaderBar } from '../home';
import { Link, useHistory } from 'react-router-dom';
import {useForm} from "react-hook-form";

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
    margin-bottom: 25px;
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

const CertificateContainer = styled.div`
    display: flex;
    width: 420px;
    justify-content: space-between;
`

interface IFormData{
    error:{
        category:{
            message:string;
        }
    }
    category:number;
    title:string;
    writer:string;
    pwd:string;
    content:string;
};

export const WriteRoute: React.FC = () => {
    const history = useHistory();
    const {register, handleSubmit, formState:{errors}, setError} = useForm();
    
    function onValid(data:IFormData){
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/post/create`,
            data: {
                writer: data.writer,
                title: data.title,
                content: data.content,
                category: data.category,
                password: data.pwd
            },
        })
        .then((res) => {
            if(res.data.successMsg === 20) {
                alert("게시물이 등록되었습니다.");
            }
            else {
                alert("오류");
            }

            history.push("/board/all/1");
        });
    }

    // function test1000Post(){
    //     for(let i=1; i<1000; i++){
    //         axios({
    //             method: "POST",
    //             url: `${process.env.REACT_APP_API_URL}/post/create`,
    //             data: {
    //                 writer: `사용자${i}`,
    //                 title: `제목${i}`,
    //                 content: `내용${i}`,
    //                 category: (i%2) + 1,
    //                 password: "1234"
    //             },
    //         })
    //         .then((res) => {
    //             if(res.data.successMsg === 20) {
    //                 //alert("게시물이 등록되었습니다.");
    //             }
    //             else {
    //                 alert("오류");
    //             }
    
    //             //history.push("/board/all/1");
    //         });
    //     }
    // }


    return(
        <Container>
            <HeaderBar />
            <Header>
                <Title>글쓰기</Title>
            </Header>

            <Main>
                <LeftSide>
                    <PopularEpi />
                    <AdContainer />
                </LeftSide>
                <Mid>
                    <WriteContainer>
                        <WriteFrom method='POST' onSubmit={handleSubmit(onValid)}>
                            <CategoryHeader>
                                <CategoryContainer>
                                    <BoxName>태그</BoxName>
                                    <CategorySelect {...register("category", {required: "필수 입력 항목입니다.", })}>
                                        <option value={""}>카테고리 선택</option>
                                        <option value={1}>일반</option>
                                        <option value={2}>버그제보</option>
                                        <option value={3}>기능제안</option>
                                    </CategorySelect>
                                </CategoryContainer>
                                <Link to={`/board`}>
                                    <BackBtn>글목록으로</BackBtn>
                                </Link>
                            </CategoryHeader>
                            <WriterInputContainer>
                                <BoxName>제목</BoxName>
                                <WriteInput type="text" {...register("title", {required: "필수 입력 항목입니다.", })}/>
                            </WriterInputContainer>
                            <CertificateContainer>
                                <ContentsCotainer>
                                    <BoxName>작성자</BoxName>
                                    <Contents type="text" {...register("writer", {required: "필수 입력 항목입니다.", })}/>
                                </ContentsCotainer>
                                <ContentsCotainer>
                                    <BoxName>비밀번호</BoxName>
                                    <Contents type="password" {...register("pwd", {required: "필수 입력 항목입니다.", })}/>
                                </ContentsCotainer>
                            </CertificateContainer>
                            <WriterTextArea className="content" placeholder='본문을 입력해 주세요.' {...register("content", {required: "필수 입력 항목입니다.", })}/>
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
    );
};