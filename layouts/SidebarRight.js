import IconButton from "components/IconButton";
import React from "react";
import styles from "scss/layout/SidebarRight.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { IoClose } from "react-icons/io5";
import OutsideClickDetector from "hooks/OutsideClickDetector";
import Link from "next/link";
import SidebarFooter from "./SidebarFooter";

import { toggleState as toggleSignUpScreenState } from "reduxState/slices/signUpModalSlice";
import { toggleState as toggleLoginScreenState } from "reduxState/slices/loginModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { auth as authState } from "reduxState/slices/authSlice";

function SidebarRight(props) {
    const [state, stateSetter] = props.state;
    const sidebarRef = OutsideClickDetector(() => stateSetter(false));
    const { auth } = useSelector((state) => state.authState);
    const dispatch = useDispatch();

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

    const logout = () => {
        stateSetter(false);
        setTimeout(() => dispatch(authState({ id: "", username: "", token: "", isAdmin: false, auth: false })), 1000);
    };

    return (
        <div className={` ${styles.sidebar} ${state ? styles.open : ""}`} ref={sidebarRef}>
            <header>
                <button className={styles.closeBtn} onClick={() => stateSetter(false)}>
                    <IoClose />
                </button>

                <IconButton img="peoples/user.png"></IconButton>
            </header>

            <main>
                <Link href="/" passHref>
                    <a href="">
                        <span className="fs-20px black weight-6">Messages</span>
                        <IconButton wrapperClassName={styles.sidebarlinkIcon} icon="icons/commentsIcon.svg" />
                    </a>
                </Link>
                <Link href="/" passHref>
                    <a>
                        <span className="fs-20px black weight-6">Notification</span>
                        <IconButton wrapperClassName={styles.sidebarlinkIcon} icon="icons/BellIcon.svg" notify={true} />
                    </a>
                </Link>
                <Link href="/" passHref>
                    <a>
                        <span className="fs-20px black weight-6">My Account</span>
                    </a>
                </Link>
                <Link href="/" passHref>
                    <a>
                        <span className="fs-20px black weight-6">My Orders</span>
                    </a>
                </Link>
                {!auth && (
                    <>
                        <a className={styles.logintBtn}>
                            <span className="fs-20px black weight-6" onClick={login}>
                                Login
                            </span>
                        </a>
                        <a className={styles.signUpBtn}>
                            <span className="fs-20px black weight-6" onClick={signUp}>
                                Create
                            </span>
                        </a>
                    </>
                )}
                {auth && (
                    <a className={styles.logoutBtn}>
                        <span className="fs-20px black weight-6" onClick={logout}>
                            Log Out
                        </span>
                    </a>
                )}
            </main>

            <SidebarFooter className={styles.footer} />
        </div>
    );
}

export default SidebarRight;
