import styled from "styled-components";

type StyledWindowProps = {
  $backgroundBlur?: string;
  $backgroundColor?: string;
  $isForeground?: boolean;
};

const StyledWindow = styled.section<StyledWindowProps>`
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor || theme.colors.surface};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: ${({ $isForeground, theme }) =>
    $isForeground ? theme.effects.shadow : "none"};
  display: flex;
  flex-direction: column;
  height: 100%;
  outline: ${({ $isForeground, theme }) =>
    $isForeground ? `1px solid ${theme.colors.primary}` : `1px solid ${theme.colors.border}`};
  overflow: hidden;
  position: absolute;
  width: 100%;
  
  ${({ $backgroundBlur }) =>
    $backgroundBlur && `backdrop-filter: blur(${$backgroundBlur});`}

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: ${({ $isForeground }) =>
      $isForeground ? "rgba(255, 255, 255, 0.05)" : "transparent"};
    z-index: 1;
  }
`;

export default StyledWindow;
