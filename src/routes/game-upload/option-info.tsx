import * as React from 'react';
import styled from "styled-components";
import { useQuery } from 'react-query';
import {getUploadedOptionsApi} from '../gameDataApi';

const Container = styled.div`
    
`
const OptionContainer = styled.ul`
`
const OptionList = styled.li`
`
const Loader = styled.h1`
    font-size: 16px;
    font-family: "godicThin";
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
                                    
                                    {option.optionVisibleName}
                                    {option.afterStory}
                                </OptionList>
                            )
                        )
                    }
                </OptionContainer>
            )
        }
    </Container>)
}