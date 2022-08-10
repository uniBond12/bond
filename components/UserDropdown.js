import { useEffect, useCallback } from "react";
import styles from "scss/components/UserDropdown.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleState as toggleSignUpScreenState } from "reduxState/slices/signUpModalSlice";
import { toggleState as toggleLoginScreenState } from "reduxState/slices/loginModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { chatUser } from "reduxState/slices/chatUserSlice";
import { auth as authState } from "reduxState/slices/authSlice";
import { forwardRef } from "react";
import { socket } from "./ChatModal";
import { useRouter } from "next/router";

const UserDropdown = forwardRef((props, ref) => {
    const [stateValue, stateSetter] = props.state;
    const { auth, id } = useSelector((state) => state.authState);
    const dispatch = useDispatch();
    const router = useRouter();

    const login = () => {
        dispatch(toggleLoginScreenState(true));
        dispatch(toggleBlackScreenState(true));
        stateSetter(false);
    };

    const signUp = () => {
        dispatch(toggleLoginScreenState(false));
        dispatch(toggleSignUpScreenState(true));
        stateSetter(false);
    };

    const logout = useCallback(() => {
        stateSetter(false);
        setTimeout(() => dispatch(authState({ id: "", username: "", token: "", isAdmin: false, auth: false })), 1000);
        localStorage.removeItem("currentUser");
        dispatch(chatUser({ id: 0, email: "", username: "" }));
        socket.current?.emit("delete-user", id);

        if (window.location.href.includes("chat")) router.replace("/");
    }, [dispatch, id, router, stateSetter]);

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            socket.current?.emit("delete-user", id);
        });
    }, [id]);

    return (
        <div className={`${styles.dropdown} ${stateValue ? styles.open : ""}`} ref={ref}>
            {!auth && (
                <>
                    <button className={`${styles.btn} weight-6`} onClick={login}>
                        Login
                    </button>
                    <button className={`${styles.btn} weight-6`} onClick={signUp}>
                        Create Account
                    </button>
                </>
            )}
            {auth && (
                <button className={`${styles.btn} weight-6`} onClick={logout}>
                    Logout
                </button>
            )}
        </div>
    );
});

UserDropdown.displayName = "UserDropdown";

export default UserDropdown;
