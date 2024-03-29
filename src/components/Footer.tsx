import React from "react";
import { CDBBox, CDBBtn, CDBIcon, CDBModalFooter } from "cdbreact";

export default function Footer() {
  return (
    <CDBModalFooter className="shadow">
      <CDBBox
        display="flex"
        flex="column"
        className="mx-auto py-5"
        style={{ width: "90%" }}
      >
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <img alt="logo" src="/favicon.ico" width="45px" />
            <span className="ms-3 h5 font-weight-bold">Movie World</span>

            <p className="my-3" style={{ width: "250px" }}></p>
            <CDBBox display="flex" className="mt-4">
              <CDBBtn flat color="dark">
                <CDBIcon fab icon="facebook-f" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="mx-3">
                <CDBIcon fab icon="twitter" />
              </CDBBtn>
              <CDBBtn flat color="dark" className="p-2">
                <CDBIcon fab icon="instagram" />
              </CDBBtn>
            </CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Devwares
            </p>
            <CDBBox
              flex="column"
              style={{ cursor: "pointer", padding: "0" }}
            ></CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Help
            </p>
            <CDBBox
              flex="column"
              style={{ cursor: "pointer", padding: "0" }}
            ></CDBBox>
          </CDBBox>
          <CDBBox>
            <p className="h5 mb-4" style={{ fontWeight: "600" }}>
              Products
            </p>
            <CDBBox
              flex="column" 
              style={{ cursor: "pointer", padding: "0" }}
            ></CDBBox>
          </CDBBox>
        </CDBBox>
      </CDBBox>
    </CDBModalFooter>
  );
}
