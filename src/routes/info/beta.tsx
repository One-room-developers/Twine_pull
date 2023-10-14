import * as React from 'react';
import styled from 'styled-components';

const InfoContainer1 = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const InfoContainer2 = styled(InfoContainer1)`
    width: 545px;
    height: 670px;
    background-color: white;
`
const InfoContainer3 = styled(InfoContainer2)`
    width: 515px;
    height: 640px;
    border: 4px solid var(--main-blue);
`
const InfoContainer4 = styled(InfoContainer3)`
    width: 495px;
    height: 620px;
    border: 2px solid var(--main-blue);
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 22px;
    font-family: "godicM";
`
const Contents = styled.div`
    width: 485px;
    height: 570px;
    font-family: "godicThin";
    font-size: 18px;
    margin-top: 10px;
    padding: 5px;
    line-height: 150%;
    overflow-y: scroll;
`
const SubTitle = styled.div`
    font-size: 19px;
    font-family: "godicM";
`

export function BetaInfo() {

    return (
        <InfoContainer1>
            <InfoContainer2>
                <InfoContainer3>
                    <InfoContainer4>
                        <Title>이용 안내</Title>
                        <Contents>
                        안녕하세요, 팀 원룸 개발자들입니다.
<br/>
<br/>
부족한 개발자 셋의 졸업 작품을 즐기러 와주셔서 감사합니다.
저희의 서비스를 이용해주시는 모든 분들이 좋은 경험을 가지고 가셨으면 좋겠습니다.
<br/>
<br/>
아래는 베타 기간 이용 안내사항입니다.
<br/>
<br/>
<br/>
<SubTitle>1. [보안 안내]</SubTitle>
<br/>
홈페이지에 가입할 때, 다른 사이트에는 사용하지 않는 비밀번호로 가입을 해주시면 감사하겠습니다.
보안을 신경쓰면서 개발하였으나, 개발 팀원 중 보안 전문 개발자가 없었기 때문에 100% 보안을 장담을 드리기 어렵습니다.
<br/>
따라서 본 사이트는 이름, 생일, 성별 등 어떠한 추가적인 개인정보도 받지 않고 있으며, 비밀번호 역시 개인정보가 되지 않는 조합으로 사용 부탁드립니다.
<br/>
<br/>
<br/>
<SubTitle>2. [적절하지 못한 게시글]</SubTitle>
<br/>
부적절하다고 판단되는 게시글이나 게임 데이터는 통보 없이 삭제될 수 있습니다.

<br/>
<br/>
<br/>
<SubTitle>3. [게임 데이터 안내]</SubTitle>
<br/>
별도의 공지 없이 유저 여러분들이 만든 게임 데이터(2제외)를 삭제하지 않을 것을 약속 드립니다.
<br/>
하지만 베타 기간 중 유저 여러분이 만든 게임 데이터(에피소드)는, 정식 출시 때 게임의 구조적인 변화로 인해 게임에 적용할 수 없게 될 수 있습니다.
<br/>
그렇게되면 게임 데이터를 공지 후 삭제할 수 있기 때문에 걱정되시는 분은 자신의 기기에 저장해두시길 바랍니다.

<br/>
<br/>
<br/>
<SubTitle>4. [버그 안내]</SubTitle>
<br/>
버그 제보와 기능 제안은 언제나 환영합니다.

<br/>
<br/>
<br/>
<SubTitle>5. [이미지 안내]</SubTitle>
<br/>
현재 사이트에서 사용되는 이미지는 모두 AI로 생성하였습니다.

<br/>
<br/>
<br/>
<SubTitle>6. [베타 기간]</SubTitle>
<br/>
현재 첫번째 베타 테스트가 진행중입니다.
<br/>
기간은 2023- ~ 2023- 까지 입니다.

                        </Contents>
                    </InfoContainer4>
                </InfoContainer3>
            </InfoContainer2>
        </InfoContainer1>
    );
}
/*
이용 안내
안녕하세요, 팀 원룸 개발자들입니다.

부족한 저희 셋의 졸업 작품을 즐기러 와주셔서 감사드립니다.
저희의 서비스를 이용해주시는 모든 분들에게 좋은 경험을 선물해드릴 수 있으면 좋겠습니다.
아래는 베타 기간 이용 안내사항입니다.


1. [보안 안내]
홈페이지에 가입할 때, 다른 사이트에는 사용하지 않는 비밀번호로 가입을 해주시면 감사하겠습니다.
최대한 보안을 신경쓰면서 개발하기는 했으나, 개발 팀원 중 보안 전문 개발자가 없었기 때문에 100% 보안을 장담을 드리기 어렵습니다.
따라서 이름, 생일, 성별 등 어떠한 추가적인 개인정보도 받지 않고 있으며, 비밀번호 역시 개인정보가 되지 않는 조합으로 사용 부탁드립니다.

2. [적절하지 못한 게시글]
부적절하다고 판단되는 게시글이나 게임 데이터는 통보 없이 삭제될 수 있습니다.

3. [게임 데이터 안내]
별도의 공지 없이 유저 여러분들이 만든 게임 데이터를 삭제하지 않을 것을 약속 드립니다.
하지만 베타 기간 중 유저 여러분이 만든 게임 데이터(에피소드)는, 정식 출시 때 구조적인 문제로 인해 게임에 적용할 수 없게 될 수 있습니다.
그렇게되면 게임 데이터를 공지 후 삭제할 수 있기 때문에 걱정되시는 분은 자신의 기기에 저장해두시길 바랍니다.

4. [버그 안내]
버그 제보와 기능 제안은 언제나 환영합니다.

5. [이미지 안내]
현재 사이트에서 사용되는 이미지는 모두 AI로 생성하였습니다.

6. [베타 기간]
현재 첫번째 베타가 진행중이며 기간은 2023- ~ 2023- 까지 입니다.

*/