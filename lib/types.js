const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = Array.isArray;
//see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript checking if something is an object is nontrivial!
const isObject = val => typeof val === 'object' && val !== null && !isArray(val);



const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  if(isString(val) && val === '') throw new CastError(Number, val); 
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  return String(val);
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  return Boolean(val);
}

const castToArray = val => {
  if(isArray(val)) return val;
  if(isObject(val)) return Object.entries(val);
}

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isObject,
  CastError,
  getCaster,
  castToNumber,
  castToString,
  castToBoolean,
  castToArray
};
