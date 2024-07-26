import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};
const loginstate = JSON.parse(localStorage.getItem('login')) || false 

export const ContextProvider = ({ children }) => {
 
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);
  const [currentColor, setCurrentColor] = useState('blue');
  const [currentMode, setCurrentMode] = useState('Dark');
  const [themeSettings, setThemeSettings] = useState(false);
  const [login1,setlogin1] = useState(loginstate)
 
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ login1,setlogin1,activeMenu,setActiveMenu,handleClick,setIsClicked,isClicked,initialState,setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings,currentColor,currentMode}}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
