/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useSubjectChapters= ( id ) => {
  const { data, error, mutate } = useSWR( () => `/subjectChapters/${id}`, API.fetcher );
  return {
    subjectChapters: data && data.data,
    isLoadingC: !error && !data,
    isErrorC: error,
    mutate
  };
};
