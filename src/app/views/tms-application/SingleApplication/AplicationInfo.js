import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
import { getAAppInfo } from 'app/Services/ApplicationServices';
import { TableList } from 'app/components/List/TableList';

const ApplicationInfo = (props) => {
  const { id } = props;
  const [arrInfo, setarrInfo] = useState([]);
  const [updateList, setUpdateList] = useState(true);

  const handleLoadDeviceData = async () => {
    let response = await getAAppInfo(id);
    // console.log(response);
    if (response.status === 200) {
      let arr = [
        { id: 'Name', value: response.data.name },
        { id: 'Package name', value: response.data.packagename },
        { id: 'Version', value: response.data.version },
        { id: 'System App', value: response.data.issytem ? 'Yes' : 'No' },
        { id: 'Created Date', value: response.data.createdDate },
      ];
      setarrInfo(arr);
    }
  };

  useEffect(() => {
    if (updateList) {
      handleLoadDeviceData();
      setUpdateList(false);
    }
  }, [updateList]);

  return <TableList data={arrInfo} density={'comfortable'} />;
};
export default ApplicationInfo;
