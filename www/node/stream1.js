var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports,require), module.exports;
}

function getDefaultExportFromNamespaceIfNotNamed (n) {
	return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
}

function commonjsRequire (path,base) {
  return require(path,base);
}
var duplex = Duplex;
const require$$0 =require('buffer');
const require$$1 =require('events');
const process = require('process');
const require$$2 = require('string_decoder');

/*
  This file is a reduced and adapted version of the main lib/internal/per_context/primordials.js file defined at

  https://github.com/nodejs/node/blob/master/lib/internal/per_context/primordials.js

  Don't try to replace with the original file and keep it up to date with the upstream file.
*/
var primordials = {
  ArrayIsArray(self) {
    return Array.isArray(self)
  },
  ArrayPrototypeIncludes(self, el) {
    return self.includes(el)
  },
  ArrayPrototypeIndexOf(self, el) {
    return self.indexOf(el)
  },
  ArrayPrototypeJoin(self, sep) {
    return self.join(sep)
  },
  ArrayPrototypeMap(self, fn) {
    return self.map(fn)
  },
  ArrayPrototypePop(self, el) {
    return self.pop(el)
  },
  ArrayPrototypePush(self, el) {
    return self.push(el)
  },
  ArrayPrototypeSlice(self, start, end) {
    return self.slice(start, end)
  },
  Error,
  FunctionPrototypeCall(fn, thisArgs, ...args) {
    return fn.call(thisArgs, ...args)
  },
  FunctionPrototypeSymbolHasInstance(self, instance) {
    return Function.prototype[Symbol.hasInstance].call(self, instance)
  },
  MathFloor: Math.floor,
  Number,
  NumberIsInteger: Number.isInteger,
  NumberIsNaN: Number.isNaN,
  NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
  NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
  NumberParseInt: Number.parseInt,
  ObjectDefineProperties(self, props) {
    return Object.defineProperties(self, props)
  },
  ObjectDefineProperty(self, name, prop) {
    return Object.defineProperty(self, name, prop)
  },
  ObjectGetOwnPropertyDescriptor(self, name) {
    return Object.getOwnPropertyDescriptor(self, name)
  },
  ObjectKeys(obj) {
    return Object.keys(obj)
  },
  ObjectSetPrototypeOf(target, proto) {
    return Object.setPrototypeOf(target, proto)
  },
  Promise,
  PromisePrototypeCatch(self, fn) {
    return self.catch(fn)
  },
  PromisePrototypeThen(self, thenFn, catchFn) {
    return self.then(thenFn, catchFn)
  },
  PromiseReject(err) {
    return Promise.reject(err)
  },
  PromiseResolve(val) {
    return Promise.resolve(val)
  },
  ReflectApply: Reflect.apply,
  RegExpPrototypeTest(self, value) {
    return self.test(value)
  },
  SafeSet: Set,
  String,
  StringPrototypeSlice(self, start, end) {
    return self.slice(start, end)
  },
  StringPrototypeToLowerCase(self) {
    return self.toLowerCase()
  },
  StringPrototypeToUpperCase(self) {
    return self.toUpperCase()
  },
  StringPrototypeTrim(self) {
    return self.trim()
  },
  Symbol,
  SymbolFor: Symbol.for,
  SymbolAsyncIterator: Symbol.asyncIterator,
  SymbolHasInstance: Symbol.hasInstance,
  SymbolIterator: Symbol.iterator,
  SymbolDispose: Symbol.dispose || Symbol('Symbol.dispose'),
  SymbolAsyncDispose: Symbol.asyncDispose || Symbol('Symbol.asyncDispose'),
  TypedArrayPrototypeSet(self, buf, len) {
    return self.set(buf, len)
  },
  Boolean: Boolean,
  Uint8Array
};

/*globals self, window */

/*eslint-disable @mysticatea/prettier */
const { AbortController, AbortSignal } =
    typeof self !== "undefined" ? self :
    typeof window !== "undefined" ? window :
    /* otherwise */ undefined;
/*eslint-enable @mysticatea/prettier */

var browser = AbortController;
var AbortSignal_1 = AbortSignal;
var _default = AbortController;
browser.AbortSignal = AbortSignal_1;
browser.default = _default;

var util = createCommonjsModule(function (module) {


const { kResistStopPropagation, SymbolDispose } = primordials;
const AbortSignal = globalThis.AbortSignal || browser.AbortSignal;
const AbortController = globalThis.AbortController || browser.AbortController;
const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const Blob = globalThis.Blob || require$$0.Blob;
/* eslint-disable indent */
const isBlob =
  typeof Blob !== 'undefined'
    ? function isBlob(b) {
        // eslint-disable-next-line indent
        return b instanceof Blob
      }
    : function isBlob(b) {
        return false
      };
/* eslint-enable indent */

const validateAbortSignal = (signal, name) => {
  if (signal !== undefined && (signal === null || typeof signal !== 'object' || !('aborted' in signal))) {
    throw new ERR_INVALID_ARG_TYPE(name, 'AbortSignal', signal)
  }
};
const validateFunction = (value, name) => {
  if (typeof value !== 'function') throw new ERR_INVALID_ARG_TYPE(name, 'Function', value)
};

// This is a simplified version of AggregateError
class AggregateError extends Error {
  constructor(errors) {
    if (!Array.isArray(errors)) {
      throw new TypeError(`Expected input to be an Array, got ${typeof errors}`)
    }
    let message = '';
    for (let i = 0; i < errors.length; i++) {
      message += `    ${errors[i].stack}\n`;
    }
    super(message);
    this.name = 'AggregateError';
    this.errors = errors;
  }
}
module.exports = {
  AggregateError,
  kEmptyObject: Object.freeze({}),
  once(callback) {
    let called = false;
    return function (...args) {
      if (called) {
        return
      }
      called = true;
      callback.apply(this, args);
    }
  },
  createDeferredPromise: function () {
    let resolve;
    let reject;

    // eslint-disable-next-line promise/param-names
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return {
      promise,
      resolve,
      reject
    }
  },
  promisify(fn) {
    return new Promise((resolve, reject) => {
      fn((err, ...args) => {
        if (err) {
          return reject(err)
        }
        return resolve(...args)
      });
    })
  },
  debuglog() {
    return function () {}
  },
  format(format, ...args) {
    // Simplified version of https://nodejs.org/api/util.html#utilformatformat-args
    return format.replace(/%([sdifj])/g, function (...[_unused, type]) {
      const replacement = args.shift();
      if (type === 'f') {
        return replacement.toFixed(6)
      } else if (type === 'j') {
        return JSON.stringify(replacement)
      } else if (type === 's' && typeof replacement === 'object') {
        const ctor = replacement.constructor !== Object ? replacement.constructor.name : '';
        return `${ctor} {}`.trim()
      } else {
        return replacement.toString()
      }
    })
  },
  inspect(value) {
    // Vastly simplified version of https://nodejs.org/api/util.html#utilinspectobject-options
    switch (typeof value) {
      case 'string':
        if (value.includes("'")) {
          if (!value.includes('"')) {
            return `"${value}"`
          } else if (!value.includes('`') && !value.includes('${')) {
            return `\`${value}\``
          }
        }
        return `'${value}'`
      case 'number':
        if (isNaN(value)) {
          return 'NaN'
        } else if (Object.is(value, -0)) {
          return String(value)
        }
        return value
      case 'bigint':
        return `${String(value)}n`
      case 'boolean':
      case 'undefined':
        return String(value)
      case 'object':
        return '{}'
    }
  },
  types: {
    isAsyncFunction(fn) {
      return fn instanceof AsyncFunction
    },
    isArrayBufferView(arr) {
      return ArrayBuffer.isView(arr)
    }
  },
  isBlob,
  deprecate(fn, message) {
    return fn
  },
  addAbortListener:
    require$$1.addAbortListener ||
    function addAbortListener(signal, listener) {
      if (signal === undefined) {
        throw new ERR_INVALID_ARG_TYPE('signal', 'AbortSignal', signal)
      }
      validateAbortSignal(signal, 'signal');
      validateFunction(listener, 'listener');
      let removeEventListener;
      if (signal.aborted) {
        queueMicrotask(() => listener());
      } else {
        signal.addEventListener('abort', listener, {
          __proto__: null,
          once: true,
          [kResistStopPropagation]: true
        });
        removeEventListener = () => {
          signal.removeEventListener('abort', listener);
        };
      }
      return {
        __proto__: null,
        [SymbolDispose]() {
          var _removeEventListener
          ;(_removeEventListener = removeEventListener) === null || _removeEventListener === undefined
            ? undefined
            : _removeEventListener();
        }
      }
    },
  AbortSignalAny:
    AbortSignal.any ||
    function AbortSignalAny(signals) {
      // Fast path if there is only one signal.
      if (signals.length === 1) {
        return signals[0]
      }
      const ac = new AbortController();
      const abort = () => ac.abort();
      signals.forEach((signal) => {
        validateAbortSignal(signal, 'signals');
        signal.addEventListener('abort', abort, {
          once: true
        });
      });
      ac.signal.addEventListener(
        'abort',
        () => {
          signals.forEach((signal) => signal.removeEventListener('abort', abort));
        },
        {
          once: true
        }
      );
      return ac.signal
    }
};
module.exports.promisify.custom = Symbol.for('nodejs.util.promisify.custom');
});

const { format, inspect, AggregateError: CustomAggregateError } = util;

/*
  This file is a reduced and adapted version of the main lib/internal/errors.js file defined at

  https://github.com/nodejs/node/blob/master/lib/internal/errors.js

  Don't try to replace with the original file and keep it up to date (starting from E(...) definitions)
  with the upstream file.
*/

const AggregateError = globalThis.AggregateError || CustomAggregateError;
const kIsNodeError = Symbol('kIsNodeError');
const kTypes = [
  'string',
  'function',
  'number',
  'object',
  // Accept 'Function' and 'Object' as alternative to the lower cased version.
  'Function',
  'Object',
  'boolean',
  'bigint',
  'symbol'
];
const classRegExp = /^([A-Z][a-z0-9]*)+$/;
const nodeInternalPrefix = '__node_internal_';
const codes = {};
function assert(value, message) {
  if (!value) {
    throw new codes.ERR_INTERNAL_ASSERTION(message)
  }
}

// Only use this for integers! Decimal numbers do not work with this function.
function addNumericalSeparator(val) {
  let res = '';
  let i = val.length;
  const start = val[0] === '-' ? 1 : 0;
  for (; i >= start + 4; i -= 3) {
    res = `_${val.slice(i - 3, i)}${res}`;
  }
  return `${val.slice(0, i)}${res}`
}
function getMessage(key, msg, args) {
  if (typeof msg === 'function') {
    assert(
      msg.length <= args.length,
      // Default options do not count.
      `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${msg.length}).`
    );
    return msg(...args)
  }
  const expectedLength = (msg.match(/%[dfijoOs]/g) || []).length;
  assert(
    expectedLength === args.length,
    `Code: ${key}; The provided arguments length (${args.length}) does not match the required ones (${expectedLength}).`
  );
  if (args.length === 0) {
    return msg
  }
  return format(msg, ...args)
}
function E(code, message, Base) {
  if (!Base) {
    Base = Error;
  }
  class NodeError extends Base {
    constructor(...args) {
      super(getMessage(code, message, args));
    }
    toString() {
      return `${this.name} [${code}]: ${this.message}`
    }
  }
  Object.defineProperties(NodeError.prototype, {
    name: {
      value: Base.name,
      writable: true,
      enumerable: false,
      configurable: true
    },
    toString: {
      value() {
        return `${this.name} [${code}]: ${this.message}`
      },
      writable: true,
      enumerable: false,
      configurable: true
    }
  });
  NodeError.prototype.code = code;
  NodeError.prototype[kIsNodeError] = true;
  codes[code] = NodeError;
}
function hideStackFrames(fn) {
  // We rename the functions that will be hidden to cut off the stacktrace
  // at the outermost one
  const hidden = nodeInternalPrefix + fn.name;
  Object.defineProperty(fn, 'name', {
    value: hidden
  });
  return fn
}
function aggregateTwoErrors(innerError, outerError) {
  if (innerError && outerError && innerError !== outerError) {
    if (Array.isArray(outerError.errors)) {
      // If `outerError` is already an `AggregateError`.
      outerError.errors.push(innerError);
      return outerError
    }
    const err = new AggregateError([outerError, innerError], outerError.message);
    err.code = outerError.code;
    return err
  }
  return innerError || outerError
}
class AbortError extends Error {
  constructor(message = 'The operation was aborted', options = undefined) {
    if (options !== undefined && typeof options !== 'object') {
      throw new codes.ERR_INVALID_ARG_TYPE('options', 'Object', options)
    }
    super(message, options);
    this.code = 'ABORT_ERR';
    this.name = 'AbortError';
  }
}
E('ERR_ASSERTION', '%s', Error);
E(
  'ERR_INVALID_ARG_TYPE',
  (name, expected, actual) => {
    assert(typeof name === 'string', "'name' must be a string");
    if (!Array.isArray(expected)) {
      expected = [expected];
    }
    let msg = 'The ';
    if (name.endsWith(' argument')) {
      // For cases like 'first argument'
      msg += `${name} `;
    } else {
      msg += `"${name}" ${name.includes('.') ? 'property' : 'argument'} `;
    }
    msg += 'must be ';
    const types = [];
    const instances = [];
    const other = [];
    for (const value of expected) {
      assert(typeof value === 'string', 'All expected entries have to be of type string');
      if (kTypes.includes(value)) {
        types.push(value.toLowerCase());
      } else if (classRegExp.test(value)) {
        instances.push(value);
      } else {
        assert(value !== 'object', 'The value "object" should be written as "Object"');
        other.push(value);
      }
    }

    // Special handle `object` in case other instances are allowed to outline
    // the differences between each other.
    if (instances.length > 0) {
      const pos = types.indexOf('object');
      if (pos !== -1) {
        types.splice(types, pos, 1);
        instances.push('Object');
      }
    }
    if (types.length > 0) {
      switch (types.length) {
        case 1:
          msg += `of type ${types[0]}`;
          break
        case 2:
          msg += `one of type ${types[0]} or ${types[1]}`;
          break
        default: {
          const last = types.pop();
          msg += `one of type ${types.join(', ')}, or ${last}`;
        }
      }
      if (instances.length > 0 || other.length > 0) {
        msg += ' or ';
      }
    }
    if (instances.length > 0) {
      switch (instances.length) {
        case 1:
          msg += `an instance of ${instances[0]}`;
          break
        case 2:
          msg += `an instance of ${instances[0]} or ${instances[1]}`;
          break
        default: {
          const last = instances.pop();
          msg += `an instance of ${instances.join(', ')}, or ${last}`;
        }
      }
      if (other.length > 0) {
        msg += ' or ';
      }
    }
    switch (other.length) {
      case 0:
        break
      case 1:
        if (other[0].toLowerCase() !== other[0]) {
          msg += 'an ';
        }
        msg += `${other[0]}`;
        break
      case 2:
        msg += `one of ${other[0]} or ${other[1]}`;
        break
      default: {
        const last = other.pop();
        msg += `one of ${other.join(', ')}, or ${last}`;
      }
    }
    if (actual == null) {
      msg += `. Received ${actual}`;
    } else if (typeof actual === 'function' && actual.name) {
      msg += `. Received function ${actual.name}`;
    } else if (typeof actual === 'object') {
      var _actual$constructor;
      if (
        (_actual$constructor = actual.constructor) !== null &&
        _actual$constructor !== undefined &&
        _actual$constructor.name
      ) {
        msg += `. Received an instance of ${actual.constructor.name}`;
      } else {
        const inspected = inspect(actual, {
          depth: -1
        });
        msg += `. Received ${inspected}`;
      }
    } else {
      let inspected = inspect(actual, {
        colors: false
      });
      if (inspected.length > 25) {
        inspected = `${inspected.slice(0, 25)}...`;
      }
      msg += `. Received type ${typeof actual} (${inspected})`;
    }
    return msg
  },
  TypeError
);
E(
  'ERR_INVALID_ARG_VALUE',
  (name, value, reason = 'is invalid') => {
    let inspected = inspect(value);
    if (inspected.length > 128) {
      inspected = inspected.slice(0, 128) + '...';
    }
    const type = name.includes('.') ? 'property' : 'argument';
    return `The ${type} '${name}' ${reason}. Received ${inspected}`
  },
  TypeError
);
E(
  'ERR_INVALID_RETURN_VALUE',
  (input, name, value) => {
    var _value$constructor;
    const type =
      value !== null &&
      value !== undefined &&
      (_value$constructor = value.constructor) !== null &&
      _value$constructor !== undefined &&
      _value$constructor.name
        ? `instance of ${value.constructor.name}`
        : `type ${typeof value}`;
    return `Expected ${input} to be returned from the "${name}"` + ` function but got ${type}.`
  },
  TypeError
);
E(
  'ERR_MISSING_ARGS',
  (...args) => {
    assert(args.length > 0, 'At least one arg needs to be specified');
    let msg;
    const len = args.length;
    args = (Array.isArray(args) ? args : [args]).map((a) => `"${a}"`).join(' or ');
    switch (len) {
      case 1:
        msg += `The ${args[0]} argument`;
        break
      case 2:
        msg += `The ${args[0]} and ${args[1]} arguments`;
        break
      default:
        {
          const last = args.pop();
          msg += `The ${args.join(', ')}, and ${last} arguments`;
        }
        break
    }
    return `${msg} must be specified`
  },
  TypeError
);
E(
  'ERR_OUT_OF_RANGE',
  (str, range, input) => {
    assert(range, 'Missing "range" argument');
    let received;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
      received = addNumericalSeparator(String(input));
    } else if (typeof input === 'bigint') {
      received = String(input);
      if (input > 2n ** 32n || input < -(2n ** 32n)) {
        received = addNumericalSeparator(received);
      }
      received += 'n';
    } else {
      received = inspect(input);
    }
    return `The value of "${str}" is out of range. It must be ${range}. Received ${received}`
  },
  RangeError
);
E('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times', Error);
E('ERR_METHOD_NOT_IMPLEMENTED', 'The %s method is not implemented', Error);
E('ERR_STREAM_ALREADY_FINISHED', 'Cannot call %s after a stream was finished', Error);
E('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable', Error);
E('ERR_STREAM_DESTROYED', 'Cannot call %s after a stream was destroyed', Error);
E('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
E('ERR_STREAM_PREMATURE_CLOSE', 'Premature close', Error);
E('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF', Error);
E('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event', Error);
E('ERR_STREAM_WRITE_AFTER_END', 'write after end', Error);
E('ERR_UNKNOWN_ENCODING', 'Unknown encoding: %s', TypeError);
var errors = {
  AbortError,
  aggregateTwoErrors: hideStackFrames(aggregateTwoErrors),
  hideStackFrames,
  codes
};

const {
  ArrayIsArray,
  ArrayPrototypeIncludes,
  ArrayPrototypeJoin,
  ArrayPrototypeMap,
  NumberIsInteger,
  NumberIsNaN,
  NumberMAX_SAFE_INTEGER,
  NumberMIN_SAFE_INTEGER,
  NumberParseInt,
  ObjectPrototypeHasOwnProperty,
  RegExpPrototypeExec,
  String: String$1,
  StringPrototypeToUpperCase,
  StringPrototypeTrim
} = primordials;
const {
  hideStackFrames: hideStackFrames$1,
  codes: { ERR_SOCKET_BAD_PORT, ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$1, ERR_INVALID_ARG_VALUE, ERR_OUT_OF_RANGE, ERR_UNKNOWN_SIGNAL }
} = errors;
const { normalizeEncoding } = util;
const { isAsyncFunction, isArrayBufferView } = util.types;
const signals = {};

/**
 * @param {*} value
 * @returns {boolean}
 */
function isInt32(value) {
  return value === (value | 0)
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isUint32(value) {
  return value === value >>> 0
}
const octalReg = /^[0-7]+$/;
const modeDesc = 'must be a 32-bit unsigned integer or an octal string';

/**
 * Parse and validate values that will be converted into mode_t (the S_*
 * constants). Only valid numbers and octal strings are allowed. They could be
 * converted to 32-bit unsigned integers or non-negative signed integers in the
 * C++ land, but any value higher than 0o777 will result in platform-specific
 * behaviors.
 * @param {*} value Values to be validated
 * @param {string} name Name of the argument
 * @param {number} [def] If specified, will be returned for invalid values
 * @returns {number}
 */
function parseFileMode(value, name, def) {
  if (typeof value === 'undefined') {
    value = def;
  }
  if (typeof value === 'string') {
    if (RegExpPrototypeExec(octalReg, value) === null) {
      throw new ERR_INVALID_ARG_VALUE(name, value, modeDesc)
    }
    value = NumberParseInt(value, 8);
  }
  validateUint32(value, name);
  return value
}

/**
 * @callback validateInteger
 * @param {*} value
 * @param {string} name
 * @param {number} [min]
 * @param {number} [max]
 * @returns {asserts value is number}
 */

/** @type {validateInteger} */
const validateInteger = hideStackFrames$1((value, name, min = NumberMIN_SAFE_INTEGER, max = NumberMAX_SAFE_INTEGER) => {
  if (typeof value !== 'number') throw new ERR_INVALID_ARG_TYPE$1(name, 'number', value)
  if (!NumberIsInteger(value)) throw new ERR_OUT_OF_RANGE(name, 'an integer', value)
  if (value < min || value > max) throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value)
});

/**
 * @callback validateInt32
 * @param {*} value
 * @param {string} name
 * @param {number} [min]
 * @param {number} [max]
 * @returns {asserts value is number}
 */

/** @type {validateInt32} */
const validateInt32 = hideStackFrames$1((value, name, min = -2147483648, max = 2147483647) => {
  // The defaults for min and max correspond to the limits of 32-bit integers.
  if (typeof value !== 'number') {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'number', value)
  }
  if (!NumberIsInteger(value)) {
    throw new ERR_OUT_OF_RANGE(name, 'an integer', value)
  }
  if (value < min || value > max) {
    throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value)
  }
});

