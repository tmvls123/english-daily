# 매일의 영어 문장 학습 앱 (Daily English Sentence Learning App)

매일 새로운 영어 문장을 학습할 수 있는 웹 애플리케이션입니다. OpenAI의 GPT API를 활용하여 매일 5개의 새로운 영어 문장을 생성하고, 중요 단어와 한국어 번역을 함께 제공합니다.

## 주요 기능

- 매일 5개의 새로운 영어 문장 제공
- 각 문장의 한국어 번역 제공
- 중요 단어 하이라이트 및 의미 설명
- 원어민 음성으로 문장 읽어주기 기능
- 오프라인 모드 지원 (기본 문장 제공)
- 반응형 디자인 (모바일 지원)

## 기술 스택

- React.js
- OpenAI GPT API
- Web Speech API
- Local Storage
- CSS3

## 설치 방법

1. 저장소 클론:
```bash
git clone https://github.com/tmvls123/english-daily.git
cd english-daily
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
- 프로젝트 루트 디렉토리에 `.env` 파일 생성
- OpenAI API 키 추가:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

4. 개발 서버 실행:
```bash
npm start
```

## 사용 방법

1. 웹 브라우저에서 `http://localhost:3000` 접속
2. 매일 자정에 새로운 문장이 자동으로 생성됨
3. 하이라이트된 단어 클릭 시 의미 확인 가능
4. 🔊 버튼 클릭 시 원어민 발음으로 문장 읽어주기

## 주의사항

- OpenAI API 키가 필요합니다 (https://platform.openai.com 에서 발급 가능)
- API 사용량에 따라 요금이 부과될 수 있습니다
- 무료 API 키의 경우 사용량 제한이 있을 수 있습니다

## 오프라인 모드

API 키가 없거나 API 호출이 실패한 경우, 기본으로 제공되는 문장들이 표시됩니다.

## 라이선스

MIT License

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
