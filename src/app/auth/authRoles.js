// export const authRoles = {
//     sa: ['SA'], // Only Super Admin has access
//     admin: ['SA', 'ADMIN'], // Only SA & Admin has access
//     editor: ['SA', 'ADMIN', 'EDITOR'], // Only SA & Admin & Editor has access
//     guest: ['SA', 'ADMIN', 'EDITOR', 'GUEST'], // Everyone has access
// }

export const authRoles = {
  mod: 0, // Only Super Admin has access
  admin: 1, // Only SA & Admin has access
  user: 2,
};
