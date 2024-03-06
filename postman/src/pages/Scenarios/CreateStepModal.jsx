import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { DeleteButton } from '@refinedev/antd';
import { useCustomMutation } from '@refinedev/core';

const { Option } = Select;
const API_URL = import.meta.env.VITE_SERVER_API

const CreateStepModal = ({ visible, setVisible, onCreate, onCancel, scenarioid }) => {
  // console.log("scenarioid", scenarioid)
  const { mutate } = useCustomMutation();

  const [form] = Form.useForm();
  const [headerVariables, setHeaderVariables] = useState([]);
  const handleHeaderAddVariable = () => {
    setHeaderVariables([...headerVariables, { name: '', value: '' }]);
  };

  const handleHeaderRemoveVariable = index => {
    const updatedHeaderVariables = [...headerVariables];
    updatedHeaderVariables.splice(index, 1);
    setHeaderVariables(updatedHeaderVariables);
  };




  const onFinish = values => {
    console.log("OnFinishvalues headerVariables", headerVariables);
    console.log("OnFinishvalues", values);
    
    const payloaddata = { ...values, header: headerVariables, scenario: scenarioid }
    console.log("payloaddata", payloaddata);
    mutate(
      {
        url: `${API_URL}/api/steps`,
        method: "post",

        values: {
          data: { ...payloaddata }
        },
      },
      {
        onSuccess: () => {
          console.log("Successfully created step");
          //Ned to 
          //We need to call some stuff on Success and failure
        }, onError: () => {
          console.log("Error in creating step");
        }
      },
    );
    form.resetFields();

    setHeaderVariables([]);
    setVisible(false);
  };
  return (
    <Modal
      open={visible}
      title="Create Request"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => { setVisible(false) }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            onFinish(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
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
          {headerVariables.map((header, index) => (
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


      </Form>
    </Modal>
  );
};

export default CreateStepModal;
