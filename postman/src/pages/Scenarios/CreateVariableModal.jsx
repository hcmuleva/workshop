import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { DeleteButton } from '@refinedev/antd';
import axios from "axios";
import { useUpdate } from '@refinedev/core';



const CreateVariableModal = ({ visible, setVisible, onCreate, onCancel, record }) => {
  // console.log("record.variables",record.variables)
  const { mutate } = useUpdate();

  // console.log(record);


  const [form] = Form.useForm();
  const [variables, setVariables] = useState([]);
  // form.setFieldsValue({ variables: record.variables });

  const handleAddVariable = () => {
    setVariables([...variables, { name: '', value: '' }]);
  };

  const handleRemoveVariable = index => {
    const updatedVariables = [...variables];
    updatedVariables.splice(index, 1);
    setVariables(updatedVariables);
  };

  const onFinish = values => {
    console.log("OnFinishvalues", values)
    console.log("ddd", record.variables);

    mutate(
      {
        resource: "scenarios",
        id: record.id,

        values: {
          variables: [...values.variables, ...record.variables],
        },
      },
      {
        onSuccess: () => {
          //Ned to 
          //We need to call some stuff on Success and failure
        },
      },
    );
    //updateScenarioField(record.id,values.variables);
    form.resetFields();

    setVariables([]);
    setVisible(false);
  };
  return (
    <Modal
      open={visible}
      title="Create Variable"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => { setVisible(false) }}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            console.log("OnOKvalues", values)
            onFinish(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="create_request_form">

        <Form.Item label="Variable">
          {variables.map((variable, index) => (
            <div key={index} style={{ marginBottom: 8 }}>
              <Form.Item
                name={['variables', index, 'name']}
                style={{ display: 'inline-block', width: 'calc(30% - 16px)', marginRight: 8 }}
              >
                <Input placeholder="Variable Name" />
              </Form.Item>
              <Form.Item
                name={['variables', index, 'value']}
                style={{ display: 'inline-block', width: 'calc(55% - 16px)', marginRight: 8 }}
              >
                <Input placeholder="Variable Value" />
              </Form.Item>
              <Form.Item
                name={['variables', index, 'step']}
                style={{ display: 'inline-block', width: 'calc(30% - 16px)', marginRight: 8 }}
              >
                <Select
                  options={record?.steps?.map((step) => ({
                    label: step.name,
                    value: step.id,
                  }))}
                  placeholder={("step")}
                  allowClear={true}
                ></Select>
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

export default CreateVariableModal;
