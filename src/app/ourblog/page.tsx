"use client";
import Layout from '@/components/Layout';
import Post from '@/components/Post';

import { CheckIcon, ChevronDownIcon, PlusIcon, SearchIcon, XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import { useGetUser } from '@/hooks/useUsers';
import { useCreatePost, useDeletePost, useGetAllPosts, useGetAllPostsMe, useUpdatePost } from '@/hooks/usePosts';
import { Toaster } from 'react-hot-toast';
export default function Ourblog() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [selectedCommunities, setSelectedCommunities] = useState<string[]>([]);
    const [selectedCommu, setSelectedCommu] = useState<string>("History");
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const toggleSearchBar = () => {
        setIsVisible(!isVisible);
    };

    const list = [
        "History",
        "Food",
        "Pets",
        "Health",
        "fashion",
        "Exercise",
        "others"
    ]

    const [typeModal, setTypeModal] = useState("")
    const [selectId, setSelectId] = useState(null)
    const username = Cookies.get('username');
    const { isPending, error, data } = useGetUser(String(username))
    const { isLoading: isLoadingPosts, data: posts } = useGetAllPostsMe(data?.data?.user?.id)

    const { mutate, isPending: isCreatePost, isSuccess } = useCreatePost();
    const { mutate: mutateUpdatePost, isPending: isUpdatePost, isSuccess: isSuceessPost } = useUpdatePost(Number(selectId))
    const { mutate: mutatedeletePost, isPending: isPendingDeletePost, isSuccess: isSuccessDelete } = useDeletePost(Number(selectId))


    const handleCreate = async () => {
        if (!data?.data.user && isPending) {
            router.push("/signin")
        }
        if (isPending) return

        setTypeModal("Create")
        setIsCreateModal(true);
    };

    const handleUpdate = async (id: any) => {
        if (!data?.data.user && isPending) {
            router.push("/signin")
        }
        if (isPending) return


        setSelectId(id)
        setTypeModal("Edit")
        setIsCreateModal(true);
    };

    const handleDelete = async (id: any) => {
        if (!data?.data.user && isPending) {
            router.push("/signin")
        }
        if (isPending) return

        setSelectId(id)
        setIsDeleteModal(true)
    };

    const handleModal = () => {
        setIsCreateModal(!isCreateModal);
    };
    const handleModalDelete = () => {
        setIsDeleteModal(!isDeleteModal);
    };

    const handleCheckboxChange = (item: string) => {
        if (selectedCommunities.includes(item)) {
            setSelectedCommunities(selectedCommunities.filter((community) => community !== item));
        } else {
            setSelectedCommunities([...selectedCommunities, item]);
        }
    };

    const handleSubmitCreate = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!data?.data?.user || !title || !content || selectedCommunities.length === 0) return
        const createPost = {
            title,
            content,
            tags: selectedCommunities,
            authorId: data?.data?.user?.id
        }
        mutate(createPost)
    };

    const handleSubmitUpdate = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (!data?.data?.user || !title || !content || selectedCommunities.length === 0) return
        const createPost = {
            title,
            content,
            tags: selectedCommunities,
            authorId: data?.data?.user?.id
        }
        mutateUpdatePost(createPost)
    };

    const handleSubmitDelete = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        mutatedeletePost()
    };

    const handleItemClick = (item: React.SetStateAction<string>) => {
        setSelectedCommu(item);
    };


    useEffect(() => {
        if (isSuccess) {
            setTitle("")
            setContent("")
            setSelectedCommunities([])
            setIsCreateModal(false)
        }
    }, [isSuccess])

    useEffect(() => {
        if (isSuceessPost) {
            setTitle("")
            setContent("")
            setSelectedCommunities([])
            setIsCreateModal(false)
            setSelectId(null)
        }
    }, [isSuceessPost])

    useEffect(() => {
        if (isSuccessDelete) {
            setIsDeleteModal(false)
            setSelectId(null)
        }
    }, [isSuccessDelete])

    const postsData = posts?.data.filter((item: { tags: string | string[]; }) => item.tags.includes(selectedCommu));


    return (
        <Layout>
            <main className="flex flex-col  w-full  items-center">
                <div className="flex justify-between max-h-14 w-full max-w-7xl items-center mt-4 px-3 md:px-14 ">
                    {/* Icon สำหรับมือถือ */}
                    <button
                        className="btn btn-square flex md:hidden bg-[#f3f3f3] items-center justify-center border-none"
                        onClick={toggleSearchBar}
                    >
                        {!isVisible ? <SearchIcon className="size-6 text-black" /> : <XIcon className="size-6 text-black" />}
                    </button>

                    {/* <!-- Label สำหรับการค้นหาในหน้าจอที่ใหญ่กว่า --> */}
                    <label className="input input-bordered items-center gap-2 w-[70%] bg-gray-100 border border-gray-300 text-black hidden md:flex">
                        <SearchIcon className="size-6 text-black" />
                        <input type="text" className="grow bg-gray-100" placeholder="Search" />
                    </label>

                    <div className="">
                        <div className="dropdown dropdown-end ">
                            <div tabIndex={0} role="button" className="btn m-1 bg-gray-100  border-none hover:bg-gray-100 flex flex-row mr-3">
                                <h1 className="text-gray-800">Community</h1>
                                <ChevronDownIcon className="size-4 text-gray-800" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-white ">
                                {list.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`hover:bg-[#D8E9E4] rounded-md cursor-pointer ${selectedCommu === item ? 'bg-green-100' : ''
                                            } `}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <a className="text-black flex items-center justify-between">
                                            {item}
                                            {selectedCommu === item && (
                                                <CheckIcon className='text-green-600 size-4' />
                                            )}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <label
                            onClick={handleCreate}
                            className="btn order-none bg-[#49A569] hover:bg-[#3d8b58] text-white rounded-lg px-6 py-0 text-md border-none ">
                            Create
                            <PlusIcon className="size-4 text-white" />
                        </label>
                    </div>
                </div>


                <label className={`input input-bordered items-center mt-2 gap-2 w-[92%] bg-gray-100 border border-gray-300text-black ${isVisible ? 'flex md:hidden' : 'hidden'}`}>
                    <SearchIcon className="size-6 text-black" />
                    <input type="text" className="grow bg-gray-100" placeholder="Search" />
                </label>

                <div className={`flex flex-col  w-full max-w-7xl items-center mt-4 px-3 md:px-14 ${isLoadingPosts ? 'h-screen' : 'min-h-screen'}`}>
                    <div className="bg-white w-full rounded-2xl min-h-full">
                        {isLoadingPosts ? (
                            <div className="flex justify-center items-center h-full">
                                <span className="loading loading-infinity loading-lg text-[#3d8b58]"></span>
                            </div>
                        ) : (
                            postsData?.map((post: { id: any; }) => (
                                <Post key={post.id} post={post} handleUpdate={handleUpdate} handleDelete={handleDelete} />
                            ))
                        )}
                    </div>
                </div>

                <input
                    type="checkbox"
                    id="my_modal_7"
                    className="modal-toggle"
                    checked={isCreateModal}
                    onChange={handleModal}
                />
                <div className="modal" role="dialog">
                    <div className="modal-box bg-slate-50 w-[90%] max-w-4xl h-auto flex flex-col">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className="text-2xl font-bold text-black">{typeModal} Post</h3>
                            <XIcon className="size-6 text-black cursor-pointer" onClick={() => setIsCreateModal(false)} />
                        </div>
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn m-1 border border-green-600 bg-white text-green-600 hover:border-green-600 hover:bg-slate-200 mt-3">
                                Choose a Community
                                <ChevronDownIcon className="size-4 text-green-600" />
                            </div>
                            <ul className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-white">
                                {list.map((item, index) => (
                                    <li key={index} className="hover:bg-[#D8E9E4] rounded-md">
                                        <label className="flex items-center justify-between">
                                            <span className="text-black">{item}</span>
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-success bg-white border border-green-600 text-green-500"
                                                checked={selectedCommunities.includes(item)}
                                                onChange={() => handleCheckboxChange(item)}
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-2 my-3">
                            {selectedCommunities.map((item) => (
                                <div className="p-2 bg-white rounded-full text-sm text-[#49A569] border-2 border-[#49A569]">
                                    {item}
                                </div>
                            ))}
                        </div>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                            className="input input-bordered w-full mt-3 bg-white border border-gray-300" />
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="textarea textarea-bordered mt-3 bg-white border border-gray-300 h-44"
                            placeholder="What't on your mind..."></textarea>

                        <div className="flex flex-col md:flex-row justify-end items-center gap-5">
                            <label
                                onClick={() => setIsCreateModal(false)}
                                className="btn order-none md:w-28 w-full bg-white border border-green-600  mt-3 hover:bg-white hover:border-green-600  text-[#49A569] rounded-lg px-6 py-0 text-md ">
                                Cancel
                            </label>
                            <label
                                onClick={typeModal === "Create" ? handleSubmitCreate : handleSubmitUpdate}
                                className="btn order-none bg-[#49A569] hover:bg-[#3d8b58]  md:mt-3 mt-0 text-white rounded-lg px-6 py-0 text-md border-none md:w-28 w-full ">
                                {!isCreatePost ? "Post" : <span className="loading loading-spinner loading-md"></span>}
                            </label>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7" onClick={() => setIsCreateModal(false)}>Close</label>
                </div>


                <input
                    type="checkbox"
                    id="my_modal_7"
                    className="modal-toggle"
                    checked={isDeleteModal}
                    onChange={handleModalDelete}
                />
                <div className="modal" role="dialog">
                    <div className="modal-box bg-slate-50 w-[100%] max-w-xl h-auto flex flex-col">
                        <div className="flex flex-col justify-center items-center">
                            <h5 className="text-xl font-bold text-black text-center">
                                Please confirm if you wish to
                                delete the post
                            </h5>
                            <p className='text-center'>
                                Are you sure you want to delete the post? Once deleted, it cannot be recovered.
                            </p>
                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-5 mt-3">
                            <label
                                onClick={() => setIsDeleteModal(false)}
                                className="btn order-none md:w-[50%] w-full bg-white border border-black  mt-3 hover:bg-white hover:border-green-600  text-black rounded-lg px-6 py-0 text-md ">
                                Cancel
                            </label>
                            <label
                                onClick={handleSubmitDelete}
                                className="btn order-none bg-red-600 hover:bg-red-800  md:mt-3 mt-0 text-white rounded-lg px-6 py-0 text-md border-none md:w-[50%] w-full ">
                                {!isPendingDeletePost ? "Delete" : <span className="loading loading-spinner loading-md"></span>}
                            </label>
                        </div>
                    </div>
                    <label className="modal-backdrop" htmlFor="my_modal_7" onClick={() => setIsCreateModal(false)}>Close</label>
                </div>
                <Toaster />
            </main>
        </Layout >
    );
}


