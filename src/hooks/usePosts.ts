import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface IPOSTS {
    title: string;
    content: string;
    authorId: number;
    tags?: string[];
}



export const useGetAllPostsMe = (userId: string) => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => {
            return axios.get(`http://localhost:8800/posts/me/${userId}`)
        },
    })
};

export const useGetAllPosts = () => {
    return useQuery({
        queryKey: ['postsMe'],
        queryFn: () => {
            return axios.get(`http://localhost:8800/posts`)
        },
    })
};

export const useGetAllPostById = ({ id }: { id: number }) => {
    return useQuery({
        queryKey: ['postsId'],
        queryFn: () => {
            return axios.get(`http://localhost:8800/posts/${id}`)
        },
    })
};


export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (postBody: IPOSTS) => {
            return axios.post('http://localhost:8800/posts', postBody);
        },
        onSuccess: ({ data }) => {
            toast.success('Successfully Created Post!');
            queryClient.invalidateQueries({ queryKey: ['postsMe', "posts"] });
        },
        onError: () => {
            toast.error('Failed to Create Post!');
        },
    });
};

export const useUpdatePost = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (updateBody: IPOSTS) => {
            return axios.put(`http://localhost:8800/posts/${id}`, updateBody);
        },
        onSuccess: ({ data }) => {
            toast.success('Successfully Update Post!');
            queryClient.invalidateQueries({ queryKey: ['postsMe'] });
        },
        onError: () => {
            toast.error('Failed to Update Post!');
        },
    });
};

export const useDeletePost = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => {
            return axios.delete(`http://localhost:8800/posts/${id}`);
        },
        onSuccess: ({ data }) => {
            toast.success('Successfully Delete Post!');
            queryClient.invalidateQueries({ queryKey: ['postsMe', "posts"] });
        },
        onError: () => {
            toast.error('Failed to Delete Post!');
        },
    });
};