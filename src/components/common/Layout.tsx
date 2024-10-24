import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import BodyHeader from "./BodyHeader";
import { padding } from "@mui/system";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div style={styles.container as React.CSSProperties}>
      <Sidebar />
      <div style={styles.page as React.CSSProperties}>
        <div style={styles.content}>
          {/* <BodyHeader /> */}
          <h2 className="title mt-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  page: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    padding: "2rem",
  },
};

export default Layout;
