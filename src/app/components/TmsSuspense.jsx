import { TmsLoading } from 'app/components';
import { Suspense } from 'react';

const TmsSuspense = ({ children }) => {
  return <Suspense fallback={<TmsLoading />}>{children}</Suspense>;
};

export default TmsSuspense;
