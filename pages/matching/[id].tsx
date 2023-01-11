import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { useGetSalesPostList, useGetSalesPostInfo, useSetSalesPostState } from 'apiHooks/salesPost';
import { useSetSuggestState } from 'apiHooks/suggests';

import Header from 'components/matching/Header';
import PriceInfo from 'components/matching/PriceInfo';
import UserProfile from 'components/common/UserProfile';
import SaleInfoContainer from 'components/common/SaleInfoContainer';
import SuggestContainer from 'components/matching/SuggestContainer';
import SuggestTab from 'components/matching/SuggestTab';
import SortOption from 'components/matching/SortOption';
import ItemContainer from 'components/matching/ItemContainer';
import SuggestItem from 'components/matching/SuggestItem';
import BigButton from 'components/common/BigButton';
import Modal from 'components/common/Modal';
import ToastMessage from 'components/common/ToastMessage';
import NoItem from 'components/matching/NoItem';
import DeliverInfoModal from 'components/matching/DeliverInfoModal';

export default function matching() {
  const [isClicked, setIsClicked] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeliverInfoModalOpen, setIsDeliverInfoModalOpen] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isSuggested, setIsSuggested] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isBuyConfirmModalOpen, setIsBuyModalConfirmOpen] = useState(false);

  // 스크롤 감지
  const handleScrollHeight = () => {
    setScrollHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollHeight);
    return () => {
      window.removeEventListener('scroll', handleScrollHeight);
    };
  }, []);

  // 서버 통신 로직
  // const { data: shippingInfo } = useGetShippingInfo(13, isDeliverInfoModalOpen);
  const { data: salesPostInfo } = useGetSalesPostInfo(2);
  const { data: salesPostList } = useGetSalesPostList(2, isMatched);
  const { mutate: handleSaleCancelButton } = useSetSalesPostState(2);
  const { mutate: handleClickSuggestConfirmButton } = useSetSuggestState(2, 3);

  // 누르면 각각 구매 중, 구매 완료 리스트 조회
  const handleOptionTab = () => {
    setIsClicked((prev) => !prev);
    setIsMatched((prev) => !prev);
  };

  const handleClickCancelButton = () => {
    setIsModalOpen(true);
  };

  const handleClickCloseButton = () => {
    setIsModalOpen(false);
  };

  const handleSuggetButton = () => {
    setIsSuggested(true);
    setTimeout(() => {
      setIsSuggested(false);
    }, 2000);
  };

  // 운송장 입력 페이지로 이동
  const handleInvoicePutButton = (id: number) => {
    Router.push({
      pathname: `/suggests/${id}/invoice`,
      query: { suggestId: id },
    });
  };

  const setButtonFunc = (isOwner: boolean, isMine: boolean, status: number, id: number) => {
    if (isOwner) {
      switch (status) {
        case 1:
          return;
        case 2:
          return [() => setIsDeliverInfoModalOpen((prev) => !prev), () => handleInvoicePutButton(id)];
        case 3:
          return [() => setIsDeliverInfoModalOpen((prev) => !prev)];
      }
    } else {
      if (isMine) {
        switch (status) {
          case 1:
            return;
          case 2:
            return [
              () =>
                Router.push({
                  pathname: `/suggests/${id}/invoiceInfo`,
                  query: { id: id },
                }),
              () => setIsBuyModalConfirmOpen((prev) => !prev),
            ];
          case 3:
            return [
              () =>
                Router.push({
                  pathname: `/suggests/${id}/invoiceInfo`,
                  query: { id: id },
                }),
            ];
        }
      }
    }
  };

  return (
    <Root>
      <Header
        isMine={salesPostInfo?.data.data.isMine}
        modalOpenFunc={handleClickCancelButton}
        suggestId={salesPostInfo?.data.data.id}
      />
      <UserProfile
        profileImageUrl=""
        nickname={salesPostInfo?.data.data.sellor.nickName}
        socialId={salesPostInfo?.data.data.sellor.socialId}
      />
      <PriceInfo highestPrice={salesPostInfo?.data.data.highestPrice} />
      <SaleInfoContainer
        productCount={salesPostInfo?.data.data.productCount}
        salesOption={salesPostInfo?.data.data.salesOption === 'BULK' ? '일괄 판매만' : '일괄 또는 일부'}
        priceOption={salesPostInfo?.data.data.priceOption === 'PRICE_OFFER' ? '제시가격' : '지정가격'}
      />
      <SuggestContainer>
        <SuggestTab options={['매칭 중인 목록', '매칭 완료 목록']} outerFunc={handleOptionTab} isClicked={isClicked} />
        <SortOption optionText="구매 희망" optionNum={salesPostList?.data.data.length} />
        <ItemContainer>
          {!salesPostInfo?.data.data.productCount && <NoItem />}
          {salesPostList?.data.data.map((item: any) => (
            <>
              <SuggestItem
                itemSize={item.purchaseOption === 'BULK' ? 'small' : 'big'}
                description={item.description}
                status={item.status}
                isOwner={salesPostInfo?.data.data.isMine}
                isMine={item.isMine}
                key={item.id}
                element={item}
                outerFunc={setButtonFunc(salesPostInfo?.data.data.isMine, item.isMine, item.status, item.id)}
              />
              {isDeliverInfoModalOpen && (
                <DeliverInfoModal
                  closeButtonFunc={setIsDeliverInfoModalOpen}
                  scrollHeight={scrollHeight}
                  suggestId={item.id}
                  isDeliverInfoModalOpen={isDeliverInfoModalOpen}
                />
              )}
            </>
          ))}
          <div style={{ height: '500px' }}></div>
        </ItemContainer>
      </SuggestContainer>
      {isSuggested && <ToastMessage text="판매글에 구매를 제시했어요!" />}
      {!salesPostInfo?.data.data.isMine && (
        <BigButton text="구매 제시하기" isDisabled={false} onClick={handleSuggetButton} />
      )}
      {isModalOpen && (
        <Modal
          title="판매를 종료하시겠어요?"
          content="판매를 종료하면 더 이상 매칭이 불가능해요<br/>
        상품판매를 모두 마친 후에 판매를 종료해주세요"
          buttonFirstTitle="취소"
          buttonSecondTitle="확인"
          buttonFirstFunction={handleClickCloseButton}
          buttonSecondFunction={handleSaleCancelButton}
        />
      )}
      {isBuyConfirmModalOpen && (
        <Modal
          title="구매를 확정하시겠어요?"
          content="상품을 받으셨나요?<br/>
        상품을 받고나서 구매를 확정해주세요"
          buttonFirstTitle="취소"
          buttonSecondTitle="확인"
          buttonFirstFunction={() => setIsBuyModalConfirmOpen((prev) => !prev)}
          buttonSecondFunction={() => {
            handleClickSuggestConfirmButton();
            setIsBuyModalConfirmOpen(false);
          }}
        />
      )}
      {isBuyConfirmModalOpen && (
        <Modal
          title="구매를 확정하시겠어요?"
          content="상품을 받으셨나요?<br/>
                            상품을 받고나서 구매를 확정해주세요"
          buttonFirstTitle="취소"
          buttonSecondTitle="확인"
          buttonFirstFunction={() => setIsBuyModalConfirmOpen((prev) => !prev)}
          buttonSecondFunction={() => {
            handleClickSuggestConfirmButton();
            setIsBuyModalConfirmOpen(false);
          }}
        />
      )}
    </Root>
  );
}

const Root = styled.section`
  position: relative;
  margin-top: 6rem;
`;
