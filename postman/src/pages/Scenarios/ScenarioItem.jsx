import { useNavigation } from '@refinedev/core';
import React from 'react';
import { Card, Col, Row, Space,Select } from "antd";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
const { Meta } = Card;

const ScenarioItem = ({item}) => {
    const { edit, create, show } = useNavigation();

    return (
        <Card
                style={{ width: 300 }}
                title={`Scenario: ${item.name}`}

                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <DeleteButton
                        key="delete"
                        
                        
                        recordItemId={item.id}
                    />,
                    <ShowButton key="show"
                       
                      
                        recordItemId={item.id}
                        data={item}
                        onClick={()=>{show("scenarios", item.id)}}
                    />
                ]}
            >
               
     
     
   
                <Meta
                    className="ant-card-meta-title"
                   
                // description={item.description}
                />
            </Card>
    );
};

export default ScenarioItem;