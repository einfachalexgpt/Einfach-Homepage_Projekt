import React, { useState } from 'react';
import Container from 'components/Container';

// Definiere einen Typ für die Nachrichten im Chat
type ChatMessage = {
  type: 'user' | 'bot';
  text: string;
};

const Home: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const apiKey = process.env.HUGGINGFACE_API_KEY;

  // Funktion zum Abfragen des Hugging Face Modells
  async function query(data: { inputs: { query: string; table: { Repository: string[]; Stars: string[]; Contributors: string[]; "Programming language": string[]; }; } }) {
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/google/tapas-base-finetuned-wtq',
        {
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Fehler bei der Anfrage:', error);
      throw error;
    }
  }

  const handleSubmit = async () => {
    const userMessage: ChatMessage = { type: 'user', text: input };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    const inputData = {
      inputs: {
        query: "How many stars does the transformers repository have?",
        table: {
          Repository: ["Transformers", "Datasets", "Tokenizers"],
          Stars: ["36542", "4512", "3934"],
          Contributors: ["651", "77", "34"],
          "Programming language": ["Python", "Python", "Rust, Python and NodeJS"]
        }
      }
    };

    const response = await query(inputData);
    const botMessage: ChatMessage = { type: 'bot', text: JSON.stringify(response) };
    setMessages(prevMessages => [...prevMessages, botMessage]);

    setInput('');
  };

  return (
    <Container>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.text}
          </div>
        ))}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Schreibe eine Nachricht..."
        />
        <button onClick={handleSubmit}>Senden</button>
      </div>
    </Container>
  );
};

export default Home;
