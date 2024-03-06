import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { DeleteButton } from '@refinedev/antd';
import axios from "axios";
import { useUpdate } from '@refinedev/core';

const API_URL = import.meta.env.VITE_SERVER_API

function getValueByPath(obj, path) {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
        if (typeof value === 'object' && value !== null) {
            value = value[key];
        } else {
            return null;
        }
    }
    return value;
}

async function handleScenarioVariableObject(scenarioVariables,stepData) {
     
    // console.log(variabledata);
    const a={}
    
    for (const variable of scenarioVariables) {
        if ('step' in variable && variable.step!=stepData.id) {
             
            const response = await fetch(`${API_URL}/api/steps/${variable['step']}`);
            
            if (response.status === 200) {
                const responseData = await response.json();
                // console.log(responseData['data']['attributes']['response']);
                a[variable['name']]=getValueByPath(responseData['data']['attributes']['response'], variable['value']);
            }
        }else{
            a[variable['name']]=variable['value']
        }
        
    }
    return a;
}

function replaceVariable(scenarioVariables) {
    return function(match, variableName) {
        if (scenarioVariables.hasOwnProperty(variableName)) {
            return scenarioVariables[variableName];
        } else {
            return match;
        }
    };
}

function updateVariables(data, scenarioVariables) {
    const replace = replaceVariable(scenarioVariables);

    if (typeof data === 'object') {
        if (Array.isArray(data)) {
            return data.map(item => updateVariables(item, scenarioVariables));
        } else {
            const updatedData = {};
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    updatedData[key] = updateVariables(data[key], scenarioVariables);
                }
            }
            return updatedData;
        }
    } else if (typeof data === 'string') {
        return data.replace(/\{\{(\w+)\}\}/g, replace);
    } else {
        return data;
    }
}




