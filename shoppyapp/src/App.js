import React,{useEffect,useState} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { SiChatbot } from "react-icons/si";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings,Chatbot} from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';


import Login from "./pages/Login";
import { useStateContext } from './contexts/ContextProvider';


function App() {
  const {chatbot,setChatbot,login1,setlogin1,setCurrentColor, setCurrentMode,initialState,isClicked, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
      
     
    { !login1 && <Login />}
    {useEffect(() => {
		console.log("1234")
		localStorage.setItem('login',login1);
	},[login1])}
    
      {login1 ? ( 
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
           
            <button
                type="button"
                onClick={() => setChatbot(true)}
                style={{ background: 'blue', borderRadius: '50%' }}
                className="text-3xl text-white p-3 disabled:cursor-not-allowed"
              >
                <SiChatbot />
              </button>
           
            
           
             
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: 'blue', borderRadius: '50%' }}
                className="text-3xl text-white p-3 "
              >
                <FiSettings />
              </button>

           
            
            
          </div>
          {console.log("sidenav11",chatbot)}
          {activeMenu && (
            <div className=" h-100 w-52 fixed  sidebar dark:bg-secondary-dark-bg bg-main-bg ">
              <Sidebar />
            </div>
          )}
          {!(activeMenu) && (
            
            <div className=" h-100  w-25 sidebar dark:bg-secondary-dark-bg bg-main-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full relative">
              <Navbar />
            </div>
            
            <div>
            {chatbot && (<Chatbot />)}
            {themeSettings && (<ThemeSettings />)}
            
            <Routes>
                {/* dashboard  */}
              

                <Route path="/" element={(<Ecommerce />)}/>
                <Route path="/ecommerce" element={(<Ecommerce />)}/>

                {/* pages  */}
                <Route path="/orders" element={(<Orders />)}/>
                <Route path="/employees" element={(<Employees />)}/>
                <Route path="/customers" element={(<Customers />)}/>

              
              </Routes>
            </div>
          </div>
          </div>
           ) : (
            <>
                        <h1></h1>
                       
                    </>
           )}
          </BrowserRouter>
          
          </div>
          
  )
}

export default App
