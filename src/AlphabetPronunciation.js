import React, { useEffect, useState } from "react";

const AlphabetPronunciation = () => {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const loadVoices = () => {
      setVoices(speechSynthesis.getVoices());
    };
    speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  const speak = (letter) => {
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.voice = voices.find(voice => voice.name.includes("Google US English")) || voices[0];
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-wrap gap-6 p-6 justify-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient text-center">
      <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow-lg">Click a Letter to Hear Its Pronunciation</h1>
      <div className="grid grid-cols-6 gap-4">
        {alphabets.map((letter) => (
          <button
            key={letter}
            className="p-6 w-20 h-20 text-3xl font-extrabold border-4 rounded-full shadow-xl bg-white text-purple-700 hover:bg-purple-700 hover:text-white transition duration-300 transform hover:scale-125 hover:rotate-6 drop-shadow-lg"
            onClick={() => speak(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AlphabetPronunciation;