/**
 * @callback validateUint32
 * @param {*} value
 * @param {string} name
 * @param {number|boolean} [positive=false]
 * @returns {asserts value is number}
 */

/** @type {validateUint32} */
const validateUint32 = hideStackFrames$1((value, name, positive = false) => {
  if (typeof value !== 'number') {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'number', value)
  }
  if (!NumberIsInteger(value)) {
    throw new ERR_OUT_OF_RANGE(name, 'an integer', value)
  }
  const min = positive ? 1 : 0;
  // 2 ** 32 === 4294967296
  const max = 4294967295;
  if (value < min || value > max) {
    throw new ERR_OUT_OF_RANGE(name, `>= ${min} && <= ${max}`, value)
  }
});

/**
 * @callback validateString
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is string}
 */

/** @type {validateString} */
function validateString(value, name) {
  if (typeof value !== 'string') throw new ERR_INVALID_ARG_TYPE$1(name, 'string', value)
}

/**
 * @callback validateNumber
 * @param {*} value
 * @param {string} name
 * @param {number} [min]
 * @param {number} [max]
 * @returns {asserts value is number}
 */

/** @type {validateNumber} */
function validateNumber(value, name, min = undefined, max) {
  if (typeof value !== 'number') throw new ERR_INVALID_ARG_TYPE$1(name, 'number', value)
  if (
    (min != null && value < min) ||
    (max != null && value > max) ||
    ((min != null || max != null) && NumberIsNaN(value))
  ) {
    throw new ERR_OUT_OF_RANGE(
      name,
      `${min != null ? `>= ${min}` : ''}${min != null && max != null ? ' && ' : ''}${max != null ? `<= ${max}` : ''}`,
      value
    )
  }
}

/**
 * @callback validateOneOf
 * @template T
 * @param {T} value
 * @param {string} name
 * @param {T[]} oneOf
 */

/** @type {validateOneOf} */
const validateOneOf = hideStackFrames$1((value, name, oneOf) => {
  if (!ArrayPrototypeIncludes(oneOf, value)) {
    const allowed = ArrayPrototypeJoin(
      ArrayPrototypeMap(oneOf, (v) => (typeof v === 'string' ? `'${v}'` : String$1(v))),
      ', '
    );
    const reason = 'must be one of: ' + allowed;
    throw new ERR_INVALID_ARG_VALUE(name, value, reason)
  }
});

/**
 * @callback validateBoolean
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is boolean}
 */

/** @type {validateBoolean} */
function validateBoolean(value, name) {
  if (typeof value !== 'boolean') throw new ERR_INVALID_ARG_TYPE$1(name, 'boolean', value)
}

/**
 * @param {any} options
 * @param {string} key
 * @param {boolean} defaultValue
 * @returns {boolean}
 */
function getOwnPropertyValueOrDefault(options, key, defaultValue) {
  return options == null || !ObjectPrototypeHasOwnProperty(options, key) ? defaultValue : options[key]
}

/**
 * @callback validateObject
 * @param {*} value
 * @param {string} name
 * @param {{
 *   allowArray?: boolean,
 *   allowFunction?: boolean,
 *   nullable?: boolean
 * }} [options]
 */

/** @type {validateObject} */
const validateObject = hideStackFrames$1((value, name, options = null) => {
  const allowArray = getOwnPropertyValueOrDefault(options, 'allowArray', false);
  const allowFunction = getOwnPropertyValueOrDefault(options, 'allowFunction', false);
  const nullable = getOwnPropertyValueOrDefault(options, 'nullable', false);
  if (
    (!nullable && value === null) ||
    (!allowArray && ArrayIsArray(value)) ||
    (typeof value !== 'object' && (!allowFunction || typeof value !== 'function'))
  ) {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'Object', value)
  }
});

/**
 * @callback validateDictionary - We are using the Web IDL Standard definition
 *                                of "dictionary" here, which means any value
 *                                whose Type is either Undefined, Null, or
 *                                Object (which includes functions).
 * @param {*} value
 * @param {string} name
 * @see https://webidl.spec.whatwg.org/#es-dictionary
 * @see https://tc39.es/ecma262/#table-typeof-operator-results
 */

/** @type {validateDictionary} */
const validateDictionary = hideStackFrames$1((value, name) => {
  if (value != null && typeof value !== 'object' && typeof value !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'a dictionary', value)
  }
});

/**
 * @callback validateArray
 * @param {*} value
 * @param {string} name
 * @param {number} [minLength]
 * @returns {asserts value is any[]}
 */

/** @type {validateArray} */
const validateArray = hideStackFrames$1((value, name, minLength = 0) => {
  if (!ArrayIsArray(value)) {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'Array', value)
  }
  if (value.length < minLength) {
    const reason = `must be longer than ${minLength}`;
    throw new ERR_INVALID_ARG_VALUE(name, value, reason)
  }
});

/**
 * @callback validateStringArray
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is string[]}
 */

/** @type {validateStringArray} */
function validateStringArray(value, name) {
  validateArray(value, name);
  for (let i = 0; i < value.length; i++) {
    validateString(value[i], `${name}[${i}]`);
  }
}

/**
 * @callback validateBooleanArray
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is boolean[]}
 */

/** @type {validateBooleanArray} */
function validateBooleanArray(value, name) {
  validateArray(value, name);
  for (let i = 0; i < value.length; i++) {
    validateBoolean(value[i], `${name}[${i}]`);
  }
}

/**
 * @callback validateAbortSignalArray
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is AbortSignal[]}
 */

/** @type {validateAbortSignalArray} */
function validateAbortSignalArray(value, name) {
  validateArray(value, name);
  for (let i = 0; i < value.length; i++) {
    const signal = value[i];
    const indexedName = `${name}[${i}]`;
    if (signal == null) {
      throw new ERR_INVALID_ARG_TYPE$1(indexedName, 'AbortSignal', signal)
    }
    validateAbortSignal(signal, indexedName);
  }
}

/**
 * @param {*} signal
 * @param {string} [name='signal']
 * @returns {asserts signal is keyof signals}
 */
function validateSignalName(signal, name = 'signal') {
  validateString(signal, name);
  if (signals[signal] === undefined) {
    if (signals[StringPrototypeToUpperCase(signal)] !== undefined) {
      throw new ERR_UNKNOWN_SIGNAL(signal + ' (signals must use all capital letters)')
    }
    throw new ERR_UNKNOWN_SIGNAL(signal)
  }
}

/**
 * @callback validateBuffer
 * @param {*} buffer
 * @param {string} [name='buffer']
 * @returns {asserts buffer is ArrayBufferView}
 */

/** @type {validateBuffer} */
const validateBuffer = hideStackFrames$1((buffer, name = 'buffer') => {
  if (!isArrayBufferView(buffer)) {
    throw new ERR_INVALID_ARG_TYPE$1(name, ['Buffer', 'TypedArray', 'DataView'], buffer)
  }
});

/**
 * @param {string} data
 * @param {string} encoding
 */
function validateEncoding(data, encoding) {
  const normalizedEncoding = normalizeEncoding(encoding);
  const length = data.length;
  if (normalizedEncoding === 'hex' && length % 2 !== 0) {
    throw new ERR_INVALID_ARG_VALUE('encoding', encoding, `is invalid for data of length ${length}`)
  }
}

/**
 * Check that the port number is not NaN when coerced to a number,
 * is an integer and that it falls within the legal range of port numbers.
 * @param {*} port
 * @param {string} [name='Port']
 * @param {boolean} [allowZero=true]
 * @returns {number}
 */
function validatePort(port, name = 'Port', allowZero = true) {
  if (
    (typeof port !== 'number' && typeof port !== 'string') ||
    (typeof port === 'string' && StringPrototypeTrim(port).length === 0) ||
    +port !== +port >>> 0 ||
    port > 0xffff ||
    (port === 0 && !allowZero)
  ) {
    throw new ERR_SOCKET_BAD_PORT(name, port, allowZero)
  }
  return port | 0
}

/**
 * @callback validateAbortSignal
 * @param {*} signal
 * @param {string} name
 */

/** @type {validateAbortSignal} */
const validateAbortSignal = hideStackFrames$1((signal, name) => {
  if (signal !== undefined && (signal === null || typeof signal !== 'object' || !('aborted' in signal))) {
    throw new ERR_INVALID_ARG_TYPE$1(name, 'AbortSignal', signal)
  }
});

/**
 * @callback validateFunction
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is Function}
 */

/** @type {validateFunction} */
const validateFunction = hideStackFrames$1((value, name) => {
  if (typeof value !== 'function') throw new ERR_INVALID_ARG_TYPE$1(name, 'Function', value)
});

/**
 * @callback validatePlainFunction
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is Function}
 */

/** @type {validatePlainFunction} */
const validatePlainFunction = hideStackFrames$1((value, name) => {
  if (typeof value !== 'function' || isAsyncFunction(value)) throw new ERR_INVALID_ARG_TYPE$1(name, 'Function', value)
});

/**
 * @callback validateUndefined
 * @param {*} value
 * @param {string} name
 * @returns {asserts value is undefined}
 */

/** @type {validateUndefined} */
const validateUndefined = hideStackFrames$1((value, name) => {
  if (value !== undefined) throw new ERR_INVALID_ARG_TYPE$1(name, 'undefined', value)
});

/**
 * @template T
 * @param {T} value
 * @param {string} name
 * @param {T[]} union
 */
function validateUnion(value, name, union) {
  if (!ArrayPrototypeIncludes(union, value)) {
    throw new ERR_INVALID_ARG_TYPE$1(name, `('${ArrayPrototypeJoin(union, '|')}')`, value)
  }
}

/*
  The rules for the Link header field are described here:
  https://www.rfc-editor.org/rfc/rfc8288.html#section-3

  This regex validates any string surrounded by angle brackets
  (not necessarily a valid URI reference) followed by zero or more
  link-params separated by semicolons.
*/
const linkValueRegExp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;

/**
 * @param {any} value
 * @param {string} name
 */
function validateLinkHeaderFormat(value, name) {
  if (typeof value === 'undefined' || !RegExpPrototypeExec(linkValueRegExp, value)) {
    throw new ERR_INVALID_ARG_VALUE(
      name,
      value,
      'must be an array or string of format "</styles.css>; rel=preload; as=style"'
    )
  }
}

/**
 * @param {any} hints
 * @return {string}
 */
function validateLinkHeaderValue(hints) {
  if (typeof hints === 'string') {
    validateLinkHeaderFormat(hints, 'hints');
    return hints
  } else if (ArrayIsArray(hints)) {
    const hintsLength = hints.length;
    let result = '';
    if (hintsLength === 0) {
      return result
    }
    for (let i = 0; i < hintsLength; i++) {
      const link = hints[i];
      validateLinkHeaderFormat(link, 'hints');
      result += link;
      if (i !== hintsLength - 1) {
        result += ', ';
      }
    }
    return result
  }
  throw new ERR_INVALID_ARG_VALUE(
    'hints',
    hints,
    'must be an array or string of format "</styles.css>; rel=preload; as=style"'
  )
}
var validators = {
  isInt32,
  isUint32,
  parseFileMode,
  validateArray,
  validateStringArray,
  validateBooleanArray,
  validateAbortSignalArray,
  validateBoolean,
  validateBuffer,
  validateDictionary,
  validateEncoding,
  validateFunction,
  validateInt32,
  validateInteger,
  validateNumber,
  validateObject,
  validateOneOf,
  validatePlainFunction,
  validatePort,
  validateSignalName,
  validateString,
  validateUint32,
  validateUndefined,
  validateUnion,
  validateAbortSignal,
  validateLinkHeaderValue
};

const { SymbolAsyncIterator, SymbolIterator, SymbolFor } = primordials;

// We need to use SymbolFor to make these globally available
// for interopt with readable-stream, i.e. readable-stream
// and node core needs to be able to read/write private state
// from each other for proper interoperability.
const kIsDestroyed = SymbolFor('nodejs.stream.destroyed');
const kIsErrored = SymbolFor('nodejs.stream.errored');
const kIsReadable = SymbolFor('nodejs.stream.readable');
const kIsWritable = SymbolFor('nodejs.stream.writable');
const kIsDisturbed = SymbolFor('nodejs.stream.disturbed');
const kIsClosedPromise = SymbolFor('nodejs.webstream.isClosedPromise');
const kControllerErrorFunction = SymbolFor('nodejs.webstream.controllerErrorFunction');
function isReadableNodeStream(obj, strict = false) {
  var _obj$_readableState;
  return !!(
    (
      obj &&
      typeof obj.pipe === 'function' &&
      typeof obj.on === 'function' &&
      (!strict || (typeof obj.pause === 'function' && typeof obj.resume === 'function')) &&
      (!obj._writableState ||
        ((_obj$_readableState = obj._readableState) === null || _obj$_readableState === undefined
          ? undefined
          : _obj$_readableState.readable) !== false) &&
      // Duplex
      (!obj._writableState || obj._readableState)
    ) // Writable has .pipe.
  )
}

function isWritableNodeStream(obj) {
  var _obj$_writableState;
  return !!(
    (
      obj &&
      typeof obj.write === 'function' &&
      typeof obj.on === 'function' &&
      (!obj._readableState ||
        ((_obj$_writableState = obj._writableState) === null || _obj$_writableState === undefined
          ? undefined
          : _obj$_writableState.writable) !== false)
    ) // Duplex
  )
}

function isDuplexNodeStream(obj) {
  return !!(
    obj &&
    typeof obj.pipe === 'function' &&
    obj._readableState &&
    typeof obj.on === 'function' &&
    typeof obj.write === 'function'
  )
}
function isNodeStream(obj) {
  return (
    obj &&
    (obj._readableState ||
      obj._writableState ||
      (typeof obj.write === 'function' && typeof obj.on === 'function') ||
      (typeof obj.pipe === 'function' && typeof obj.on === 'function'))
  )
}
function isReadableStream(obj) {
  return !!(
    obj &&
    !isNodeStream(obj) &&
    typeof obj.pipeThrough === 'function' &&
    typeof obj.getReader === 'function' &&
    typeof obj.cancel === 'function'
  )
}
function isWritableStream(obj) {
  return !!(obj && !isNodeStream(obj) && typeof obj.getWriter === 'function' && typeof obj.abort === 'function')
}
function isTransformStream(obj) {
  return !!(obj && !isNodeStream(obj) && typeof obj.readable === 'object' && typeof obj.writable === 'object')
}
function isWebStream(obj) {
  return isReadableStream(obj) || isWritableStream(obj) || isTransformStream(obj)
}
function isIterable(obj, isAsync) {
  if (obj == null) return false
  if (isAsync === true) return typeof obj[SymbolAsyncIterator] === 'function'
  if (isAsync === false) return typeof obj[SymbolIterator] === 'function'
  return typeof obj[SymbolAsyncIterator] === 'function' || typeof obj[SymbolIterator] === 'function'
}
function isDestroyed(stream) {
  if (!isNodeStream(stream)) return null
  const wState = stream._writableState;
  const rState = stream._readableState;
  const state = wState || rState;
  return !!(stream.destroyed || stream[kIsDestroyed] || (state !== null && state !== undefined && state.destroyed))
}

// Have been end():d.
function isWritableEnded(stream) {
  if (!isWritableNodeStream(stream)) return null
  if (stream.writableEnded === true) return true
  const wState = stream._writableState;
  if (wState !== null && wState !== undefined && wState.errored) return false
  if (typeof (wState === null || wState === undefined ? undefined : wState.ended) !== 'boolean') return null
  return wState.ended
}

// Have emitted 'finish'.
function isWritableFinished(stream, strict) {
  if (!isWritableNodeStream(stream)) return null
  if (stream.writableFinished === true) return true
  const wState = stream._writableState;
  if (wState !== null && wState !== undefined && wState.errored) return false
  if (typeof (wState === null || wState === undefined ? undefined : wState.finished) !== 'boolean') return null
  return !!(wState.finished || (strict === false && wState.ended === true && wState.length === 0))
}

// Have been push(null):d.
function isReadableEnded(stream) {
  if (!isReadableNodeStream(stream)) return null
  if (stream.readableEnded === true) return true
  const rState = stream._readableState;
  if (!rState || rState.errored) return false
  if (typeof (rState === null || rState === undefined ? undefined : rState.ended) !== 'boolean') return null
  return rState.ended
}

