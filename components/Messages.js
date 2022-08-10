import { useState, useEffect } from "react";
import styles from "scss/components/ChatScreen.module.scss";
import { useSelector } from "react-redux";
import { formulateDate } from "utils/helpers/date/messageDate";

function Messages({ messages, setMessages, socket, sender }) {
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const reciever = useSelector((state) => state.chatUserState);
    const [latestMessageSender, setLatestMessageSender] = useState();

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (id, msg, to, from, createdAt) => {
                setLatestMessageSender(from);
                setArrivalMessage({ sender: from, message: msg, createdAt, to, id });
            });
        }
    }, [reciever, socket]);

    useEffect(() => {
        if (latestMessageSender && reciever.id === latestMessageSender) {
            arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
            return;
        }
    }, [arrivalMessage, latestMessageSender, reciever, setMessages]);

    return (
        <>
            {messages?.map(({ message, sender: messageOwner, id, createdAt }) => (
                <div className={messageOwner !== sender?.id ? styles.recieved : styles.send} key={id}>
                    <span className={styles.chatProfilePicture}>
                        {messageOwner !== sender?.id ? reciever.username?.slice(0, 1).toUpperCase() : sender.username?.slice(0, 1).toUpperCase()}
                    </span>
                    <p>{message}</p>
                    <h6 className="fs-13px weight-4 white lh-1">{formulateDate(createdAt)}</h6>
                </div>
            ))}
        </>
    );
}

export default Messages;
