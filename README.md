# 🎓 Edu-Math AI Calculator

> **수학 개념을 수준별로 깊이 있게, AI가 풀고 설명하는 맞춤형 계산기**  
> **[LIVE 서비스 바로가기](https://edu-math-ai-calculator-시작.vercel.app)** (Vercel 배포 완료)

> **계산을 넘어 원리까지, 당신을 위한 AI 수학 선생님**

'Edu-Math AI Calculator'는 단순한 수식 계산기 이상의 가치를 제공하는 교육용 웹 어플리케이션입니다. 사용자의 학습 수준(초등/중등/고등/대학생)에 맞춰 수식을 해석하고, 단계별 풀이 과정과 유사 문제를 제공하여 완전 학습을 지원합니다.

## ✨ 주요 기능
- **지능형 수식 계산**: 복잡한 공학 수식 및 기호 해석 (Groq AI API 활용).
- **수준별 맞춤 설명**: 학습자의 난이도(초/중/고/대)에 최적화된 설명 톤앤매너 제공.
- **실시간 수식 미리보기**: KaTeX를 활용한 미려한 LaTeX 수식 렌더링.
- **유사 문제 생성**: 배운 원리를 바로 복습할 수 있는 맞춤형 연습 문제 제공.
- **현대적 UI/UX**: 글래스모피즘 스타일의 깨끗하고 세련된 사용자 인터페이스.

## 🛠 기술 스택
- **Frontend**: HTML5, CSS3, Vanilla JavaScript, KaTeX
- **Backend**: Python, Flask, Flask-CORS
- **AI Engine**: Groq API (llama-3.3-70b-versatile)
- **Deployment**: Vercel (Serverless Functions)

## 🚀 시작하기

### 1. 환경 설정
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 Groq API Key를 설정합니다.
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 2. 의존성 설치
```bash
pip install -r requirements.txt
```

### 3. 로컬 실행
```bash
python api/index.py
```
브라우저에서 `http://localhost:5000`에 접속합니다.

## 📁 프로젝트 구조
- `api/`: Flask 서버 및 AI 연동 로직
- `static/`: CSS 스타일 및 클라이언트 사이드 JS
- `templates/`: HTML 템플릿
- `vercel.json`: Vercel 배포 설정

## 릴리즈 계획 (Release Plan)
- **1단계**: 환경 설정 및 API 연동 (Sprint 1) - **Done**
- **2단계**: 프론트엔드 UI 개발 (Sprint 2) - **Done**
- **3단계**: 백엔드 로직 구현 (Sprint 3) - **Done**
- **4단계**: 통합 및 배포 (Sprint 4) - **In Progress**
