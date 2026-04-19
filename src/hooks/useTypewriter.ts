import { useState, useEffect } from 'react';

export function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 35, pauseMs = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing phase
        const nextText = currentWord.slice(0, displayText.length + 1);
        setDisplayText(nextText);

        if (nextText === currentWord) {
          setIsDeleting(true);
        }
      } else {
        // Deleting phase
        const nextText = currentWord.slice(0, displayText.length - 1);
        setDisplayText(nextText);

        if (nextText === '') {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }
    }, isDeleting 
        ? (displayText === currentWord ? pauseMs : deletingSpeed) 
        : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}

