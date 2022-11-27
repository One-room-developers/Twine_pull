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
