import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getCertificationWord,
  setSalesPost,
  getSalesPostList,
  getSalesPostInfo,
  setSalesPostState,
} from 'api/salesPost';
import { salesPostType } from 'types/recoil/salesPost';

export const useGetCertificationWord = () => {
  return useQuery(['get/certificationWord'], getCertificationWord, {
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useSetSalesPost = (salesPostInfo: salesPostType) => {
  return useMutation(() => setSalesPost(salesPostInfo), {
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetSalesPostList = (salesPostId: number, isMatched: boolean) => {
  return useQuery(['get/salesposts', salesPostId, isMatched], () => getSalesPostList(salesPostId, isMatched), {
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useGetSalesPostInfo = (salesPostId: number) => {
  return useQuery(['get/salesposts/:salespostId'], () => getSalesPostInfo(salesPostId), {
    onError: (error) => {
      console.error(error);
    },
  });
};

export const useSetSalesPostState = (salesPostId: number) => {
  return useMutation(() => setSalesPostState(salesPostId), {
    onError: (error) => {
      console.error(error);
    },
  });
};
