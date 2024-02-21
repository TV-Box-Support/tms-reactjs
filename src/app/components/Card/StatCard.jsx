import { Card, Grid } from '@mui/material';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';
import BallotIcon from '@mui/icons-material/Ballot';
import Filter7Icon from '@mui/icons-material/Filter7';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useState } from 'react';
const labelIcons = {
  Online: <OnlinePredictionIcon sx={{ color: '#4175a9' }} />,
  Total: <BallotIcon sx={{ color: '#4175a9' }} />,
  '7 days': <Filter7Icon sx={{ color: '#4175a9' }} />,
  '30 days': <CalendarMonthIcon sx={{ color: '#4175a9' }} />,
};

const StatCard = (props) => {
  const { label, num, color } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const cardStyle = {
    boxSizing: 'border-box',
    border: '1px solid white',
    boxShadow: '12px 17px 51px rgba(0, 0, 0, 0.22)',
    backdropFilter: 'blur(6px)',
    borderRadius: '17px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.5s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    fontWeight: 'bolder',
    color: 'black',
    flex: '1 1 auto',
  };

  const cardHoverStyle = {
    border: '1px solid black',
    transform: 'scale(1.05)',
  };

  const cardActiveStyle = {
    transform: 'scale(0.95) rotateZ(1.7deg)',
  };
  return (
    <Card
      elevation={3}
      sx={{ p: 1 }}
      className="card"
      style={{
        background: color,
        ...cardStyle,
        ...(isHovered && cardHoverStyle),
        ...(isActive && cardActiveStyle),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
    >
      <Grid>
        <Grid
          sx={{ p: 1 }}
          style={{
            backgroundColor: 'white',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            marginRight: '15px',
          }}
        >
          {labelIcons[label]}
        </Grid>
      </Grid>
      <Grid sx={{ p: 1 }}>
        <p
          style={{
            color: 'white',
            fontSize: '16px',
            fontFamily: 'Arial, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </p>
        <p style={{ color: 'white', fontSize: '15px', fontFamily: 'Arial, sans-serif' }}>{num}</p>
      </Grid>
    </Card>
  );
};

export default StatCard;
