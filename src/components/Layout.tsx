import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import NavbarVertical from './NavbarVertical';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className=" max-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 pt-16 h-full bg-gray-100 ">
                <NavbarVertical />
                <div className="flex-1 overflow-y-auto max-h-screen ">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
