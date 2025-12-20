"use strict";

const hasPermissions = (member, permissions = []) => {
  if (!permissions.length) {
    return true;
  }
  return member.hasPermission(permissions);
};

module.exports = { hasPermissions };
