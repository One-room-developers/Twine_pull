//선택지 정보만 따로
export interface OptionLog {
    //다른 interface들은 아이디를 왜 string으로 두었을까?
    id: string;
    
    //에피소드 안에서 몇번제 선택지였는가
    num: number;

    //어떤 종류의 스테이터스가 변했는가?
    status: string;

    //변화량이 얼마였는가?
    change: number;
}

//단일 로그 - 이걸 배열로 만들어서 한 게임의 로그로 만들기.
export interface Log {
    //이 로그의 아이디
    id: string;

    //어떤 스토리(에피소드)였는지 그 아이디 저장
    episodeId: string;

    //선택지들의 필요한 정보만.
    options: OptionLog[];

    //몇번 선택지를 선택했는가? OptionLog[].num 으로 일치하는 선택지 찾는 함수 만들기
    selectNum: number;

}

export interface Character {
    //객체 생성시 고유 id구분은 필요 없을듯?
    
    /*무슨 장르 캐릭터인가? -> 이거에 따라 또 내부의 status 설정사항이 달라질 것 같으니
    스테이터스는 설정 X*/
    genre: string;

    //데이터 불러올 때 캐릭터 수치 변화 보여줄 로그
    logs: Log[];

}