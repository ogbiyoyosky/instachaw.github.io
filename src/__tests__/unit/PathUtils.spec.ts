import {
  getStoreItemPath,
  getStoreItemQs,
  getStoreProductPath,
  getStoreProductThumbnailPath,
  getStoreProductQs,
  findRoutePathDepth,
  getIconsPath
} from '@Utilities'

import { THUMBNAIL_URL } from '@Constants/ApiConstants'

const { NEXT_PUBLIC_CLOUDINARY_BUCKET_ID } = process.env;

const storeInfo = {
  id: 3,
  title: 'Jovit, Alakahia'
}

const productInfo = {
  id: 3,
  title: 'Sharwarma',
  photo: 'sharwarma.jpg'
}

  describe('Path Utils', () => {
    describe('Store product path helpers', () => {    
      test('should return a path for a store product when provided product id & title', () => {
        expect(
          getStoreProductPath(
            getStoreItemPath(storeInfo.id, storeInfo.title),
            productInfo.id,
            productInfo.title
          )
        ).toBe(`/store/jovit-alakahia-${storeInfo.id}/sharwarma-${productInfo.id}`)
      })
  
      test('should return a query string for a product', () => {
        expect(
          getStoreProductQs(
            storeInfo.id,
            productInfo.id
          )
        )
        .toBe(`/store?slug=store-${storeInfo.id}&productId=${productInfo.id}`)
      })
  
      test('', () => {
        expect(
          getStoreProductThumbnailPath(storeInfo.id, productInfo.photo)
        ).toBe(
          `${THUMBNAIL_URL}/${NEXT_PUBLIC_CLOUDINARY_BUCKET_ID}/store-${storeInfo.id}/${productInfo.photo}`
        )
      })
    })
  
    describe('Store item path helpers', () => {
      test('should return a path for a store item when provided an id & title', () => {
        expect(getStoreItemPath(storeInfo.id, storeInfo.title))
          .toBe(`/store/jovit-alakahia-${storeInfo.id}`)
      })
  
      test('should return a query string when provided a store id', () => {
        expect(getStoreItemQs(storeInfo.id))
          .toBe(`/store?slug=store-${storeInfo.id}`)
      })
    })
  
    describe('Route path depth', () => {
      test('should return the correct path depth', () => {
        expect(
          findRoutePathDepth(
            `/store/store-${storeInfo.id}`
          )
        ).toBe(2)
      })
    })
  
    describe('icon path', () => {
      test('should return the correct icon json data for an icon', () => {
        expect(
          getIconsPath({
            name: 'home',
            legacy: false
          })
        ).toHaveProperty('path')
      })
    
      test('should return the legacy icon for an airport', () => {
        expect(
          getIconsPath({
            name: 'airport',
            legacy: true
          })
        ).toHaveProperty('path')
      })      
    })
  }),

  describe('Hello', () => {

  })
