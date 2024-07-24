import React,{useEffect} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings} from './components';
import { Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Line, Area, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor } from './pages';



import { useStateContext } from './contexts/ContextProvider';


function App() {
  const {setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: 'blue', borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
            
            
          </div>
          {activeMenu.activeMenu && (
            <div className=" h-100 w-52 fixed  sidebar dark:bg-secondary-dark-bg bg-main-bg ">
              <Sidebar />
            </div>
          )}
          {!(activeMenu.activeMenu) &&(
            
            <div className="h-100 w-15 dark:bg-secondary-dark-bg bg-main-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu.activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-52 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full relative">
              <Navbar />
            </div>
            
            <div>
            {themeSettings && (<ThemeSettings />)}

            <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)}/>
                <Route path="/ecommerce" element={(<Ecommerce />)}/>

                {/* pages  */}
                <Route path="/orders" element={(<Orders />)}/>
                <Route path="/employees" element="h4"/>
                <Route path="/customers" element="h4" />

                {/* apps  */}
                <Route path="/kanban" element= "h5"/>
                <Route path="/editor" element="h6" />
                <Route path="/calendar" element="h7" />
                <Route path="/color-picker" element="h8" />

                {/* charts  */}
                <Route path="/line" element="h11"/>
                <Route path="/area" element="h22" />
                <Route path="/bar" element="h12" />
                <Route path="/pie" element="h21" />
                <Route path="/financial" element="h222" />
                <Route path="/color-mapping" element="h111" />
                <Route path="/pyramid" element="h112" />
                <Route path="/stacked" element="h113" />

              </Routes>
            </div>
          </div>
          </div>
          </BrowserRouter>
          
          </div>
          
  )
}

export default App
