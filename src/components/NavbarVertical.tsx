"use client";
import React from 'react'
import { HomeIcon, PencilAltIcon } from '@heroicons/react/outline'
import Link from 'next/link';

const NavbarVertical = () => {

    const listVerical = [
        { name: "Home", icon: <HomeIcon className="size-6 text-gray-500 mr-3" />, link: "/" },
        { name: "Our Blog", icon: <PencilAltIcon className="size-6 text-gray-500 mr-3" />, link: "/ourblog" }
    ]

    return (
        <div className="bg-white max-h-screen w-[280px] shadow-xl z-0 hidden sm:block">
            {listVerical.map((item, index) => (
                <Link href={item.link} key={index}>
                    <button className=" flex flex-row my-1 p-3 rounded-xl w-full text-gray-500 font-semibold px-6 hover:bg-gray-200" key={index}>
                        {item.icon}
                        <div className="">
                            {item.name}
                        </div>
                    </button>
                </Link>
            ))}
        </div>
    )
}

export default NavbarVertical