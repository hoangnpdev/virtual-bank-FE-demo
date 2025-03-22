import style from './sign-up.module.css'
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router";
import {LogoComponent} from "../../shared-components/logo/logo.component.tsx";

type InputData = {
    accountName: string,
    password: string,
    passwordRetype: string
}

export function SignUpPage() {

    const {
        register,
        handleSubmit
    } = useForm<InputData>();

    let navigate = useNavigate();

    const signup = (data: InputData) => {
        fetch("http://localhost:3000/bank/sign-up", {
            method: 'POST',
            headers: {
                'Content-type': "application/json",
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(body => {
                window.alert(JSON.stringify(body));
                navigate('/sign-in')
            })
    }

    return (
        <div className={`mt-6 mx-5 ${style['container']}`}>
            <form onSubmit={handleSubmit(signup)}>
                <div className={`block`}>
                    <LogoComponent></LogoComponent>
                </div>

                <div className={'block'}>
                    <label className={'label'}>Account Name:</label>
                    <input className={'input'} {...register('accountName')}/>
                </div>
                <div className={'block'}>
                    <label className={'label'}>Password:</label>
                    <input className={'input'} {...register('password')}/>
                </div>
                <div className={'block'}>
                    <label className={'label'}>Password retype:</label>
                    <input className={'input'} {...register('passwordRetype')}/>
                </div>
                <div className={'block'}>
                    <button className={'button is-fullwidth'} type={'submit'}>Sign Up</button>
                </div>
            </form>
        </div>

    )
}