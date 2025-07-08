import styled from "styled-components";
import { RULES } from "../../common/utils";
import { useState } from "react";
import ToastMessage from "../../common/ToastMessage";

const SpeedleModal = ({ onClickStart }: any) => {
  const [ethAmount, setEthAmount] = useState<string>("");
  const numberRegex = /^(\d+(\.\d+)?|\.\d+)$/

  const onHandleETHAmount = (amount:any) => {

    if(amount === 0){
      //Enter Amount greater than 0 ETH
    }else if(!numberRegex.test(amount)){
      //Enter valid number
    }else if(amount == " " || amount !== ""){
      setEthAmount(amount);
    }
  }

  return (
    <Wrapper>
      <Container>
        Rules
        <Box>
          {RULES.map((rule, index) => (
            <Row key={index}>
              {index + 1}. <img src={rule.image} height={15} />
              {rule.rule}
            </Row>
          ))}
        </Box>
        <Footer>
          <GrayText>Contribute some ETH to start the game</GrayText>
          <EthInput>
            <Input onChange={(e)=>onHandleETHAmount(e.target.value)}/>
            <Currency>ETH</Currency>
          </EthInput>
          <Button
            onClick={() => {
              onClickStart(ethAmount);
            }}
          >
            <ColorText>START</ColorText>
          </Button>
        </Footer>
      </Container>
    </Wrapper>
  );
};

export default SpeedleModal;

const Wrapper = styled.div`
  margin: 10px;
  max-width: 500px;
  height: 450px;

  background: #d7d7d7;
  border-radius: 15px;
  justify-content: space-around;
`;

const Container = styled.div`
  height: 100%;
  padding: 30px;

  display: flex;
  flex-direction: column;

  gap: 20px;
`;

const Row = styled.div`
  font-size: 12px;
`;

const Box = styled.div`
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
`;

const GrayText = styled.div`
  color: #727272;
  font-size: 10px;
`;

const EthInput = styled.div`
  display: flex;
`;

const Input = styled.input`
  width: 170px;
  height: 40px;
  background: #000;
  border-radius: 10px 0 0 10px;
  border: none;
  font-size: 16px;
  color: #fff;
  padding: 10px;
`;

const Currency = styled.div`
  height: 40px;
  width: 70px;
  background: #fff;
  border-radius: 0 10px 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.div`
  width: 170px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #fff;

  cursor: pointer;
`;

const ColorText = styled.div`
  background: linear-gradient(90deg, #d29c56, #cd2315);
  background-clip: text;
  color: transparent;
  font-size: 14px;
`;
