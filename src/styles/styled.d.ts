import "styled-components";
import { WestOSTheme } from "./WestOS/theme";

type ThemeType = typeof WestOSTheme;

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}
