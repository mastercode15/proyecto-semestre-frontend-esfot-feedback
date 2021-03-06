import useSWR from 'swr';
import API from './index';

export const useSubjectsList = () => {
  const { data, error, mutate } = useSWR( '/users/subjects', API.fetcher );

  return {
    subjects: data && data.data,
    isLoadingS: !error && !data,
    isErrorS: error,
    mutate
  };
};
