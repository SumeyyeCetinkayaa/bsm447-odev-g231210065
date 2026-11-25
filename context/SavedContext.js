
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedContext = createContext();

const STORAGE_KEY = "savedCharacters";

export function SavedProvider({ children }) {
  const [savedCharacters, setSavedCharacters] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    loadSavedCharacters();
  }, []);

  async function loadSavedCharacters() {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);

      if (data !== null) {
        setSavedCharacters(JSON.parse(data));
      }
    } catch (error) {
      console.error("Kayıtlar okunamadı:", error);
    } finally {
      setIsReady(true);
    }
  }

  async function toggleSaved(character) {
    if (!isReady) return;

    const exists = savedCharacters.some(
      (item) => item.id === character.id
    );

    let updatedCharacters;

    if (exists) {
      updatedCharacters = savedCharacters.filter(
        (item) => item.id !== character.id
      );
    } else {
      updatedCharacters = [...savedCharacters, character];
    }

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCharacters)
      );

      setSavedCharacters(updatedCharacters);
    } catch (error) {
      console.error("Kayıt işlemi başarısız:", error);
    }
  }

  function isSaved(id) {
    return savedCharacters.some((item) => item.id === id);
  }

  return (
    <SavedContext.Provider
      value={{ savedCharacters, toggleSaved, isSaved, isReady }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}
