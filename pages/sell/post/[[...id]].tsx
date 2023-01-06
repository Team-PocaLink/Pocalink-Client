import Header from 'components/common/Header';
import React, { useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlickPrev from '../../../public/assets/icons/slickPrev.png';
import SlickNext from '../../../public/assets/icons/slickNext.png';

export default function certification() {
  const [openHelpModal, setOpenHelpModal] = useState<boolean>(false);

  const handleOpenHelpModal = () => {
    setOpenHelpModal(!openHelpModal);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };

  return (
    <>
      <Header
        title="인증 사진"
        leftButtonText="닫기"
        rightButtonText="도움"
        handleLeftButton={() => Router.push(`/sell/post/${1}`)}
        handleRightButton={handleOpenHelpModal}></Header>
      <StyledCertificationWord>
        <h1>인증 단어</h1>|<p>맑은 토끼 1214</p>
      </StyledCertificationWord>
      <StyledSlider {...settings}>
        <StyledCertificationImageContainer>
          <h1>111</h1>
        </StyledCertificationImageContainer>
        <StyledCertificationImageContainer>
          <h1>222</h1>
        </StyledCertificationImageContainer>
        <StyledCertificationImageContainer>
          <h1>333</h1>
        </StyledCertificationImageContainer>
      </StyledSlider>
      {openHelpModal && (
        <StyledHelpModalBackground>
          <StyledHelpModal>
            <h1>필요한 인증 사진이 없나요?</h1>
            <p>
              필요한 인증 사진을 판매자가 올려 놓지 않은 경우,
              <br /> 트위터를 통해 추가 인증사진을 요청하세요
              <br />
              인증 사진이 없다면 안전한 거래를 보장할 수 없어요
            </p>
            <StyledClosedHelpModal onClick={handleOpenHelpModal}>확인</StyledClosedHelpModal>
          </StyledHelpModal>
        </StyledHelpModalBackground>
      )}
    </>
  );
}

const StyledHelpModalBackground = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;

  width: 100%;
  min-height: calc(var(--vh) * 100);

  padding: 0 1.6rem 3.2rem;
  margin-left: -16px;

  background: rgba(0, 0, 0, 0.7);
`;

const StyledCertificationWord = styled.section`
  display: flex;
  flex-direction: row;

  margin: 1.8rem 0 1.6rem 0;

  color: ${({ theme }) => theme.colors.gray4};
  ${({ theme }) => theme.fonts.regular14pt};

  h1 {
    margin-right: 0.8rem;
  }

  p {
    margin-left: 0.8rem;

    color: ${({ theme }) => theme.colors.sub1};
    ${({ theme }) => theme.fonts.title16pt};
  }
`;

const StyledSlider = styled(Slider)`
  .slick-list {
    margin: 0 -16px;
  }

  .slick-dots {
    position: relative;
    top: 2.85rem;
  }

  .slick-prev {
    top: 105%;
    height: 2.6rem;
    left: 0.1rem;
    background: url('/assets/icons/slickPrev.png');
  }

  .slick-next {
    top: 105%;
    height: 2.6rem;
    right: 0.1rem;
    background: url('/assets/icons/slickNext.png');
  }

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-dots li,
  .slick-dots li button,
  .slick-dots li button:before {
    height: 0.7rem;
    width: 0.7rem;
  }

  .slick-dots li button:before {
    background: ${({ theme }) => theme.colors.gray2};
    color: transparent;
    cursor: pointer;
    display: block;
    border-radius: 100%;
    padding: 0;
  }

  .slick-dots li.slick-active button:before {
    background-color: ${({ theme }) => theme.colors.main};
  }
`;

const StyledCertificationImageContainer = styled.section`
  height: 52rem;

  background-color: ${({ theme }) => theme.colors.main};
  color: white;
`;

const StyledHelpModal = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 24rem;
  padding: 3.2rem 4rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.grey_popup};

  h1 {
    margin-bottom: 2.4rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.title16pt};
  }

  p {
    text-align: center;

    margin-bottom: 2.4rem;

    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.regular14pt};
    line-height: 2.2rem;
  }
`;

const StyledClosedHelpModal = styled.button`
  width: 12rem;
  height: 4.3rem;

  border-radius: 0.8rem;
  background: ${({ theme }) => theme.colors.main};
`;