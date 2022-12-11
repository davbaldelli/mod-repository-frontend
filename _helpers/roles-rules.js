export const rolesRules = {
  isPremium,
  isAdmin
}

function isPremium(userRole) {
  return userRole === "admin" || userRole === "premium" || userRole === "fsrteam"
}

function isAdmin(userRole) {
  return userRole === "admin"
}
