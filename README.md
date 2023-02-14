# 패키지 라이브러리 구성

## Vite
`ES Module` 들과 네이티브 언어로 작성된 `javascript` 도구를 이용하여 빠른 개발환경 실행 및 HMR 등 기존 번들러 대비 개선된 개발자 경험을 제공합니다.

## SWC
`vitejs/plugin-react-swc` 플러그인으로 개발환경에서 Babel 을 `SWC` 로 대체하여 개발환경 실행 및 HMR 속도를 개선합니다.

## Eslint, Prettier
`airbnb eslint` 설정과 `prettier` 을 사용하여 일관된 코드 컨벤션을 제공합니다.

## Typescript
정적 타입 지원으로 컴파일 타임에서 오류를 발견하고 타입을 명시적으로 지정하여 코드의 가독성과 품질을 높은 수준으로 유지 할 수 있게 도와줍니다.

## Vitest, React-testing-library
`unit test` 및 `react component 의 통합 테스트`를 위해 화면과 사용자 인터랙션 중심으로 테스트를 작성 할 수 있도록 해주는 도구입니다.

## React-router
`Single-page application` 을 구현하기 위해 사용합니다.

# Scripts
개발환경 실행
```bash
    $ yarn dev
```

테스트 러너 실행
```bash
    $ yarn test
```

빌드
```bash
    $ yarn build
```

# 프로젝트 구성
## Router
 브라우저 history api 를 별도로 관리하지 않아도 되는 `HashRouter` 를 사용합니다.

### Url query paramerters
페이지 이동시 열, 행, 두더시 수를 url query parameter 를 가져 이동 시 입력된 값을 유지할 수 있고, url 로 사용자 입력 상태를 관리하여 url 공유 및 재사용시 장점이 있습니다.

## 두더지 게임
게임 플레이에 필요한 상태는 global state 대신 코드의 간결함과 다른 페이지와 의존성을 분리하기 위해 페이지 내 context api 및 useReducer 훅으로 구현하였습니다.
### Core logic
useEffect 훅 안에서 setTimeout 을 재귀적으로 호출하여 interval 을 구현 하였습니다. 그 이유는 게임 진행에 따라 증가하는 난이도를 구현을 간단하게 처리하기 위해서 입니다.

```Typescript
  const timeoutRef = useRef<number>();
  const difficultyRef = useRef<number>(INITIAL_DIFFICULY);

  useEffect(() => {
    const shuffle = async () => {
      await activateRandomMolesWithDuration();
      timeoutRef.current = window.setTimeout(async () => {
        difficultyRef.current -= 100;
        shuffle();
      }, Math.max(500, difficultyRef.current));
    };

    if (state.status === 'running') {
      shuffle();
    }

    return () => window.clearInterval(timeoutRef.current);
  }, [dispatch, state.status]);
```

## 순위 레코드 영속성
게임 순위 레코드의 영속성을 구현하기 위해 localStorage 와 관련한 로직을 react component 에서 재사용 가능하도록 `useLocalStoreage` hook 을 구현하였습니다.

## Grid and Responsive UI
반응형 두더지 화면 구현을 위해 행과 열을 동적으로 설정하기 쉬운 Grid 를 사용하고 `aspect-ratio` 속성과 `%` 단위를 이용하여 반응형 UI 를 구현하였습니다.

## Tests
`React-testing-library` 를 사용하여 react component 의 렌더링 되는 요소와 사용자 인터랙션을 검증합니다.

```bash
 ✓ src/components/ResultSection.test.tsx (1)
 ✓ src/components/RankingSection.test.tsx (4)
 ✓ src/components/game/GameController.test.tsx (3)
 ✓ src/components/form/GameStartForm.test.tsx (1)
 ✓ src/App.test.tsx (4)
 ✓ src/utils/GameStartUtils.test.ts (4)
 ✓ src/components/game/GamePanel.test.tsx (1)
 ✓ src/components/game/Mole.test.tsx (2)

 Test Files  8 passed (8)
      Tests  20 passed (20)
   Start at  20:35:18
   Duration  1.38s (transform 90ms, setup 673ms, collect 1.21s, tests 515ms)
```
