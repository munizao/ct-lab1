const {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray,
  getCaster
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a number', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });
    it('properly tells if a value is a string', () => {
      expect(isString('hi')).toBeTruthy();
      expect(isString(3)).toBeFalsy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });
    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
    });
    it('properly tells if a value is an array', () => {
      expect(isArray([])).toBeTruthy();
      expect(isArray(true)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray(3)).toBeFalsy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
    });

    it('properly tells if a value is an object', () => {
      expect(isObject({})).toBeTruthy();
      expect(isObject(null)).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject(3)).toBeFalsy();
      expect(isObject(() => {})).toBeFalsy();
    });

  });

  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber('')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(3)).toEqual('3');
      expect(castToString(true)).toEqual('true');
      expect(castToString([1, 2, 3, 4])).toEqual('1,2,3,4');
      expect(castToString({})).toEqual('[object Object]');
    });

    it('can cast values to a boolean', () => {
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(3)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean([1, 2, 3, 4])).toEqual(true);
      expect(castToBoolean({})).toEqual(true);
    });

    it('can cast values to an array', () => {
      expect(castToArray([1, 2])).toEqual([1,2]);
      expect(castToArray({color:'blue', isLarge: true})).toEqual([['color', 'blue'], ['isLarge', true]]);
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(Promise)).toBeNull();
  });
});
