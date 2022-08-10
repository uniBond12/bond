import "scss/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { IKContext } from "imagekitio-react";
import IconsSidebar from "layouts/IconsSidebar";
import SignUpScreen from "../components/SignUpScreen";
import LoginScreen from "components/LoginScreen";
import ChatModal from "components/ChatModal";
import { Provider } from "react-redux";
import { store } from "reduxState/store";
import BlackScreen from "components/BlackScreen";
import ReduxStateProvider from "HOC/ReduxStateProvider";
import { ToastContainer } from "react-toastify";

const toastConfiig = {};

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <IKContext urlEndpoint="https://ik.imagekit.io/l4k8brcjb/uniBond/">
                <IconsSidebar />
                <ToastContainer position="top-center" autoClose={2000} newestOnTop={false} pauseOnVisibilityChange closeOnClick pauseOnHover />
                <SignUpScreen />
                <LoginScreen />
                <ChatModal />
                <BlackScreen />
                <ReduxStateProvider />
                <Component {...pageProps} />
            </IKContext>
        </Provider>
    );
}

export default MyApp;
