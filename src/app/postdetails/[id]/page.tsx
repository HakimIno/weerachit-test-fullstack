"use client";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/outline";
import { useParams } from "next/navigation";
import { useGetAllPostById } from "@/hooks/usePosts";
import Link from "next/link";
import { getShortRelativeTime } from "@/utils/relativeTime";
import { useEffect, useState } from "react";
import { useCreateComment } from "@/hooks/useComment";
import { useGetUser } from "@/hooks/useUsers";
import Cookies from 'js-cookie'

export default function PostDetails() {
  const params = useParams();
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [content, setContent] = useState("")

  const username = Cookies.get('username');
  const { isPending, error, data } = useGetUser(String(username))

  const { isLoading: isLoadingPost, data: post } = useGetAllPostById({ id: Number(params?.id) })
  const { mutate, isPending: isComment, isSuccess } = useCreateComment();
  const handleSubmitComment = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("!content || !post?.data?.id || !user?.data?.id", content, post?.data?.id, data?.data?.user?.id);
    if (!content || !post?.data?.id || !data?.data?.user?.id) return
    const comment = {
      content,
      postId: post?.data?.id,
      authorId: data?.data?.user?.id
    }
    mutate(comment)
  };


  const handleModal = () => {
    setIsCommentModal(!isCommentModal);
  };

  useEffect(() => {
    if (isSuccess) {
      setContent("")
      setIsCommentModal(false)
    }
  }, [isSuccess])

  return (
    <Layout>
      <main className="flex flex-col bg-gray-100 w-full items-center h-svh">
        <div className="flex justify-between max-h-14 w-full max-w-7xl items-center mt-10 px-3 md:px-14 ">
          <Link className="btn btn-circle btn-outline hover:bg-[#243831]" href="/">
            <ArrowLeftIcon className="size-6 text-[#243831] hover:text-white" />
          </Link>
        </div>

        <div className="flex flex-col justify-center w-full max-w-7xl items-center mt-4 px-3 md:px-14">
          <div className="bg-white w-full rounded-tl-2xl rounded-tr-2xl ">
            {isLoadingPost ? (
              <div className="flex justify-center items-center h-screen">
                <span className="loading loading-infinity loading-lg text-[#3d8b58]"></span>
              </div>
            ) : <Post post={post?.data} />}

          </div>
        </div>
        <div className="flex flex-col justify-center w-full max-w-7xl items-start px-0 md:px-14 h-full min-h-full">
          <div className="bg-white w-full p-8 rounded-bl-2xl rounded-br-2xl h-full min-h-full">
            <button className="btn btn-outline btn-success md:hidden block" onClick={handleModal}>
              Add Comeents
            </button>

            <div className="md:block  hidden  h-[20%]">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="textarea textarea-success  bg-white block  w-full h-[70%]"
                placeholder="What't on your mind...">

              </textarea>
              <div className="flex flex-col md:flex-row justify-end items-center gap-5">
                <label
                  onClick={() => setIsCommentModal(false)}
                  className="btn order-none md:w-28 w-full bg-white border border-green-600  mt-3 hover:bg-white hover:border-green-600  text-[#49A569] rounded-lg px-6 py-0 text-md ">
                  Cancel
                </label>
                <label
                  onClick={handleSubmitComment}
                  className="btn order-none bg-[#49A569] hover:bg-[#3d8b58]  md:mt-3 mt-0 text-white rounded-lg px-6 py-0 text-md border-none md:w-28 w-full ">
                  {!isComment ? "Post" : <span className="loading loading-spinner loading-md"></span>}
                </label>
              </div>
            </div>

            {post?.data?.comments?.map((comment: any, index: number) => (
              <div key={index} className="flex gap-4 items-start my-6 ">
                <div className="avatar placeholder">
                  <div className=" bg-gray-200 text-neutral-content w-12 rounded-full">
                    <span className="text-3xl">{comment?.author?.username?.split("")[0]}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-3">
                  <div className="flex items-center">
                    <div className="text-lg font-semibold text-gray-700 me-6">
                      {comment?.author?.username} {"  "}
                    </div>
                    <span className="text-sm  font-normal">{getShortRelativeTime(comment?.updatedAt)}</span>
                  </div>
                  <p className="line-clamp-3 font-normal text-sm text-gray-700">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}


            <input
              type="checkbox"
              id="my_modal_7"
              className="modal-toggle"
              checked={isCommentModal}
              onChange={handleModal}
            />
            <div className="modal" role="dialog">
              <div className="modal-box bg-slate-50 w-[90%] max-w-4xl h-auto flex flex-col">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-2xl font-bold text-black">Create Post</h3>
                  <XIcon className="size-6 text-black cursor-pointer" onClick={() => setIsCommentModal(false)} />
                </div>

                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered mt-3 bg-white border border-gray-300 h-44"
                  placeholder="What't on your mind..."></textarea>

                <div className="flex flex-col md:flex-row justify-end items-center gap-5">
                  <label
                    onClick={() => setIsCommentModal(false)}
                    className="btn order-none md:w-28 w-full bg-white border border-green-600  mt-3 hover:bg-white hover:border-green-600  text-[#49A569] rounded-lg px-6 py-0 text-md ">
                    Cancel
                  </label>
                  <label
                    onClick={handleSubmitComment}
                    className="btn order-none bg-[#49A569] hover:bg-[#3d8b58]  md:mt-3 mt-0 text-white rounded-lg px-6 py-0 text-md border-none md:w-28 w-full ">
                    {!isComment ? "Post" : <span className="loading loading-spinner loading-md"></span>}
                  </label>
                </div>
              </div>
              <label className="modal-backdrop" htmlFor="my_modal_7" onClick={() => setIsCommentModal(false)}>Close</label>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}


