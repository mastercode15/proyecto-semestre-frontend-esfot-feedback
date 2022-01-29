import useSWR from 'swr';
import API from './index';

export const useAllTeachers = () => {
  const { data, error, mutate } = useSWR( '/teachers', API.fetcher );

  return {
    allTeachers: data && data.data,
    isLoadingAT: !error && !data,
    isErrorAT: error,
    mutate
  };
};
