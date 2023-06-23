import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "../Header/Header";

const RootLayout: FC = () => {
  return (
    <div className='root-layout'>
      <Header />
      <Outlet />
    </div>
  );
}

export default RootLayout;