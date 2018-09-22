/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js");

importScripts(
  "/dist/precache-manifest.a9c66526d0f41eb79e100e3d8cac79ec.js"
);

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/.*/, workbox.strategies.networkFirst(), 'GET');
workbox.routing.registerRoute(/^https:\/\/res.cloudinary.com\/(.*)/, workbox.strategies.cacheFirst(), 'GET');
workbox.routing.registerRoute(/api/, workbox.strategies.networkFirst({ networkTimeoutSeconds: 10, cacheName: "instachaw-production-api-cache", plugins: [new workbox.expiration.Plugin({"maxEntries":5,"maxAgeSeconds":60,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200],"headers":{"x-test":"true"}})] }), 'GET');