// Have emitted 'end'.
function isReadableFinished(stream, strict) {
  if (!isReadableNodeStream(stream)) return null
  const rState = stream._readableState;
  if (rState !== null && rState !== undefined && rState.errored) return false
  if (typeof (rState === null || rState === undefined ? undefined : rState.endEmitted) !== 'boolean') return null
  return !!(rState.endEmitted || (strict === false && rState.ended === true && rState.length === 0))
}
function isReadable(stream) {
  if (stream && stream[kIsReadable] != null) return stream[kIsReadable]
  if (typeof (stream === null || stream === undefined ? undefined : stream.readable) !== 'boolean') return null
  if (isDestroyed(stream)) return false
  return isReadableNodeStream(stream) && stream.readable && !isReadableFinished(stream)
}
function isWritable(stream) {
  if (stream && stream[kIsWritable] != null) return stream[kIsWritable]
  if (typeof (stream === null || stream === undefined ? undefined : stream.writable) !== 'boolean') return null
  if (isDestroyed(stream)) return false
  return isWritableNodeStream(stream) && stream.writable && !isWritableEnded(stream)
}
function isFinished(stream, opts) {
  if (!isNodeStream(stream)) {
    return null
  }
  if (isDestroyed(stream)) {
    return true
  }
  if ((opts === null || opts === undefined ? undefined : opts.readable) !== false && isReadable(stream)) {
    return false
  }
  if ((opts === null || opts === undefined ? undefined : opts.writable) !== false && isWritable(stream)) {
    return false
  }
  return true
}
function isWritableErrored(stream) {
  var _stream$_writableStat, _stream$_writableStat2;
  if (!isNodeStream(stream)) {
    return null
  }
  if (stream.writableErrored) {
    return stream.writableErrored
  }
  return (_stream$_writableStat =
    (_stream$_writableStat2 = stream._writableState) === null || _stream$_writableStat2 === undefined
      ? undefined
      : _stream$_writableStat2.errored) !== null && _stream$_writableStat !== undefined
    ? _stream$_writableStat
    : null
}
function isReadableErrored(stream) {
  var _stream$_readableStat, _stream$_readableStat2;
  if (!isNodeStream(stream)) {
    return null
  }
  if (stream.readableErrored) {
    return stream.readableErrored
  }
  return (_stream$_readableStat =
    (_stream$_readableStat2 = stream._readableState) === null || _stream$_readableStat2 === undefined
      ? undefined
      : _stream$_readableStat2.errored) !== null && _stream$_readableStat !== undefined
    ? _stream$_readableStat
    : null
}
function isClosed(stream) {
  if (!isNodeStream(stream)) {
    return null
  }
  if (typeof stream.closed === 'boolean') {
    return stream.closed
  }
  const wState = stream._writableState;
  const rState = stream._readableState;
  if (
    typeof (wState === null || wState === undefined ? undefined : wState.closed) === 'boolean' ||
    typeof (rState === null || rState === undefined ? undefined : rState.closed) === 'boolean'
  ) {
    return (
      (wState === null || wState === undefined ? undefined : wState.closed) ||
      (rState === null || rState === undefined ? undefined : rState.closed)
    )
  }
  if (typeof stream._closed === 'boolean' && isOutgoingMessage(stream)) {
    return stream._closed
  }
  return null
}
function isOutgoingMessage(stream) {
  return (
    typeof stream._closed === 'boolean' &&
    typeof stream._defaultKeepAlive === 'boolean' &&
    typeof stream._removedConnection === 'boolean' &&
    typeof stream._removedContLen === 'boolean'
  )
}
function isServerResponse(stream) {
  return typeof stream._sent100 === 'boolean' && isOutgoingMessage(stream)
}
function isServerRequest(stream) {
  var _stream$req;
  return (
    typeof stream._consuming === 'boolean' &&
    typeof stream._dumped === 'boolean' &&
    ((_stream$req = stream.req) === null || _stream$req === undefined ? undefined : _stream$req.upgradeOrConnect) ===
      undefined
  )
}
function willEmitClose(stream) {
  if (!isNodeStream(stream)) return null
  const wState = stream._writableState;
  const rState = stream._readableState;
  const state = wState || rState;
  return (
    (!state && isServerResponse(stream)) || !!(state && state.autoDestroy && state.emitClose && state.closed === false)
  )
}
function isDisturbed(stream) {
  var _stream$kIsDisturbed;
  return !!(
    stream &&
    ((_stream$kIsDisturbed = stream[kIsDisturbed]) !== null && _stream$kIsDisturbed !== undefined
      ? _stream$kIsDisturbed
      : stream.readableDidRead || stream.readableAborted)
  )
}
function isErrored(stream) {
  var _ref,
    _ref2,
    _ref3,
    _ref4,
    _ref5,
    _stream$kIsErrored,
    _stream$_readableStat3,
    _stream$_writableStat3,
    _stream$_readableStat4,
    _stream$_writableStat4;
  return !!(
    stream &&
    ((_ref =
      (_ref2 =
        (_ref3 =
          (_ref4 =
            (_ref5 =
              (_stream$kIsErrored = stream[kIsErrored]) !== null && _stream$kIsErrored !== undefined
                ? _stream$kIsErrored
                : stream.readableErrored) !== null && _ref5 !== undefined
              ? _ref5
              : stream.writableErrored) !== null && _ref4 !== undefined
            ? _ref4
            : (_stream$_readableStat3 = stream._readableState) === null || _stream$_readableStat3 === undefined
            ? undefined
            : _stream$_readableStat3.errorEmitted) !== null && _ref3 !== undefined
          ? _ref3
          : (_stream$_writableStat3 = stream._writableState) === null || _stream$_writableStat3 === undefined
          ? undefined
          : _stream$_writableStat3.errorEmitted) !== null && _ref2 !== undefined
        ? _ref2
        : (_stream$_readableStat4 = stream._readableState) === null || _stream$_readableStat4 === undefined
        ? undefined
        : _stream$_readableStat4.errored) !== null && _ref !== undefined
      ? _ref
      : (_stream$_writableStat4 = stream._writableState) === null || _stream$_writableStat4 === undefined
      ? undefined
      : _stream$_writableStat4.errored)
  )
}
var utils = {
  isDestroyed,
  kIsDestroyed,
  isDisturbed,
  kIsDisturbed,
  isErrored,
  kIsErrored,
  isReadable,
  kIsReadable,
  kIsClosedPromise,
  kControllerErrorFunction,
  kIsWritable,
  isClosed,
  isDuplexNodeStream,
  isFinished,
  isIterable,
  isReadableNodeStream,
  isReadableStream,
  isReadableEnded,
  isReadableFinished,
  isReadableErrored,
  isNodeStream,
  isWebStream,
  isWritable,
  isWritableNodeStream,
  isWritableStream,
  isWritableEnded,
  isWritableFinished,
  isWritableErrored,
  isServerRequest,
  isServerResponse,
  willEmitClose,
  isTransformStream
};

const { AbortError: AbortError$1, codes: codes$1 } = errors;
const { ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$2, ERR_STREAM_PREMATURE_CLOSE } = codes$1;
const { kEmptyObject, once } = util;
const { validateAbortSignal: validateAbortSignal$1, validateFunction: validateFunction$1, validateObject: validateObject$1, validateBoolean: validateBoolean$1 } = validators;
const { Promise: Promise$1, PromisePrototypeThen, SymbolDispose } = primordials;
const {
  isClosed: isClosed$1,
  isReadable: isReadable$1,
  isReadableNodeStream: isReadableNodeStream$1,
  isReadableStream: isReadableStream$1,
  isReadableFinished: isReadableFinished$1,
  isReadableErrored: isReadableErrored$1,
  isWritable: isWritable$1,
  isWritableNodeStream: isWritableNodeStream$1,
  isWritableStream: isWritableStream$1,
  isWritableFinished: isWritableFinished$1,
  isWritableErrored: isWritableErrored$1,
  isNodeStream: isNodeStream$1,
  willEmitClose: _willEmitClose,
  kIsClosedPromise: kIsClosedPromise$1
} = utils;
let addAbortListener;
function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function'
}
const nop = () => {};
function eos(stream, options, callback) {
  var _options$readable, _options$writable;
  if (arguments.length === 2) {
    callback = options;
    options = kEmptyObject;
  } else if (options == null) {
    options = kEmptyObject;
  } else {
    validateObject$1(options, 'options');
  }
  validateFunction$1(callback, 'callback');
  validateAbortSignal$1(options.signal, 'options.signal');
  callback = once(callback);
  if (isReadableStream$1(stream) || isWritableStream$1(stream)) {
    return eosWeb(stream, options, callback)
  }
  if (!isNodeStream$1(stream)) {
    throw new ERR_INVALID_ARG_TYPE$2('stream', ['ReadableStream', 'WritableStream', 'Stream'], stream)
  }
  const readable =
    (_options$readable = options.readable) !== null && _options$readable !== undefined
      ? _options$readable
      : isReadableNodeStream$1(stream);
  const writable =
    (_options$writable = options.writable) !== null && _options$writable !== undefined
      ? _options$writable
      : isWritableNodeStream$1(stream);
  const wState = stream._writableState;
  const rState = stream._readableState;
  const onlegacyfinish = () => {
    if (!stream.writable) {
      onfinish();
    }
  };

  // TODO (ronag): Improve soft detection to include core modules and
  // common ecosystem modules that do properly emit 'close' but fail
  // this generic check.
  let willEmitClose =
    _willEmitClose(stream) && isReadableNodeStream$1(stream) === readable && isWritableNodeStream$1(stream) === writable;
  let writableFinished = isWritableFinished$1(stream, false);
  const onfinish = () => {
    writableFinished = true;
    // Stream should not be destroyed here. If it is that
    // means that user space is doing something differently and
    // we cannot trust willEmitClose.
    if (stream.destroyed) {
      willEmitClose = false;
    }
    if (willEmitClose && (!stream.readable || readable)) {
      return
    }
    if (!readable || readableFinished) {
      callback.call(stream);
    }
  };
  let readableFinished = isReadableFinished$1(stream, false);
  const onend = () => {
    readableFinished = true;
    // Stream should not be destroyed here. If it is that
    // means that user space is doing something differently and
    // we cannot trust willEmitClose.
    if (stream.destroyed) {
      willEmitClose = false;
    }
    if (willEmitClose && (!stream.writable || writable)) {
      return
    }
    if (!writable || writableFinished) {
      callback.call(stream);
    }
  };
  const onerror = (err) => {
    callback.call(stream, err);
  };
  let closed = isClosed$1(stream);
  const onclose = () => {
    closed = true;
    const errored = isWritableErrored$1(stream) || isReadableErrored$1(stream);
    if (errored && typeof errored !== 'boolean') {
      return callback.call(stream, errored)
    }
    if (readable && !readableFinished && isReadableNodeStream$1(stream, true)) {
      if (!isReadableFinished$1(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE())
    }
    if (writable && !writableFinished) {
      if (!isWritableFinished$1(stream, false)) return callback.call(stream, new ERR_STREAM_PREMATURE_CLOSE())
    }
    callback.call(stream);
  };
  const onclosed = () => {
    closed = true;
    const errored = isWritableErrored$1(stream) || isReadableErrored$1(stream);
    if (errored && typeof errored !== 'boolean') {
      return callback.call(stream, errored)
    }
    callback.call(stream);
  };
  const onrequest = () => {
    stream.req.on('finish', onfinish);
  };
  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    if (!willEmitClose) {
      stream.on('abort', onclose);
    }
    if (stream.req) {
      onrequest();
    } else {
      stream.on('request', onrequest);
    }
  } else if (writable && !wState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  // Not all streams will emit 'close' after 'aborted'.
  if (!willEmitClose && typeof stream.aborted === 'boolean') {
    stream.on('aborted', onclose);
  }
  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (options.error !== false) {
    stream.on('error', onerror);
  }
  stream.on('close', onclose);
  if (closed) {
    process.nextTick(onclose);
  } else if (
    (wState !== null && wState !== undefined && wState.errorEmitted) ||
    (rState !== null && rState !== undefined && rState.errorEmitted)
  ) {
    if (!willEmitClose) {
      process.nextTick(onclosed);
    }
  } else if (
    !readable &&
    (!willEmitClose || isReadable$1(stream)) &&
    (writableFinished || isWritable$1(stream) === false)
  ) {
    process.nextTick(onclosed);
  } else if (
    !writable &&
    (!willEmitClose || isWritable$1(stream)) &&
    (readableFinished || isReadable$1(stream) === false)
  ) {
    process.nextTick(onclosed);
  } else if (rState && stream.req && stream.aborted) {
    process.nextTick(onclosed);
  }
  const cleanup = () => {
    callback = nop;
    stream.removeListener('aborted', onclose);
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
  if (options.signal && !closed) {
    const abort = () => {
      // Keep it because cleanup removes it.
      const endCallback = callback;
      cleanup();
      endCallback.call(
        stream,
        new AbortError$1(undefined, {
          cause: options.signal.reason
        })
      );
    };
    if (options.signal.aborted) {
      process.nextTick(abort);
    } else {
      addAbortListener = addAbortListener || util.addAbortListener;
      const disposable = addAbortListener(options.signal, abort);
      const originalCallback = callback;
      callback = once((...args) => {
        disposable[SymbolDispose]();
        originalCallback.apply(stream, args);
      });
    }
  }
  return cleanup
}
function eosWeb(stream, options, callback) {
  let isAborted = false;
  let abort = nop;
  if (options.signal) {
    abort = () => {
      isAborted = true;
      callback.call(
        stream,
        new AbortError$1(undefined, {
          cause: options.signal.reason
        })
      );
    };
    if (options.signal.aborted) {
      process.nextTick(abort);
    } else {
      addAbortListener = addAbortListener || util.addAbortListener;
      const disposable = addAbortListener(options.signal, abort);
      const originalCallback = callback;
      callback = once((...args) => {
        disposable[SymbolDispose]();
        originalCallback.apply(stream, args);
      });
    }
  }
  const resolverFn = (...args) => {
    if (!isAborted) {
      process.nextTick(() => callback.apply(stream, args));
    }
  };
  PromisePrototypeThen(stream[kIsClosedPromise$1].promise, resolverFn, resolverFn);
  return nop
}
function finished(stream, opts) {
  var _opts;
  let autoCleanup = false;
  if (opts === null) {
    opts = kEmptyObject;
  }
  if ((_opts = opts) !== null && _opts !== undefined && _opts.cleanup) {
    validateBoolean$1(opts.cleanup, 'cleanup');
    autoCleanup = opts.cleanup;
  }
  return new Promise$1((resolve, reject) => {
    const cleanup = eos(stream, opts, (err) => {
      if (autoCleanup) {
        cleanup();
      }
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}
var endOfStream = eos;
var finished_1 = finished;
endOfStream.finished = finished_1;

/* replacement start */



/* replacement end */

const {
  aggregateTwoErrors: aggregateTwoErrors$1,
  codes: { ERR_MULTIPLE_CALLBACK },
  AbortError: AbortError$2
} = errors;
const { Symbol: Symbol$1 } = primordials;
const { kIsDestroyed: kIsDestroyed$1, isDestroyed: isDestroyed$1, isFinished: isFinished$1, isServerRequest: isServerRequest$1 } = utils;
const kDestroy = Symbol$1('kDestroy');
const kConstruct = Symbol$1('kConstruct');
function checkError(err, w, r) {
  if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack; // eslint-disable-line no-unused-expressions

    if (w && !w.errored) {
      w.errored = err;
    }
    if (r && !r.errored) {
      r.errored = err;
    }
  }
}

// Backwards compat. cb() is undocumented and unused in core but
// unfortunately might be used by modules.
function destroy(err, cb) {
  const r = this._readableState;
  const w = this._writableState;
  // With duplex streams we use the writable side for state.
  const s = w || r;
  if ((w !== null && w !== undefined && w.destroyed) || (r !== null && r !== undefined && r.destroyed)) {
    if (typeof cb === 'function') {
      cb();
    }
    return this
  }

  // We set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks
  checkError(err, w, r);
  if (w) {
    w.destroyed = true;
  }
  if (r) {
    r.destroyed = true;
  }

  // If still constructing then defer calling _destroy.
  if (!s.constructed) {
    this.once(kDestroy, function (er) {
      _destroy(this, aggregateTwoErrors$1(er, err), cb);
    });
  } else {
    _destroy(this, err, cb);
  }
  return this
}
function _destroy(self, err, cb) {
  let called = false;
  function onDestroy(err) {
    if (called) {
      return
    }
    called = true;
    const r = self._readableState;
    const w = self._writableState;
    checkError(err, w, r);
    if (w) {
      w.closed = true;
    }
    if (r) {
      r.closed = true;
    }
    if (typeof cb === 'function') {
      cb(err);
    }
    if (err) {
      process.nextTick(emitErrorCloseNT, self, err);
    } else {
      process.nextTick(emitCloseNT, self);
    }
  }
  try {
    self._destroy(err || null, onDestroy);
  } catch (err) {
    onDestroy(err);
  }
}
function emitErrorCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}
function emitCloseNT(self) {
  const r = self._readableState;
  const w = self._writableState;
  if (w) {
    w.closeEmitted = true;
  }
  if (r) {
    r.closeEmitted = true;
  }
  if ((w !== null && w !== undefined && w.emitClose) || (r !== null && r !== undefined && r.emitClose)) {
    self.emit('close');
  }
}
function emitErrorNT(self, err) {
  const r = self._readableState;
  const w = self._writableState;
  if ((w !== null && w !== undefined && w.errorEmitted) || (r !== null && r !== undefined && r.errorEmitted)) {
    return
  }
  if (w) {
    w.errorEmitted = true;
  }
  if (r) {
    r.errorEmitted = true;
  }
  self.emit('error', err);
}
function undestroy() {
  const r = this._readableState;
  const w = this._writableState;
  if (r) {
    r.constructed = true;
    r.closed = false;
    r.closeEmitted = false;
    r.destroyed = false;
    r.errored = null;
    r.errorEmitted = false;
    r.reading = false;
    r.ended = r.readable === false;
    r.endEmitted = r.readable === false;
  }
  if (w) {
    w.constructed = true;
    w.destroyed = false;
    w.closed = false;
    w.closeEmitted = false;
    w.errored = null;
    w.errorEmitted = false;
    w.finalCalled = false;
    w.prefinished = false;
    w.ended = w.writable === false;
    w.ending = w.writable === false;
    w.finished = w.writable === false;
  }
}
function errorOrDestroy(stream, err, sync) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.

  const r = stream._readableState;
  const w = stream._writableState;
  if ((w !== null && w !== undefined && w.destroyed) || (r !== null && r !== undefined && r.destroyed)) {
    return this
  }
  if ((r !== null && r !== undefined && r.autoDestroy) || (w !== null && w !== undefined && w.autoDestroy))
    stream.destroy(err);
  else if (err) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    err.stack; // eslint-disable-line no-unused-expressions

    if (w && !w.errored) {
      w.errored = err;
    }
    if (r && !r.errored) {
      r.errored = err;
    }
    if (sync) {
      process.nextTick(emitErrorNT, stream, err);
    } else {
      emitErrorNT(stream, err);
    }
  }
}
function construct(stream, cb) {
  if (typeof stream._construct !== 'function') {
    return
  }
  const r = stream._readableState;
  const w = stream._writableState;
  if (r) {
    r.constructed = false;
  }
  if (w) {
    w.constructed = false;
  }
  stream.once(kConstruct, cb);
  if (stream.listenerCount(kConstruct) > 1) {
    // Duplex
    return
  }
  process.nextTick(constructNT, stream);
}
function constructNT(stream) {
  let called = false;
  function onConstruct(err) {
    if (called) {
      errorOrDestroy(stream, err !== null && err !== undefined ? err : new ERR_MULTIPLE_CALLBACK());
      return
    }
    called = true;
    const r = stream._readableState;
    const w = stream._writableState;
    const s = w || r;
    if (r) {
      r.constructed = true;
    }
    if (w) {
      w.constructed = true;
    }
    if (s.destroyed) {
      stream.emit(kDestroy, err);
    } else if (err) {
      errorOrDestroy(stream, err, true);
    } else {
      process.nextTick(emitConstructNT, stream);
    }
  }
  try {
    stream._construct((err) => {
      process.nextTick(onConstruct, err);
    });
  } catch (err) {
    process.nextTick(onConstruct, err);
  }
}
function emitConstructNT(stream) {
  stream.emit(kConstruct);
}
function isRequest$1(stream) {
  return (stream === null || stream === undefined ? undefined : stream.setHeader) && typeof stream.abort === 'function'
}
function emitCloseLegacy(stream) {
  stream.emit('close');
}
function emitErrorCloseLegacy(stream, err) {
  stream.emit('error', err);
  process.nextTick(emitCloseLegacy, stream);
}

// Normalize destroy for legacy.
function destroyer(stream, err) {
  if (!stream || isDestroyed$1(stream)) {
    return
  }
  if (!err && !isFinished$1(stream)) {
    err = new AbortError$2();
  }

  // TODO: Remove isRequest branches.
  if (isServerRequest$1(stream)) {
    stream.socket = null;
    stream.destroy(err);
  } else if (isRequest$1(stream)) {
    stream.abort();
  } else if (isRequest$1(stream.req)) {
    stream.req.abort();
  } else if (typeof stream.destroy === 'function') {
    stream.destroy(err);
  } else if (typeof stream.close === 'function') {
    // TODO: Don't lose err?
    stream.close();
  } else if (err) {
    process.nextTick(emitErrorCloseLegacy, stream, err);
  } else {
    process.nextTick(emitCloseLegacy, stream);
  }
  if (!stream.destroyed) {
    stream[kIsDestroyed$1] = true;
  }
}
var destroy_1 = {
  construct,
  destroyer,
  destroy,
  undestroy,
  errorOrDestroy
};

const { ArrayIsArray: ArrayIsArray$1, ObjectSetPrototypeOf } = primordials;
const { EventEmitter: EE } = require$$1;
function Stream(opts) {
  EE.call(this, opts);
}
ObjectSetPrototypeOf(Stream.prototype, EE.prototype);
ObjectSetPrototypeOf(Stream, EE);
Stream.prototype.pipe = function (dest, options) {
  const source = this;
  function ondata(chunk) {
    if (dest.writable && dest.write(chunk) === false && source.pause) {
      source.pause();
    }
  }
  source.on('data', ondata);
  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }
  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }
  let didOnEnd = false;
  function onend() {
    if (didOnEnd) return
    didOnEnd = true;
    dest.end();
  }
  function onclose() {
    if (didOnEnd) return
    didOnEnd = true;
    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // Don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      this.emit('error', er);
    }
  }
  prependListener(source, 'error', onerror);
  prependListener(dest, 'error', onerror);

  // Remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);
    source.removeListener('end', onend);
    source.removeListener('close', onclose);
    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);
    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);
    dest.removeListener('close', cleanup);
  }
  source.on('end', cleanup);
  source.on('close', cleanup);
  dest.on('close', cleanup);
  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest
};
function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn)

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
  else if (ArrayIsArray$1(emitter._events[event])) emitter._events[event].unshift(fn);
  else emitter._events[event] = [fn, emitter._events[event]];
}
var legacy = {
  Stream,
  prependListener
};

var addAbortSignal = createCommonjsModule(function (module) {

const { SymbolDispose } = primordials;
const { AbortError, codes } = errors;
const { isNodeStream, isWebStream, kControllerErrorFunction } = utils;

const { ERR_INVALID_ARG_TYPE } = codes;
let addAbortListener;

// This method is inlined here for readable-stream
// It also does not allow for signal to not exist on the stream
// https://github.com/nodejs/node/pull/36061#discussion_r533718029
const validateAbortSignal = (signal, name) => {
  if (typeof signal !== 'object' || !('aborted' in signal)) {
    throw new ERR_INVALID_ARG_TYPE(name, 'AbortSignal', signal)
  }
};
module.exports.addAbortSignal = function addAbortSignal(signal, stream) {
  validateAbortSignal(signal, 'signal');
  if (!isNodeStream(stream) && !isWebStream(stream)) {
    throw new ERR_INVALID_ARG_TYPE('stream', ['ReadableStream', 'WritableStream', 'Stream'], stream)
  }
  return module.exports.addAbortSignalNoValidate(signal, stream)
};
module.exports.addAbortSignalNoValidate = function (signal, stream) {
  if (typeof signal !== 'object' || !('aborted' in signal)) {
    return stream
  }
  const onAbort = isNodeStream(stream)
    ? () => {
        stream.destroy(
          new AbortError(undefined, {
            cause: signal.reason
          })
        );
      }
    : () => {
        stream[kControllerErrorFunction](
          new AbortError(undefined, {
            cause: signal.reason
          })
        );
      };
  if (signal.aborted) {
    onAbort();
  } else {
    addAbortListener = addAbortListener || util.addAbortListener;
    const disposable = addAbortListener(signal, onAbort);
    endOfStream(stream, disposable[SymbolDispose]);
  }
  return stream
};
});

