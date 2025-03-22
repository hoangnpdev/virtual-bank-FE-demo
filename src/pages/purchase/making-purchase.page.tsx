import style from './making-purchase.module.scss'
import {useSearchParams} from "react-router";
import {useEffect, useState} from "react";

type PaymentInfo = {
    paymentId: string;
    amount: number;
    status: string;
}

export function MakingPurchasePage() {

    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>();

    useEffect(() => {
        let paymentId: string | null = searchParams.get('payment_id');
        fetch(`http://localhost:3000/payment-gateway/payment/${paymentId ?? ''}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(body => {
                setPaymentInfo(body);
            });


    }, [])

    const confirm = () => {
        fetch(`http://localhost:3000/payment-gateway/payment/${paymentInfo?.paymentId}/purchase`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => res.json())
            .then(() => {
                window.location.href = `${searchParams.get('redirect_link')}?payment_id=${paymentInfo?.paymentId}`
            });
    }

    return (
        <div className={style['container']}>
            <div className={style['header']}>
                <p className={'has-text-primary-bold'}>
                    <span className={'icon'}>
                        <i className={'fa fa-long-arrow-left'}></i>
                    </span> Making purchase
                </p>
            </div>
            <div className={style['payment-info']}>
                <div className={style['info-line']}>
                    <p className={'has-text-text'}>Payment ID </p>
                    <p className={'has-text-primary-bold'}>{paymentInfo?.paymentId}</p>
                </div>
                <div className={style['info-line']}>
                    <p className={'has-text-text'}>Amount </p>
                    <p className={'has-text-primary-bold'}>{paymentInfo?.amount}</p>
                </div>
                <div className={style['info-line']}>
                    <p className={'has-text-text'}>Status </p>
                    <p className={'has-text-primary-bold'}>{paymentInfo?.status}</p>
                </div>
            </div>
            <div className={style['confirm']}>
                <button className={'button has-background-primary is-fullwidth'}
                        onClick={confirm}
                >Confirm
                </button>
            </div>

        </div>
    )
}