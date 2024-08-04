"use client";

import { Player } from "@remotion/player";
import useCodeStore from "../zustand/States";
import { Main } from "../remotion/Root";
import React, { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import JsonEditor from "../components/JsonEditor";
import { CanvaLikeScroll } from "../components/CanvaLikeScroll";
import { Button } from "../components/ui/button";
import LoadingSpinner from "../components/LoadingTabs";
import additionalPrompt from "../api/claude/additionalPrompt";
import { createProject } from "@/lib/action";
import LoadingAnimation from "../components/LoadingAnimation";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { useRouter } from "next/navigation";

interface ChatGPTResponse {
  choices: Array<{ message: { content: string } }>;
}

const EditorPage: React.FC = () => {
  const code = useCodeStore((state) => state.code);
  const [text, setText] = useState<string>("");
  const setCode = useCodeStore((state) => state.setCode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNewVideoOpen, setIsNewVideoOpen] = useState(false);
  const [chosenItem, setChosenItem] = useState<string | null>("1");
  const [isLoading, setIsLoading] = useState(true);
  const [isNewLoading, setNewLoading] = useState(false);
  const [videoCommands, setVideoCommands] = useState<any[]>([]);
  const combinedPrompt = `${additionalPrompt}${text}`;
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      fetchVideoCommands();
    }
  }, [userId]);

  const getKeyWord = async (input: string): Promise<string> => {
    try {
      const res = await axios.post<ChatGPTResponse>("/api/chat", {
        messages: [
          {
            role: "user",
            content: `Analyze the following text and extract the single most important keyword that best represents its core subject matter:
    
    1. The keyword must be specific and highly relevant to the main topic.
    2. It should be a single word, not a phrase.
    3. Avoid generic terms, common verbs, or broad categories (e.g., 'video', 'about', 'presentation', 'thing', 'person').
    4. Prioritize nouns, proper nouns, or technical terms that are central to the subject.
    5. If the text is about a particular field, choose a keyword specific to that domain.
    6. If the text is too vague or broad, choose the most concrete and specific term available.
    7. Ignore any words that don't contribute to the core meaning (e.g., articles, prepositions, conjunctions).
    8. If multiple words seem equally important, choose the most unusual or specific one.
    
    Return only the single keyword, with no additional text or explanation.
    
    Input text: "${input}"`,
          },
        ],
      });
      return res.data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error getting keyword:", error);
      return "";
    }
  };

  const generateImages = async (keyword: string): Promise<string[]> => {
    const URL = `https://pixabay.com/api/?key=${
      process.env.NEXT_PUBLIC_PIXABAYAPIKEY
    }&q=${encodeURIComponent(keyword)}&per_page=10`;

    try {
      const response = await axios.get(URL);
      if (
        response.data &&
        response.data.hits &&
        response.data.hits.length > 0
      ) {
        return response.data.hits
          .filter((hit: any) => hit.webformatURL && hit.previewURL && hit.tags)
          .map((hit: any) => {
            let url = hit.webformatURL;
            return url.replace("https://", "http://").split("#")[0];
          });
      } else {
        console.warn("No valid image results found for the keyword:", keyword);
        return [];
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      return [];
    }
  };

  const handleCreateButton = async () => {
    setNewLoading(true);
    setIsNewVideoOpen(false);
    setText("");

    if (!userId) {
      console.error("User not authenticated");
      setNewLoading(false);
      return;
    }

    try {
      const extractedKeyWord = await getKeyWord(text);

      const res = await axios.post<ChatGPTResponse>("/api/chat", {
        messages: [{ role: "user", content: combinedPrompt }],
      });
      let generatedCode = res.data.choices[0].message.content;

      generatedCode = generatedCode.replace(/```json|```/g, "").trim();
      let parsedCode = JSON.parse(generatedCode);

      const generatedImageUrls = await generateImages(extractedKeyWord);

      if (generatedImageUrls.length > 0) {
        if (!parsedCode.backgroundImages) {
          parsedCode.backgroundImages = [];
        }
        parsedCode.backgroundImages = [
          ...parsedCode.backgroundImages,
          ...generatedImageUrls,
        ];
      }

      const updatedCode = JSON.stringify(parsedCode);
      setCode(updatedCode);

      if (userId) {
        await createProject(userId, text, updatedCode);
      } else {
        await createProject("anonymus", text, updatedCode);
      }

      fetchVideoCommands();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setNewLoading(false);
    }
  };

  const fetchVideoCommands = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/videoCommands?userId=${userId}`);
      setVideoCommands(response.data);
    } catch (error) {
      console.error("Error fetching video commands:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black sm:mt-10 md:mt-14 mt-12">
      <NavBar />
      <div className="flex flex-1 relative">
        <aside
          className={`
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    transition-transform duration-300 ease-in-out px-6 pt-8
    fixed top-0 left-0 z-30 w-64 h-screen bg-white border-r shadow-lg
    overflow-y-auto`}
        >
          {userId ? (
            <div>
              <div className="relative mt-10 lg:mt-14">
                <button
                  onClick={() => setIsNewVideoOpen(true)}
                  className="w-full hover:ring-2 hover:ring-purple-300 py-3 px-4 text-center text-white border-gray-300 bg-purple-500 border rounded-lg hover:bg-purple-700 transition-colors duration-300"
                >
                  <span className="ml-4">Create new video</span>
                </button>
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-lg">
                  +
                </span>
              </div>

              <div className="border-t-2 border-gray-200 my-4" />

              <ul className="space-y-2 mb-4">
                {videoCommands
                  .slice()
                  .reverse()
                  .map((command, index) => (
                    <li
                      key={command._id || index}
                      onClick={() => {
                        setChosenItem(command._id);
                        setCode(command.generatedCode);
                      }}
                      className={`py-3 px-4 rounded-md overflow-hidden whitespace-nowrap border-2 cursor-pointer transition-colors duration-300 ${
                        chosenItem === command._id
                          ? "bg-purple-200 border-purple-300 border-2 text-purple-950 hover:bg-purple-300"
                          : "bg-white border-gray-100 text-gray-800 hover:bg-purple-100 hover:border-purple-100 hover:text-purple-950"
                      }`}
                    >
                      <div
                        className={`inline-block ${
                          command.prompt.length > 23
                            ? "hover:animate-marquee"
                            : ""
                        }`}
                      >
                        {command.prompt}
                      </div>
                    </li>
                  ))}
                {isLoading && <LoadingSpinner />}
              </ul>
            </div>
          ) : (
            <div className="mt-10 lg:mt-14">
              <p className="text-center text-sm mb-3 text-gray-400">
                Sing up to create more videos
              </p>
              <button
                onClick={() => router.push("/sign-up")}
                className="bg-purple-500 w-full text-white px-3 py-3 lg:px-5 lg:py-3 rounded-md text-xs sm:text-sm hover:bg-purple-700 transition-colors shadow-lg"
              >
                Sign Up
              </button>
            </div>
          )}
        </aside>

        <div
          className={`
        fixed md:absolute top-96 transform -translate-y-1/3
        ${isSidebarOpen ? "left-64" : "left-0"}
        transition-all duration-300 ease-in-out z-40
        w-6 h-24 bg-white
        rounded-r-lg shadow-xl cursor-pointer border-t border-b border-r border-gray-400
        flex flex-col items-center justify-center
        hover:bg-gray-200`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            className={`w-5 h-5 transition-transform duration-300 ${
              isSidebarOpen ? "" : "rotate-180"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </div>

        <div
          onClick={() => setIsNewVideoOpen(false)}
          className={`
    fixed inset-0 flex flex-col items-center justify-center
    bg-white bg-opacity-80 backdrop-blur-sm z-50
    transition-all duration-300 ease-in-out
    ${
      isNewVideoOpen
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
        >
          <div
            className="bg-white p-3 rounded-2xl shadow-xl w-11/12 max-w-3xl max-h-[80vh] overflow-y-auto relative flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Input
              placeholder="Enter your new video description"
              onChange={(e) => setText(e.target.value)}
              className="w-full p-2 border border-gray-300 text-md rounded-md"
            />
            <Button
              onClick={() => handleCreateButton()}
              type="submit"
              className="py-4 px-2 bg-purple-600 hover:bg-purple-400 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Button>
          </div>
        </div>

        <main
          className={`flex-1 p-4 transition-all duration-300 ease-in-out overflow-hidden ${
            isSidebarOpen ? "md:ml-64" : "ml-0"
          }`}
        >
          <div className="max-w-full overflow-hidden">
            <div className="relative rounded-lg lg:p-2 py-20 px-2 md:py-0 md:px-0 my-0 bg-purple-100 lg:my-5">
              <div className="lg:w-3/4 w-auto lg:h-auto h-2/3 mx-auto rounded-lg relative">
                <Player
                  component={Main}
                  inputProps={{ code }}
                  durationInFrames={900}
                  compositionWidth={1280}
                  compositionHeight={720}
                  fps={30}
                  controls
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                    borderRadius: "inherit",
                    cursor: "pointer",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                />
                <button
                  title="Download"
                  rel="ugc"
                  onClick={() =>
                    toast("Not available", {
                      description:
                        "You can't download videos on a beta-testing stage",
                      action: {
                        label: "Close",
                        onClick: () => console.log("Close"),
                      },
                    })
                  }
                  className="absolute shadow-lg top-2 right-2 p-3 bg-purple-500 rounded-md hover:bg-purple-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
                  </svg>
                </button>
                <Toaster />
              </div>
            </div>

            <div className="w-full flex justify-center mt-3">
              <div
                className="bg-white p-8 border border-gray-300 rounded-xl shadow-xl w-full max-h-[80vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <JsonEditor
                  code={code}
                  onUpdate={(newCode) => {
                    setCode(newCode);
                  }}
                />
              </div>
            </div>

            {/* <CanvaLikeScroll /> */}
            {isNewLoading && <LoadingAnimation />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditorPage;
