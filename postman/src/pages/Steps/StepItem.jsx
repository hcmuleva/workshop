import React from 'react';
import { Card, Col, Row, Space,Select } from "antd";
import { DeleteButton, EditButton, ShowButton } from "@refinedev/antd";
const { Meta } = Card;

const StepItem = ({item}) => {
    return (
        <Card
                style={{ width: 300 }}
                title={`Project: ${item.name}`}

                actions={[
                    <EditButton key="edit" recordItemId={item.id} />,
                    <DeleteButton
                        key="delete"
                        
                        
                        recordItemId={item.id}
                    />,
                    <ShowButton key="show"
                       
                      
                        recordItemId={item.id}
                        data={item}
                        onClick={()=>{show("projects", item.id)}}
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

export default StepItem;