import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const tick = () => {
      if (!isDeleting) {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        if (displayText.length + 1 === currentWord.length) {
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseMs);
          return;
        }
        timeoutRef.current = setTimeout(tick, typingSpeed);
      } else {
        setDisplayText(currentWord.slice(0, displayText.length - 1));
        if (displayText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
          return;
        }
        timeoutRef.current = setTimeout(tick, deletingSpeed);
      }
    };

    timeoutRef.current = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayText;
}
