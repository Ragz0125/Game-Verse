import styled from "styled-components";

const Modal = ({ mainText, secondaryText }: any) => {
  return (
    <Wrapper>
      <Container>
        <MainText>{mainText}</MainText>
        <SecondaryText>{secondaryText}</SecondaryText>
      </Container>
    </Wrapper>
  );
};

export default Modal;

const Wrapper = styled.div`
  margin: 10px;
  max-width: 500px;
  height: 250px;
  width: 95%;
  background: #d7d7d7;
  border-radius: 15px;
  justify-content: space-around;
  padding: 10px;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 10px;

  font-size: 14px;
`;

const MainText = styled.div`
  text-align: center;
`;

const SecondaryText = styled.div`
  color: #8e8e8e;
  font-size: 12px;
`;
