import { getShortRelativeTime } from "@/utils/relativeTime";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    post: any,
    handleUpdate?: (id: number) => void;
    handleDelete?: (id: number) => void;
}

const Post = ({ post, handleUpdate, handleDelete }: Props) => {
    const pathName = usePathname();

    return (
        <div className="border-b p-4 px-8">
            {pathName.includes("ourblog") && (
                <div className="flex justify-end w-full">
                    <div className="flex gap-4">
                        <PencilAltIcon className="size-6 text-black cursor-pointer" onClick={() => handleUpdate && handleUpdate(post.id)} />
                        <TrashIcon className="size-6 text-black cursor-pointer" onClick={() => handleDelete && handleDelete(post.id)} />
                    </div>
                </div>
            )}
            {/* profile */}
            <div className="flex gap-4 items-center my-4">
                <div className="avatar placeholder">
                    <div className={`bg-green-500 text-green-800  w-12 rounded-full`}>
                        <span className="text-2xl">{post?.author?.username.split("")[0]}</span>
                    </div>
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <div className="text-lg">
                        {post?.author?.username}
                    </div>
                    <span className="text-sm  font-normal">{getShortRelativeTime(post?.updatedAt)}</span>
                </div>
            </div>

            {/* Tag */}
            <div className="flex flex-row gap-3">
                {post?.tags?.map((itag: string, index: number) => (
                    <div key={index} className="p-1 px-2 bg-[#F3F3F3] w-fit rounded-full text-gray-900 text-sm">
                        {itag}
                    </div>
                ))}
            </div>


            {/* Body */}
            <article className="">
                <Link href={`/postdetails/${post?.id}`}>
                    <h3 className="text-2xl text-gray-900 my-2 ">{post?.title}</h3>
                </Link>
                <p className="line-clamp-2">{post?.content}</p>
                {/* comments */}
                <div className="flex flex-row items-center gap-2 mt-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
                    </svg>
                    <p>{post?.comments?.length} comments</p>
                </div>
            </article>
        </div>
    );
}

export default Post