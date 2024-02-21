import { Button, Stack, Tooltip, Icon } from '@mui/material';
import { Span } from 'app/components/Typography';
import { Breadcrumb, SimpleCard } from 'app/components';
import AccountForm from './AccountForm';
import AccountChangePassword from './AccountChangPassword';
import { useState } from 'react';
import { Container } from 'app/components/TagPage/CustomTag';

const AccountFormManage = () => {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const handleOncickChangePassword = () => {
    setOpenChangePassword(true);
  };
  return (
    <Container>
      <Breadcrumb routeSegments={[{ name: 'Account Manager' }, { name: 'Account Form' }]} />
      <Stack spacing={3}>
        <SimpleCard title="User Data">
          <AccountForm />
        </SimpleCard>
        <SimpleCard title="Change Password">
          <Tooltip title="Change Password" placement="left">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={handleOncickChangePassword}
            >
              <Icon>edit</Icon>
              <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Change Password</Span>
            </Button>
          </Tooltip>
        </SimpleCard>
      </Stack>
      <AccountChangePassword
        stateOpenChangePassword={openChangePassword}
        setStateOpenChangePassword={setOpenChangePassword}
      />
    </Container>
  );
};

export default AccountFormManage;
