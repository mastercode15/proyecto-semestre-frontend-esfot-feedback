import useSWR from "swr";
import API from "./index";

export const useCategoriesByUser = () => {
    const { data, error, mutate } = useSWR( '/user/categories', API.fetcher );

    return {
        categories: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
