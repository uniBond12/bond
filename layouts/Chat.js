import React from "react";
import styles from "scss/layout/Chat.module.scss";
import ChatScreen from "components/ChatScreen";

function Chat() {
    return (
        <main className={styles.main}>
            <ChatScreen />
        </main>
    );
}

export default Chat;
