import style from './merchant-creation.module.scss'
import {useSearchParams} from "react-router";
import shopPicture from '/img.png'

export function MerchantCreationPage() {

    const [searchParams]= useSearchParams();

    const confirm = () => {
        fetch("http://localhost:3000/payment/merchant", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(body => {
                window.alert(JSON.stringify(body));
                window.location.href = searchParams.get('redirect_link') ?? '';
            })
    }

    // const cancel = () => {
    //     window.location.href = searchParams.get('redirect_link') ?? '';
    // }

    return (
        <div className={style['container']}>
            <div className={style['title']}>
                <div className={'content is-medium'}>
                    <p> // Creating merchant</p>
                </div>
            </div>
            <div className={style['content']}>
                <img src={shopPicture} alt={''}/>
            </div>
            <div className={style['confirm']}>
                <button className={'button is-fullwidth has-background-primary'}
                onClick={confirm}>Confirm</button>
            </div>
        </div>
    )
}