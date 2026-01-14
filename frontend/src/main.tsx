import {store} from "./redux/store.ts";
import ThemeCustomization from "./themes/index.tsx";
import {SnackbarProvider} from "notistack";
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Provider store={store}>
            {/*<StrictMode>*/}
                <ThemeCustomization>
                    <SnackbarProvider/>
                    <App/>
                </ThemeCustomization>
            {/*</StrictMode>*/}
        </Provider>
    </BrowserRouter>
)
