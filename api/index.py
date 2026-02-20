import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv

# 환경 변수 로드
load_dotenv()

app = Flask(__name__, static_folder='../static', template_folder='../templates')
CORS(app)

# Groq 클라이언트 초기화 (API 키가 있을 경우에만)
api_key = os.environ.get("GROQ_API_KEY")
client = Groq(api_key=api_key) if api_key else None

@app.route('/')
def index():
    return send_from_directory(app.template_folder, 'index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate():
    if not client:
        return jsonify({"error": "GROQ_API_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요."}), 500
        
    data = request.json
    formula = data.get('formula')
    level = data.get('level', '중등') # 기본값 중등

    if not formula:
        return jsonify({"error": "수식을 입력해주세요."}), 400

    # 수준별 맞춤 가이드라인 정의
    level_guidelines = {
        "초등": "매우 쉬운 단어를 사용하고 사과나 피자 같은 실생활 비유를 들어 설명하세요. 복잡한 공식보다는 원리 위주로 설명하세요.",
        "중등": "교과 과정의 핵심 용어를 사용하고 기본 공식의 활용법을 중점적으로 설명하세요.",
        "고등": "수능 및 내신에 자주 나오는 문제 풀이 전략을 담고, 공식의 유도 과정을 포함하여 논리적으로 설명하세요.",
        "대학생": "공학적 응용 사례나 심화 이론 배경을 언급하세요. 증명 과정을 엄밀하게 다루되 전공자 수준의 용어를 사용하세요."
    }
    
    selected_guideline = level_guidelines.get(level, level_guidelines["중등"])

    prompt = f"""
    당신은 교육 공학 전문가이자 다정하고 실력 있는 수학 선생님입니다. 
    다음 수식 [{formula}]을 학습자의 수준 [{level}]에 맞춰 다음 가이드라인에 따라 설명해주세요.

    [학습 수준별 가이드라인]:
    {selected_guideline}

    [응답 지침]:
    1. 'result': 수식의 최종 계산 결과만 LaTeX 형식으로 작성하세요. (앞뒤에 $ 또는 $$를 붙이지 마세요.)
    2. 'explanation': 단계별 풀이 과정을 3~4단계의 '문자열'로 작성하세요. 줄바꿈을 포함하거나 하나의 긴 문자열로 작성하세요.
    3. 'similar_problem': 학습자가 배운 원리를 확인할 수 있는 유사한 난이도의 문제를 하나 더 만들어 LaTeX로 제시하세요. (앞뒤에 $ 또는 $$를 붙이지 마세요.)
    4. 'similar_answer': 유사 문제의 답과 핵심 힌트를 '문자열' 하나로 합쳐서 친절하게 제공하세요.

    [주의 사항]:
    - 반드시 JSON 형식으로만 응답하세요.
    - 한국어로 답변하세요.
    - 모든 수학 기호와 식은 LaTeX 문법을 준수하되, 객체의 값(result, similar_problem)으로 들어갈 때는 감싸는 '$' 기호를 제외하고 내용만 입력하세요.
    - 설명(explanation) 부분에 수식이 포함될 경우에만 '$...$'를 사용하여 텍스트와 구분하세요.
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "당신은 세계 최고의 수학 교육 AI 플랫폼의 교사입니다. 정확성과 친절함이 생명입니다."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )
        
        raw_content = completion.choices[0].message.content
        print(f"AI Raw Response: {raw_content}") # 디버깅용 로그
        
        # 마크다운 코드 블록 제거 전처리
        cleaned_content = raw_content.strip()
        if cleaned_content.startswith("```json"):
            cleaned_content = cleaned_content[7:]
        if cleaned_content.endswith("```"):
            cleaned_content = cleaned_content[:-3]
        cleaned_content = cleaned_content.strip()

        import json
        try:
            response_data = json.loads(cleaned_content)
            return app.response_class(
                response=json.dumps(response_data, ensure_ascii=False),
                status=200,
                mimetype='application/json'
            )
        except json.JSONDecodeError as je:
            print(f"JSON 파싱 실패 ({je}). Raw Content: {raw_content}")
            return jsonify({"error": "AI가 올바른 형식의 데이터를 생성하지 못했습니다."}), 500

    except Exception as e:
        print(f"Error during calculation: {str(e)}") # 디버깅용 로그
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
