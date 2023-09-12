import styled from "styled-components";
import { Link } from 'react-router-dom';


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
`

export const PopularEpi:React.FC = () => {

    //더미데이터
    const likeEpisode = [{id:1, title: "피를 마시는 새", userName: "이영도",}];

    return(
        <PopularGameListContainer>
            <SidePostHeader>
                최신 인기 에피소드
            </SidePostHeader>
            
            <SidePostContentsContainer>
                {
                likeEpisode?.map(episode =>
                    <SidePostContents key={episode.id}>
                        <SidePostTitle>
                            <Link to={"/"}>
                                {episode.title}
                            </Link>
                        </SidePostTitle>
                    </SidePostContents>
                    )
                }
            </SidePostContentsContainer>
        </PopularGameListContainer>
    )
}