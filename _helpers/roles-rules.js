export const rolesRules = {
  isPremium,
  isAdmin,
  isFsrAdmin
}

function isPremium(userRole) {
  return userRole === "admin" || userRole === "premium" || userRole === "fsrteam"
}

function isFsrAdmin(userRole){
  return userRole === "admin" || userRole === "fsrteam"
}

function isAdmin(userRole) {
  return userRole === "admin"
}
