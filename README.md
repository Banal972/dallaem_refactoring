<!-- prettier-ignore-start -->

# 같이 달램 리팩토링 프로젝트

## 개발 기간

2025.09.02 ~

## 배포 주소

> **개발 버전** : [https://dallaem-publish-2w1gkvjve-jeongheonks-projects.vercel.app/](https://dallaem-publish-2w1gkvjve-jeongheonks-projects.vercel.app/) <br />
> **배포 버전** : [https://dallaem-refactoring-z35o.vercel.app/](https://dallaem-refactoring-z35o.vercel.app/) <br />

## 프로젝트 소개

기존 [팀 프로젝트](https://github.com/sprint-team5/dallaem)에서 완성도를 높이고 다양한 디자인 패턴 및 리액트 커스텀 훅을 적용하기 위해 **리팩토링**을 진행하였습니다.


## 시작 가이드
### Requirements

- [Node.js 20.16.0](https://nodejs.org/en/blog/release/v20.16.0)
- [Npm 10.8.1](https://www.npmjs.com/package/npm/v/10.8.1)

### Installation
``` bash
$ git clone https://github.com/Banal972/dallaem_refactoring.git
$ cd DALLAEM_REFACTORING
$ nvm use v.20.16.0
$ npm install
$ npm run develop
```
---
## 리펙토링 중점 사항 ♻️

- Custom Hook 생성을 통한 관심사 분리
  - 공통 Custom Hook 외에는 같은 파일 내에서 분리
  - state가 어떤 목적으로 사용되는지 작명함으로서 가독성 증가
  - setter 함수 대신 handler 함수 return으로 jsx문 내의 가독성 향상
  - 관련 함수 및 변수도 hook안에서 처리함으로써 컴포넌트는 jsx 생성에 집중하도록 변경
- 함수형 프로그래밍 적용
  - 순수 함수 생성 지향
  - 명령형 코드 지양
  - 사이드 이펙트 최소화로 RCC의 의도치 않은 렌더링 방지를 위해 노력
- QA 진행
  - 발견된 버그 수정
  - Tanstack-query관련 훅 분리
  - 미분리된 컴포넌트 분리로 가독성 향상
  - 복잡한 로직 단순화
  - UI 개선작업 진행

---
## 아키택쳐

<div align="center">

<img width="500" style='border-radius: 12px' alt="아키텍쳐 이미지" src="https://github.com/user-attachments/assets/bd52859b-a471-4783-9c03-a2edf56227e5" />

</div>

---

### 소감

김정헌
<br />
 기존 과제는 Next.js v14의 신기능인 intercepting route 및 parallel route 사용에 집중하였습니다. 그리고 async component 사용으로 컴포넌트에서 바로 data를 fetching하는 경우도 잦아 상태관리 및 함수형 프로그래밍에서 완성도가 아쉬웠습니다.
<br />
 그러나 이번 프로젝트 덕분에 React에 더 집중해서 상태관리의 기본부터 찬찬히 다시 복습할 수 있어서 매우 만족스러웠습니다. 상태 생성 최소화 및 관련 상태 통합의 관점뿐만 아니라 관련 useHook을 분리함으로써 가독성 향상뿐만 아니라 중복되는 useHook들을 다른 컴포넌트에서 불러와 사용하면서 state의 지역성의 필요성을 이해할 수 있었고, 순수함수의 필요성과 함수형 프로그래밍의 중요성 역시 이해할 수 있었습니다.
 <br />
 그리고 타입 정리를 진행하며, interface와 extends를 사용하며 객체 지향에 대해 조금이나마 볼 수 있었습니다. 덕분에 super class의 추상화의 중요성에 대해서도 이해할 수 있었습니다. 다만 후반으로 진행하면서 함수형 프로그래밍에는 interface보다는 type을 지정하는 것이 좀 더 사용성이 좋아보여, 무조건 하나로 통일하기보다는 상황에 맞춰서 좀 더 세분화된 기준을 세웠다면 하는 아쉬움이 남았습니다.
  그러나 이 부분도 계속 리팩토링을 진행하며 고쳐나갈 예정입니다.

<!-- prettier-ignore-end -->
