import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStory = () => {
    const axiosPublic = useAxiosPublic();

    // Using react-query to fetch story data
    const { data: stories = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['stories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/stories');
            return res.data;
        }
    });

    // Returning the stories, loading, and refetch state
    return [stories, isLoading, isError, refetch];
}

export default useStory;
