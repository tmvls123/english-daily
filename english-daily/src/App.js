import React, { useState } from 'react';
import './App.css';

// 샘플 영어 문장 데이터
const sentences = [
    {
        english: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        korean: "성공은 끝이 아니며, 실패는 치명적이지 않습니다: 중요한 것은 계속할 용기입니다.",
        keywords: [
            { word: "Success", meaning: "성공, 성취", explanation: "목표나 목적을 달성하는 것" },
            { word: "failure", meaning: "실패", explanation: "목표 달성에 실패하거나 기대에 미치지 못하는 것" },
            { word: "fatal", meaning: "치명적인", explanation: "매우 심각하거나 죽음에 이르게 할 수 있는" },
            { word: "courage", meaning: "용기", explanation: "두려움이나 어려움에 맞서는 정신적 힘" }
        ]
    },
    {
        english: "The only way to do great work is to love what you do.",
        korean: "훌륭한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
        keywords: [
            { word: "great", meaning: "훌륭한, 위대한", explanation: "매우 좋거나 뛰어난 상태" },
            { word: "love", meaning: "사랑하다", explanation: "매우 좋아하거나 열정을 가지고 있는 것" }
        ]
    },
    {
        english: "Life is what happens when you're busy making other plans.",
        korean: "인생은 당신이 다른 계획을 세우느라 바쁠 때 일어나는 것입니다.",
        keywords: [
            { word: "busy", meaning: "바쁜", explanation: "할 일이 많아 시간적 여유가 없는 상태" },
            { word: "plans", meaning: "계획들", explanation: "미래에 하고자 하는 일들에 대한 구상" }
        ]
    },
    {
        english: "In the middle of difficulty lies opportunity.",
        korean: "어려움의 한가운데에 기회가 있습니다.",
        keywords: [
            { word: "difficulty", meaning: "어려움", explanation: "해결하기 어렵거나 힘든 상황" },
            { word: "opportunity", meaning: "기회", explanation: "좋은 결과를 얻을 수 있는 가능성이나 상황" }
        ]
    },
    {
        english: "The future belongs to those who believe in the beauty of their dreams.",
        korean: "미래는 자신의 꿈의 아름다움을 믿는 사람들의 것입니다.",
        keywords: [
            { word: "future", meaning: "미래", explanation: "앞으로 다가올 시간" },
            { word: "believe", meaning: "믿다", explanation: "확신을 가지고 신뢰하는 것" },
            { word: "beauty", meaning: "아름다움", explanation: "보기 좋거나 듣기 좋은 성질" },
            { word: "dreams", meaning: "꿈들", explanation: "이루고 싶은 희망이나 목표" }
        ]
    }
];

function App() {
    const [currentDate] = useState(new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));

    const [selectedKeyword, setSelectedKeyword] = useState(null);

    const highlightKeywords = (text, keywords) => {
        let result = text;
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword.word}\\b`, 'gi');
            result = result.replace(regex, `<span class="highlight" data-word="${keyword.word}">${keyword.word}</span>`);
        });
        return result;
    };

    const handleWordClick = (keyword) => {
        setSelectedKeyword(keyword);
    };

    return (
        <div className="container">
            <header className="header">
                <h1>오늘의 영어 문장</h1>
                <p className="date">{currentDate}</p>
            </header>
            
            <div className="main-content">
                <div className="sentences-container">
                    {sentences.map((sentence, index) => (
                        <div key={index} className="sentence-card">
                            <p className="english-text"
                               dangerouslySetInnerHTML={{
                                   __html: highlightKeywords(sentence.english, sentence.keywords)
                               }}
                               onClick={(e) => {
                                   if (e.target.classList.contains('highlight')) {
                                       const word = e.target.dataset.word;
                                       const keyword = sentence.keywords.find(k => k.word === word);
                                       handleWordClick(keyword);
                                   }
                               }}
                            />
                            <p className="korean-text">{sentence.korean}</p>
                        </div>
                    ))}
                </div>
                
                {selectedKeyword && (
                    <div className="keyword-explanation">
                        <h3>{selectedKeyword.word}</h3>
                        <p className="meaning">{selectedKeyword.meaning}</p>
                        <p className="explanation">{selectedKeyword.explanation}</p>
                        <button className="close-btn" onClick={() => setSelectedKeyword(null)}>닫기</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
