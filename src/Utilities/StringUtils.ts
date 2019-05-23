/**
 * Formats a opening time string.
 * 
 * @param {Number} span - Width of a single column.
 * @param {Number} gridSize - Total capacity of columns in the grid.
 * 
 * @returns {String}
 */
export function formatServiceHour (time:string) {
  return time.split(':')[0][1]
}
/**
 * Formats a string into a slug.
 * 
 * @param  {string} text
 * @return {string}
 */
export function slugify(text:string) {
  return text
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '-')           // Replace spaces with -
          .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
          .replace(/\-\-+/g, '-')         // Replace multiple - with single -
          .replace(/^-+/, '')             // Trim - from start of text
          .replace(/-+$/, '');            // Trim - from end of text
}