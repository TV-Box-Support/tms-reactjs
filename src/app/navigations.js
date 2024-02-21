export const navigations = [
  { name: 'Dashboard', path: '/tms-default/dashboard', icon: 'dashboard' },
  {
    name: 'Devices Manager',
    icon: 'router',
    children: [
      { name: 'Devices', path: '/tms-devices/devices-management' },
      { name: 'List Devices', path: '/tms-devices/list-devices' },
    ],
  },
  {
    name: 'Application Manager',
    icon: 'apps',
    children: [
      { name: 'Applications', path: '/tms-application/application-management' },
      { name: 'APK', path: '/tms-application/apk-management' },
    ],
  },
  {
    name: 'Policy Manager',
    icon: 'receiptLongIcon',
    children: [
      { name: 'Policy', path: '/tms-policy/policy-management' },
      { name: 'Command', path: '/tms-policy/command-management' },
      { name: 'Notification', path: '/tms-policy/notificationID-management' },
    ],
  },
  {
    name: 'User Manager',
    icon: 'security',
    path: '/tms-admin/user-management',
  },
  {
    name: 'Analytics',
    icon: 'trending_up',
    children: [{ name: 'Report', path: '/analytics/report', iconText: 'F' }],
  },
];

export const navigationsUser = [
  { name: 'Dashboard', path: '/tms-default/dashboard', icon: 'dashboard' },
  {
    name: 'Devices Manager',
    icon: 'router',
    children: [
      { name: 'Devices', path: '/tms-devices/devices-management' },
      { name: 'List Devices', path: '/tms-devices/list-devices' },
    ],
  },
  {
    name: 'Application Manager',
    icon: 'apps',
    children: [
      { name: 'Applications', path: '/tms-application/application-management' },
      { name: 'APK', path: '/tms-application/apk-management' },
    ],
  },
  {
    name: 'Policy Manager',
    icon: 'receiptLongIcon',
    children: [
      { name: 'Policy', path: '/tms-policy/policy-management' },
      { name: 'Command', path: '/tms-policy/command-management' },
      { name: 'Notification', path: '/tms-policy/notificationID-management' },
    ],
  },
  {
    name: 'Analytics',
    icon: 'trending_up',
    children: [{ name: 'Report', path: '/analytics/report', iconText: 'F' }],
  },
];
