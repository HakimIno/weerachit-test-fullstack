"use client";

import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { redirect } from "next/navigation";
import { useCreateUserLogin } from '@/hooks/useUsers';

export default function Signin() {
    const [username, setUsername] = useState('');
    const { mutate, isPending, isSuccess } = useCreateUserLogin();
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        mutate({ username })
    };

    useEffect(() => {
        if (isSuccess) {
            redirect("/")
        }
    }, [isSuccess])

    return (
        <div className="flex items-center justify-center h-screen bg-[#243831]">
            <div className="flex flex-col md:flex-row w-full justify-around items-center h-screen">

                <div className="order-2 md:order-1 w-full md:w-[60%] h-screen justify-center items-center flex flex-col">
                    <div className="p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-semibold text-white mb-10">Sign in</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full p-3 border border-gray-300 rounded-[8px] mb-4 focus:outline-none focus:border-green-500"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="w-full p-3 bg-[#4AA569] text-white rounded-[8px] hover:bg-[#4AA569] transition duration-300"
                            >
                                {!isPending ? "Sign In" : "Loading..."}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="order-1 md:order-2 rounded-bl-[36px] md:rounded-bl-[36px] rounded-tl-[0px] md:rounded-tl-[36px] rounded-br-[36px] md:rounded-tr-[0px] w-full md:w-[40%] h-[60%] md:h-screen bg-[#2B5F44] justify-center flex flex-col">
                    <div className="flex flex-col items-center">
                        <img
                            src="https://s3-alpha-sig.figma.com/img/0fbc/43f4/9761bea793b24e9f6af1620580a39d2f?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KOT3DKtDFD6tCF3MF21LiY6HJVwamyCdTxRsdDiMSg1uvoR5-mVaZQ-5YbnNFe4YtLWYI9CybKRmmopy20PKR1yVpLHCKJZIg~xWQNcu2MlAI1SZ0VdLOm9w6lduM8o32eDmUbSgaq1L02~br7Z2MIvxZlxISfxNI7hgNWkOqMYc7nyZzGoW4ztCPmz3U~linDZp54c1X5gEAkwim4J2glANYGCcZwZIJKZy-MUkef0PGrtW~uPTnHeEmtV2bMssVBzcS4kddM2yVRvaPULk5SgM3EEXcL~wVLcQ9CjuW3m4k93~r2-srZjMa44udRAaBREKn~xZyG2z-1dVK6mbUA__"
                            alt="Board"
                            className="h-[230px] w-[300px]"
                        />
                        <h1 className="mt-4 text-xl font-semibold text-white">a Board</h1>
                    </div>
                </div>
            </div>
            <Toaster />
        </div>

    )
}
