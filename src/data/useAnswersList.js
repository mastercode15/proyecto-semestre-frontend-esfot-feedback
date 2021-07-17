
import useSWR from 'swr';
import API from './index';

export const useAnswersList = () => {
    const { data, error, mutate } = useSWR('/answers', API.fetcher);

    return {
        answers: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
