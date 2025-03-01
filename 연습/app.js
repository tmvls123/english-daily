// 샘플 영어 문장 데이터
const sentences = [
    {
        english: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        korean: "성공은 끝이 아니며, 실패는 치명적이지 않습니다: 중요한 것은 계속할 용기입니다."
    },
    {
        english: "The only way to do great work is to love what you do.",
        korean: "훌륭한 일을 하는 유일한 방법은 당신이 하는 일을 사랑하는 것입니다."
    },
    {
        english: "Life is what happens when you're busy making other plans.",
        korean: "인생은 당신이 다른 계획을 세우느라 바쁠 때 일어나는 것입니다."
    },
    {
        english: "In the middle of difficulty lies opportunity.",
        korean: "어려움의 한가운데에 기회가 있습니다."
    },
    {
        english: "The future belongs to those who believe in the beauty of their dreams.",
        korean: "미래는 자신의 꿈의 아름다움을 믿는 사람들의 것입니다."
    }
];

function App() {
    const [currentDate, setCurrentDate] = React.useState(new Date().toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }));

    return (
        <div className="container">
            <header className="header">
                <h1>오늘의 영어 문장</h1>
                <p className="date">{currentDate}</p>
            </header>
            
            <div className="sentences-container">
                {sentences.map((sentence, index) => (
                    <div key={index} className="sentence-card">
                        <p className="english-text">{sentence.english}</p>
                        <p className="korean-text">{sentence.korean}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root')); 