const { StringPrototypeSlice, SymbolIterator: SymbolIterator$1, TypedArrayPrototypeSet, Uint8Array: Uint8Array$1 } = primordials;
const { Buffer } = require$$0;
const { inspect: inspect$1 } = util;
var buffer_list = class BufferList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  push(v) {
    const entry = {
      data: v,
      next: null
    };
    if (this.length > 0) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
    ++this.length;
  }
  unshift(v) {
    const entry = {
      data: v,
      next: this.head
    };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  }
  shift() {
    if (this.length === 0) return
    const ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;
    else this.head = this.head.next;
    --this.length;
    return ret
  }
  clear() {
    this.head = this.tail = null;
    this.length = 0;
  }
  join(s) {
    if (this.length === 0) return ''
    let p = this.head;
    let ret = '' + p.data;
    while ((p = p.next) !== null) ret += s + p.data;
    return ret
  }
  concat(n) {
    if (this.length === 0) return Buffer.alloc(0)
    const ret = Buffer.allocUnsafe(n >>> 0);
    let p = this.head;
    let i = 0;
    while (p) {
      TypedArrayPrototypeSet(ret, p.data, i);
      i += p.data.length;
      p = p.next;
    }
    return ret
  }

  // Consumes a specified amount of bytes or characters from the buffered data.
  consume(n, hasStrings) {
    const data = this.head.data;
    if (n < data.length) {
      // `slice` is the same for buffers and strings.
      const slice = data.slice(0, n);
      this.head.data = data.slice(n);
      return slice
    }
    if (n === data.length) {
      // First chunk is a perfect match.
      return this.shift()
    }
    // Result spans more than one buffer.
    return hasStrings ? this._getString(n) : this._getBuffer(n)
  }
  first() {
    return this.head.data
  }
  *[SymbolIterator$1]() {
    for (let p = this.head; p; p = p.next) {
      yield p.data;
    }
  }

  // Consumes a specified amount of characters from the buffered data.
  _getString(n) {
    let ret = '';
    let p = this.head;
    let c = 0;
    do {
      const str = p.data;
      if (n > str.length) {
        ret += str;
        n -= str.length;
      } else {
        if (n === str.length) {
          ret += str;
          ++c;
          if (p.next) this.head = p.next;
          else this.head = this.tail = null;
        } else {
          ret += StringPrototypeSlice(str, 0, n);
          this.head = p;
          p.data = StringPrototypeSlice(str, n);
        }
        break
      }
      ++c;
    } while ((p = p.next) !== null)
    this.length -= c;
    return ret
  }

  // Consumes a specified amount of bytes from the buffered data.
  _getBuffer(n) {
    const ret = Buffer.allocUnsafe(n);
    const retLen = n;
    let p = this.head;
    let c = 0;
    do {
      const buf = p.data;
      if (n > buf.length) {
        TypedArrayPrototypeSet(ret, buf, retLen - n);
        n -= buf.length;
      } else {
        if (n === buf.length) {
          TypedArrayPrototypeSet(ret, buf, retLen - n);
          ++c;
          if (p.next) this.head = p.next;
          else this.head = this.tail = null;
        } else {
          TypedArrayPrototypeSet(ret, new Uint8Array$1(buf.buffer, buf.byteOffset, n), retLen - n);
          this.head = p;
          p.data = buf.slice(n);
        }
        break
      }
      ++c;
    } while ((p = p.next) !== null)
    this.length -= c;
    return ret
  }

  // Make sure the linked list only shows the minimal necessary information.
  [Symbol.for('nodejs.util.inspect.custom')](_, options) {
    return inspect$1(this, {
      ...options,
      // Only inspect one level.
      depth: 0,
      // It should not recurse.
      customInspect: false
    })
  }
};

const { MathFloor, NumberIsInteger: NumberIsInteger$1 } = primordials;
const { validateInteger: validateInteger$1 } = validators;
const { ERR_INVALID_ARG_VALUE: ERR_INVALID_ARG_VALUE$1 } = errors.codes;
let defaultHighWaterMarkBytes = 16 * 1024;
let defaultHighWaterMarkObjectMode = 16;
function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null
}
function getDefaultHighWaterMark(objectMode) {
  return objectMode ? defaultHighWaterMarkObjectMode : defaultHighWaterMarkBytes
}
function setDefaultHighWaterMark(objectMode, value) {
  validateInteger$1(value, 'value', 0);
  if (objectMode) {
    defaultHighWaterMarkObjectMode = value;
  } else {
    defaultHighWaterMarkBytes = value;
  }
}
function getHighWaterMark(state, options, duplexKey, isDuplex) {
  const hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
  if (hwm != null) {
    if (!NumberIsInteger$1(hwm) || hwm < 0) {
      const name = isDuplex ? `options.${duplexKey}` : 'options.highWaterMark';
      throw new ERR_INVALID_ARG_VALUE$1(name, hwm)
    }
    return MathFloor(hwm)
  }

  // Default value
  return getDefaultHighWaterMark(state.objectMode)
}
var state = {
  getHighWaterMark,
  getDefaultHighWaterMark,
  setDefaultHighWaterMark
};

/* replacement start */



/* replacement end */

const { PromisePrototypeThen: PromisePrototypeThen$1, SymbolAsyncIterator: SymbolAsyncIterator$1, SymbolIterator: SymbolIterator$2 } = primordials;
const { Buffer: Buffer$1 } = require$$0;
const { ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$3, ERR_STREAM_NULL_VALUES } = errors.codes;
function from(Readable, iterable, opts) {
  let iterator;
  if (typeof iterable === 'string' || iterable instanceof Buffer$1) {
    return new Readable({
      objectMode: true,
      ...opts,
      read() {
        this.push(iterable);
        this.push(null);
      }
    })
  }
  let isAsync;
  if (iterable && iterable[SymbolAsyncIterator$1]) {
    isAsync = true;
    iterator = iterable[SymbolAsyncIterator$1]();
  } else if (iterable && iterable[SymbolIterator$2]) {
    isAsync = false;
    iterator = iterable[SymbolIterator$2]();
  } else {
    throw new ERR_INVALID_ARG_TYPE$3('iterable', ['Iterable'], iterable)
  }
  const readable = new Readable({
    objectMode: true,
    highWaterMark: 1,
    // TODO(ronag): What options should be allowed?
    ...opts
  });

  // Flag to protect against _read
  // being called before last iteration completion.
  let reading = false;
  readable._read = function () {
    if (!reading) {
      reading = true;
      next();
    }
  };
  readable._destroy = function (error, cb) {
    PromisePrototypeThen$1(
      close(error),
      () => process.nextTick(cb, error),
      // nextTick is here in case cb throws
      (e) => process.nextTick(cb, e || error)
    );
  };
  async function close(error) {
    const hadError = error !== undefined && error !== null;
    const hasThrow = typeof iterator.throw === 'function';
    if (hadError && hasThrow) {
      const { value, done } = await iterator.throw(error);
      await value;
      if (done) {
        return
      }
    }
    if (typeof iterator.return === 'function') {
      const { value } = await iterator.return();
      await value;
    }
  }
  async function next() {
    for (;;) {
      try {
        const { value, done } = isAsync ? await iterator.next() : iterator.next();
        if (done) {
          readable.push(null);
        } else {
          const res = value && typeof value.then === 'function' ? await value : value;
          if (res === null) {
            reading = false;
            throw new ERR_STREAM_NULL_VALUES()
          } else if (readable.push(res)) {
            continue
          } else {
            reading = false;
          }
        }
      } catch (err) {
        readable.destroy(err);
      }
      break
    }
  }
  return readable
}
var from_1 = from;

const {
  ArrayPrototypeIndexOf,
  NumberIsInteger: NumberIsInteger$2,
  NumberIsNaN: NumberIsNaN$1,
  NumberParseInt: NumberParseInt$1,
  ObjectDefineProperties,
  ObjectKeys,
  ObjectSetPrototypeOf: ObjectSetPrototypeOf$1,
  Promise: Promise$2,
  SafeSet,
  SymbolAsyncDispose,
  SymbolAsyncIterator: SymbolAsyncIterator$2,
  Symbol: Symbol$2
} = primordials;
var readable = Readable;
Readable.ReadableState = ReadableState;
const { EventEmitter: EE$1 } = require$$1;
const { Stream: Stream$1, prependListener: prependListener$1 } = legacy;
const { Buffer: Buffer$2 } = require$$0;
const { addAbortSignal: addAbortSignal$1 } = addAbortSignal;

let debug = util.debuglog('stream', (fn) => {
  debug = fn;
});


const { getHighWaterMark: getHighWaterMark$1, getDefaultHighWaterMark: getDefaultHighWaterMark$1 } = state;
const {
  aggregateTwoErrors: aggregateTwoErrors$2,
  codes: {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$4,
    ERR_METHOD_NOT_IMPLEMENTED,
    ERR_OUT_OF_RANGE: ERR_OUT_OF_RANGE$1,
    ERR_STREAM_PUSH_AFTER_EOF,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT
  },
  AbortError: AbortError$3
} = errors;
const { validateObject: validateObject$2 } = validators;
const kPaused = Symbol$2('kPaused');
const { StringDecoder } = require$$2;

ObjectSetPrototypeOf$1(Readable.prototype, Stream$1.prototype);
ObjectSetPrototypeOf$1(Readable, Stream$1);
const nop$1 = () => {};
const { errorOrDestroy: errorOrDestroy$1 } = destroy_1;
const kObjectMode = 1 << 0;
const kEnded = 1 << 1;
const kEndEmitted = 1 << 2;
const kReading = 1 << 3;
const kConstructed = 1 << 4;
const kSync = 1 << 5;
const kNeedReadable = 1 << 6;
const kEmittedReadable = 1 << 7;
const kReadableListening = 1 << 8;
const kResumeScheduled = 1 << 9;
const kErrorEmitted = 1 << 10;
const kEmitClose = 1 << 11;
const kAutoDestroy = 1 << 12;
const kDestroyed = 1 << 13;
const kClosed = 1 << 14;
const kCloseEmitted = 1 << 15;
const kMultiAwaitDrain = 1 << 16;
const kReadingMore = 1 << 17;
const kDataEmitted = 1 << 18;

// TODO(benjamingr) it is likely slower to do it this way than with free functions
function makeBitMapDescriptor(bit) {
  return {
    enumerable: false,
    get() {
      return (this.state & bit) !== 0
    },
    set(value) {
      if (value) this.state |= bit;
      else this.state &= ~bit;
    }
  }
}
ObjectDefineProperties(ReadableState.prototype, {
  objectMode: makeBitMapDescriptor(kObjectMode),
  ended: makeBitMapDescriptor(kEnded),
  endEmitted: makeBitMapDescriptor(kEndEmitted),
  reading: makeBitMapDescriptor(kReading),
  // Stream is still being constructed and cannot be
  // destroyed until construction finished or failed.
  // Async construction is opt in, therefore we start as
  // constructed.
  constructed: makeBitMapDescriptor(kConstructed),
  // A flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  sync: makeBitMapDescriptor(kSync),
  // Whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  needReadable: makeBitMapDescriptor(kNeedReadable),
  emittedReadable: makeBitMapDescriptor(kEmittedReadable),
  readableListening: makeBitMapDescriptor(kReadableListening),
  resumeScheduled: makeBitMapDescriptor(kResumeScheduled),
  // True if the error was already emitted and should not be thrown again.
  errorEmitted: makeBitMapDescriptor(kErrorEmitted),
  emitClose: makeBitMapDescriptor(kEmitClose),
  autoDestroy: makeBitMapDescriptor(kAutoDestroy),
  // Has it been destroyed.
  destroyed: makeBitMapDescriptor(kDestroyed),
  // Indicates whether the stream has finished destroying.
  closed: makeBitMapDescriptor(kClosed),
  // True if close has been emitted or would have been emitted
  // depending on emitClose.
  closeEmitted: makeBitMapDescriptor(kCloseEmitted),
  multiAwaitDrain: makeBitMapDescriptor(kMultiAwaitDrain),
  // If true, a maybeReadMore has been scheduled.
  readingMore: makeBitMapDescriptor(kReadingMore),
  dataEmitted: makeBitMapDescriptor(kDataEmitted)
});
function ReadableState(options, stream, isDuplex) {
  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof duplex;

  // Bit map field to store ReadableState more effciently with 1 bit per field
  // instead of a V8 slot per field.
  this.state = kEmitClose | kAutoDestroy | kConstructed | kSync;
  // Object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away.
  if (options && options.objectMode) this.state |= kObjectMode;
  if (isDuplex && options && options.readableObjectMode) this.state |= kObjectMode;

  // The point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  this.highWaterMark = options
    ? getHighWaterMark$1(this, options, 'readableHighWaterMark', isDuplex)
    : getDefaultHighWaterMark$1(false);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift().
  this.buffer = new buffer_list();
  this.length = 0;
  this.pipes = [];
  this.flowing = null;
  this[kPaused] = null;

  // Should close be emitted on destroy. Defaults to true.
  if (options && options.emitClose === false) this.state &= ~kEmitClose;

  // Should .destroy() be called after 'end' (and potentially 'finish').
  if (options && options.autoDestroy === false) this.state &= ~kAutoDestroy;

  // Indicates whether the stream has errored. When true no further
  // _read calls, 'data' or 'readable' events should occur. This is needed
  // since when autoDestroy is disabled we need a way to tell whether the
  // stream has failed.
  this.errored = null;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = (options && options.defaultEncoding) || 'utf8';

  // Ref the piped dest which we need a drain event on it
  // type: null | Writable | Set<Writable>.
  this.awaitDrainWriters = null;
  this.decoder = null;
  this.encoding = null;
  if (options && options.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {
  if (!(this instanceof Readable)) return new Readable(options)

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5.
  const isDuplex = this instanceof duplex;
  this._readableState = new ReadableState(options, this, isDuplex);
  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.construct === 'function') this._construct = options.construct;
    if (options.signal && !isDuplex) addAbortSignal$1(options.signal, this);
  }
  Stream$1.call(this, options);
  destroy_1.construct(this, () => {
    if (this._readableState.needReadable) {
      maybeReadMore(this, this._readableState);
    }
  });
}
Readable.prototype.destroy = destroy_1.destroy;
Readable.prototype._undestroy = destroy_1.undestroy;
Readable.prototype._destroy = function (err, cb) {
  cb(err);
};
Readable.prototype[EE$1.captureRejectionSymbol] = function (err) {
  this.destroy(err);
};
Readable.prototype[SymbolAsyncDispose] = function () {
  let error;
  if (!this.destroyed) {
    error = this.readableEnded ? null : new AbortError$3();
    this.destroy(error);
  }
  return new Promise$2((resolve, reject) => endOfStream(this, (err) => (err && err !== error ? reject(err) : resolve(null))))
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  return readableAddChunk(this, chunk, encoding, false)
};

// Unshift should *always* be something directly out of read().
Readable.prototype.unshift = function (chunk, encoding) {
  return readableAddChunk(this, chunk, encoding, true)
};
function readableAddChunk(stream, chunk, encoding, addToFront) {
  debug('readableAddChunk', chunk);
  const state = stream._readableState;
  let err;
  if ((state.state & kObjectMode) === 0) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (state.encoding !== encoding) {
        if (addToFront && state.encoding) {
          // When unshifting, if state.encoding is set, we have to save
          // the string in the BufferList with the state encoding.
          chunk = Buffer$2.from(chunk, encoding).toString(state.encoding);
        } else {
          chunk = Buffer$2.from(chunk, encoding);
          encoding = '';
        }
      }
    } else if (chunk instanceof Buffer$2) {
      encoding = '';
    } else if (Stream$1._isUint8Array(chunk)) {
      chunk = Stream$1._uint8ArrayToBuffer(chunk);
      encoding = '';
    } else if (chunk != null) {
      err = new ERR_INVALID_ARG_TYPE$4('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
    }
  }
  if (err) {
    errorOrDestroy$1(stream, err);
  } else if (chunk === null) {
    state.state &= ~kReading;
    onEofChunk(stream, state);
  } else if ((state.state & kObjectMode) !== 0 || (chunk && chunk.length > 0)) {
    if (addToFront) {
      if ((state.state & kEndEmitted) !== 0) errorOrDestroy$1(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
      else if (state.destroyed || state.errored) return false
      else addChunk(stream, state, chunk, true);
    } else if (state.ended) {
      errorOrDestroy$1(stream, new ERR_STREAM_PUSH_AFTER_EOF());
    } else if (state.destroyed || state.errored) {
      return false
    } else {
      state.state &= ~kReading;
      if (state.decoder && !encoding) {
        chunk = state.decoder.write(chunk);
        if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
        else maybeReadMore(stream, state);
      } else {
        addChunk(stream, state, chunk, false);
      }
    }
  } else if (!addToFront) {
    state.state &= ~kReading;
    maybeReadMore(stream, state);
  }

  // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.
  return !state.ended && (state.length < state.highWaterMark || state.length === 0)
}
function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync && stream.listenerCount('data') > 0) {
    // Use the guard to avoid creating `Set()` repeatedly
    // when we have multiple pipes.
    if ((state.state & kMultiAwaitDrain) !== 0) {
      state.awaitDrainWriters.clear();
    } else {
      state.awaitDrainWriters = null;
    }
    state.dataEmitted = true;
    stream.emit('data', chunk);
  } else {
    // Update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);
    else state.buffer.push(chunk);
    if ((state.state & kNeedReadable) !== 0) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}
Readable.prototype.isPaused = function () {
  const state = this._readableState;
  return state[kPaused] === true || state.flowing === false
};

// Backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  const decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder;
  // If setEncoding(null), decoder.encoding equals utf8.
  this._readableState.encoding = this._readableState.decoder.encoding;
  const buffer = this._readableState.buffer;
  // Iterate over current buffer to convert already stored Buffers:
  let content = '';
  for (const data of buffer) {
    content += decoder.write(data);
  }
  buffer.clear();
  if (content !== '') buffer.push(content);
  this._readableState.length = content.length;
  return this
};

// Don't raise the hwm > 1GB.
const MAX_HWM = 0x40000000;
function computeNewHighWaterMark(n) {
  if (n > MAX_HWM) {
    throw new ERR_OUT_OF_RANGE$1('size', '<= 1GiB', n)
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts.
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || (state.length === 0 && state.ended)) return 0
  if ((state.state & kObjectMode) !== 0) return 1
  if (NumberIsNaN$1(n)) {
    // Only flow one buffer at a time.
    if (state.flowing && state.length) return state.buffer.first().length
    return state.length
  }
  if (n <= state.length) return n
  return state.ended ? state.length : 0
}

// You can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  // Same as parseInt(undefined, 10), however V8 7.3 performance regressed
  // in this scenario, so we are doing it manually.
  if (n === undefined) {
    n = NaN;
  } else if (!NumberIsInteger$2(n)) {
    n = NumberParseInt$1(n, 10);
  }
  const state = this._readableState;
  const nOrig = n;

  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n !== 0) state.state &= ~kEmittedReadable;

  // If we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (
    n === 0 &&
    state.needReadable &&
    ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)
  ) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);
    else emitReadable(this);
    return null
  }
  n = howMuchToRead(n, state);

  // If we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  let doRead = (state.state & kNeedReadable) !== 0;
  debug('need readable', doRead);

  // If we currently have less than the highWaterMark, then also read some.
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // However, if we've ended, then there's no point, if we're already
  // reading, then it's unnecessary, if we're constructing we have to wait,
  // and if we're destroyed or errored, then it's not allowed,
  if (state.ended || state.reading || state.destroyed || state.errored || !state.constructed) {
    doRead = false;
    debug('reading, ended or constructing', doRead);
  } else if (doRead) {
    debug('do read');
    state.state |= kReading | kSync;
    // If the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.state |= kNeedReadable;

    // Call internal read method
    try {
      this._read(state.highWaterMark);
    } catch (err) {
      errorOrDestroy$1(this, err);
    }
    state.state &= ~kSync;

    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }
  let ret;
  if (n > 0) ret = fromList(n, state);
  else ret = null;
  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    if (state.multiAwaitDrain) {
      state.awaitDrainWriters.clear();
    } else {
      state.awaitDrainWriters = null;
    }
  }
  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }
  if (ret !== null && !state.errorEmitted && !state.closeEmitted) {
    state.dataEmitted = true;
    this.emit('data', ret);
  }
  return ret
};
function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return
  if (state.decoder) {
    const chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;
  if (state.sync) {
    // If we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call.
    emitReadable(stream);
  } else {
    // Emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;
    state.emittedReadable = true;
    // We have to emit readable now that we are EOF. Modules
    // in the ecosystem (e.g. dicer) rely on this event being sync.
    emitReadable_(stream);
  }
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  const state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}
function emitReadable_(stream) {
  const state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);
  if (!state.destroyed && !state.errored && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  }

  // The stream needs another readable event if:
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.
  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
}

