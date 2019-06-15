import {
  extractIdFromSlug,
  formatServiceHour,
  truncateText,
  generateRandString,
  slugify
} from '@Utilities'

const sampleText = 'The queryByTestId utility is referring to the practice of using data-test attributes to identify individual elements in your rendered component. This is one of the practices this library is intended to encourage.';

describe('String Utils', () => {
  describe('format time', () => {
    test('should format a time string into a single digit', () => {
      expect(formatServiceHour('03:00:00')).toBe('3')
    })
  })

  test('should truncate a text to (n + 3) characters', () => {
    let n = 30;
    expect(truncateText(sampleText, n).length).toBe(n + 3)
  })

  test('return an empty string if no arguments passed', () => {
    expect(truncateText('')).toBe('')
  })

  test('should generate a random string of predetermined length', () => {
    let n = 30;
    expect(generateRandString(n).length).toBe(n)
  })

  test('should ensure pseudo-unique random string value', () => {
    let firstString:string = generateRandString();
    let secondString:string = generateRandString();

    expect(firstString === secondString).toBeFalsy()
  })

  test('should return a slugified title', () => {
    expect(slugify('The Sky Tore Apart, Tuesday')).toBe('the-sky-tore-apart-tuesday')
  })

  test('should extract an id from a slugified title', () => {
    expect(
      extractIdFromSlug(
        slugify('Instachaw Nigeria 25')
      )
    ).toBe(25)
  })
})
