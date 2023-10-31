import { NextStoryAndPassagesArr, NextOptionDefault, NextPassageDefault, NextStoryDefault } from "../../store/stories/gameManager.types";

export let startEpisode : NextStoryAndPassagesArr = [
    {
        ...NextStoryDefault,
        name : "멸망한 세상",
        level : 0,
        startPassage : "0",
    },
    [
        {
            ...NextPassageDefault,
            id : "0",
            name : "시작은 언제나 갑작스럽게",
            visibleText : "나는 대학 졸업을 앞두고 마음을 다잡을 겸 혼자 부산으로 여행을 떠났다. 맛있는 안주에 소주 한 잔 걸치는 낭만. 더없이 행복했다. 하지만 그것도 벌써 1년 전 일이다. 그날밤 대한민국 수도에 미사일이 떨어졌다."
        },
        {
            ...NextPassageDefault,
            name : "폐허가 된 모국",
            visibleText : "그리고 많은 일이 있었다. 언론과 인터넷이 제 기능을 하지 못하자 사람들은 1950년을 방불케 움직였다. 머릿속이 새하얗게 질리는 가운데 기지를 발휘하여 피난민들이 몰려드는 부산에서 거처를 선점했다. 위험한 순간도 많았으나 목숨을 부지하며 근근이 생활을 이어나갔다. 당장 먹고 사는데 지장은 없다. 믿고 정보를 나누는 협력자도 있다. 그런데도 늘 마음이 편치 않다. 서울에 계셨을 부모님이 항상 떠오른다."
        }
    ],
    [
        [
            {
            optionVisibleName : "그땐 전쟁이 난 줄 알았지",
            afterStory: "전쟁이 벌어지진 않았다. 가장 유력한 용의자인 북쪽은 서울이 파괴되기 10분 전에 먼저 미사일을 맞았다. 어디서 날아온 미사일인지는 모른다. 서울이 잿더미가 된 순간 대한민국은 마비되었고, 입에 담기도 힘든 혼란이 시작됐다.",
            status1: "",
            status1Num: 0,
            status2: "",
            status2Num: 0,
            nextNormalPassage : "폐허가 된 모국"
            }
        ],
        [
            {
            optionVisibleName : "부모님은..",
            afterStory: `부모님이 살아계시기를 기대하진 않는다. 미사일이 직격 했던 서울은 말 그대로 폐허. 사람이 살 수 없는 곳이 됐다고 들었다. 그런데 왠지 모르게 서울이 아른거린다. 추억이 담긴 도시의 잔해라도 보고 싶은 마음일까? 아니면 갈수록 사람이 몰려드는 탓에 위험해지는 부산을 벗어나려는 현실적인 판단일까? 뭐가 됐든 빠른 시일 내에 이곳을 뜨고 싶다. 협력자에게 이 얘기를 했더니 날 안타깝게 쳐다보면서 충고를 건넸다. 
            '바깥은 이곳과 비교도 안 될 정도로 위험한 무법지대다. 서울은커녕 경상도에 발 디디기도 전에 죽을 수 있다. 떠나기 전에 이곳의 미약한 치안이 당신을 얼마나 보호해 주었는지 감사해라. 그리고 겨울이 오고 있으니 발걸음을 서둘러라. 건투를 빈다.'`,
            status1: "",
            status1Num: 0,
            status2: "",
            status2Num: 0,
            nextNormalPassage : ""
            }
        ]
    ]
]

export let BadEndEpisodeByHungry : NextStoryAndPassagesArr = [
    {
        ...NextStoryDefault,
        name : "오랜 방랑의 끝...",
        level : 0,
        startPassage : "0",
    },
    [
        {
            ...NextPassageDefault,
            id : "0",
            name : "허기를 이기지 못하고",
            visibleText : "식량이 부족한 결과 당신은 모든 기력을 소진했습니다. 당신은 굶주렸지만 까마귀들은 포식하겠군요."
        }
    ],
    [
        [
            {
            optionVisibleName : "",
            afterStory: "",
            status1: "",
            status1Num: 0,
            status2: "",
            status2Num: 0,
            nextNormalPassage : ""
            }
        ]
    ]
]

export let BadEndEpisodeByHealth : NextStoryAndPassagesArr = [
    {
        ...NextStoryDefault,
        name : "오랜 방랑의 끝...",
        level : 0,
        startPassage : "0",
    },
    [
        {
            ...NextPassageDefault,
            id : "0",
            name : "끝은 갑작스럽게",
            visibleText : "몸이 움직이지 않습니다. 눈앞이 아득해지고, 몹시 추워집니다. 당신은 죽었습니다."
        }
    ],
    [
        [
            {
            optionVisibleName : "",
            afterStory: "",
            status1: "",
            status1Num: 0,
            status2: "",
            status2Num: 0,
            nextNormalPassage : ""
            }
        ]
    ]
]

export let HappyEndEpisode : NextStoryAndPassagesArr = [
    {
        ...NextStoryDefault,
        name : "오랜 방랑의 끝...",
        level : 0,
        startPassage : "0",
    },
    [
        {
            ...NextPassageDefault,
            id : "0",
            name : "서울",
            visibleText : "긴 여정이었다. 이곳이 서울. 내 스스로 선택을 거듭하여 도달한 땅. 이곳은 황량한 폐허이기도 하고, 가끔 무지개가 뜨는 곳이기도 하다. 앞으로 무엇을 보고 무엇을 할지는 내 선택에 달려 있습니다. 지금까지 그랬던 것처럼."
        }
    ],
    [
        [
            {
            optionVisibleName : "...",
            afterStory: "축하합니다.",
            status1: "",
            status1Num: 0,
            status2: "",
            status2Num: 0,
            nextNormalPassage : ""
            }
        ]
    ]
]
