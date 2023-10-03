import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const App = () => {
    const navigate = useNavigate();
    const token = Cookies.get("access-token");
    useEffect(() => {
        if (token) {
            navigate("/direct-messages/@me");
        } else {
            navigate("/sign-in");
        }
    }, [token]);
    return <div></div>;
};

export default App;
