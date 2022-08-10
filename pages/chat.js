import { useEffect, useCallback, useState } from "react";
import ChatLayout from "layouts/ChatLayout";
import Chat from "../layouts/Chat";
import { useDispatch, useSelector } from "react-redux";
import { usersState } from "reduxState/slices/usersSlice";
import { auth as authState } from "reduxState/slices/authSlice";
import axios from "axios";
import { socket } from "components/ChatModal";

export default function Home() {
    const dispatch = useDispatch();
    const [members, setMembers] = useState([]);
    const [users, setUsers] = useState([]);
    const { id, isAdmin } = useSelector((state) => state.authState);

    let findUsers = useCallback(() => {
        !isAdmin ? dispatch(usersState({ users: members })) : dispatch(usersState({ users }));
    }, [dispatch, isAdmin, members, users]);

    useEffect(() => {
        findUsers();
    }, [findUsers, id]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            dispatch(authState({ ...user }));
            socket.current?.emit("add-user", user.id);
        }
        axios.get(`${process.env.apiUrl}/api/members/`).then(({ data }) => setMembers(data));
        axios.get(`${process.env.apiUrl}/api/users/`).then(({ data }) => setUsers(data));
    }, [dispatch, id]);

    return (
        <div>
            <ChatLayout pageName="Chat">
                <Chat />
            </ChatLayout>
        </div>
    );
}
