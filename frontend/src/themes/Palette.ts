// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { presetPalettes } from '@ant-design/colors';

// project import
import ThemeOption from './Theme';

// ==============================|| DEFAULT THEME - PALETTE  ||============================== //

const Palette = (...mode: any) => {
  const colors = presetPalettes;

  const g = [

    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0',
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c',
    '#595959',
    '#262626',
    '#141414',
    '#000000',  ]

  const greyPrimary = [

    "#ffffff",
    "#f6f7fb",
    "#dfe3eb",
    "#99a6bf",
    "#7d8fb3",
    "#6b7a99",
    "#3f5073",
    "#2d3c59",
    "#202b40",
    "#0d111a",
    "#000000",


  ]

  const blueGrey = [

    "#0d111a",
    "#131926",
    "#202b40",
    "#26334d",
    "#2d3c59",
    "#334466",
    "#3f5073",
    "#4d5e80",
    "#62708c",
    "#6b7a99",
    "#7c8aa6",
    "#7d8fb3",
    "#99a6bf",
    "#adb8cc",
    "#c3cad9",
    "#dadee6",
    "#dce0e8",
    "#dfe3eb",
    "#e1e5ed",
    "#e4e7f0",
    "#edeff2",
    "#f2f3f5",
    "#f5f6f7",
    "#f7f8fa",
    "#fafbfc",
  ]
  const greyAscent = ['#fafbfc', '#c3cad9', '#62708c', '#131926'];
  const greyConstant = ['#f5f6f7', '#e6ebf1'];

  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor = ThemeOption(colors);

  return createTheme({
    palette: {
      ...mode,
      common: {
        black: '#000',
        white: '#fff'
      },
      ...paletteColor,
      text: {
        primary: paletteColor.grey[700],
        secondary: paletteColor.grey.A700,
        disabled: paletteColor.grey[400]
      },
      action: {
        disabled: paletteColor.grey[200]
      },
      divider: paletteColor.grey[200],
      background: {
        paper: paletteColor.grey[0],
        default: paletteColor.grey.A50
      }
    }
  });
};

export default Palette;