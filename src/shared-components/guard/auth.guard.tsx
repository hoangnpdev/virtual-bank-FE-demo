import {useLocation, useNavigate} from "react-router";
import {useEffect} from "react";


export function AuthGuard({children}: any) {
    let navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (localStorage.getItem("token") === null) {
            navigate("/sign-in",
                {
                    state: {"redirectLink": `${location.pathname}${location.search}`}
                }
            )
        }
    }, []);
    return (
        children
    )
}