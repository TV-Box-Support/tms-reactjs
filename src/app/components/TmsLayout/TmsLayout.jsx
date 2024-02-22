import { TmsSuspense } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { TmsLayouts } from './index';

const TmsLayout = (props) => {
  const { settings } = useSettings();
  const Layout = TmsLayouts[settings.activeLayout];

  return (
    <TmsSuspense>
      <Layout {...props} />
    </TmsSuspense>
  );
};

export default TmsLayout;
