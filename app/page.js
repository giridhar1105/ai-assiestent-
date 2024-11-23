"use client"

import transcript from "@/.next/transcript";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Recorder from "@/components/Recorder";
import VoiceSynthesizer from "@/components/VoiceSynthesiser";
import Messages from "@/components/Messages";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";

const initialState = {
  sender: "",
  response: "",
  id: "",
};

export default function Home() {
  const [state, formAction] = useFormState(transcript, initialState);
  const fileRef = useRef(null);
  const submitButtonRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (state.response && state.sender) {
      setMessages((messages) => [
        {
          sender: state.sender || "",
          response: state.response || "",
          id: state.id || "",
        },
        ...messages,
      ]);
    }
  }, [state]);

  const uploadAudio = (blob) => {
    const url = URL.createObjectURL(blob);

    const file = new File([blob], "audio.webm", { type: blob.type });

    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <main className="bg-black h-screen overflow-y-scroll">
      <header className="flex fixed top-0 justify-between text-white w-full p-5">
        <Image
          src="https://i.imgur.com/MCHWJZS.png"
          alt="Logo"
          width={50}
          height={50}
        />

        <SettingsIcon
          className="p-2 m-2 rounded-full cursor-pointer bg-purple-600 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
          onClick={() => setDisplaySettings(!displaySettings)}
          size={40}
        />
      </header>

      <form action={formAction} className="flex flex-col bg-black">
        <div className="flex-1 bg-gradient-to-b from-purple-500 to-black">
          <Messages messages={messages} />
        </div>

        <input type="file" name="audio" ref={fileRef} hidden />
        <button type="submit" hidden ref={submitButtonRef} />

        <div className="fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl">
          <Recorder uploadAudio={uploadAudio} />
          <div className="">
            <VoiceSynthesizer state={state} />
          </div>
        </div>
      </form>
    </main>
  );
}
