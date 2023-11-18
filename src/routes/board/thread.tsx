import * as React from 'react';
import styled from 'styled-components';
import { HeaderBar } from '../home';
import { useQuery } from 'react-query';
import { fetchCommentList, getPost, deletePostApi, deleteCommentApi, updatePostLike, updatePostViewApi, updateComment, checkCommentPassword } from '../api';
import {convertISOToKoreaDate} from './components/postList/convertIsoToKoreaDate';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import likeSvg from './img/like.svg';
import messageSvg from './img/message.svg';

//recoil관련
import {useRecoilValue, useRecoilState} from "recoil";
import {userNameAtom, userIdAtom} from "../login/userInfoAtom";
//Component
import {AdContainer} from './components/AdContainer';
import { PopularEpi } from './components/PopularEpi';
import { PopularPost } from './components/PopularPost';

//로그인 관련
import {checkAccessToken} from '../authApi';

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
const CommentModifyContainer = styled(CommentWriteContainer)`
    margin-top: 7px;
    
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
const ConfirmPwInput = styled(PwInput)`
    border: 1px solid var(--main-blue);

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
const CommentContensInput= styled.textarea`
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
const CommentModifyCancletBtn = styled.div`
background-color: var(--main-white);
color: var(--main-gray);
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
margin-right: 10px;
display: flex;
justify-content: center;
align-items: center;
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
    viewId: string,
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
    let {isLoading, data} = useQuery<IComment[]>(["comment", viewId], ()=> fetchCommentList(parseInt(viewId)));//고유해야 하는 id

    const [postDeleteMode, setPostDeleteMode] = React.useState(false);
    const [commentEditMode, setCommentEditMode] = React.useState(false);
    const [commentDeleteMode, setCommentDeleteMode] = React.useState(false);
    const [targetComment, setTargetComment] = React.useState(-1);

    const [userPostPwd, setUserPostPwd] = React.useState("");
    const [userCommentPwd, setUserCommentPwd] = React.useState("");//댓글 비번 검사하는 함수에 사용
    const onChangeUserPostPwd = React.useCallback((e) => setUserPostPwd(e.target.value), []);
    const onChangeUserCommentPwd = React.useCallback((e) => setUserCommentPwd(e.target.value), []);


    //댓글 쓰기 관련
    const [createCommentName, setCreateCommentName] = React.useState("");
    const [createCommentPwd, setCreateCommentPwd] = React.useState("");
    const [createCommentContent, setCreateCommentContent] = React.useState("");

    const onChangeCommentName = React.useCallback((e) => setCreateCommentName(e.target.value), []);
    const onChangeCommentPwd = React.useCallback((e) => setCreateCommentPwd(e.target.value), []);
    const onChangeCommentContent = React.useCallback((e) => setCreateCommentContent(e.target.value), []);

    React.useEffect(()=>{updatePostViewApi(parseInt(viewId))},[]);

    const toBack = () => {
        history.goBack();
    }

    const userId = useRecoilValue(userIdAtom);
    async function checkLogin() {
        if(await checkAccessToken(userId) === true){
            return true;
        }
        else{
            return false;
        }
    }

    async function postLike(userId){
        
            if(userId === null){
                alert("유저 정보를 찾을 수 없습니다. 다시 로그인해주세요.");
                history.replace("/login");
            }
            /*else if(authRefreshToken(userId) === "다른 유저 아이디의 토큰"){
                alert("유저 정보가 다릅니다. 로그아웃 후 다시 이용해주세요.");
            } */
            else{
                if(await updatePostLike(userId, parseInt(viewId)) === false) {
                    alert("이미 추천하였습니다.");
                }
                else {
                    alert("추천하였습니다!");
                }
            }
    }

    async function clickLikeBtn(){
        const isLogin = await checkLogin();

        if(isLogin === true){
            postLike(userId);
        }
        else{
            alert("로그인이 필요합니다.");
        }
    }

    async function deletePost(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let result = await deletePostApi(parseInt(viewId), userPostPwd);

        if(result.errorMsg === 15){
            alert("잘못된 비밀번호입니다.");
        }
        else {
            alert("삭제되었습니다.");
            history.push("/board/all");
        }
    }

    async function deleteComment(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        //댓글 비번 검사 api
        let result = await deleteCommentApi(parseInt(viewId), userCommentPwd);

        if(result.errorMsg === 15 ){
            alert("잘못된 비밀번호입니다.");
        }
        else{
            window.location.reload();
        }
    }

    //댓글의 수정 버튼을 눌렀을 때.
    //해당 댓글 UI를 수정 form으로 바꿔 주는 기능과
    //해당 댓글의 정보를 수정 form에 넣어주는 역할을 동시에 실행
    const [modifyCommentName, setModifyCommentName] = React.useState("");
    const [modifyCommentContent, setModifyCommentContent] = React.useState("");
    const [modifyCommentId, setModifyCommentId] = React.useState(-1);
    const [confirmCommentPwd, setConfirmCommentPwd] = React.useState("");
    //const onChangeModifyCommentName = React.useCallback((e) => setModifyCommentName(e.target.value), []);
    const onChangeModifyCommentContent = React.useCallback((e) => setModifyCommentContent(e.target.value), []);
    const onChangeConfirmCommentPwd = React.useCallback((e) => setConfirmCommentPwd(e.target.value), []);

    const modifyComment = (index: number, name: string, comment: string, commentId: number) => {
        setTargetComment(index);
        setCommentEditMode(true);
        setModifyCommentName(name);
        setModifyCommentContent(comment);
        setModifyCommentId(commentId);
    }

    async function commentModifyProduce(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(await checkCommentPassword(modifyCommentId, confirmCommentPwd) === false){
            alert("비밀번호가 틀렸습니다.");
        }
        else{
            updateComment(modifyCommentId, modifyCommentContent);
            setCommentEditMode(false);
            //새로고침
            window.location.reload();
        }
    }


    //댓글 삭제 버튼 클릭시 변화들
    const checkDeleteComment = (index: number) => {
        setTargetComment(index);
        setCommentDeleteMode(true);
        //비동기라 바뀌기 전 출력
        console.log("commentDeleteMode",commentDeleteMode, "targetComment",targetComment);
    }

    //댓글 게시시
    const commentPostAPI = (postId: number, writer: string, password: string, comment: string) =>{
        axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/comment/create`,
            data: {
                post_id: postId,
                writer: writer,
                password: password,
                comment: comment
            }
        })
        .then((res) => {
            if(res.data.successMsg == 31) {
                alert('오류가 발생하였습니다.')
            }

            // 댓글 작성한 게시물로 새로고침
            window.location.reload();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async function commentPost(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        commentPostAPI(parseInt(viewId), createCommentName, createCommentPwd, createCommentContent);
    }


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
                            postData.category === 2 ? (<>버그제보</>) :
                            postData.category === 3 ? (<>기능제안</>) : (<></>)}</BoxName>
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
                            {commentEditMode ? "" : ""}
                        </Div1>
                        {
                            isLoading ? (<Loader>불러오는 중...</Loader>) :
                            (
                                <CommentList>
                                {
                                    (data?.length === 0) ? (<NoComment></NoComment>) :
                                    (
                                        data?.map((comment, index) =>
                                            <Comment key={index}>
                                                {
                                                    //댓글 수정시 출력되는 부분
                                                    (commentEditMode===true && targetComment === index) ? (
                                                        <CommentModifyContainer method='post' onSubmit={commentModifyProduce}>
                                                            <Div5>
                                                                <Div4>
                                                                    <IdInput value={modifyCommentName} type="text" disabled/>
                                                                    <ConfirmPwInput onChange={onChangeConfirmCommentPwd} required type="password" placeholder='비밀번호 확인'/>
                                                                </Div4>
                                                                <CommentContensInput value={modifyCommentContent} onChange={onChangeModifyCommentContent} required/>
                                                            </Div5>
                                                            <Div6>
                                                                <CommentModifyCancletBtn onClick={()=>{setCommentEditMode(false);}}>취소</CommentModifyCancletBtn>
                                                                <CommentSubmintBtn>작성</CommentSubmintBtn>
                                                            </Div6>
                                                        </CommentModifyContainer>
                                                        ) : (
                                                        //쓴 댓글이 출력되는 부분
                                                        <>
                                                            <CommentHeader>
                                                                <Div2>
                                                                    <CommentWriter>{comment.writer}</CommentWriter>
                                                                    <CommentDate>{convertISOToKoreaDate(comment.createdAt)}</CommentDate>
                                                                </Div2>
                                                                <Div3>
                                                                    <ChangeBtn onClick={()=>modifyComment(index, comment.writer, comment.comment, comment.comment_id)}>수정</ChangeBtn>
                                                                    |
                                                                    <ChangeBtn onClick={()=>checkDeleteComment(index)}>삭제</ChangeBtn>
                                                                    {
                                                                        (commentDeleteMode===true && targetComment === index) ? (
                                                                        <ConfirmPwdForm onSubmit={deleteComment}>
                                                                            <ConfirmPwdInput onChange={onChangeUserCommentPwd} type="password" required />
                                                                            <ConfirmPwdButton>확인</ConfirmPwdButton>
                                                                            <UndoButton onClick={() => setCommentDeleteMode(current => !current)}>취소</UndoButton>
                                                                        </ConfirmPwdForm>) : (<></>)
                                                                    }
                                                                </Div3>
                                                            </CommentHeader>
                                                            <CommentMain>
                                                                {comment.comment}
                                                            </CommentMain>
                                                        </>)
                                                }
                                                
                                            </Comment>)
                                    )
                                }
                                </CommentList> 
                            )
                        }           
                        <CommentPageNum></CommentPageNum>
                        <CommentWriteContainer method='post' onSubmit={commentPost}>
                            <Div5>
                                <Div4>
                                    <IdInput onChange={onChangeCommentName} required type="text" placeholder='익명 닉네임'/>
                                    <PwInput onChange={onChangeCommentPwd} required type="password" placeholder='임시 비밀번호'/>
                                </Div4>
                                <CommentContensInput onChange={onChangeCommentContent} required placeholder='댓글로 의견을 전달하세요!'/>
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
