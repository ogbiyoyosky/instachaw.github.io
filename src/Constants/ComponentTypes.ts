export type BadgeProps = {
  /** Badge background. Could be Hex, RGB or named colors. */
  background?: string,
  /** Badge text color. */
  color?: string,
  /** SVG icon for badge. Examples: home, car, airplane. */
  icon?: string,
  /** Badge text content */
  text: string
}

export type StoreMerchantBriefProps = {
  /** Store merchant name or title */
  title: string,
  /** Store merchant service fee */
  serviceFee: string,
  /** Store merchant service fee */
  storeOpenFrom: string,
  /** Store merchant brand image path */
  brandSrc: string
};

