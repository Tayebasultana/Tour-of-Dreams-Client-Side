import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://tour-of-dreams-server-side.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;