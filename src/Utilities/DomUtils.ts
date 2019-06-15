'use strict';

/**
 * Calculates the width of a column in a row.
 * 
 * @param {number} span - Width of a single column.
 * @param {number} gridSize - Total capacity of columns in the grid.
 * 
 * @returns {string}
 */
export function computeColumnWidth (span:number, gridSize = 12) {
  const width:number = (span / gridSize) * 100;

  return `width: ${width}%`
}