import React, { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
// Components
import Header from "./header";


export default function AppLayout() {
  const mobile = 64;
  const desktop = 92;
  const [open, setOpen] = useState(false);

  const StyledRoot = useMemo(
    () =>
      styled("div")({
        display: "flex",
        minHeight: "100%",
        overflow: "hidden",
      }),
    []
  );

  const Main = useMemo(
    () =>
      styled("div")(({ theme }) => ({
        flexGrow: 1,
        overflow: "auto",
        fontSize: "10px",
        minHeight: "100%",
        paddingTop: mobile,
        paddingBottom: theme.spacing(10),
        [theme.breakpoints.up("lg")]: {
          paddingTop: desktop,
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
        },
      })),
    [mobile, desktop]
  );

  return (
    <>
      <StyledRoot>
        <Header />

        <Main>
            <Outlet/>
        </Main>
      </StyledRoot>
    </>
  );
}
