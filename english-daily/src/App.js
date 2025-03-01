import React, { useState, useEffect } from 'react';
import './App.css';

// 영어 문장 데이터베이스
const sentences = [
  {
    english: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    korean: "성공이 끝이 아니며 실패가 치명적이지 않습니다: 중요한 것은 계속할 용기입니다.",
    important: ["success", "failure", "courage", "continue"],
    words: {
      "success": "성공, 성취",
      "failure": "실패",
      "courage": "용기",
      "continue": "계속하다, 지속하다"
    }
  },
  {
    english: "The only way to do great work is to love what you do.",
    korean: "훌륭한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다.",
    important: ["great", "work", "love"],
    words: {
      "great": "훌륭한, 위대한",
      "work": "일, 작업",
      "love": "사랑하다"
    }
  },
  {
    english: "Life is what happens when you're busy making other plans.",
    korean: "인생은 당신이 다른 계획을 세우느라 바쁠 때 일어나는 것입니다.",
    important: ["life", "happens", "busy", "plans"],
    words: {
      "life": "인생, 삶",
      "happens": "일어나다, 발생하다",
      "busy": "바쁜",
      "plans": "계획"
    }
  },
  {
    english: "The future belongs to those who believe in the beauty of their dreams.",
    korean: "미래는 자신의 꿈의 아름다움을 믿는 사람들의 것입니다.",
    important: ["future", "belongs", "believe", "beauty", "dreams"],
    words: {
      "future": "미래",
      "belongs": "속하다",
      "believe": "믿다",
      "beauty": "아름다움",
      "dreams": "꿈"
    }
  },
  {
    english: "Education is not preparation for life; education is life itself.",
    korean: "교육은 삶을 위한 준비가 아닙니다; 교육이 삶 그 자체입니다.",
    important: ["education", "preparation", "life", "itself"],
    words: {
      "education": "교육",
      "preparation": "준비",
      "life": "삶, 인생",
      "itself": "그 자체"
    }
  }
];

function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  
  // 오늘의 문장 인덱스 계산 (날짜에 따라 변경)
  const getTodaySentenceIndex = () => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return dayOfYear % sentences.length;
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));
  }, []);

  const todaySentence = sentences[getTodaySentenceIndex()];

  const handleWordClick = (word) => {
    setSelectedWord(todaySentence.words[word]);
  };

  return (
    <div className="container">
      <h1>오늘의 영어 문장</h1>
      <p className="date">{currentDate}</p>
      
      <div className="sentence-card">
        <p className="english">
          {todaySentence.english.split(' ').map((word, index) => {
            const lowerWord = word.replace(/[.,!?:;]/g, '').toLowerCase();
            const isImportant = todaySentence.important.includes(lowerWord);
            return (
              <span key={index}>
                {isImportant ? (
                  <span 
                    className="highlight"
                    onClick={() => handleWordClick(lowerWord)}
                  >
                    {word}
                  </span>
                ) : word}
                {' '}
              </span>
            );
          })}
        </p>
        <p className="korean">{todaySentence.korean}</p>
      </div>

      {selectedWord && (
        <div className="word-explanation">
          <h3>단어 설명</h3>
          <p>{selectedWord}</p>
          <button onClick={() => setSelectedWord(null)}>닫기</button>
        </div>
      )}
    </div>
  );
}

export default App;
