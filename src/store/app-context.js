import React, {useState} from 'react';

const AppContext = React.createContext({
    userProfile: '',
    onLogin: () => {},
    onLogout: () => {}
});

export const AppContextProvider = (props) => {
    const [userProfile, setUSerProfile] = useState('');

  const loginHandler = (profile) => {
    setUSerProfile(profile);
  }
  const logoutHandler = () => {
    setUSerProfile('');
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
