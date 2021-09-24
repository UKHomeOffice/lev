const DateInputHelper = require('../src/DateInputHelper');

// tests for date input validation
describe('DateInputHelper', () => {
  describe('when given a valid date', () => {
    it('formats correctly', () => expect(DateInputHelper.format('01-01-2010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('01-01-2010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('01/01/2010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('01/01/2010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('01.01.2010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('01.01.2010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('01012010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('01012010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('1/1/2010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('1/1/2010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('1.1.2010')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('1.1.2010').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('2010/01/1')).toEqual('2010-01-01'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('2010/01/1').isValid).toEqual(true));
    it('formats correctly', () => expect(DateInputHelper.format('29/02/2010')).toEqual('2010-02-29'));
    it('is accepted by luxon', () => expect(DateInputHelper.format('29/02/2010').isValid).toEqual(true));
  });
  describe('when given an invalid date', () => {
    it('is not accepted', () => expect(DateInputHelper.format('').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('32/07/2010').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('30/13/2010').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('29/02/2011').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('date').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('2nd March 2011').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('1311').isValid).toEqual(false));
    it('is not accepted', () => expect(DateInputHelper.format('1/3/11').isValid).toEqual(false));
  });
});
