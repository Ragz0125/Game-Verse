import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

const Loader = () => {
  return (
    <Wrapper
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ duration: 5 }}
      exit={{ y: "100%", opacity: 0 }}
    >
      <img src="/icons/game-logo.png" />
    </Wrapper>
  );
};

export default Loader;

const Wrapper = styled(motion.div)`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
`;
