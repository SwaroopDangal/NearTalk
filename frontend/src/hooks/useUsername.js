import { useEffect, useState, useCallback } from "react";

const adjectives = [
  "Cool",
  "Fast",
  "Silent",
  "Lazy",
  "Happy",
  "Brave",
  "Swift",
  "Clever",
  "Mighty",
  "Gentle",
];

const animals = [
  "Tiger",
  "Panda",
  "Fox",
  "Eagle",
  "Wolf",
  "Bear",
  "Hawk",
  "Lion",
  "Owl",
  "Deer",
];

const generate = () =>
  adjectives[Math.floor(Math.random() * adjectives.length)] +
  animals[Math.floor(Math.random() * animals.length)] +
  Math.floor(Math.random() * 1000);

const useUsername = () => {
  const [username, setUsername] = useState(null);

  const regenerate = useCallback(() => {
    const newName = generate();
    sessionStorage.setItem("username", newName);
    setUsername(newName);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("username");
    if (stored) {
      setUsername(stored);
    } else {
      regenerate();
    }
  }, [regenerate]);

  return { username, regenerate };
};

export default useUsername;
