import useSWR from 'swr';
import API from './index';

export const useAllStudents = () => {
  const { data, error, mutate } = useSWR( '/students', API.fetcher );

  return {
    allStudents: data && data.data,
    isLoadingAS: !error && !data,
    isErrorAS: error,
    mutate
  };
};
