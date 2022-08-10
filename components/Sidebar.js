import React, { useEffect, useState } from "react";
import styles from "scss/components/Sidebar.module.scss";
import SidebarHeader from "./SidebarHeader";
import { AiOutlineSearch } from "react-icons/ai";
import UserCard from "./UserCard";
import MetaMaskDetails from "./MetaMaskDetails";
import { chatUser } from "../reduxState/slices/chatUserSlice";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "./ChatModal";
let updatesStatuses;

function Sidebar({ pageName }) {
    const { users } = useSelector((state) => state.usersState);
    const [updatedUsers, setUpdatedUsers] = useState([]);
    const [updatedStatus, setUpdatedStatus] = useState({
        userIDs: "",
    });
    const reciever = useSelector((state) => state.chatUserState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (socket.current) {
            socket.current.on("online-user", (onlineUser) => {
                setUpdatedStatus({ userIDs: new Map(Object.entries(onlineUser)) });
            });
        }
    }, [pageName]);

    useEffect(() => {
        const { userIDs } = updatedStatus;
        if (userIDs.size) {
            updatesStatuses = users?.map((user) => {
                if (userIDs?.get(user._id)) return { ...user, status: true };
                else return { ...user, status: false };
            });
            setUpdatedUsers(updatesStatuses);
            if (userIDs?.get(reciever?.id)) dispatch(chatUser({ ...reciever, status: true }));
            else dispatch(chatUser({ ...reciever, status: false }));
        }
        setUpdatedUsers(updatesStatuses);
    }, [dispatch, reciever, updatedStatus, users]);

    return (
        <div className={styles.sidebar}>
            <div className={`${styles.container}`}>
                <SidebarHeader />
            </div>

            <div className={styles.usersCardsWrapper}>
                <div className={styles.container2}>
                    <header className={styles.userHeader}>
                        <h1 className="fs-30px black weight-7 lh-1">Live Now</h1>
                        <button>
                            <AiOutlineSearch size={24} className="gray" />
                        </button>
                    </header>
                </div>
                <main className={styles.usersCards}>
                    {updatedUsers?.map(({ username, _id, email, skill, status }) => (
                        <UserCard name={username} skill={skill} id={_id} key={_id} email={email} status={status} />
                    ))}
                </main>
            </div>

            <div className={styles.container}>
                <MetaMaskDetails />
            </div>
        </div>
    );
}

export default Sidebar;
