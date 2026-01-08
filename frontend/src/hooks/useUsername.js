import React from "react";
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

const useUsername = () => {
  let username = sessionStorage.getItem("username");

  if (!username) {
    username =
      adjectives[Math.floor(Math.random() * adjectives.length)] +
      animals[Math.floor(Math.random() * animals.length)] +
      Math.floor(Math.random() * 1000);

    sessionStorage.setItem("username", username);
  }
  return username;
};

export default useUsername;
