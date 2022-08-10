import React from "react";
import styles from "scss/components/UserCard.module.scss";
import toast from "./Toast";
import { useSelector, useDispatch } from "react-redux";
import { toggleState as toggleChatScreenState } from "reduxState/slices/chatModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { chatUser } from "../reduxState/slices/chatUserSlice";
import { toCapital } from "../utils/helpers/toCapital";

function UserCard({ id, email, name, skill, status }) {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.authState);

    const openChatDialog = () => {
        if (auth) {
            dispatch(chatUser({ id, email, username: name, status, skill }));
            if (!window.location.href.includes("chat")) {
                dispatch(toggleChatScreenState(true));
                dispatch(toggleBlackScreenState(true));
            }
        }
    };

    return (
        <div className={styles.card} onClick={openChatDialog}>
            <span className={`${styles.profilePicture} `}>
                {name?.slice(0, 1).toUpperCase()}
                <p className={status ? styles.online : styles.offline}></p>
            </span>
            <div>
                <h2 className="fs-20px weight-7 black mb-5px lh-1">{toCapital(name)}</h2>
                <p className="fs-14px black weight-4 lh-1">{skill}</p>
            </div>
        </div>
    );
}

export default UserCard;
