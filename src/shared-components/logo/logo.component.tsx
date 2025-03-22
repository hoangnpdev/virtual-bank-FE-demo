import style from "./logo.module.css";


export function LogoComponent() {
    return (
        <div className={`${style['logo']} content is-fullwidth`}>
            <h1>VirtualBank</h1>
            <p>IPay Mobile</p>
        </div>
    )
}