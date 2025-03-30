import style from './sign-in.module.css'
import {SubmitHandler, useForm} from "react-hook-form";
import {useLocation, useNavigate} from "react-router";
import {LogoComponent} from "../../shared-components/logo/logo.component.tsx";

type InputData = {
    accountName: string;
    password: string;
}


export function SignInPage() {

    const {
        register,
        handleSubmit,
    } = useForm<InputData>()
    const location = useLocation();
    let navigate = useNavigate();

    const login: SubmitHandler<InputData> = (data) => {
        fetch('http://localhost:3000/bank/sign-in', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                accountName: data.accountName,
                password: data.password
            }),
        }).then(res => res.text())
            .then(token => {
                localStorage.setItem("token", token);
                window.alert(token);
                if (location.state?.redirectLink) {
                    navigate(location.state.redirectLink);
                } else {
                    navigate('/home-page')
                }
            })
    }

    return (
        <div className={`mt-6 mx-5 ${style['container']}`}>
            <form onSubmit={handleSubmit(login)}>
                <div className={`block`}>
                    <LogoComponent/>
                </div>
                <div className={'block'}>
                    <label className={'label'}>Account Name:</label>
                    <input className={'input'} {...register("accountName")}/>
                </div>
                <div className={'block'}>
                    <label className={'label'}>Password:</label>
                    <input className={'input'} {...register("password")}/>
                </div>
                <div className={'block'}>
                    <button className={'button is-fullwidth'} type={"submit"} >Sign In
                    </button>
                </div>
            </form>

        </div>
    )
}