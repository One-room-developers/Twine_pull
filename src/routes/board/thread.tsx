import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { fetchCommentList, getPost, checkPostPassword } from '../api';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import likeSvg from './img/like.svg';
import messageSvg from './img/message.svg';
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
    margin-bottom: 15px;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0 5px 0;
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
    font-weight: "godicM";
`
const NoComment = styled.h2`
    font-size: 18px;
    font-weight: "godicThin";
`
const Div1 = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: "godicM";
    margin-bottom: 10px;
`
const MessageIcon = styled.img.attrs({src: messageSvg})`
    width: 16px;
    height: 16px;
    margin-right: 4px;
`
const CommentList = styled.ul`
    border-bottom: 3px solid rgba(0, 173, 181, 0.3);
    width: 100%;
    margin-bottom: 20px;
`
const Comment = styled.li`
    border-top: 3px solid rgba(0, 173, 181, 0.3);
    width: 100%;
    min-height: 81px;
    padding: 0 0 5px 0;
`
const CommentHeader = styled.div`
    width: 100%;
    height: 28px;
    background-color: rgba(57, 62, 70, 0.2);
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 5px;
`
const Div2 = styled.div`
    display:flex;
    align-items: center;
    font-size: 15px;
    font-family: "godicM";
    padding-left: 12px;
`
const Div3 = styled.div`
    display:flex;
    align-items: center;
    font-size: 14px;
    font-family: "godicThin";
`
const CommentWriter = styled.h3`
    margin-right: 8px;
`
const CommentDate = styled.h3`
    font-family: "godicThin";
    font-size: 13px;
`
const ChangeBtn = styled.button`
    border: none;
    background-color: transparent;
    &:hover{
        cursor: pointer;
    }
`

const CommentMain = styled.div`
    width:100%;
    font-family: "godicThin";
    font-size: 16px;
    padding: 12px;
`
const CommentPageNum = styled.div`
`

const CommentWriteContainer = styled.form`
    
`
const Div4 = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`
const IdInput = styled.input`
    background-color: whitesmoke;
    border: 1px solid var(--main-dark);
    width: 120px;
    height: 30px;
    margin-bottom: 8px;
    font-family: "godicThin";
    padding-left: 8px;
`
const PwInput = styled.input`
    background-color: whitesmoke;
    border: 1px solid var(--main-dark);
    width: 120px;
    height: 30px;
    padding-left: 8px;
    font-family: "godicThin";
`
const Div5 = styled.div`
    display: flex;
    margin-bottom: 8px;
`
const Div6 = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
`
const CommentContensInput= styled.input`
    width: calc(100% - 130px);
    padding: 8px;
    font-family: "godicThin";
    font-size: 15px;
    display: flex;
    align-items: flex-start;
    background-color: whitesmoke;
    border: 1px solid var(--main-dark);
`
const CommentSubmintBtn = styled.button`
    background-color: rgba(0, 173, 181, 1);
    color: var(--main-white);
    border: none;
    box-shadow: 0 0 4px rgba(0,0,0,0.5);
    font-family: "godicM";
    font-size: 15px;
    font-weight: 500;
    width: 50px;
    height: 24px;
    &:hover{
        cursor: pointer;
    }
`

const ConfirmPwdForm = styled.form`
    width: 237px;
    height: 36px;
    padding: 5px 0 5px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: var(--main-blue);
`
const ConfirmPwdInput = styled.input`
    width: 160px;
    height: 26px;
    border: none;
    background-color:white;
`
const ConfirmPwdButton = styled.button`
    width: 36px;
    height: 36px;
    font-size: 14px;
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
const UndoButton = styled.div`
    width: 36px;
    height: 36px;
    font-size: 14px;
    &:hover{
        cursor: pointer;
    }
    font-family: "godicM";
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:rgb(2, 134, 141);
    color: var(--main-white);
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
};
interface IComment{
    comment_id: number,
    post_id: number,
    writer: string,
    comment: string,
    createdAt: Date,
    like: number,
};

