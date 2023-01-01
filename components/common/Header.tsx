import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import Back from 'public/assets/icons/back.svg';

interface TitleBoxProps {
  title?: string;
  leftButtonText?: string;
  rightButtonText?: string;
  isHavingBackButton?: boolean;
  onClickLeftButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  onClickRightButton?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Header({
  title,
  rightButtonText,
  isHavingBackButton,
  leftButtonText,
  onClickLeftButton,
  onClickRightButton,
}: TitleBoxProps) {
  return (
    <Root>
      {isHavingBackButton ? (
        <StyledBackButtonWrapper type="button" onClick={onClickLeftButton}>
          <Back />
        </StyledBackButtonWrapper>
      ) : (
        <StyledLeftButton type="button" onClick={onClickLeftButton}>
          {leftButtonText}
        </StyledLeftButton>
      )}

      <StyledTitle>{title}</StyledTitle>
      <StyledRightButton type="button" onClick={onClickRightButton}>
        {rightButtonText}
      </StyledRightButton>
    </Root>
  );
}

const Root = styled.div`
  position: relative;

  max-width: 43rem;
  height: 5.7rem;
  margin: 0 auto;
`;

const StyledBackButtonWrapper = styled.button`
  position: absolute;
  top: 1.9rem;
  left: 2.3rem;

  width: 1rem;
  height: 2rem;
`;

const StyledLeftButton = styled.button`
  position: absolute;
  top: 1.9rem;
  left: 2.3rem;

  ${theme.fonts.regular16pt};
  color: ${theme.colors.white};
`;

const StyledTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;

  ${theme.fonts.title16pt};
  color: ${theme.colors.white};
`;

const StyledRightButton = styled.button`
  position: absolute;
  top: 2rem;
  right: 2.4rem;

  ${theme.fonts.regular16pt}
  color: ${theme.colors.white};
`;
