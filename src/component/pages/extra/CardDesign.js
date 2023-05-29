import React from "react";
import Container from "@mui/material/Container";

const CardDesign = () => {
  return (
    <>
      <Container component="main" maxWidth="xl" className="setcontainer">
        <div className="card">
          <p className="card1" >
            <p>This is heading</p>
            <p className="small">
              Card description with lots of great facts and interesting details.
            </p>
            <div className="go-corner" href="#">
              <div className="go-arrow">→</div>
            </div>
          </p>
        </div>
      </Container>
    </>
  );
};

export default CardDesign;
