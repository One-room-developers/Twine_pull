import styled from "styled-components";
import { Link } from 'react-router-dom';
import {useQuery} from "react-query";
import { getUploadedStoriesApi } from '../../gameDataApi';


const PopularGameListContainer = styled.div`
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    background-color: var(--main-white);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
    margin-bottom: 20px;
    padding: 18px;
`
const SidePostHeader = styled.h2`
    font-size: 21px;
    font-family: "godicM";
    margin-bottom: 21px;
`
const SidePostContentsContainer = styled.ul`

`
const SidePostContents = styled.li`
    width: 100%;
    height: 25px;
`
const SidePostTitle = styled.h2`
    font-family: "godicThin";
    font-size: 16px;
    width: 100%;
    display: flex;
`
interface IStory {
    pk: string,
    genre: number,
    level: number,
    name: string,
    userNickname: string,//누가 썼는가?
    startPassage: string,
    like: number,
    dislike: number,
    createdAt: Date,
}
export const PopularEpi:React.FC = () => {
    const categoryNum = 1;//현재는 아포칼립스만
    //Story data 가져오기
    const {isLoading:isStoryLoading, data:storiesData} = useQuery<IStory[]>(["LastStoryList"], ()=> getUploadedStoriesApi(categoryNum));//페이지 인자로 받아야됨


    //더미데이터
    
    return(
        <PopularGameListContainer>
            <SidePostHeader>
                최신 업로드 에피소드
            </SidePostHeader>
            
            <SidePostContentsContainer>
                {
                    isStoryLoading ? (<>불러오는 중...</>) : 
                    (storiesData?.map((episode, index) =>
                    <SidePostContents key={index}>
                        <Link to={`/storyInfo/${episode.pk}`}>
                            <SidePostTitle>
                                {episode.name}
                                &nbsp;
                                {episode.genre === 1 ? "[멸망]" : <></>}
                            </SidePostTitle>
                        </Link>
                    </SidePostContents>
                    ))
                }
            </SidePostContentsContainer>
        </PopularGameListContainer>
    )
}