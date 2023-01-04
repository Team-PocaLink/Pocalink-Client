import React, { useState } from 'react';
import styled from 'styled-components';
import { TITLE, MENU } from 'constants/headerMessage';
import Header from 'components/common/Header';
import BigButton from 'components/common/BigButton';
import LimitOrderContainer from 'components/offer/buy/LimitOrderContainer';
import AllowOfferContainer from 'components/offer/buy/AllowOfferContainer';
import DeliveryChoice from 'components/offer/buy/DeliveryChoice';

export default function buy() {
  const [isLimitOrder, setIsLimitOrder] = useState(false);

  return (
    <Root>
      <Header title={TITLE.OFFER_TO_SELLER} rightButtonText={MENU.BACK} isHavingBackButton />
      {isLimitOrder ? <LimitOrderContainer /> : <AllowOfferContainer />}
      <DeliveryChoice />
      {/* //TODO: 해당 버튼 온클릭시 리코일 전역 상태에 데이터 전달 */}
      <BigButton text="다음" isDisabled={false} />
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextContainer = styled.div`
  margin-bottom: 2.4rem;
`;