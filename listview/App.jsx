import {
    Layout
} from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import routerProvider, {
    NavigateToResource
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import "@refinedev/antd/dist/reset.css";

import { PostList } from "./pages/posts";

const API_URL = "https://api.fake-rest.refine.dev";

const App = () => {
    return (
        <BrowserRouter>
            <Refine
                dataProvider={dataProvider(API_URL)}
                routerProvider={routerProvider}
                resources={[
                    {
                        name: "posts",
                      
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
                            element={<NavigateToResource resource="posts" />}
                        />

                        <Route path="posts">
                            <Route index element={<PostList />} />
                        </Route>
                    </Route>
                </Routes>
            </Refine>
        </BrowserRouter>
    );
};

export default App;