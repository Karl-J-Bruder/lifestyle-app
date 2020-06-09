import React from "react";

const modalStyleOpen = {
    backgroundColor: "white",
    border: "2px solid #2f6f8c",
    borderRadius: "5%",
    color: "black",
    display: "block",
    height: "20vh",
    paddingTop: "25px",
    position: "absolute",
    top: "40%",
    left: "30%",
    width: "40vw",
    zIndex: 999,
}

const modalStyleClosed = {
    display: "none"
}

const BasicModal = ({ isModalOpen }) => {
    return (
        <div style={isModalOpen ? modalStyleOpen : modalStyleClosed}>
            <h1>Loading...</h1>
        </div>
    )
}

export default BasicModal;