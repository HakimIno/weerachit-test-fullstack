"use client";

import { useGetUser } from '@/hooks/useUsers';
import { HomeIcon, PencilAltIcon, ArrowRightIcon, MenuIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import Cookies from 'js-cookie'

const Navbar = () => {
    const router = useRouter();
    const listVerical = [
        { name: "Home", icon: <HomeIcon className="size-6 text-white mr-3" /> },
        { name: "Our Blog", icon: <PencilAltIcon className="size-6 text-white mr-3" /> }
    ]
    const username = Cookies.get('usernamex');
    const { isPending, error, data } = useGetUser(String(username))



    return (
        <div className="navbar bg-[#243831] fixed z-10 top-0 left-0 right-0">
            <div className="flex-1 ml-3">
                <a className="btn btn-ghost text-xl text-white">a Board</a>
            </div>
            <div className="flex-none mr-3">
                {!data?.data.user ? (
                    <button
                        onClick={() => router.push("/signin")}
                        className="py-2 px-6 bg-[#49A569] hover:bg-[#3d8b58] text-white rounded-lg hidden md:block"
                    >
                        {isPending ? "กำลังโหลด..." : "Sign in"}
                    </button>
                ) : (
                    <div className="flex items-center gap-5">
                        <div className="text-white text-md">{data?.data?.user?.username}</div>
                        <div className="avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="drawer drawer-end block md:hidden">
                    <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content ">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-4" className="drawer-button btn bg-[#243831] border-none" >
                            <MenuIcon className="size-7 text-white" />
                        </label>
                    </div>
                    <div className="drawer-side ">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu text-base-content min-h-full w-72 p-4 bg-[#243831]">
                            <label
                                htmlFor="my-drawer-4"
                                aria-label="close sidebar"
                                className="drawer-overlay btn btn-square flex md:hidden bg-[#243831] items-center justify-center border-none "
                            >
                                <ArrowRightIcon className="size-6 text-white" />
                            </label>

                            {listVerical.map((item, index) => (
                                <button className="flex flex-row my-1 p-3 rounded-xl w-full text-white font-semibold px-6 hover:bg-[#16231e]" key={index}>
                                    {item.icon}
                                    <div className="">
                                        {item.name}
                                    </div>
                                </button>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Navbar