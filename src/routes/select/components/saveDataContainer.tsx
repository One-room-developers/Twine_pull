import * as React from 'react';
import styled from 'styled-components';

const SaveDataDiv = styled.div`
    width: 25%;
    height: 100%;
    position: fixed;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #ffe4a5;
    padding-top: 48px;
    right: 0;
    background-color: white;
`

export function SaveDataContainer(){

    return (<SaveDataDiv></SaveDataDiv>)
}