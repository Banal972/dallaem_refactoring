<!-- prettier-ignore-start -->
# 같이 달램 리팩토링 프로젝트

## 프로젝트 소개

기존 [팀 프로젝트](https://github.com/sprint-team5/dallaem)에서 완성도를 높이고 다양한 디자인 패턴 및 리액트 커스텀 훅을 적용하기 위해 **리팩토링**을 진행하였습니다.

## 개발 기간

2024.09.02 ~

## 배포 주소

> **개발 버전** : [https://dallaem-publish-2w1gkvjve-jeongheonks-projects.vercel.app/](https://dallaem-publish-2w1gkvjve-jeongheonks-projects.vercel.app/) <br />
> **배포 버전** : [https://dallaem-refactoring-z35o.vercel.app/](https://dallaem-refactoring-z35o.vercel.app/) <br />

개발팀 소개 
--

|<center>김지유</center>|<center>김정헌</center>|
|:--------------------------------:|:--------------------------------:|
|<img src="https://github.com/user-attachments/assets/43cc11a4-b1a1-404c-b0ce-09ce96e666b0" width="160"/>|<img src="https://github.com/user-attachments/assets/2a3ee132-3404-4c9e-a1e0-ef03b2f1eff8" width="160"/>|
|[@Banal972](https://github.com/Banal972)|[@JeongHeonK](https://github.com/JeongHeonK)|


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
$ npm run dev
```

기술 스택 ⚙️
--

### Development
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

### Environment
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### CI
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)


### Communication
![Zoom](https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)


화면 구성
--

|<center>메인 페이지</center>|<center>로그인 페이지</center>|
|:----:|:----:|
|![image](https://github.com/user-attachments/assets/d03c549a-8f92-41ce-813c-4fafd510de22)|![image](https://github.com/user-attachments/assets/26844aaa-bc78-4313-add9-901ad464b707)
|모임 찾기 페이지|모임 만들기 페이지|
|![image](https://github.com/user-attachments/assets/4209c43a-a9af-4d3e-8cc9-28c3abf307db)|![image](https://github.com/user-attachments/assets/d6bfe28f-8716-4ce8-b4fa-662cb543e54e)|
|모임 상세 페이지|찜 목록 페이지|
|![image](https://github.com/user-attachments/assets/b317f37f-9201-4b6a-8ac8-cea303a1d16d)|![image](https://github.com/user-attachments/assets/d0bd4da4-fb5e-4d92-a2e0-ab0a8368549c)
|모든 리뷰 페이지|마이 페이지|
|![image](https://github.com/user-attachments/assets/2b0ce170-af19-46e4-b038-a569483760ae)|![image](https://github.com/user-attachments/assets/dac69cd2-0e44-4cd5-bfa5-a2dddb2de415)




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
>기존 과제는 Next.js v14의 신기능인 intercepting route 및 parallel route 사용에 집중하였습니다. 그리고 async component 사용으로 컴포넌트에서 바로 data를 fetching하는 경우도 잦아 상태관리 및 함수형 프로그래밍에서 완성도가 아쉬웠습니다.
>
>그러나 이번 프로젝트 덕분에 React에 더 집중해서 상태관리의 기본부터 찬찬히 다시 복습할 수 있어서 매우 만족스러웠습니다. 상태 생성 최소화 및 관련 상태 통합의 관점뿐만 아니라 관련 useHook을 분리함으로써 가독성 향상뿐만 아니라 중복되는 useHook들을 다른 컴포넌트에서 불러와 사용하면서 state의 지역성의 필요성을 이해할 수 있었고, 순수함수의 필요성과 함수형 프로그래밍의 중요성 역시 이해할 수 있었습니다.
>
>그리고 타입 정리를 진행하며, interface와 extends를 사용하며 객체 지향에 대해 조금이나마 볼 수 있었습니다. 덕분에 super class의 추상화의 중요성에 대해서도 이해할 수 있었습니다. 다만 후반으로 진행하면서 함수형 프로그래밍에는 interface보다는 type을 지정하는 것이 좀 더 사용성이 좋아보여, 무조건 하나로 통일하기보다는 상황에 맞춰서 좀 더 세분화된 기준을 세웠다면 하는 아쉬움이 남았습니다.
>
>그러나 이 부분도 계속 리팩토링을 진행하며 고쳐나갈 예정입니다.

**김지유**
> 이전 프로젝트 에서는 Next.js를 활용 과 유닛 테스트 와 E2E 테스트에 중점을 두어 안정성을 위주로 작성했고 또한 함수형 프로그래밍 도입해 보았지만 이 접근법에 있어 완성도가 있는 프로젝트는 아니였습니다.
>
> 이번 프로젝트에서는 상태 관리에 대한 심층적인 이해를 위해서 "마이크로 상태 관리"를 책을 학습하고 학습한 것을 토대로 useHook들을 효과적으로 분리하여 가독성 향상을 할 수 있었습니다.
>
> 타입들을 정리하면서 유틸리티를 활용해 단순한 타입 지정이 아닌 타입을 체계적으로 분하고 이를 통해서 코드의 안정성을 높였지만 아직 세분화에 대한 이해도가 부족한것이 보여 아쉬움이 남습니다.
>
> 함수형 프로그래밍을 더욱 깊이 있게 적용하고자 노력 했지만 함수형 프로그래밍 구현에 대한 부족함은 남아있고 향후 더욱 학습할 수 있는 기반이 되었던것 같습니다.


<!-- prettier-ignore-end -->
