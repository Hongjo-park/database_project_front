import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CommonButtonProps extends ButtonProps {
  variantType?: 'primary' | 'secondary';
}

const CommonButton: React.FC<CommonButtonProps> = ({ variantType = 'primary', children, ...props }) => {
  const color = variantType === 'primary' ? 'primary' : 'secondary';

  return (
    <Button variant="contained" color={color} {...props}>
      {children}
    </Button>
  );
};

export default CommonButton;