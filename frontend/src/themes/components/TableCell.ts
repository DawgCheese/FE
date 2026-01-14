// ==============================|| OVERRIDES - TABLE CELL ||============================== //

import { Theme } from "@mui/material";

export default function TableCell(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          padding: 12,
          borderColor: theme.palette.divider,
          color: "inherit",
        },
        head: {
          fontWeight: 600,
        },
      },
    },
  };
}
