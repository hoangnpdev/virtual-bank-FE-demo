import {Route, Routes} from "react-router";
import {SignInPage} from "./pages/sign-in/sign-in.page.tsx";
import style from './app.module.scss'
import {SignUpPage} from "./pages/sign-up/sign-up.page.tsx";
import {Homepage} from "./pages/homepage/homepage.page.tsx";
import {TransferPage} from "./pages/transfer/transfer-page.page.tsx";
import {MerchantCreationPage} from "./pages/merchant-creation/merchant-creation.page.tsx";
import {MakingPurchasePage} from "./pages/purchase/making-purchase.page.tsx";

function App() {


    return (
        <div className={style['container']}>
            <div className={`${style['content']} has-background-white-ter`}>
                    <Routes>
                        <Route path="/sign-in" element={<SignInPage/>}/>
                        <Route path="/sign-up" element={<SignUpPage/>}/>
                        <Route path={'/home-page'} element={<Homepage/>}/>
                        <Route path={'/transfer'} element={<TransferPage/>}/>
                        <Route path={'/merchant-creation'} element={<MerchantCreationPage/>} />
                        <Route path={'/purchase-making'} element={<MakingPurchasePage/>}/>
                    </Routes>
            </div>
        </div>
    )
}

export default App
