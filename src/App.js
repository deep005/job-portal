import React, { useContext } from 'react';
import { ConfigProvider, theme } from 'antd';
import AppContext from './store/app-context';
import './App.scss';
import MainHeader from './Components/MainHeader/MainHeader';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';

function App() {
  const { darkAlgorithm } = theme;
  const ctx = useContext(AppContext);
  return (
    
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <MainHeader />
        <main className="main">
         {!ctx.userProfile ? <Login /> : <Home />} 
        </main>
      </ConfigProvider>
  );
}

export default App;
