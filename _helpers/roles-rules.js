export const rolesRules = {
  isPremium,
  isAdmin
}

function isPremium(userRole) {
  return userRole === "admin" || userRole === "premium"
}

function isAdmin(userRole) {
  return userRole === "admin"
}
