import { useShow, useOne } from "@refinedev/core";

import { Show, MarkdownField } from "@refinedev/antd";
import { Col, Form, Input, Row, Tabs } from "antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const StepShow = ({item}) => {
    
  
   
    return (
    
        <div>
            <h1>Step Item{item.name}</h1>
        </div>
        
    );
};
