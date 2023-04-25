import React, {useState} from 'react';

const AppContext = React.createContext({
    userProfile: '',
    onLogin: () => {},
    onLogout: () => {}
});

export const AppContextProvider = (props) => {
    const [userProfile, setUserProfile] = useState('');

  const loginHandler = (profile) => {
    setUserProfile(profile);
  }
  const logoutHandler = () => {
    setUserProfile('');
    localStorage.removeItem("userProfile");
  }
    return <AppContext.Provider value={{
        userProfile: userProfile,
        onLogin: loginHandler,
        onLogout: logoutHandler
    }}>
        {props.children}
    </AppContext.Provider>
}
export default AppContext;
