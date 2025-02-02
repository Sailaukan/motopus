"use client";

import React, { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import useCodeStore from "../zustand/States";
import axios from "axios";
import additionalPrompt from "../api/claude/additionalPrompt";
import NavBar from "./NavBar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import LoadingAnimation from "./LoadingAnimation";
import NumberTicker from "@/app/components/ui/number-ticker";
import LandingInfo from "./LandingInfo";
import Footer from "./Footer";
import { createProject } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ChatGPTResponse {
  choices: Array<{ message: { content: string } }>;
}

interface Image {
  id: number;
  previewURL: string;
  webformatURL: string;
  tags: string;
}

const MainPage: React.FC = () => {
  const [text, setText] = useState<string>("");
  const code = useCodeStore((state) => state.code);
  const setCode = useCodeStore((state) => state.setCode);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const combinedPrompt = `${additionalPrompt}${text}`;
  const [keyWord, setKeyWord] = useState<string>("");

  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    // Trigger sparkle animation every 5 seconds
    const interval = setInterval(() => {
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const buttonsData = [
    {
      label: "Instagram story",
      onClickMessage: "Creative Instagram story about Almaty",
      iconPath:
        "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334",
    },
    {
      label: "Video presentation",
      onClickMessage: "Video presentation of a new MacBook",
      iconPath:
        "M8.5 6a.5.5 0 1 0-1 0h-2A1.5 1.5 0 0 0 4 7.5v2A1.5 1.5 0 0 0 5.5 11h.473l-.447 1.342a.5.5 0 1 0 .948.316L7.027 11H7.5v1a.5.5 0 0 0 1 0v-1h.473l.553 1.658a.5.5 0 1 0 .948-.316L10.027 11h.473A1.5 1.5 0 0 0 12 9.5v-2A1.5 1.5 0 0 0 10.5 6zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5z",
    },
    {
      label: "Invitation to party",
      onClickMessage: "Colorful invitation to birthday party",
      iconPath:
        "M8 9.984C10.403 9.506 12 7.48 12 5a4 4 0 0 0-8 0c0 2.48 1.597 4.506 4 4.984M13 5c0 2.837-1.789 5.227-4.52 5.901l.244.487a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3 3 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.244-.487C4.789 10.227 3 7.837 3 5a5 5 0 0 1 10 0m-6.938-.495a2 2 0 0 1 1.443-1.443C7.773 2.994 8 2.776 8 2.5s-.226-.504-.498-.459a3 3 0 0 0-2.46 2.461c-.046.272.182.498.458.498s.494-.227.562-.495",
    },
  ];

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
    const URL = `https://pixabay.com/api/videos/?key=${process.env.NEXT_PUBLIC_PIXABAYAPIKEY
      }&q=${encodeURIComponent(keyword)}&per_page=10`;

    try {
      const response = await axios.get(URL);
      return response.data.hits.map((hit: any) => hit.videos.medium.url);
    } catch (error) {
      console.error("Error fetching videos:", error);
      return [];
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    setLoading(true);
    e.preventDefault();

    try {
      const extractedKeyWord = await getKeyWord(text);
      setKeyWord(extractedKeyWord);

      const res = await axios.post<ChatGPTResponse>("/api/chat", {
        messages: [{ role: "user", content: combinedPrompt }],
      });
      let generatedCode = res.data.choices[0].message.content;

      generatedCode = generatedCode.replace(/```json|```/g, "").trim();
      let parsedCode = JSON.parse(generatedCode);

      const generatedImageUrls = await generateImages(extractedKeyWord);

      if (!parsedCode.backgroundImages) {
        parsedCode.backgroundImages = [];
      }
      parsedCode.backgroundImages = [
        ...parsedCode.backgroundImages,
        ...generatedImageUrls,
      ];

      const updatedCode = JSON.stringify(parsedCode);
      setCode(updatedCode);

      if (userId) {
        await createProject(userId, text, updatedCode);
      } else {
        await createProject("anonymus", text, updatedCode);
      }

      router.push("/Editor");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (newText: string) => {
    setText(newText);
  };

  return (
    <div className="bg-gradient-to-b from-white via-purple-50 to-white text-black min-h-screen">
      <NavBar />
      <motion.main
        className="container mx-auto px-4 pt-12 lg:mb-32 md:mb-28 mb-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="relative"
          animate={{ opacity: showSparkles ? 1 : 0 }}
        >
          <Sparkles
            className="absolute -top-10 right-1/4 text-purple-500"
            size={24}
          />
        </motion.div>

        <motion.h1
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-center mt-28 lg:mt-32 mb-4"
          variants={containerVariants}
        >
          Animate your ideas <br className="hidden sm:inline" />
          in <NumberTicker value={15} /> seconds
        </motion.h1>

        <motion.p
          className="text-sm md:text-base lg:text-lg text-center text-gray-600 mb-8"
          variants={containerVariants}
        >
          Describe the video you want and get
          <br className="sm:hidden" /> AI generated animation
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
          variants={containerVariants}
        >
          <div className="relative w-full">
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75"
              animate={{
                opacity: isInputFocused ? 0.75 : 0
              }}
              transition={{ duration: 0.3 }}
            />
            <Input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Colorful preview for Instagram story"
              className="relative placeholder-gray-400 py-6 px-5 w-full bg-white/90 backdrop-blur-sm border-2 border-purple-100 focus:border-purple-500 transition-all duration-300"
            />
          </div>

          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Button
              type="submit"
              className="py-6 px-8 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 w-full sm:w-auto font-bold text-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Generate
            </Button>
          </motion.div>
        </motion.form>

        <motion.div
          className="max-w-2xl items-center mx-auto mt-4 mb-0 md:mb-6 lg:mb-10 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2"
          variants={containerVariants}
        >
          {buttonsData.map((button, index) => (
            <motion.div
              key={index}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Button
                onClick={() => handleButtonClick(button.onClickMessage)}
                className="p-3 w-full border-2 border-purple-100 bg-white/90 backdrop-blur-sm hover:border-purple-500 text-gray-800 hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1 group-hover:scale-110 transition-transform duration-300"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d={button.iconPath} />
                </svg>
                {button.label}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <LoadingAnimation />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
      <LandingInfo />
      <Footer />
    </div>
  );
};

export default MainPage;
