import { List as AntdList } from "antd";
import { List, useSimpleList } from "@refinedev/antd";

import ScenarioItem from "./ScenarioItem";

export const ScenarioList = () => {
    const { listProps } = useSimpleList({
        resource: "scenarios",
        metaData: { populate: ["steps"] },
        pagination: {
            pageSize: 200,
        },
    });
    if(listProps.loading){
        return <h1>Loading ...</h1>
    }
    return (
        <div>
            <AntdList
                grid={{ gutter: 16, xs: 1 }}
                style={{
                    justifyContent: "center",
                }}
                dataSource={listProps.dataSource} // Pass dataSource
                loading={listProps.loading} // Pass loading
                // pagination={listProps.pagination} // Pass pagination
                // renderItem={(item) => {
                //     return <AntdList.Item>
                //         <ScenarioItem item={item} />
                //     </AntdList.Item>
                // }}
            />
        </div>
    );
};
