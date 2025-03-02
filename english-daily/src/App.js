import React, { useState, useEffect } from 'react';
import './App.css';

// 전체 영어 문장 데이터베이스
const allSentences = [
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
  },
  // 추가 문장들...
  {
    english: "The best way to predict the future is to create it.",
    korean: "미래를 예측하는 가장 좋은 방법은 그것을 만드는 것입니다.",
    important: ["predict", "future", "create"],
    words: {
      "predict": "예측하다",
      "future": "미래",
      "create": "만들다, 창조하다"
    }
  },
  {
    english: "Every moment is a fresh beginning.",
    korean: "모든 순간은 새로운 시작입니다.",
    important: ["moment", "fresh", "beginning"],
    words: {
      "moment": "순간",
      "fresh": "새로운",
      "beginning": "시작"
    }
  },
  {
    english: "Change your thoughts and you change your world.",
    korean: "생각을 바꾸면 당신의 세상이 바뀝니다.",
    important: ["change", "thoughts", "world"],
    words: {
      "change": "바꾸다, 변화시키다",
      "thoughts": "생각들",
      "world": "세상"
    }
  }
];

function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [dailySentences, setDailySentences] = useState([]);

  useEffect(() => {
    const loadTodaysSentences = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));

      // 날짜 기반 시드 생성
      const seed = now.getFullYear() * 10000 + 
                  (now.getMonth() + 1) * 100 + 
                  now.getDate();
      
      // Fisher-Yates 셔플
      const shuffled = [...allSentences];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(((Math.sin(seed + i) * 10000) % 1) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      setDailySentences(shuffled.slice(0, 5));
    };

    loadTodaysSentences();

    // 자정에 업데이트
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;

    const timerId = setTimeout(loadTodaysSentences, timeUntilMidnight);
    return () => clearTimeout(timerId);
  }, []);

  const handleWordClick = (word, sentenceWords) => {
    setSelectedWord(sentenceWords[word]);
  };

  return (
    <div className="container">
      <h1>오늘의 영어 문장 5개</h1>
      <p className="date">{currentDate}</p>
      
      <div className="sentences-container">
        {dailySentences.map((sentence, idx) => (
          <div key={idx} className="sentence-card">
            <div className="sentence-number">#{idx + 1}</div>
            <div className="sentence-content">
              <p className="english">
                {sentence.english.split(' ').map((word, index) => {
                  const lowerWord = word.replace(/[.,!?:;]/g, '').toLowerCase();
                  const isImportant = sentence.important.includes(lowerWord);
                  return (
                    <span key={index}>
                      {isImportant ? (
                        <span 
                          className="highlight"
                          onClick={() => handleWordClick(lowerWord, sentence.words)}
                        >
                          {word}
                        </span>
                      ) : word}
                      {' '}
                    </span>
                  );
                })}
              </p>
              <p className="korean">{sentence.korean}</p>
            </div>
          </div>
        ))}
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
