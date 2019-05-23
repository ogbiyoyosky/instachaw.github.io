import * as React from 'react';
import { Box } from 'rebass';
import { theme } from '@Config';
import { Icon } from '@Components';

type VerificationMarkProps = {}

export const VerificationMark:React.FC<VerificationMarkProps> = () => {
  return (
    <Box
      backgroundColor={theme.palette.blue[6]}
      style={{
        borderRadius: '50%',
        position: 'relative',
        height: '24px',
        width: '24px'
      }}
      data-testid = {'verification-mark'}
    >
      <Box
        style={{
          position: 'absolute',
          top: '75%',
          left: '50%',
          transform: 'translate(-50%, -70%)'
        }}
      >
        <Icon name="check" fill={theme.palette.blue[1]} />
      </Box>
    </Box>
  )
}
