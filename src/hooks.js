// hook file
import { useState, useEffect } from "react";
import axios from "axios";
//  Step Two: useFlip : useFlip
// which will hold the business logic for flipping any type of card.
function useFlip(initialState = true) {
  const [isFlipped, setFlipped] = useState(initialState);
  const flip = () => {
    setFlipped((isUp) => !isUp);
  };
  return [isFlipped, flip];
}
// Step Three: useAxios in PlayingCardList
function useAxios(key, baseUrl) {
  const [res, setRes] = useLocalStorage(key);
  const addResData = async (formatter = (data) => data, restOfUrl = "") => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setRes((data) => [...data, formatter(response.data)]);
  };

  const clearResponses = () => setRes([]);

  return [res, addResData, clearResponses];
}

// Further Study: useLocalStorage hook
function useLocalStorage(key, initialValue = []) {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
export { useFlip, useAxios, useLocalStorage };
