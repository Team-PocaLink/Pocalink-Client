import React, { useState } from 'react';
import styled from 'styled-components';
import Header from 'components/common/Header';
import BigButton from 'components/common/BigButton';
interface TextLengthProps {
  currentTextLength: number;
}

export default function write() {
  const [currentTextLength, setCurrentTextLength] = useState(0);
  const handlecurrentTextLength = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentTextLength(e.target.value.length);
  };
  return (
    <Root>
      <Header title="판매글 작성하기" isHavingBackButton={true} rightButtonText="취소" />
      <StyledImagePopUpConatiner>
        <img alt="판매사진" />
      </StyledImagePopUpConatiner>
      <StyledWriteContainer
        placeholder="판매하는 상품에 대해서 설명해주세요 자세한 설명을 통해 빠르게 매칭될 수 있어요"
        maxLength={500}
        onChange={handlecurrentTextLength}></StyledWriteContainer>
      <StyledTextLength currentTextLength={currentTextLength}>
        <strong>{currentTextLength}</strong>
        /500
      </StyledTextLength>
      <BigButton text="등록하기" isDisabled={false} onClick={() => {}} />
    </Root>
  );
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledImagePopUpConatiner = styled.section`
  width: 35.8rem;
  height: 24.2rem;
  margin-top: 1.8rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.grey_popup};

  & > img {
    width: 35.8rem;
    height: 20.2rem;
  }
`;

const StyledWriteContainer = styled.textarea`
  width: 34.2rem;
  height: 28rem;
  margin-top: 2rem;

  border: none;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray_background};
  ${({ theme }) => theme.fonts.regular14pt};
  line-height: 2rem;
`;

const StyledTextLength = styled.section<TextLengthProps>`
  width: 34.2rem;
  margin-top: 2rem;
  margin-bottom: 1.6rem;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.regular12pt};

  text-align: right;

  & > strong {
    color: ${({ currentTextLength }) =>
      currentTextLength === 0 ? ({ theme }) => theme.colors.gray3 : ({ theme }) => theme.colors.main};
  }
`;
