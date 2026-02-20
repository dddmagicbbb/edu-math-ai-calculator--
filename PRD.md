# PRD: 학습 밀착형 AI 공학계산기 (Edu-Math AI Calculator)

## 1. 제품 개요 (Product Overview)
'Edu-Math AI Calculator'는 단순한 수식 계산기 이상의 가치를 제공하는 교육용 도구입니다. 사용자가 입력한 수식을 해석하여 정확한 결과값을 도출함과 동시에, 사용자의 학습 수준(초등/중등/고등/대학생)에 최적화된 단계별 풀이와 핵심 원리 설명을 제공합니다. 또한 유사 문제 생성을 통해 학습자가 개념을 완벽히 이해할 수 있도록 돕는 '완전 학습 지원 시스템'을 지향합니다.

## 2. 목표 및 핵심 지표 (Goals & Key Metrics)
### 2.1 주요 목표
- 수식 입력부터 결과 도출까지 2초 이내의 빠른 응답 속도 확보 (Groq AI 활용).
- 사용자 수준별 맞춤형 콘텐츠 제공을 통한 학습 만족도 제고.
- LaTeX 기반의 미려한 수식 렌더링을 통한 가독성 최적화.

### 2.2 핵심 성공 지표 (KPIs)
- **Time to First Response**: 수식 입력 후 설명이 노출되기까지의 시간.
- **UI/UX Satisfaction**: 수식 가독성에 대한 사용자 피드백.

## 3. 사용자 및 사용자 시나리오 (User Personas & Scenarios)
### 3.1 사용자 페르소나
1. **김초등 (초등학생)**: 분수 계산이 어렵지만, 귀여운 비유와 쉬운 설명으로 원리를 이해하고 싶어 함.
2. **이대입 (고등학생)**: 미적분 문제의 풀이 과정이 이해되지 않아 단계별 가이드와 비슷한 유형의 연습 문제가 필요함.
3. **박공학 (공대생)**: 복소수나 행렬 계산의 전공 이론적 배경과 공학적 응용 사례를 알고 싶어 함.

### 3.2 핵심 시나리오
1. 사용자는 웹 인터페이스에 접속하여 자신의 학습 수준을 선택합니다.
2. 텍스트 박스에 수식을 입력하거나 미리 정의된 버튼을 통해 수식을 구성합니다.
3. '계산 및 학습' 버튼을 클릭하면 결과값, 맞춤형 풀이, 유도 공식, 유사 문제가 화면에 출력됩니다.

## 4. 상세 기능 요구사항 (Functional Requirements)
### 4.1 핵심 계산 엔진
- **[High] 수식 파싱**: 텍스트 형태의 수식을 AI 전용 프롬프트로 변환.
- **[High] Groq API 연동**: 실시간 수식 해석 및 텍스트 생성 전송/수신.
- **[Med] 수식 최적화**: 입력된 수식의 오류 검증 및 클리닝.

### 4.2 학습 콘텐츠 시스템
- **[High] 단계별 풀이**: 결과만 보여주는 것이 아닌 차례대로 풀이되는 과정 생성.
- **[High] 수준별 필터링**: 프롬프트 엔지니어링을 통해 초/중/고/대 맞춤형 톤앤매너 유지.
- **[Med] 유사 문제 생성**: 계산된 문제와 원리가 같은 새로운 수식 및 정답 제공.

### 4.3 프론트엔드 인터페이스
- **[High] LaTeX 렌더링**: KaTeX 라이브러리를 사용한 실시간 수식 시각화.
- **[Med] 반응형 레이아웃**: 데스크탑 및 모바일 브라우저 최적화.

## 5. 비기능 요구사항 (Non-Functional Requirements)
- **성능**: Groq API 추론 속도를 극대화하여 사용자 대기 시간 최소화.
- **배포**: Vercel의 Serverless Function 구조를 활용한 안정적인 호스팅.
- **코드 품질**: Vanilla JS와 Flask 환경에서 모듈화된 폴더 구조 유지.

## 6. 화면 디자인 및 스타일 (Design & UI/UX Style)
학습자가 수식과 풀이 과정에 집중할 수 있도록 'Clean & Academic' 테마를 지향합니다.

### 6.1 컬러 팔레트 (Color Palette)
- **Primary**: `#007AFF` (AI/기술 신뢰를 상징하는 선명한 블루)
- **Background**: `#F9FAFB` (눈의 피로를 줄여주는 미세한 회색빛 화이트)
- **Point Color**: `#FF9500` (정답이나 중요한 팁 강조용 오렌지)
- **Text**: `#1D1D1F` (가독성을 위한 짙은 차콜)

### 6.2 타이포그래피 (Typography)
- **본문**: 'Inter' 또는 'Pretendard' 활용 (가독성 중심의 산세리프)
- **수식**: LaTeX 전용 폰트 (KaTeX 기본 폰트)
- **계층**: 제목(H1~H3)을 명확히 구분하여 정보의 위계 정립

### 6.3 핵심 UI 컴포넌트
- **Glassmorphism Input**: 수식 입력창에 살짝 투명한 배경과 블러 효과를 주어 세련된 느낌 전달.
- **Card-based Layout**: 단계별 풀이와 유사 문제를 독립된 카드로 구성하여 정보 혼선을 방지.
- **Accordion Logic**: 복잡한 증명이나 부연 설명은 클릭 시 펼쳐지는 아코디언 형태로 구현하여 화면 공간 최적화.

### 6.4 사용자 경험 (UX) 제약 사항
- **Formula Live Preview**: 입력하는 도중 KaTeX가 실시간으로 수식을 보여주어 입력 오류 최소화.
- **Micro-interactions**: 버튼 클릭 시의 부드러운 스케일 변화와 로딩 중의 AI 펄스 애니메이션 적용.

## 7. 리스크 및 제약 사항 (Risks & Constraints)
- **AI 할루시네이션(Hallucination)**: 복잡한 수식에서 AI가 잘못된 중간 과정을 생성할 가능성 → 프롬프트 제약 조건 강화 및 검증 로직 필요.
- **API 사용량 제한**: Groq API의 Rate Limit 관리 필요.

## 9. 프로젝트 구조 (Project Structure)
Vercel 배포 및 Flask 백엔드 아키텍처를 고려한 표준 디렉토리 구조입니다.

```text
/Edu-Math-Calculator
├── api/                # Vercel Serverless Functions
│   └── index.py        # Flask App & API Endpoints
├── static/             # Static Assets (Frontend)
│   ├── css/
│   │   └── style.css   # Modern UI Styles
│   ├── js/
│   │   └── main.js    # Groq API Client & KaTeX Rendering
│   └── assets/         # UI Icons & Graphics
├── templates/          # HTML Templates
│   └── index.html      # Single Page Application
├── .gitignore          # Git Exclusion List
├── requirements.txt    # Python Dependencies
├── vercel.json         # Deployment Configuration
└── README.md           # Documentation
```

## 10. 릴리즈 계획 (Release Plan)
- **1단계: 환경 설정 및 API 연동** (완료 목표: Sprint 1)
- **2단계: 프론트엔드 UI 개발** (완료 목표: Sprint 2)
- **3단계: 백엔드 로직 구현** (완료 목표: Sprint 3)
- **4단계: 통합 및 배포** (완료 목표: Sprint 4)
