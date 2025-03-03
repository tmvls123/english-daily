import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { generateDailySentences } from './services/openaiService';

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

// 기존 문장들은 폴백(fallback)으로 사용
const fallbackSentences = allSentences;

// 문장 카드 컴포넌트
function SentenceCard({ sentence, index, onWordClick }) {
  // sentence가 없으면 null 반환
  if (!sentence || !sentence.english) {
    return null;
  }

  const speakSentence = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.english);
    utterance.lang = 'en-US';
    utterance.rate = 0.9; // 약간 천천히 읽기
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="sentence-card">
      <div className="sentence-number">#{index + 1}</div>
      <div className="sentence-content">
        <div className="english-container">
          <p className="english">
            {sentence.english.split(' ').map((word, idx) => {
              const lowerWord = word.replace(/[.,!?:;]/g, '').toLowerCase();
              const isImportant = sentence.important.includes(lowerWord);
              return (
                <span key={idx}>
                  {isImportant ? (
                    <span 
                      className="highlight"
                      onClick={() => onWordClick(lowerWord, sentence.words)}
                    >
                      {word}
                    </span>
                  ) : word}
                  {' '}
                </span>
              );
            })}
          </p>
          <button className="speak-button" onClick={speakSentence}>
            🔊
          </button>
        </div>
        <p className="korean">{sentence.korean}</p>
      </div>
    </div>
  );
}

// PropTypes 정의
SentenceCard.propTypes = {
  sentence: PropTypes.shape({
    english: PropTypes.string.isRequired,
    korean: PropTypes.string.isRequired,
    important: PropTypes.arrayOf(PropTypes.string).isRequired,
    words: PropTypes.objectOf(PropTypes.string).isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  onWordClick: PropTypes.func.isRequired
};

function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);
  const [dailySentences, setDailySentences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTodaysSentences = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }));

        // 로컬 스토리지에서 저장된 문장과 날짜 확인
        const stored = localStorage.getItem('dailySentences');
        const storedDate = localStorage.getItem('sentencesDate');
        const today = now.toDateString();

        let sentences;
        if (stored && storedDate === today) {
          // 오늘 이미 저장된 문장이 있으면 그것을 사용
          sentences = JSON.parse(stored);
        } else {
          try {
            // ChatGPT API로 새로운 문장 생성 시도
            const newSentences = await generateDailySentences();
            
            if (newSentences && Array.isArray(newSentences) && newSentences.length === 5) {
              sentences = newSentences;
              // 로컬 스토리지에 저장
              localStorage.setItem('dailySentences', JSON.stringify(newSentences));
              localStorage.setItem('sentencesDate', today);
            } else {
              throw new Error('새로운 문장을 생성할 수 없습니다.');
            }
          } catch (apiError) {
            console.error('API 호출 오류:', apiError);
            // API 호출 실패시 폴백 사용
            const shuffled = [...fallbackSentences];
            for (let i = shuffled.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            sentences = shuffled.slice(0, 5);
            setError(apiError.message === 'API 사용량이 초과되었습니다. 나중에 다시 시도해주세요.' 
              ? apiError.message 
              : '새로운 문장을 가져오는데 실패했습니다. 기본 문장을 표시합니다.');
          }
        }

        if (sentences && sentences.length > 0) {
          setDailySentences(sentences);
        } else {
          throw new Error('문장을 불러올 수 없습니다.');
        }
      } catch (error) {
        console.error('문장 로딩 중 오류 발생:', error);
        setError(error.message || '문장을 불러오는 중 오류가 발생했습니다.');
        
        // 에러 발생 시 폴백 사용
        const shuffled = [...fallbackSentences];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setDailySentences(shuffled.slice(0, 5));
      } finally {
        setIsLoading(false);
      }
    };

    loadTodaysSentences();

    // 자정에 업데이트
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;

    const timerId = setTimeout(() => loadTodaysSentences(), timeUntilMidnight);
    return () => clearTimeout(timerId);
  }, []);

  const handleWordClick = (word, sentenceWords) => {
    if (word && sentenceWords) {
      setSelectedWord(sentenceWords[word]);
    }
  };

  return (
    <div className="container">
      <h1>오늘의 영어 문장 5개</h1>
      <p className="date">{currentDate}</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="sentences-container">
        {isLoading ? (
          <div className="loading">문장을 불러오는 중입니다...</div>
        ) : dailySentences.length > 0 ? (
          dailySentences.map((sentence, idx) => (
            sentence && (
              <SentenceCard
                key={idx}
                sentence={sentence}
                index={idx}
                onWordClick={handleWordClick}
              />
            )
          ))
        ) : (
          <div className="loading">문장을 불러올 수 없습니다.</div>
        )}
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
