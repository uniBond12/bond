import React, { useState, useEffect } from "react";
import styles from "scss/components/LoginScreen.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickDetector from "hooks/OutsideClickDetector";
import { toggleState as toggleSignUpScreenState } from "reduxState/slices/signUpModalSlice";
import { toggleState as toggleLoginScreenState } from "reduxState/slices/loginModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { usersState } from "reduxState/slices/usersSlice";
import axios from "axios";
import toast from "./Toast";
import { isMember } from "../utils/helpers/member";

function SignUpScreen() {
    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [allUsers, setAllUsers] = useState([]);
    const { show: showSignUp } = useSelector((state) => state.signUpScreenState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!!allUsers.length) dispatch(usersState({ users: allUsers }));
    }, [allUsers, dispatch]);

    const menuRef = OutsideClickDetector(() => {
        toggleStates();
    });

    const toggleStates = () => {
        dispatch(toggleSignUpScreenState(false));
        dispatch(toggleBlackScreenState(false));
    };

    const openSignInMenu = () => {
        dispatch(toggleSignUpScreenState(false));
        dispatch(toggleLoginScreenState(true));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const member = isMember(formValues.email);
        if (member) toast({ type: "warning", message: `Account already exist` });
        else {
            axios
                .post(`/api/users/register`, {
                    ...formValues,
                    isAdmin: false,
                    status: false,
                })
                .then(({}) => {
                    openSignInMenu();
                    // refetchAllUsers();
                    setFormValues({ username: "", email: "", password: "" });
                })
                .catch(({ request: { responseText } }) => toast({ type: "error", message: `${JSON.parse(responseText).message}` }));
        }
    };

    const refetchAllUsers = () => {
        axios.get("/api/users").then(({ data }) => setAllUsers(data));
    };

    return (
        <div className={`login-form ${styles.screen} ${showSignUp ? styles.show : ""}`} ref={menuRef}>
            <h1 className="fs-40px weight-7 black mb-30px">Sign Up</h1>

            <form onSubmit={submitHandler}>
                <main>
                    <div>
                        <label htmlFor="userName" className="unchange-gray fs-16px weight-5">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="userName"
                            className="unchange-gray fs-16px weight-5"
                            value={formValues.username}
                            onChange={({ target }) => setFormValues({ ...formValues, username: target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="userId" className="unchange-gray fs-16px weight-5">
                            User Email
                        </label>
                        <input
                            type="email"
                            id="userId"
                            className="unchange-gray fs-16px weight-5"
                            value={formValues.email}
                            onChange={({ target }) => setFormValues({ ...formValues, email: target.value })}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="unchange-gray fs-16px weight-5">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="unchange-gray fs-16px weight-5"
                            value={formValues.password}
                            onChange={({ target }) => setFormValues({ ...formValues, password: target.value })}
                        />
                    </div>
                </main>
                <p className="unchange-gray fs-10px weight-7">By singing up you agree to our privacy policy.</p>

                <footer>
                    <button type="submit" className={`${styles.loginBtn} white fs-16px weight-6 pointer`}>
                        <span>Register</span>
                        <span className={styles.icon}>
                            <MdKeyboardArrowRight />
                        </span>
                    </button>
                    <a href="#" className="unchange-gray fs-16px underline weight-5">
                        Forgot Password
                    </a>
                </footer>
            </form>

            <p className="fs-16px unchange-gray weight-5">
                Already a user?
                <a href="#" className="unchange-gray underline" onClick={openSignInMenu}>
                    Login now!
                </a>
            </p>
        </div>
    );
}

export default SignUpScreen;