const RunStepModal = ({ visible, setVisible, variabledata, stepData, setStepData }) => {
    // console.log("variabledata", variabledata)
    const { mutate } = useUpdate();
    const [form] = Form.useForm();
    const [variables, setVariables] = useState([]);

    const [headerVariables, setHeaderVariables] = useState(variabledata ?? []);
    // form.setFieldsValue({ variables: variabledata });
    
    const handleAddVariable = () => {
        setVariables([...variables, { name: '', value: '' }]);
    };

    const handleRemoveVariable = (index) => {
        const updatedVariables = [...variables];
        updatedVariables.splice(index, 1);
        setVariables(updatedVariables);
    };

    const handleHeaderAddVariable = () => {
        setHeaderVariables([...headerVariables, { name: '', value: '' }]);
    };

    const handleHeaderRemoveVariable = (index) => {
        const updatedHeaderVariables = [...headerVariables];
        updatedHeaderVariables.splice(index, 1);
        setHeaderVariables(updatedHeaderVariables);
    };

    const onFinish = async (values) => {
        // console.log("OnFinishvalues", values,headerVariables)
        
        // console.log("ddd");
        const { payload, url, requesttype } = values
        const header_obj=Object.fromEntries(headerVariables.map(d=>[d.name,d.value]))
        const scenarioVariables=await handleScenarioVariableObject(variabledata,stepData)
        // console.log(header_obj);

        const updatedUrl=updateVariables(url,scenarioVariables)
        const updatedHeaders=updateVariables(header_obj,scenarioVariables)
        const updatedPayload=updateVariables(JSON.parse(payload),scenarioVariables)


        console.log(updatedHeaders);
         
         
         
        let axiosRequest;
        
        switch (requesttype.toUpperCase()) {
            case 'GET':
                axiosRequest = axios.get(updatedUrl, { headers:updatedHeaders });
                break;
            case 'POST':
                axiosRequest = axios.post(updatedUrl,updatedPayload, { headers:updatedHeaders });
                break;
            case 'PUT':
                axiosRequest = axios.put(updatedUrl,updatedPayload, { headers:updatedHeaders});
                break;
            case 'DELETE':
                axiosRequest = axios.delete(updatedUrl, { headers:updatedHeaders });
                break;
            default:
                throw new Error('Unsupported request type');
        }

        // Send the request and handle the response
        axiosRequest.then((response) => {
            console.log('Response:', response.data);
            mutate(
                {
                    resource: "steps",
                    id: stepData?.id,
                    values: {
                        response: response.data
                    }
                },

            );
        }).catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });


        // // updateScenarioField(scenarioid,values.variables);
        form.resetFields();
        setStepData()
        setVariables([]);
        setHeaderVariables([])
        setVisible(false);
    };

    const handleEdit = () => {
        const values = form.getFieldsValue()
        mutate(
            {
                resource: "steps",
                id: stepData?.id,
                values: { ...values, header: headerVariables }
            },
            {
                onError: (error, variables, context) => {
                  // An error occurred!
                },
                onSuccess: (data, variables, context) => {
                  // Let's celebrate!
                  form.resetFields();
                  setStepData()
                  setVariables([]);
                  setHeaderVariables([])
                  setVisible(false);
                  window.location.reload()
                },
              },
        ) 

       



    }

    useEffect(() => {
        // console.log(stepData);
        form.setFieldsValue({
            name: stepData?.name,
            requesttype: stepData?.requesttype,
            url: stepData?.url,
            payload: stepData?.payload
        })
        setHeaderVariables(stepData?.header ?? [])
    }, [stepData])



    return (
        <Modal
            open={visible}
            title="Run Steps"
            okText="Run Step"
            cancelText="Cancel"
            onCancel={() => { setVisible(false) }}
            
            // Add an additional button along with Ok and Cancel
            footer={[
                <Button type="primary" key="additionalButton" onClick={handleEdit}>
                    Edit
                </Button>,
                <Button key="cancel" onClick={() => setVisible(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={() => {
                 
                    form
                        .validateFields()
                        .then(values => {
                            // console.log("OnOKvalues", values)
                            onFinish(values);
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        });
                }}>
                    Ok
                </Button>
            ]}
        >
            <Form form={form} layout="vertical" name="create_request_form">

                <Form.Item
                    label="Step Name"
                    name="name"
                    style={{ marginBottom: 0, width: '70%' }}
                    rules={[{ required: true, message: 'Please enter URL' }]}
                >
                    <Input style={{ width: '100%' }} />
                </Form.Item>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Form.Item
                        label="Request Type"
                        name="requesttype"
                        style={{ marginBottom: 0, width: '30%', marginRight: '10px' }}
                        rules={[{ required: true, message: 'Please select request type' }]}
                    >
                        <Select style={{ width: '100%' }}>
                            <Option value="GET">GET</Option>
                            <Option value="POST">POST</Option>
                            <Option value="PUT">PUT</Option>
                            <Option value="DELETE">DELETE</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="URL"
                        name="url"
                        style={{ marginBottom: 0, width: '70%' }}
                        rules={[{ required: true, message: 'Please enter URL' }]}
                    >
                        <Input style={{ width: '100%' }} />
                    </Form.Item>
                </div>
                <Form.Item label="Header">
                    {headerVariables?.map((header, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            <Input
                                placeholder="Header Name"
                                value={header.name}
                                onChange={e => {
                                    const updatedHeaderVariables = [...headerVariables];
                                    updatedHeaderVariables[index].name = e.target.value;
                                    setHeaderVariables(updatedHeaderVariables);
                                }}
                                style={{ width: 'calc(30% - 16px)', marginRight: 8 }}
                            />
                            <Input
                                placeholder="Header Value"
                                value={header.value}
                                onChange={e => {
                                    const updatedHeaderVariables = [...headerVariables];
                                    updatedHeaderVariables[index].value = e.target.value;
                                    setHeaderVariables(updatedHeaderVariables);
                                }}
                                style={{ width: 'calc(55% - 16px)', marginRight: 8 }}
                            />
                            <Button type="dashed" danger onClick={() => handleHeaderRemoveVariable(index)}>
                                X
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleHeaderAddVariable} style={{ width: '100%' }}>
                        Add Header
                    </Button>
                </Form.Item>
                <Form.Item
                    label="Payload"
                    name="payload"
                    placeholder="Enter json payload"
                    style={{ marginBottom: 0 }}
                >
                    <Input.TextArea style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item label="Variable">
                    {variables.map((variable, index) => (
                        <div key={index} style={{ marginBottom: 8 }}>
                            <Form.Item
                                name="step_variable"
                                label
                                style={{ display: 'inline-block', width: 'calc(30% - 16px)', marginRight: 8 }}
                            >
                                <Input placeholder="variable name"/>
                            </Form.Item>
                            <Form.Item
                                name={['variables', index, 'value']}
                                style={{ display: 'inline-block', width: 'calc(55% - 16px)', marginRight: 8 }}
                            >
                                <Input placeholder="Variable Value" />
                            </Form.Item>
                            <Button type="dashed" danger onClick={() => handleRemoveVariable(index)}>
                                X
                            </Button>
                        </div>
                    ))}
                    <Button type="dashed" onClick={handleAddVariable} style={{ width: '100%' }}>
                        Add Variable
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RunStepModal;
