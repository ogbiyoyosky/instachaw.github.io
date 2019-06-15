import * as React from 'react';
import {
  Button as UIButton,
  ButtonProps as UIButtonProps
} from 'rebass';
import { ClipLoader } from "react-spinners";
import { theme } from '@Config';

type ButtonProps = {
  /** Badge text color. */
  color?: string,
  /** SVG icon for badge. Examples: home, car, airplane. */
  variant?: string,
  isLoading?: boolean
}

const defaultProps = {
  variant: 'primary',
  isLoading: false
}

export const Button:React.FC<ButtonProps & UIButtonProps> = ({
  children,
  variant = defaultProps.variant,
  isLoading,
  ...props
}) => {
  return (
    <UIButton
      variant={variant}
      disabled={isLoading}
      style={{ opacity: isLoading ? 0.5: 1 }}
      {...props}
    >
      {!isLoading && children}
      {isLoading &&
        <ClipLoader
          color={(theme.buttons as any)[variant].color}
          size={parseInt(theme.space[2])}
          loading={isLoading}
        />
      }
    </UIButton>
  )
}

Button.defaultProps = defaultProps;