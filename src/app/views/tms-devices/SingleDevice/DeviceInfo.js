import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
import { getADeviceInfo } from 'app/Services/DevicesServices';
import { TableList } from 'app/components/List/TableList';

const DeviceInfo = (props) => {
  const { id } = props;
  const [arrDeviceInfo, setarrDeviceInfo] = useState([]);
  const [updateList, setUpdateList] = useState(true);

  const handleLoadDeviceData = async () => {
    let response = await getADeviceInfo(id);
    // console.log(response);
    if (response.status === 200) {
      let arr = [
        { id: 'Firmware', value: response.data.firmwareVer },
        { id: 'Resolution', value: response.data.hdmi },
        { id: 'IP', value: response.data.ip },
        { id: 'Location', value: response.data.location },
        { id: 'MAC', value: response.data.mac },
        { id: 'Serial number', value: response.data.sn },
        { id: 'Model', value: response.data.model },
        { id: 'Network', value: response.data.network },
        { id: 'Rom', value: response.data.rom },
        { id: 'Created Date', value: response.data.createdDate },
        { id: 'Modified Date', value: response.data.modifiedDate },
      ];
      setarrDeviceInfo(arr);
    }
  };

  useEffect(() => {
    if (updateList) {
      handleLoadDeviceData();
      setUpdateList(false);
    }
  }, [updateList]);

  return <TableList data={arrDeviceInfo} density={'compact'} />;
};
export default DeviceInfo;
