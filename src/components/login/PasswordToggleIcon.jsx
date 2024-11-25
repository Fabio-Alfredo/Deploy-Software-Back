import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PropTypes from "prop-types";

const PasswordToggleIcon = ({ showPassword, onToggle, style, ...props }) => {
  const Icon = showPassword ? VisibilityOff : Visibility;
  return (
    <Icon
      onClick={onToggle}
      style={{ cursor: "pointer", ...style }}
      width={30}
      height={30}
      {...props}
    />
  );
};

PasswordToggleIcon.propTypes = {
  showPassword: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.object,
};

export default PasswordToggleIcon;
