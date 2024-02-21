import { Box, styled } from '@mui/material';
import useSettings from 'app/hooks/useSettings';
import { Span } from './Typography';

const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
}));

const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));

const Brand = ({ children }) => {
  const { settings } = useSettings();
  const leftSidebar = settings.layout1Settings.leftSidebar;
  const { mode } = leftSidebar;

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        <img src="/assets/images/TMS_icon.png" alt="" />
        <StyledSpan mode={mode} className="sidenavHoverShow">
          TMS Monitor
        </StyledSpan>
      </Box>
      <Box className="sidenavHoverShow" sx={{ display: mode === 'compact' ? 'none' : 'block' }}>
        {/* {children || null} */}
      </Box>
    </BrandRoot>
  );
};

export default Brand;
