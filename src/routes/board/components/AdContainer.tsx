import styled from "styled-components";

const Ad = styled.div`
width: 100%;
min-height: 470px;
display: flex;
justify-content: center;
align-items: center;
background-color: var(--main-white);
box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 3px 0px;
margin-bottom: 20px;
`

export const AdContainer: React.FC = () =>{
    return (
        <Ad>광고</Ad>
    )
}