// At this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore && state.constructed) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}
function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (
    !state.reading &&
    !state.ended &&
    (state.length < state.highWaterMark || (state.flowing && state.length === 0))
  ) {
    const len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // Didn't get any data, stop spinning.
      break
  }
  state.readingMore = false;
}

// Abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  throw new ERR_METHOD_NOT_IMPLEMENTED('_read()')
};
Readable.prototype.pipe = function (dest, pipeOpts) {
  const src = this;
  const state = this._readableState;
  if (state.pipes.length === 1) {
    if (!state.multiAwaitDrain) {
      state.multiAwaitDrain = true;
      state.awaitDrainWriters = new SafeSet(state.awaitDrainWriters ? [state.awaitDrainWriters] : []);
    }
  }
  state.pipes.push(dest);
  debug('pipe count=%d opts=%j', state.pipes.length, pipeOpts);
  const doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  const endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);
  else src.once('end', endFn);
  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }
  function onend() {
    debug('onend');
    dest.end();
  }
  let ondrain;
  let cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // Cleanup event handlers once the pipe is broken.
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    if (ondrain) {
      dest.removeListener('drain', ondrain);
    }
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true;

    // If the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (ondrain && state.awaitDrainWriters && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }
  function pause() {
    // If the user unpiped during `dest.write()`, it is possible
    // to get stuck in a permanently paused state if that write
    // also returned false.
    // => Check whether `dest` is still a piping destination.
    if (!cleanedUp) {
      if (state.pipes.length === 1 && state.pipes[0] === dest) {
        debug('false write response, pause', 0);
        state.awaitDrainWriters = dest;
        state.multiAwaitDrain = false;
      } else if (state.pipes.length > 1 && state.pipes.includes(dest)) {
        debug('false write response, pause', state.awaitDrainWriters.size);
        state.awaitDrainWriters.add(dest);
      }
      src.pause();
    }
    if (!ondrain) {
      // When the dest drains, it reduces the awaitDrain counter
      // on the source.  This would be more elegant with a .once()
      // handler in flow(), but adding and removing repeatedly is
      // too slow.
      ondrain = pipeOnDrain(src, dest);
      dest.on('drain', ondrain);
    }
  }
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    const ret = dest.write(chunk);
    debug('dest.write', ret);
    if (ret === false) {
      pause();
    }
  }

  // If the dest has an error, then stop piping into it.
  // However, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (dest.listenerCount('error') === 0) {
      const s = dest._writableState || dest._readableState;
      if (s && !s.errorEmitted) {
        // User incorrectly emitted 'error' directly on the stream.
        errorOrDestroy$1(dest, er);
      } else {
        dest.emit('error', er);
      }
    }
  }

  // Make sure our error handler is attached before userland ones.
  prependListener$1(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);
  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // Tell the dest that it's being piped to.
  dest.emit('pipe', src);

  // Start the flow if it hasn't been started already.

  if (dest.writableNeedDrain === true) {
    pause();
  } else if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }
  return dest
};
function pipeOnDrain(src, dest) {
  return function pipeOnDrainFunctionResult() {
    const state = src._readableState;

    // `ondrain` will call directly,
    // `this` maybe not a reference to dest,
    // so we use the real dest here.
    if (state.awaitDrainWriters === dest) {
      debug('pipeOnDrain', 1);
      state.awaitDrainWriters = null;
    } else if (state.multiAwaitDrain) {
      debug('pipeOnDrain', state.awaitDrainWriters.size);
      state.awaitDrainWriters.delete(dest);
    }
    if ((!state.awaitDrainWriters || state.awaitDrainWriters.size === 0) && src.listenerCount('data')) {
      src.resume();
    }
  }
}
Readable.prototype.unpipe = function (dest) {
  const state = this._readableState;
  const unpipeInfo = {
    hasUnpiped: false
  };

  // If we're not piping anywhere, then do nothing.
  if (state.pipes.length === 0) return this
  if (!dest) {
    // remove all.
    const dests = state.pipes;
    state.pipes = [];
    this.pause();
    for (let i = 0; i < dests.length; i++)
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    return this
  }

  // Try to find the right one.
  const index = ArrayPrototypeIndexOf(state.pipes, dest);
  if (index === -1) return this
  state.pipes.splice(index, 1);
  if (state.pipes.length === 0) this.pause();
  dest.emit('unpipe', this, unpipeInfo);
  return this
};

// Set up data events if they are asked for
// Ensure readable listeners eventually get something.
Readable.prototype.on = function (ev, fn) {
  const res = Stream$1.prototype.on.call(this, ev, fn);
  const state = this._readableState;
  if (ev === 'data') {
    // Update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0;

    // Try start flowing on next tick if stream isn't explicitly paused.
    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);
      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }
  return res
};
Readable.prototype.addListener = Readable.prototype.on;
Readable.prototype.removeListener = function (ev, fn) {
  const res = Stream$1.prototype.removeListener.call(this, ev, fn);
  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res
};
Readable.prototype.off = Readable.prototype.removeListener;
Readable.prototype.removeAllListeners = function (ev) {
  const res = Stream$1.prototype.removeAllListeners.apply(this, arguments);
  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }
  return res
};
function updateReadableListening(self) {
  const state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;
  if (state.resumeScheduled && state[kPaused] === false) {
    // Flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true;

    // Crude way to check if we should resume.
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  } else if (!state.readableListening) {
    state.flowing = null;
  }
}
function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  const state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    // We flow only if there is no one listening
    // for readable, but we still have to call
    // resume().
    state.flowing = !state.readableListening;
    resume(this, state);
  }
  state[kPaused] = false;
  return this
};
function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}
function resume_(stream, state) {
  debug('resume', state.reading);
  if (!state.reading) {
    stream.read(0);
  }
  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  this._readableState[kPaused] = true;
  return this
};
function flow(stream) {
  const state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null);
}

// Wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  let paused = false;

  // TODO (ronag): Should this.destroy(err) emit
  // 'error' on the wrapped stream? Would require
  // a static factory method, e.g. Readable.wrap(stream).

  stream.on('data', (chunk) => {
    if (!this.push(chunk) && stream.pause) {
      paused = true;
      stream.pause();
    }
  });
  stream.on('end', () => {
    this.push(null);
  });
  stream.on('error', (err) => {
    errorOrDestroy$1(this, err);
  });
  stream.on('close', () => {
    this.destroy();
  });
  stream.on('destroy', () => {
    this.destroy();
  });
  this._read = () => {
    if (paused && stream.resume) {
      paused = false;
      stream.resume();
    }
  };

  // Proxy all the other methods. Important when wrapping filters and duplexes.
  const streamKeys = ObjectKeys(stream);
  for (let j = 1; j < streamKeys.length; j++) {
    const i = streamKeys[j];
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = stream[i].bind(stream);
    }
  }
  return this
};
Readable.prototype[SymbolAsyncIterator$2] = function () {
  return streamToAsyncIterator(this)
};
Readable.prototype.iterator = function (options) {
  if (options !== undefined) {
    validateObject$2(options, 'options');
  }
  return streamToAsyncIterator(this, options)
};
function streamToAsyncIterator(stream, options) {
  if (typeof stream.read !== 'function') {
    stream = Readable.wrap(stream, {
      objectMode: true
    });
  }
  const iter = createAsyncIterator(stream, options);
  iter.stream = stream;
  return iter
}
async function* createAsyncIterator(stream, options) {
  let callback = nop$1;
  function next(resolve) {
    if (this === stream) {
      callback();
      callback = nop$1;
    } else {
      callback = resolve;
    }
  }
  stream.on('readable', next);
  let error;
  const cleanup = endOfStream(
    stream,
    {
      writable: false
    },
    (err) => {
      error = err ? aggregateTwoErrors$2(error, err) : null;
      callback();
      callback = nop$1;
    }
  );
  try {
    while (true) {
      const chunk = stream.destroyed ? null : stream.read();
      if (chunk !== null) {
        yield chunk;
      } else if (error) {
        throw error
      } else if (error === null) {
        return
      } else {
        await new Promise$2(next);
      }
    }
  } catch (err) {
    error = aggregateTwoErrors$2(error, err);
    throw error
  } finally {
    if (
      (error || (options === null || options === undefined ? undefined : options.destroyOnReturn) !== false) &&
      (error === undefined || stream._readableState.autoDestroy)
    ) {
      destroy_1.destroyer(stream, null);
    } else {
      stream.off('readable', next);
      cleanup();
    }
  }
}

// Making it explicit these properties are not enumerable
// because otherwise some prototype manipulation in
// userland will fail.
ObjectDefineProperties(Readable.prototype, {
  readable: {
    __proto__: null,
    get() {
      const r = this._readableState;
      // r.readable === false means that this is part of a Duplex stream
      // where the readable side was disabled upon construction.
      // Compat. The user might manually disable readable side through
      // deprecated setter.
      return !!r && r.readable !== false && !r.destroyed && !r.errorEmitted && !r.endEmitted
    },
    set(val) {
      // Backwards compat.
      if (this._readableState) {
        this._readableState.readable = !!val;
      }
    }
  },
  readableDidRead: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return this._readableState.dataEmitted
    }
  },
  readableAborted: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return !!(
        this._readableState.readable !== false &&
        (this._readableState.destroyed || this._readableState.errored) &&
        !this._readableState.endEmitted
      )
    }
  },
  readableHighWaterMark: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return this._readableState.highWaterMark
    }
  },
  readableBuffer: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return this._readableState && this._readableState.buffer
    }
  },
  readableFlowing: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return this._readableState.flowing
    },
    set: function (state) {
      if (this._readableState) {
        this._readableState.flowing = state;
      }
    }
  },
  readableLength: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState.length
    }
  },
  readableObjectMode: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.objectMode : false
    }
  },
  readableEncoding: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.encoding : null
    }
  },
  errored: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.errored : null
    }
  },
  closed: {
    __proto__: null,
    get() {
      return this._readableState ? this._readableState.closed : false
    }
  },
  destroyed: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.destroyed : false
    },
    set(value) {
      // We ignore the value if the stream
      // has not been initialized yet.
      if (!this._readableState) {
        return
      }

      // Backward compatibility, the user is explicitly
      // managing destroyed.
      this._readableState.destroyed = value;
    }
  },
  readableEnded: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._readableState ? this._readableState.endEmitted : false
    }
  }
});
ObjectDefineProperties(ReadableState.prototype, {
  // Legacy getter for `pipesCount`.
  pipesCount: {
    __proto__: null,
    get() {
      return this.pipes.length
    }
  },
  // Legacy property for `paused`.
  paused: {
    __proto__: null,
    get() {
      return this[kPaused] !== false
    },
    set(value) {
      this[kPaused] = !!value;
    }
  }
});

// Exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered.
  if (state.length === 0) return null
  let ret;
  if (state.objectMode) ret = state.buffer.shift();
  else if (!n || n >= state.length) {
    // Read it all, truncate the list.
    if (state.decoder) ret = state.buffer.join('');
    else if (state.buffer.length === 1) ret = state.buffer.first();
    else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list.
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret
}
function endReadable(stream) {
  const state = stream._readableState;
  debug('endReadable', state.endEmitted);
  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}
function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length);

  // Check that we didn't get one last unshift.
  if (!state.errored && !state.closeEmitted && !state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.emit('end');
    if (stream.writable && stream.allowHalfOpen === false) {
      process.nextTick(endWritableNT, stream);
    } else if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well.
      const wState = stream._writableState;
      const autoDestroy =
        !wState ||
        (wState.autoDestroy &&
          // We don't expect the writable to ever 'finish'
          // if writable is explicitly set to false.
          (wState.finished || wState.writable === false));
      if (autoDestroy) {
        stream.destroy();
      }
    }
  }
}
function endWritableNT(stream) {
  const writable = stream.writable && !stream.writableEnded && !stream.destroyed;
  if (writable) {
    stream.end();
  }
}
Readable.from = function (iterable, opts) {
  return from_1(Readable, iterable, opts)
};
let webStreamsAdapters;

// Lazy to avoid circular references
function lazyWebStreams() {
  if (webStreamsAdapters === undefined) webStreamsAdapters = {};
  return webStreamsAdapters
}
Readable.fromWeb = function (readableStream, options) {
  return lazyWebStreams().newStreamReadableFromReadableStream(readableStream, options)
};
Readable.toWeb = function (streamReadable, options) {
  return lazyWebStreams().newReadableStreamFromStreamReadable(streamReadable, options)
};
Readable.wrap = function (src, options) {
  var _ref, _src$readableObjectMo;
  return new Readable({
    objectMode:
      (_ref =
        (_src$readableObjectMo = src.readableObjectMode) !== null && _src$readableObjectMo !== undefined
          ? _src$readableObjectMo
          : src.objectMode) !== null && _ref !== undefined
        ? _ref
        : true,
    ...options,
    destroy(err, callback) {
      destroy_1.destroyer(src, err);
      callback(err);
    }
  }).wrap(src)
};

const {
  ArrayPrototypeSlice,
  Error: Error$1,
  FunctionPrototypeSymbolHasInstance,
  ObjectDefineProperty,
  ObjectDefineProperties: ObjectDefineProperties$1,
  ObjectSetPrototypeOf: ObjectSetPrototypeOf$2,
  StringPrototypeToLowerCase,
  Symbol: Symbol$3,
  SymbolHasInstance
} = primordials;
var writable = Writable;
Writable.WritableState = WritableState;
const { EventEmitter: EE$2 } = require$$1;
const Stream$2 = legacy.Stream;
const { Buffer: Buffer$3 } = require$$0;

const { addAbortSignal: addAbortSignal$2 } = addAbortSignal;
const { getHighWaterMark: getHighWaterMark$2, getDefaultHighWaterMark: getDefaultHighWaterMark$2 } = state;
const {
  ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$5,
  ERR_METHOD_NOT_IMPLEMENTED: ERR_METHOD_NOT_IMPLEMENTED$1,
  ERR_MULTIPLE_CALLBACK: ERR_MULTIPLE_CALLBACK$1,
  ERR_STREAM_CANNOT_PIPE,
  ERR_STREAM_DESTROYED,
  ERR_STREAM_ALREADY_FINISHED,
  ERR_STREAM_NULL_VALUES: ERR_STREAM_NULL_VALUES$1,
  ERR_STREAM_WRITE_AFTER_END,
  ERR_UNKNOWN_ENCODING
} = errors.codes;
const { errorOrDestroy: errorOrDestroy$2 } = destroy_1;
ObjectSetPrototypeOf$2(Writable.prototype, Stream$2.prototype);
ObjectSetPrototypeOf$2(Writable, Stream$2);
function nop$2() {}
const kOnFinished = Symbol$3('kOnFinished');
function WritableState(options, stream, isDuplex) {
  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.
  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof duplex;

  // Object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!(options && options.objectMode);
  if (isDuplex) this.objectMode = this.objectMode || !!(options && options.writableObjectMode);

  // The point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write().
  this.highWaterMark = options
    ? getHighWaterMark$2(this, options, 'writableHighWaterMark', isDuplex)
    : getDefaultHighWaterMark$2(false);

  // if _final has been called.
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // At the start of calling end()
  this.ending = false;
  // When end() has been called, and returned.
  this.ended = false;
  // When 'finish' is emitted.
  this.finished = false;

  // Has it been destroyed
  this.destroyed = false;

  // Should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  const noDecode = !!(options && options.decodeStrings === false);
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = (options && options.defaultEncoding) || 'utf8';

  // Not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // A flag to see when we're in the middle of a write.
  this.writing = false;

  // When true all writes will be buffered until .uncork() call.
  this.corked = 0;

  // A flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // A flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // The callback that's passed to _write(chunk, cb).
  this.onwrite = onwrite.bind(undefined, stream);

  // The callback that the user supplies to write(chunk, encoding, cb).
  this.writecb = null;

  // The amount that is being written when _write is called.
  this.writelen = 0;

  // Storage for data passed to the afterWrite() callback in case of
  // synchronous _write() completion.
  this.afterWriteTickInfo = null;
  resetBuffer(this);

  // Number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted.
  this.pendingcb = 0;

  // Stream is still being constructed and cannot be
  // destroyed until construction finished or failed.
  // Async construction is opt in, therefore we start as
  // constructed.
  this.constructed = true;

  // Emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams.
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again.
  this.errorEmitted = false;

  // Should close be emitted on destroy. Defaults to true.
  this.emitClose = !options || options.emitClose !== false;

  // Should .destroy() be called after 'finish' (and potentially 'end').
  this.autoDestroy = !options || options.autoDestroy !== false;

  // Indicates whether the stream has errored. When true all write() calls
  // should return false. This is needed since when autoDestroy
  // is disabled we need a way to tell whether the stream has failed.
  this.errored = null;

  // Indicates whether the stream has finished destroying.
  this.closed = false;

  // True if close has been emitted or would have been emitted
  // depending on emitClose.
  this.closeEmitted = false;
  this[kOnFinished] = [];
}
function resetBuffer(state) {
  state.buffered = [];
  state.bufferedIndex = 0;
  state.allBuffers = true;
  state.allNoop = true;
}
WritableState.prototype.getBuffer = function getBuffer() {
  return ArrayPrototypeSlice(this.buffered, this.bufferedIndex)
};
ObjectDefineProperty(WritableState.prototype, 'bufferedRequestCount', {
  __proto__: null,
  get() {
    return this.buffered.length - this.bufferedIndex
  }
});
function Writable(options) {
  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.

  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5.
  const isDuplex = this instanceof duplex;
  if (!isDuplex && !FunctionPrototypeSymbolHasInstance(Writable, this)) return new Writable(options)
  this._writableState = new WritableState(options, this, isDuplex);
  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
    if (typeof options.construct === 'function') this._construct = options.construct;
    if (options.signal) addAbortSignal$2(options.signal, this);
  }
  Stream$2.call(this, options);
  destroy_1.construct(this, () => {
    const state = this._writableState;
    if (!state.writing) {
      clearBuffer(this, state);
    }
    finishMaybe(this, state);
  });
}
ObjectDefineProperty(Writable, SymbolHasInstance, {
  __proto__: null,
  value: function (object) {
    if (FunctionPrototypeSymbolHasInstance(this, object)) return true
    if (this !== Writable) return false
    return object && object._writableState instanceof WritableState
  }
});

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  errorOrDestroy$2(this, new ERR_STREAM_CANNOT_PIPE());
};
function _write(stream, chunk, encoding, cb) {
  const state = stream._writableState;
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = state.defaultEncoding;
  } else {
    if (!encoding) encoding = state.defaultEncoding;
    else if (encoding !== 'buffer' && !Buffer$3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding)
    if (typeof cb !== 'function') cb = nop$2;
  }
  if (chunk === null) {
    throw new ERR_STREAM_NULL_VALUES$1()
  } else if (!state.objectMode) {
    if (typeof chunk === 'string') {
      if (state.decodeStrings !== false) {
        chunk = Buffer$3.from(chunk, encoding);
        encoding = 'buffer';
      }
    } else if (chunk instanceof Buffer$3) {
      encoding = 'buffer';
    } else if (Stream$2._isUint8Array(chunk)) {
      chunk = Stream$2._uint8ArrayToBuffer(chunk);
      encoding = 'buffer';
    } else {
      throw new ERR_INVALID_ARG_TYPE$5('chunk', ['string', 'Buffer', 'Uint8Array'], chunk)
    }
  }
  let err;
  if (state.ending) {
    err = new ERR_STREAM_WRITE_AFTER_END();
  } else if (state.destroyed) {
    err = new ERR_STREAM_DESTROYED('write');
  }
  if (err) {
    process.nextTick(cb, err);
    errorOrDestroy$2(stream, err, true);
    return err
  }
  state.pendingcb++;
  return writeOrBuffer(stream, state, chunk, encoding, cb)
}
Writable.prototype.write = function (chunk, encoding, cb) {
  return _write(this, chunk, encoding, cb) === true
};
Writable.prototype.cork = function () {
  this._writableState.corked++;
};
Writable.prototype.uncork = function () {
  const state = this._writableState;
  if (state.corked) {
    state.corked--;
    if (!state.writing) clearBuffer(this, state);
  }
};
Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = StringPrototypeToLowerCase(encoding);
  if (!Buffer$3.isEncoding(encoding)) throw new ERR_UNKNOWN_ENCODING(encoding)
  this._writableState.defaultEncoding = encoding;
  return this
};

