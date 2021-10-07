const DateInputHelper = require('../src/DateInputHelper');

// tests for date input validation
describe('DateInputHelper', () => {
  describe('when given a valid date', () => {
    it('formats correctly', () => expect(DateInputHelper.format('01-01-2010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('01/01/2010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('01.01.2010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('01012010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('13062020')).toEqual('2020-06-13'));
    it('formats correctly', () => expect(DateInputHelper.format('1/1/2010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('1.1.2010')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('2010/01/1')).toEqual('2010-01-01'));
    it('formats correctly', () => expect(DateInputHelper.format('29/02/2012')).toEqual('2012-02-29'));
  });
  describe('when given an invalid date', () => {
    it('is not accepted', () => expect(DateInputHelper.format('')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('32/07/2010')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('30/13/2010')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('29/02/2011')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('date')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('2nd March 2011')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('1311')).toEqual(undefined));
    it('is not accepted', () => expect(DateInputHelper.format('1/3/11')).toEqual(undefined));
  });
});
