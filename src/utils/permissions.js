"use strict";

const hasPermissions = (member, permissions = []) => {
  if (!permissions.length) {
    return true;
  }
  if (!member) {
    return false;
  }
  return member.hasPermission(permissions);
};

module.exports = { hasPermissions };
