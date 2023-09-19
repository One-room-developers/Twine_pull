import styled from "styled-components";
import { getPostCount } from '../../../api';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
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
    width: 18px;
    height: 18px;
    margin: 3px 1px 0 1px;
`

function AllPageNumContainer(){
    const {isLoading:isPostNumLoading, data:allPostNum} = useQuery<number>("postAllNum", getPostCount);
    const pageArr = [];

    if(isPostNumLoading === false){
        for(let i=0; i< Math.floor(allPostNum / 20) + 1; i++){
            pageArr.push(i+1);
        }
    }
    //10이하, 
    return(
        <PageNumContainer>
            <Link to={"/"}><MoveIcon src={doubleLeft} /></Link>
            <Link to={"/"}><MoveIcon src={left} /></Link>
            
            {isPostNumLoading ? (<>1</>) : (
                pageArr.map( num =>
                    <Link to={`/board/all/${num}`}>{num}</Link>
                )
            )}
            <Link to={"/"}><MoveIcon src={right} /></Link>
            <Link to={"/"}><MoveIcon src={doubleRight} /></Link>
        </PageNumContainer>
    );
}

export default AllPageNumContainer;