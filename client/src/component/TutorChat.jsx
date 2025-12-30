import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

/* ------------------ Voice Visualizer ------------------ */
const VoiceVisualizer = ({ isSpeaking }) => {
  const bars = Array.from({ length: 20 });

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-indigo-500 rounded-full transition-all duration-150 ${
            isSpeaking ? 'animate-bounce' : 'h-2 opacity-30'
          }`}
          style={{
            height: isSpeaking
              ? `${Math.floor(Math.random() * 80) + 20}%`
              : '8px',
            animationDelay: `${i * 0.05}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
};

/* ------------------ Main Component ------------------ */
const EnglishTutorChat = () => {
  const location = useLocation();
  const user = location.state?.user || { name: 'Friend', occupation: 'Learner' };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isAiTalking, setIsAiTalking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  /* ------------------ Welcome Message ------------------ */
  useEffect(() => {
    if (!hasGreeted) {
      const welcomeMessage = `Hello ${user.name}! Welcome to your English class. Let's practice English together.`;

      setMessages([{ role: 'ai', text: welcomeMessage }]);
      speakText(welcomeMessage);

      setHasGreeted(true);
    }
  }, [hasGreeted, user.name]);

  /* ------------------ Text to Speech ------------------ */
  const speakText = (text) => {
    setIsAiTalking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsAiTalking(false);
    window.speechSynthesis.speak(utterance);
  };

  /* ------------------ Send Message ------------------ */
  const handleSend = async (userMessage = inputText) => {
    if (!userMessage.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInputText('');

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          userContext: {
            name: user.name,
            occupation: user.occupation,
          },
        }),
      });

      const data = await response.json();

      speakText(data.reply);

      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (error) {
      const errorMsg = 'I am having trouble connecting to the server.';
      speakText(errorMsg);
      setMessages((prev) => [...prev, { role: 'ai', text: errorMsg }]);
    }
  };

  /* ------------------ Speech Recognition ------------------ */
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };

    recognition.start();
  };

  /* ------------------ UI ------------------ */
  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans">
      {/* LEFT: AI */}
      <div className="flex-1 flex flex-col items-center justify-center bg-linear-to-b from-slate-900 to-black">
        <div className="text-center mb-8">
          <div
            className={`w-32 h-32 rounded-full bg-indigo-600/20 border-2 border-indigo-500/50 flex items-center justify-center mb-6 mx-auto ${
              isAiTalking ? 'shadow-[0_0_50px_rgba(79,70,229,0.4)]' : ''
            }`}
          >
            <Volume2
              className={`w-12 h-12 ${
                isAiTalking ? 'text-indigo-400' : 'text-slate-600'
              }`}
            />
          </div>
          <h2 className="text-2xl font-bold">AI English Tutor</h2>
          <p className="text-slate-400 text-sm">
            {isListening ? 'Listening...' : 'Speak or type to begin'}
          </p>
        </div>

        <VoiceVisualizer isSpeaking={isAiTalking} />
      </div>

      {/* RIGHT: CHAT */}
      <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <h3 className="font-semibold">Conversation</h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 rounded-tr-none'
                    : 'bg-slate-800 border border-slate-700 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex gap-2 bg-slate-800 p-2 rounded-xl">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type or speak..."
              className="flex-1 bg-transparent outline-none text-sm px-2"
            />

            <button
              onClick={startListening}
              className={`p-3 rounded-full ${
                isListening ? 'bg-red-500 animate-pulse' : 'bg-indigo-600'
              }`}
            >
              {isListening ? <MicOff /> : <Mic />}
            </button>

            <button
              onClick={() => handleSend()}
              className="bg-indigo-600 p-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishTutorChat;
