import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "./layout/Layout";
import { LayoutProvider } from "./context/LayoutContext";

const App: React.FC = () => {
  return (
    <LayoutProvider>
      <Layout>
        <Outlet />
      </Layout>
    </LayoutProvider>
  );
};

export default App;