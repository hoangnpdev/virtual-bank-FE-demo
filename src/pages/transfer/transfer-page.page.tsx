import {useForm} from "react-hook-form";

type InputData = {
    accountName: string,
    amount: number
}

export function TransferPage() {
    const {
        register,
        handleSubmit
    } = useForm<InputData>()
    const transfer = (data: InputData) => {
        fetch("http://localhost:3000/bank/transfer-money", {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(body => {
                window.alert(JSON.stringify(body));
            }).catch(error => {
            window.alert(JSON.stringify(error));
        })
    }
    return (
        <div className={'pt-3 px-3'}>
            <div className={'block'}>
                <h5 className={'h5'}> // Transfer money to other account</h5>
            </div>
            <form onSubmit={handleSubmit(transfer)}>
                <div className={'block'}>
                    <label className={'label'}>Account Name:</label>
                    <input className={'input'} {...register('accountName')}/>
                </div>
                <div className={'block'}>
                    <label className={'label'}>Amount: </label>
                    <input className={'input'} {...register('amount')}/>
                </div>
                <div className={'block'}>
                    <button className={'button is-fullwidth'} type={'submit'}>Transfer</button>
                </div>
            </form>
        </div>
    )


}