// Utility functions that could be extracted from the main component
export const validateSearchQuery = (query: string): boolean => {
  return query.trim().length > 0
}

export const sanitizeSearchQuery = (query: string): string => {
  return query.trim()
}

export const formatSearchQuery = (query: string): string => {
  return sanitizeSearchQuery(query).toLowerCase()
}

export const isValidSearchLength = (query: string, maxLength: number = 2048): boolean => {
  return query.length <= maxLength
}

export const containsOnlyWhitespace = (query: string): boolean => {
  return /^\s*$/.test(query)
}

describe('Search Utilities', () => {
  describe('validateSearchQuery', () => {
    it('returns true for valid queries', () => {
      expect(validateSearchQuery('valid query')).toBe(true)
      expect(validateSearchQuery('a')).toBe(true)
      expect(validateSearchQuery('123')).toBe(true)
      expect(validateSearchQuery('special!@#$%')).toBe(true)
    })

    it('returns false for invalid queries', () => {
      expect(validateSearchQuery('')).toBe(false)
      expect(validateSearchQuery('   ')).toBe(false)
      expect(validateSearchQuery('\t\n')).toBe(false)
    })

    it('handles edge cases', () => {
      expect(validateSearchQuery(' a ')).toBe(true)
      expect(validateSearchQuery('\na\n')).toBe(true)
      expect(validateSearchQuery('0')).toBe(true)
    })
  })

  describe('sanitizeSearchQuery', () => {
    it('trims whitespace from queries', () => {
      expect(sanitizeSearchQuery('  query  ')).toBe('query')
      expect(sanitizeSearchQuery('\tquery\n')).toBe('query')
      expect(sanitizeSearchQuery('   multiple   words   ')).toBe('multiple   words')
    })

    it('preserves internal whitespace', () => {
      expect(sanitizeSearchQuery('  word1 word2  ')).toBe('word1 word2')
      expect(sanitizeSearchQuery('  a   b   c  ')).toBe('a   b   c')
    })

    it('handles empty strings', () => {
      expect(sanitizeSearchQuery('')).toBe('')
      expect(sanitizeSearchQuery('   ')).toBe('')
    })
  })

  describe('formatSearchQuery', () => {
    it('converts to lowercase and trims', () => {
      expect(formatSearchQuery('  UPPER CASE  ')).toBe('upper case')
      expect(formatSearchQuery('MiXeD cAsE')).toBe('mixed case')
    })

    it('handles special characters', () => {
      expect(formatSearchQuery('Query!@#$%')).toBe('query!@#$%')
      expect(formatSearchQuery('  SPECIAL-CHARS_123  ')).toBe('special-chars_123')
    })
  })

  describe('isValidSearchLength', () => {
    it('returns true for queries within length limit', () => {
      expect(isValidSearchLength('short')).toBe(true)
      expect(isValidSearchLength('a'.repeat(100))).toBe(true)
      expect(isValidSearchLength('a'.repeat(2048))).toBe(true)
    })

    it('returns false for queries exceeding length limit', () => {
      expect(isValidSearchLength('a'.repeat(2049))).toBe(false)
      expect(isValidSearchLength('a'.repeat(5000))).toBe(false)
    })

    it('respects custom length limits', () => {
      expect(isValidSearchLength('12345', 5)).toBe(true)
      expect(isValidSearchLength('123456', 5)).toBe(false)
    })
  })

  describe('containsOnlyWhitespace', () => {
    it('returns true for whitespace-only strings', () => {
      expect(containsOnlyWhitespace('')).toBe(true)
      expect(containsOnlyWhitespace('   ')).toBe(true)
      expect(containsOnlyWhitespace('\t\n\r')).toBe(true)
      expect(containsOnlyWhitespace(' \t \n \r ')).toBe(true)
    })

    it('returns false for strings with content', () => {
      expect(containsOnlyWhitespace('a')).toBe(false)
      expect(containsOnlyWhitespace(' a ')).toBe(false)
      expect(containsOnlyWhitespace('   text   ')).toBe(false)
    })
  })
})