export const ThreadRoute: React.FC = () => {
    const history = useHistory();
    const {viewId} = useParams<RouteParams>();
    const {isLoading, data} = useQuery<IComment[]>(["comment", viewId], ()=> fetchCommentList(parseInt(viewId)));//고유해야 하는 id

    const [postEditMode, setPostEditMode] = React.useState(false);
    const [postDeleteMode, setPostDeleteMode] = React.useState(false);
    const [commentEditMode, setCommentEditMode] = React.useState(false);
    const [commentDeleteMode, setCommentDeleteMode] = React.useState(false);
    const [targetComment, setTargetComment] = React.useState(-1);

    const [userPostPwd, setUserPostPwd] = React.useState("");
    const [userCommentPwd, setUserCommentPwd] = React.useState("");
    const onChangeUserPostPwd = React.useCallback((e) => setUserPostPwd(e.target.value), []);
    const onChangeUserCommentPwd = React.useCallback((e) => setUserCommentPwd(e.target.value), []);


    const toBack = () => {
        history.goBack();
    }

    const clickLikeBtn = () => {

    }

    async function moveModifyPost(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let result = await checkPostPassword(parseInt(viewId), userPostPwd);

        if(result === true){
            history.push("/");
        }
        else if(result === false) {
            alert("잘못된 비밀번호입니다.");
        }
    }

    async function deletePost(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let result = await checkPostPassword(parseInt(viewId), userPostPwd);

        if(result === true){
            history.push("/");
        }
        else if(result === false) {
            alert("잘못된 비밀번호입니다.");
        }
    }

    async function deleteComment(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        //댓글 비번 검사 api
        //let result = await checkPostPassword(parseInt(viewId), userPostPwd);

        // if(result === true){
        //     history.push("/");
        // }
        // else if(result === false) {
        //     alert("잘못된 비밀번호입니다.");
        // }
    }

    const modifyComment = (commentId: number) => {

    }

    const checkDeleteComment = (commentId: number) => {
        setTargetComment(commentId);
        setPostDeleteMode(true);
    }

    //댓글 게시시
    const commentPost = () => {

    }
    // const commentPost = (postId: number, writer: string, comment: string) =>{
    //     axios({
    //         method: "POST",
    //         url: `${process.env.REACT_APP_API_URL}/comment/create`,
    //         data: {
    //             post_id: postId,
    //             writer: writer,
    //             comment: comment
    //         }
    //     })
    //     .then((res) => {
    //         if(res.data.successMsg == 31) {
    //             alert('오류가 발생하였습니다.')
    //         }

    //         // 댓글 작성한 게시물로 새로고침
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     })
    // }

    const [content, setContent] = React.useState([]);
    const post_id = 1;

    const {isLoading:isPostLoading, data:postData} = useQuery<Post>(["post", viewId], ()=> getPost(parseInt(viewId)));
    
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
                            <BoxName>{isPostLoading ? (<></>) :
                            postData.category === 1 ? (<>일반</>) :
                            postData.category === 2 ? (<>버그 리포트</>) : (<></>)}</BoxName>
                            <BackBtn onClick={toBack}>이전으로</BackBtn>
                        </CategoryHeader>
                        <ThreadInfoHeader>
                            {isPostLoading ? (<Loader>불러오는 중...</Loader>) : (
                                <PostTitle>
                                    {postData.title}
                                </PostTitle>
                            )}
                            <Div3>
                                <Link to={`/modify/${viewId}`}>
                                    <ChangeBtn>
                                        수정
                                    </ChangeBtn>
                                </Link>
                                |
                                <ChangeBtn onClick={() => setPostDeleteMode(current => !current)}>삭제</ChangeBtn>
                                {
                                    postDeleteMode ? (
                                    <ConfirmPwdForm onSubmit={deletePost}>
                                        <ConfirmPwdInput onChange={onChangeUserPostPwd} type="password" required placeholder='삭제 비밀번호' />
                                        <ConfirmPwdButton>확인</ConfirmPwdButton>
                                        <UndoButton onClick={() => setPostDeleteMode(current => !current)}>취소</UndoButton>
                                    </ConfirmPwdForm>) : (<></>)
                                }
                            </Div3>
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
                        <Div1>
                            <MessageIcon />
                            댓글
                        </Div1>
                        {
                            isLoading ? (<Loader>불러오는 중...</Loader>) :
                            (
                                <CommentList>
                                    <Comment>
                                        <CommentHeader>
                                            <Div2>
                                                <CommentWriter>작성자</CommentWriter>
                                                <CommentDate>2023.09.15.18.14</CommentDate>
                                            </Div2>
                                            <Div3>
                                                <ChangeBtn onClick={() => setCommentEditMode(current => !current)}>수정</ChangeBtn>
                                                |
                                                <ChangeBtn onClick={() => setCommentDeleteMode(current => !current)}>삭제</ChangeBtn>
                                                {
                                                    (commentDeleteMode) ? (
                                                    <ConfirmPwdForm onSubmit={deleteComment}>
                                                        <ConfirmPwdInput onChange={onChangeUserPostPwd} type="password" required placeholder='삭제 비밀번호'/>
                                                        <ConfirmPwdButton>확인</ConfirmPwdButton>
                                                        <UndoButton onClick={() => setCommentDeleteMode(current => !current)}>취소</UndoButton>
                                                    </ConfirmPwdForm>) : (<></>)
                                                }
                                            </Div3>
                                        </CommentHeader>
                                        <CommentMain>
                                            댓글 내용이 출력됨
                                        </CommentMain>
                                    </Comment>
                                {
                                    (data?.length === 0) ? (<NoComment></NoComment>) :
                                    (
                                        data?.map(comment =>
                                            <Comment key={comment.comment_id}>
                                                <CommentHeader>
                                                    <Div2>
                                                        <CommentWriter>{comment.writer}</CommentWriter>
                                                        <CommentDate>{comment.createdAt}</CommentDate>
                                                    </Div2>
                                                    <Div3>
                                                        <ChangeBtn onClick={()=>modifyComment(comment.comment_id)}>수정</ChangeBtn>
                                                        |
                                                        <ChangeBtn onClick={()=>checkDeleteComment(comment.comment_id)}>삭제</ChangeBtn>
                                                        {
                                                            (commentDeleteMode===true && targetComment === comment.comment_id) ? (
                                                            <ConfirmPwdForm onSubmit={deleteComment}>
                                                                <ConfirmPwdInput onChange={onChangeUserPostPwd} type="password" required />
                                                                <ConfirmPwdButton>확인</ConfirmPwdButton>
                                                                <UndoButton onClick={() => setCommentDeleteMode(current => !current)}>취소</UndoButton>
                                                            </ConfirmPwdForm>) : (<></>)
                                                        }
                                                    </Div3>
                                                </CommentHeader>
                                                <CommentMain>
                                                    {comment.comment}
                                                </CommentMain>
                                            </Comment>)
                                    )
                                }
                                </CommentList> 
                            )
                        }           
                        <CommentPageNum></CommentPageNum>
                        <CommentWriteContainer onSubmit={commentPost}>
                            <Div5>
                                <Div4>
                                    <IdInput required type="text" placeholder='익명 닉네임'/>
                                    <PwInput required type="password" placeholder='임시 비밀번호'/>
                                </Div4>
                                <CommentContensInput required type="text" placeholder='댓글로 의견을 전달하세요!'/>
                            </Div5>
                            <Div6>
                                <CommentSubmintBtn>작성</CommentSubmintBtn>
                            </Div6>
                        </CommentWriteContainer>
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