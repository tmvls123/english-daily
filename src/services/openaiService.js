import OpenAI from 'openai';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// 디버깅을 위한 로그 추가
console.log('Environment variables:', {
  apiKeyExists: !!apiKey,
  apiKeyLength: apiKey?.length,
  apiKeyStart: apiKey?.substring(0, 10) + '...',
});

const openai = new OpenAI({
  apiKey: apiKey || '',
  dangerouslyAllowBrowser: true
});

export const generateDailySentences = async () => {
  try {
    if (!apiKey) {
      throw new Error('API 키가 설정되지 않았습니다.');
    }

    console.log('Calling OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates English sentences for learning. Return exactly 5 sentences in the following JSON format: {\"sentences\": [{\"english\": \"sentence\", \"korean\": \"translation\", \"important\": [\"word1\", \"word2\"], \"words\": {\"word1\": \"meaning1\", \"word2\": \"meaning2\"}}]}"
        },
        {
          role: "user",
          content: "Generate 5 meaningful English sentences with their Korean translations and important vocabulary words."
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    console.log('Raw API Response:', response);
    console.log('Response content:', response.choices[0].message.content);
    
    const generatedSentences = JSON.parse(response.choices[0].message.content);
    console.log('Parsed sentences:', generatedSentences);
    
    if (!Array.isArray(generatedSentences?.sentences)) {
      console.error('Invalid response format:', generatedSentences);
      throw new Error('잘못된 응답 형식입니다.');
    }

    if (generatedSentences.sentences.length !== 5) {
      console.error('Wrong number of sentences:', generatedSentences.sentences.length);
      throw new Error('잘못된 문장 개수입니다.');
    }

    return generatedSentences.sentences;
  } catch (error) {
    console.error('Error generating sentences:', error);
    
    // API 할당량 초과 오류 처리
    if (error.status === 429 || (error.message && error.message.includes('429'))) {
      throw new Error('API 사용량이 초과되었습니다. 나중에 다시 시도해주세요.');
    }
    
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    return null;
  }
}; 