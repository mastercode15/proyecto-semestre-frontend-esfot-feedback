/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useSubjectsList = () => {
  const { data, error, mutate } = useSWR( '/subjects', API.fetcher );

  return {
    subjects: data && data.data,
    isLoading: !error && !data,
    isError: error,
    mutate
  };
};
