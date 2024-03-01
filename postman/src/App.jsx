
import { Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
    useNotificationProvider,
    Layout,
    ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import {ScenarioList} from "./pages/scenarios/list";




const API_URL =  import.meta.env.VITE_SEVER_API

const App = () => {
     
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider(API_URL+'/api')}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "scenarios",
                        list: ScenarioList
                      
                    },
                ]}

            >
                <Routes>
                    <Route
                        element={
                            <Layout>
                                <Outlet />
                            </Layout>
                        }
                    >
                        <Route
                            index
                            element={<NavigateToResource resource="scenarios" />}
                        />

                        <Route path="scenarios">
                            <Route index element={<ScenarioList></ScenarioList>} />
                        </Route>
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;