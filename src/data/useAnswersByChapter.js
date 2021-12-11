/**
 * Created by chalosalvador on 8/18/20
 */
import useSWR from 'swr';
import API from './index';

export const useAnswersByChapter = (id) => {
  const { data, error, mutate } = useSWR( `/chapter/${id}/answers`, API.fetcher );

  return {
    answersByChapter: data && data.data,
    isLoadingC: !error && !data,
    isErrorC: error,
    mutate
  };
};
