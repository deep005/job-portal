import { Outlet } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
const RootLayout = () => {
  return (
    <>
      <MainHeader />
      <main>
        <Outlet/>
      </main>
    </>
  );
};

export default RootLayout;
