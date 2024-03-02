import { List as AntdList } from "antd";
import { List,useSimpleList  } from "@refinedev/antd";

import ScenarioItem from "./ScenarioItem";

export const ScenarioList = () => {
    const { listProps } = useSimpleList({
        resource: "scenarios",
        metaData: { populate: ["steps"] },
        pagination: {
            pageSize: 200,
          },
    });
    
    return (
        <div>
            <List >
                <AntdList
                    grid={{ gutter: 16, xs: 1 }}
                    style={{
                        justifyContent: "center",
                    }}
                    {...listProps}
                    renderItem={(item) => {
                        return <AntdList.Item>
                            <ScenarioItem item={item} />
                        </AntdList.Item>
                    }}
                />
            </List>

        </div>
    )
}