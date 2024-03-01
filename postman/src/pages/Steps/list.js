import { List, useSimpleList } from "@refinedev/antd";
import { List as AntdList } from "antd";
import StepItem from "./StepItem";

export const StepList = () => {
    const { listProps } = useSimpleList({
        resource: "steps",
        metaData: { populate: ["scenarios"] },
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
                            <StepItem item={item} />
                        </AntdList.Item>
                    }}
                    
                />
            </List>



        </div>
    );
};