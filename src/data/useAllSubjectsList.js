import useSWR from 'swr';
import API from './index';

export const useAllSubjectsList = () => {
  const { data, error, mutate } = useSWR( '/subjects', API.fetcher );

  return {
    subjects: data && data.data,
    isLoadingS: !error && !data,
    isErrorS: error,
    mutate
  };
};
