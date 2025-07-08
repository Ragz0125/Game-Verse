import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app/contract";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { convertTimeToString, maskUserAddress } from "../../common/utils";
import { BeatLoader } from "react-spinners";

interface WindowsProps {
  ethereum: any;
}

declare let window: WindowsProps;

const GameDetails = ({ isSolved }: any) => {
  const [totalContribution, setTotalContribution] = useState<string>("");
  const [userContribution, setUserContribution] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(true);
  const [leaderBoard, setLeaderBoard] = useState<any>({
    address: "",
    time: "",
  });

  const getGameDetails = async () => {
    setLoader(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const _totalContribution = await contract.getTotalContribution();
      const _userDetails = await contract.userMapping(address);
      const _leaderBoard = await contract.leaderBoard();

      setTotalContribution(ethers.utils.formatEther(_totalContribution));
      setUserContribution(ethers.utils.formatEther(_userDetails.userAmount));
      setLeaderBoard({
        address: _leaderBoard.userAddress,
        time: _leaderBoard.timeInSeconds,
      });
      setLoader(false)
    } catch (error: any) {
      console.warn(error.code);
    }
  };

  useEffect(() => {
    getGameDetails();
  }, []);

  useEffect(()=>{
    if(isSolved){
      getGameDetails()
    }
  },[isSolved])

  return (
    <Wrapper>
      {loader ? (
        <Center>
          <BeatLoader color="#fff" />
        </Center>
      ) : (
        <>
          <Row>
            <LeftText>Total Pool</LeftText>
            <RightText>{totalContribution} ETH</RightText>
          </Row>
          <Row>
            <LeftText>Your Contribution</LeftText>
            <RightText>{userContribution} ETH</RightText>
          </Row>
          <Row>
            <LeftText>Current Leader</LeftText>
            <RightText>
              {convertTimeToString(Number(leaderBoard.time))} (@
              {maskUserAddress(leaderBoard.address)})
            </RightText>
          </Row>
        </>
      )}
    </Wrapper>
  );
};

export default GameDetails;

const Wrapper = styled.div`
  width: 325px;
  height: 25%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
`;

const LeftText = styled.div`
  color: #fff;
`;

const RightText = styled.div`
  background: linear-gradient(90deg, #d29c56, #cd2315);
  background-clip: text;
  color: transparent;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
