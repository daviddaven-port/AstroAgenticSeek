import styled from "styled-components";

const StyledTaskbar = styled.footer`
  align-items: center;
  background: ${({ theme }) => theme.colors.taskbar};
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  bottom: 0;
  display: flex;
  height: 30px;
  left: 0;
  position: absolute;
  right: 0;
  user-select: none;
  z-index: 10000;
  padding: 0 10px;
  justify-content: space-between;
`;

export default StyledTaskbar;
