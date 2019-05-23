import * as React from 'react';
import { Box, Flex } from "rebass";
import { theme } from "@Config";
import { Icon, HamburgerIcon, SearchBar, Grid, Row, Col } from "@Components";

type NavbarProps = {
  /** Renders the navbar menu */
  isMenuOpen: boolean,
  /** Callback for navbar menu toggle */
  onMenuToggleClick: () => void
}

type NavbarState = {}

type NavbarItemProps = {
  span?: number;
}

const NavbarItem:React.FC<NavbarItemProps> = ({ children, span=2 }) => (
  <Col
    sm={span}
    gutterWidth={0}
    style={{
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <Flex>{children}</Flex>
  </Col>
)

export class Navbar extends React.Component<NavbarProps, NavbarState> {
  constructor(props:NavbarProps) {
    super(props)
  }
  
  render() {
    const { palette: { primary } } = theme;
    const brand = primary[3];
    const brandLightest = primary[6];

    return (
      <Box bg={brand} py={1}>
        <Grid>
          <Row>
            <NavbarItem><Icon size={32} name={'instachaw'} fill={brandLightest}/></NavbarItem>
            <NavbarItem span={8}><SearchBar /></NavbarItem>
            <NavbarItem><HamburgerIcon color={brandLightest} /></NavbarItem>
          </Row>
        </Grid>
      </Box>
    )
  }
}