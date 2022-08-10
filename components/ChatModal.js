import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "scss/components/ChatScreen.module.scss";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickDetector from "hooks/OutsideClickDetector";
import Messages from "./Messages";
import { toggleState as toggleChatScreenState } from "reduxState/slices/chatModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { chatUser } from "../reduxState/slices/chatUserSlice";
import { toCapital } from "../utils/helpers/toCapital";
import { IoIosResize, IoMdSend } from "react-icons/io";
import io from "socket.io-client";
import axios from "axios";
import toast from "./Toast";
import { useRouter } from "next/router";

export let socket;

function ChatModal() {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    socket = useRef();
    const scrollRef = useRef();
    const { show: showChatModal } = useSelector((state) => state.chatScreenState);
    const sender = useSelector((state) => state.authState);
    const reciever = useSelector((state) => state.chatUserState);
    const dispatch = useDispatch();
    const router = useRouter();

    const headersConfig = useMemo(() => {
        return {
            headers: {
                Authorization: `bearer ${sender.token}`,
            },
        };
    }, [sender.token]);

    useEffect(() => {
        setMessages([]);
        if (sender.id && reciever.id) {
            axios
                .get(`/api/chat/${sender.id}/${reciever.id}`, headersConfig)
                .then(({ data }) => setMessages(data))
                .catch(({ request: { responseText } }) => toast({ type: "error", message: `${JSON.parse(responseText).message}` }));
        }
    }, [reciever, sender, sender.token, showChatModal, headersConfig]);

    useEffect(() => {
        socketInitializer();
    }, [reciever]);

    useEffect(() => {
        if (sender) {
            socket.current?.emit("add-user", sender.id);
        }
    }, [sender]);

    useEffect(() => {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const menuRef = OutsideClickDetector(() => {
        toggleStates();
    });

    const toggleStates = () => {
        dispatch(toggleChatScreenState(false));
        dispatch(toggleBlackScreenState(false));
        !window.location.href.includes("chat") && dispatch(chatUser({ id: 0, email: "", username: "" }));
        setMessage("");
    };

    const sendMessage = async (e, type) => {
        if ((type && message) || (e.key === "Enter" && message)) {
            axios
                .post(
                    "/api/chat/addMessage",
                    {
                        from: sender.id,
                        to: reciever.id,
                        message,
                    },
                    headersConfig
                )
                .then(({ data }) => {
                    setMessage("");
                    socket.current.emit("send-msg", {
                        id: data.id,
                        to: reciever.id,
                        from: sender.id,
                        message,
                        createdAt: Date.now(),
                    });
                    const msgs = [...messages];
                    msgs.push({ sender: sender.id, message: message, createdAt: Date.now() });
                    setMessages(msgs);
                })
                .catch(({ request: { responseText } }) => toast({ type: "error", message: `${JSON.parse(responseText).message}` }));
        }
    };

    let socketInitializer = async () => {
        socket.current = io();
        await fetch(`${process.env.apiUrl}/api/sockets`);
        socket.current.on("connect", () => {
            console.log("connected");
        });
    };

    return (
        <div className={`${styles.screen} ${showChatModal ? styles.show : ""}`} ref={menuRef}>
            <div className={styles.userInfo}>
                <span className={styles.profilePicture}>
                    {reciever.username?.slice(0, 1).toUpperCase()}
                    <p className={reciever.status ? styles.online : styles.offline}></p>
                </span>
                <div>
                    <h2 className="fs-24px weight-7 white mb-5px lh-1">{toCapital(reciever?.username)}</h2>
                    <p className="fs-14px white weight-4 lh-1">{reciever?.skill || "User"}</p>
                </div>
                <div
                    onClick={() => {
                        dispatch(toggleChatScreenState(false));
                        router.push("/chat");
                    }}
                >
                    <icon>
                        <IoIosResize size={25} color="white" />
                    </icon>
                </div>
            </div>
            <div className={`${styles.messagesWrapper}`} ref={scrollRef}>
                <Messages messages={messages} socket={socket} setMessages={setMessages} sender={sender} />
            </div>
            <div className={styles.chatInput}>
                <input
                    placeholder="Enter Message"
                    className="unchange-gray fs-16px weight-5 black"
                    value={message}
                    onKeyPress={sendMessage}
                    onChange={(e) => setMessage(e.target.value)}
                ></input>

                <icon onClick={(e) => sendMessage(e, "click")}>
                    <IoMdSend color="white" size={22} className="ml-auto" />
                </icon>
            </div>
        </div>
    );
}

export default ChatModal;
