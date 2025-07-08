import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface WindowsProps {
  ethereum: any;
}

declare let window: WindowsProps;

const TimerComponent = ({ start, isSolved, endGame }: any) => {
  const [seconds, setSeconds] = useState<any>(0);
  const [minutes, setMinutes] = useState<any>(0);
  const [hours, setHours] = useState<any>(0);
  useEffect(() => {
    if (isSolved || endGame) {
      endGameForUser();
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev: any) => prev + 1);
    }, 1000);

    return () => clearInterval(timer); // Clean up on unmount
  }, [isSolved, endGame]);

  useEffect(() => {
    if (seconds > 59) {
      setSeconds(0);
      setMinutes((prev: any) => prev + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes > 59) {
      setMinutes(0);
      setHours((prev: any) => prev + 1);
    }
  }, [seconds]);

  const endGameForUser = async () => {
    let timeInSeconds = seconds + minutes * 60 + hours * 60 * 60;

    if (isSolved || endGame) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        const tx = await contract.endGameForUser(timeInSeconds);
      } catch (error: any) {
        console.warn(error.code);
      }
    }
  };

  return (
    <>
      <TimerWrapper>
        <TitleWrapper>
          <img src={"/icons/stopwatch.svg"} />
          Timer
        </TitleWrapper>
        <Timer>
          {hours}h:{minutes}m:{seconds}s
        </Timer>
      </TimerWrapper>
    </>
  );
};

export default TimerComponent;

const TimerWrapper = styled.div`
  width: 325px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  gap: 5px;
  color: #fff;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Timer = styled.div`
  background: linear-gradient(90deg, #d29c56, #cd2315);
  background-clip: text;
  color: transparent;
  letter-spacing: 5px;
`;
