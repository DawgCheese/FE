import PropTypes from "prop-types";
import { useMemo } from "react";

// material-ui
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";

// project import
import Palette from "./Palette";
import Typography from "./Typography.ts";
import CustomShadows from "./Shadow.ts";
import componentsOverride from "./components";

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

export default function ThemeCustomization({ children }: any) {
  const theme = Palette("light", "default");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const themeTypography = Typography(`'Roboto Condensed', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      ...theme,
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  );
  //@ts-ignore
  const themes = createTheme(themeOptions);
  themes.components = componentsOverride(themes);
  const extendedTheme = extendTheme(themes);
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={themes}>
        <CssVarsProvider theme={extendedTheme}>
          <CssBaseline />
          {children}
        </CssVarsProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node,
};

declare module "@mui/material/styles" {
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
  }
}
