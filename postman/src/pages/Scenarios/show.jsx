import { useShow, useUpdate } from "@refinedev/core";

import { Show } from "@refinedev/antd";
import { Button, Card, Space, Spin, Table, Typography } from "antd";
import CreateStepModal from "./CreateStepModal";
import { useState } from "react";
import CreateVariableModal from "./CreateVariableModal";
import RunStepModal from "./RunStepModal";

const { Title, Text } = Typography;
const { Meta } = Card;

export const ScenarioShow = () => {
  const [variableVisible, setVariableVisible] = useState(false)
  const [visible, setVisible] = useState(false)
  const [stepVisible, setStepVisible] = useState(false)
  const { mutate } = useUpdate();
  const [selectedStepData,setSelectedStepData]=useState()
  const columns = [
    {
      title: 'Step Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'RequestType',
      dataIndex: 'requesttype',
      key: 'requesttype',
    },

    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => handleDetail(record)}>Detail</Button>
          <Button type="link" onClick={() => handleVariables(record)}>Variables</Button>
          <Button type="link" onClick={() => { setStepVisible(true);setSelectedStepData(record) }}>RunStep</Button>
        </span>
      ),
    },
  ];

  const { queryResult } = useShow({ meta: { populate: ['steps'] }, pagination: { pageSize: 200 } });
  const { data, isLoading } = queryResult;
  const { variableObj, setVariableObj } = useState({})
  const record = data?.data;
  // console.log("REcord in Scenario with steps",record)
  if (isLoading) {
    return <Spin>Loading</Spin>
  }

  const handleDetail = (record) => {
    // Handle detail action
    console.log('Detail action clicked for scenario:', record);
  };
  const handleVariables = (record) => {
    // Handle variables action
    console.log('Variables action clicked for scenario:', record);
  };

  const handleRun = (record) => {
    // Handle run action
    console.log('Run action clicked for scenario:', record);
  };
  const variablecolumns = [
    {
      title: 'VariableName',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (id, text, data_index) => (
        <span>
          <Button type="link" onClick={() => {

            const updatedVariables = [...record.variables];
            updatedVariables.splice(data_index, 1);
            console.log("updatedVariables", updatedVariables)
            mutate(
              {
                resource: "scenarios",
                id: record.id,
                values: {
                  variables: updatedVariables,
                },
              },
              {
                onSuccess: () => {
                  console.log("Successfully")
                  //We need to call some stuff on Success and failure
                },
              },
            );

          }}>Delete</Button>

        </span>
      ),
    },
  ];
  //coding require

  // console.log(record);
  return (

    <Show isLoading={isLoading}>
      <Card bordered={false} style={{ width: 300 }}>

        <Meta title={record?.name} description={record?.description} />
        <br />
        <Space>
          <Button type="dashed" primary onClick={() => { setVariableVisible(true) }}>Create Variable</Button>
          <Button type="dashed" primary onClick={() => { setVisible(true) }}>Create Step</Button>
        </Space>
      </Card>
      <br />
      <Table columns={variablecolumns} dataSource={record?.variables ?? []} pagination={false}
      />
      <Space>


      </Space>
      <CreateVariableModal visible={variableVisible} setVisible={setVariableVisible} scenarioid={record.id} variabledata={record.variables} />
      <CreateStepModal visible={visible} setVisible={setVisible} scenarioid={record.id} />
      <RunStepModal visible={stepVisible} setVisible={setStepVisible}  variabledata={record.variables} stepData={selectedStepData} setStepData={setSelectedStepData}/>
      <br />

      <Table columns={columns} dataSource={record?.steps ?? []} pagination={false} />;
    </Show>


  );
};