// If we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, callback) {
  const len = state.objectMode ? 1 : chunk.length;
  state.length += len;

  // stream._write resets state.length
  const ret = state.length < state.highWaterMark;
  // We must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;
  if (state.writing || state.corked || state.errored || !state.constructed) {
    state.buffered.push({
      chunk,
      encoding,
      callback
    });
    if (state.allBuffers && encoding !== 'buffer') {
      state.allBuffers = false;
    }
    if (state.allNoop && callback !== nop$2) {
      state.allNoop = false;
    }
  } else {
    state.writelen = len;
    state.writecb = callback;
    state.writing = true;
    state.sync = true;
    stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  }

  // Return false if errored or destroyed in order to break
  // any synchronous while(stream.write(data)) loops.
  return ret && !state.errored && !state.destroyed
}
function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));
  else if (writev) stream._writev(chunk, state.onwrite);
  else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}
function onwriteError(stream, state, er, cb) {
  --state.pendingcb;
  cb(er);
  // Ensure callbacks are invoked even when autoDestroy is
  // not enabled. Passing `er` here doesn't make sense since
  // it's related to one specific write, not to the buffered
  // writes.
  errorBuffer(state);
  // This can emit error, but error must always follow cb.
  errorOrDestroy$2(stream, er);
}
function onwrite(stream, er) {
  const state = stream._writableState;
  const sync = state.sync;
  const cb = state.writecb;
  if (typeof cb !== 'function') {
    errorOrDestroy$2(stream, new ERR_MULTIPLE_CALLBACK$1());
    return
  }
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
  if (er) {
    // Avoid V8 leak, https://github.com/nodejs/node/pull/34103#issuecomment-652002364
    er.stack; // eslint-disable-line no-unused-expressions

    if (!state.errored) {
      state.errored = er;
    }

    // In case of duplex streams we need to notify the readable side of the
    // error.
    if (stream._readableState && !stream._readableState.errored) {
      stream._readableState.errored = er;
    }
    if (sync) {
      process.nextTick(onwriteError, stream, state, er, cb);
    } else {
      onwriteError(stream, state, er, cb);
    }
  } else {
    if (state.buffered.length > state.bufferedIndex) {
      clearBuffer(stream, state);
    }
    if (sync) {
      // It is a common case that the callback passed to .write() is always
      // the same. In that case, we do not schedule a new nextTick(), but
      // rather just increase a counter, to improve performance and avoid
      // memory allocations.
      if (state.afterWriteTickInfo !== null && state.afterWriteTickInfo.cb === cb) {
        state.afterWriteTickInfo.count++;
      } else {
        state.afterWriteTickInfo = {
          count: 1,
          cb,
          stream,
          state
        };
        process.nextTick(afterWriteTick, state.afterWriteTickInfo);
      }
    } else {
      afterWrite(stream, state, 1, cb);
    }
  }
}
function afterWriteTick({ stream, state, count, cb }) {
  state.afterWriteTickInfo = null;
  return afterWrite(stream, state, count, cb)
}
function afterWrite(stream, state, count, cb) {
  const needDrain = !state.ending && !stream.destroyed && state.length === 0 && state.needDrain;
  if (needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
  while (count-- > 0) {
    state.pendingcb--;
    cb();
  }
  if (state.destroyed) {
    errorBuffer(state);
  }
  finishMaybe(stream, state);
}

// If there's something in the buffer waiting, then invoke callbacks.
function errorBuffer(state) {
  if (state.writing) {
    return
  }
  for (let n = state.bufferedIndex; n < state.buffered.length; ++n) {
    var _state$errored;
    const { chunk, callback } = state.buffered[n];
    const len = state.objectMode ? 1 : chunk.length;
    state.length -= len;
    callback(
      (_state$errored = state.errored) !== null && _state$errored !== undefined
        ? _state$errored
        : new ERR_STREAM_DESTROYED('write')
    );
  }
  const onfinishCallbacks = state[kOnFinished].splice(0);
  for (let i = 0; i < onfinishCallbacks.length; i++) {
    var _state$errored2;
    onfinishCallbacks[i](
      (_state$errored2 = state.errored) !== null && _state$errored2 !== undefined
        ? _state$errored2
        : new ERR_STREAM_DESTROYED('end')
    );
  }
  resetBuffer(state);
}

// If there's something in the buffer waiting, then process it.
function clearBuffer(stream, state) {
  if (state.corked || state.bufferProcessing || state.destroyed || !state.constructed) {
    return
  }
  const { buffered, bufferedIndex, objectMode } = state;
  const bufferedLength = buffered.length - bufferedIndex;
  if (!bufferedLength) {
    return
  }
  let i = bufferedIndex;
  state.bufferProcessing = true;
  if (bufferedLength > 1 && stream._writev) {
    state.pendingcb -= bufferedLength - 1;
    const callback = state.allNoop
      ? nop$2
      : (err) => {
          for (let n = i; n < buffered.length; ++n) {
            buffered[n].callback(err);
          }
        };
    // Make a copy of `buffered` if it's going to be used by `callback` above,
    // since `doWrite` will mutate the array.
    const chunks = state.allNoop && i === 0 ? buffered : ArrayPrototypeSlice(buffered, i);
    chunks.allBuffers = state.allBuffers;
    doWrite(stream, state, true, state.length, chunks, '', callback);
    resetBuffer(state);
  } else {
    do {
      const { chunk, encoding, callback } = buffered[i];
      buffered[i++] = null;
      const len = objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, callback);
    } while (i < buffered.length && !state.writing)
    if (i === buffered.length) {
      resetBuffer(state);
    } else if (i > 256) {
      buffered.splice(0, i);
      state.bufferedIndex = 0;
    } else {
      state.bufferedIndex = i;
    }
  }
  state.bufferProcessing = false;
}
Writable.prototype._write = function (chunk, encoding, cb) {
  if (this._writev) {
    this._writev(
      [
        {
          chunk,
          encoding
        }
      ],
      cb
    );
  } else {
    throw new ERR_METHOD_NOT_IMPLEMENTED$1('_write()')
  }
};
Writable.prototype._writev = null;
Writable.prototype.end = function (chunk, encoding, cb) {
  const state = this._writableState;
  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }
  let err;
  if (chunk !== null && chunk !== undefined) {
    const ret = _write(this, chunk, encoding);
    if (ret instanceof Error$1) {
      err = ret;
    }
  }

  // .end() fully uncorks.
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }
  if (err) ; else if (!state.errored && !state.ending) {
    // This is forgiving in terms of unnecessary calls to end() and can hide
    // logic errors. However, usually such errors are harmless and causing a
    // hard error can be disproportionately destructive. It is not always
    // trivial for the user to determine whether end() needs to be called
    // or not.

    state.ending = true;
    finishMaybe(this, state, true);
    state.ended = true;
  } else if (state.finished) {
    err = new ERR_STREAM_ALREADY_FINISHED('end');
  } else if (state.destroyed) {
    err = new ERR_STREAM_DESTROYED('end');
  }
  if (typeof cb === 'function') {
    if (err || state.finished) {
      process.nextTick(cb, err);
    } else {
      state[kOnFinished].push(cb);
    }
  }
  return this
};
function needFinish(state) {
  return (
    state.ending &&
    !state.destroyed &&
    state.constructed &&
    state.length === 0 &&
    !state.errored &&
    state.buffered.length === 0 &&
    !state.finished &&
    !state.writing &&
    !state.errorEmitted &&
    !state.closeEmitted
  )
}
function callFinal(stream, state) {
  let called = false;
  function onFinish(err) {
    if (called) {
      errorOrDestroy$2(stream, err !== null && err !== undefined ? err : ERR_MULTIPLE_CALLBACK$1());
      return
    }
    called = true;
    state.pendingcb--;
    if (err) {
      const onfinishCallbacks = state[kOnFinished].splice(0);
      for (let i = 0; i < onfinishCallbacks.length; i++) {
        onfinishCallbacks[i](err);
      }
      errorOrDestroy$2(stream, err, state.sync);
    } else if (needFinish(state)) {
      state.prefinished = true;
      stream.emit('prefinish');
      // Backwards compat. Don't check state.sync here.
      // Some streams assume 'finish' will be emitted
      // asynchronously relative to _final callback.
      state.pendingcb++;
      process.nextTick(finish, stream, state);
    }
  }
  state.sync = true;
  state.pendingcb++;
  try {
    stream._final(onFinish);
  } catch (err) {
    onFinish(err);
  }
  state.sync = false;
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.finalCalled = true;
      callFinal(stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}
function finishMaybe(stream, state, sync) {
  if (needFinish(state)) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      if (sync) {
        state.pendingcb++;
        process.nextTick(
          (stream, state) => {
            if (needFinish(state)) {
              finish(stream, state);
            } else {
              state.pendingcb--;
            }
          },
          stream,
          state
        );
      } else if (needFinish(state)) {
        state.pendingcb++;
        finish(stream, state);
      }
    }
  }
}
function finish(stream, state) {
  state.pendingcb--;
  state.finished = true;
  const onfinishCallbacks = state[kOnFinished].splice(0);
  for (let i = 0; i < onfinishCallbacks.length; i++) {
    onfinishCallbacks[i]();
  }
  stream.emit('finish');
  if (state.autoDestroy) {
    // In case of duplex streams we need a way to detect
    // if the readable side is ready for autoDestroy as well.
    const rState = stream._readableState;
    const autoDestroy =
      !rState ||
      (rState.autoDestroy &&
        // We don't expect the readable to ever 'end'
        // if readable is explicitly set to false.
        (rState.endEmitted || rState.readable === false));
    if (autoDestroy) {
      stream.destroy();
    }
  }
}
ObjectDefineProperties$1(Writable.prototype, {
  closed: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.closed : false
    }
  },
  destroyed: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.destroyed : false
    },
    set(value) {
      // Backward compatibility, the user is explicitly managing destroyed.
      if (this._writableState) {
        this._writableState.destroyed = value;
      }
    }
  },
  writable: {
    __proto__: null,
    get() {
      const w = this._writableState;
      // w.writable === false means that this is part of a Duplex stream
      // where the writable side was disabled upon construction.
      // Compat. The user might manually disable writable side through
      // deprecated setter.
      return !!w && w.writable !== false && !w.destroyed && !w.errored && !w.ending && !w.ended
    },
    set(val) {
      // Backwards compatible.
      if (this._writableState) {
        this._writableState.writable = !!val;
      }
    }
  },
  writableFinished: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.finished : false
    }
  },
  writableObjectMode: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.objectMode : false
    }
  },
  writableBuffer: {
    __proto__: null,
    get() {
      return this._writableState && this._writableState.getBuffer()
    }
  },
  writableEnded: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.ending : false
    }
  },
  writableNeedDrain: {
    __proto__: null,
    get() {
      const wState = this._writableState;
      if (!wState) return false
      return !wState.destroyed && !wState.ending && wState.needDrain
    }
  },
  writableHighWaterMark: {
    __proto__: null,
    get() {
      return this._writableState && this._writableState.highWaterMark
    }
  },
  writableCorked: {
    __proto__: null,
    get() {
      return this._writableState ? this._writableState.corked : 0
    }
  },
  writableLength: {
    __proto__: null,
    get() {
      return this._writableState && this._writableState.length
    }
  },
  errored: {
    __proto__: null,
    enumerable: false,
    get() {
      return this._writableState ? this._writableState.errored : null
    }
  },
  writableAborted: {
    __proto__: null,
    enumerable: false,
    get: function () {
      return !!(
        this._writableState.writable !== false &&
        (this._writableState.destroyed || this._writableState.errored) &&
        !this._writableState.finished
      )
    }
  }
});
const destroy$1 = destroy_1.destroy;
Writable.prototype.destroy = function (err, cb) {
  const state = this._writableState;

  // Invoke pending callbacks.
  if (!state.destroyed && (state.bufferedIndex < state.buffered.length || state[kOnFinished].length)) {
    process.nextTick(errorBuffer, state);
  }
  destroy$1.call(this, err, cb);
  return this
};
Writable.prototype._undestroy = destroy_1.undestroy;
Writable.prototype._destroy = function (err, cb) {
  cb(err);
};
Writable.prototype[EE$2.captureRejectionSymbol] = function (err) {
  this.destroy(err);
};
let webStreamsAdapters$1;

// Lazy to avoid circular references
function lazyWebStreams$1() {
  if (webStreamsAdapters$1 === undefined) webStreamsAdapters$1 = {};
  return webStreamsAdapters$1
}
Writable.fromWeb = function (writableStream, options) {
  return lazyWebStreams$1().newStreamWritableFromWritableStream(writableStream, options)
};
Writable.toWeb = function (streamWritable) {
  return lazyWebStreams$1().newWritableStreamFromStreamWritable(streamWritable)
};

const {
  isReadable: isReadable$2,
  isWritable: isWritable$2,
  isIterable: isIterable$1,
  isNodeStream: isNodeStream$2,
  isReadableNodeStream: isReadableNodeStream$2,
  isWritableNodeStream: isWritableNodeStream$2,
  isDuplexNodeStream: isDuplexNodeStream$1,
  isReadableStream: isReadableStream$2,
  isWritableStream: isWritableStream$2
} = utils;

const {
  AbortError: AbortError$4,
  codes: { ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$6, ERR_INVALID_RETURN_VALUE }
} = errors;
const { destroyer: destroyer$1 } = destroy_1;



const { createDeferredPromise } = util;

const Blob = globalThis.Blob || require$$0.Blob;
const isBlob =
  typeof Blob !== 'undefined'
    ? function isBlob(b) {
        return b instanceof Blob
      }
    : function isBlob(b) {
        return false
      };
const AbortController$1 = globalThis.AbortController || browser.AbortController;
const { FunctionPrototypeCall } = primordials;

// This is needed for pre node 17.
class Duplexify extends duplex {
  constructor(options) {
    super(options);

    // https://github.com/nodejs/node/pull/34385

    if ((options === null || options === undefined ? undefined : options.readable) === false) {
      this._readableState.readable = false;
      this._readableState.ended = true;
      this._readableState.endEmitted = true;
    }
    if ((options === null || options === undefined ? undefined : options.writable) === false) {
      this._writableState.writable = false;
      this._writableState.ending = true;
      this._writableState.ended = true;
      this._writableState.finished = true;
    }
  }
}
var duplexify = function duplexify(body, name) {
  if (isDuplexNodeStream$1(body)) {
    return body
  }
  if (isReadableNodeStream$2(body)) {
    return _duplexify({
      readable: body
    })
  }
  if (isWritableNodeStream$2(body)) {
    return _duplexify({
      writable: body
    })
  }
  if (isNodeStream$2(body)) {
    return _duplexify({
      writable: false,
      readable: false
    })
  }
  if (isReadableStream$2(body)) {
    return _duplexify({
      readable: readable.fromWeb(body)
    })
  }
  if (isWritableStream$2(body)) {
    return _duplexify({
      writable: writable.fromWeb(body)
    })
  }
  if (typeof body === 'function') {
    const { value, write, final, destroy } = fromAsyncGen(body);
    if (isIterable$1(value)) {
      return from_1(Duplexify, value, {
        // TODO (ronag): highWaterMark?
        objectMode: true,
        write,
        final,
        destroy
      })
    }
    const then = value === null || value === undefined ? undefined : value.then;
    if (typeof then === 'function') {
      let d;
      const promise = FunctionPrototypeCall(
        then,
        value,
        (val) => {
          if (val != null) {
            throw new ERR_INVALID_RETURN_VALUE('nully', 'body', val)
          }
        },
        (err) => {
          destroyer$1(d, err);
        }
      );
      return (d = new Duplexify({
        // TODO (ronag): highWaterMark?
        objectMode: true,
        readable: false,
        write,
        final(cb) {
          final(async () => {
            try {
              await promise;
              process.nextTick(cb, null);
            } catch (err) {
              process.nextTick(cb, err);
            }
          });
        },
        destroy
      }))
    }
    throw new ERR_INVALID_RETURN_VALUE('Iterable, AsyncIterable or AsyncFunction', name, value)
  }
  if (isBlob(body)) {
    return duplexify(body.arrayBuffer())
  }
  if (isIterable$1(body)) {
    return from_1(Duplexify, body, {
      // TODO (ronag): highWaterMark?
      objectMode: true,
      writable: false
    })
  }
  if (
    isReadableStream$2(body === null || body === undefined ? undefined : body.readable) &&
    isWritableStream$2(body === null || body === undefined ? undefined : body.writable)
  ) {
    return Duplexify.fromWeb(body)
  }
  if (
    typeof (body === null || body === undefined ? undefined : body.writable) === 'object' ||
    typeof (body === null || body === undefined ? undefined : body.readable) === 'object'
  ) {
    const readable =
      body !== null && body !== undefined && body.readable
        ? isReadableNodeStream$2(body === null || body === undefined ? undefined : body.readable)
          ? body === null || body === undefined
            ? undefined
            : body.readable
          : duplexify(body.readable)
        : undefined;
    const writable =
      body !== null && body !== undefined && body.writable
        ? isWritableNodeStream$2(body === null || body === undefined ? undefined : body.writable)
          ? body === null || body === undefined
            ? undefined
            : body.writable
          : duplexify(body.writable)
        : undefined;
    return _duplexify({
      readable,
      writable
    })
  }
  const then = body === null || body === undefined ? undefined : body.then;
  if (typeof then === 'function') {
    let d;
    FunctionPrototypeCall(
      then,
      body,
      (val) => {
        if (val != null) {
          d.push(val);
        }
        d.push(null);
      },
      (err) => {
        destroyer$1(d, err);
      }
    );
    return (d = new Duplexify({
      objectMode: true,
      writable: false,
      read() {}
    }))
  }
  throw new ERR_INVALID_ARG_TYPE$6(
    name,
    [
      'Blob',
      'ReadableStream',
      'WritableStream',
      'Stream',
      'Iterable',
      'AsyncIterable',
      'Function',
      '{ readable, writable } pair',
      'Promise'
    ],
    body
  )
};
function fromAsyncGen(fn) {
  let { promise, resolve } = createDeferredPromise();
  const ac = new AbortController$1();
  const signal = ac.signal;
  const value = fn(
    (async function* () {
      while (true) {
        const _promise = promise;
        promise = null;
        const { chunk, done, cb } = await _promise;
        process.nextTick(cb);
        if (done) return
        if (signal.aborted)
          throw new AbortError$4(undefined, {
            cause: signal.reason
          })
        ;({ promise, resolve } = createDeferredPromise());
        yield chunk;
      }
    })(),
    {
      signal
    }
  );
  return {
    value,
    write(chunk, encoding, cb) {
      const _resolve = resolve;
      resolve = null;
      _resolve({
        chunk,
        done: false,
        cb
      });
    },
    final(cb) {
      const _resolve = resolve;
      resolve = null;
      _resolve({
        done: true,
        cb
      });
    },
    destroy(err, cb) {
      ac.abort();
      cb(err);
    }
  }
}
function _duplexify(pair) {
  const r = pair.readable && typeof pair.readable.read !== 'function' ? readable.wrap(pair.readable) : pair.readable;
  const w = pair.writable;
  let readable$1 = !!isReadable$2(r);
  let writable = !!isWritable$2(w);
  let ondrain;
  let onfinish;
  let onreadable;
  let onclose;
  let d;
  function onfinished(err) {
    const cb = onclose;
    onclose = null;
    if (cb) {
      cb(err);
    } else if (err) {
      d.destroy(err);
    }
  }

  // TODO(ronag): Avoid double buffering.
  // Implement Writable/Readable/Duplex traits.
  // See, https://github.com/nodejs/node/pull/33515.
  d = new Duplexify({
    // TODO (ronag): highWaterMark?
    readableObjectMode: !!(r !== null && r !== undefined && r.readableObjectMode),
    writableObjectMode: !!(w !== null && w !== undefined && w.writableObjectMode),
    readable: readable$1,
    writable
  });
  if (writable) {
    endOfStream(w, (err) => {
      writable = false;
      if (err) {
        destroyer$1(r, err);
      }
      onfinished(err);
    });
    d._write = function (chunk, encoding, callback) {
      if (w.write(chunk, encoding)) {
        callback();
      } else {
        ondrain = callback;
      }
    };
    d._final = function (callback) {
      w.end();
      onfinish = callback;
    };
    w.on('drain', function () {
      if (ondrain) {
        const cb = ondrain;
        ondrain = null;
        cb();
      }
    });
    w.on('finish', function () {
      if (onfinish) {
        const cb = onfinish;
        onfinish = null;
        cb();
      }
    });
  }
  if (readable$1) {
    endOfStream(r, (err) => {
      readable$1 = false;
      if (err) {
        destroyer$1(r, err);
      }
      onfinished(err);
    });
    r.on('readable', function () {
      if (onreadable) {
        const cb = onreadable;
        onreadable = null;
        cb();
      }
    });
    r.on('end', function () {
      d.push(null);
    });
    d._read = function () {
      while (true) {
        const buf = r.read();
        if (buf === null) {
          onreadable = d._read;
          return
        }
        if (!d.push(buf)) {
          return
        }
      }
    };
  }
  d._destroy = function (err, callback) {
    if (!err && onclose !== null) {
      err = new AbortError$4();
    }
    onreadable = null;
    ondrain = null;
    onfinish = null;
    if (onclose === null) {
      callback(err);
    } else {
      onclose = callback;
      destroyer$1(w, err);
      destroyer$1(r, err);
    }
  };
  return d
}

