"use client";

import styled from "styled-components";
import NavBar from "../../common/NavBar";
import { AnimatePresence, motion, spring } from "framer-motion";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ y: "100px", opacity: 0 }}
        transition={{ duration: 5, delay: 1, ease: "easeInOut" }}
      >
        <Container>
          <MainText
            initial={{ x: "-50%", opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 4,
              delay: 5,
              ease: "easeInOut",
              type: spring,
            }}
          >
            <Circle1>
              <img src="/icons/circle1.png" height={"50px"} />
            </Circle1>
            <Word1>Play.</Word1>
            <Word2>Earn.</Word2>
            <Word3>Own.</Word3>
            <Circle2>
              <img src="/icons/circle2.png" height={"50px"} />
            </Circle2>
          </MainText>
          <SecondaryText
            initial={{ x: "50%", opacity: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 4,
              delay: 5,
              ease: "easeInOut",
              type: spring,
            }}
          >
            Dive into the world of Web3 games where your skills earn rewards,
            and your assets are truly yours.
          </SecondaryText>
        </Container>
        <CoinDisplay />
        <BackgroundImagePosition>
          <img src={"/icons/background-image.png"} height={"300px"} />
        </BackgroundImagePosition>
        <BackgroundImagePosition2>
          <img src={"/icons/background-image-2.png"} height={"350px"} />
        </BackgroundImagePosition2>
      </Wrapper>
    </>
  );
};

const CoinDisplay = () => {
  return (
    <CoinWrapper>
      <Coin1
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
      >
        <img src={"/icons/coin1.png"} width={"70%"} />
      </Coin1>
      <Coin2
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 2,
          delay: 0.1,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <img src={"/icons/coin2.png"} width={"70%"} />
      </Coin2>
      <Coin3
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 2,
          delay: 0.2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <img src={"/icons/coin3.png"} width={"70%"} />
      </Coin3>
      <Coin4
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 2,
          delay: 0.3,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <img src={"/icons/coin4.png"} width={"70%"} />
      </Coin4>
      <Coin5
        animate={{ y: [0, 30, 0] }}
        transition={{
          duration: 2,
          delay: 0.4,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <img src={"/icons/coin5.png"} width={"70%"} />
      </Coin5>
    </CoinWrapper>
  );
};

const Circle1 = styled.div`
  position: relative;
  left: 30px;
  top: -30px;
`;

const Circle2 = styled.div`
  position: relative;
  right: 50px;
  top: 15px;
`;

const CoinWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Coin1 = styled(motion.div)`
  position: absolute;
  top: 20%;
  left: 20%;
`;

const Coin2 = styled(motion.div)`
  position: absolute;
  top: 25%;
  left: 75%;
`;

const Coin3 = styled(motion.div)`
  position: absolute;
  top: 60%;
  left: 80%;
`;

const Coin4 = styled(motion.div)`
  position: absolute;
  left: 50%;
  bottom: 10%;
`;

const Coin5 = styled(motion.div)`
  position: absolute;
  left: 10%;
  bottom: 35%;
`;
export default LandingPage;

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;

  background: #050505;
  color: #fff;
`;

const BackgroundImagePosition = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const BackgroundImagePosition2 = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

const MainText = styled(motion.div)`
  display: flex;
  font-size: 30px;
  gap: 10px;
  letter-spacing: 5px;
`;

const Word1 = styled.div`
  background: linear-gradient(90deg, #8857cf, #ed5233);
  background-clip: text;
  color: transparent;
`;

const Word2 = styled.div`
  background: linear-gradient(90deg, #b3783c, #7d52c7);
  background-clip: text;
  color: transparent;
`;

const Word3 = styled.div`
  background: linear-gradient(90deg, #ec4e30, #c87f3f);
  background-clip: text;
  color: transparent;
`;

const SecondaryText = styled(motion.div)`
  color: #fff;
  font-size: 14px;
  width: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
