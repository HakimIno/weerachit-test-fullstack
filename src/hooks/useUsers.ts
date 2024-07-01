import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';

export interface IUSERS {
    username: string
}

export const useCreateUserLogin = () => {
    return useMutation({
        mutationFn: (username: IUSERS) => {
            return axios.post('http://localhost:8800/users/login', username)
        },
        onSuccess: ({ data }) => {
            Cookies.set('username', data.user.username, { expires: 7 })
            toast.success('Successfully Create Users! ')
        },
        onError: () => {
            toast.error('Field Create Users!')
        }
    })
};

export const useGetUser = (username: string) => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => {
            return axios.get(`http://localhost:8800/users/?username=${username}`)
        },
    })
};

