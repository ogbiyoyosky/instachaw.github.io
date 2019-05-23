import * as React from "react";

const relativePosition:'relative' = 'relative';
const absolutePosition:'absolute' = 'absolute';

type transformValueTypes = {
  /** Number of degrees the icon should rotate by. */
  rotate?: number
}

type HamburgerMenuProps = transformValueTypes & {
  /** Icon width */
  width?: number,
  /** Icon height */
  height?: number,
  /** Stroke thickness for icon */
  strokeWidth?: number,
  /** Fill color for the icon */
  color?: string,
  /** Radius size for the icon lines */
  borderRadius?: number,
  /** Duration for icon animations */
  animationDuration?: number,
  className?: string
}

type HamburgerMenuState = {
  isOpen: boolean
}

const defaultProps = {
  width: 24,
  height: 8,
  strokeWidth: 2,
  animationDuration: 6,
  rotate: 0,
  borderRadius: 64,
  color: '#000'
}

const getTransformValue = (isOpen:any, defaultPos:any, rotate:any, halfHeight:any) => {
  let height =  isOpen ? halfHeight : defaultPos;
  height = height || 0;
  const rotationDegree = isOpen ? `${rotate}deg`: '0';

  return `translate3d(0,${height},0) rotate(${rotationDegree})`;
}

const getLineBase = (
  borderRadius: number,
  color:string,
  strokeWidth: number,
  marginTop: string
) => {
  return {
    display: 'block',
    height: `${strokeWidth}px`,
    width: '100%',
    background: color,
    borderRadius: `${borderRadius}px`,
    transformOrigin: 'center',
    position: absolutePosition,
    marginTop
  }
}

export class HamburgerIcon extends React.PureComponent<HamburgerMenuProps, HamburgerMenuState> {
  state = {
    isOpen: false
  }

  constructor(props:HamburgerMenuProps) {
    super(props)
    this.handleMenuToggleClick = this.handleMenuToggleClick.bind(this);
  }

  handleMenuToggleClick() {
    return this.setState(({ isOpen }) => {
      return {
        isOpen: !isOpen
      }
    })
  }

  render() {
    let {
      borderRadius = defaultProps.borderRadius,
      color = defaultProps.color,
      strokeWidth = defaultProps.strokeWidth
    } = this.props

    const { isOpen } = this.state;
  
    const width = `${this.props.width}px`,
      height = `${this.props.height}px`,
      halfHeight = `${parseInt(height) / 2}px`,
      halfStrokeWidth = `-${strokeWidth / 2}px`;
  
    const styles = {
      container: { width, height, position: relativePosition },
      lineBase: getLineBase(borderRadius, color || '#000', strokeWidth, halfStrokeWidth),
      firstLine: { transform: getTransformValue(isOpen, 0, 45, halfHeight) },
      thirdLine: {transform: getTransformValue(isOpen, height, -45, halfHeight)}
    };

    return (
      <div style={{ ...styles.container }} className={isOpen ? 'hamburgerLineOpen': 'hamburgerLineClose'} onClick={this.handleMenuToggleClick}>
        <span style={{ ...styles.lineBase, ...styles.firstLine }} />
        <span style={{ ...styles.lineBase, ...styles.thirdLine }} />
      </div>
    );  
  }
}

HamburgerIcon.defaultProps = defaultProps;