const {
  ObjectDefineProperties: ObjectDefineProperties$2,
  ObjectGetOwnPropertyDescriptor,
  ObjectKeys: ObjectKeys$1,
  ObjectSetPrototypeOf: ObjectSetPrototypeOf$3
} = primordials;
var duplex = Duplex;


ObjectSetPrototypeOf$3(Duplex.prototype, readable.prototype);
ObjectSetPrototypeOf$3(Duplex, readable);
{
  const keys = ObjectKeys$1(writable.prototype);
  // Allow the keys array to be GC'ed.
  for (let i = 0; i < keys.length; i++) {
    const method = keys[i];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = writable.prototype[method];
  }
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options)
  readable.call(this, options);
  writable.call(this, options);
  if (options) {
    this.allowHalfOpen = options.allowHalfOpen !== false;
    if (options.readable === false) {
      this._readableState.readable = false;
      this._readableState.ended = true;
      this._readableState.endEmitted = true;
    }
    if (options.writable === false) {
      this._writableState.writable = false;
      this._writableState.ending = true;
      this._writableState.ended = true;
      this._writableState.finished = true;
    }
  } else {
    this.allowHalfOpen = true;
  }
}
ObjectDefineProperties$2(Duplex.prototype, {
  writable: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writable')
  },
  writableHighWaterMark: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableHighWaterMark')
  },
  writableObjectMode: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableObjectMode')
  },
  writableBuffer: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableBuffer')
  },
  writableLength: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableLength')
  },
  writableFinished: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableFinished')
  },
  writableCorked: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableCorked')
  },
  writableEnded: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableEnded')
  },
  writableNeedDrain: {
    __proto__: null,
    ...ObjectGetOwnPropertyDescriptor(writable.prototype, 'writableNeedDrain')
  },
  destroyed: {
    __proto__: null,
    get() {
      if (this._readableState === undefined || this._writableState === undefined) {
        return false
      }
      return this._readableState.destroyed && this._writableState.destroyed
    },
    set(value) {
      // Backward compatibility, the user is explicitly
      // managing destroyed.
      if (this._readableState && this._writableState) {
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    }
  }
});
let webStreamsAdapters$2;

// Lazy to avoid circular references
function lazyWebStreams$2() {
  if (webStreamsAdapters$2 === undefined) webStreamsAdapters$2 = {};
  return webStreamsAdapters$2
}
Duplex.fromWeb = function (pair, options) {
  return lazyWebStreams$2().newStreamDuplexFromReadableWritablePair(pair, options)
};
Duplex.toWeb = function (duplex) {
  return lazyWebStreams$2().newReadableWritablePairFromDuplex(duplex)
};
let duplexify$1;
Duplex.from = function (body) {
  if (!duplexify$1) {
    duplexify$1 = duplexify;
  }
  return duplexify$1(body, 'body')
};

const { ObjectSetPrototypeOf: ObjectSetPrototypeOf$4, Symbol: Symbol$4 } = primordials;
var transform = Transform;
const { ERR_METHOD_NOT_IMPLEMENTED: ERR_METHOD_NOT_IMPLEMENTED$2 } = errors.codes;

const { getHighWaterMark: getHighWaterMark$3 } = state;
ObjectSetPrototypeOf$4(Transform.prototype, duplex.prototype);
ObjectSetPrototypeOf$4(Transform, duplex);
const kCallback = Symbol$4('kCallback');
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options)

  // TODO (ronag): This should preferably always be
  // applied but would be semver-major. Or even better;
  // make Transform a Readable with the Writable interface.
  const readableHighWaterMark = options ? getHighWaterMark$3(this, options, 'readableHighWaterMark', true) : null;
  if (readableHighWaterMark === 0) {
    // A Duplex will buffer both on the writable and readable side while
    // a Transform just wants to buffer hwm number of elements. To avoid
    // buffering twice we disable buffering on the writable side.
    options = {
      ...options,
      highWaterMark: null,
      readableHighWaterMark,
      // TODO (ronag): 0 is not optimal since we have
      // a "bug" where we check needDrain before calling _write and not after.
      // Refs: https://github.com/nodejs/node/pull/32887
      // Refs: https://github.com/nodejs/node/pull/35941
      writableHighWaterMark: options.writableHighWaterMark || 0
    };
  }
  duplex.call(this, options);

  // We have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;
  this[kCallback] = null;
  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  // Backwards compat. Some Transform streams incorrectly implement _final
  // instead of or in addition to _flush. By using 'prefinish' instead of
  // implementing _final we continue supporting this unfortunate use case.
  this.on('prefinish', prefinish$1);
}
function final(cb) {
  if (typeof this._flush === 'function' && !this.destroyed) {
    this._flush((er, data) => {
      if (er) {
        if (cb) {
          cb(er);
        } else {
          this.destroy(er);
        }
        return
      }
      if (data != null) {
        this.push(data);
      }
      this.push(null);
      if (cb) {
        cb();
      }
    });
  } else {
    this.push(null);
    if (cb) {
      cb();
    }
  }
}
function prefinish$1() {
  if (this._final !== final) {
    final.call(this);
  }
}
Transform.prototype._final = final;
Transform.prototype._transform = function (chunk, encoding, callback) {
  throw new ERR_METHOD_NOT_IMPLEMENTED$2('_transform()')
};
Transform.prototype._write = function (chunk, encoding, callback) {
  const rState = this._readableState;
  const wState = this._writableState;
  const length = rState.length;
  this._transform(chunk, encoding, (err, val) => {
    if (err) {
      callback(err);
      return
    }
    if (val != null) {
      this.push(val);
    }
    if (
      wState.ended ||
      // Backwards compat.
      length === rState.length ||
      // Backwards compat.
      rState.length < rState.highWaterMark
    ) {
      callback();
    } else {
      this[kCallback] = callback;
    }
  });
};
Transform.prototype._read = function () {
  if (this[kCallback]) {
    const callback = this[kCallback];
    this[kCallback] = null;
    callback();
  }
};

const { ObjectSetPrototypeOf: ObjectSetPrototypeOf$5 } = primordials;
var passthrough = PassThrough;

ObjectSetPrototypeOf$5(PassThrough.prototype, transform.prototype);
ObjectSetPrototypeOf$5(PassThrough, transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options)
  transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

const { ArrayIsArray: ArrayIsArray$2, Promise: Promise$3, SymbolAsyncIterator: SymbolAsyncIterator$3, SymbolDispose: SymbolDispose$1 } = primordials;

const { once: once$1 } = util;


const {
  aggregateTwoErrors: aggregateTwoErrors$3,
  codes: {
    ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$7,
    ERR_INVALID_RETURN_VALUE: ERR_INVALID_RETURN_VALUE$1,
    ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED: ERR_STREAM_DESTROYED$1,
    ERR_STREAM_PREMATURE_CLOSE: ERR_STREAM_PREMATURE_CLOSE$1
  },
  AbortError: AbortError$5
} = errors;
const { validateFunction: validateFunction$2, validateAbortSignal: validateAbortSignal$2 } = validators;
const {
  isIterable: isIterable$2,
  isReadable: isReadable$3,
  isReadableNodeStream: isReadableNodeStream$3,
  isNodeStream: isNodeStream$3,
  isTransformStream: isTransformStream$1,
  isWebStream: isWebStream$1,
  isReadableStream: isReadableStream$3,
  isReadableFinished: isReadableFinished$2
} = utils;
const AbortController$2 = globalThis.AbortController || browser.AbortController;
let PassThrough$1;
let Readable$1;
let addAbortListener$1;
function destroyer$2(stream, reading, writing) {
  let finished = false;
  stream.on('close', () => {
    finished = true;
  });
  const cleanup = endOfStream(
    stream,
    {
      readable: reading,
      writable: writing
    },
    (err) => {
      finished = !err;
    }
  );
  return {
    destroy: (err) => {
      if (finished) return
      finished = true;
      destroy_1.destroyer(stream, err || new ERR_STREAM_DESTROYED$1('pipe'));
    },
    cleanup
  }
}
function popCallback(streams) {
  // Streams should never be an empty array. It should always contain at least
  // a single stream. Therefore optimize for the average case instead of
  // checking for length === 0 as well.
  validateFunction$2(streams[streams.length - 1], 'streams[stream.length - 1]');
  return streams.pop()
}
function makeAsyncIterable(val) {
  if (isIterable$2(val)) {
    return val
  } else if (isReadableNodeStream$3(val)) {
    // Legacy streams are not Iterable.
    return fromReadable(val)
  }
  throw new ERR_INVALID_ARG_TYPE$7('val', ['Readable', 'Iterable', 'AsyncIterable'], val)
}
async function* fromReadable(val) {
  if (!Readable$1) {
    Readable$1 = readable;
  }
  yield* Readable$1.prototype[SymbolAsyncIterator$3].call(val);
}
async function pumpToNode(iterable, writable, finish, { end }) {
  let error;
  let onresolve = null;
  const resume = (err) => {
    if (err) {
      error = err;
    }
    if (onresolve) {
      const callback = onresolve;
      onresolve = null;
      callback();
    }
  };
  const wait = () =>
    new Promise$3((resolve, reject) => {
      if (error) {
        reject(error);
      } else {
        onresolve = () => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        };
      }
    });
  writable.on('drain', resume);
  const cleanup = endOfStream(
    writable,
    {
      readable: false
    },
    resume
  );
  try {
    if (writable.writableNeedDrain) {
      await wait();
    }
    for await (const chunk of iterable) {
      if (!writable.write(chunk)) {
        await wait();
      }
    }
    if (end) {
      writable.end();
      await wait();
    }
    finish();
  } catch (err) {
    finish(error !== err ? aggregateTwoErrors$3(error, err) : err);
  } finally {
    cleanup();
    writable.off('drain', resume);
  }
}
async function pumpToWeb(readable, writable, finish, { end }) {
  if (isTransformStream$1(writable)) {
    writable = writable.writable;
  }
  // https://streams.spec.whatwg.org/#example-manual-write-with-backpressure
  const writer = writable.getWriter();
  try {
    for await (const chunk of readable) {
      await writer.ready;
      writer.write(chunk).catch(() => {});
    }
    await writer.ready;
    if (end) {
      await writer.close();
    }
    finish();
  } catch (err) {
    try {
      await writer.abort(err);
      finish(err);
    } catch (err) {
      finish(err);
    }
  }
}
function pipeline(...streams) {
  return pipelineImpl(streams, once$1(popCallback(streams)))
}
function pipelineImpl(streams, callback, opts) {
  if (streams.length === 1 && ArrayIsArray$2(streams[0])) {
    streams = streams[0];
  }
  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams')
  }
  const ac = new AbortController$2();
  const signal = ac.signal;
  const outerSignal = opts === null || opts === undefined ? undefined : opts.signal;

  // Need to cleanup event listeners if last stream is readable
  // https://github.com/nodejs/node/issues/35452
  const lastStreamCleanup = [];
  validateAbortSignal$2(outerSignal, 'options.signal');
  function abort() {
    finishImpl(new AbortError$5());
  }
  addAbortListener$1 = addAbortListener$1 || util.addAbortListener;
  let disposable;
  if (outerSignal) {
    disposable = addAbortListener$1(outerSignal, abort);
  }
  let error;
  let value;
  const destroys = [];
  let finishCount = 0;
  function finish(err) {
    finishImpl(err, --finishCount === 0);
  }
  function finishImpl(err, final) {
    var _disposable;
    if (err && (!error || error.code === 'ERR_STREAM_PREMATURE_CLOSE')) {
      error = err;
    }
    if (!error && !final) {
      return
    }
    while (destroys.length) {
      destroys.shift()(error);
    }
(_disposable = disposable) === null || _disposable === undefined ? undefined : _disposable[SymbolDispose$1]();
    ac.abort();
    if (final) {
      if (!error) {
        lastStreamCleanup.forEach((fn) => fn());
      }
      process.nextTick(callback, error, value);
    }
  }
  let ret;
  for (let i = 0; i < streams.length; i++) {
    const stream = streams[i];
    const reading = i < streams.length - 1;
    const writing = i > 0;
    const end = reading || (opts === null || opts === undefined ? undefined : opts.end) !== false;
    const isLastStream = i === streams.length - 1;
    if (isNodeStream$3(stream)) {
      if (end) {
        const { destroy, cleanup } = destroyer$2(stream, reading, writing);
        destroys.push(destroy);
        if (isReadable$3(stream) && isLastStream) {
          lastStreamCleanup.push(cleanup);
        }
      }

      // Catch stream errors that occur after pipe/pump has completed.
      function onError(err) {
        if (err && err.name !== 'AbortError' && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
          finish(err);
        }
      }
      stream.on('error', onError);
      if (isReadable$3(stream) && isLastStream) {
        lastStreamCleanup.push(() => {
          stream.removeListener('error', onError);
        });
      }
    }
    if (i === 0) {
      if (typeof stream === 'function') {
        ret = stream({
          signal
        });
        if (!isIterable$2(ret)) {
          throw new ERR_INVALID_RETURN_VALUE$1('Iterable, AsyncIterable or Stream', 'source', ret)
        }
      } else if (isIterable$2(stream) || isReadableNodeStream$3(stream) || isTransformStream$1(stream)) {
        ret = stream;
      } else {
        ret = duplex.from(stream);
      }
    } else if (typeof stream === 'function') {
      if (isTransformStream$1(ret)) {
        var _ret;
        ret = makeAsyncIterable((_ret = ret) === null || _ret === undefined ? undefined : _ret.readable);
      } else {
        ret = makeAsyncIterable(ret);
      }
      ret = stream(ret, {
        signal
      });
      if (reading) {
        if (!isIterable$2(ret, true)) {
          throw new ERR_INVALID_RETURN_VALUE$1('AsyncIterable', `transform[${i - 1}]`, ret)
        }
      } else {
        var _ret2;
        if (!PassThrough$1) {
          PassThrough$1 = passthrough;
        }

        // If the last argument to pipeline is not a stream
        // we must create a proxy stream so that pipeline(...)
        // always returns a stream which can be further
        // composed through `.pipe(stream)`.

        const pt = new PassThrough$1({
          objectMode: true
        });

        // Handle Promises/A+ spec, `then` could be a getter that throws on
        // second use.
        const then = (_ret2 = ret) === null || _ret2 === undefined ? undefined : _ret2.then;
        if (typeof then === 'function') {
          finishCount++;
          then.call(
            ret,
            (val) => {
              value = val;
              if (val != null) {
                pt.write(val);
              }
              if (end) {
                pt.end();
              }
              process.nextTick(finish);
            },
            (err) => {
              pt.destroy(err);
              process.nextTick(finish, err);
            }
          );
        } else if (isIterable$2(ret, true)) {
          finishCount++;
          pumpToNode(ret, pt, finish, {
            end
          });
        } else if (isReadableStream$3(ret) || isTransformStream$1(ret)) {
          const toRead = ret.readable || ret;
          finishCount++;
          pumpToNode(toRead, pt, finish, {
            end
          });
        } else {
          throw new ERR_INVALID_RETURN_VALUE$1('AsyncIterable or Promise', 'destination', ret)
        }
        ret = pt;
        const { destroy, cleanup } = destroyer$2(ret, false, true);
        destroys.push(destroy);
        if (isLastStream) {
          lastStreamCleanup.push(cleanup);
        }
      }
    } else if (isNodeStream$3(stream)) {
      if (isReadableNodeStream$3(ret)) {
        finishCount += 2;
        const cleanup = pipe(ret, stream, finish, {
          end
        });
        if (isReadable$3(stream) && isLastStream) {
          lastStreamCleanup.push(cleanup);
        }
      } else if (isTransformStream$1(ret) || isReadableStream$3(ret)) {
        const toRead = ret.readable || ret;
        finishCount++;
        pumpToNode(toRead, stream, finish, {
          end
        });
      } else if (isIterable$2(ret)) {
        finishCount++;
        pumpToNode(ret, stream, finish, {
          end
        });
      } else {
        throw new ERR_INVALID_ARG_TYPE$7(
          'val',
          ['Readable', 'Iterable', 'AsyncIterable', 'ReadableStream', 'TransformStream'],
          ret
        )
      }
      ret = stream;
    } else if (isWebStream$1(stream)) {
      if (isReadableNodeStream$3(ret)) {
        finishCount++;
        pumpToWeb(makeAsyncIterable(ret), stream, finish, {
          end
        });
      } else if (isReadableStream$3(ret) || isIterable$2(ret)) {
        finishCount++;
        pumpToWeb(ret, stream, finish, {
          end
        });
      } else if (isTransformStream$1(ret)) {
        finishCount++;
        pumpToWeb(ret.readable, stream, finish, {
          end
        });
      } else {
        throw new ERR_INVALID_ARG_TYPE$7(
          'val',
          ['Readable', 'Iterable', 'AsyncIterable', 'ReadableStream', 'TransformStream'],
          ret
        )
      }
      ret = stream;
    } else {
      ret = duplex.from(stream);
    }
  }
  if (
    (signal !== null && signal !== undefined && signal.aborted) ||
    (outerSignal !== null && outerSignal !== undefined && outerSignal.aborted)
  ) {
    process.nextTick(abort);
  }
  return ret
}
function pipe(src, dst, finish, { end }) {
  let ended = false;
  dst.on('close', () => {
    if (!ended) {
      // Finish if the destination closes before the source has completed.
      finish(new ERR_STREAM_PREMATURE_CLOSE$1());
    }
  });
  src.pipe(dst, {
    end: false
  }); // If end is true we already will have a listener to end dst.

  if (end) {
    // Compat. Before node v10.12.0 stdio used to throw an error so
    // pipe() did/does not end() stdio destinations.
    // Now they allow it but "secretly" don't close the underlying fd.

    function endFn() {
      ended = true;
      dst.end();
    }
    if (isReadableFinished$2(src)) {
      // End the destination if the source has already ended.
      process.nextTick(endFn);
    } else {
      src.once('end', endFn);
    }
  } else {
    finish();
  }
  endOfStream(
    src,
    {
      readable: true,
      writable: false
    },
    (err) => {
      const rState = src._readableState;
      if (
        err &&
        err.code === 'ERR_STREAM_PREMATURE_CLOSE' &&
        rState &&
        rState.ended &&
        !rState.errored &&
        !rState.errorEmitted
      ) {
        // Some readable streams will emit 'close' before 'end'. However, since
        // this is on the readable side 'end' should still be emitted if the
        // stream has been ended and no error emitted. This should be allowed in
        // favor of backwards compatibility. Since the stream is piped to a
        // destination this should not result in any observable difference.
        // We don't need to check if this is a writable premature close since
        // eos will only fail with premature close on the reading side for
        // duplex streams.
        src.once('end', finish).once('error', finish);
      } else {
        finish(err);
      }
    }
  );
  return endOfStream(
    dst,
    {
      readable: false,
      writable: true
    },
    finish
  )
}
var pipeline_1 = {
  pipelineImpl,
  pipeline
};

const { pipeline: pipeline$1 } = pipeline_1;

const { destroyer: destroyer$3 } = destroy_1;
const {
  isNodeStream: isNodeStream$4,
  isReadable: isReadable$4,
  isWritable: isWritable$3,
  isWebStream: isWebStream$2,
  isTransformStream: isTransformStream$2,
  isWritableStream: isWritableStream$3,
  isReadableStream: isReadableStream$4
} = utils;
const {
  AbortError: AbortError$6,
  codes: { ERR_INVALID_ARG_VALUE: ERR_INVALID_ARG_VALUE$2, ERR_MISSING_ARGS: ERR_MISSING_ARGS$1 }
} = errors;

