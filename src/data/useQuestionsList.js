
import useSWR from 'swr';
import API from './index';

export const useQuestionsList = () => {
    const { data, error, mutate } = useSWR( '/questions', API.fetcher );

    return {
        questions: data && data.data,
        isLoading: !error && !data,
        isError: error,
        mutate
    };
};
