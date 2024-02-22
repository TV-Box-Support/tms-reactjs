import React, { createContext, useState } from 'react';

import { merge } from 'lodash';

import { TmsLayoutSettings } from 'app/components/TmsLayout/settings';

const SettingsContext = createContext({
  settings: TmsLayoutSettings,
  updateSettings: () => {},
});

export const SettingsProvider = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState(settings || TmsLayoutSettings);

  const handleUpdateSettings = (update = {}) => {
    const marged = merge({}, currentSettings, update);
    setCurrentSettings(marged);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        updateSettings: handleUpdateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
