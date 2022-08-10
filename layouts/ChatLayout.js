import Sidebar from "components/Sidebar";
import useMediaQuery from "hooks/useMediaQuery";
import React from "react";
import styles from "scss/layout/ChatLayout.module.scss";
import Navbar from "./Navbar";

function ChatLayout({ children, showSidebar = true, pageName }) {
    const isBellow1024px = useMediaQuery("(max-width : 64em)");

    return (
        <div className={`${styles.dashboard} ${showSidebar ? styles.sidebar : ""}`}>
            <div className={styles.left}>
                <main>{children}</main>
            </div>

            {showSidebar ? (
                !isBellow1024px ? (
                    <div className={styles.sidebar}>
                        <Sidebar pageName={pageName} />
                    </div>
                ) : (
                    ""
                )
            ) : (
                ""
            )}
        </div>
    );
}

export default ChatLayout;
