/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useSubjectsListChapters = () => {
  const { data, error, mutate } = useSWR( '/answers', API.fetcher );

  return {
    chapterBySubjects: data && data.data,
    isLoadingS: !error && !data,
    isErrorS: error,
    mutate
  };
};
