import {Theme} from "@mui/material/styles";

export default {
    wrapper: {
        display: "flex",
        backgroundColor: "background.paper",
        alignItems: "center",
        padding: 1.5,
        borderRadius: 1,
        boxShadow: " rgba(27, 31, 35, 0.06) 0px 1px 0px, rgba(255, 255, 255, 0.25) 0px 1px 0px inset;",

    },
    input: {
        border: "none",
        textAlign: "left",
        width: "100%",
        fontSize: 14,
        padding: 0.5,
        "&::placeholder": {
            color: (theme: Theme) => theme.palette.grey["400"]
        }
    },
    actionButton: {
        "&:hover": {
            color:  "primary.main"
        }
    }
}