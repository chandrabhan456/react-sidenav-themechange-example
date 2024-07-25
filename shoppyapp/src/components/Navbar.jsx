import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { CgDarkMode } from "react-icons/cg";
import avatar from '../data/avatar.jpg';
import { Cart, Chat, Notification, UserProfile } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import { Button } from '@syncfusion/ej2/buttons';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 "
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { initialState, activeMenu,setActiveMenu,handleClick,isClicked,currentMode,setCurrentMode} = useStateContext();
  console.log("ok",initialState,isClicked)

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
 
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
    <div className='flex justify-between p-2 h-70 md:mx-0 relative w-full' > 
      <TooltipComponent content="Menu" >
              
              <button
                type="button"
                
                style={{ background: '#102C57', borderRadius: '0%' }}
                className="text-4xl absolute inset-y-0 left-0 w-13 text-white p-2 hover:drop-shadow-xl hover:bg-light-gray justify-center"
                onClick={() => setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}
                
              >
                
               <AiOutlineMenu />
              </button>
            </TooltipComponent>
      <div className='flex mt-2'> 
      <NavButton title="Cart" customFunc={() => handleClick('cart')}
      color={ currentMode == 'Light'  ? 'black' : 'white'} icon={<FiShoppingCart />} />
      <NavButton title="Chat" customFunc={() => handleClick('chat')}
      dotColor="#03c9d7"
      color={ currentMode == 'Light'  ? 'black' : 'white'}  icon={<BsChatLeft />} />
      <NavButton title="Notification" customFunc={() => handleClick('notification')}
      color={ currentMode == 'Light'  ? 'black' : 'white'}  icon={<RiNotification3Line />} />
       <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1  rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <p>
              <span className="text-black-400 text-14 text-black dark:text-white"  >Hi,</span>{' '}
              <span className="text-black-400 font-bold ml-1 text-14 text-black dark:text-white"  >
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.cart && <Cart /> }
        {isClicked.chat && (<Chat />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}

      </div>
    </div>
    </div>
  );
};

export default Navbar;
