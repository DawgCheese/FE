export default {
    main: {
        display: "grid",
        gridTemplateAreas: "'sidebar room-list chat-pane'",
        gridTemplateColumns: "min-content min-content 1fr",
        gridTemplateRows: "1fr",
        backgroundColor: "background.paper",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden"
    }
}