import styled from "styled-components";
import GameCard from "./gameCard";
import GameDetails from "./gameDetails";
import { motion, spring } from "framer-motion";
import { useEffect, useState } from "react";
import SpeedleModal from "./speedleModal";
import TimerComponent from "./timer";
import { ethers } from "ethers";
import Modal from "../../common/Modal";
import {
  getDayOfWeek,
  getMetaMaskErrorMessages,
  getWeekOfMonth,
  METAMASK_ERROR_MESSAGE,
  NETWORK_ERROR_MESSAGE,
  REFRESH_PAGE_TEXT,
  USER_PLAYED_DESCRIPTION,
  USER_PLAYED_ERROR,
} from "../../common/utils";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/contract";
import ToastMessage from "../../common/ToastMessage";
import { BeatLoader } from "react-spinners";
import { sign } from "crypto";
import { wordsGrid } from "../../common/common";

interface WindowsProps {
  ethereum: any;
}

declare let window: WindowsProps;

const SpeedlePage = () => {
  const [openModal, setOpenModal] = useState<boolean>(true);
  const [errorModal, setErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [currentRow, setIsCurrentRow] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [errorDescription, setErrorDescription] = useState<string>("");
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);
  const wordOfTheDay =
    wordsGrid[getWeekOfMonth()][getDayOfWeek()].toUpperCase();

  const arrayBoxes = [1, 2, 3, 4, 5];

  const onHandleColumn = () => {
    setIsCurrentRow((prev) => prev + 1);

    if (currentRow === 4) {
      setToastMessage("Hard Luck!");
      setShowToast(true);
      setEndGame(true);
    }
  };

  const checkWalletConnected = async () => {
    if (window.ethereum !== undefined) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();

      if (network.chainId !== 11155111) {
        setErrorMessage(NETWORK_ERROR_MESSAGE);
        setErrorDescription("Refresh the page to retry");
        setErrorModal(true);
        return;
      }

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const _userDetails = await contract.userMapping(address);
      if (_userDetails.userCompleted) {
        setErrorMessage(USER_PLAYED_ERROR);
        setErrorDescription(
          USER_PLAYED_DESCRIPTION(_userDetails.timeInSeconds)
        );
        setErrorModal(true);
      }
    } else {
      setErrorMessage(METAMASK_ERROR_MESSAGE);
      setErrorDescription("Refresh the page to retry");
      setErrorModal(true);
    }
  };

  useEffect(() => {
    checkWalletConnected();

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isSolved) {
      setToastMessage("Completed!");
      setShowToast(true);
    }
  }, [isSolved]);

  const onClickStart = async (amount: string) => {
    setLoader(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();
      if (network.chainId !== 11155111) {
        setErrorMessage(NETWORK_ERROR_MESSAGE);
        setErrorDescription("Refresh the page to retry");
        setErrorModal(true);
        setLoader(false);
      } else {
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

        let amountInWei = ethers.utils.parseEther(amount);
        const tx = await contract.getUserContribution(amountInWei, {
          value: amountInWei,
        });
        setLoader(true);

        await tx.wait();
        setOpenModal(false);
        setOpenModal(false);
        setStart(true);
        setLoader(false);
      }
    } catch (error: any) {
      setErrorMessage(getMetaMaskErrorMessages(error?.code));
      setErrorModal(true);
      setLoader(false);
    }
  };

  return (
    <>
      {showToast && (
        <ToastMessage message={toastMessage} setShowToast={setShowToast} />
      )}
      <>
        <Header
          style={{
            position: "fixed",
            height: "80px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            letterSpacing: "5px",
            color: "#fff",
            fontSize: "24px",
            borderBottom: "1px solid #fff",
          }}
        >
          <motion.div
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ duration: 1, ease: "linear" }}
          >
            <img
              src={"/icons/speedle-logo.png"}
              style={{ paddingTop: "7px" }}
            />
          </motion.div>
          <motion.div
            animate={{ x: [0, 50, 0] }}
            transition={{ duration: 2, delay: 1, type: "tween" }}
          >
            SPEEDLE
          </motion.div>
        </Header>
        <Wrapper style={{ height: "100%", width: "100%" }}>
          <Container
            style={{
              paddingTop: "90px",
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {loader ? (
              <BeatLoader color="#fff" />
            ) : errorModal ? (
              <Modal mainText={errorMessage} secondaryText={errorDescription} />
            ) : openModal ? (
              <SpeedleModal
                setOpenModal={setOpenModal}
                setStart={setStart}
                onClickStart={onClickStart}
              />
            ) : (
              <>
                {endGame && (
                  <div
                    style={{ position: "absolute", top: "12%", left: "45%" }}
                  >
                    <ToastMessage message={`The word is ${wordOfTheDay}`} />
                  </div>
                )}
                <Column>
                  <TimerComponent
                    start={start}
                    isSolved={isSolved}
                    endGame={endGame}
                    setErrorModal={setErrorModal}
                    setErrorMessage={setErrorMessage}
                  />
                  {arrayBoxes.map((_, i) => (
                    <GameCard
                      isActive={isSolved ? false : i === currentRow}
                      onHandleColumn={() => onHandleColumn()}
                      setIsSolved={setIsSolved}
                      wordOfTheDay={wordOfTheDay}
                      key={i}
                    />
                  ))}
                </Column>
                <GameDetails isSolved={isSolved} />
              </>
            )}
          </Container>
        </Wrapper>
      </>
    </>
  );
};

export default SpeedlePage;

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;
`;

const Header = styled(motion.div)`
  position: fixed;
  height: 80px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  letter-spacing: 5px;
  color: #fff;
  font-size: 24px;

  border-bottom: 1px solid #fff;
`;

const Container = styled(motion.div)`
  padding-top: 90px;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
