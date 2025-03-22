import style from './homepage.module.scss'
import {LogoComponent} from "../../shared-components/logo/logo.component.tsx";
import profilePicture from '/profile.jpg'
import servicePicture from '/service.png'
import {useEffect, useState} from "react";
import {Link} from "react-router";

interface UserInfo {
    accountId: string;
    accountName: string;
    password: string;
    balance: number;
    cardId: string;
}

export function Homepage() {

    const [userInfo, setUserInfo] = useState<UserInfo>();

    useEffect(() => {
        fetch("http://localhost:3000/bank/account-info", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        ).then(res => res.json())
            .then(body => {
                console.log(body);
                setUserInfo(body)
            })
    }, [])

    return (
        <div className={`${style['container']}`}>
            <div className={`py-6 px-3 has-background-info`}>
                <div className={'block'}>
                    <LogoComponent/>
                </div>
                <div className={`block ${style['account-section']}`}>
                    <div className={'mx-2'}>
                        <figure className="image is-64x64">
                            <img className="is-rounded" src={profilePicture} alt={''}/>
                        </figure>
                    </div>
                    <div className={'mx-2'}>
                        <div><strong>{userInfo?.accountName}</strong></div>
                        <div>Status: <span className="tag is-success">Active</span></div>
                    </div>
                </div>
            </div>
            <div className={`px-3 ${style['second-area']}`}>
                <div className={`block ${style['card-section']}`}>
                    <div className={style['card-item']}>
                        <div className={'card mx-2'}>
                            <div className={style['modified-card-content']}>
                                <p className={'content is-small'}><em>Card Id: </em>{userInfo?.cardId}</p>
                                <p className={'content is-small'}><em>Balance: </em>{userInfo?.balance}</p>
                            </div>
                            <header className={'card-header'}>
                                <a href={'#'}><p className={"card-header-title content is-small"}>Account List {'>'}</p>
                                </a>
                            </header>
                        </div>
                    </div>
                    <div className={style['card-item']}>
                        <div className={'card mx-2'}>
                            <div className={style['modified-card-content']}></div>
                            <header className={'card-header'}>
                                <a href={'#'}><p className={"card-header-title content is-small"}>Card List {'>'}</p>
                                </a>
                            </header>
                        </div>
                    </div>
                </div>

                <p>Services</p>
                <div className={style['service-section']}>
                    <div className={style['service-item']}>
                        <Link to={'/transfer'}>
                            <div>
                                <div className={'card m-2'}>
                                    <div className={'card-content'}>
                                        <figure className="image is-32x32">
                                            <img className="is-rounded" src={servicePicture} alt={''}/>
                                        </figure>
                                    </div>
                                    <header className={'card-header'}>
                                        <p className={"card-header-title content is-small"}>
                                            Transfer Money
                                        </p>
                                    </header>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className={style['service-item']}>
                        <Link to={'/transfer'}>
                            <div className={'card m-2'}>
                                <div className={'card-content'}>
                                    <figure className="image is-32x32">
                                        <img className="is-rounded" src={servicePicture} alt={''}/>
                                    </figure>
                                </div>
                                <header className={'card-header'}>
                                        <p className={"card-header-title content is-small"}>
                                            Merchant Management
                                        </p>
                                </header>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>


    )
}