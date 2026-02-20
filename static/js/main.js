document.addEventListener('DOMContentLoaded', () => {
    const formulaInput = document.getElementById('formula-input');
    const mathPreview = document.getElementById('math-preview');
    const calcBtn = document.getElementById('calc-btn');
    const levelChips = document.querySelectorAll('.level-chip');
    const loader = document.getElementById('loader');
    const resultArea = document.getElementById('result-area');

    let selectedLevel = '중등';

    // 1. 수준 선택 칩 인터랙션
    levelChips.forEach(chip => {
        chip.addEventListener('click', () => {
            levelChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            selectedLevel = chip.dataset.level;
            updatePreview(); // 수준 체인지 시 인사말 등 업데이트 가능
        });
    });

    // 2. 실시간 수식 미리보기 (KaTeX)
    function updatePreview() {
        const formula = formulaInput.value.trim();
        if (!formula) {
            mathPreview.textContent = '수식을 입력하면 여기에 표시됩니다.';
            return;
        }

        try {
            katex.render(formula, mathPreview, {
                throwOnError: false,
                displayMode: true
            });
        } catch (e) {
            mathPreview.textContent = formula; // 에러 시 쌩 텍스트 노출
        }
    }

    formulaInput.addEventListener('input', updatePreview);

    // 3. 계산 및 학습 API 호출
    calcBtn.addEventListener('click', async () => {
        const formula = formulaInput.value.trim();
        if (!formula) return alert('수식을 입력해 주세요!');

        // UI 상태 전환
        calcBtn.disabled = true;
        loader.style.display = 'block';
        resultArea.style.display = 'none';

        try {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formula: formula,
                    level: selectedLevel
                })
            });

            // 1. HTTP 오류 처리 (4xx, 5xx)
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: '알 수 없는 서버 오류' }));
                console.error('Server Error Response:', errorData);
                alert(`에러가 발생했습니다: ${errorData.error}`);
                return;
            }

            // 2. JSON 파싱 및 데이터 렌더링
            const textResponse = await response.text();
            try {
                const data = JSON.parse(textResponse);
                renderResult(data);
            } catch (jsonError) {
                console.error('JSON Parsing Error:', jsonError);
                console.group('Malformed Response Body:');
                console.log(textResponse);
                console.groupEnd();
                alert('서버 응답 데이터 형식이 올바르지 않습니다. 개발자 도구(F12) 콘솔을 확인해 주세요.');
            }

        } catch (error) {
            console.error('Network or Fetch Error:', error);
            alert('서버와 연결할 수 없습니다. 서버가 켜져 있는지 확인해 주세요.');
        } finally {
            calcBtn.disabled = false;
            loader.style.display = 'none';
        }
    });

    // 4. 결과 렌더링 함수
    function renderResult(data) {
        resultArea.style.display = 'block';

        // LaTeX 기호($) 제거 함수
        const cleanMath = (math) => {
            if (typeof math !== 'string') return '';
            return math.replace(/^\$+/, '').replace(/\$+$/, '').trim();
        };

        // 최종 결과 렌더링
        katex.render(cleanMath(data.result), document.getElementById('final-result'), {
            displayMode: true,
            throwOnError: false
        });

        // 설명 렌더링 (리스트 또는 문자열 대응)
        const explanationEl = document.getElementById('explanation-text');
        if (Array.isArray(data.explanation)) {
            explanationEl.innerHTML = data.explanation.map(item => `<p>${item}</p>`).join('');
        } else {
            explanationEl.textContent = data.explanation || '';
        }

        // 유사 문제 렌더링
        katex.render(cleanMath(data.similar_problem), document.getElementById('similar-problem'), {
            displayMode: true,
            throwOnError: false
        });

        // 유사 정답 렌더링 (객체 또는 문자열 대응)
        const similarAnswerEl = document.getElementById('similar-answer');
        if (typeof data.similar_answer === 'object' && data.similar_answer !== null) {
            similarAnswerEl.innerHTML = `
                <div style="margin-bottom: 0.5rem;"><strong>답:</strong> ${data.similar_answer.result || ''}</div>
                <div><strong>힌트:</strong> ${data.similar_answer.hint || ''}</div>
            `;
        } else {
            similarAnswerEl.textContent = data.similar_answer || '';
        }

        // 결과 영역으로 부드럽게 스크롤
        resultArea.scrollIntoView({ behavior: 'smooth' });

        // 텍스트 내 수식 추가 렌더링 (설명 부분 등)
        if (window.renderMathInElement) {
            renderMathInElement(resultArea, {
                delimiters: [
                    { left: "$$", right: "$$", display: true },
                    { left: "$", right: "$", display: false }
                ]
            });
        }
    }
});
