import { useEffect } from "react";
import styled from "styled-components";

const ToastMessage = ({ message, setShowToast }: any) => {


    useEffect(()=>{
        setTimeout(()=>{
            setShowToast(false)
        },1500)
    },[])

  return (
    <>
      <Wrapper>{message}</Wrapper>
    </>
  );
};

export default ToastMessage;

const Wrapper = styled.div`
  position: absolute;
  top: 17%;
  left: 45%;

  width: 150px;
  height: 30px;

  font-size: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: black;
  background:#fff;
  border-radius: 10px;
`;
