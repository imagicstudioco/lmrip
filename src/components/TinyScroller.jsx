import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const scrollAnimationDesktop = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const scrollAnimationMobile = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200%);
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  height: 20px; /* Adjust the height as needed */
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  white-space: nowrap;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-name: ${({ isMobile }) => (isMobile ? scrollAnimationMobile : scrollAnimationDesktop)};
  animation-duration: ${({ isMobile }) => (isMobile ? '20s' : '40s')}; /* Adjust duration for mobile and desktop */
  color: ${({ isMobile }) => (isMobile ? 'white' : 'black')}; /* Text color */
  background-color: ${({ isMobile }) => (isMobile ? 'black' : 'white')}; /* Background color */
`;

const Scroller = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${({ isMobile }) => (isMobile ? 'white' : 'black')}; /* Scroller background color */
  height: 100%;
`;

const TinyScroller = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const handleScroll = () => {
    const container = document.getElementById('scrollContainer');
    const percentage = (container.scrollLeft / (container.scrollWidth - container.clientWidth)) * 100;
    setScrollPercentage(percentage);
  };

  useEffect(() => {
    const container = document.getElementById('scrollContainer');
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Determine animation details based on viewport width
  const isMobile = window.innerWidth <= 768;

  return (
    <ScrollContainer id="scrollContainer">
      <Content isMobile={isMobile}>
        {/* Your website content goes here */}
        FOR INFO UPDATE
      </Content>
      <Scroller style={{ width: `${scrollPercentage}%` }} isMobile={isMobile}></Scroller>
    </ScrollContainer>
  );
};

export default TinyScroller;