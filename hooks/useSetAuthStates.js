import { useDispatch } from "react";
import { toggleState as toggleSignUpScreenState } from "reduxState/slices/signUpModalSlice";
import { toggleState as toggleLoginScreenState } from "reduxState/slices/loginModalSlice";
import { toggleState as toggleBlackScreenState } from "reduxState/slices/blackScreenSlice";
import { auth as authState } from "reduxState/slices/authSlice";

const useSetAuthStates = (stateSetter, authType) => {
    const dispatch = useDispatch();

    switch (authType) {
        case "login":
            dispatch(toggleLoginScreenState(true));
            dispatch(toggleBlackScreenState(true));
            stateSetter(false);

        case "signUp":
            dispatch(toggleLoginScreenState(false));
            dispatch(toggleSignUpScreenState(true));
            stateSetter(false);

        case "logout":
            stateSetter(false);
            setTimeout(() => dispatch(authState({ id: "", username: "", token: "", isAdmin: false, auth: false })), 1000);
    }
};

export default useSetAuthStates;
