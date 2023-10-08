import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  bottom: -13px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

function Header() {
  const popMatch = useMatch("/");
  const nowMatch = useMatch("now-playing");
  const comingMatch = useMatch("coming-soon");
  return (
    <Nav>
      <Items>
        <Item>
          <Link to={"/"}>
            Popular{popMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to={"/now-playing"}>
            Now Playing{nowMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
        <Item>
          <Link to={"/coming-soon"}>
            Coming Soon{comingMatch && <Circle layoutId="circle" />}
          </Link>
        </Item>
      </Items>
    </Nav>
  );
}

export default Header;
