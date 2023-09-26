import styled from "styled-components";
import { getPostCount } from '../../../api';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import doubleLeft from '../../img/double-left.svg';
import doubleRight from '../../img/double-right.svg';
import left from '../../img/left.svg';
import right from '../../img/right.svg';

const PageNumContainer = styled.div`
width: 100%;
height: 40px;
background-color: var(--main-white);
box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
margin-bottom: 10px;
display: flex;
justify-content: center;
align-items: center;
`
const MoveIcon = styled.img`
    width: 20px;
    height: 20px;
    margin: 3px 1px 0 1px;
    &:hover{
        
    }
`
const NumberPage = styled.h4`
    font-size: 16px;
    font-family: "godicThin";
    margin: 0 12px;
`
const NumberSelected = styled.h4`
    font-size: 16px;
    font-weight: 600;
    font-family: "godicM";
    color: black;
    margin: 0 12px;
`

interface RouteParams{
    pageNum: string;
}

function AllPageNumContainer(){
    const {isLoading:isPostNumLoading, data:allPostNum} = useQuery<number>("postAllNum", getPostCount);
    const pageArr = [];
    //현재 페이지
    const { pageNum } = useParams<RouteParams>();
    let page = 1;

    if(pageNum === undefined){
        page = 1;
    }
    else{
        page = parseInt(pageNum);
    }

    //출력되는 페이지 시작 번호 (10단위)
    let startPageNumber = Math.floor((page-1) / 10);//1의자리 0, 10의자리 숫자 1...
    console.log("startPageNumber: ", startPageNumber);

    //전체 페이지 정보 불러오면 이를 바탕으로 페이지 몇까지 만들어지는지 계산
    const allPageNum = Math.floor(allPostNum / 20) + 1;
    if(isPostNumLoading === false){
        //탈출 조건: 최대 페이지 숫자 끝까지 가거나 or 숫자 10개 배열에 넣던가.
        for(let i= startPageNumber * 10; (i< (startPageNumber * 10) + allPageNum) && i < startPageNumber * 10 + 10; i++){
            pageArr.push(i+1);
        }
    }
    //10이하, 
    return(
        <PageNumContainer>
            <Link to={"/board/all/1"}><MoveIcon src={doubleLeft} /></Link>
            <Link to={`/board/all/${(page === 1) ? 1 : page-1}`}><MoveIcon src={left} /></Link>
            
            {isPostNumLoading ? (<NumberSelected>1</NumberSelected>) : (
                pageArr.map( num =>
                    <>
                        {num === page ?
                        (<NumberSelected>
                            {num}
                        </NumberSelected>) : 
                        (<NumberPage>
                            <Link to={`/board/all/${num}`}>{num}</Link>
                        </NumberPage>)}
                    </>
                )
            )}
            <Link to={`/board/all/${(page === allPageNum) ? allPageNum : page+1}`}><MoveIcon src={right} /></Link>
            <Link to={`/board/all/${allPageNum}`}><MoveIcon src={doubleRight} /></Link>
        </PageNumContainer>
    );
}

export default AllPageNumContainer;