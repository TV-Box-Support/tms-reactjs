import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
import { TableList } from 'app/components/List/TableList';
import { getAPolicy } from 'app/Services/PolicyServices';

const PolicyInfo = (props) => {
  const { id } = props;
  const [arrPolicyInfo, setarrPolicyInfo] = useState([]);
  const [updateList, setUpdateList] = useState(true);

  const handleLoadDeviceData = async () => {
    let response = await getAPolicy(id);
    // console.log(response);
    if (response.status === 200) {
      let arr = [
        { id: 'Policy', value: response.data.policyname },
        { id: 'Command', value: response.data.commandName },
        {
          id: 'Action',
          value:
            response.data.action === 1
              ? 'Install'
              : response.data.action === 2
              ? 'Uninstall'
              : 'Run Command',
        },
        {
          id: 'Status',
          value:
            response.data.status === 0
              ? 'Not Run'
              : response.data.status === 1
              ? 'Run'
              : response.data.status === 2
              ? 'Pause'
              : 'Stop',
        },
        { id: 'Created By', value: response.data.createdBy },
        { id: 'Created Date', value: response.data.createdDate },
        { id: 'Modified By', value: response.data.modifiedBy },
        { id: 'Modified Date', value: response.data.modifiedDate },
      ];
      setarrPolicyInfo(arr);
      // console.log(arr);
    }
  };

  useEffect(() => {
    if (updateList) {
      handleLoadDeviceData();
      setUpdateList(false);
    }
  }, [updateList]);

  return <TableList data={arrPolicyInfo} density={'compact'} />;
};
export default PolicyInfo;
