import React, { useState } from "react";
import styles from "scss/components/LoginScreen.module.scss";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import OutsideClickDetector from "hooks/OutsideClickDetector";
import { toggleState as toggleSignUpScreenState } from "reduxState/slices/signUpModalSlice";
import { toggleState as toggleLoginScreenState } from "reduxState/slices/loginModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { auth as authState } from "reduxState/slices/authSlice";
import axios from "axios";
import toast from "./Toast";
import { isMember } from "../utils/helpers/member";

function LoginScreen() {
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const { show: showLogin } = useSelector((state) => state.loginScreenState);
    const dispatch = useDispatch();

    const menuRef = OutsideClickDetector(() => {
        toggleStates();
    });

    const toggleStates = () => {
        dispatch(toggleLoginScreenState(false));
        dispatch(toggleBlackScreenState(false));
    };

    const openSignUpMenu = () => {
        dispatch(toggleSignUpScreenState(true));
        dispatch(toggleLoginScreenState(false));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const isMmember = isMember(formValues?.email);
        const userType = isMmember ? "members" : "users";
        axios
            .post(`/api/${userType}/authenticate`, {
                ...formValues,
            })
            .then(({ data }) => {
                localStorage.setItem("currentUser", JSON.stringify({ auth: true, ...data }));
                dispatch(authState({ auth: true, ...data }));
                setFormValues({ email: "", password: "" });
                toggleStates();
            })
            .catch(({ request: { responseText } }) => toast({ type: "error", message: `${JSON.parse(responseText).message}` }));
    };

    return (
        <div className={`login-form ${styles.screen} ${showLogin ? styles.show : ""}`} ref={menuRef}>
            <h1 className="fs-40px weight-7 black mb-30px">Login</h1>

            <form onSubmit={submitHandler}>
                <main>
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
                <p className="unchange-gray fs-10px weight-7">By logging in you agree to our privacy policy.</p>

                <footer>
                    <button type="submit" className={`${styles.loginBtn} white fs-16px weight-6 pointer`}>
                        <span>Login Now</span>
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
                Not a user yet?
                <a href="#" className="unchange-gray underline" onClick={openSignUpMenu}>
                    Register now!
                </a>
            </p>
        </div>
    );
}

export default LoginScreen;
