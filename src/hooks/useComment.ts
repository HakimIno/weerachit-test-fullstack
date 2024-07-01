import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface ICOMMENT {
    content: string;
    postId: number;
    authorId: number;
}

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (commentBody: ICOMMENT) => {
            return axios.post('http://localhost:8800/comment', commentBody);
        },
        onSuccess: ({ data }) => {
            toast.success('Successfully Comment!');
            queryClient.invalidateQueries({ queryKey: ['postsId'] });
        },
        onError: () => {
            toast.error('Failed to Comment!');
        },
    });
};