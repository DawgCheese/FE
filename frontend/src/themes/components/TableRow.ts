import { Theme } from "@mui/material";
export default function TableRow(theme: Theme) {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.lighter,
            color: theme.palette.primary.main
          },
          "&.Mui-selected:hover": {
            backgroundColor: theme.palette.action.hover
          }
        },
      },
    },
  };
}
