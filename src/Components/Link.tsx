import { default as NextLink } from 'next/link';

type LinkProps = {
  /** Link anchor tag styling */
  style?: React.CSSProperties,
  /** Link url path */
  href: string,
  /** Alternate link path alias */
  alias?: string
};

export const Link:React.FC<LinkProps> = ({
  children,
  style,
  href,
  alias
}) => {
  return (
    <NextLink href={href} as={alias ? alias: href}>
      <a
        style={{
          display: 'flex',
          color: 'inherit',
          textDecoration: 'none',
          ...style 
        }}
      >
        {children}
      </a>
    </NextLink>
  )
}