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
