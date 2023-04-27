import React, {useState} from 'react';

const AppContext = React.createContext({
    userProfile: '',
    userDataFilled: false,
    onLogin: () => {},
    onLogout: () => {},
    onSetUserDataFilled : () => {},
    onSetUserDataFilledHandler: () => {}
});

export const AppContextProvider = (props) => {
    const [userProfile, setUserProfile] = useState('');
  const [userDataFilled, setUserDataFilled] = useState(false);

   const loginHandler = (profile) => {
    setUserProfile(profile);
  }
  const onSetUserDataFilledHandler = (value) => {
    setUserDataFilled(value);
 }  
 const logoutHandler = () => {
    setUserProfile('');
    setUserDataFilled(false);
    localStorage.removeItem("userProfile");
    localStorage.removeItem("seekerData");
  }
    return <AppContext.Provider value={{
        userProfile: userProfile,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        userDataFilled: userDataFilled,
        onSetUserDataFilled: onSetUserDataFilledHandler
    }}>
        {props.children}
    </AppContext.Provider>
}
export default AppContext;