var compose = function compose(...streams) {
  if (streams.length === 0) {
    throw new ERR_MISSING_ARGS$1('streams')
  }
  if (streams.length === 1) {
    return duplex.from(streams[0])
  }
  const orgStreams = [...streams];
  if (typeof streams[0] === 'function') {
    streams[0] = duplex.from(streams[0]);
  }
  if (typeof streams[streams.length - 1] === 'function') {
    const idx = streams.length - 1;
    streams[idx] = duplex.from(streams[idx]);
  }
  for (let n = 0; n < streams.length; ++n) {
    if (!isNodeStream$4(streams[n]) && !isWebStream$2(streams[n])) {
      // TODO(ronag): Add checks for non streams.
      continue
    }
    if (
      n < streams.length - 1 &&
      !(isReadable$4(streams[n]) || isReadableStream$4(streams[n]) || isTransformStream$2(streams[n]))
    ) {
      throw new ERR_INVALID_ARG_VALUE$2(`streams[${n}]`, orgStreams[n], 'must be readable')
    }
    if (n > 0 && !(isWritable$3(streams[n]) || isWritableStream$3(streams[n]) || isTransformStream$2(streams[n]))) {
      throw new ERR_INVALID_ARG_VALUE$2(`streams[${n}]`, orgStreams[n], 'must be writable')
    }
  }
  let ondrain;
  let onfinish;
  let onreadable;
  let onclose;
  let d;
  function onfinished(err) {
    const cb = onclose;
    onclose = null;
    if (cb) {
      cb(err);
    } else if (err) {
      d.destroy(err);
    } else if (!readable && !writable) {
      d.destroy();
    }
  }
  const head = streams[0];
  const tail = pipeline$1(streams, onfinished);
  const writable = !!(isWritable$3(head) || isWritableStream$3(head) || isTransformStream$2(head));
  const readable = !!(isReadable$4(tail) || isReadableStream$4(tail) || isTransformStream$2(tail));

  // TODO(ronag): Avoid double buffering.
  // Implement Writable/Readable/Duplex traits.
  // See, https://github.com/nodejs/node/pull/33515.
  d = new duplex({
    // TODO (ronag): highWaterMark?
    writableObjectMode: !!(head !== null && head !== undefined && head.writableObjectMode),
    readableObjectMode: !!(tail !== null && tail !== undefined && tail.readableObjectMode),
    writable,
    readable
  });
  if (writable) {
    if (isNodeStream$4(head)) {
      d._write = function (chunk, encoding, callback) {
        if (head.write(chunk, encoding)) {
          callback();
        } else {
          ondrain = callback;
        }
      };
      d._final = function (callback) {
        head.end();
        onfinish = callback;
      };
      head.on('drain', function () {
        if (ondrain) {
          const cb = ondrain;
          ondrain = null;
          cb();
        }
      });
    } else if (isWebStream$2(head)) {
      const writable = isTransformStream$2(head) ? head.writable : head;
      const writer = writable.getWriter();
      d._write = async function (chunk, encoding, callback) {
        try {
          await writer.ready;
          writer.write(chunk).catch(() => {});
          callback();
        } catch (err) {
          callback(err);
        }
      };
      d._final = async function (callback) {
        try {
          await writer.ready;
          writer.close().catch(() => {});
          onfinish = callback;
        } catch (err) {
          callback(err);
        }
      };
    }
    const toRead = isTransformStream$2(tail) ? tail.readable : tail;
    endOfStream(toRead, () => {
      if (onfinish) {
        const cb = onfinish;
        onfinish = null;
        cb();
      }
    });
  }
  if (readable) {
    if (isNodeStream$4(tail)) {
      tail.on('readable', function () {
        if (onreadable) {
          const cb = onreadable;
          onreadable = null;
          cb();
        }
      });
      tail.on('end', function () {
        d.push(null);
      });
      d._read = function () {
        while (true) {
          const buf = tail.read();
          if (buf === null) {
            onreadable = d._read;
            return
          }
          if (!d.push(buf)) {
            return
          }
        }
      };
    } else if (isWebStream$2(tail)) {
      const readable = isTransformStream$2(tail) ? tail.readable : tail;
      const reader = readable.getReader();
      d._read = async function () {
        while (true) {
          try {
            const { value, done } = await reader.read();
            if (!d.push(value)) {
              return
            }
            if (done) {
              d.push(null);
              return
            }
          } catch {
            return
          }
        }
      };
    }
  }
  d._destroy = function (err, callback) {
    if (!err && onclose !== null) {
      err = new AbortError$6();
    }
    onreadable = null;
    ondrain = null;
    onfinish = null;
    if (onclose === null) {
      callback(err);
    } else {
      onclose = callback;
      if (isNodeStream$4(tail)) {
        destroyer$3(tail, err);
      }
    }
  };
  return d
};

const AbortController$3 = globalThis.AbortController || browser.AbortController;
const {
  codes: { ERR_INVALID_ARG_VALUE: ERR_INVALID_ARG_VALUE$3, ERR_INVALID_ARG_TYPE: ERR_INVALID_ARG_TYPE$8, ERR_MISSING_ARGS: ERR_MISSING_ARGS$2, ERR_OUT_OF_RANGE: ERR_OUT_OF_RANGE$2 },
  AbortError: AbortError$7
} = errors;
const { validateAbortSignal: validateAbortSignal$3, validateInteger: validateInteger$2, validateObject: validateObject$3 } = validators;
const kWeakHandler = primordials.Symbol('kWeak');
const kResistStopPropagation = primordials.Symbol('kResistStopPropagation');
const { finished: finished$1 } = endOfStream;

const { addAbortSignalNoValidate } = addAbortSignal;
const { isWritable: isWritable$4, isNodeStream: isNodeStream$5 } = utils;
const { deprecate } = util;
const {
  ArrayPrototypePush,
  Boolean: Boolean$1,
  MathFloor: MathFloor$1,
  Number: Number$1,
  NumberIsNaN: NumberIsNaN$2,
  Promise: Promise$4,
  PromiseReject,
  PromiseResolve,
  PromisePrototypeThen: PromisePrototypeThen$2,
  Symbol: Symbol$5
} = primordials;
const kEmpty = Symbol$5('kEmpty');
const kEof = Symbol$5('kEof');
function compose$1(stream, options) {
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  if (isNodeStream$5(stream) && !isWritable$4(stream)) {
    throw new ERR_INVALID_ARG_VALUE$3('stream', stream, 'must be writable')
  }
  const composedStream = compose(this, stream);
  if (options !== null && options !== undefined && options.signal) {
    // Not validating as we already validated before
    addAbortSignalNoValidate(options.signal, composedStream);
  }
  return composedStream
}
function map(fn, options) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$8('fn', ['Function', 'AsyncFunction'], fn)
  }
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  let concurrency = 1;
  if ((options === null || options === undefined ? undefined : options.concurrency) != null) {
    concurrency = MathFloor$1(options.concurrency);
  }
  let highWaterMark = concurrency - 1;
  if ((options === null || options === undefined ? undefined : options.highWaterMark) != null) {
    highWaterMark = MathFloor$1(options.highWaterMark);
  }
  validateInteger$2(concurrency, 'options.concurrency', 1);
  validateInteger$2(highWaterMark, 'options.highWaterMark', 0);
  highWaterMark += concurrency;
  return async function* map() {
    const signal = util.AbortSignalAny(
      [options === null || options === undefined ? undefined : options.signal].filter(Boolean$1)
    );
    const stream = this;
    const queue = [];
    const signalOpt = {
      signal
    };
    let next;
    let resume;
    let done = false;
    let cnt = 0;
    function onCatch() {
      done = true;
      afterItemProcessed();
    }
    function afterItemProcessed() {
      cnt -= 1;
      maybeResume();
    }
    function maybeResume() {
      if (resume && !done && cnt < concurrency && queue.length < highWaterMark) {
        resume();
        resume = null;
      }
    }
    async function pump() {
      try {
        for await (let val of stream) {
          if (done) {
            return
          }
          if (signal.aborted) {
            throw new AbortError$7()
          }
          try {
            val = fn(val, signalOpt);
            if (val === kEmpty) {
              continue
            }
            val = PromiseResolve(val);
          } catch (err) {
            val = PromiseReject(err);
          }
          cnt += 1;
          PromisePrototypeThen$2(val, afterItemProcessed, onCatch);
          queue.push(val);
          if (next) {
            next();
            next = null;
          }
          if (!done && (queue.length >= highWaterMark || cnt >= concurrency)) {
            await new Promise$4((resolve) => {
              resume = resolve;
            });
          }
        }
        queue.push(kEof);
      } catch (err) {
        const val = PromiseReject(err);
        PromisePrototypeThen$2(val, afterItemProcessed, onCatch);
        queue.push(val);
      } finally {
        done = true;
        if (next) {
          next();
          next = null;
        }
      }
    }
    pump();
    try {
      while (true) {
        while (queue.length > 0) {
          const val = await queue[0];
          if (val === kEof) {
            return
          }
          if (signal.aborted) {
            throw new AbortError$7()
          }
          if (val !== kEmpty) {
            yield val;
          }
          queue.shift();
          maybeResume();
        }
        await new Promise$4((resolve) => {
          next = resolve;
        });
      }
    } finally {
      done = true;
      if (resume) {
        resume();
        resume = null;
      }
    }
  }.call(this)
}
function asIndexedPairs(options = undefined) {
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  return async function* asIndexedPairs() {
    let index = 0;
    for await (const val of this) {
      var _options$signal;
      if (
        options !== null &&
        options !== undefined &&
        (_options$signal = options.signal) !== null &&
        _options$signal !== undefined &&
        _options$signal.aborted
      ) {
        throw new AbortError$7({
          cause: options.signal.reason
        })
      }
      yield [index++, val];
    }
  }.call(this)
}
async function some(fn, options = undefined) {
  for await (const unused of filter.call(this, fn, options)) {
    return true
  }
  return false
}
async function every(fn, options = undefined) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$8('fn', ['Function', 'AsyncFunction'], fn)
  }
  // https://en.wikipedia.org/wiki/De_Morgan%27s_laws
  return !(await some.call(
    this,
    async (...args) => {
      return !(await fn(...args))
    },
    options
  ))
}
async function find(fn, options) {
  for await (const result of filter.call(this, fn, options)) {
    return result
  }
  return undefined
}
async function forEach(fn, options) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$8('fn', ['Function', 'AsyncFunction'], fn)
  }
  async function forEachFn(value, options) {
    await fn(value, options);
    return kEmpty
  }
  // eslint-disable-next-line no-unused-vars
  for await (const unused of map.call(this, forEachFn, options));
}
function filter(fn, options) {
  if (typeof fn !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$8('fn', ['Function', 'AsyncFunction'], fn)
  }
  async function filterFn(value, options) {
    if (await fn(value, options)) {
      return value
    }
    return kEmpty
  }
  return map.call(this, filterFn, options)
}

// Specific to provide better error to reduce since the argument is only
// missing if the stream has no items in it - but the code is still appropriate
class ReduceAwareErrMissingArgs extends ERR_MISSING_ARGS$2 {
  constructor() {
    super('reduce');
    this.message = 'Reduce of an empty stream requires an initial value';
  }
}
async function reduce(reducer, initialValue, options) {
  var _options$signal2;
  if (typeof reducer !== 'function') {
    throw new ERR_INVALID_ARG_TYPE$8('reducer', ['Function', 'AsyncFunction'], reducer)
  }
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  let hasInitialValue = arguments.length > 1;
  if (
    options !== null &&
    options !== undefined &&
    (_options$signal2 = options.signal) !== null &&
    _options$signal2 !== undefined &&
    _options$signal2.aborted
  ) {
    const err = new AbortError$7(undefined, {
      cause: options.signal.reason
    });
    this.once('error', () => {}); // The error is already propagated
    await finished$1(this.destroy(err));
    throw err
  }
  const ac = new AbortController$3();
  const signal = ac.signal;
  if (options !== null && options !== undefined && options.signal) {
    const opts = {
      once: true,
      [kWeakHandler]: this,
      [kResistStopPropagation]: true
    };
    options.signal.addEventListener('abort', () => ac.abort(), opts);
  }
  let gotAnyItemFromStream = false;
  try {
    for await (const value of this) {
      var _options$signal3;
      gotAnyItemFromStream = true;
      if (
        options !== null &&
        options !== undefined &&
        (_options$signal3 = options.signal) !== null &&
        _options$signal3 !== undefined &&
        _options$signal3.aborted
      ) {
        throw new AbortError$7()
      }
      if (!hasInitialValue) {
        initialValue = value;
        hasInitialValue = true;
      } else {
        initialValue = await reducer(initialValue, value, {
          signal
        });
      }
    }
    if (!gotAnyItemFromStream && !hasInitialValue) {
      throw new ReduceAwareErrMissingArgs()
    }
  } finally {
    ac.abort();
  }
  return initialValue
}
async function toArray(options) {
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  const result = [];
  for await (const val of this) {
    var _options$signal4;
    if (
      options !== null &&
      options !== undefined &&
      (_options$signal4 = options.signal) !== null &&
      _options$signal4 !== undefined &&
      _options$signal4.aborted
    ) {
      throw new AbortError$7(undefined, {
        cause: options.signal.reason
      })
    }
    ArrayPrototypePush(result, val);
  }
  return result
}
function flatMap(fn, options) {
  const values = map.call(this, fn, options);
  return async function* flatMap() {
    for await (const val of values) {
      yield* val;
    }
  }.call(this)
}
function toIntegerOrInfinity(number) {
  // We coerce here to align with the spec
  // https://github.com/tc39/proposal-iterator-helpers/issues/169
  number = Number$1(number);
  if (NumberIsNaN$2(number)) {
    return 0
  }
  if (number < 0) {
    throw new ERR_OUT_OF_RANGE$2('number', '>= 0', number)
  }
  return number
}
function drop(number, options = undefined) {
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  number = toIntegerOrInfinity(number);
  return async function* drop() {
    var _options$signal5;
    if (
      options !== null &&
      options !== undefined &&
      (_options$signal5 = options.signal) !== null &&
      _options$signal5 !== undefined &&
      _options$signal5.aborted
    ) {
      throw new AbortError$7()
    }
    for await (const val of this) {
      var _options$signal6;
      if (
        options !== null &&
        options !== undefined &&
        (_options$signal6 = options.signal) !== null &&
        _options$signal6 !== undefined &&
        _options$signal6.aborted
      ) {
        throw new AbortError$7()
      }
      if (number-- <= 0) {
        yield val;
      }
    }
  }.call(this)
}
function take(number, options = undefined) {
  if (options != null) {
    validateObject$3(options, 'options');
  }
  if ((options === null || options === undefined ? undefined : options.signal) != null) {
    validateAbortSignal$3(options.signal, 'options.signal');
  }
  number = toIntegerOrInfinity(number);
  return async function* take() {
    var _options$signal7;
    if (
      options !== null &&
      options !== undefined &&
      (_options$signal7 = options.signal) !== null &&
      _options$signal7 !== undefined &&
      _options$signal7.aborted
    ) {
      throw new AbortError$7()
    }
    for await (const val of this) {
      var _options$signal8;
      if (
        options !== null &&
        options !== undefined &&
        (_options$signal8 = options.signal) !== null &&
        _options$signal8 !== undefined &&
        _options$signal8.aborted
      ) {
        throw new AbortError$7()
      }
      if (number-- > 0) {
        yield val;
      }

      // Don't get another item from iterator in case we reached the end
      if (number <= 0) {
        return
      }
    }
  }.call(this)
}
var streamReturningOperators = {
  asIndexedPairs: deprecate(asIndexedPairs, 'readable.asIndexedPairs will be removed in a future version.'),
  drop,
  filter,
  flatMap,
  map,
  take,
  compose: compose$1
};
var promiseReturningOperators = {
  every,
  forEach,
  reduce,
  toArray,
  some,
  find
};

var operators = {
	streamReturningOperators: streamReturningOperators,
	promiseReturningOperators: promiseReturningOperators
};

const { ArrayPrototypePop, Promise: Promise$5 } = primordials;
const { isIterable: isIterable$3, isNodeStream: isNodeStream$6, isWebStream: isWebStream$3 } = utils;
const { pipelineImpl: pl } = pipeline_1;
const { finished: finished$2 } = endOfStream;

function pipeline$2(...streams) {
  return new Promise$5((resolve, reject) => {
    let signal;
    let end;
    const lastArg = streams[streams.length - 1];
    if (
      lastArg &&
      typeof lastArg === 'object' &&
      !isNodeStream$6(lastArg) &&
      !isIterable$3(lastArg) &&
      !isWebStream$3(lastArg)
    ) {
      const options = ArrayPrototypePop(streams);
      signal = options.signal;
      end = options.end;
    }
    pl(
      streams,
      (err, value) => {
        if (err) {
          reject(err);
        } else {
          resolve(value);
        }
      },
      {
        signal,
        end
      }
    );
  })
}
var promises = {
  finished: finished$2,
  pipeline: pipeline$2
};

var stream = createCommonjsModule(function (module) {
/* replacement start */

const { Buffer } = require$$0

/* replacement end */
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

;const { ObjectDefineProperty, ObjectKeys, ReflectApply } = primordials;
const {
  promisify: { custom: customPromisify }
} = util;
const { streamReturningOperators, promiseReturningOperators } = operators;
const {
  codes: { ERR_ILLEGAL_CONSTRUCTOR }
} = errors;

const { setDefaultHighWaterMark, getDefaultHighWaterMark } = state;
const { pipeline } = pipeline_1;
const { destroyer } = destroy_1;


const Stream = (module.exports = legacy.Stream);
Stream.isDestroyed = utils.isDestroyed;
Stream.isDisturbed = utils.isDisturbed;
Stream.isErrored = utils.isErrored;
Stream.isReadable = utils.isReadable;
Stream.isWritable = utils.isWritable;
Stream.Readable = readable;
for (const key of ObjectKeys(streamReturningOperators)) {
  const op = streamReturningOperators[key];
  function fn(...args) {
    if (new.target) {
      throw ERR_ILLEGAL_CONSTRUCTOR()
    }
    return Stream.Readable.from(ReflectApply(op, this, args))
  }
  ObjectDefineProperty(fn, 'name', {
    __proto__: null,
    value: op.name
  });
  ObjectDefineProperty(fn, 'length', {
    __proto__: null,
    value: op.length
  });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true
  });
}
for (const key of ObjectKeys(promiseReturningOperators)) {
  const op = promiseReturningOperators[key];
  function fn(...args) {
    if (new.target) {
      throw ERR_ILLEGAL_CONSTRUCTOR()
    }
    return ReflectApply(op, this, args)
  }
  ObjectDefineProperty(fn, 'name', {
    __proto__: null,
    value: op.name
  });
  ObjectDefineProperty(fn, 'length', {
    __proto__: null,
    value: op.length
  });
  ObjectDefineProperty(Stream.Readable.prototype, key, {
    __proto__: null,
    value: fn,
    enumerable: false,
    configurable: true,
    writable: true
  });
}
Stream.Writable = writable;
Stream.Duplex = duplex;
Stream.Transform = transform;
Stream.PassThrough = passthrough;
Stream.pipeline = pipeline;
const { addAbortSignal: addAbortSignal$1 } = addAbortSignal;
Stream.addAbortSignal = addAbortSignal$1;
Stream.finished = endOfStream;
Stream.destroy = destroyer;
Stream.compose = compose;
Stream.setDefaultHighWaterMark = setDefaultHighWaterMark;
Stream.getDefaultHighWaterMark = getDefaultHighWaterMark;
ObjectDefineProperty(Stream, 'promises', {
  __proto__: null,
  configurable: true,
  enumerable: true,
  get() {
    return promises
  }
});
ObjectDefineProperty(pipeline, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.pipeline
  }
});
ObjectDefineProperty(endOfStream, customPromisify, {
  __proto__: null,
  enumerable: true,
  get() {
    return promises.finished
  }
});

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;
Stream._isUint8Array = function isUint8Array(value) {
  return value instanceof Uint8Array
};
Stream._uint8ArrayToBuffer = function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)
};
});

var browser$1 = createCommonjsModule(function (module) {



const originalDestroy = stream.Readable.destroy;
module.exports = stream.Readable;

// Explicit export naming is needed for ESM
module.exports._uint8ArrayToBuffer = stream._uint8ArrayToBuffer;
module.exports._isUint8Array = stream._isUint8Array;
module.exports.isDisturbed = stream.isDisturbed;
module.exports.isErrored = stream.isErrored;
module.exports.isReadable = stream.isReadable;
module.exports.Readable = stream.Readable;
module.exports.Writable = stream.Writable;
module.exports.Duplex = stream.Duplex;
module.exports.Transform = stream.Transform;
module.exports.PassThrough = stream.PassThrough;
module.exports.addAbortSignal = stream.addAbortSignal;
module.exports.finished = stream.finished;
module.exports.destroy = stream.destroy;
module.exports.destroy = originalDestroy;
module.exports.pipeline = stream.pipeline;
module.exports.compose = stream.compose;
Object.defineProperty(stream, 'promises', {
  configurable: true,
  enumerable: true,
  get() {
    return promises
  }
});
module.exports.Stream = stream.Stream;

// Allow default importing
module.exports.default = module.exports;
});


module.exports = {
  b:browser$1
}