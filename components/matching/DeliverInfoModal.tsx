import { AxiosResponse } from 'axios';
import React from 'react';
import styled from 'styled-components';

import XIcon from '../../public/assets/icons/X.svg';

interface DeliverInfoModal {
  shippingInfo: AxiosResponse<any, any> | undefined;
  closeButtonFunc: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeliverInfoModal({ shippingInfo, closeButtonFunc }: DeliverInfoModal) {
  return (
    <ModalContainer>
      <Modal>
        <ModalHeader>
          <HeaderText>배송 정보 확인</HeaderText>
          <XIcon onClick={() => closeButtonFunc(false)} />
        </ModalHeader>
        <InfoContainer>
          <ContentContainer>
            <ContentProperty>배송 옵션</ContentProperty>
            <ContentText>{shippingInfo?.data.data.shippingOption.name}</ContentText>
          </ContentContainer>
          <ContentContainer>
            <ContentProperty>배송 금액</ContentProperty>
            <ContentText>{shippingInfo?.data.data.shippingOption.price} 원</ContentText>
          </ContentContainer>
          <ContentContainer>
            <ContentProperty>총 금액</ContentProperty>
            <ContentText>{shippingInfo?.data.data.totalPrice} 원</ContentText>
          </ContentContainer>
        </InfoContainer>
        <InfoContainer>
          <ContentContainer>
            <ContentProperty>받는 분</ContentProperty>
            <ContentText>{shippingInfo?.data.data.suggester.shippingInfo.receiverName}</ContentText>
          </ContentContainer>
          <ContentContainer>
            <ContentProperty>전화번호</ContentProperty>
            <ContentText>{shippingInfo?.data.data.suggester.phoneNumber}</ContentText>
          </ContentContainer>
          <ContentContainer>
            <ContentProperty>택배주소</ContentProperty>
            <ContentText>{shippingInfo?.data.data.suggester.shippingInfo.cuStoreName}</ContentText>
          </ContentContainer>
        </InfoContainer>
      </Modal>
    </ModalContainer>
  );
}

const ModalContainer = styled.section`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 1.6rem;

  background-color: rgba(0, 0, 0, 0.7);
`;
const Modal = styled.article`
  width: 100%;

  padding: 3.2rem 2rem 0;

  background-color: ${({ theme }) => theme.colors.grey_popup};

  font-weight: 700;

  border-radius: 0.8rem;

  & > section:nth-child(2) {
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray0};
  }
`;

const ModalHeader = styled.section`
  position: relative;

  svg {
    position: absolute;
    right: 0;
    top: -0.5rem;
  }
`;

const HeaderText = styled.p`
  font-size: 1.6rem;
  line-height: 1.9rem;

  text-align: center;

  color: ${({ theme }) => theme.colors.white};
`;

const InfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 3.2rem 0;
`;

const ContentContainer = styled.section`
  display: flex;
  justify-content: space-between;

  font-size: 1.4rem;
  line-height: 1.7rem;
`;

const ContentProperty = styled.p`
  color: ${({ theme }) => theme.colors.gray2};

  text-align: left;
`;

const ContentText = styled.p`
  color: ${({ theme }) => theme.colors.gray3};

  text-align: right;
`;