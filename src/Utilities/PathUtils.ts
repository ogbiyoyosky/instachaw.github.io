'use strict';

import { slugify } from './StringUtils'

const { NEXT_PUBLIC_CLOUDINARY_BUCKET_ID } = process.env;
const icons = require('../../src/Data/icons.json');

import { THUMBNAIL_URL } from '@Constants/ApiConstants'

type iconsType = {
  [icon: string]: any
}

type getIconsPathArgs = {
  name: string,
  legacy: boolean
}

// Should be removed eventually after v1.0.0
const aliases: iconsType = {
  scrollLeft: 'chevronLeft',
  chevronLight: 'chevronDown',
  chevronThick: 'chevronDownThick',
  // aliases for breaking changes from #153
  // should add propType warnings similar to the color name deprecation getters
  box: 'boxEmpty',
  car: 'cars',
  cruise: 'cruises',
  description: 'document',
  hotel: 'hotels',
  allInclusive: 'inclusive',
  radioFilled: 'radioChecked',
  radio: 'radioEmpty',
  add: 'radioPlus',
  minus: 'radioMinus',
  businessSeat: 'seatBusiness',
  economySeat: 'seatEconomy',
  plane: 'flights'
}

/**
 * Returns the path to a named icon.
 * 
 * @param {String}  Object.name   - Name of the icon of interest. 
 * @param {Boolean} Object.legacy - Specifies if the icons are of the legacy set.
 * 
 * @returns {String}
 */
export const getIconsPath = ({ name, legacy }: getIconsPathArgs) => {
  if (!legacy) {
    return icons[name] || icons.legacy[name]
  }

  return icons.legacy[name] || icons[name] || icons[aliases[name]]
}

/**
 * Generates the query string for a store item.
 * 
 * @param  {number} id
 * @return {string}
 */
export function getStoreItemQs(id: number) {
  return `/store?slug=store-${id}`
}

/**
 * Generates the route string for a store item.
 * 
 * @param  {number} id
 * @param  {string} title
 * 
 * @return {string}
 */
export function getStoreItemPath(id: number, title: string) {
  return `/store/${slugify(title)}-${id}`
}

/**
 * Generates the route query string for a product within a store.
 * 
 * @param  {number} storeId
 * @param  {number} productId
 * 
 * @return {string}
 */
export function getStoreProductQs(
  storeId: number,
  productId:number
) {
  return `/store?slug=store-${storeId}&productId=${productId}`
}

/**
 * Generates the route string for a product within a store.
 * 
 * @param  {string} storePath
 * @param  {number} id
 * @param  {string} title
 * 
 * @return {string}
 */
export function getStoreProductPath(
  storePath: string,
  productId:number,
  productTitle:string
) {
  return `${storePath}/${slugify(productTitle)}-${productId}`
}

/**
 * Returns the depth of a route path string.
 * 
 * @param {String} routePathString - The path string to resolve.
 * @returns Number;
 */
export function findRoutePathDepth (routePathString:any) {
  return routePathString
          .split('/')
          .filter((pathFragment:any) => pathFragment !== '')
          .length;
}

/**
 * Generates the thumbnail path for a product within a store.
 * 
 * @param {string} storeId - Store Id.
 * @param {string} photo
 * 
 * @returns {string};
 */
export function getStoreProductThumbnailPath (storeId:number, photo:string):string {
return `${THUMBNAIL_URL}/${NEXT_PUBLIC_CLOUDINARY_BUCKET_ID}/store-${storeId}/${photo}`;
}