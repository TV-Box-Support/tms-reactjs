import { Button, Grid, Icon, styled } from '@mui/material';
import { getAnUser, putEditOwnData } from 'app/Services/User_Auth_Service';
import { Span } from 'app/components/Typography';
import { useEffect, useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import useAuth from 'app/hooks/useAuth';
import { toast } from 'react-toastify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const AccountForm = () => {
  const [state, setState] = useState({});
  const [oldData, setOldData] = useState({});
  const { user } = useAuth();
  const [updateData, setUpdateData] = useState(true);
  const { id, name, email, userName, company, contact } = state;

  useEffect(() => {
    if (updateData) {
      handleLoadAccountData();
      setUpdateData(false);
    }
  }, [updateData]);

  const handleLoadAccountData = async () => {
    let accountData = await getAnUser(user.id);
    // console.log(accountData);
    if (accountData.status === 200) {
      setState({
        id: accountData.data.id,
        name: accountData.data.name,
        email: accountData.data.email,
        userName: accountData.data.username,
        company: accountData.data.company,
        contact: accountData.data.contact,
      });
      setOldData({
        id: accountData.data.id,
        name: accountData.data.name,
        email: accountData.data.email,
        userName: accountData.data.username,
        company: accountData.data.company,
        contact: accountData.data.contact,
      });
    } else {
      toast.error(accountData.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (company === oldData.company && contact === oldData.contact && email === oldData.email) {
      toast.info('Nothing changes');
    } else {
      let data = {
        id: id,
        company: company,
        email: email,
        contact: contact,
      };
      let res = await putEditOwnData(data);
      console.log(res);
      if (res.status === 200) {
        toast.success('Change data success');
        setUpdateData(true);
      } else {
        toast.error(res.message);
      }
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="name"
              disabled
              label="Name"
              value={name || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="userName"
              disabled
              label="Username"
              value={userName || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="Email"
              value={email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              type="text"
              name="company"
              label="Company"
              value={company || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="contact"
              type="text"
              label="Contact (Phone Number)"
              value={contact || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['This field is required']}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
        <br />
        <Button color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: 'capitalize' }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AccountForm;
