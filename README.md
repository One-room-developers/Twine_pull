# Twine의 소스코드를 분석하여 주석으로 달아놓읍시다.

# 분석 끝난 기능

- 스토리 입력(dialogue card, passage card)
- passage card 드래그

# 분석해야하는 기능

- 선택지 입력
- passage card 연결
- Story HTML 형태로 뽑아내기
- HTML Story로 import

# 스토리 HTML 변환과 관련된 소스코드

- src/store/undoable-stories/use-story-launch.ts
- src/store/undoable-stories/use-publishing.ts
- src/util/story-format/publish.ts
- src/util/story-format/import.ts
- src/store/story-formats/action-creators.ts
- src/store/story-formats/story-formats.types.ts
- src/store/stories/reducer/storeis-context.tsx

# useState

- ex) const [number, setNumber] = useState(초기값);
- number : 현재 상태
- setNumber : number값 변환 함수 ex)setNumber(number+1);

# useEffect

- ex) useEffect(() => {
  console.log('Hello World!');
  }, []);

- []의 값이 변할 때마다 함수 안의 내용이 실행.
- []가 비어있으면 컴포넌트가 처음 한 번만 실행.
- []를 생략하면 컴포넌트가 리렌더링 될 때마다 호출됨.
- useEffect 내에서 함수 반환 가능. => cleanup함수. 컴포넌트가 사라질 때 cleanup함수 호출.

# useMemo

- ex) useMemo(() => count(number), [number]);
- []안의 값이 바뀌면 함수를 호출.
- []값이 바뀌지 않았다면 이전에 연산한 값을 재사용.

# useCallback

- useMemo와 비슷함.
- useMemo는 특정 결과값을 재사용.
- useCallback은 특정 함수를 재사용

# reducer

- ex) function reducer(state=초기값, 액션)
- state 데이터의 수정방법을 미리 정의하는 함수.
- state 초기값과 데이터 수정방법을 넣는다.

# dispatch

- ex) dispatch({type:데이터 수정방법})
- HTML 안에서 reducer 함수를 동작시키는 함수.

---

## twinejs

by Chris Klimas, Leon Arnott, Daithi O Crualaoich, Ingrid Cheung, Thomas Michael
Edwards, Micah Fitch, Juhana Leinonen, Michael Savich, and Ross Smith

### SYNOPSIS

