import styled from "styled-components";

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

function BugPageNumContainer(){
    return(
        <PageNumContainer>

        </PageNumContainer>
    );
}

export default BugPageNumContainer;