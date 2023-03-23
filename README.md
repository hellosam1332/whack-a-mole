# Whack-a-Teemo
## 플레이 방법

1. 티모를 잡기위해 유효한 굴의 갯수의 행과 열을 입력한다.
2. 시작 버튼을 누른다!

[Play!](https://whack-a-mole-pink.vercel.app/)

## 패키지 라이브러리 구성

`Vite`, `SWC`, `Eslint`, `Prettier`, `Typescript`, `Vitest`, `React-testing-library`, `React-router`
## Scripts
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
## Core
useEffect 훅 안에서 setTimeout 을 재귀적으로 호출하여 interval 두더지 노출과 난이도를 구현

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
## Tests
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
