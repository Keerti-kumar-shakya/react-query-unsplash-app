import {createContext, useContext, useEffect, useState} from 'react';

const AppContext = createContext();

const getInitialDarkMode = () => {
const prefersDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
return storedDarkMode || prefersDarkMode;
}

export const AppProvider = ({children}) => {
 const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
 const [searchTerm, setSearchTerm] = useState('dog');
 const toggleDarkTheme = () => {
  const newDarkTheme = !isDarkTheme;
  setIsDarkTheme(newDarkTheme);
  // const body = document.querySelector('body');
  // body.classList.toggle('dark-theme', newDarkTheme);
  localStorage.setItem('darkTheme', newDarkTheme);
 }

 useEffect(() => {
  document.body.classList.toggle('dark-theme', isDarkTheme);
 }, [isDarkTheme])

  return (
  <AppContext.Provider 
  value={{isDarkTheme, toggleDarkTheme, setSearchTerm, searchTerm}}>
    {children}
  </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);