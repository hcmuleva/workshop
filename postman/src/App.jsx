
import { Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource
} from "@refinedev/react-router-v6";

import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import {
    useNotificationProvider,
    Layout,
    ErrorComponent,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { ScenarioList } from "./pages/Scenarios/list";
import {  DataProvider } from "@refinedev/strapi-v4";
import { ScenarioShow } from "./pages/Scenarios/show";

const API_URL = import.meta.env.VITE_SERVER_API

const App = () => {

    return (
        <BrowserRouter>
            <Refine
                dataProvider={DataProvider(API_URL+'/api')}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "scenarios",
                        list: ScenarioList,
                        show: ScenarioShow

                    },
                ]}
                notificationProvider={useNotificationProvider}
                options={{
                    warnWhenUnsavedChanges: true,
                    syncWithLocation: true,
                }}

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
                            <Route path="show/:id" element={<ScenarioShow></ScenarioShow>} />
                          
                        </Route>
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;