import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

const style = {
  divStyle: {
    margin: "auto",
    width: "300px",
    marginTop: "250px",
  },
};
export default function Header() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed component="div">
        <div style={style.divStyle}> 
            <h1>Welcome To BlogSite</h1>
        </div>
      </Container>
    </React.Fragment>
  );
}
