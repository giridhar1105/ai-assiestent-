"use client"

import { useEffect, useState } from "react";

function VoiceSynthesizer({
  state,
  displaySettings,
}) {
  const [synth, setSynth] = useState(null);
  const [voice, setVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    setSynth(window.speechSynthesis);
  }, []);

  useEffect(() => {
    if (!state.response || !synth) return;

    const wordsToSay = new SpeechSynthesisUtterance(state.response);

    wordsToSay.voice = voice;
    wordsToSay.pitch = pitch;
    wordsToSay.rate = rate;
    wordsToSay.volume = volume;

    synth.speak(wordsToSay);

    return () => {
      synth.cancel();
    };
  }, [state]);

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices();
    setVoice(voices[0]);
  }, []);

  const handleVoiceChange = (e) => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((v) => v.name === e.target.value);
    if (!voice) return;
    setVoice(voice);
  };

  const handlePitchChange = (e) => {
    setPitch(parseFloat(e.target.value));
  };

  const handleRateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {displaySettings && (
        <>
          <div className="w-fit">
            <p className="text-xs text-gray-500 p-2">Voice:</p>
            <select
              value={voice?.name}
              onChange={handleVoiceChange}
              className="flex-1 bg-purple-500 text-white border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500"
            >
              {window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex pb-5">
            <div className="p-2">
              <p className="text-xs text-gray-500">Pitch:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={handlePitchChange}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Speed:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={handleRateChange}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Volume:</p>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-purple-500"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VoiceSynthesizer;