import * as React from 'react';
import styled from "styled-components";
import { useQuery } from 'react-query';
import {getUploadedOptionsApi} from '../gameDataApi';

const Container = styled.div`
    width: 100%;
    min-height: 100px;
`
const OptionContainer = styled.ul`
`
const OptionList = styled.li`
`
const Loader = styled.h1`
    font-size: 16px;
    font-family: "godicThin";
`
const OptionTilteContainer = styled.div`
    margin-bottom: 12px;
    font-size: 18px;
    display: flex;

    font-family: "godicThin";
`
const TitleInfo = styled.h1`
    font-family: "gameBold";
    font-size: 20px;
    margin-right: 12px;
`
const OptionStatContainer = styled.div`
    display: flex;
`
const OptionStat = styled.div`
    font-size: 16px;
    font-family: "godicThin";
    border: 1px solid rgba(0,0,0,0.2);
    padding: 8px;
    margin-right: 12px;
`
const OptionContentsContainer = styled.div`
    width: 100%;
    min-height: 100px;
    box-shadow: 0 0 2px rgba(0,0,0, 0.5);
    background-color: white;
    margin-bottom: 5px;
    padding: 8px;
`
const MiniInfo = styled.h3`
    font-family: "gameBold";
    font-size: 18px;
    margin-bottom: 18px;
`
const MiniContents = styled.h3`
    font-size: 16px;
    font-family: "godicThin";
`
const ContentsContainer = styled.div`
    border: 1px solid rgba(0,0,0,0.2);
    padding: 8px;
    margin-bottom: 18px;
`
interface IOption{
    optionVisibleName: string,
    afterStory: string,
    status1: string,
    status1Num: number,
    status2: string,
    status2Num: number,
    nextNormalPassage: string
}

interface IProps{
    passageId:string;
}

export function OptionInfoRoute(props:IProps){
    const {isLoading:isOptionLoading, data:optionData} = useQuery<IOption[]>(["optionInfo", props.passageId], ()=> getUploadedOptionsApi(props.passageId));//페이지 인자로 받아야됨

    
    return(<Container>
        {
            (isOptionLoading === true) ? (
                <Loader>
                    선택지를 불러오고 있습니다...
                </Loader>
            ) : (
                <OptionContainer>
                    {
                        (optionData?.length === 0) ? (
                            <Loader>
                                선택지가 없습니다. <br/>옳지 않은 형식입니다. 버그제보 게시판에 글을 남겨주세요.
                            </Loader>
                        ) : (
                            optionData.map((option, index)=>
                                <OptionList key={index}>  
                                    <OptionTilteContainer>
                                        <TitleInfo>[선택지{index+1}]</TitleInfo>
                                        {option.optionVisibleName}
                                    </OptionTilteContainer>
                                    <OptionContentsContainer>
                                        <ContentsContainer>
                                            <MiniInfo>스텟 변화량</MiniInfo>
                                            <OptionStatContainer>
                                                <OptionStat>{option.status1} 변화량: {option.status1Num}</OptionStat>
                                                <OptionStat>{option.status2} 변화량: {option.status2Num}</OptionStat>
                                            </OptionStatContainer>
                                        </ContentsContainer>
                                        
                                        <ContentsContainer>
                                            <MiniInfo>이후 스토리</MiniInfo>
                                            <MiniContents>{option.afterStory}</MiniContents>
                                        </ContentsContainer>

                                        <ContentsContainer>
                                            <MiniInfo>다음 글 제목</MiniInfo>
                                            <MiniContents>{(option.nextNormalPassage === null) ? (<>마지막 글입니다.</>) : (<>{option.nextNormalPassage}</>)}</MiniContents>
                                        </ContentsContainer>
                                    </OptionContentsContainer>
                                </OptionList>
                            )
                        )
                    }
                </OptionContainer>
            )
        }
    </Container>)
}