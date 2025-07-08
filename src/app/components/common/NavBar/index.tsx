import styled from "styled-components";
import { motion, spring } from "framer-motion";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const router = useRouter();

  const redirectPage = () => {
router.push("/speedle")
  }

  return (
    <>
      <Wrapper onClick={() => redirectPage()}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeIn" }}
        >
          {" "}
          Game
        </motion.div>
        <motion.div
          initial={{ y: "-100px" }}
          animate={{ y: 0 }}
          transition={{ duration: 4, delay: 2, type: spring }}
        >
          <img src="/icons/game-logo.png" height={50} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1, ease: "easeIn" }}
        >
          Verse
        </motion.div>
      </Wrapper>
    </>
  );
};

export default NavBar;

const Wrapper = styled(motion.div)`
  position: fixed;
  height: 100px;
  width: 100%;
  cursor: pointer;
  color: #fff;

  z-index: 10;

  display: flex;
  justify-content: center;
  align-items: center;

  word-spacing: 10px;
  letter-spacing: 2px;
  gap: 10px;
  font-size: 20px;
`;