This is a port of Twine to a browser and Electron app. See
[twinery.org](https://twinery.org) for more info.

The story formats in minified format under `story-formats/` exist in separate
repositories:

- [Harlowe](https://foss.heptapod.net/games/harlowe/)
- [Paperthin](https://github.com/klembot/paperthin)
- [Snowman](https://github.com/klembot/snowman)
- [SugarCube](https://github.com/tmedwards/sugarcube-2)

### INSTALL

Run `npm install` at the top level of the directory to install all goodies.

Working with the documentation requires installing
[mdbook](https://rust-lang.github.io/mdBook/), which is not a Node-based
project. You can either install it directly from the project web site or use
your operating system's package manager.

### BUILDING

Run `npm start` to begin serving a development version of Twine locally. This
server will automatically update with changes you make.

Run `npm run start:electron` to run a development version of the Electron app.
**Running this can damage files in your Twine storied folder. Take a backup copy
of this folder before proceeding.** Most of the app will automatically update as
you work, but if you want the app to read story files initially again, you will
need to restart the process.

To create a release, run `npm run build`. Finished files will be found under
`dist/`. In order to build Windows apps on OS X or Linux, you will need to have
[Wine](https://www.winehq.org/) and [makensis](http://nsis.sourceforge.net/)
installed. A file named `2.json` is created under `dist/` which contains
information relevant to the autoupdater process, and is currently posted to
https://twinery.org/latestversion/2.json.

`npm test` will test the source code respectively.

`npm run clean` will delete existing files in `electron-build/` and `dist/`.

## Route의 폴더 입력 양식

1. route하나 당 폴더 하나 생성

2. index.ts 파일로 tsx파일 export해줌

3. ~-route.tsx파일 생성

4. 


## 폴더 역할들

1. src/routes/stories/defaults.ts 에 passage 크기 default가 있음

2. src/route-actions/build-actions.tsx 는 story편집의 사이드 바 버튼들이 있음.
build관련 버튼임.

3. import 코드 분석하기
src/dialogs/story-import/story-import.tsx 에 파일 첨부하는 코드


## 알아야 되는 거
story가 어디로 저장되는 가

1. 브라우저 캐시에 자동 저장되는 방식 알아올것
2. publish to File을 눌렀을 때 어떻게 해서 download에 저장되는가


## 바꾼 기능들
1. move-passage.ts에서
```
if (story.snapToGrid) {
			left = Math.round(left / 100) * 100;
			top = Math.round(top / 100) * 100;
		}
```
이걸 바꿔서 한번에 큰 눈금 한칸씩 이동하도록 바꿈


2. zoom button 삭제
src/route/story-edit/zoom-buttons.css 삭제
src/route/story-edit/zoom-buttons.tsx 삭제

3. component/route-toolbar/route-toolbar.css 변환


## 이지원
# 스토리 import와 관련된 파일
1. file-input
file = 파일 이름, 마지막 수정날짜 사이즈가 저장되어 있는 변수
reader = 파일 읽는 변수 fileReader
onChange() -> file-input의 onChange()로 넘어감 -> 여기 html text를 넣어주면 됨
2. file-chooser
file-input을 호출하는 컴포넌트
3. story-import 
file-chooser을 호출하는 컴포넌트, file-input에서 사용하는 onChange함수의 원형
4. import-story-button
story-import를 호출하는 컴포넌트, onclose를 props로 전달

# 다이아로그 수정 페이지와 관련된 기능
1. dialogs.tsx
TransitionGroup을 사용하는 파일
*dialog dispatch를 통해 값이 달라지면 재실행 되는 것으로 보임* => dispatch, 그리고 usecontex란? https://www.zerocho.com/category/React/post/5fa63fc6301d080004c4e32b

2. react-transition-group
transition 파일이 시작되는 장소

3. dialog-card 
텍스트 변경 카드
안에 있는 IconButton이 개발자 도구에서 Anonymous로 표기되는 컴포넌트임

4. passage-edit
dialog-card를 호출하는 컴포넌트
dialogs에서 호출됨

5. Transition 
**핵심 기능이 담겨 있는 것 같음. 찾아보기.**

6. dialogs-context.tsx
dialogs.tsx에서 사용하는 dialogs-contex를 만드는 파일
reducer에 dispatch 함수가 정의되어 있음

thunk에 대한 참고 : https://velog.io/@mokyoungg/Redux-Redux-thunk

7. selectable-card
double click 리스너가 있는 파일
onDoubleClick이 리스너이다

double click 함수는 상위 부모에게 props를 통해 전달받는다
'Passage Card -> PassageCardGroup -> PassageMap -> MarqueeablePassageMap -> 
InnerStoryEditRoute -> StoryEditRoute'를 이동해 마지막 StoryEditRoute에 double click 함수가 있다

8. story-edit-route
double click 함수의 코드가 있는 파일

handleEditPassage()함수에서 dialogsDispatch를 하여 dialog 창을 여는 것으로 추정
dialogDispatch는 dialog-context에 정의됨

9. react-codemirror2 / code-area
value에 dialog 창의 텍스트가 담겨있음
passage-text에서 value가 내려옴

10. passage-text.tsx

11. prompt-button.tsx
제목을 변경하는 파일이 담겨있는 파일
onSubmit 함수를 통해 제목을 변경한다
passage-toolbar에 onSumit 함수의 원형이 적혀있다

12. passage-toolbar.tsx
제목을 변경하는 함수의 원형
handleRename()함수로 제목을 변경한다

# 변경해야되는 파일
1. StoryListLoute
에피소드 제작 페이지의 시작, 스토리를 만드는 부분
<<<<<<< HEAD

2. stories.types.ts


# 임종훈- 찾은 기능
1. CodeArea 컴포넌트에 props를 보면 prefixTrigger 함수가 있음.
또 prefix 배열도 있는데 여기서 트래킹하는 듯 함.
=======
>>>>>>> da334d3ac9e10fb8dde60cc9414a594aa2a2128e
