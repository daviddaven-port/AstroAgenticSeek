import styled from "styled-components";

type StyledTitlebarProps = {
  $foreground?: boolean;
};

const StyledTitlebar = styled.header<StyledTitlebarProps>`
  align-items: center;
  background-color: ${({ $foreground, theme }) =>
    $foreground ? theme.colors.windowHeader : theme.colors.surface};
  display: flex;
  height: 30px;
  justify-content: space-between;
  padding: 0 8px;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  figure {
    align-items: center;
    display: flex;
    gap: 8px;
    margin: 0;
    
    img {
      height: 16px;
      width: 16px;
    }

    figcaption {
      color: ${({ theme }) => theme.colors.text};
      font-family: ${({ theme }) => theme.fonts.display};
      font-size: 13px;
      font-weight: 500;
    }
  }

  nav {
    display: flex;
    gap: 4px;

    button {
      align-items: center;
      background: none;
      border: none;
      color: ${({ theme }) => theme.colors.textMuted};
      cursor: pointer;
      display: flex;
      height: 24px;
      justify-content: center;
      width: 24px;
      border-radius: 4px;
      transition: all 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: ${({ theme }) => theme.colors.text};
      }

      &.close:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
      }

      svg {
        fill: currentColor;
        height: 12px;
        width: 12px;
      }
    }
  }
`;

export default StyledTitlebar;
