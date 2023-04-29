"use client";
import { Outlet } from "react-router-dom";
import MainHeader from "../MainHeader/MainHeader";
import { ErrorBoundary } from "react-error-boundary";
import Fallback from "./AppErrorFallback";

const RootLayout = () => {
  return (
    <>
      <ErrorBoundary FallbackComponent={Fallback}>
        <MainHeader />
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </>
  );
};

export default RootLayout;
