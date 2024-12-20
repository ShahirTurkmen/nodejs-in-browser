"use strict";
var ZenFS = (() => {
  var wd = Object.create;
  var Ni = Object.defineProperty;
  var Sd = Object.getOwnPropertyDescriptor;
  var _d = Object.getOwnPropertyNames;
  var Ed = Object.getPrototypeOf,
    xd = Object.prototype.hasOwnProperty;
  var ia = (t, e) => ((e = Symbol[t]) ? e : Symbol.for("Symbol." + t)),
    na = (t) => {
      throw TypeError(t);
    };
  var o = (t, e) => Ni(t, "name", { value: e, configurable: !0 });
  var O = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
    Fn = (t, e) => {
      for (var i in e) Ni(t, i, { get: e[i], enumerable: !0 });
    },
    ra = (t, e, i, n) => {
      if ((e && typeof e == "object") || typeof e == "function")
        for (let r of _d(e))
          !xd.call(t, r) &&
            r !== i &&
            Ni(t, r, {
              get: () => e[r],
              enumerable: !(n = Sd(e, r)) || n.enumerable,
            });
      return t;
    };
  var Li = (t, e, i) => (
      (i = t != null ? wd(Ed(t)) : {}),
      ra(
        e || !t || !t.__esModule
          ? Ni(i, "default", { value: t, enumerable: !0 })
          : i,
        t
      )
    ),
    kd = (t) => ra(Ni({}, "__esModule", { value: !0 }), t);
  var w = (t, e, i) => {
      if (e != null) {
        typeof e != "object" && typeof e != "function" && na("Object expected");
        var n;
        i && (n = e[ia("asyncDispose")]),
          n === void 0 && (n = e[ia("dispose")]),
          typeof n != "function" && na("Object not disposable"),
          t.push([i, n, e]);
      } else i && t.push([i]);
      return e;
    },
    _ = (t, e, i) => {
      var n =
          typeof SuppressedError == "function"
            ? SuppressedError
            : function (a, c, l, f) {
                return (
                  (f = Error(l)),
                  (f.name = "SuppressedError"),
                  (f.error = a),
                  (f.suppressed = c),
                  f
                );
              },
        r = (a) =>
          (e = i
            ? new n(a, e, "An error was suppressed during disposal")
            : ((i = !0), a)),
        s = (a) => {
          for (; (a = t.pop()); )
            try {
              var c = a[1] && a[1].call(a[2]);
              if (a[0]) return Promise.resolve(c).then(s, (l) => (r(l), s()));
            } catch (l) {
              r(l);
            }
          if (i) throw e;
        };
      return s();
    };
  var la = O((Pn) => {
    "use strict";
    Pn.byteLength = Od;
    Pn.toByteArray = Nd;
    Pn.fromByteArray = Bd;
    var We = [],
      ke = [],
      Pd = typeof Uint8Array < "u" ? Uint8Array : Array,
      zr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (Lt = 0, aa = zr.length; Lt < aa; ++Lt)
      (We[Lt] = zr[Lt]), (ke[zr.charCodeAt(Lt)] = Lt);
    var Lt, aa;
    ke[45] = 62;
    ke[95] = 63;
    function ca(t) {
      var e = t.length;
      if (e % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      var i = t.indexOf("=");
      i === -1 && (i = e);
      var n = i === e ? 0 : 4 - (i % 4);
      return [i, n];
    }
    o(ca, "getLens");
    function Od(t) {
      var e = ca(t),
        i = e[0],
        n = e[1];
      return ((i + n) * 3) / 4 - n;
    }
    o(Od, "byteLength");
    function Rd(t, e, i) {
      return ((e + i) * 3) / 4 - i;
    }
    o(Rd, "_byteLength");
    function Nd(t) {
      var e,
        i = ca(t),
        n = i[0],
        r = i[1],
        s = new Pd(Rd(t, n, r)),
        a = 0,
        c = r > 0 ? n - 4 : n,
        l;
      for (l = 0; l < c; l += 4)
        (e =
          (ke[t.charCodeAt(l)] << 18) |
          (ke[t.charCodeAt(l + 1)] << 12) |
          (ke[t.charCodeAt(l + 2)] << 6) |
          ke[t.charCodeAt(l + 3)]),
          (s[a++] = (e >> 16) & 255),
          (s[a++] = (e >> 8) & 255),
          (s[a++] = e & 255);
      return (
        r === 2 &&
          ((e = (ke[t.charCodeAt(l)] << 2) | (ke[t.charCodeAt(l + 1)] >> 4)),
          (s[a++] = e & 255)),
        r === 1 &&
          ((e =
            (ke[t.charCodeAt(l)] << 10) |
            (ke[t.charCodeAt(l + 1)] << 4) |
            (ke[t.charCodeAt(l + 2)] >> 2)),
          (s[a++] = (e >> 8) & 255),
          (s[a++] = e & 255)),
        s
      );
    }
    o(Nd, "toByteArray");
    function Ld(t) {
      return (
        We[(t >> 18) & 63] + We[(t >> 12) & 63] + We[(t >> 6) & 63] + We[t & 63]
      );
    }
    o(Ld, "tripletToBase64");
    function Cd(t, e, i) {
      for (var n, r = [], s = e; s < i; s += 3)
        (n =
          ((t[s] << 16) & 16711680) +
          ((t[s + 1] << 8) & 65280) +
          (t[s + 2] & 255)),
          r.push(Ld(n));
      return r.join("");
    }
    o(Cd, "encodeChunk");
    function Bd(t) {
      for (
        var e, i = t.length, n = i % 3, r = [], s = 16383, a = 0, c = i - n;
        a < c;
        a += s
      )
        r.push(Cd(t, a, a + s > c ? c : a + s));
      return (
        n === 1
          ? ((e = t[i - 1]), r.push(We[e >> 2] + We[(e << 4) & 63] + "=="))
          : n === 2 &&
            ((e = (t[i - 2] << 8) + t[i - 1]),
            r.push(We[e >> 10] + We[(e >> 4) & 63] + We[(e << 2) & 63] + "=")),
        r.join("")
      );
    }
    o(Bd, "fromByteArray");
  });
  var fa = O((Vr) => {
    Vr.read = function (t, e, i, n, r) {
      var s,
        a,
        c = r * 8 - n - 1,
        l = (1 << c) - 1,
        f = l >> 1,
        d = -7,
        h = i ? r - 1 : 0,
        b = i ? -1 : 1,
        y = t[e + h];
      for (
        h += b, s = y & ((1 << -d) - 1), y >>= -d, d += c;
        d > 0;
        s = s * 256 + t[e + h], h += b, d -= 8
      );
      for (
        a = s & ((1 << -d) - 1), s >>= -d, d += n;
        d > 0;
        a = a * 256 + t[e + h], h += b, d -= 8
      );
      if (s === 0) s = 1 - f;
      else {
        if (s === l) return a ? NaN : (y ? -1 : 1) * (1 / 0);
        (a = a + Math.pow(2, n)), (s = s - f);
      }
      return (y ? -1 : 1) * a * Math.pow(2, s - n);
    };
    Vr.write = function (t, e, i, n, r, s) {
      var a,
        c,
        l,
        f = s * 8 - r - 1,
        d = (1 << f) - 1,
        h = d >> 1,
        b = r === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        y = n ? 0 : s - 1,
        S = n ? 1 : -1,
        g = e < 0 || (e === 0 && 1 / e < 0) ? 1 : 0;
      for (
        e = Math.abs(e),
          isNaN(e) || e === 1 / 0
            ? ((c = isNaN(e) ? 1 : 0), (a = d))
            : ((a = Math.floor(Math.log(e) / Math.LN2)),
              e * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
              a + h >= 1 ? (e += b / l) : (e += b * Math.pow(2, 1 - h)),
              e * l >= 2 && (a++, (l /= 2)),
              a + h >= d
                ? ((c = 0), (a = d))
                : a + h >= 1
                ? ((c = (e * l - 1) * Math.pow(2, r)), (a = a + h))
                : ((c = e * Math.pow(2, h - 1) * Math.pow(2, r)), (a = 0)));
        r >= 8;
        t[i + y] = c & 255, y += S, c /= 256, r -= 8
      );
      for (
        a = (a << r) | c, f += r;
        f > 0;
        t[i + y] = a & 255, y += S, a /= 256, f -= 8
      );
      t[i + y - S] |= g * 128;
    };
  });
  var ve = O((si) => {
    "use strict";
    var Hr = la(),
      ni = fa(),
      ua =
        typeof Symbol == "function" && typeof Symbol.for == "function"
          ? Symbol.for("nodejs.util.inspect.custom")
          : null;
    si.Buffer = m;
    si.SlowBuffer = qd;
    si.INSPECT_MAX_BYTES = 50;
    var On = 2147483647;
    si.kMaxLength = On;
    m.TYPED_ARRAY_SUPPORT = Dd();
    !m.TYPED_ARRAY_SUPPORT &&
      typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(
        "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
      );
    function Dd() {
      try {
        let t = new Uint8Array(1),
          e = {
            foo: o(function () {
              return 42;
            }, "foo"),
          };
        return (
          Object.setPrototypeOf(e, Uint8Array.prototype),
          Object.setPrototypeOf(t, e),
          t.foo() === 42
        );
      } catch {
        return !1;
      }
    }
    o(Dd, "typedArraySupport");
    Object.defineProperty(m.prototype, "parent", {
      enumerable: !0,
      get: o(function () {
        if (m.isBuffer(this)) return this.buffer;
      }, "get"),
    });
    Object.defineProperty(m.prototype, "offset", {
      enumerable: !0,
      get: o(function () {
        if (m.isBuffer(this)) return this.byteOffset;
      }, "get"),
    });
    function st(t) {
      if (t > On)
        throw new RangeError(
          'The value "' + t + '" is invalid for option "size"'
        );
      let e = new Uint8Array(t);
      return Object.setPrototypeOf(e, m.prototype), e;
    }
    o(st, "createBuffer");
    function m(t, e, i) {
      if (typeof t == "number") {
        if (typeof e == "string")
          throw new TypeError(
            'The "string" argument must be of type string. Received type number'
          );
        return Xr(t);
      }
      return ya(t, e, i);
    }
    o(m, "Buffer");
    m.poolSize = 8192;
    function ya(t, e, i) {
      if (typeof t == "string") return Wd(t, e);
      if (ArrayBuffer.isView(t)) return Ud(t);
      if (t == null)
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof t
        );
      if (
        Ue(t, ArrayBuffer) ||
        (t && Ue(t.buffer, ArrayBuffer)) ||
        (typeof SharedArrayBuffer < "u" &&
          (Ue(t, SharedArrayBuffer) || (t && Ue(t.buffer, SharedArrayBuffer))))
      )
        return Gr(t, e, i);
      if (typeof t == "number")
        throw new TypeError(
          'The "value" argument must not be of type number. Received type number'
        );
      let n = t.valueOf && t.valueOf();
      if (n != null && n !== t) return m.from(n, e, i);
      let r = jd(t);
      if (r) return r;
      if (
        typeof Symbol < "u" &&
        Symbol.toPrimitive != null &&
        typeof t[Symbol.toPrimitive] == "function"
      )
        return m.from(t[Symbol.toPrimitive]("string"), e, i);
      throw new TypeError(
        "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
          typeof t
      );
    }
    o(ya, "from");
    m.from = function (t, e, i) {
      return ya(t, e, i);
    };
    Object.setPrototypeOf(m.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(m, Uint8Array);
    function ma(t) {
      if (typeof t != "number")
        throw new TypeError('"size" argument must be of type number');
      if (t < 0)
        throw new RangeError(
          'The value "' + t + '" is invalid for option "size"'
        );
    }
    o(ma, "assertSize");
    function Md(t, e, i) {
      return (
        ma(t),
        t <= 0
          ? st(t)
          : e !== void 0
          ? typeof i == "string"
            ? st(t).fill(e, i)
            : st(t).fill(e)
          : st(t)
      );
    }
    o(Md, "alloc");
    m.alloc = function (t, e, i) {
      return Md(t, e, i);
    };
    function Xr(t) {
      return ma(t), st(t < 0 ? 0 : Jr(t) | 0);
    }
    o(Xr, "allocUnsafe");
    m.allocUnsafe = function (t) {
      return Xr(t);
    };
    m.allocUnsafeSlow = function (t) {
      return Xr(t);
    };
    function Wd(t, e) {
      if (
        ((typeof e != "string" || e === "") && (e = "utf8"), !m.isEncoding(e))
      )
        throw new TypeError("Unknown encoding: " + e);
      let i = ba(t, e) | 0,
        n = st(i),
        r = n.write(t, e);
      return r !== i && (n = n.slice(0, r)), n;
    }
    o(Wd, "fromString");
    function Kr(t) {
      let e = t.length < 0 ? 0 : Jr(t.length) | 0,
        i = st(e);
      for (let n = 0; n < e; n += 1) i[n] = t[n] & 255;
      return i;
    }
    o(Kr, "fromArrayLike");
    function Ud(t) {
      if (Ue(t, Uint8Array)) {
        let e = new Uint8Array(t);
        return Gr(e.buffer, e.byteOffset, e.byteLength);
      }
      return Kr(t);
    }
    o(Ud, "fromArrayView");
    function Gr(t, e, i) {
      if (e < 0 || t.byteLength < e)
        throw new RangeError('"offset" is outside of buffer bounds');
      if (t.byteLength < e + (i || 0))
        throw new RangeError('"length" is outside of buffer bounds');
      let n;
      return (
        e === void 0 && i === void 0
          ? (n = new Uint8Array(t))
          : i === void 0
          ? (n = new Uint8Array(t, e))
          : (n = new Uint8Array(t, e, i)),
        Object.setPrototypeOf(n, m.prototype),
        n
      );
    }
    o(Gr, "fromArrayBuffer");
    function jd(t) {
      if (m.isBuffer(t)) {
        let e = Jr(t.length) | 0,
          i = st(e);
        return i.length === 0 || t.copy(i, 0, 0, e), i;
      }
      if (t.length !== void 0)
        return typeof t.length != "number" || Zr(t.length) ? st(0) : Kr(t);
      if (t.type === "Buffer" && Array.isArray(t.data)) return Kr(t.data);
    }
    o(jd, "fromObject");
    function Jr(t) {
      if (t >= On)
        throw new RangeError(
          "Attempt to allocate Buffer larger than maximum size: 0x" +
            On.toString(16) +
            " bytes"
        );
      return t | 0;
    }
    o(Jr, "checked");
    function qd(t) {
      return +t != t && (t = 0), m.alloc(+t);
    }
    o(qd, "SlowBuffer");
    m.isBuffer = o(function (e) {
      return e != null && e._isBuffer === !0 && e !== m.prototype;
    }, "isBuffer");
    m.compare = o(function (e, i) {
      if (
        (Ue(e, Uint8Array) && (e = m.from(e, e.offset, e.byteLength)),
        Ue(i, Uint8Array) && (i = m.from(i, i.offset, i.byteLength)),
        !m.isBuffer(e) || !m.isBuffer(i))
      )
        throw new TypeError(
          'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
        );
      if (e === i) return 0;
      let n = e.length,
        r = i.length;
      for (let s = 0, a = Math.min(n, r); s < a; ++s)
        if (e[s] !== i[s]) {
          (n = e[s]), (r = i[s]);
          break;
        }
      return n < r ? -1 : r < n ? 1 : 0;
    }, "compare");
    m.isEncoding = o(function (e) {
      switch (String(e).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return !0;
        default:
          return !1;
      }
    }, "isEncoding");
    m.concat = o(function (e, i) {
      if (!Array.isArray(e))
        throw new TypeError('"list" argument must be an Array of Buffers');
      if (e.length === 0) return m.alloc(0);
      let n;
      if (i === void 0) for (i = 0, n = 0; n < e.length; ++n) i += e[n].length;
      let r = m.allocUnsafe(i),
        s = 0;
      for (n = 0; n < e.length; ++n) {
        let a = e[n];
        if (Ue(a, Uint8Array))
          s + a.length > r.length
            ? (m.isBuffer(a) || (a = m.from(a)), a.copy(r, s))
            : Uint8Array.prototype.set.call(r, a, s);
        else if (m.isBuffer(a)) a.copy(r, s);
        else throw new TypeError('"list" argument must be an Array of Buffers');
        s += a.length;
      }
      return r;
    }, "concat");
    function ba(t, e) {
      if (m.isBuffer(t)) return t.length;
      if (ArrayBuffer.isView(t) || Ue(t, ArrayBuffer)) return t.byteLength;
      if (typeof t != "string")
        throw new TypeError(
          'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
            typeof t
        );
      let i = t.length,
        n = arguments.length > 2 && arguments[2] === !0;
      if (!n && i === 0) return 0;
      let r = !1;
      for (;;)
        switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return i;
          case "utf8":
          case "utf-8":
            return Yr(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return i * 2;
          case "hex":
            return i >>> 1;
          case "base64":
            return Fa(t).length;
          default:
            if (r) return n ? -1 : Yr(t).length;
            (e = ("" + e).toLowerCase()), (r = !0);
        }
    }
    o(ba, "byteLength");
    m.byteLength = ba;
    function $d(t, e, i) {
      let n = !1;
      if (
        ((e === void 0 || e < 0) && (e = 0),
        e > this.length ||
          ((i === void 0 || i > this.length) && (i = this.length), i <= 0) ||
          ((i >>>= 0), (e >>>= 0), i <= e))
      )
        return "";
      for (t || (t = "utf8"); ; )
        switch (t) {
          case "hex":
            return Zd(this, e, i);
          case "utf8":
          case "utf-8":
            return wa(this, e, i);
          case "ascii":
            return Jd(this, e, i);
          case "latin1":
          case "binary":
            return Qd(this, e, i);
          case "base64":
            return Yd(this, e, i);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return eh(this, e, i);
          default:
            if (n) throw new TypeError("Unknown encoding: " + t);
            (t = (t + "").toLowerCase()), (n = !0);
        }
    }
    o($d, "slowToString");
    m.prototype._isBuffer = !0;
    function Ct(t, e, i) {
      let n = t[e];
      (t[e] = t[i]), (t[i] = n);
    }
    o(Ct, "swap");
    m.prototype.swap16 = o(function () {
      let e = this.length;
      if (e % 2 !== 0)
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      for (let i = 0; i < e; i += 2) Ct(this, i, i + 1);
      return this;
    }, "swap16");
    m.prototype.swap32 = o(function () {
      let e = this.length;
      if (e % 4 !== 0)
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      for (let i = 0; i < e; i += 4) Ct(this, i, i + 3), Ct(this, i + 1, i + 2);
      return this;
    }, "swap32");
    m.prototype.swap64 = o(function () {
      let e = this.length;
      if (e % 8 !== 0)
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      for (let i = 0; i < e; i += 8)
        Ct(this, i, i + 7),
          Ct(this, i + 1, i + 6),
          Ct(this, i + 2, i + 5),
          Ct(this, i + 3, i + 4);
      return this;
    }, "swap64");
    m.prototype.toString = o(function () {
      let e = this.length;
      return e === 0
        ? ""
        : arguments.length === 0
        ? wa(this, 0, e)
        : $d.apply(this, arguments);
    }, "toString");
    m.prototype.toLocaleString = m.prototype.toString;
    m.prototype.equals = o(function (e) {
      if (!m.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
      return this === e ? !0 : m.compare(this, e) === 0;
    }, "equals");
    m.prototype.inspect = o(function () {
      let e = "",
        i = si.INSPECT_MAX_BYTES;
      return (
        (e = this.toString("hex", 0, i)
          .replace(/(.{2})/g, "$1 ")
          .trim()),
        this.length > i && (e += " ... "),
        "<Buffer " + e + ">"
      );
    }, "inspect");
    ua && (m.prototype[ua] = m.prototype.inspect);
    m.prototype.compare = o(function (e, i, n, r, s) {
      if (
        (Ue(e, Uint8Array) && (e = m.from(e, e.offset, e.byteLength)),
        !m.isBuffer(e))
      )
        throw new TypeError(
          'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
            typeof e
        );
      if (
        (i === void 0 && (i = 0),
        n === void 0 && (n = e ? e.length : 0),
        r === void 0 && (r = 0),
        s === void 0 && (s = this.length),
        i < 0 || n > e.length || r < 0 || s > this.length)
      )
        throw new RangeError("out of range index");
      if (r >= s && i >= n) return 0;
      if (r >= s) return -1;
      if (i >= n) return 1;
      if (((i >>>= 0), (n >>>= 0), (r >>>= 0), (s >>>= 0), this === e))
        return 0;
      let a = s - r,
        c = n - i,
        l = Math.min(a, c),
        f = this.slice(r, s),
        d = e.slice(i, n);
      for (let h = 0; h < l; ++h)
        if (f[h] !== d[h]) {
          (a = f[h]), (c = d[h]);
          break;
        }
      return a < c ? -1 : c < a ? 1 : 0;
    }, "compare");
    function ga(t, e, i, n, r) {
      if (t.length === 0) return -1;
      if (
        (typeof i == "string"
          ? ((n = i), (i = 0))
          : i > 2147483647
          ? (i = 2147483647)
          : i < -2147483648 && (i = -2147483648),
        (i = +i),
        Zr(i) && (i = r ? 0 : t.length - 1),
        i < 0 && (i = t.length + i),
        i >= t.length)
      ) {
        if (r) return -1;
        i = t.length - 1;
      } else if (i < 0)
        if (r) i = 0;
        else return -1;
      if ((typeof e == "string" && (e = m.from(e, n)), m.isBuffer(e)))
        return e.length === 0 ? -1 : da(t, e, i, n, r);
      if (typeof e == "number")
        return (
          (e = e & 255),
          typeof Uint8Array.prototype.indexOf == "function"
            ? r
              ? Uint8Array.prototype.indexOf.call(t, e, i)
              : Uint8Array.prototype.lastIndexOf.call(t, e, i)
            : da(t, [e], i, n, r)
        );
      throw new TypeError("val must be string, number or Buffer");
    }
    o(ga, "bidirectionalIndexOf");
    function da(t, e, i, n, r) {
      let s = 1,
        a = t.length,
        c = e.length;
      if (
        n !== void 0 &&
        ((n = String(n).toLowerCase()),
        n === "ucs2" || n === "ucs-2" || n === "utf16le" || n === "utf-16le")
      ) {
        if (t.length < 2 || e.length < 2) return -1;
        (s = 2), (a /= 2), (c /= 2), (i /= 2);
      }
      function l(d, h) {
        return s === 1 ? d[h] : d.readUInt16BE(h * s);
      }
      o(l, "read");
      let f;
      if (r) {
        let d = -1;
        for (f = i; f < a; f++)
          if (l(t, f) === l(e, d === -1 ? 0 : f - d)) {
            if ((d === -1 && (d = f), f - d + 1 === c)) return d * s;
          } else d !== -1 && (f -= f - d), (d = -1);
      } else
        for (i + c > a && (i = a - c), f = i; f >= 0; f--) {
          let d = !0;
          for (let h = 0; h < c; h++)
            if (l(t, f + h) !== l(e, h)) {
              d = !1;
              break;
            }
          if (d) return f;
        }
      return -1;
    }
    o(da, "arrayIndexOf");
    m.prototype.includes = o(function (e, i, n) {
      return this.indexOf(e, i, n) !== -1;
    }, "includes");
    m.prototype.indexOf = o(function (e, i, n) {
      return ga(this, e, i, n, !0);
    }, "indexOf");
    m.prototype.lastIndexOf = o(function (e, i, n) {
      return ga(this, e, i, n, !1);
    }, "lastIndexOf");
    function zd(t, e, i, n) {
      i = Number(i) || 0;
      let r = t.length - i;
      n ? ((n = Number(n)), n > r && (n = r)) : (n = r);
      let s = e.length;
      n > s / 2 && (n = s / 2);
      let a;
      for (a = 0; a < n; ++a) {
        let c = parseInt(e.substr(a * 2, 2), 16);
        if (Zr(c)) return a;
        t[i + a] = c;
      }
      return a;
    }
    o(zd, "hexWrite");
    function Vd(t, e, i, n) {
      return Rn(Yr(e, t.length - i), t, i, n);
    }
    o(Vd, "utf8Write");
    function Hd(t, e, i, n) {
      return Rn(rh(e), t, i, n);
    }
    o(Hd, "asciiWrite");
    function Kd(t, e, i, n) {
      return Rn(Fa(e), t, i, n);
    }
    o(Kd, "base64Write");
    function Gd(t, e, i, n) {
      return Rn(sh(e, t.length - i), t, i, n);
    }
    o(Gd, "ucs2Write");
    m.prototype.write = o(function (e, i, n, r) {
      if (i === void 0) (r = "utf8"), (n = this.length), (i = 0);
      else if (n === void 0 && typeof i == "string")
        (r = i), (n = this.length), (i = 0);
      else if (isFinite(i))
        (i = i >>> 0),
          isFinite(n)
            ? ((n = n >>> 0), r === void 0 && (r = "utf8"))
            : ((r = n), (n = void 0));
      else
        throw new Error(
          "Buffer.write(string, encoding, offset[, length]) is no longer supported"
        );
      let s = this.length - i;
      if (
        ((n === void 0 || n > s) && (n = s),
        (e.length > 0 && (n < 0 || i < 0)) || i > this.length)
      )
        throw new RangeError("Attempt to write outside buffer bounds");
      r || (r = "utf8");
      let a = !1;
      for (;;)
        switch (r) {
          case "hex":
            return zd(this, e, i, n);
          case "utf8":
          case "utf-8":
            return Vd(this, e, i, n);
          case "ascii":
          case "latin1":
          case "binary":
            return Hd(this, e, i, n);
          case "base64":
            return Kd(this, e, i, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return Gd(this, e, i, n);
          default:
            if (a) throw new TypeError("Unknown encoding: " + r);
            (r = ("" + r).toLowerCase()), (a = !0);
        }
    }, "write");
    m.prototype.toJSON = o(function () {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0),
      };
    }, "toJSON");
    function Yd(t, e, i) {
      return e === 0 && i === t.length
        ? Hr.fromByteArray(t)
        : Hr.fromByteArray(t.slice(e, i));
    }
    o(Yd, "base64Slice");
    function wa(t, e, i) {
      i = Math.min(t.length, i);
      let n = [],
        r = e;
      for (; r < i; ) {
        let s = t[r],
          a = null,
          c = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
        if (r + c <= i) {
          let l, f, d, h;
          switch (c) {
            case 1:
              s < 128 && (a = s);
              break;
            case 2:
              (l = t[r + 1]),
                (l & 192) === 128 &&
                  ((h = ((s & 31) << 6) | (l & 63)), h > 127 && (a = h));
              break;
            case 3:
              (l = t[r + 1]),
                (f = t[r + 2]),
                (l & 192) === 128 &&
                  (f & 192) === 128 &&
                  ((h = ((s & 15) << 12) | ((l & 63) << 6) | (f & 63)),
                  h > 2047 && (h < 55296 || h > 57343) && (a = h));
              break;
            case 4:
              (l = t[r + 1]),
                (f = t[r + 2]),
                (d = t[r + 3]),
                (l & 192) === 128 &&
                  (f & 192) === 128 &&
                  (d & 192) === 128 &&
                  ((h =
                    ((s & 15) << 18) |
                    ((l & 63) << 12) |
                    ((f & 63) << 6) |
                    (d & 63)),
                  h > 65535 && h < 1114112 && (a = h));
          }
        }
        a === null
          ? ((a = 65533), (c = 1))
          : a > 65535 &&
            ((a -= 65536),
            n.push(((a >>> 10) & 1023) | 55296),
            (a = 56320 | (a & 1023))),
          n.push(a),
          (r += c);
      }
      return Xd(n);
    }
    o(wa, "utf8Slice");
    var ha = 4096;
    function Xd(t) {
      let e = t.length;
      if (e <= ha) return String.fromCharCode.apply(String, t);
      let i = "",
        n = 0;
      for (; n < e; )
        i += String.fromCharCode.apply(String, t.slice(n, (n += ha)));
      return i;
    }
    o(Xd, "decodeCodePointsArray");
    function Jd(t, e, i) {
      let n = "";
      i = Math.min(t.length, i);
      for (let r = e; r < i; ++r) n += String.fromCharCode(t[r] & 127);
      return n;
    }
    o(Jd, "asciiSlice");
    function Qd(t, e, i) {
      let n = "";
      i = Math.min(t.length, i);
      for (let r = e; r < i; ++r) n += String.fromCharCode(t[r]);
      return n;
    }
    o(Qd, "latin1Slice");
    function Zd(t, e, i) {
      let n = t.length;
      (!e || e < 0) && (e = 0), (!i || i < 0 || i > n) && (i = n);
      let r = "";
      for (let s = e; s < i; ++s) r += oh[t[s]];
      return r;
    }
    o(Zd, "hexSlice");
    function eh(t, e, i) {
      let n = t.slice(e, i),
        r = "";
      for (let s = 0; s < n.length - 1; s += 2)
        r += String.fromCharCode(n[s] + n[s + 1] * 256);
      return r;
    }
    o(eh, "utf16leSlice");
    m.prototype.slice = o(function (e, i) {
      let n = this.length;
      (e = ~~e),
        (i = i === void 0 ? n : ~~i),
        e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
        i < 0 ? ((i += n), i < 0 && (i = 0)) : i > n && (i = n),
        i < e && (i = e);
      let r = this.subarray(e, i);
      return Object.setPrototypeOf(r, m.prototype), r;
    }, "slice");
    function ee(t, e, i) {
      if (t % 1 !== 0 || t < 0) throw new RangeError("offset is not uint");
      if (t + e > i)
        throw new RangeError("Trying to access beyond buffer length");
    }
    o(ee, "checkOffset");
    m.prototype.readUintLE = m.prototype.readUIntLE = o(function (e, i, n) {
      (e = e >>> 0), (i = i >>> 0), n || ee(e, i, this.length);
      let r = this[e],
        s = 1,
        a = 0;
      for (; ++a < i && (s *= 256); ) r += this[e + a] * s;
      return r;
    }, "readUIntLE");
    m.prototype.readUintBE = m.prototype.readUIntBE = o(function (e, i, n) {
      (e = e >>> 0), (i = i >>> 0), n || ee(e, i, this.length);
      let r = this[e + --i],
        s = 1;
      for (; i > 0 && (s *= 256); ) r += this[e + --i] * s;
      return r;
    }, "readUIntBE");
    m.prototype.readUint8 = m.prototype.readUInt8 = o(function (e, i) {
      return (e = e >>> 0), i || ee(e, 1, this.length), this[e];
    }, "readUInt8");
    m.prototype.readUint16LE = m.prototype.readUInt16LE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 2, this.length), this[e] | (this[e + 1] << 8)
      );
    }, "readUInt16LE");
    m.prototype.readUint16BE = m.prototype.readUInt16BE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 2, this.length), (this[e] << 8) | this[e + 1]
      );
    }, "readUInt16BE");
    m.prototype.readUint32LE = m.prototype.readUInt32LE = o(function (e, i) {
      return (
        (e = e >>> 0),
        i || ee(e, 4, this.length),
        (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
          this[e + 3] * 16777216
      );
    }, "readUInt32LE");
    m.prototype.readUint32BE = m.prototype.readUInt32BE = o(function (e, i) {
      return (
        (e = e >>> 0),
        i || ee(e, 4, this.length),
        this[e] * 16777216 +
          ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
      );
    }, "readUInt32BE");
    m.prototype.readBigUInt64LE = wt(
      o(function (e) {
        (e = e >>> 0), ri(e, "offset");
        let i = this[e],
          n = this[e + 7];
        (i === void 0 || n === void 0) && Di(e, this.length - 8);
        let r =
            i + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24,
          s =
            this[++e] + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + n * 2 ** 24;
        return BigInt(r) + (BigInt(s) << BigInt(32));
      }, "readBigUInt64LE")
    );
    m.prototype.readBigUInt64BE = wt(
      o(function (e) {
        (e = e >>> 0), ri(e, "offset");
        let i = this[e],
          n = this[e + 7];
        (i === void 0 || n === void 0) && Di(e, this.length - 8);
        let r =
            i * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e],
          s =
            this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n;
        return (BigInt(r) << BigInt(32)) + BigInt(s);
      }, "readBigUInt64BE")
    );
    m.prototype.readIntLE = o(function (e, i, n) {
      (e = e >>> 0), (i = i >>> 0), n || ee(e, i, this.length);
      let r = this[e],
        s = 1,
        a = 0;
      for (; ++a < i && (s *= 256); ) r += this[e + a] * s;
      return (s *= 128), r >= s && (r -= Math.pow(2, 8 * i)), r;
    }, "readIntLE");
    m.prototype.readIntBE = o(function (e, i, n) {
      (e = e >>> 0), (i = i >>> 0), n || ee(e, i, this.length);
      let r = i,
        s = 1,
        a = this[e + --r];
      for (; r > 0 && (s *= 256); ) a += this[e + --r] * s;
      return (s *= 128), a >= s && (a -= Math.pow(2, 8 * i)), a;
    }, "readIntBE");
    m.prototype.readInt8 = o(function (e, i) {
      return (
        (e = e >>> 0),
        i || ee(e, 1, this.length),
        this[e] & 128 ? (255 - this[e] + 1) * -1 : this[e]
      );
    }, "readInt8");
    m.prototype.readInt16LE = o(function (e, i) {
      (e = e >>> 0), i || ee(e, 2, this.length);
      let n = this[e] | (this[e + 1] << 8);
      return n & 32768 ? n | 4294901760 : n;
    }, "readInt16LE");
    m.prototype.readInt16BE = o(function (e, i) {
      (e = e >>> 0), i || ee(e, 2, this.length);
      let n = this[e + 1] | (this[e] << 8);
      return n & 32768 ? n | 4294901760 : n;
    }, "readInt16BE");
    m.prototype.readInt32LE = o(function (e, i) {
      return (
        (e = e >>> 0),
        i || ee(e, 4, this.length),
        this[e] | (this[e + 1] << 8) | (this[e + 2] << 16) | (this[e + 3] << 24)
      );
    }, "readInt32LE");
    m.prototype.readInt32BE = o(function (e, i) {
      return (
        (e = e >>> 0),
        i || ee(e, 4, this.length),
        (this[e] << 24) | (this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3]
      );
    }, "readInt32BE");
    m.prototype.readBigInt64LE = wt(
      o(function (e) {
        (e = e >>> 0), ri(e, "offset");
        let i = this[e],
          n = this[e + 7];
        (i === void 0 || n === void 0) && Di(e, this.length - 8);
        let r =
          this[e + 4] +
          this[e + 5] * 2 ** 8 +
          this[e + 6] * 2 ** 16 +
          (n << 24);
        return (
          (BigInt(r) << BigInt(32)) +
          BigInt(
            i + this[++e] * 2 ** 8 + this[++e] * 2 ** 16 + this[++e] * 2 ** 24
          )
        );
      }, "readBigInt64LE")
    );
    m.prototype.readBigInt64BE = wt(
      o(function (e) {
        (e = e >>> 0), ri(e, "offset");
        let i = this[e],
          n = this[e + 7];
        (i === void 0 || n === void 0) && Di(e, this.length - 8);
        let r =
          (i << 24) + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + this[++e];
        return (
          (BigInt(r) << BigInt(32)) +
          BigInt(
            this[++e] * 2 ** 24 + this[++e] * 2 ** 16 + this[++e] * 2 ** 8 + n
          )
        );
      }, "readBigInt64BE")
    );
    m.prototype.readFloatLE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 4, this.length), ni.read(this, e, !0, 23, 4)
      );
    }, "readFloatLE");
    m.prototype.readFloatBE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 4, this.length), ni.read(this, e, !1, 23, 4)
      );
    }, "readFloatBE");
    m.prototype.readDoubleLE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 8, this.length), ni.read(this, e, !0, 52, 8)
      );
    }, "readDoubleLE");
    m.prototype.readDoubleBE = o(function (e, i) {
      return (
        (e = e >>> 0), i || ee(e, 8, this.length), ni.read(this, e, !1, 52, 8)
      );
    }, "readDoubleBE");
    function fe(t, e, i, n, r, s) {
      if (!m.isBuffer(t))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (e > r || e < s)
        throw new RangeError('"value" argument is out of bounds');
      if (i + n > t.length) throw new RangeError("Index out of range");
    }
    o(fe, "checkInt");
    m.prototype.writeUintLE = m.prototype.writeUIntLE = o(function (
      e,
      i,
      n,
      r
    ) {
      if (((e = +e), (i = i >>> 0), (n = n >>> 0), !r)) {
        let c = Math.pow(2, 8 * n) - 1;
        fe(this, e, i, n, c, 0);
      }
      let s = 1,
        a = 0;
      for (this[i] = e & 255; ++a < n && (s *= 256); )
        this[i + a] = (e / s) & 255;
      return i + n;
    },
    "writeUIntLE");
    m.prototype.writeUintBE = m.prototype.writeUIntBE = o(function (
      e,
      i,
      n,
      r
    ) {
      if (((e = +e), (i = i >>> 0), (n = n >>> 0), !r)) {
        let c = Math.pow(2, 8 * n) - 1;
        fe(this, e, i, n, c, 0);
      }
      let s = n - 1,
        a = 1;
      for (this[i + s] = e & 255; --s >= 0 && (a *= 256); )
        this[i + s] = (e / a) & 255;
      return i + n;
    },
    "writeUIntBE");
    m.prototype.writeUint8 = m.prototype.writeUInt8 = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 1, 255, 0),
        (this[i] = e & 255),
        i + 1
      );
    }, "writeUInt8");
    m.prototype.writeUint16LE = m.prototype.writeUInt16LE = o(function (
      e,
      i,
      n
    ) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 2, 65535, 0),
        (this[i] = e & 255),
        (this[i + 1] = e >>> 8),
        i + 2
      );
    },
    "writeUInt16LE");
    m.prototype.writeUint16BE = m.prototype.writeUInt16BE = o(function (
      e,
      i,
      n
    ) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 2, 65535, 0),
        (this[i] = e >>> 8),
        (this[i + 1] = e & 255),
        i + 2
      );
    },
    "writeUInt16BE");
    m.prototype.writeUint32LE = m.prototype.writeUInt32LE = o(function (
      e,
      i,
      n
    ) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 4, 4294967295, 0),
        (this[i + 3] = e >>> 24),
        (this[i + 2] = e >>> 16),
        (this[i + 1] = e >>> 8),
        (this[i] = e & 255),
        i + 4
      );
    },
    "writeUInt32LE");
    m.prototype.writeUint32BE = m.prototype.writeUInt32BE = o(function (
      e,
      i,
      n
    ) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 4, 4294967295, 0),
        (this[i] = e >>> 24),
        (this[i + 1] = e >>> 16),
        (this[i + 2] = e >>> 8),
        (this[i + 3] = e & 255),
        i + 4
      );
    },
    "writeUInt32BE");
    function Sa(t, e, i, n, r) {
      va(e, n, r, t, i, 7);
      let s = Number(e & BigInt(4294967295));
      (t[i++] = s),
        (s = s >> 8),
        (t[i++] = s),
        (s = s >> 8),
        (t[i++] = s),
        (s = s >> 8),
        (t[i++] = s);
      let a = Number((e >> BigInt(32)) & BigInt(4294967295));
      return (
        (t[i++] = a),
        (a = a >> 8),
        (t[i++] = a),
        (a = a >> 8),
        (t[i++] = a),
        (a = a >> 8),
        (t[i++] = a),
        i
      );
    }
    o(Sa, "wrtBigUInt64LE");
    function _a(t, e, i, n, r) {
      va(e, n, r, t, i, 7);
      let s = Number(e & BigInt(4294967295));
      (t[i + 7] = s),
        (s = s >> 8),
        (t[i + 6] = s),
        (s = s >> 8),
        (t[i + 5] = s),
        (s = s >> 8),
        (t[i + 4] = s);
      let a = Number((e >> BigInt(32)) & BigInt(4294967295));
      return (
        (t[i + 3] = a),
        (a = a >> 8),
        (t[i + 2] = a),
        (a = a >> 8),
        (t[i + 1] = a),
        (a = a >> 8),
        (t[i] = a),
        i + 8
      );
    }
    o(_a, "wrtBigUInt64BE");
    m.prototype.writeBigUInt64LE = wt(
      o(function (e, i = 0) {
        return Sa(this, e, i, BigInt(0), BigInt("0xffffffffffffffff"));
      }, "writeBigUInt64LE")
    );
    m.prototype.writeBigUInt64BE = wt(
      o(function (e, i = 0) {
        return _a(this, e, i, BigInt(0), BigInt("0xffffffffffffffff"));
      }, "writeBigUInt64BE")
    );
    m.prototype.writeIntLE = o(function (e, i, n, r) {
      if (((e = +e), (i = i >>> 0), !r)) {
        let l = Math.pow(2, 8 * n - 1);
        fe(this, e, i, n, l - 1, -l);
      }
      let s = 0,
        a = 1,
        c = 0;
      for (this[i] = e & 255; ++s < n && (a *= 256); )
        e < 0 && c === 0 && this[i + s - 1] !== 0 && (c = 1),
          (this[i + s] = (((e / a) >> 0) - c) & 255);
      return i + n;
    }, "writeIntLE");
    m.prototype.writeIntBE = o(function (e, i, n, r) {
      if (((e = +e), (i = i >>> 0), !r)) {
        let l = Math.pow(2, 8 * n - 1);
        fe(this, e, i, n, l - 1, -l);
      }
      let s = n - 1,
        a = 1,
        c = 0;
      for (this[i + s] = e & 255; --s >= 0 && (a *= 256); )
        e < 0 && c === 0 && this[i + s + 1] !== 0 && (c = 1),
          (this[i + s] = (((e / a) >> 0) - c) & 255);
      return i + n;
    }, "writeIntBE");
    m.prototype.writeInt8 = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 1, 127, -128),
        e < 0 && (e = 255 + e + 1),
        (this[i] = e & 255),
        i + 1
      );
    }, "writeInt8");
    m.prototype.writeInt16LE = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 2, 32767, -32768),
        (this[i] = e & 255),
        (this[i + 1] = e >>> 8),
        i + 2
      );
    }, "writeInt16LE");
    m.prototype.writeInt16BE = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 2, 32767, -32768),
        (this[i] = e >>> 8),
        (this[i + 1] = e & 255),
        i + 2
      );
    }, "writeInt16BE");
    m.prototype.writeInt32LE = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 4, 2147483647, -2147483648),
        (this[i] = e & 255),
        (this[i + 1] = e >>> 8),
        (this[i + 2] = e >>> 16),
        (this[i + 3] = e >>> 24),
        i + 4
      );
    }, "writeInt32LE");
    m.prototype.writeInt32BE = o(function (e, i, n) {
      return (
        (e = +e),
        (i = i >>> 0),
        n || fe(this, e, i, 4, 2147483647, -2147483648),
        e < 0 && (e = 4294967295 + e + 1),
        (this[i] = e >>> 24),
        (this[i + 1] = e >>> 16),
        (this[i + 2] = e >>> 8),
        (this[i + 3] = e & 255),
        i + 4
      );
    }, "writeInt32BE");
    m.prototype.writeBigInt64LE = wt(
      o(function (e, i = 0) {
        return Sa(
          this,
          e,
          i,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        );
      }, "writeBigInt64LE")
    );
    m.prototype.writeBigInt64BE = wt(
      o(function (e, i = 0) {
        return _a(
          this,
          e,
          i,
          -BigInt("0x8000000000000000"),
          BigInt("0x7fffffffffffffff")
        );
      }, "writeBigInt64BE")
    );
    function Ea(t, e, i, n, r, s) {
      if (i + n > t.length) throw new RangeError("Index out of range");
      if (i < 0) throw new RangeError("Index out of range");
    }
    o(Ea, "checkIEEE754");
    function xa(t, e, i, n, r) {
      return (
        (e = +e),
        (i = i >>> 0),
        r || Ea(t, e, i, 4, 34028234663852886e22, -34028234663852886e22),
        ni.write(t, e, i, n, 23, 4),
        i + 4
      );
    }
    o(xa, "writeFloat");
    m.prototype.writeFloatLE = o(function (e, i, n) {
      return xa(this, e, i, !0, n);
    }, "writeFloatLE");
    m.prototype.writeFloatBE = o(function (e, i, n) {
      return xa(this, e, i, !1, n);
    }, "writeFloatBE");
    function ka(t, e, i, n, r) {
      return (
        (e = +e),
        (i = i >>> 0),
        r || Ea(t, e, i, 8, 17976931348623157e292, -17976931348623157e292),
        ni.write(t, e, i, n, 52, 8),
        i + 8
      );
    }
    o(ka, "writeDouble");
    m.prototype.writeDoubleLE = o(function (e, i, n) {
      return ka(this, e, i, !0, n);
    }, "writeDoubleLE");
    m.prototype.writeDoubleBE = o(function (e, i, n) {
      return ka(this, e, i, !1, n);
    }, "writeDoubleBE");
    m.prototype.copy = o(function (e, i, n, r) {
      if (!m.isBuffer(e)) throw new TypeError("argument should be a Buffer");
      if (
        (n || (n = 0),
        !r && r !== 0 && (r = this.length),
        i >= e.length && (i = e.length),
        i || (i = 0),
        r > 0 && r < n && (r = n),
        r === n || e.length === 0 || this.length === 0)
      )
        return 0;
      if (i < 0) throw new RangeError("targetStart out of bounds");
      if (n < 0 || n >= this.length) throw new RangeError("Index out of range");
      if (r < 0) throw new RangeError("sourceEnd out of bounds");
      r > this.length && (r = this.length),
        e.length - i < r - n && (r = e.length - i + n);
      let s = r - n;
      return (
        this === e && typeof Uint8Array.prototype.copyWithin == "function"
          ? this.copyWithin(i, n, r)
          : Uint8Array.prototype.set.call(e, this.subarray(n, r), i),
        s
      );
    }, "copy");
    m.prototype.fill = o(function (e, i, n, r) {
      if (typeof e == "string") {
        if (
          (typeof i == "string"
            ? ((r = i), (i = 0), (n = this.length))
            : typeof n == "string" && ((r = n), (n = this.length)),
          r !== void 0 && typeof r != "string")
        )
          throw new TypeError("encoding must be a string");
        if (typeof r == "string" && !m.isEncoding(r))
          throw new TypeError("Unknown encoding: " + r);
        if (e.length === 1) {
          let a = e.charCodeAt(0);
          ((r === "utf8" && a < 128) || r === "latin1") && (e = a);
        }
      } else typeof e == "number" ? (e = e & 255) : typeof e == "boolean" && (e = Number(e));
      if (i < 0 || this.length < i || this.length < n)
        throw new RangeError("Out of range index");
      if (n <= i) return this;
      (i = i >>> 0), (n = n === void 0 ? this.length : n >>> 0), e || (e = 0);
      let s;
      if (typeof e == "number") for (s = i; s < n; ++s) this[s] = e;
      else {
        let a = m.isBuffer(e) ? e : m.from(e, r),
          c = a.length;
        if (c === 0)
          throw new TypeError(
            'The value "' + e + '" is invalid for argument "value"'
          );
        for (s = 0; s < n - i; ++s) this[s + i] = a[s % c];
      }
      return this;
    }, "fill");
    var ii = {};
    function Qr(t, e, i) {
      ii[t] = class extends i {
        static {
          o(this, "NodeError");
        }
        constructor() {
          super(),
            Object.defineProperty(this, "message", {
              value: e.apply(this, arguments),
              writable: !0,
              configurable: !0,
            }),
            (this.name = `${this.name} [${t}]`),
            this.stack,
            delete this.name;
        }
        get code() {
          return t;
        }
        set code(r) {
          Object.defineProperty(this, "code", {
            configurable: !0,
            enumerable: !0,
            value: r,
            writable: !0,
          });
        }
        toString() {
          return `${this.name} [${t}]: ${this.message}`;
        }
      };
    }
    o(Qr, "E");
    Qr(
      "ERR_BUFFER_OUT_OF_BOUNDS",
      function (t) {
        return t
          ? `${t} is outside of buffer bounds`
          : "Attempt to access memory outside buffer bounds";
      },
      RangeError
    );
    Qr(
      "ERR_INVALID_ARG_TYPE",
      function (t, e) {
        return `The "${t}" argument must be of type number. Received type ${typeof e}`;
      },
      TypeError
    );
    Qr(
      "ERR_OUT_OF_RANGE",
      function (t, e, i) {
        let n = `The value of "${t}" is out of range.`,
          r = i;
        return (
          Number.isInteger(i) && Math.abs(i) > 2 ** 32
            ? (r = pa(String(i)))
            : typeof i == "bigint" &&
              ((r = String(i)),
              (i > BigInt(2) ** BigInt(32) || i < -(BigInt(2) ** BigInt(32))) &&
                (r = pa(r)),
              (r += "n")),
          (n += ` It must be ${e}. Received ${r}`),
          n
        );
      },
      RangeError
    );
    function pa(t) {
      let e = "",
        i = t.length,
        n = t[0] === "-" ? 1 : 0;
      for (; i >= n + 4; i -= 3) e = `_${t.slice(i - 3, i)}${e}`;
      return `${t.slice(0, i)}${e}`;
    }
    o(pa, "addNumericalSeparator");
    function th(t, e, i) {
      ri(e, "offset"),
        (t[e] === void 0 || t[e + i] === void 0) && Di(e, t.length - (i + 1));
    }
    o(th, "checkBounds");
    function va(t, e, i, n, r, s) {
      if (t > i || t < e) {
        let a = typeof e == "bigint" ? "n" : "",
          c;
        throw (
          (s > 3
            ? e === 0 || e === BigInt(0)
              ? (c = `>= 0${a} and < 2${a} ** ${(s + 1) * 8}${a}`)
              : (c = `>= -(2${a} ** ${(s + 1) * 8 - 1}${a}) and < 2 ** ${
                  (s + 1) * 8 - 1
                }${a}`)
            : (c = `>= ${e}${a} and <= ${i}${a}`),
          new ii.ERR_OUT_OF_RANGE("value", c, t))
        );
      }
      th(n, r, s);
    }
    o(va, "checkIntBI");
    function ri(t, e) {
      if (typeof t != "number")
        throw new ii.ERR_INVALID_ARG_TYPE(e, "number", t);
    }
    o(ri, "validateNumber");
    function Di(t, e, i) {
      throw Math.floor(t) !== t
        ? (ri(t, i), new ii.ERR_OUT_OF_RANGE(i || "offset", "an integer", t))
        : e < 0
        ? new ii.ERR_BUFFER_OUT_OF_BOUNDS()
        : new ii.ERR_OUT_OF_RANGE(
            i || "offset",
            `>= ${i ? 1 : 0} and <= ${e}`,
            t
          );
    }
    o(Di, "boundsError");
    var ih = /[^+/0-9A-Za-z-_]/g;
    function nh(t) {
      if (((t = t.split("=")[0]), (t = t.trim().replace(ih, "")), t.length < 2))
        return "";
      for (; t.length % 4 !== 0; ) t = t + "=";
      return t;
    }
    o(nh, "base64clean");
    function Yr(t, e) {
      e = e || 1 / 0;
      let i,
        n = t.length,
        r = null,
        s = [];
      for (let a = 0; a < n; ++a) {
        if (((i = t.charCodeAt(a)), i > 55295 && i < 57344)) {
          if (!r) {
            if (i > 56319) {
              (e -= 3) > -1 && s.push(239, 191, 189);
              continue;
            } else if (a + 1 === n) {
              (e -= 3) > -1 && s.push(239, 191, 189);
              continue;
            }
            r = i;
            continue;
          }
          if (i < 56320) {
            (e -= 3) > -1 && s.push(239, 191, 189), (r = i);
            continue;
          }
          i = (((r - 55296) << 10) | (i - 56320)) + 65536;
        } else r && (e -= 3) > -1 && s.push(239, 191, 189);
        if (((r = null), i < 128)) {
          if ((e -= 1) < 0) break;
          s.push(i);
        } else if (i < 2048) {
          if ((e -= 2) < 0) break;
          s.push((i >> 6) | 192, (i & 63) | 128);
        } else if (i < 65536) {
          if ((e -= 3) < 0) break;
          s.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (i & 63) | 128);
        } else if (i < 1114112) {
          if ((e -= 4) < 0) break;
          s.push(
            (i >> 18) | 240,
            ((i >> 12) & 63) | 128,
            ((i >> 6) & 63) | 128,
            (i & 63) | 128
          );
        } else throw new Error("Invalid code point");
      }
      return s;
    }
    o(Yr, "utf8ToBytes");
    function rh(t) {
      let e = [];
      for (let i = 0; i < t.length; ++i) e.push(t.charCodeAt(i) & 255);
      return e;
    }
    o(rh, "asciiToBytes");
    function sh(t, e) {
      let i,
        n,
        r,
        s = [];
      for (let a = 0; a < t.length && !((e -= 2) < 0); ++a)
        (i = t.charCodeAt(a)),
          (n = i >> 8),
          (r = i % 256),
          s.push(r),
          s.push(n);
      return s;
    }
    o(sh, "utf16leToBytes");
    function Fa(t) {
      return Hr.toByteArray(nh(t));
    }
    o(Fa, "base64ToBytes");
    function Rn(t, e, i, n) {
      let r;
      for (r = 0; r < n && !(r + i >= e.length || r >= t.length); ++r)
        e[r + i] = t[r];
      return r;
    }
    o(Rn, "blitBuffer");
    function Ue(t, e) {
      return (
        t instanceof e ||
        (t != null &&
          t.constructor != null &&
          t.constructor.name != null &&
          t.constructor.name === e.name)
      );
    }
    o(Ue, "isInstance");
    function Zr(t) {
      return t !== t;
    }
    o(Zr, "numberIsNaN");
    var oh = (function () {
      let t = "0123456789abcdef",
        e = new Array(256);
      for (let i = 0; i < 16; ++i) {
        let n = i * 16;
        for (let r = 0; r < 16; ++r) e[n + r] = t[i] + t[r];
      }
      return e;
    })();
    function wt(t) {
      return typeof BigInt > "u" ? ah : t;
    }
    o(wt, "defineBigIntMethod");
    function ah() {
      throw new Error("BigInt not supported");
    }
    o(ah, "BufferBigIntNotDefined");
  });
  var Na = O((jS, as) => {
    "use strict";
    var Bh = Object.prototype.hasOwnProperty,
      oe = "~";
    function Zi() {}
    o(Zi, "Events");
    Object.create &&
      ((Zi.prototype = Object.create(null)), new Zi().__proto__ || (oe = !1));
    function Dh(t, e, i) {
      (this.fn = t), (this.context = e), (this.once = i || !1);
    }
    o(Dh, "EE");
    function Ra(t, e, i, n, r) {
      if (typeof i != "function")
        throw new TypeError("The listener must be a function");
      var s = new Dh(i, n || t, r),
        a = oe ? oe + e : e;
      return (
        t._events[a]
          ? t._events[a].fn
            ? (t._events[a] = [t._events[a], s])
            : t._events[a].push(s)
          : ((t._events[a] = s), t._eventsCount++),
        t
      );
    }
    o(Ra, "addListener");
    function Cn(t, e) {
      --t._eventsCount === 0 ? (t._events = new Zi()) : delete t._events[e];
    }
    o(Cn, "clearEvent");
    function ne() {
      (this._events = new Zi()), (this._eventsCount = 0);
    }
    o(ne, "EventEmitter");
    ne.prototype.eventNames = o(function () {
      var e = [],
        i,
        n;
      if (this._eventsCount === 0) return e;
      for (n in (i = this._events))
        Bh.call(i, n) && e.push(oe ? n.slice(1) : n);
      return Object.getOwnPropertySymbols
        ? e.concat(Object.getOwnPropertySymbols(i))
        : e;
    }, "eventNames");
    ne.prototype.listeners = o(function (e) {
      var i = oe ? oe + e : e,
        n = this._events[i];
      if (!n) return [];
      if (n.fn) return [n.fn];
      for (var r = 0, s = n.length, a = new Array(s); r < s; r++)
        a[r] = n[r].fn;
      return a;
    }, "listeners");
    ne.prototype.listenerCount = o(function (e) {
      var i = oe ? oe + e : e,
        n = this._events[i];
      return n ? (n.fn ? 1 : n.length) : 0;
    }, "listenerCount");
    ne.prototype.emit = o(function (e, i, n, r, s, a) {
      var c = oe ? oe + e : e;
      if (!this._events[c]) return !1;
      var l = this._events[c],
        f = arguments.length,
        d,
        h;
      if (l.fn) {
        switch ((l.once && this.removeListener(e, l.fn, void 0, !0), f)) {
          case 1:
            return l.fn.call(l.context), !0;
          case 2:
            return l.fn.call(l.context, i), !0;
          case 3:
            return l.fn.call(l.context, i, n), !0;
          case 4:
            return l.fn.call(l.context, i, n, r), !0;
          case 5:
            return l.fn.call(l.context, i, n, r, s), !0;
          case 6:
            return l.fn.call(l.context, i, n, r, s, a), !0;
        }
        for (h = 1, d = new Array(f - 1); h < f; h++) d[h - 1] = arguments[h];
        l.fn.apply(l.context, d);
      } else {
        var b = l.length,
          y;
        for (h = 0; h < b; h++)
          switch (
            (l[h].once && this.removeListener(e, l[h].fn, void 0, !0), f)
          ) {
            case 1:
              l[h].fn.call(l[h].context);
              break;
            case 2:
              l[h].fn.call(l[h].context, i);
              break;
            case 3:
              l[h].fn.call(l[h].context, i, n);
              break;
            case 4:
              l[h].fn.call(l[h].context, i, n, r);
              break;
            default:
              if (!d)
                for (y = 1, d = new Array(f - 1); y < f; y++)
                  d[y - 1] = arguments[y];
              l[h].fn.apply(l[h].context, d);
          }
      }
      return !0;
    }, "emit");
    ne.prototype.on = o(function (e, i, n) {
      return Ra(this, e, i, n, !1);
    }, "on");
    ne.prototype.once = o(function (e, i, n) {
      return Ra(this, e, i, n, !0);
    }, "once");
    ne.prototype.removeListener = o(function (e, i, n, r) {
      var s = oe ? oe + e : e;
      if (!this._events[s]) return this;
      if (!i) return Cn(this, s), this;
      var a = this._events[s];
      if (a.fn)
        a.fn === i && (!r || a.once) && (!n || a.context === n) && Cn(this, s);
      else {
        for (var c = 0, l = [], f = a.length; c < f; c++)
          (a[c].fn !== i || (r && !a[c].once) || (n && a[c].context !== n)) &&
            l.push(a[c]);
        l.length ? (this._events[s] = l.length === 1 ? l[0] : l) : Cn(this, s);
      }
      return this;
    }, "removeListener");
    ne.prototype.removeAllListeners = o(function (e) {
      var i;
      return (
        e
          ? ((i = oe ? oe + e : e), this._events[i] && Cn(this, i))
          : ((this._events = new Zi()), (this._eventsCount = 0)),
        this
      );
    }, "removeAllListeners");
    ne.prototype.off = ne.prototype.removeListener;
    ne.prototype.addListener = ne.prototype.on;
    ne.prefixed = oe;
    ne.EventEmitter = ne;
    typeof as < "u" && (as.exports = ne);
  });
  var q = O((p_, nc) => {
    "use strict";
    nc.exports = {
      ArrayIsArray: o(function (t) {
        return Array.isArray(t);
      }, "ArrayIsArray"),
      ArrayPrototypeIncludes: o(function (t, e) {
        return t.includes(e);
      }, "ArrayPrototypeIncludes"),
      ArrayPrototypeIndexOf: o(function (t, e) {
        return t.indexOf(e);
      }, "ArrayPrototypeIndexOf"),
      ArrayPrototypeJoin: o(function (t, e) {
        return t.join(e);
      }, "ArrayPrototypeJoin"),
      ArrayPrototypeMap: o(function (t, e) {
        return t.map(e);
      }, "ArrayPrototypeMap"),
      ArrayPrototypePop: o(function (t, e) {
        return t.pop(e);
      }, "ArrayPrototypePop"),
      ArrayPrototypePush: o(function (t, e) {
        return t.push(e);
      }, "ArrayPrototypePush"),
      ArrayPrototypeSlice: o(function (t, e, i) {
        return t.slice(e, i);
      }, "ArrayPrototypeSlice"),
      Error,
      FunctionPrototypeCall: o(function (t, e, ...i) {
        return t.call(e, ...i);
      }, "FunctionPrototypeCall"),
      FunctionPrototypeSymbolHasInstance: o(function (t, e) {
        return Function.prototype[Symbol.hasInstance].call(t, e);
      }, "FunctionPrototypeSymbolHasInstance"),
      MathFloor: Math.floor,
      Number,
      NumberIsInteger: Number.isInteger,
      NumberIsNaN: Number.isNaN,
      NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER,
      NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER,
      NumberParseInt: Number.parseInt,
      ObjectDefineProperties: o(function (t, e) {
        return Object.defineProperties(t, e);
      }, "ObjectDefineProperties"),
      ObjectDefineProperty: o(function (t, e, i) {
        return Object.defineProperty(t, e, i);
      }, "ObjectDefineProperty"),
      ObjectGetOwnPropertyDescriptor: o(function (t, e) {
        return Object.getOwnPropertyDescriptor(t, e);
      }, "ObjectGetOwnPropertyDescriptor"),
      ObjectKeys: o(function (t) {
        return Object.keys(t);
      }, "ObjectKeys"),
      ObjectSetPrototypeOf: o(function (t, e) {
        return Object.setPrototypeOf(t, e);
      }, "ObjectSetPrototypeOf"),
      Promise,
      PromisePrototypeCatch: o(function (t, e) {
        return t.catch(e);
      }, "PromisePrototypeCatch"),
      PromisePrototypeThen: o(function (t, e, i) {
        return t.then(e, i);
      }, "PromisePrototypeThen"),
      PromiseReject: o(function (t) {
        return Promise.reject(t);
      }, "PromiseReject"),
      PromiseResolve: o(function (t) {
        return Promise.resolve(t);
      }, "PromiseResolve"),
      ReflectApply: Reflect.apply,
      RegExpPrototypeTest: o(function (t, e) {
        return t.test(e);
      }, "RegExpPrototypeTest"),
      SafeSet: Set,
      String,
      StringPrototypeSlice: o(function (t, e, i) {
        return t.slice(e, i);
      }, "StringPrototypeSlice"),
      StringPrototypeToLowerCase: o(function (t) {
        return t.toLowerCase();
      }, "StringPrototypeToLowerCase"),
      StringPrototypeToUpperCase: o(function (t) {
        return t.toUpperCase();
      }, "StringPrototypeToUpperCase"),
      StringPrototypeTrim: o(function (t) {
        return t.trim();
      }, "StringPrototypeTrim"),
      Symbol,
      SymbolFor: Symbol.for,
      SymbolAsyncIterator: Symbol.asyncIterator,
      SymbolHasInstance: Symbol.hasInstance,
      SymbolIterator: Symbol.iterator,
      SymbolDispose: Symbol.dispose || Symbol("Symbol.dispose"),
      SymbolAsyncDispose: Symbol.asyncDispose || Symbol("Symbol.asyncDispose"),
      TypedArrayPrototypeSet: o(function (t, e, i) {
        return t.set(e, i);
      }, "TypedArrayPrototypeSet"),
      Boolean,
      Uint8Array,
    };
  });
  var hi = O((m_, zn) => {
    "use strict";
    var { AbortController: rc, AbortSignal: Uh } =
      typeof self < "u" ? self : typeof window < "u" ? window : void 0;
    zn.exports = rc;
    zn.exports.AbortSignal = Uh;
    zn.exports.default = rc;
  });
  var rn = O((b_, ms) => {
    "use strict";
    var pi = typeof Reflect == "object" ? Reflect : null,
      sc =
        pi && typeof pi.apply == "function"
          ? pi.apply
          : o(function (e, i, n) {
              return Function.prototype.apply.call(e, i, n);
            }, "ReflectApply"),
      Vn;
    pi && typeof pi.ownKeys == "function"
      ? (Vn = pi.ownKeys)
      : Object.getOwnPropertySymbols
      ? (Vn = o(function (e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        }, "ReflectOwnKeys"))
      : (Vn = o(function (e) {
          return Object.getOwnPropertyNames(e);
        }, "ReflectOwnKeys"));
    function jh(t) {
      console && console.warn && console.warn(t);
    }
    o(jh, "ProcessEmitWarning");
    var ac =
      Number.isNaN ||
      o(function (e) {
        return e !== e;
      }, "NumberIsNaN");
    function N() {
      N.init.call(this);
    }
    o(N, "EventEmitter");
    ms.exports = N;
    ms.exports.once = Vh;
    N.EventEmitter = N;
    N.prototype._events = void 0;
    N.prototype._eventsCount = 0;
    N.prototype._maxListeners = void 0;
    var oc = 10;
    function Hn(t) {
      if (typeof t != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            typeof t
        );
    }
    o(Hn, "checkListener");
    Object.defineProperty(N, "defaultMaxListeners", {
      enumerable: !0,
      get: o(function () {
        return oc;
      }, "get"),
      set: o(function (t) {
        if (typeof t != "number" || t < 0 || ac(t))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              t +
              "."
          );
        oc = t;
      }, "set"),
    });
    N.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    N.prototype.setMaxListeners = o(function (e) {
      if (typeof e != "number" || e < 0 || ac(e))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            e +
            "."
        );
      return (this._maxListeners = e), this;
    }, "setMaxListeners");
    function cc(t) {
      return t._maxListeners === void 0
        ? N.defaultMaxListeners
        : t._maxListeners;
    }
    o(cc, "_getMaxListeners");
    N.prototype.getMaxListeners = o(function () {
      return cc(this);
    }, "getMaxListeners");
    N.prototype.emit = o(function (e) {
      for (var i = [], n = 1; n < arguments.length; n++) i.push(arguments[n]);
      var r = e === "error",
        s = this._events;
      if (s !== void 0) r = r && s.error === void 0;
      else if (!r) return !1;
      if (r) {
        var a;
        if ((i.length > 0 && (a = i[0]), a instanceof Error)) throw a;
        var c = new Error(
          "Unhandled error." + (a ? " (" + a.message + ")" : "")
        );
        throw ((c.context = a), c);
      }
      var l = s[e];
      if (l === void 0) return !1;
      if (typeof l == "function") sc(l, this, i);
      else
        for (var f = l.length, d = hc(l, f), n = 0; n < f; ++n)
          sc(d[n], this, i);
      return !0;
    }, "emit");
    function lc(t, e, i, n) {
      var r, s, a;
      if (
        (Hn(i),
        (s = t._events),
        s === void 0
          ? ((s = t._events = Object.create(null)), (t._eventsCount = 0))
          : (s.newListener !== void 0 &&
              (t.emit("newListener", e, i.listener ? i.listener : i),
              (s = t._events)),
            (a = s[e])),
        a === void 0)
      )
        (a = s[e] = i), ++t._eventsCount;
      else if (
        (typeof a == "function"
          ? (a = s[e] = n ? [i, a] : [a, i])
          : n
          ? a.unshift(i)
          : a.push(i),
        (r = cc(t)),
        r > 0 && a.length > r && !a.warned)
      ) {
        a.warned = !0;
        var c = new Error(
          "Possible EventEmitter memory leak detected. " +
            a.length +
            " " +
            String(e) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (c.name = "MaxListenersExceededWarning"),
          (c.emitter = t),
          (c.type = e),
          (c.count = a.length),
          jh(c);
      }
      return t;
    }
    o(lc, "_addListener");
    N.prototype.addListener = o(function (e, i) {
      return lc(this, e, i, !1);
    }, "addListener");
    N.prototype.on = N.prototype.addListener;
    N.prototype.prependListener = o(function (e, i) {
      return lc(this, e, i, !0);
    }, "prependListener");
    function qh() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    o(qh, "onceWrapper");
    function fc(t, e, i) {
      var n = { fired: !1, wrapFn: void 0, target: t, type: e, listener: i },
        r = qh.bind(n);
      return (r.listener = i), (n.wrapFn = r), r;
    }
    o(fc, "_onceWrap");
    N.prototype.once = o(function (e, i) {
      return Hn(i), this.on(e, fc(this, e, i)), this;
    }, "once");
    N.prototype.prependOnceListener = o(function (e, i) {
      return Hn(i), this.prependListener(e, fc(this, e, i)), this;
    }, "prependOnceListener");
    N.prototype.removeListener = o(function (e, i) {
      var n, r, s, a, c;
      if ((Hn(i), (r = this._events), r === void 0)) return this;
      if (((n = r[e]), n === void 0)) return this;
      if (n === i || n.listener === i)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete r[e],
            r.removeListener &&
              this.emit("removeListener", e, n.listener || i));
      else if (typeof n != "function") {
        for (s = -1, a = n.length - 1; a >= 0; a--)
          if (n[a] === i || n[a].listener === i) {
            (c = n[a].listener), (s = a);
            break;
          }
        if (s < 0) return this;
        s === 0 ? n.shift() : $h(n, s),
          n.length === 1 && (r[e] = n[0]),
          r.removeListener !== void 0 && this.emit("removeListener", e, c || i);
      }
      return this;
    }, "removeListener");
    N.prototype.off = N.prototype.removeListener;
    N.prototype.removeAllListeners = o(function (e) {
      var i, n, r;
      if (((n = this._events), n === void 0)) return this;
      if (n.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : n[e] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete n[e]),
          this
        );
      if (arguments.length === 0) {
        var s = Object.keys(n),
          a;
        for (r = 0; r < s.length; ++r)
          (a = s[r]), a !== "removeListener" && this.removeAllListeners(a);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((i = n[e]), typeof i == "function")) this.removeListener(e, i);
      else if (i !== void 0)
        for (r = i.length - 1; r >= 0; r--) this.removeListener(e, i[r]);
      return this;
    }, "removeAllListeners");
    function uc(t, e, i) {
      var n = t._events;
      if (n === void 0) return [];
      var r = n[e];
      return r === void 0
        ? []
        : typeof r == "function"
        ? i
          ? [r.listener || r]
          : [r]
        : i
        ? zh(r)
        : hc(r, r.length);
    }
    o(uc, "_listeners");
    N.prototype.listeners = o(function (e) {
      return uc(this, e, !0);
    }, "listeners");
    N.prototype.rawListeners = o(function (e) {
      return uc(this, e, !1);
    }, "rawListeners");
    N.listenerCount = function (t, e) {
      return typeof t.listenerCount == "function"
        ? t.listenerCount(e)
        : dc.call(t, e);
    };
    N.prototype.listenerCount = dc;
    function dc(t) {
      var e = this._events;
      if (e !== void 0) {
        var i = e[t];
        if (typeof i == "function") return 1;
        if (i !== void 0) return i.length;
      }
      return 0;
    }
    o(dc, "listenerCount");
    N.prototype.eventNames = o(function () {
      return this._eventsCount > 0 ? Vn(this._events) : [];
    }, "eventNames");
    function hc(t, e) {
      for (var i = new Array(e), n = 0; n < e; ++n) i[n] = t[n];
      return i;
    }
    o(hc, "arrayClone");
    function $h(t, e) {
      for (; e + 1 < t.length; e++) t[e] = t[e + 1];
      t.pop();
    }
    o($h, "spliceOne");
    function zh(t) {
      for (var e = new Array(t.length), i = 0; i < e.length; ++i)
        e[i] = t[i].listener || t[i];
      return e;
    }
    o(zh, "unwrapListeners");
    function Vh(t, e) {
      return new Promise(function (i, n) {
        function r(a) {
          t.removeListener(e, s), n(a);
        }
        o(r, "errorListener");
        function s() {
          typeof t.removeListener == "function" && t.removeListener("error", r),
            i([].slice.call(arguments));
        }
        o(s, "resolver"),
          pc(t, e, s, { once: !0 }),
          e !== "error" && Hh(t, r, { once: !0 });
      });
    }
    o(Vh, "once");
    function Hh(t, e, i) {
      typeof t.on == "function" && pc(t, "error", e, i);
    }
    o(Hh, "addErrorHandlerIfEventEmitter");
    function pc(t, e, i, n) {
      if (typeof t.on == "function") n.once ? t.once(e, i) : t.on(e, i);
      else if (typeof t.addEventListener == "function")
        t.addEventListener(
          e,
          o(function r(s) {
            n.once && t.removeEventListener(e, r), i(s);
          }, "wrapListener")
        );
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            typeof t
        );
    }
    o(pc, "eventTargetAgnosticAddListener");
  });
  var re = O((w_, gs) => {
    "use strict";
    var Kh = ve(),
      { kResistStopPropagation: Gh, SymbolDispose: Yh } = q(),
      Xh = globalThis.AbortSignal || hi().AbortSignal,
      Jh = globalThis.AbortController || hi().AbortController,
      Qh = Object.getPrototypeOf(async function () {}).constructor,
      yc = globalThis.Blob || Kh.Blob,
      Zh = o(
        typeof yc < "u"
          ? function (e) {
              return e instanceof yc;
            }
          : function (e) {
              return !1;
            },
        "isBlob"
      ),
      mc = o((t, e) => {
        if (
          t !== void 0 &&
          (t === null || typeof t != "object" || !("aborted" in t))
        )
          throw new ERR_INVALID_ARG_TYPE(e, "AbortSignal", t);
      }, "validateAbortSignal"),
      ep = o((t, e) => {
        if (typeof t != "function")
          throw new ERR_INVALID_ARG_TYPE(e, "Function", t);
      }, "validateFunction"),
      bs = class extends Error {
        static {
          o(this, "AggregateError");
        }
        constructor(e) {
          if (!Array.isArray(e))
            throw new TypeError(
              `Expected input to be an Array, got ${typeof e}`
            );
          let i = "";
          for (let n = 0; n < e.length; n++)
            i += `    ${e[n].stack}
`;
          super(i), (this.name = "AggregateError"), (this.errors = e);
        }
      };
    gs.exports = {
      AggregateError: bs,
      kEmptyObject: Object.freeze({}),
      once: o(function (t) {
        let e = !1;
        return function (...i) {
          e || ((e = !0), t.apply(this, i));
        };
      }, "once"),
      createDeferredPromise: o(function () {
        let t, e;
        return {
          promise: new Promise((n, r) => {
            (t = n), (e = r);
          }),
          resolve: t,
          reject: e,
        };
      }, "createDeferredPromise"),
      promisify: o(function (t) {
        return new Promise((e, i) => {
          t((n, ...r) => (n ? i(n) : e(...r)));
        });
      }, "promisify"),
      debuglog: o(function () {
        return function () {};
      }, "debuglog"),
      format: o(function (t, ...e) {
        return t.replace(/%([sdifj])/g, function (...[i, n]) {
          let r = e.shift();
          return n === "f"
            ? r.toFixed(6)
            : n === "j"
            ? JSON.stringify(r)
            : n === "s" && typeof r == "object"
            ? `${r.constructor !== Object ? r.constructor.name : ""} {}`.trim()
            : r.toString();
        });
      }, "format"),
      inspect: o(function (t) {
        switch (typeof t) {
          case "string":
            if (t.includes("'"))
              if (t.includes('"')) {
                if (!t.includes("`") && !t.includes("${")) return `\`${t}\``;
              } else return `"${t}"`;
            return `'${t}'`;
          case "number":
            return isNaN(t) ? "NaN" : Object.is(t, -0) ? String(t) : t;
          case "bigint":
            return `${String(t)}n`;
          case "boolean":
          case "undefined":
            return String(t);
          case "object":
            return "{}";
        }
      }, "inspect"),
      types: {
        isAsyncFunction: o(function (t) {
          return t instanceof Qh;
        }, "isAsyncFunction"),
        isArrayBufferView: o(function (t) {
          return ArrayBuffer.isView(t);
        }, "isArrayBufferView"),
      },
      isBlob: Zh,
      deprecate: o(function (t, e) {
        return t;
      }, "deprecate"),
      addAbortListener:
        rn().addAbortListener ||
        o(function (e, i) {
          if (e === void 0)
            throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", e);
          mc(e, "signal"), ep(i, "listener");
          let n;
          return (
            e.aborted
              ? queueMicrotask(() => i())
              : (e.addEventListener("abort", i, {
                  __proto__: null,
                  once: !0,
                  [Gh]: !0,
                }),
                (n = o(() => {
                  e.removeEventListener("abort", i);
                }, "removeEventListener"))),
            {
              __proto__: null,
              [Yh]() {
                var r;
                (r = n) === null || r === void 0 || r();
              },
            }
          );
        }, "addAbortListener"),
      AbortSignalAny:
        Xh.any ||
        o(function (e) {
          if (e.length === 1) return e[0];
          let i = new Jh(),
            n = o(() => i.abort(), "abort");
          return (
            e.forEach((r) => {
              mc(r, "signals"), r.addEventListener("abort", n, { once: !0 });
            }),
            i.signal.addEventListener(
              "abort",
              () => {
                e.forEach((r) => r.removeEventListener("abort", n));
              },
              { once: !0 }
            ),
            i.signal
          );
        }, "AbortSignalAny"),
    };
    gs.exports.promisify.custom = Symbol.for("nodejs.util.promisify.custom");
  });
  var ae = O((__, wc) => {
    "use strict";
    var { format: tp, inspect: Kn, AggregateError: ip } = re(),
      np = globalThis.AggregateError || ip,
      rp = Symbol("kIsNodeError"),
      sp = [
        "string",
        "function",
        "number",
        "object",
        "Function",
        "Object",
        "boolean",
        "bigint",
        "symbol",
      ],
      op = /^([A-Z][a-z0-9]*)+$/,
      ap = "__node_internal_",
      Gn = {};
    function jt(t, e) {
      if (!t) throw new Gn.ERR_INTERNAL_ASSERTION(e);
    }
    o(jt, "assert");
    function bc(t) {
      let e = "",
        i = t.length,
        n = t[0] === "-" ? 1 : 0;
      for (; i >= n + 4; i -= 3) e = `_${t.slice(i - 3, i)}${e}`;
      return `${t.slice(0, i)}${e}`;
    }
    o(bc, "addNumericalSeparator");
    function cp(t, e, i) {
      if (typeof e == "function")
        return (
          jt(
            e.length <= i.length,
            `Code: ${t}; The provided arguments length (${i.length}) does not match the required ones (${e.length}).`
          ),
          e(...i)
        );
      let n = (e.match(/%[dfijoOs]/g) || []).length;
      return (
        jt(
          n === i.length,
          `Code: ${t}; The provided arguments length (${i.length}) does not match the required ones (${n}).`
        ),
        i.length === 0 ? e : tp(e, ...i)
      );
    }
    o(cp, "getMessage");
    function ie(t, e, i) {
      i || (i = Error);
      class n extends i {
        static {
          o(this, "NodeError");
        }
        constructor(...s) {
          super(cp(t, e, s));
        }
        toString() {
          return `${this.name} [${t}]: ${this.message}`;
        }
      }
      Object.defineProperties(n.prototype, {
        name: { value: i.name, writable: !0, enumerable: !1, configurable: !0 },
        toString: {
          value: o(function () {
            return `${this.name} [${t}]: ${this.message}`;
          }, "value"),
          writable: !0,
          enumerable: !1,
          configurable: !0,
        },
      }),
        (n.prototype.code = t),
        (n.prototype[rp] = !0),
        (Gn[t] = n);
    }
    o(ie, "E");
    function gc(t) {
      let e = ap + t.name;
      return Object.defineProperty(t, "name", { value: e }), t;
    }
    o(gc, "hideStackFrames");
    function lp(t, e) {
      if (t && e && t !== e) {
        if (Array.isArray(e.errors)) return e.errors.push(t), e;
        let i = new np([e, t], e.message);
        return (i.code = e.code), i;
      }
      return t || e;
    }
    o(lp, "aggregateTwoErrors");
    var ws = class extends Error {
      static {
        o(this, "AbortError");
      }
      constructor(e = "The operation was aborted", i = void 0) {
        if (i !== void 0 && typeof i != "object")
          throw new Gn.ERR_INVALID_ARG_TYPE("options", "Object", i);
        super(e, i), (this.code = "ABORT_ERR"), (this.name = "AbortError");
      }
    };
    ie("ERR_ASSERTION", "%s", Error);
    ie(
      "ERR_INVALID_ARG_TYPE",
      (t, e, i) => {
        jt(typeof t == "string", "'name' must be a string"),
          Array.isArray(e) || (e = [e]);
        let n = "The ";
        t.endsWith(" argument")
          ? (n += `${t} `)
          : (n += `"${t}" ${t.includes(".") ? "property" : "argument"} `),
          (n += "must be ");
        let r = [],
          s = [],
          a = [];
        for (let l of e)
          jt(
            typeof l == "string",
            "All expected entries have to be of type string"
          ),
            sp.includes(l)
              ? r.push(l.toLowerCase())
              : op.test(l)
              ? s.push(l)
              : (jt(
                  l !== "object",
                  'The value "object" should be written as "Object"'
                ),
                a.push(l));
        if (s.length > 0) {
          let l = r.indexOf("object");
          l !== -1 && (r.splice(r, l, 1), s.push("Object"));
        }
        if (r.length > 0) {
          switch (r.length) {
            case 1:
              n += `of type ${r[0]}`;
              break;
            case 2:
              n += `one of type ${r[0]} or ${r[1]}`;
              break;
            default: {
              let l = r.pop();
              n += `one of type ${r.join(", ")}, or ${l}`;
            }
          }
          (s.length > 0 || a.length > 0) && (n += " or ");
        }
        if (s.length > 0) {
          switch (s.length) {
            case 1:
              n += `an instance of ${s[0]}`;
              break;
            case 2:
              n += `an instance of ${s[0]} or ${s[1]}`;
              break;
            default: {
              let l = s.pop();
              n += `an instance of ${s.join(", ")}, or ${l}`;
            }
          }
          a.length > 0 && (n += " or ");
        }
        switch (a.length) {
          case 0:
            break;
          case 1:
            a[0].toLowerCase() !== a[0] && (n += "an "), (n += `${a[0]}`);
            break;
          case 2:
            n += `one of ${a[0]} or ${a[1]}`;
            break;
          default: {
            let l = a.pop();
            n += `one of ${a.join(", ")}, or ${l}`;
          }
        }
        if (i == null) n += `. Received ${i}`;
        else if (typeof i == "function" && i.name)
          n += `. Received function ${i.name}`;
        else if (typeof i == "object") {
          var c;
          if ((c = i.constructor) !== null && c !== void 0 && c.name)
            n += `. Received an instance of ${i.constructor.name}`;
          else {
            let l = Kn(i, { depth: -1 });
            n += `. Received ${l}`;
          }
        } else {
          let l = Kn(i, { colors: !1 });
          l.length > 25 && (l = `${l.slice(0, 25)}...`),
            (n += `. Received type ${typeof i} (${l})`);
        }
        return n;
      },
      TypeError
    );
    ie(
      "ERR_INVALID_ARG_VALUE",
      (t, e, i = "is invalid") => {
        let n = Kn(e);
        return (
          n.length > 128 && (n = n.slice(0, 128) + "..."),
          `The ${
            t.includes(".") ? "property" : "argument"
          } '${t}' ${i}. Received ${n}`
        );
      },
      TypeError
    );
    ie(
      "ERR_INVALID_RETURN_VALUE",
      (t, e, i) => {
        var n;
        let r =
          i != null && (n = i.constructor) !== null && n !== void 0 && n.name
            ? `instance of ${i.constructor.name}`
            : `type ${typeof i}`;
        return `Expected ${t} to be returned from the "${e}" function but got ${r}.`;
      },
      TypeError
    );
    ie(
      "ERR_MISSING_ARGS",
      (...t) => {
        jt(t.length > 0, "At least one arg needs to be specified");
        let e,
          i = t.length;
        switch (
          ((t = (Array.isArray(t) ? t : [t]).map((n) => `"${n}"`).join(" or ")),
          i)
        ) {
          case 1:
            e += `The ${t[0]} argument`;
            break;
          case 2:
            e += `The ${t[0]} and ${t[1]} arguments`;
            break;
          default:
            {
              let n = t.pop();
              e += `The ${t.join(", ")}, and ${n} arguments`;
            }
            break;
        }
        return `${e} must be specified`;
      },
      TypeError
    );
    ie(
      "ERR_OUT_OF_RANGE",
      (t, e, i) => {
        jt(e, 'Missing "range" argument');
        let n;
        return (
          Number.isInteger(i) && Math.abs(i) > 2 ** 32
            ? (n = bc(String(i)))
            : typeof i == "bigint"
            ? ((n = String(i)),
              (i > 2n ** 32n || i < -(2n ** 32n)) && (n = bc(n)),
              (n += "n"))
            : (n = Kn(i)),
          `The value of "${t}" is out of range. It must be ${e}. Received ${n}`
        );
      },
      RangeError
    );
    ie("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error);
    ie("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error);
    ie(
      "ERR_STREAM_ALREADY_FINISHED",
      "Cannot call %s after a stream was finished",
      Error
    );
    ie("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error);
    ie(
      "ERR_STREAM_DESTROYED",
      "Cannot call %s after a stream was destroyed",
      Error
    );
    ie(
      "ERR_STREAM_NULL_VALUES",
      "May not write null values to stream",
      TypeError
    );
    ie("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error);
    ie("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error);
    ie(
      "ERR_STREAM_UNSHIFT_AFTER_END_EVENT",
      "stream.unshift() after end event",
      Error
    );
    ie("ERR_STREAM_WRITE_AFTER_END", "write after end", Error);
    ie("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError);
    wc.exports = {
      AbortError: ws,
      aggregateTwoErrors: gc(lp),
      hideStackFrames: gc,
      codes: Gn,
    };
  });
  var mi = O((x_, Tc) => {
    "use strict";
    var {
        ArrayIsArray: _s,
        ArrayPrototypeIncludes: xc,
        ArrayPrototypeJoin: kc,
        ArrayPrototypeMap: fp,
        NumberIsInteger: Es,
        NumberIsNaN: up,
        NumberMAX_SAFE_INTEGER: dp,
        NumberMIN_SAFE_INTEGER: hp,
        NumberParseInt: pp,
        ObjectPrototypeHasOwnProperty: yp,
        RegExpPrototypeExec: vc,
        String: mp,
        StringPrototypeToUpperCase: bp,
        StringPrototypeTrim: gp,
      } = q(),
      {
        hideStackFrames: Pe,
        codes: {
          ERR_SOCKET_BAD_PORT: wp,
          ERR_INVALID_ARG_TYPE: se,
          ERR_INVALID_ARG_VALUE: yi,
          ERR_OUT_OF_RANGE: qt,
          ERR_UNKNOWN_SIGNAL: Sc,
        },
      } = ae(),
      { normalizeEncoding: Sp } = re(),
      { isAsyncFunction: _p, isArrayBufferView: Ep } = re().types,
      _c = {};
    function xp(t) {
      return t === (t | 0);
    }
    o(xp, "isInt32");
    function kp(t) {
      return t === t >>> 0;
    }
    o(kp, "isUint32");
    var vp = /^[0-7]+$/,
      Fp = "must be a 32-bit unsigned integer or an octal string";
    function Ip(t, e, i) {
      if ((typeof t > "u" && (t = i), typeof t == "string")) {
        if (vc(vp, t) === null) throw new yi(e, t, Fp);
        t = pp(t, 8);
      }
      return Fc(t, e), t;
    }
    o(Ip, "parseFileMode");
    var Ap = Pe((t, e, i = hp, n = dp) => {
        if (typeof t != "number") throw new se(e, "number", t);
        if (!Es(t)) throw new qt(e, "an integer", t);
        if (t < i || t > n) throw new qt(e, `>= ${i} && <= ${n}`, t);
      }),
      Tp = Pe((t, e, i = -2147483648, n = 2147483647) => {
        if (typeof t != "number") throw new se(e, "number", t);
        if (!Es(t)) throw new qt(e, "an integer", t);
        if (t < i || t > n) throw new qt(e, `>= ${i} && <= ${n}`, t);
      }),
      Fc = Pe((t, e, i = !1) => {
        if (typeof t != "number") throw new se(e, "number", t);
        if (!Es(t)) throw new qt(e, "an integer", t);
        let n = i ? 1 : 0,
          r = 4294967295;
        if (t < n || t > r) throw new qt(e, `>= ${n} && <= ${r}`, t);
      });
    function xs(t, e) {
      if (typeof t != "string") throw new se(e, "string", t);
    }
    o(xs, "validateString");
    function Pp(t, e, i = void 0, n) {
      if (typeof t != "number") throw new se(e, "number", t);
      if (
        (i != null && t < i) ||
        (n != null && t > n) ||
        ((i != null || n != null) && up(t))
      )
        throw new qt(
          e,
          `${i != null ? `>= ${i}` : ""}${
            i != null && n != null ? " && " : ""
          }${n != null ? `<= ${n}` : ""}`,
          t
        );
    }
    o(Pp, "validateNumber");
    var Op = Pe((t, e, i) => {
      if (!xc(i, t)) {
        let r =
          "must be one of: " +
          kc(
            fp(i, (s) => (typeof s == "string" ? `'${s}'` : mp(s))),
            ", "
          );
        throw new yi(e, t, r);
      }
    });
    function Ic(t, e) {
      if (typeof t != "boolean") throw new se(e, "boolean", t);
    }
    o(Ic, "validateBoolean");
    function Ss(t, e, i) {
      return t == null || !yp(t, e) ? i : t[e];
    }
    o(Ss, "getOwnPropertyValueOrDefault");
    var Rp = Pe((t, e, i = null) => {
        let n = Ss(i, "allowArray", !1),
          r = Ss(i, "allowFunction", !1);
        if (
          (!Ss(i, "nullable", !1) && t === null) ||
          (!n && _s(t)) ||
          (typeof t != "object" && (!r || typeof t != "function"))
        )
          throw new se(e, "Object", t);
      }),
      Np = Pe((t, e) => {
        if (t != null && typeof t != "object" && typeof t != "function")
          throw new se(e, "a dictionary", t);
      }),
      Yn = Pe((t, e, i = 0) => {
        if (!_s(t)) throw new se(e, "Array", t);
        if (t.length < i) {
          let n = `must be longer than ${i}`;
          throw new yi(e, t, n);
        }
      });
    function Lp(t, e) {
      Yn(t, e);
      for (let i = 0; i < t.length; i++) xs(t[i], `${e}[${i}]`);
    }
    o(Lp, "validateStringArray");
    function Cp(t, e) {
      Yn(t, e);
      for (let i = 0; i < t.length; i++) Ic(t[i], `${e}[${i}]`);
    }
    o(Cp, "validateBooleanArray");
    function Bp(t, e) {
      Yn(t, e);
      for (let i = 0; i < t.length; i++) {
        let n = t[i],
          r = `${e}[${i}]`;
        if (n == null) throw new se(r, "AbortSignal", n);
        Ac(n, r);
      }
    }
    o(Bp, "validateAbortSignalArray");
    function Dp(t, e = "signal") {
      if ((xs(t, e), _c[t] === void 0))
        throw _c[bp(t)] !== void 0
          ? new Sc(t + " (signals must use all capital letters)")
          : new Sc(t);
    }
    o(Dp, "validateSignalName");
    var Mp = Pe((t, e = "buffer") => {
      if (!Ep(t)) throw new se(e, ["Buffer", "TypedArray", "DataView"], t);
    });
    function Wp(t, e) {
      let i = Sp(e),
        n = t.length;
      if (i === "hex" && n % 2 !== 0)
        throw new yi("encoding", e, `is invalid for data of length ${n}`);
    }
    o(Wp, "validateEncoding");
    function Up(t, e = "Port", i = !0) {
      if (
        (typeof t != "number" && typeof t != "string") ||
        (typeof t == "string" && gp(t).length === 0) ||
        +t !== +t >>> 0 ||
        t > 65535 ||
        (t === 0 && !i)
      )
        throw new wp(e, t, i);
      return t | 0;
    }
    o(Up, "validatePort");
    var Ac = Pe((t, e) => {
        if (
          t !== void 0 &&
          (t === null || typeof t != "object" || !("aborted" in t))
        )
          throw new se(e, "AbortSignal", t);
      }),
      jp = Pe((t, e) => {
        if (typeof t != "function") throw new se(e, "Function", t);
      }),
      qp = Pe((t, e) => {
        if (typeof t != "function" || _p(t)) throw new se(e, "Function", t);
      }),
      $p = Pe((t, e) => {
        if (t !== void 0) throw new se(e, "undefined", t);
      });
    function zp(t, e, i) {
      if (!xc(i, t)) throw new se(e, `('${kc(i, "|")}')`, t);
    }
    o(zp, "validateUnion");
    var Vp = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
    function Ec(t, e) {
      if (typeof t > "u" || !vc(Vp, t))
        throw new yi(
          e,
          t,
          'must be an array or string of format "</styles.css>; rel=preload; as=style"'
        );
    }
    o(Ec, "validateLinkHeaderFormat");
    function Hp(t) {
      if (typeof t == "string") return Ec(t, "hints"), t;
      if (_s(t)) {
        let e = t.length,
          i = "";
        if (e === 0) return i;
        for (let n = 0; n < e; n++) {
          let r = t[n];
          Ec(r, "hints"), (i += r), n !== e - 1 && (i += ", ");
        }
        return i;
      }
      throw new yi(
        "hints",
        t,
        'must be an array or string of format "</styles.css>; rel=preload; as=style"'
      );
    }
    o(Hp, "validateLinkHeaderValue");
    Tc.exports = {
      isInt32: xp,
      isUint32: kp,
      parseFileMode: Ip,
      validateArray: Yn,
      validateStringArray: Lp,
      validateBooleanArray: Cp,
      validateAbortSignalArray: Bp,
      validateBoolean: Ic,
      validateBuffer: Mp,
      validateDictionary: Np,
      validateEncoding: Wp,
      validateFunction: jp,
      validateInt32: Tp,
      validateInteger: Ap,
      validateNumber: Pp,
      validateObject: Rp,
      validateOneOf: Op,
      validatePlainFunction: qp,
      validatePort: Up,
      validateSignalName: Dp,
      validateString: xs,
      validateUint32: Fc,
      validateUndefined: $p,
      validateUnion: zp,
      validateAbortSignal: Ac,
      validateLinkHeaderValue: Hp,
    };
  });
  var Ft = O((v_, Nc) => {
    var V = (Nc.exports = {}),
      Ye,
      Xe;
    function ks() {
      throw new Error("setTimeout has not been defined");
    }
    o(ks, "defaultSetTimout");
    function vs() {
      throw new Error("clearTimeout has not been defined");
    }
    o(vs, "defaultClearTimeout");
    (function () {
      try {
        typeof setTimeout == "function" ? (Ye = setTimeout) : (Ye = ks);
      } catch {
        Ye = ks;
      }
      try {
        typeof clearTimeout == "function" ? (Xe = clearTimeout) : (Xe = vs);
      } catch {
        Xe = vs;
      }
    })();
    function Pc(t) {
      if (Ye === setTimeout) return setTimeout(t, 0);
      if ((Ye === ks || !Ye) && setTimeout)
        return (Ye = setTimeout), setTimeout(t, 0);
      try {
        return Ye(t, 0);
      } catch {
        try {
          return Ye.call(null, t, 0);
        } catch {
          return Ye.call(this, t, 0);
        }
      }
    }
    o(Pc, "runTimeout");
    function Kp(t) {
      if (Xe === clearTimeout) return clearTimeout(t);
      if ((Xe === vs || !Xe) && clearTimeout)
        return (Xe = clearTimeout), clearTimeout(t);
      try {
        return Xe(t);
      } catch {
        try {
          return Xe.call(null, t);
        } catch {
          return Xe.call(this, t);
        }
      }
    }
    o(Kp, "runClearTimeout");
    var ut = [],
      bi = !1,
      $t,
      Xn = -1;
    function Gp() {
      !bi ||
        !$t ||
        ((bi = !1),
        $t.length ? (ut = $t.concat(ut)) : (Xn = -1),
        ut.length && Oc());
    }
    o(Gp, "cleanUpNextTick");
    function Oc() {
      if (!bi) {
        var t = Pc(Gp);
        bi = !0;
        for (var e = ut.length; e; ) {
          for ($t = ut, ut = []; ++Xn < e; ) $t && $t[Xn].run();
          (Xn = -1), (e = ut.length);
        }
        ($t = null), (bi = !1), Kp(t);
      }
    }
    o(Oc, "drainQueue");
    V.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
      ut.push(new Rc(t, e)), ut.length === 1 && !bi && Pc(Oc);
    };
    function Rc(t, e) {
      (this.fun = t), (this.array = e);
    }
    o(Rc, "Item");
    Rc.prototype.run = function () {
      this.fun.apply(null, this.array);
    };
    V.title = "browser";
    V.browser = !0;
    V.env = {};
    V.argv = [];
    V.version = "";
    V.versions = {};
    function dt() {}
    o(dt, "noop");
    V.on = dt;
    V.addListener = dt;
    V.once = dt;
    V.off = dt;
    V.removeListener = dt;
    V.removeAllListeners = dt;
    V.emit = dt;
    V.prependListener = dt;
    V.prependOnceListener = dt;
    V.listeners = function (t) {
      return [];
    };
    V.binding = function (t) {
      throw new Error("process.binding is not supported");
    };
    V.cwd = function () {
      return "/";
    };
    V.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    };
    V.umask = function () {
      return 0;
    };
  });
  var Qe = O((I_, Gc) => {
    "use strict";
    var { SymbolAsyncIterator: Lc, SymbolIterator: Cc, SymbolFor: zt } = q(),
      Bc = zt("nodejs.stream.destroyed"),
      Dc = zt("nodejs.stream.errored"),
      Fs = zt("nodejs.stream.readable"),
      Is = zt("nodejs.stream.writable"),
      Mc = zt("nodejs.stream.disturbed"),
      Yp = zt("nodejs.webstream.isClosedPromise"),
      Xp = zt("nodejs.webstream.controllerErrorFunction");
    function Jn(t, e = !1) {
      var i;
      return !!(
        t &&
        typeof t.pipe == "function" &&
        typeof t.on == "function" &&
        (!e ||
          (typeof t.pause == "function" && typeof t.resume == "function")) &&
        (!t._writableState ||
          ((i = t._readableState) === null || i === void 0
            ? void 0
            : i.readable) !== !1) &&
        (!t._writableState || t._readableState)
      );
    }
    o(Jn, "isReadableNodeStream");
    function Qn(t) {
      var e;
      return !!(
        t &&
        typeof t.write == "function" &&
        typeof t.on == "function" &&
        (!t._readableState ||
          ((e = t._writableState) === null || e === void 0
            ? void 0
            : e.writable) !== !1)
      );
    }
    o(Qn, "isWritableNodeStream");
    function Jp(t) {
      return !!(
        t &&
        typeof t.pipe == "function" &&
        t._readableState &&
        typeof t.on == "function" &&
        typeof t.write == "function"
      );
    }
    o(Jp, "isDuplexNodeStream");
    function Je(t) {
      return (
        t &&
        (t._readableState ||
          t._writableState ||
          (typeof t.write == "function" && typeof t.on == "function") ||
          (typeof t.pipe == "function" && typeof t.on == "function"))
      );
    }
    o(Je, "isNodeStream");
    function Wc(t) {
      return !!(
        t &&
        !Je(t) &&
        typeof t.pipeThrough == "function" &&
        typeof t.getReader == "function" &&
        typeof t.cancel == "function"
      );
    }
    o(Wc, "isReadableStream");
    function Uc(t) {
      return !!(
        t &&
        !Je(t) &&
        typeof t.getWriter == "function" &&
        typeof t.abort == "function"
      );
    }
    o(Uc, "isWritableStream");
    function jc(t) {
      return !!(
        t &&
        !Je(t) &&
        typeof t.readable == "object" &&
        typeof t.writable == "object"
      );
    }
    o(jc, "isTransformStream");
    function Qp(t) {
      return Wc(t) || Uc(t) || jc(t);
    }
    o(Qp, "isWebStream");
    function Zp(t, e) {
      return t == null
        ? !1
        : e === !0
        ? typeof t[Lc] == "function"
        : e === !1
        ? typeof t[Cc] == "function"
        : typeof t[Lc] == "function" || typeof t[Cc] == "function";
    }
    o(Zp, "isIterable");
    function Zn(t) {
      if (!Je(t)) return null;
      let e = t._writableState,
        i = t._readableState,
        n = e || i;
      return !!(t.destroyed || t[Bc] || (n != null && n.destroyed));
    }
    o(Zn, "isDestroyed");
    function qc(t) {
      if (!Qn(t)) return null;
      if (t.writableEnded === !0) return !0;
      let e = t._writableState;
      return e != null && e.errored
        ? !1
        : typeof e?.ended != "boolean"
        ? null
        : e.ended;
    }
    o(qc, "isWritableEnded");
    function ey(t, e) {
      if (!Qn(t)) return null;
      if (t.writableFinished === !0) return !0;
      let i = t._writableState;
      return i != null && i.errored
        ? !1
        : typeof i?.finished != "boolean"
        ? null
        : !!(i.finished || (e === !1 && i.ended === !0 && i.length === 0));
    }
    o(ey, "isWritableFinished");
    function ty(t) {
      if (!Jn(t)) return null;
      if (t.readableEnded === !0) return !0;
      let e = t._readableState;
      return !e || e.errored
        ? !1
        : typeof e?.ended != "boolean"
        ? null
        : e.ended;
    }
    o(ty, "isReadableEnded");
    function $c(t, e) {
      if (!Jn(t)) return null;
      let i = t._readableState;
      return i != null && i.errored
        ? !1
        : typeof i?.endEmitted != "boolean"
        ? null
        : !!(i.endEmitted || (e === !1 && i.ended === !0 && i.length === 0));
    }
    o($c, "isReadableFinished");
    function zc(t) {
      return t && t[Fs] != null
        ? t[Fs]
        : typeof t?.readable != "boolean"
        ? null
        : Zn(t)
        ? !1
        : Jn(t) && t.readable && !$c(t);
    }
    o(zc, "isReadable");
    function Vc(t) {
      return t && t[Is] != null
        ? t[Is]
        : typeof t?.writable != "boolean"
        ? null
        : Zn(t)
        ? !1
        : Qn(t) && t.writable && !qc(t);
    }
    o(Vc, "isWritable");
    function iy(t, e) {
      return Je(t)
        ? Zn(t)
          ? !0
          : !((e?.readable !== !1 && zc(t)) || (e?.writable !== !1 && Vc(t)))
        : null;
    }
    o(iy, "isFinished");
    function ny(t) {
      var e, i;
      return Je(t)
        ? t.writableErrored
          ? t.writableErrored
          : (e =
              (i = t._writableState) === null || i === void 0
                ? void 0
                : i.errored) !== null && e !== void 0
          ? e
          : null
        : null;
    }
    o(ny, "isWritableErrored");
    function ry(t) {
      var e, i;
      return Je(t)
        ? t.readableErrored
          ? t.readableErrored
          : (e =
              (i = t._readableState) === null || i === void 0
                ? void 0
                : i.errored) !== null && e !== void 0
          ? e
          : null
        : null;
    }
    o(ry, "isReadableErrored");
    function sy(t) {
      if (!Je(t)) return null;
      if (typeof t.closed == "boolean") return t.closed;
      let e = t._writableState,
        i = t._readableState;
      return typeof e?.closed == "boolean" || typeof i?.closed == "boolean"
        ? e?.closed || i?.closed
        : typeof t._closed == "boolean" && Hc(t)
        ? t._closed
        : null;
    }
    o(sy, "isClosed");
    function Hc(t) {
      return (
        typeof t._closed == "boolean" &&
        typeof t._defaultKeepAlive == "boolean" &&
        typeof t._removedConnection == "boolean" &&
        typeof t._removedContLen == "boolean"
      );
    }
    o(Hc, "isOutgoingMessage");
    function Kc(t) {
      return typeof t._sent100 == "boolean" && Hc(t);
    }
    o(Kc, "isServerResponse");
    function oy(t) {
      var e;
      return (
        typeof t._consuming == "boolean" &&
        typeof t._dumped == "boolean" &&
        ((e = t.req) === null || e === void 0 ? void 0 : e.upgradeOrConnect) ===
          void 0
      );
    }
    o(oy, "isServerRequest");
    function ay(t) {
      if (!Je(t)) return null;
      let e = t._writableState,
        i = t._readableState,
        n = e || i;
      return (
        (!n && Kc(t)) ||
        !!(n && n.autoDestroy && n.emitClose && n.closed === !1)
      );
    }
    o(ay, "willEmitClose");
    function cy(t) {
      var e;
      return !!(
        t &&
        ((e = t[Mc]) !== null && e !== void 0
          ? e
          : t.readableDidRead || t.readableAborted)
      );
    }
    o(cy, "isDisturbed");
    function ly(t) {
      var e, i, n, r, s, a, c, l, f, d;
      return !!(
        t &&
        ((e =
          (i =
            (n =
              (r =
                (s =
                  (a = t[Dc]) !== null && a !== void 0
                    ? a
                    : t.readableErrored) !== null && s !== void 0
                  ? s
                  : t.writableErrored) !== null && r !== void 0
                ? r
                : (c = t._readableState) === null || c === void 0
                ? void 0
                : c.errorEmitted) !== null && n !== void 0
              ? n
              : (l = t._writableState) === null || l === void 0
              ? void 0
              : l.errorEmitted) !== null && i !== void 0
            ? i
            : (f = t._readableState) === null || f === void 0
            ? void 0
            : f.errored) !== null && e !== void 0
          ? e
          : !((d = t._writableState) === null || d === void 0) && d.errored)
      );
    }
    o(ly, "isErrored");
    Gc.exports = {
      isDestroyed: Zn,
      kIsDestroyed: Bc,
      isDisturbed: cy,
      kIsDisturbed: Mc,
      isErrored: ly,
      kIsErrored: Dc,
      isReadable: zc,
      kIsReadable: Fs,
      kIsClosedPromise: Yp,
      kControllerErrorFunction: Xp,
      kIsWritable: Is,
      isClosed: sy,
      isDuplexNodeStream: Jp,
      isFinished: iy,
      isIterable: Zp,
      isReadableNodeStream: Jn,
      isReadableStream: Wc,
      isReadableEnded: ty,
      isReadableFinished: $c,
      isReadableErrored: ry,
      isNodeStream: Je,
      isWebStream: Qp,
      isWritable: Vc,
      isWritableNodeStream: Qn,
      isWritableStream: Uc,
      isWritableEnded: qc,
      isWritableFinished: ey,
      isWritableErrored: ny,
      isServerRequest: oy,
      isServerResponse: Kc,
      willEmitClose: ay,
      isTransformStream: jc,
    };
  });
  var ht = O((T_, Rs) => {
    var It = Ft(),
      { AbortError: nl, codes: fy } = ae(),
      { ERR_INVALID_ARG_TYPE: uy, ERR_STREAM_PREMATURE_CLOSE: Yc } = fy,
      { kEmptyObject: Ts, once: Ps } = re(),
      {
        validateAbortSignal: dy,
        validateFunction: hy,
        validateObject: py,
        validateBoolean: yy,
      } = mi(),
      { Promise: my, PromisePrototypeThen: by, SymbolDispose: rl } = q(),
      {
        isClosed: gy,
        isReadable: Xc,
        isReadableNodeStream: As,
        isReadableStream: wy,
        isReadableFinished: Jc,
        isReadableErrored: Qc,
        isWritable: Zc,
        isWritableNodeStream: el,
        isWritableStream: Sy,
        isWritableFinished: tl,
        isWritableErrored: il,
        isNodeStream: _y,
        willEmitClose: Ey,
        kIsClosedPromise: xy,
      } = Qe(),
      gi;
    function ky(t) {
      return t.setHeader && typeof t.abort == "function";
    }
    o(ky, "isRequest");
    var Os = o(() => {}, "nop");
    function sl(t, e, i) {
      var n, r;
      if (
        (arguments.length === 2
          ? ((i = e), (e = Ts))
          : e == null
          ? (e = Ts)
          : py(e, "options"),
        hy(i, "callback"),
        dy(e.signal, "options.signal"),
        (i = Ps(i)),
        wy(t) || Sy(t))
      )
        return vy(t, e, i);
      if (!_y(t))
        throw new uy(
          "stream",
          ["ReadableStream", "WritableStream", "Stream"],
          t
        );
      let s = (n = e.readable) !== null && n !== void 0 ? n : As(t),
        a = (r = e.writable) !== null && r !== void 0 ? r : el(t),
        c = t._writableState,
        l = t._readableState,
        f = o(() => {
          t.writable || b();
        }, "onlegacyfinish"),
        d = Ey(t) && As(t) === s && el(t) === a,
        h = tl(t, !1),
        b = o(() => {
          (h = !0),
            t.destroyed && (d = !1),
            !(d && (!t.readable || s)) && (!s || y) && i.call(t);
        }, "onfinish"),
        y = Jc(t, !1),
        S = o(() => {
          (y = !0),
            t.destroyed && (d = !1),
            !(d && (!t.writable || a)) && (!a || h) && i.call(t);
        }, "onend"),
        g = o((K) => {
          i.call(t, K);
        }, "onerror"),
        I = gy(t),
        k = o(() => {
          I = !0;
          let K = il(t) || Qc(t);
          if (K && typeof K != "boolean") return i.call(t, K);
          if (s && !y && As(t, !0) && !Jc(t, !1)) return i.call(t, new Yc());
          if (a && !h && !tl(t, !1)) return i.call(t, new Yc());
          i.call(t);
        }, "onclose"),
        A = o(() => {
          I = !0;
          let K = il(t) || Qc(t);
          if (K && typeof K != "boolean") return i.call(t, K);
          i.call(t);
        }, "onclosed"),
        L = o(() => {
          t.req.on("finish", b);
        }, "onrequest");
      ky(t)
        ? (t.on("complete", b),
          d || t.on("abort", k),
          t.req ? L() : t.on("request", L))
        : a && !c && (t.on("end", f), t.on("close", f)),
        !d && typeof t.aborted == "boolean" && t.on("aborted", k),
        t.on("end", S),
        t.on("finish", b),
        e.error !== !1 && t.on("error", g),
        t.on("close", k),
        I
          ? It.nextTick(k)
          : (c != null && c.errorEmitted) || (l != null && l.errorEmitted)
          ? d || It.nextTick(A)
          : ((!s && (!d || Xc(t)) && (h || Zc(t) === !1)) ||
              (!a && (!d || Zc(t)) && (y || Xc(t) === !1)) ||
              (l && t.req && t.aborted)) &&
            It.nextTick(A);
      let P = o(() => {
        (i = Os),
          t.removeListener("aborted", k),
          t.removeListener("complete", b),
          t.removeListener("abort", k),
          t.removeListener("request", L),
          t.req && t.req.removeListener("finish", b),
          t.removeListener("end", f),
          t.removeListener("close", f),
          t.removeListener("finish", b),
          t.removeListener("end", S),
          t.removeListener("error", g),
          t.removeListener("close", k);
      }, "cleanup");
      if (e.signal && !I) {
        let K = o(() => {
          let Rt = i;
          P(), Rt.call(t, new nl(void 0, { cause: e.signal.reason }));
        }, "abort");
        if (e.signal.aborted) It.nextTick(K);
        else {
          gi = gi || re().addAbortListener;
          let Rt = gi(e.signal, K),
            Se = i;
          i = Ps((...ei) => {
            Rt[rl](), Se.apply(t, ei);
          });
        }
      }
      return P;
    }
    o(sl, "eos");
    function vy(t, e, i) {
      let n = !1,
        r = Os;
      if (e.signal)
        if (
          ((r = o(() => {
            (n = !0), i.call(t, new nl(void 0, { cause: e.signal.reason }));
          }, "abort")),
          e.signal.aborted)
        )
          It.nextTick(r);
        else {
          gi = gi || re().addAbortListener;
          let a = gi(e.signal, r),
            c = i;
          i = Ps((...l) => {
            a[rl](), c.apply(t, l);
          });
        }
      let s = o((...a) => {
        n || It.nextTick(() => i.apply(t, a));
      }, "resolverFn");
      return by(t[xy].promise, s, s), Os;
    }
    o(vy, "eosWeb");
    function Fy(t, e) {
      var i;
      let n = !1;
      return (
        e === null && (e = Ts),
        (i = e) !== null &&
          i !== void 0 &&
          i.cleanup &&
          (yy(e.cleanup, "cleanup"), (n = e.cleanup)),
        new my((r, s) => {
          let a = sl(t, e, (c) => {
            n && a(), c ? s(c) : r();
          });
        })
      );
    }
    o(Fy, "finished");
    Rs.exports = sl;
    Rs.exports.finished = Fy;
  });
  var Vt = O((O_, hl) => {
    "use strict";
    var Ze = Ft(),
      {
        aggregateTwoErrors: Iy,
        codes: { ERR_MULTIPLE_CALLBACK: Ay },
        AbortError: Ty,
      } = ae(),
      { Symbol: cl } = q(),
      {
        kIsDestroyed: Py,
        isDestroyed: Oy,
        isFinished: Ry,
        isServerRequest: Ny,
      } = Qe(),
      ll = cl("kDestroy"),
      Ns = cl("kConstruct");
    function fl(t, e, i) {
      t &&
        (t.stack,
        e && !e.errored && (e.errored = t),
        i && !i.errored && (i.errored = t));
    }
    o(fl, "checkError");
    function Ly(t, e) {
      let i = this._readableState,
        n = this._writableState,
        r = n || i;
      return (n != null && n.destroyed) || (i != null && i.destroyed)
        ? (typeof e == "function" && e(), this)
        : (fl(t, n, i),
          n && (n.destroyed = !0),
          i && (i.destroyed = !0),
          r.constructed
            ? ol(this, t, e)
            : this.once(ll, function (s) {
                ol(this, Iy(s, t), e);
              }),
          this);
    }
    o(Ly, "destroy");
    function ol(t, e, i) {
      let n = !1;
      function r(s) {
        if (n) return;
        n = !0;
        let a = t._readableState,
          c = t._writableState;
        fl(s, c, a),
          c && (c.closed = !0),
          a && (a.closed = !0),
          typeof i == "function" && i(s),
          s ? Ze.nextTick(Cy, t, s) : Ze.nextTick(ul, t);
      }
      o(r, "onDestroy");
      try {
        t._destroy(e || null, r);
      } catch (s) {
        r(s);
      }
    }
    o(ol, "_destroy");
    function Cy(t, e) {
      Ls(t, e), ul(t);
    }
    o(Cy, "emitErrorCloseNT");
    function ul(t) {
      let e = t._readableState,
        i = t._writableState;
      i && (i.closeEmitted = !0),
        e && (e.closeEmitted = !0),
        ((i != null && i.emitClose) || (e != null && e.emitClose)) &&
          t.emit("close");
    }
    o(ul, "emitCloseNT");
    function Ls(t, e) {
      let i = t._readableState,
        n = t._writableState;
      (n != null && n.errorEmitted) ||
        (i != null && i.errorEmitted) ||
        (n && (n.errorEmitted = !0),
        i && (i.errorEmitted = !0),
        t.emit("error", e));
    }
    o(Ls, "emitErrorNT");
    function By() {
      let t = this._readableState,
        e = this._writableState;
      t &&
        ((t.constructed = !0),
        (t.closed = !1),
        (t.closeEmitted = !1),
        (t.destroyed = !1),
        (t.errored = null),
        (t.errorEmitted = !1),
        (t.reading = !1),
        (t.ended = t.readable === !1),
        (t.endEmitted = t.readable === !1)),
        e &&
          ((e.constructed = !0),
          (e.destroyed = !1),
          (e.closed = !1),
          (e.closeEmitted = !1),
          (e.errored = null),
          (e.errorEmitted = !1),
          (e.finalCalled = !1),
          (e.prefinished = !1),
          (e.ended = e.writable === !1),
          (e.ending = e.writable === !1),
          (e.finished = e.writable === !1));
    }
    o(By, "undestroy");
    function Cs(t, e, i) {
      let n = t._readableState,
        r = t._writableState;
      if ((r != null && r.destroyed) || (n != null && n.destroyed)) return this;
      (n != null && n.autoDestroy) || (r != null && r.autoDestroy)
        ? t.destroy(e)
        : e &&
          (e.stack,
          r && !r.errored && (r.errored = e),
          n && !n.errored && (n.errored = e),
          i ? Ze.nextTick(Ls, t, e) : Ls(t, e));
    }
    o(Cs, "errorOrDestroy");
    function Dy(t, e) {
      if (typeof t._construct != "function") return;
      let i = t._readableState,
        n = t._writableState;
      i && (i.constructed = !1),
        n && (n.constructed = !1),
        t.once(Ns, e),
        !(t.listenerCount(Ns) > 1) && Ze.nextTick(My, t);
    }
    o(Dy, "construct");
    function My(t) {
      let e = !1;
      function i(n) {
        if (e) {
          Cs(t, n ?? new Ay());
          return;
        }
        e = !0;
        let r = t._readableState,
          s = t._writableState,
          a = s || r;
        r && (r.constructed = !0),
          s && (s.constructed = !0),
          a.destroyed ? t.emit(ll, n) : n ? Cs(t, n, !0) : Ze.nextTick(Wy, t);
      }
      o(i, "onConstruct");
      try {
        t._construct((n) => {
          Ze.nextTick(i, n);
        });
      } catch (n) {
        Ze.nextTick(i, n);
      }
    }
    o(My, "constructNT");
    function Wy(t) {
      t.emit(Ns);
    }
    o(Wy, "emitConstructNT");
    function al(t) {
      return t?.setHeader && typeof t.abort == "function";
    }
    o(al, "isRequest");
    function dl(t) {
      t.emit("close");
    }
    o(dl, "emitCloseLegacy");
    function Uy(t, e) {
      t.emit("error", e), Ze.nextTick(dl, t);
    }
    o(Uy, "emitErrorCloseLegacy");
    function jy(t, e) {
      !t ||
        Oy(t) ||
        (!e && !Ry(t) && (e = new Ty()),
        Ny(t)
          ? ((t.socket = null), t.destroy(e))
          : al(t)
          ? t.abort()
          : al(t.req)
          ? t.req.abort()
          : typeof t.destroy == "function"
          ? t.destroy(e)
          : typeof t.close == "function"
          ? t.close()
          : e
          ? Ze.nextTick(Uy, t, e)
          : Ze.nextTick(dl, t),
        t.destroyed || (t[Py] = !0));
    }
    o(jy, "destroyer");
    hl.exports = {
      construct: Dy,
      destroyer: jy,
      destroy: Ly,
      undestroy: By,
      errorOrDestroy: Cs,
    };
  });
  var ir = O((N_, yl) => {
    "use strict";
    var { ArrayIsArray: qy, ObjectSetPrototypeOf: pl } = q(),
      { EventEmitter: er } = rn();
    function tr(t) {
      er.call(this, t);
    }
    o(tr, "Stream");
    pl(tr.prototype, er.prototype);
    pl(tr, er);
    tr.prototype.pipe = function (t, e) {
      let i = this;
      function n(d) {
        t.writable && t.write(d) === !1 && i.pause && i.pause();
      }
      o(n, "ondata"), i.on("data", n);
      function r() {
        i.readable && i.resume && i.resume();
      }
      o(r, "ondrain"),
        t.on("drain", r),
        !t._isStdio &&
          (!e || e.end !== !1) &&
          (i.on("end", a), i.on("close", c));
      let s = !1;
      function a() {
        s || ((s = !0), t.end());
      }
      o(a, "onend");
      function c() {
        s || ((s = !0), typeof t.destroy == "function" && t.destroy());
      }
      o(c, "onclose");
      function l(d) {
        f(), er.listenerCount(this, "error") === 0 && this.emit("error", d);
      }
      o(l, "onerror"), Bs(i, "error", l), Bs(t, "error", l);
      function f() {
        i.removeListener("data", n),
          t.removeListener("drain", r),
          i.removeListener("end", a),
          i.removeListener("close", c),
          i.removeListener("error", l),
          t.removeListener("error", l),
          i.removeListener("end", f),
          i.removeListener("close", f),
          t.removeListener("close", f);
      }
      return (
        o(f, "cleanup"),
        i.on("end", f),
        i.on("close", f),
        t.on("close", f),
        t.emit("pipe", i),
        t
      );
    };
    function Bs(t, e, i) {
      if (typeof t.prependListener == "function")
        return t.prependListener(e, i);
      !t._events || !t._events[e]
        ? t.on(e, i)
        : qy(t._events[e])
        ? t._events[e].unshift(i)
        : (t._events[e] = [i, t._events[e]]);
    }
    o(Bs, "prependListener");
    yl.exports = { Stream: tr, prependListener: Bs };
  });
  var sn = O((C_, nr) => {
    "use strict";
    var { SymbolDispose: $y } = q(),
      { AbortError: ml, codes: zy } = ae(),
      {
        isNodeStream: bl,
        isWebStream: Vy,
        kControllerErrorFunction: Hy,
      } = Qe(),
      Ky = ht(),
      { ERR_INVALID_ARG_TYPE: gl } = zy,
      Ds,
      Gy = o((t, e) => {
        if (typeof t != "object" || !("aborted" in t))
          throw new gl(e, "AbortSignal", t);
      }, "validateAbortSignal");
    nr.exports.addAbortSignal = o(function (e, i) {
      if ((Gy(e, "signal"), !bl(i) && !Vy(i)))
        throw new gl(
          "stream",
          ["ReadableStream", "WritableStream", "Stream"],
          i
        );
      return nr.exports.addAbortSignalNoValidate(e, i);
    }, "addAbortSignal");
    nr.exports.addAbortSignalNoValidate = function (t, e) {
      if (typeof t != "object" || !("aborted" in t)) return e;
      let i = bl(e)
        ? () => {
            e.destroy(new ml(void 0, { cause: t.reason }));
          }
        : () => {
            e[Hy](new ml(void 0, { cause: t.reason }));
          };
      if (t.aborted) i();
      else {
        Ds = Ds || re().addAbortListener;
        let n = Ds(t, i);
        Ky(e, n[$y]);
      }
      return e;
    };
  });
  var _l = O((M_, Sl) => {
    "use strict";
    var {
        StringPrototypeSlice: wl,
        SymbolIterator: Yy,
        TypedArrayPrototypeSet: rr,
        Uint8Array: Xy,
      } = q(),
      { Buffer: Ms } = ve(),
      { inspect: Jy } = re();
    Sl.exports = class {
      static {
        o(this, "BufferList");
      }
      constructor() {
        (this.head = null), (this.tail = null), (this.length = 0);
      }
      push(e) {
        let i = { data: e, next: null };
        this.length > 0 ? (this.tail.next = i) : (this.head = i),
          (this.tail = i),
          ++this.length;
      }
      unshift(e) {
        let i = { data: e, next: this.head };
        this.length === 0 && (this.tail = i), (this.head = i), ++this.length;
      }
      shift() {
        if (this.length === 0) return;
        let e = this.head.data;
        return (
          this.length === 1
            ? (this.head = this.tail = null)
            : (this.head = this.head.next),
          --this.length,
          e
        );
      }
      clear() {
        (this.head = this.tail = null), (this.length = 0);
      }
      join(e) {
        if (this.length === 0) return "";
        let i = this.head,
          n = "" + i.data;
        for (; (i = i.next) !== null; ) n += e + i.data;
        return n;
      }
      concat(e) {
        if (this.length === 0) return Ms.alloc(0);
        let i = Ms.allocUnsafe(e >>> 0),
          n = this.head,
          r = 0;
        for (; n; ) rr(i, n.data, r), (r += n.data.length), (n = n.next);
        return i;
      }
      consume(e, i) {
        let n = this.head.data;
        if (e < n.length) {
          let r = n.slice(0, e);
          return (this.head.data = n.slice(e)), r;
        }
        return e === n.length
          ? this.shift()
          : i
          ? this._getString(e)
          : this._getBuffer(e);
      }
      first() {
        return this.head.data;
      }
      *[Yy]() {
        for (let e = this.head; e; e = e.next) yield e.data;
      }
      _getString(e) {
        let i = "",
          n = this.head,
          r = 0;
        do {
          let s = n.data;
          if (e > s.length) (i += s), (e -= s.length);
          else {
            e === s.length
              ? ((i += s),
                ++r,
                n.next ? (this.head = n.next) : (this.head = this.tail = null))
              : ((i += wl(s, 0, e)), (this.head = n), (n.data = wl(s, e)));
            break;
          }
          ++r;
        } while ((n = n.next) !== null);
        return (this.length -= r), i;
      }
      _getBuffer(e) {
        let i = Ms.allocUnsafe(e),
          n = e,
          r = this.head,
          s = 0;
        do {
          let a = r.data;
          if (e > a.length) rr(i, a, n - e), (e -= a.length);
          else {
            e === a.length
              ? (rr(i, a, n - e),
                ++s,
                r.next ? (this.head = r.next) : (this.head = this.tail = null))
              : (rr(i, new Xy(a.buffer, a.byteOffset, e), n - e),
                (this.head = r),
                (r.data = a.slice(e)));
            break;
          }
          ++s;
        } while ((r = r.next) !== null);
        return (this.length -= s), i;
      }
      [Symbol.for("nodejs.util.inspect.custom")](e, i) {
        return Jy(this, { ...i, depth: 0, customInspect: !1 });
      }
    };
  });
  var on = O((U_, vl) => {
    "use strict";
    var { MathFloor: Qy, NumberIsInteger: Zy } = q(),
      { validateInteger: em } = mi(),
      { ERR_INVALID_ARG_VALUE: tm } = ae().codes,
      El = 16 * 1024,
      xl = 16;
    function im(t, e, i) {
      return t.highWaterMark != null ? t.highWaterMark : e ? t[i] : null;
    }
    o(im, "highWaterMarkFrom");
    function kl(t) {
      return t ? xl : El;
    }
    o(kl, "getDefaultHighWaterMark");
    function nm(t, e) {
      em(e, "value", 0), t ? (xl = e) : (El = e);
    }
    o(nm, "setDefaultHighWaterMark");
    function rm(t, e, i, n) {
      let r = im(e, n, i);
      if (r != null) {
        if (!Zy(r) || r < 0) {
          let s = n ? `options.${i}` : "options.highWaterMark";
          throw new tm(s, r);
        }
        return Qy(r);
      }
      return kl(t.objectMode);
    }
    o(rm, "getHighWaterMark");
    vl.exports = {
      getHighWaterMark: rm,
      getDefaultHighWaterMark: kl,
      setDefaultHighWaterMark: nm,
    };
  });
  var Al = O((Ws, Il) => {
    var sr = ve(),
      et = sr.Buffer;
    function Fl(t, e) {
      for (var i in t) e[i] = t[i];
    }
    o(Fl, "copyProps");
    et.from && et.alloc && et.allocUnsafe && et.allocUnsafeSlow
      ? (Il.exports = sr)
      : (Fl(sr, Ws), (Ws.Buffer = Ht));
    function Ht(t, e, i) {
      return et(t, e, i);
    }
    o(Ht, "SafeBuffer");
    Ht.prototype = Object.create(et.prototype);
    Fl(et, Ht);
    Ht.from = function (t, e, i) {
      if (typeof t == "number")
        throw new TypeError("Argument must not be a number");
      return et(t, e, i);
    };
    Ht.alloc = function (t, e, i) {
      if (typeof t != "number")
        throw new TypeError("Argument must be a number");
      var n = et(t);
      return (
        e !== void 0
          ? typeof i == "string"
            ? n.fill(e, i)
            : n.fill(e)
          : n.fill(0),
        n
      );
    };
    Ht.allocUnsafe = function (t) {
      if (typeof t != "number")
        throw new TypeError("Argument must be a number");
      return et(t);
    };
    Ht.allocUnsafeSlow = function (t) {
      if (typeof t != "number")
        throw new TypeError("Argument must be a number");
      return sr.SlowBuffer(t);
    };
  });
  var Ol = O((Pl) => {
    "use strict";
    var js = Al().Buffer,
      Tl =
        js.isEncoding ||
        function (t) {
          switch (((t = "" + t), t && t.toLowerCase())) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
            case "raw":
              return !0;
            default:
              return !1;
          }
        };
    function sm(t) {
      if (!t) return "utf8";
      for (var e; ; )
        switch (t) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return t;
          default:
            if (e) return;
            (t = ("" + t).toLowerCase()), (e = !0);
        }
    }
    o(sm, "_normalizeEncoding");
    function om(t) {
      var e = sm(t);
      if (typeof e != "string" && (js.isEncoding === Tl || !Tl(t)))
        throw new Error("Unknown encoding: " + t);
      return e || t;
    }
    o(om, "normalizeEncoding");
    Pl.StringDecoder = an;
    function an(t) {
      this.encoding = om(t);
      var e;
      switch (this.encoding) {
        case "utf16le":
          (this.text = dm), (this.end = hm), (e = 4);
          break;
        case "utf8":
          (this.fillLast = lm), (e = 4);
          break;
        case "base64":
          (this.text = pm), (this.end = ym), (e = 3);
          break;
        default:
          (this.write = mm), (this.end = bm);
          return;
      }
      (this.lastNeed = 0),
        (this.lastTotal = 0),
        (this.lastChar = js.allocUnsafe(e));
    }
    o(an, "StringDecoder");
    an.prototype.write = function (t) {
      if (t.length === 0) return "";
      var e, i;
      if (this.lastNeed) {
        if (((e = this.fillLast(t)), e === void 0)) return "";
        (i = this.lastNeed), (this.lastNeed = 0);
      } else i = 0;
      return i < t.length
        ? e
          ? e + this.text(t, i)
          : this.text(t, i)
        : e || "";
    };
    an.prototype.end = um;
    an.prototype.text = fm;
    an.prototype.fillLast = function (t) {
      if (this.lastNeed <= t.length)
        return (
          t.copy(
            this.lastChar,
            this.lastTotal - this.lastNeed,
            0,
            this.lastNeed
          ),
          this.lastChar.toString(this.encoding, 0, this.lastTotal)
        );
      t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length),
        (this.lastNeed -= t.length);
    };
    function Us(t) {
      return t <= 127
        ? 0
        : t >> 5 === 6
        ? 2
        : t >> 4 === 14
        ? 3
        : t >> 3 === 30
        ? 4
        : t >> 6 === 2
        ? -1
        : -2;
    }
    o(Us, "utf8CheckByte");
    function am(t, e, i) {
      var n = e.length - 1;
      if (n < i) return 0;
      var r = Us(e[n]);
      return r >= 0
        ? (r > 0 && (t.lastNeed = r - 1), r)
        : --n < i || r === -2
        ? 0
        : ((r = Us(e[n])),
          r >= 0
            ? (r > 0 && (t.lastNeed = r - 2), r)
            : --n < i || r === -2
            ? 0
            : ((r = Us(e[n])),
              r >= 0
                ? (r > 0 && (r === 2 ? (r = 0) : (t.lastNeed = r - 3)), r)
                : 0));
    }
    o(am, "utf8CheckIncomplete");
    function cm(t, e, i) {
      if ((e[0] & 192) !== 128) return (t.lastNeed = 0), "\uFFFD";
      if (t.lastNeed > 1 && e.length > 1) {
        if ((e[1] & 192) !== 128) return (t.lastNeed = 1), "\uFFFD";
        if (t.lastNeed > 2 && e.length > 2 && (e[2] & 192) !== 128)
          return (t.lastNeed = 2), "\uFFFD";
      }
    }
    o(cm, "utf8CheckExtraBytes");
    function lm(t) {
      var e = this.lastTotal - this.lastNeed,
        i = cm(this, t, e);
      if (i !== void 0) return i;
      if (this.lastNeed <= t.length)
        return (
          t.copy(this.lastChar, e, 0, this.lastNeed),
          this.lastChar.toString(this.encoding, 0, this.lastTotal)
        );
      t.copy(this.lastChar, e, 0, t.length), (this.lastNeed -= t.length);
    }
    o(lm, "utf8FillLast");
    function fm(t, e) {
      var i = am(this, t, e);
      if (!this.lastNeed) return t.toString("utf8", e);
      this.lastTotal = i;
      var n = t.length - (i - this.lastNeed);
      return t.copy(this.lastChar, 0, n), t.toString("utf8", e, n);
    }
    o(fm, "utf8Text");
    function um(t) {
      var e = t && t.length ? this.write(t) : "";
      return this.lastNeed ? e + "\uFFFD" : e;
    }
    o(um, "utf8End");
    function dm(t, e) {
      if ((t.length - e) % 2 === 0) {
        var i = t.toString("utf16le", e);
        if (i) {
          var n = i.charCodeAt(i.length - 1);
          if (n >= 55296 && n <= 56319)
            return (
              (this.lastNeed = 2),
              (this.lastTotal = 4),
              (this.lastChar[0] = t[t.length - 2]),
              (this.lastChar[1] = t[t.length - 1]),
              i.slice(0, -1)
            );
        }
        return i;
      }
      return (
        (this.lastNeed = 1),
        (this.lastTotal = 2),
        (this.lastChar[0] = t[t.length - 1]),
        t.toString("utf16le", e, t.length - 1)
      );
    }
    o(dm, "utf16Text");
    function hm(t) {
      var e = t && t.length ? this.write(t) : "";
      if (this.lastNeed) {
        var i = this.lastTotal - this.lastNeed;
        return e + this.lastChar.toString("utf16le", 0, i);
      }
      return e;
    }
    o(hm, "utf16End");
    function pm(t, e) {
      var i = (t.length - e) % 3;
      return i === 0
        ? t.toString("base64", e)
        : ((this.lastNeed = 3 - i),
          (this.lastTotal = 3),
          i === 1
            ? (this.lastChar[0] = t[t.length - 1])
            : ((this.lastChar[0] = t[t.length - 2]),
              (this.lastChar[1] = t[t.length - 1])),
          t.toString("base64", e, t.length - i));
    }
    o(pm, "base64Text");
    function ym(t) {
      var e = t && t.length ? this.write(t) : "";
      return this.lastNeed
        ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed)
        : e;
    }
    o(ym, "base64End");
    function mm(t) {
      return t.toString(this.encoding);
    }
    o(mm, "simpleWrite");
    function bm(t) {
      return t && t.length ? this.write(t) : "";
    }
    o(bm, "simpleEnd");
  });
  var qs = O((V_, Cl) => {
    "use strict";
    var Rl = Ft(),
      {
        PromisePrototypeThen: gm,
        SymbolAsyncIterator: Nl,
        SymbolIterator: Ll,
      } = q(),
      { Buffer: wm } = ve(),
      { ERR_INVALID_ARG_TYPE: Sm, ERR_STREAM_NULL_VALUES: _m } = ae().codes;
    function Em(t, e, i) {
      let n;
      if (typeof e == "string" || e instanceof wm)
        return new t({
          objectMode: !0,
          ...i,
          read: o(function () {
            this.push(e), this.push(null);
          }, "read"),
        });
      let r;
      if (e && e[Nl]) (r = !0), (n = e[Nl]());
      else if (e && e[Ll]) (r = !1), (n = e[Ll]());
      else throw new Sm("iterable", ["Iterable"], e);
      let s = new t({ objectMode: !0, highWaterMark: 1, ...i }),
        a = !1;
      (s._read = function () {
        a || ((a = !0), l());
      }),
        (s._destroy = function (f, d) {
          gm(
            c(f),
            () => Rl.nextTick(d, f),
            (h) => Rl.nextTick(d, h || f)
          );
        });
      async function c(f) {
        let d = f != null,
          h = typeof n.throw == "function";
        if (d && h) {
          let { value: b, done: y } = await n.throw(f);
          if ((await b, y)) return;
        }
        if (typeof n.return == "function") {
          let { value: b } = await n.return();
          await b;
        }
      }
      o(c, "close");
      async function l() {
        for (;;) {
          try {
            let { value: f, done: d } = r ? await n.next() : n.next();
            if (d) s.push(null);
            else {
              let h = f && typeof f.then == "function" ? await f : f;
              if (h === null) throw ((a = !1), new _m());
              if (s.push(h)) continue;
              a = !1;
            }
          } catch (f) {
            s.destroy(f);
          }
          break;
        }
      }
      return o(l, "next"), s;
    }
    o(Em, "from");
    Cl.exports = Em;
  });
  var ln = O((K_, Zl) => {
    var Ce = Ft(),
      {
        ArrayPrototypeIndexOf: xm,
        NumberIsInteger: km,
        NumberIsNaN: vm,
        NumberParseInt: Fm,
        ObjectDefineProperties: Xs,
        ObjectKeys: Im,
        ObjectSetPrototypeOf: Ml,
        Promise: Wl,
        SafeSet: Am,
        SymbolAsyncDispose: Tm,
        SymbolAsyncIterator: Pm,
        Symbol: Om,
      } = q();
    Zl.exports = F;
    F.ReadableState = lr;
    var { EventEmitter: Rm } = rn(),
      { Stream: At, prependListener: Nm } = ir(),
      { Buffer: $s } = ve(),
      { addAbortSignal: Lm } = sn(),
      Ul = ht(),
      T = re().debuglog("stream", (t) => {
        T = t;
      }),
      Cm = _l(),
      _i = Vt(),
      { getHighWaterMark: Bm, getDefaultHighWaterMark: Dm } = on(),
      {
        aggregateTwoErrors: Bl,
        codes: {
          ERR_INVALID_ARG_TYPE: Mm,
          ERR_METHOD_NOT_IMPLEMENTED: Wm,
          ERR_OUT_OF_RANGE: Um,
          ERR_STREAM_PUSH_AFTER_EOF: jm,
          ERR_STREAM_UNSHIFT_AFTER_END_EVENT: qm,
        },
        AbortError: $m,
      } = ae(),
      { validateObject: zm } = mi(),
      Kt = Om("kPaused"),
      { StringDecoder: jl } = Ol(),
      Vm = qs();
    Ml(F.prototype, At.prototype);
    Ml(F, At);
    var zs = o(() => {}, "nop"),
      { errorOrDestroy: wi } = _i,
      Si = 1,
      Hm = 2,
      ql = 4,
      cn = 8,
      $l = 16,
      or = 32,
      ar = 64,
      zl = 128,
      Km = 256,
      Gm = 512,
      Ym = 1024,
      Gs = 2048,
      Ys = 4096,
      Xm = 8192,
      Jm = 16384,
      Qm = 32768,
      Vl = 65536,
      Zm = 1 << 17,
      eb = 1 << 18;
    function Q(t) {
      return {
        enumerable: !1,
        get: o(function () {
          return (this.state & t) !== 0;
        }, "get"),
        set: o(function (e) {
          e ? (this.state |= t) : (this.state &= ~t);
        }, "set"),
      };
    }
    o(Q, "makeBitMapDescriptor");
    Xs(lr.prototype, {
      objectMode: Q(Si),
      ended: Q(Hm),
      endEmitted: Q(ql),
      reading: Q(cn),
      constructed: Q($l),
      sync: Q(or),
      needReadable: Q(ar),
      emittedReadable: Q(zl),
      readableListening: Q(Km),
      resumeScheduled: Q(Gm),
      errorEmitted: Q(Ym),
      emitClose: Q(Gs),
      autoDestroy: Q(Ys),
      destroyed: Q(Xm),
      closed: Q(Jm),
      closeEmitted: Q(Qm),
      multiAwaitDrain: Q(Vl),
      readingMore: Q(Zm),
      dataEmitted: Q(eb),
    });
    function lr(t, e, i) {
      typeof i != "boolean" && (i = e instanceof tt()),
        (this.state = Gs | Ys | $l | or),
        t && t.objectMode && (this.state |= Si),
        i && t && t.readableObjectMode && (this.state |= Si),
        (this.highWaterMark = t
          ? Bm(this, t, "readableHighWaterMark", i)
          : Dm(!1)),
        (this.buffer = new Cm()),
        (this.length = 0),
        (this.pipes = []),
        (this.flowing = null),
        (this[Kt] = null),
        t && t.emitClose === !1 && (this.state &= ~Gs),
        t && t.autoDestroy === !1 && (this.state &= ~Ys),
        (this.errored = null),
        (this.defaultEncoding = (t && t.defaultEncoding) || "utf8"),
        (this.awaitDrainWriters = null),
        (this.decoder = null),
        (this.encoding = null),
        t &&
          t.encoding &&
          ((this.decoder = new jl(t.encoding)), (this.encoding = t.encoding));
    }
    o(lr, "ReadableState");
    function F(t) {
      if (!(this instanceof F)) return new F(t);
      let e = this instanceof tt();
      (this._readableState = new lr(t, this, e)),
        t &&
          (typeof t.read == "function" && (this._read = t.read),
          typeof t.destroy == "function" && (this._destroy = t.destroy),
          typeof t.construct == "function" && (this._construct = t.construct),
          t.signal && !e && Lm(t.signal, this)),
        At.call(this, t),
        _i.construct(this, () => {
          this._readableState.needReadable && cr(this, this._readableState);
        });
    }
    o(F, "Readable");
    F.prototype.destroy = _i.destroy;
    F.prototype._undestroy = _i.undestroy;
    F.prototype._destroy = function (t, e) {
      e(t);
    };
    F.prototype[Rm.captureRejectionSymbol] = function (t) {
      this.destroy(t);
    };
    F.prototype[Tm] = function () {
      let t;
      return (
        this.destroyed ||
          ((t = this.readableEnded ? null : new $m()), this.destroy(t)),
        new Wl((e, i) => Ul(this, (n) => (n && n !== t ? i(n) : e(null))))
      );
    };
    F.prototype.push = function (t, e) {
      return Hl(this, t, e, !1);
    };
    F.prototype.unshift = function (t, e) {
      return Hl(this, t, e, !0);
    };
    function Hl(t, e, i, n) {
      T("readableAddChunk", e);
      let r = t._readableState,
        s;
      if (
        (r.state & Si ||
          (typeof e == "string"
            ? ((i = i || r.defaultEncoding),
              r.encoding !== i &&
                (n && r.encoding
                  ? (e = $s.from(e, i).toString(r.encoding))
                  : ((e = $s.from(e, i)), (i = ""))))
            : e instanceof $s
            ? (i = "")
            : At._isUint8Array(e)
            ? ((e = At._uint8ArrayToBuffer(e)), (i = ""))
            : e != null &&
              (s = new Mm("chunk", ["string", "Buffer", "Uint8Array"], e))),
        s)
      )
        wi(t, s);
      else if (e === null) (r.state &= ~cn), nb(t, r);
      else if (r.state & Si || (e && e.length > 0))
        if (n)
          if (r.state & ql) wi(t, new qm());
          else {
            if (r.destroyed || r.errored) return !1;
            Vs(t, r, e, !0);
          }
        else if (r.ended) wi(t, new jm());
        else {
          if (r.destroyed || r.errored) return !1;
          (r.state &= ~cn),
            r.decoder && !i
              ? ((e = r.decoder.write(e)),
                r.objectMode || e.length !== 0 ? Vs(t, r, e, !1) : cr(t, r))
              : Vs(t, r, e, !1);
        }
      else n || ((r.state &= ~cn), cr(t, r));
      return !r.ended && (r.length < r.highWaterMark || r.length === 0);
    }
    o(Hl, "readableAddChunk");
    function Vs(t, e, i, n) {
      e.flowing && e.length === 0 && !e.sync && t.listenerCount("data") > 0
        ? (e.state & Vl
            ? e.awaitDrainWriters.clear()
            : (e.awaitDrainWriters = null),
          (e.dataEmitted = !0),
          t.emit("data", i))
        : ((e.length += e.objectMode ? 1 : i.length),
          n ? e.buffer.unshift(i) : e.buffer.push(i),
          e.state & ar && fr(t)),
        cr(t, e);
    }
    o(Vs, "addChunk");
    F.prototype.isPaused = function () {
      let t = this._readableState;
      return t[Kt] === !0 || t.flowing === !1;
    };
    F.prototype.setEncoding = function (t) {
      let e = new jl(t);
      (this._readableState.decoder = e),
        (this._readableState.encoding = this._readableState.decoder.encoding);
      let i = this._readableState.buffer,
        n = "";
      for (let r of i) n += e.write(r);
      return (
        i.clear(),
        n !== "" && i.push(n),
        (this._readableState.length = n.length),
        this
      );
    };
    var tb = 1073741824;
    function ib(t) {
      if (t > tb) throw new Um("size", "<= 1GiB", t);
      return (
        t--,
        (t |= t >>> 1),
        (t |= t >>> 2),
        (t |= t >>> 4),
        (t |= t >>> 8),
        (t |= t >>> 16),
        t++,
        t
      );
    }
    o(ib, "computeNewHighWaterMark");
    function Dl(t, e) {
      return t <= 0 || (e.length === 0 && e.ended)
        ? 0
        : e.state & Si
        ? 1
        : vm(t)
        ? e.flowing && e.length
          ? e.buffer.first().length
          : e.length
        : t <= e.length
        ? t
        : e.ended
        ? e.length
        : 0;
    }
    o(Dl, "howMuchToRead");
    F.prototype.read = function (t) {
      T("read", t), t === void 0 ? (t = NaN) : km(t) || (t = Fm(t, 10));
      let e = this._readableState,
        i = t;
      if (
        (t > e.highWaterMark && (e.highWaterMark = ib(t)),
        t !== 0 && (e.state &= ~zl),
        t === 0 &&
          e.needReadable &&
          ((e.highWaterMark !== 0
            ? e.length >= e.highWaterMark
            : e.length > 0) ||
            e.ended))
      )
        return (
          T("read: emitReadable", e.length, e.ended),
          e.length === 0 && e.ended ? Hs(this) : fr(this),
          null
        );
      if (((t = Dl(t, e)), t === 0 && e.ended))
        return e.length === 0 && Hs(this), null;
      let n = (e.state & ar) !== 0;
      if (
        (T("need readable", n),
        (e.length === 0 || e.length - t < e.highWaterMark) &&
          ((n = !0), T("length less than watermark", n)),
        e.ended || e.reading || e.destroyed || e.errored || !e.constructed)
      )
        (n = !1), T("reading, ended or constructing", n);
      else if (n) {
        T("do read"), (e.state |= cn | or), e.length === 0 && (e.state |= ar);
        try {
          this._read(e.highWaterMark);
        } catch (s) {
          wi(this, s);
        }
        (e.state &= ~or), e.reading || (t = Dl(i, e));
      }
      let r;
      return (
        t > 0 ? (r = Jl(t, e)) : (r = null),
        r === null
          ? ((e.needReadable = e.length <= e.highWaterMark), (t = 0))
          : ((e.length -= t),
            e.multiAwaitDrain
              ? e.awaitDrainWriters.clear()
              : (e.awaitDrainWriters = null)),
        e.length === 0 &&
          (e.ended || (e.needReadable = !0), i !== t && e.ended && Hs(this)),
        r !== null &&
          !e.errorEmitted &&
          !e.closeEmitted &&
          ((e.dataEmitted = !0), this.emit("data", r)),
        r
      );
    };
    function nb(t, e) {
      if ((T("onEofChunk"), !e.ended)) {
        if (e.decoder) {
          let i = e.decoder.end();
          i &&
            i.length &&
            (e.buffer.push(i), (e.length += e.objectMode ? 1 : i.length));
        }
        (e.ended = !0),
          e.sync
            ? fr(t)
            : ((e.needReadable = !1), (e.emittedReadable = !0), Kl(t));
      }
    }
    o(nb, "onEofChunk");
    function fr(t) {
      let e = t._readableState;
      T("emitReadable", e.needReadable, e.emittedReadable),
        (e.needReadable = !1),
        e.emittedReadable ||
          (T("emitReadable", e.flowing),
          (e.emittedReadable = !0),
          Ce.nextTick(Kl, t));
    }
    o(fr, "emitReadable");
    function Kl(t) {
      let e = t._readableState;
      T("emitReadable_", e.destroyed, e.length, e.ended),
        !e.destroyed &&
          !e.errored &&
          (e.length || e.ended) &&
          (t.emit("readable"), (e.emittedReadable = !1)),
        (e.needReadable =
          !e.flowing && !e.ended && e.length <= e.highWaterMark),
        Yl(t);
    }
    o(Kl, "emitReadable_");
    function cr(t, e) {
      !e.readingMore &&
        e.constructed &&
        ((e.readingMore = !0), Ce.nextTick(rb, t, e));
    }
    o(cr, "maybeReadMore");
    function rb(t, e) {
      for (
        ;
        !e.reading &&
        !e.ended &&
        (e.length < e.highWaterMark || (e.flowing && e.length === 0));

      ) {
        let i = e.length;
        if ((T("maybeReadMore read 0"), t.read(0), i === e.length)) break;
      }
      e.readingMore = !1;
    }
    o(rb, "maybeReadMore_");
    F.prototype._read = function (t) {
      throw new Wm("_read()");
    };
    F.prototype.pipe = function (t, e) {
      let i = this,
        n = this._readableState;
      n.pipes.length === 1 &&
        (n.multiAwaitDrain ||
          ((n.multiAwaitDrain = !0),
          (n.awaitDrainWriters = new Am(
            n.awaitDrainWriters ? [n.awaitDrainWriters] : []
          )))),
        n.pipes.push(t),
        T("pipe count=%d opts=%j", n.pipes.length, e);
      let s =
        (!e || e.end !== !1) && t !== Ce.stdout && t !== Ce.stderr ? c : I;
      n.endEmitted ? Ce.nextTick(s) : i.once("end", s), t.on("unpipe", a);
      function a(k, A) {
        T("onunpipe"),
          k === i && A && A.hasUnpiped === !1 && ((A.hasUnpiped = !0), d());
      }
      o(a, "onunpipe");
      function c() {
        T("onend"), t.end();
      }
      o(c, "onend");
      let l,
        f = !1;
      function d() {
        T("cleanup"),
          t.removeListener("close", S),
          t.removeListener("finish", g),
          l && t.removeListener("drain", l),
          t.removeListener("error", y),
          t.removeListener("unpipe", a),
          i.removeListener("end", c),
          i.removeListener("end", I),
          i.removeListener("data", b),
          (f = !0),
          l &&
            n.awaitDrainWriters &&
            (!t._writableState || t._writableState.needDrain) &&
            l();
      }
      o(d, "cleanup");
      function h() {
        f ||
          (n.pipes.length === 1 && n.pipes[0] === t
            ? (T("false write response, pause", 0),
              (n.awaitDrainWriters = t),
              (n.multiAwaitDrain = !1))
            : n.pipes.length > 1 &&
              n.pipes.includes(t) &&
              (T("false write response, pause", n.awaitDrainWriters.size),
              n.awaitDrainWriters.add(t)),
          i.pause()),
          l || ((l = sb(i, t)), t.on("drain", l));
      }
      o(h, "pause"), i.on("data", b);
      function b(k) {
        T("ondata");
        let A = t.write(k);
        T("dest.write", A), A === !1 && h();
      }
      o(b, "ondata");
      function y(k) {
        if (
          (T("onerror", k),
          I(),
          t.removeListener("error", y),
          t.listenerCount("error") === 0)
        ) {
          let A = t._writableState || t._readableState;
          A && !A.errorEmitted ? wi(t, k) : t.emit("error", k);
        }
      }
      o(y, "onerror"), Nm(t, "error", y);
      function S() {
        t.removeListener("finish", g), I();
      }
      o(S, "onclose"), t.once("close", S);
      function g() {
        T("onfinish"), t.removeListener("close", S), I();
      }
      o(g, "onfinish"), t.once("finish", g);
      function I() {
        T("unpipe"), i.unpipe(t);
      }
      return (
        o(I, "unpipe"),
        t.emit("pipe", i),
        t.writableNeedDrain === !0
          ? h()
          : n.flowing || (T("pipe resume"), i.resume()),
        t
      );
    };
    function sb(t, e) {
      return o(function () {
        let n = t._readableState;
        n.awaitDrainWriters === e
          ? (T("pipeOnDrain", 1), (n.awaitDrainWriters = null))
          : n.multiAwaitDrain &&
            (T("pipeOnDrain", n.awaitDrainWriters.size),
            n.awaitDrainWriters.delete(e)),
          (!n.awaitDrainWriters || n.awaitDrainWriters.size === 0) &&
            t.listenerCount("data") &&
            t.resume();
      }, "pipeOnDrainFunctionResult");
    }
    o(sb, "pipeOnDrain");
    F.prototype.unpipe = function (t) {
      let e = this._readableState,
        i = { hasUnpiped: !1 };
      if (e.pipes.length === 0) return this;
      if (!t) {
        let r = e.pipes;
        (e.pipes = []), this.pause();
        for (let s = 0; s < r.length; s++)
          r[s].emit("unpipe", this, { hasUnpiped: !1 });
        return this;
      }
      let n = xm(e.pipes, t);
      return n === -1
        ? this
        : (e.pipes.splice(n, 1),
          e.pipes.length === 0 && this.pause(),
          t.emit("unpipe", this, i),
          this);
    };
    F.prototype.on = function (t, e) {
      let i = At.prototype.on.call(this, t, e),
        n = this._readableState;
      return (
        t === "data"
          ? ((n.readableListening = this.listenerCount("readable") > 0),
            n.flowing !== !1 && this.resume())
          : t === "readable" &&
            !n.endEmitted &&
            !n.readableListening &&
            ((n.readableListening = n.needReadable = !0),
            (n.flowing = !1),
            (n.emittedReadable = !1),
            T("on readable", n.length, n.reading),
            n.length ? fr(this) : n.reading || Ce.nextTick(ob, this)),
        i
      );
    };
    F.prototype.addListener = F.prototype.on;
    F.prototype.removeListener = function (t, e) {
      let i = At.prototype.removeListener.call(this, t, e);
      return t === "readable" && Ce.nextTick(Gl, this), i;
    };
    F.prototype.off = F.prototype.removeListener;
    F.prototype.removeAllListeners = function (t) {
      let e = At.prototype.removeAllListeners.apply(this, arguments);
      return (t === "readable" || t === void 0) && Ce.nextTick(Gl, this), e;
    };
    function Gl(t) {
      let e = t._readableState;
      (e.readableListening = t.listenerCount("readable") > 0),
        e.resumeScheduled && e[Kt] === !1
          ? (e.flowing = !0)
          : t.listenerCount("data") > 0
          ? t.resume()
          : e.readableListening || (e.flowing = null);
    }
    o(Gl, "updateReadableListening");
    function ob(t) {
      T("readable nexttick read 0"), t.read(0);
    }
    o(ob, "nReadingNextTick");
    F.prototype.resume = function () {
      let t = this._readableState;
      return (
        t.flowing ||
          (T("resume"), (t.flowing = !t.readableListening), ab(this, t)),
        (t[Kt] = !1),
        this
      );
    };
    function ab(t, e) {
      e.resumeScheduled || ((e.resumeScheduled = !0), Ce.nextTick(cb, t, e));
    }
    o(ab, "resume");
    function cb(t, e) {
      T("resume", e.reading),
        e.reading || t.read(0),
        (e.resumeScheduled = !1),
        t.emit("resume"),
        Yl(t),
        e.flowing && !e.reading && t.read(0);
    }
    o(cb, "resume_");
    F.prototype.pause = function () {
      return (
        T("call pause flowing=%j", this._readableState.flowing),
        this._readableState.flowing !== !1 &&
          (T("pause"), (this._readableState.flowing = !1), this.emit("pause")),
        (this._readableState[Kt] = !0),
        this
      );
    };
    function Yl(t) {
      let e = t._readableState;
      for (T("flow", e.flowing); e.flowing && t.read() !== null; );
    }
    o(Yl, "flow");
    F.prototype.wrap = function (t) {
      let e = !1;
      t.on("data", (n) => {
        !this.push(n) && t.pause && ((e = !0), t.pause());
      }),
        t.on("end", () => {
          this.push(null);
        }),
        t.on("error", (n) => {
          wi(this, n);
        }),
        t.on("close", () => {
          this.destroy();
        }),
        t.on("destroy", () => {
          this.destroy();
        }),
        (this._read = () => {
          e && t.resume && ((e = !1), t.resume());
        });
      let i = Im(t);
      for (let n = 1; n < i.length; n++) {
        let r = i[n];
        this[r] === void 0 &&
          typeof t[r] == "function" &&
          (this[r] = t[r].bind(t));
      }
      return this;
    };
    F.prototype[Pm] = function () {
      return Xl(this);
    };
    F.prototype.iterator = function (t) {
      return t !== void 0 && zm(t, "options"), Xl(this, t);
    };
    function Xl(t, e) {
      typeof t.read != "function" && (t = F.wrap(t, { objectMode: !0 }));
      let i = lb(t, e);
      return (i.stream = t), i;
    }
    o(Xl, "streamToAsyncIterator");
    async function* lb(t, e) {
      let i = zs;
      function n(a) {
        this === t ? (i(), (i = zs)) : (i = a);
      }
      o(n, "next"), t.on("readable", n);
      let r,
        s = Ul(t, { writable: !1 }, (a) => {
          (r = a ? Bl(r, a) : null), i(), (i = zs);
        });
      try {
        for (;;) {
          let a = t.destroyed ? null : t.read();
          if (a !== null) yield a;
          else {
            if (r) throw r;
            if (r === null) return;
            await new Wl(n);
          }
        }
      } catch (a) {
        throw ((r = Bl(r, a)), r);
      } finally {
        (r || e?.destroyOnReturn !== !1) &&
        (r === void 0 || t._readableState.autoDestroy)
          ? _i.destroyer(t, null)
          : (t.off("readable", n), s());
      }
    }
    o(lb, "createAsyncIterator");
    Xs(F.prototype, {
      readable: {
        __proto__: null,
        get: o(function () {
          let t = this._readableState;
          return (
            !!t &&
            t.readable !== !1 &&
            !t.destroyed &&
            !t.errorEmitted &&
            !t.endEmitted
          );
        }, "get"),
        set: o(function (t) {
          this._readableState && (this._readableState.readable = !!t);
        }, "set"),
      },
      readableDidRead: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState.dataEmitted;
        }, "get"),
      },
      readableAborted: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return !!(
            this._readableState.readable !== !1 &&
            (this._readableState.destroyed || this._readableState.errored) &&
            !this._readableState.endEmitted
          );
        }, "get"),
      },
      readableHighWaterMark: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState.highWaterMark;
        }, "get"),
      },
      readableBuffer: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState && this._readableState.buffer;
        }, "get"),
      },
      readableFlowing: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState.flowing;
        }, "get"),
        set: o(function (t) {
          this._readableState && (this._readableState.flowing = t);
        }, "set"),
      },
      readableLength: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState.length;
        }, "get"),
      },
      readableObjectMode: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState ? this._readableState.objectMode : !1;
        }, "get"),
      },
      readableEncoding: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState ? this._readableState.encoding : null;
        }, "get"),
      },
      errored: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState ? this._readableState.errored : null;
        }, "get"),
      },
      closed: {
        __proto__: null,
        get: o(function () {
          return this._readableState ? this._readableState.closed : !1;
        }, "get"),
      },
      destroyed: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState ? this._readableState.destroyed : !1;
        }, "get"),
        set: o(function (t) {
          this._readableState && (this._readableState.destroyed = t);
        }, "set"),
      },
      readableEnded: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._readableState ? this._readableState.endEmitted : !1;
        }, "get"),
      },
    });
    Xs(lr.prototype, {
      pipesCount: {
        __proto__: null,
        get: o(function () {
          return this.pipes.length;
        }, "get"),
      },
      paused: {
        __proto__: null,
        get: o(function () {
          return this[Kt] !== !1;
        }, "get"),
        set: o(function (t) {
          this[Kt] = !!t;
        }, "set"),
      },
    });
    F._fromList = Jl;
    function Jl(t, e) {
      if (e.length === 0) return null;
      let i;
      return (
        e.objectMode
          ? (i = e.buffer.shift())
          : !t || t >= e.length
          ? (e.decoder
              ? (i = e.buffer.join(""))
              : e.buffer.length === 1
              ? (i = e.buffer.first())
              : (i = e.buffer.concat(e.length)),
            e.buffer.clear())
          : (i = e.buffer.consume(t, e.decoder)),
        i
      );
    }
    o(Jl, "fromList");
    function Hs(t) {
      let e = t._readableState;
      T("endReadable", e.endEmitted),
        e.endEmitted || ((e.ended = !0), Ce.nextTick(fb, e, t));
    }
    o(Hs, "endReadable");
    function fb(t, e) {
      if (
        (T("endReadableNT", t.endEmitted, t.length),
        !t.errored && !t.closeEmitted && !t.endEmitted && t.length === 0)
      ) {
        if (
          ((t.endEmitted = !0),
          e.emit("end"),
          e.writable && e.allowHalfOpen === !1)
        )
          Ce.nextTick(ub, e);
        else if (t.autoDestroy) {
          let i = e._writableState;
          (!i || (i.autoDestroy && (i.finished || i.writable === !1))) &&
            e.destroy();
        }
      }
    }
    o(fb, "endReadableNT");
    function ub(t) {
      t.writable && !t.writableEnded && !t.destroyed && t.end();
    }
    o(ub, "endWritableNT");
    F.from = function (t, e) {
      return Vm(F, t, e);
    };
    var Ks;
    function Ql() {
      return Ks === void 0 && (Ks = {}), Ks;
    }
    o(Ql, "lazyWebStreams");
    F.fromWeb = function (t, e) {
      return Ql().newStreamReadableFromReadableStream(t, e);
    };
    F.toWeb = function (t, e) {
      return Ql().newReadableStreamFromStreamReadable(t, e);
    };
    F.wrap = function (t, e) {
      var i, n;
      return new F({
        objectMode:
          (i =
            (n = t.readableObjectMode) !== null && n !== void 0
              ? n
              : t.objectMode) !== null && i !== void 0
            ? i
            : !0,
        ...e,
        destroy: o(function (r, s) {
          _i.destroyer(t, r), s(r);
        }, "destroy"),
      }).wrap(t);
    };
  });
  var yr = O((Y_, df) => {
    var Gt = Ft(),
      {
        ArrayPrototypeSlice: nf,
        Error: db,
        FunctionPrototypeSymbolHasInstance: rf,
        ObjectDefineProperty: sf,
        ObjectDefineProperties: hb,
        ObjectSetPrototypeOf: of,
        StringPrototypeToLowerCase: pb,
        Symbol: yb,
        SymbolHasInstance: mb,
      } = q();
    df.exports = $;
    $.WritableState = dn;
    var { EventEmitter: bb } = rn(),
      fn = ir().Stream,
      { Buffer: ur } = ve(),
      pr = Vt(),
      { addAbortSignal: gb } = sn(),
      { getHighWaterMark: wb, getDefaultHighWaterMark: Sb } = on(),
      {
        ERR_INVALID_ARG_TYPE: _b,
        ERR_METHOD_NOT_IMPLEMENTED: Eb,
        ERR_MULTIPLE_CALLBACK: af,
        ERR_STREAM_CANNOT_PIPE: xb,
        ERR_STREAM_DESTROYED: un,
        ERR_STREAM_ALREADY_FINISHED: kb,
        ERR_STREAM_NULL_VALUES: vb,
        ERR_STREAM_WRITE_AFTER_END: Fb,
        ERR_UNKNOWN_ENCODING: cf,
      } = ae().codes,
      { errorOrDestroy: Ei } = pr;
    of($.prototype, fn.prototype);
    of($, fn);
    function Zs() {}
    o(Zs, "nop");
    var xi = yb("kOnFinished");
    function dn(t, e, i) {
      typeof i != "boolean" && (i = e instanceof tt()),
        (this.objectMode = !!(t && t.objectMode)),
        i &&
          (this.objectMode = this.objectMode || !!(t && t.writableObjectMode)),
        (this.highWaterMark = t
          ? wb(this, t, "writableHighWaterMark", i)
          : Sb(!1)),
        (this.finalCalled = !1),
        (this.needDrain = !1),
        (this.ending = !1),
        (this.ended = !1),
        (this.finished = !1),
        (this.destroyed = !1);
      let n = !!(t && t.decodeStrings === !1);
      (this.decodeStrings = !n),
        (this.defaultEncoding = (t && t.defaultEncoding) || "utf8"),
        (this.length = 0),
        (this.writing = !1),
        (this.corked = 0),
        (this.sync = !0),
        (this.bufferProcessing = !1),
        (this.onwrite = Ab.bind(void 0, e)),
        (this.writecb = null),
        (this.writelen = 0),
        (this.afterWriteTickInfo = null),
        hr(this),
        (this.pendingcb = 0),
        (this.constructed = !0),
        (this.prefinished = !1),
        (this.errorEmitted = !1),
        (this.emitClose = !t || t.emitClose !== !1),
        (this.autoDestroy = !t || t.autoDestroy !== !1),
        (this.errored = null),
        (this.closed = !1),
        (this.closeEmitted = !1),
        (this[xi] = []);
    }
    o(dn, "WritableState");
    function hr(t) {
      (t.buffered = []),
        (t.bufferedIndex = 0),
        (t.allBuffers = !0),
        (t.allNoop = !0);
    }
    o(hr, "resetBuffer");
    dn.prototype.getBuffer = o(function () {
      return nf(this.buffered, this.bufferedIndex);
    }, "getBuffer");
    sf(dn.prototype, "bufferedRequestCount", {
      __proto__: null,
      get: o(function () {
        return this.buffered.length - this.bufferedIndex;
      }, "get"),
    });
    function $(t) {
      let e = this instanceof tt();
      if (!e && !rf($, this)) return new $(t);
      (this._writableState = new dn(t, this, e)),
        t &&
          (typeof t.write == "function" && (this._write = t.write),
          typeof t.writev == "function" && (this._writev = t.writev),
          typeof t.destroy == "function" && (this._destroy = t.destroy),
          typeof t.final == "function" && (this._final = t.final),
          typeof t.construct == "function" && (this._construct = t.construct),
          t.signal && gb(t.signal, this)),
        fn.call(this, t),
        pr.construct(this, () => {
          let i = this._writableState;
          i.writing || to(this, i), io(this, i);
        });
    }
    o($, "Writable");
    sf($, mb, {
      __proto__: null,
      value: o(function (t) {
        return rf(this, t)
          ? !0
          : this !== $
          ? !1
          : t && t._writableState instanceof dn;
      }, "value"),
    });
    $.prototype.pipe = function () {
      Ei(this, new xb());
    };
    function lf(t, e, i, n) {
      let r = t._writableState;
      if (typeof i == "function") (n = i), (i = r.defaultEncoding);
      else {
        if (!i) i = r.defaultEncoding;
        else if (i !== "buffer" && !ur.isEncoding(i)) throw new cf(i);
        typeof n != "function" && (n = Zs);
      }
      if (e === null) throw new vb();
      if (!r.objectMode)
        if (typeof e == "string")
          r.decodeStrings !== !1 && ((e = ur.from(e, i)), (i = "buffer"));
        else if (e instanceof ur) i = "buffer";
        else if (fn._isUint8Array(e))
          (e = fn._uint8ArrayToBuffer(e)), (i = "buffer");
        else throw new _b("chunk", ["string", "Buffer", "Uint8Array"], e);
      let s;
      return (
        r.ending ? (s = new Fb()) : r.destroyed && (s = new un("write")),
        s
          ? (Gt.nextTick(n, s), Ei(t, s, !0), s)
          : (r.pendingcb++, Ib(t, r, e, i, n))
      );
    }
    o(lf, "_write");
    $.prototype.write = function (t, e, i) {
      return lf(this, t, e, i) === !0;
    };
    $.prototype.cork = function () {
      this._writableState.corked++;
    };
    $.prototype.uncork = function () {
      let t = this._writableState;
      t.corked && (t.corked--, t.writing || to(this, t));
    };
    $.prototype.setDefaultEncoding = o(function (e) {
      if ((typeof e == "string" && (e = pb(e)), !ur.isEncoding(e)))
        throw new cf(e);
      return (this._writableState.defaultEncoding = e), this;
    }, "setDefaultEncoding");
    function Ib(t, e, i, n, r) {
      let s = e.objectMode ? 1 : i.length;
      e.length += s;
      let a = e.length < e.highWaterMark;
      return (
        a || (e.needDrain = !0),
        e.writing || e.corked || e.errored || !e.constructed
          ? (e.buffered.push({ chunk: i, encoding: n, callback: r }),
            e.allBuffers && n !== "buffer" && (e.allBuffers = !1),
            e.allNoop && r !== Zs && (e.allNoop = !1))
          : ((e.writelen = s),
            (e.writecb = r),
            (e.writing = !0),
            (e.sync = !0),
            t._write(i, n, e.onwrite),
            (e.sync = !1)),
        a && !e.errored && !e.destroyed
      );
    }
    o(Ib, "writeOrBuffer");
    function ef(t, e, i, n, r, s, a) {
      (e.writelen = n),
        (e.writecb = a),
        (e.writing = !0),
        (e.sync = !0),
        e.destroyed
          ? e.onwrite(new un("write"))
          : i
          ? t._writev(r, e.onwrite)
          : t._write(r, s, e.onwrite),
        (e.sync = !1);
    }
    o(ef, "doWrite");
    function tf(t, e, i, n) {
      --e.pendingcb, n(i), eo(e), Ei(t, i);
    }
    o(tf, "onwriteError");
    function Ab(t, e) {
      let i = t._writableState,
        n = i.sync,
        r = i.writecb;
      if (typeof r != "function") {
        Ei(t, new af());
        return;
      }
      (i.writing = !1),
        (i.writecb = null),
        (i.length -= i.writelen),
        (i.writelen = 0),
        e
          ? (e.stack,
            i.errored || (i.errored = e),
            t._readableState &&
              !t._readableState.errored &&
              (t._readableState.errored = e),
            n ? Gt.nextTick(tf, t, i, e, r) : tf(t, i, e, r))
          : (i.buffered.length > i.bufferedIndex && to(t, i),
            n
              ? i.afterWriteTickInfo !== null && i.afterWriteTickInfo.cb === r
                ? i.afterWriteTickInfo.count++
                : ((i.afterWriteTickInfo = {
                    count: 1,
                    cb: r,
                    stream: t,
                    state: i,
                  }),
                  Gt.nextTick(Tb, i.afterWriteTickInfo))
              : ff(t, i, 1, r));
    }
    o(Ab, "onwrite");
    function Tb({ stream: t, state: e, count: i, cb: n }) {
      return (e.afterWriteTickInfo = null), ff(t, e, i, n);
    }
    o(Tb, "afterWriteTick");
    function ff(t, e, i, n) {
      for (
        !e.ending &&
        !t.destroyed &&
        e.length === 0 &&
        e.needDrain &&
        ((e.needDrain = !1), t.emit("drain"));
        i-- > 0;

      )
        e.pendingcb--, n();
      e.destroyed && eo(e), io(t, e);
    }
    o(ff, "afterWrite");
    function eo(t) {
      if (t.writing) return;
      for (let r = t.bufferedIndex; r < t.buffered.length; ++r) {
        var e;
        let { chunk: s, callback: a } = t.buffered[r],
          c = t.objectMode ? 1 : s.length;
        (t.length -= c),
          a((e = t.errored) !== null && e !== void 0 ? e : new un("write"));
      }
      let i = t[xi].splice(0);
      for (let r = 0; r < i.length; r++) {
        var n;
        i[r]((n = t.errored) !== null && n !== void 0 ? n : new un("end"));
      }
      hr(t);
    }
    o(eo, "errorBuffer");
    function to(t, e) {
      if (e.corked || e.bufferProcessing || e.destroyed || !e.constructed)
        return;
      let { buffered: i, bufferedIndex: n, objectMode: r } = e,
        s = i.length - n;
      if (!s) return;
      let a = n;
      if (((e.bufferProcessing = !0), s > 1 && t._writev)) {
        e.pendingcb -= s - 1;
        let c = e.allNoop
            ? Zs
            : (f) => {
                for (let d = a; d < i.length; ++d) i[d].callback(f);
              },
          l = e.allNoop && a === 0 ? i : nf(i, a);
        (l.allBuffers = e.allBuffers), ef(t, e, !0, e.length, l, "", c), hr(e);
      } else {
        do {
          let { chunk: c, encoding: l, callback: f } = i[a];
          i[a++] = null;
          let d = r ? 1 : c.length;
          ef(t, e, !1, d, c, l, f);
        } while (a < i.length && !e.writing);
        a === i.length
          ? hr(e)
          : a > 256
          ? (i.splice(0, a), (e.bufferedIndex = 0))
          : (e.bufferedIndex = a);
      }
      e.bufferProcessing = !1;
    }
    o(to, "clearBuffer");
    $.prototype._write = function (t, e, i) {
      if (this._writev) this._writev([{ chunk: t, encoding: e }], i);
      else throw new Eb("_write()");
    };
    $.prototype._writev = null;
    $.prototype.end = function (t, e, i) {
      let n = this._writableState;
      typeof t == "function"
        ? ((i = t), (t = null), (e = null))
        : typeof e == "function" && ((i = e), (e = null));
      let r;
      if (t != null) {
        let s = lf(this, t, e);
        s instanceof db && (r = s);
      }
      return (
        n.corked && ((n.corked = 1), this.uncork()),
        r ||
          (!n.errored && !n.ending
            ? ((n.ending = !0), io(this, n, !0), (n.ended = !0))
            : n.finished
            ? (r = new kb("end"))
            : n.destroyed && (r = new un("end"))),
        typeof i == "function" &&
          (r || n.finished ? Gt.nextTick(i, r) : n[xi].push(i)),
        this
      );
    };
    function dr(t) {
      return (
        t.ending &&
        !t.destroyed &&
        t.constructed &&
        t.length === 0 &&
        !t.errored &&
        t.buffered.length === 0 &&
        !t.finished &&
        !t.writing &&
        !t.errorEmitted &&
        !t.closeEmitted
      );
    }
    o(dr, "needFinish");
    function Pb(t, e) {
      let i = !1;
      function n(r) {
        if (i) {
          Ei(t, r ?? af());
          return;
        }
        if (((i = !0), e.pendingcb--, r)) {
          let s = e[xi].splice(0);
          for (let a = 0; a < s.length; a++) s[a](r);
          Ei(t, r, e.sync);
        } else
          dr(e) &&
            ((e.prefinished = !0),
            t.emit("prefinish"),
            e.pendingcb++,
            Gt.nextTick(Qs, t, e));
      }
      o(n, "onFinish"), (e.sync = !0), e.pendingcb++;
      try {
        t._final(n);
      } catch (r) {
        n(r);
      }
      e.sync = !1;
    }
    o(Pb, "callFinal");
    function Ob(t, e) {
      !e.prefinished &&
        !e.finalCalled &&
        (typeof t._final == "function" && !e.destroyed
          ? ((e.finalCalled = !0), Pb(t, e))
          : ((e.prefinished = !0), t.emit("prefinish")));
    }
    o(Ob, "prefinish");
    function io(t, e, i) {
      dr(e) &&
        (Ob(t, e),
        e.pendingcb === 0 &&
          (i
            ? (e.pendingcb++,
              Gt.nextTick(
                (n, r) => {
                  dr(r) ? Qs(n, r) : r.pendingcb--;
                },
                t,
                e
              ))
            : dr(e) && (e.pendingcb++, Qs(t, e))));
    }
    o(io, "finishMaybe");
    function Qs(t, e) {
      e.pendingcb--, (e.finished = !0);
      let i = e[xi].splice(0);
      for (let n = 0; n < i.length; n++) i[n]();
      if ((t.emit("finish"), e.autoDestroy)) {
        let n = t._readableState;
        (!n || (n.autoDestroy && (n.endEmitted || n.readable === !1))) &&
          t.destroy();
      }
    }
    o(Qs, "finish");
    hb($.prototype, {
      closed: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.closed : !1;
        }, "get"),
      },
      destroyed: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.destroyed : !1;
        }, "get"),
        set: o(function (t) {
          this._writableState && (this._writableState.destroyed = t);
        }, "set"),
      },
      writable: {
        __proto__: null,
        get: o(function () {
          let t = this._writableState;
          return (
            !!t &&
            t.writable !== !1 &&
            !t.destroyed &&
            !t.errored &&
            !t.ending &&
            !t.ended
          );
        }, "get"),
        set: o(function (t) {
          this._writableState && (this._writableState.writable = !!t);
        }, "set"),
      },
      writableFinished: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.finished : !1;
        }, "get"),
      },
      writableObjectMode: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.objectMode : !1;
        }, "get"),
      },
      writableBuffer: {
        __proto__: null,
        get: o(function () {
          return this._writableState && this._writableState.getBuffer();
        }, "get"),
      },
      writableEnded: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.ending : !1;
        }, "get"),
      },
      writableNeedDrain: {
        __proto__: null,
        get: o(function () {
          let t = this._writableState;
          return t ? !t.destroyed && !t.ending && t.needDrain : !1;
        }, "get"),
      },
      writableHighWaterMark: {
        __proto__: null,
        get: o(function () {
          return this._writableState && this._writableState.highWaterMark;
        }, "get"),
      },
      writableCorked: {
        __proto__: null,
        get: o(function () {
          return this._writableState ? this._writableState.corked : 0;
        }, "get"),
      },
      writableLength: {
        __proto__: null,
        get: o(function () {
          return this._writableState && this._writableState.length;
        }, "get"),
      },
      errored: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return this._writableState ? this._writableState.errored : null;
        }, "get"),
      },
      writableAborted: {
        __proto__: null,
        enumerable: !1,
        get: o(function () {
          return !!(
            this._writableState.writable !== !1 &&
            (this._writableState.destroyed || this._writableState.errored) &&
            !this._writableState.finished
          );
        }, "get"),
      },
    });
    var Rb = pr.destroy;
    $.prototype.destroy = function (t, e) {
      let i = this._writableState;
      return (
        !i.destroyed &&
          (i.bufferedIndex < i.buffered.length || i[xi].length) &&
          Gt.nextTick(eo, i),
        Rb.call(this, t, e),
        this
      );
    };
    $.prototype._undestroy = pr.undestroy;
    $.prototype._destroy = function (t, e) {
      e(t);
    };
    $.prototype[bb.captureRejectionSymbol] = function (t) {
      this.destroy(t);
    };
    var Js;
    function uf() {
      return Js === void 0 && (Js = {}), Js;
    }
    o(uf, "lazyWebStreams");
    $.fromWeb = function (t, e) {
      return uf().newStreamWritableFromWritableStream(t, e);
    };
    $.toWeb = function (t) {
      return uf().newWritableStreamFromStreamWritable(t);
    };
  });
  var If = O((J_, Ff) => {
    var no = Ft(),
      Nb = ve(),
      {
        isReadable: Lb,
        isWritable: Cb,
        isIterable: hf,
        isNodeStream: Bb,
        isReadableNodeStream: pf,
        isWritableNodeStream: yf,
        isDuplexNodeStream: Db,
        isReadableStream: mf,
        isWritableStream: bf,
      } = Qe(),
      gf = ht(),
      {
        AbortError: kf,
        codes: { ERR_INVALID_ARG_TYPE: Mb, ERR_INVALID_RETURN_VALUE: wf },
      } = ae(),
      { destroyer: vi } = Vt(),
      Wb = tt(),
      vf = ln(),
      Ub = yr(),
      { createDeferredPromise: Sf } = re(),
      _f = qs(),
      Ef = globalThis.Blob || Nb.Blob,
      jb = o(
        typeof Ef < "u"
          ? function (e) {
              return e instanceof Ef;
            }
          : function (e) {
              return !1;
            },
        "isBlob"
      ),
      qb = globalThis.AbortController || hi().AbortController,
      { FunctionPrototypeCall: xf } = q(),
      Tt = class extends Wb {
        static {
          o(this, "Duplexify");
        }
        constructor(e) {
          super(e),
            e?.readable === !1 &&
              ((this._readableState.readable = !1),
              (this._readableState.ended = !0),
              (this._readableState.endEmitted = !0)),
            e?.writable === !1 &&
              ((this._writableState.writable = !1),
              (this._writableState.ending = !0),
              (this._writableState.ended = !0),
              (this._writableState.finished = !0));
        }
      };
    Ff.exports = o(function t(e, i) {
      if (Db(e)) return e;
      if (pf(e)) return ki({ readable: e });
      if (yf(e)) return ki({ writable: e });
      if (Bb(e)) return ki({ writable: !1, readable: !1 });
      if (mf(e)) return ki({ readable: vf.fromWeb(e) });
      if (bf(e)) return ki({ writable: Ub.fromWeb(e) });
      if (typeof e == "function") {
        let { value: r, write: s, final: a, destroy: c } = $b(e);
        if (hf(r))
          return _f(Tt, r, { objectMode: !0, write: s, final: a, destroy: c });
        let l = r?.then;
        if (typeof l == "function") {
          let f,
            d = xf(
              l,
              r,
              (h) => {
                if (h != null) throw new wf("nully", "body", h);
              },
              (h) => {
                vi(f, h);
              }
            );
          return (f = new Tt({
            objectMode: !0,
            readable: !1,
            write: s,
            final: o(function (h) {
              a(async () => {
                try {
                  await d, no.nextTick(h, null);
                } catch (b) {
                  no.nextTick(h, b);
                }
              });
            }, "final"),
            destroy: c,
          }));
        }
        throw new wf("Iterable, AsyncIterable or AsyncFunction", i, r);
      }
      if (jb(e)) return t(e.arrayBuffer());
      if (hf(e)) return _f(Tt, e, { objectMode: !0, writable: !1 });
      if (mf(e?.readable) && bf(e?.writable)) return Tt.fromWeb(e);
      if (typeof e?.writable == "object" || typeof e?.readable == "object") {
        let r =
            e != null && e.readable
              ? pf(e?.readable)
                ? e?.readable
                : t(e.readable)
              : void 0,
          s =
            e != null && e.writable
              ? yf(e?.writable)
                ? e?.writable
                : t(e.writable)
              : void 0;
        return ki({ readable: r, writable: s });
      }
      let n = e?.then;
      if (typeof n == "function") {
        let r;
        return (
          xf(
            n,
            e,
            (s) => {
              s != null && r.push(s), r.push(null);
            },
            (s) => {
              vi(r, s);
            }
          ),
          (r = new Tt({
            objectMode: !0,
            writable: !1,
            read: o(function () {}, "read"),
          }))
        );
      }
      throw new Mb(
        i,
        [
          "Blob",
          "ReadableStream",
          "WritableStream",
          "Stream",
          "Iterable",
          "AsyncIterable",
          "Function",
          "{ readable, writable } pair",
          "Promise",
        ],
        e
      );
    }, "duplexify");
    function $b(t) {
      let { promise: e, resolve: i } = Sf(),
        n = new qb(),
        r = n.signal;
      return {
        value: t(
          (async function* () {
            for (;;) {
              let a = e;
              e = null;
              let { chunk: c, done: l, cb: f } = await a;
              if ((no.nextTick(f), l)) return;
              if (r.aborted) throw new kf(void 0, { cause: r.reason });
              ({ promise: e, resolve: i } = Sf()), yield c;
            }
          })(),
          { signal: r }
        ),
        write: o(function (a, c, l) {
          let f = i;
          (i = null), f({ chunk: a, done: !1, cb: l });
        }, "write"),
        final: o(function (a) {
          let c = i;
          (i = null), c({ done: !0, cb: a });
        }, "final"),
        destroy: o(function (a, c) {
          n.abort(), c(a);
        }, "destroy"),
      };
    }
    o($b, "fromAsyncGen");
    function ki(t) {
      let e =
          t.readable && typeof t.readable.read != "function"
            ? vf.wrap(t.readable)
            : t.readable,
        i = t.writable,
        n = !!Lb(e),
        r = !!Cb(i),
        s,
        a,
        c,
        l,
        f;
      function d(h) {
        let b = l;
        (l = null), b ? b(h) : h && f.destroy(h);
      }
      return (
        o(d, "onfinished"),
        (f = new Tt({
          readableObjectMode: !!(e != null && e.readableObjectMode),
          writableObjectMode: !!(i != null && i.writableObjectMode),
          readable: n,
          writable: r,
        })),
        r &&
          (gf(i, (h) => {
            (r = !1), h && vi(e, h), d(h);
          }),
          (f._write = function (h, b, y) {
            i.write(h, b) ? y() : (s = y);
          }),
          (f._final = function (h) {
            i.end(), (a = h);
          }),
          i.on("drain", function () {
            if (s) {
              let h = s;
              (s = null), h();
            }
          }),
          i.on("finish", function () {
            if (a) {
              let h = a;
              (a = null), h();
            }
          })),
        n &&
          (gf(e, (h) => {
            (n = !1), h && vi(e, h), d(h);
          }),
          e.on("readable", function () {
            if (c) {
              let h = c;
              (c = null), h();
            }
          }),
          e.on("end", function () {
            f.push(null);
          }),
          (f._read = function () {
            for (;;) {
              let h = e.read();
              if (h === null) {
                c = f._read;
                return;
              }
              if (!f.push(h)) return;
            }
          })),
        (f._destroy = function (h, b) {
          !h && l !== null && (h = new kf()),
            (c = null),
            (s = null),
            (a = null),
            l === null ? b(h) : ((l = b), vi(i, h), vi(e, h));
        }),
        f
      );
    }
    o(ki, "_duplexify");
  });
  var tt = O((Z_, Pf) => {
    "use strict";
    var {
      ObjectDefineProperties: zb,
      ObjectGetOwnPropertyDescriptor: pt,
      ObjectKeys: Vb,
      ObjectSetPrototypeOf: Af,
    } = q();
    Pf.exports = Be;
    var oo = ln(),
      Oe = yr();
    Af(Be.prototype, oo.prototype);
    Af(Be, oo);
    {
      let t = Vb(Oe.prototype);
      for (let e = 0; e < t.length; e++) {
        let i = t[e];
        Be.prototype[i] || (Be.prototype[i] = Oe.prototype[i]);
      }
    }
    function Be(t) {
      if (!(this instanceof Be)) return new Be(t);
      oo.call(this, t),
        Oe.call(this, t),
        t
          ? ((this.allowHalfOpen = t.allowHalfOpen !== !1),
            t.readable === !1 &&
              ((this._readableState.readable = !1),
              (this._readableState.ended = !0),
              (this._readableState.endEmitted = !0)),
            t.writable === !1 &&
              ((this._writableState.writable = !1),
              (this._writableState.ending = !0),
              (this._writableState.ended = !0),
              (this._writableState.finished = !0)))
          : (this.allowHalfOpen = !0);
    }
    o(Be, "Duplex");
    zb(Be.prototype, {
      writable: { __proto__: null, ...pt(Oe.prototype, "writable") },
      writableHighWaterMark: {
        __proto__: null,
        ...pt(Oe.prototype, "writableHighWaterMark"),
      },
      writableObjectMode: {
        __proto__: null,
        ...pt(Oe.prototype, "writableObjectMode"),
      },
      writableBuffer: {
        __proto__: null,
        ...pt(Oe.prototype, "writableBuffer"),
      },
      writableLength: {
        __proto__: null,
        ...pt(Oe.prototype, "writableLength"),
      },
      writableFinished: {
        __proto__: null,
        ...pt(Oe.prototype, "writableFinished"),
      },
      writableCorked: {
        __proto__: null,
        ...pt(Oe.prototype, "writableCorked"),
      },
      writableEnded: { __proto__: null, ...pt(Oe.prototype, "writableEnded") },
      writableNeedDrain: {
        __proto__: null,
        ...pt(Oe.prototype, "writableNeedDrain"),
      },
      destroyed: {
        __proto__: null,
        get: o(function () {
          return this._readableState === void 0 ||
            this._writableState === void 0
            ? !1
            : this._readableState.destroyed && this._writableState.destroyed;
        }, "get"),
        set: o(function (t) {
          this._readableState &&
            this._writableState &&
            ((this._readableState.destroyed = t),
            (this._writableState.destroyed = t));
        }, "set"),
      },
    });
    var ro;
    function Tf() {
      return ro === void 0 && (ro = {}), ro;
    }
    o(Tf, "lazyWebStreams");
    Be.fromWeb = function (t, e) {
      return Tf().newStreamDuplexFromReadableWritablePair(t, e);
    };
    Be.toWeb = function (t) {
      return Tf().newReadableWritablePairFromDuplex(t);
    };
    var so;
    Be.from = function (t) {
      return so || (so = If()), so(t, "body");
    };
  });
  var lo = O((tE, Rf) => {
    "use strict";
    var { ObjectSetPrototypeOf: Of, Symbol: Hb } = q();
    Rf.exports = yt;
    var { ERR_METHOD_NOT_IMPLEMENTED: Kb } = ae().codes,
      co = tt(),
      { getHighWaterMark: Gb } = on();
    Of(yt.prototype, co.prototype);
    Of(yt, co);
    var hn = Hb("kCallback");
    function yt(t) {
      if (!(this instanceof yt)) return new yt(t);
      let e = t ? Gb(this, t, "readableHighWaterMark", !0) : null;
      e === 0 &&
        (t = {
          ...t,
          highWaterMark: null,
          readableHighWaterMark: e,
          writableHighWaterMark: t.writableHighWaterMark || 0,
        }),
        co.call(this, t),
        (this._readableState.sync = !1),
        (this[hn] = null),
        t &&
          (typeof t.transform == "function" && (this._transform = t.transform),
          typeof t.flush == "function" && (this._flush = t.flush)),
        this.on("prefinish", Yb);
    }
    o(yt, "Transform");
    function ao(t) {
      typeof this._flush == "function" && !this.destroyed
        ? this._flush((e, i) => {
            if (e) {
              t ? t(e) : this.destroy(e);
              return;
            }
            i != null && this.push(i), this.push(null), t && t();
          })
        : (this.push(null), t && t());
    }
    o(ao, "final");
    function Yb() {
      this._final !== ao && ao.call(this);
    }
    o(Yb, "prefinish");
    yt.prototype._final = ao;
    yt.prototype._transform = function (t, e, i) {
      throw new Kb("_transform()");
    };
    yt.prototype._write = function (t, e, i) {
      let n = this._readableState,
        r = this._writableState,
        s = n.length;
      this._transform(t, e, (a, c) => {
        if (a) {
          i(a);
          return;
        }
        c != null && this.push(c),
          r.ended || s === n.length || n.length < n.highWaterMark
            ? i()
            : (this[hn] = i);
      });
    };
    yt.prototype._read = function () {
      if (this[hn]) {
        let t = this[hn];
        (this[hn] = null), t();
      }
    };
  });
  var uo = O((nE, Lf) => {
    "use strict";
    var { ObjectSetPrototypeOf: Nf } = q();
    Lf.exports = Fi;
    var fo = lo();
    Nf(Fi.prototype, fo.prototype);
    Nf(Fi, fo);
    function Fi(t) {
      if (!(this instanceof Fi)) return new Fi(t);
      fo.call(this, t);
    }
    o(Fi, "PassThrough");
    Fi.prototype._transform = function (t, e, i) {
      i(null, t);
    };
  });
  var wr = O((sE, Wf) => {
    var pn = Ft(),
      {
        ArrayIsArray: Xb,
        Promise: Jb,
        SymbolAsyncIterator: Qb,
        SymbolDispose: Zb,
      } = q(),
      gr = ht(),
      { once: eg } = re(),
      tg = Vt(),
      Cf = tt(),
      {
        aggregateTwoErrors: ig,
        codes: {
          ERR_INVALID_ARG_TYPE: _o,
          ERR_INVALID_RETURN_VALUE: ho,
          ERR_MISSING_ARGS: ng,
          ERR_STREAM_DESTROYED: rg,
          ERR_STREAM_PREMATURE_CLOSE: sg,
        },
        AbortError: og,
      } = ae(),
      { validateFunction: ag, validateAbortSignal: cg } = mi(),
      {
        isIterable: Yt,
        isReadable: po,
        isReadableNodeStream: br,
        isNodeStream: Bf,
        isTransformStream: Ii,
        isWebStream: lg,
        isReadableStream: yo,
        isReadableFinished: fg,
      } = Qe(),
      ug = globalThis.AbortController || hi().AbortController,
      mo,
      bo,
      go;
    function Df(t, e, i) {
      let n = !1;
      t.on("close", () => {
        n = !0;
      });
      let r = gr(t, { readable: e, writable: i }, (s) => {
        n = !s;
      });
      return {
        destroy: o((s) => {
          n || ((n = !0), tg.destroyer(t, s || new rg("pipe")));
        }, "destroy"),
        cleanup: r,
      };
    }
    o(Df, "destroyer");
    function dg(t) {
      return ag(t[t.length - 1], "streams[stream.length - 1]"), t.pop();
    }
    o(dg, "popCallback");
    function wo(t) {
      if (Yt(t)) return t;
      if (br(t)) return hg(t);
      throw new _o("val", ["Readable", "Iterable", "AsyncIterable"], t);
    }
    o(wo, "makeAsyncIterable");
    async function* hg(t) {
      bo || (bo = ln()), yield* bo.prototype[Qb].call(t);
    }
    o(hg, "fromReadable");
    async function mr(t, e, i, { end: n }) {
      let r,
        s = null,
        a = o((f) => {
          if ((f && (r = f), s)) {
            let d = s;
            (s = null), d();
          }
        }, "resume"),
        c = o(
          () =>
            new Jb((f, d) => {
              r
                ? d(r)
                : (s = o(() => {
                    r ? d(r) : f();
                  }, "onresolve"));
            }),
          "wait"
        );
      e.on("drain", a);
      let l = gr(e, { readable: !1 }, a);
      try {
        e.writableNeedDrain && (await c());
        for await (let f of t) e.write(f) || (await c());
        n && (e.end(), await c()), i();
      } catch (f) {
        i(r !== f ? ig(r, f) : f);
      } finally {
        l(), e.off("drain", a);
      }
    }
    o(mr, "pumpToNode");
    async function So(t, e, i, { end: n }) {
      Ii(e) && (e = e.writable);
      let r = e.getWriter();
      try {
        for await (let s of t) await r.ready, r.write(s).catch(() => {});
        await r.ready, n && (await r.close()), i();
      } catch (s) {
        try {
          await r.abort(s), i(s);
        } catch (a) {
          i(a);
        }
      }
    }
    o(So, "pumpToWeb");
    function pg(...t) {
      return Mf(t, eg(dg(t)));
    }
    o(pg, "pipeline");
    function Mf(t, e, i) {
      if ((t.length === 1 && Xb(t[0]) && (t = t[0]), t.length < 2))
        throw new ng("streams");
      let n = new ug(),
        r = n.signal,
        s = i?.signal,
        a = [];
      cg(s, "options.signal");
      function c() {
        S(new og());
      }
      o(c, "abort"), (go = go || re().addAbortListener);
      let l;
      s && (l = go(s, c));
      let f,
        d,
        h = [],
        b = 0;
      function y(L) {
        S(L, --b === 0);
      }
      o(y, "finish");
      function S(L, P) {
        var K;
        if (
          (L && (!f || f.code === "ERR_STREAM_PREMATURE_CLOSE") && (f = L),
          !(!f && !P))
        ) {
          for (; h.length; ) h.shift()(f);
          (K = l) === null || K === void 0 || K[Zb](),
            n.abort(),
            P && (f || a.forEach((Rt) => Rt()), pn.nextTick(e, f, d));
        }
      }
      o(S, "finishImpl");
      let g;
      for (let L = 0; L < t.length; L++) {
        let P = t[L],
          K = L < t.length - 1,
          Rt = L > 0,
          Se = K || i?.end !== !1,
          ei = L === t.length - 1;
        if (Bf(P)) {
          let le = function (rt) {
            rt &&
              rt.name !== "AbortError" &&
              rt.code !== "ERR_STREAM_PREMATURE_CLOSE" &&
              y(rt);
          };
          var A = le;
          if ((o(le, "onError"), Se)) {
            let { destroy: rt, cleanup: Ur } = Df(P, K, Rt);
            h.push(rt), po(P) && ei && a.push(Ur);
          }
          P.on("error", le),
            po(P) &&
              ei &&
              a.push(() => {
                P.removeListener("error", le);
              });
        }
        if (L === 0)
          if (typeof P == "function") {
            if (((g = P({ signal: r })), !Yt(g)))
              throw new ho("Iterable, AsyncIterable or Stream", "source", g);
          } else Yt(P) || br(P) || Ii(P) ? (g = P) : (g = Cf.from(P));
        else if (typeof P == "function") {
          if (Ii(g)) {
            var I;
            g = wo((I = g) === null || I === void 0 ? void 0 : I.readable);
          } else g = wo(g);
          if (((g = P(g, { signal: r })), K)) {
            if (!Yt(g, !0))
              throw new ho("AsyncIterable", `transform[${L - 1}]`, g);
          } else {
            var k;
            mo || (mo = uo());
            let le = new mo({ objectMode: !0 }),
              rt = (k = g) === null || k === void 0 ? void 0 : k.then;
            if (typeof rt == "function")
              b++,
                rt.call(
                  g,
                  (bt) => {
                    (d = bt),
                      bt != null && le.write(bt),
                      Se && le.end(),
                      pn.nextTick(y);
                  },
                  (bt) => {
                    le.destroy(bt), pn.nextTick(y, bt);
                  }
                );
            else if (Yt(g, !0)) b++, mr(g, le, y, { end: Se });
            else if (yo(g) || Ii(g)) {
              let bt = g.readable || g;
              b++, mr(bt, le, y, { end: Se });
            } else throw new ho("AsyncIterable or Promise", "destination", g);
            g = le;
            let { destroy: Ur, cleanup: gd } = Df(g, !1, !0);
            h.push(Ur), ei && a.push(gd);
          }
        } else if (Bf(P)) {
          if (br(g)) {
            b += 2;
            let le = yg(g, P, y, { end: Se });
            po(P) && ei && a.push(le);
          } else if (Ii(g) || yo(g)) {
            let le = g.readable || g;
            b++, mr(le, P, y, { end: Se });
          } else if (Yt(g)) b++, mr(g, P, y, { end: Se });
          else
            throw new _o(
              "val",
              [
                "Readable",
                "Iterable",
                "AsyncIterable",
                "ReadableStream",
                "TransformStream",
              ],
              g
            );
          g = P;
        } else if (lg(P)) {
          if (br(g)) b++, So(wo(g), P, y, { end: Se });
          else if (yo(g) || Yt(g)) b++, So(g, P, y, { end: Se });
          else if (Ii(g)) b++, So(g.readable, P, y, { end: Se });
          else
            throw new _o(
              "val",
              [
                "Readable",
                "Iterable",
                "AsyncIterable",
                "ReadableStream",
                "TransformStream",
              ],
              g
            );
          g = P;
        } else g = Cf.from(P);
      }
      return (
        ((r != null && r.aborted) || (s != null && s.aborted)) &&
          pn.nextTick(c),
        g
      );
    }
    o(Mf, "pipelineImpl");
    function yg(t, e, i, { end: n }) {
      let r = !1;
      if (
        (e.on("close", () => {
          r || i(new sg());
        }),
        t.pipe(e, { end: !1 }),
        n)
      ) {
        let a = function () {
          (r = !0), e.end();
        };
        var s = a;
        o(a, "endFn"), fg(t) ? pn.nextTick(a) : t.once("end", a);
      } else i();
      return (
        gr(t, { readable: !0, writable: !1 }, (a) => {
          let c = t._readableState;
          a &&
          a.code === "ERR_STREAM_PREMATURE_CLOSE" &&
          c &&
          c.ended &&
          !c.errored &&
          !c.errorEmitted
            ? t.once("end", i).once("error", i)
            : i(a);
        }),
        gr(e, { readable: !1, writable: !0 }, i)
      );
    }
    o(yg, "pipe");
    Wf.exports = { pipelineImpl: Mf, pipeline: pg };
  });
  var xo = O((aE, Vf) => {
    "use strict";
    var { pipeline: mg } = wr(),
      Sr = tt(),
      { destroyer: bg } = Vt(),
      {
        isNodeStream: _r,
        isReadable: Uf,
        isWritable: jf,
        isWebStream: Eo,
        isTransformStream: Xt,
        isWritableStream: qf,
        isReadableStream: $f,
      } = Qe(),
      {
        AbortError: gg,
        codes: { ERR_INVALID_ARG_VALUE: zf, ERR_MISSING_ARGS: wg },
      } = ae(),
      Sg = ht();
    Vf.exports = o(function (...e) {
      if (e.length === 0) throw new wg("streams");
      if (e.length === 1) return Sr.from(e[0]);
      let i = [...e];
      if (
        (typeof e[0] == "function" && (e[0] = Sr.from(e[0])),
        typeof e[e.length - 1] == "function")
      ) {
        let y = e.length - 1;
        e[y] = Sr.from(e[y]);
      }
      for (let y = 0; y < e.length; ++y)
        if (!(!_r(e[y]) && !Eo(e[y]))) {
          if (y < e.length - 1 && !(Uf(e[y]) || $f(e[y]) || Xt(e[y])))
            throw new zf(`streams[${y}]`, i[y], "must be readable");
          if (y > 0 && !(jf(e[y]) || qf(e[y]) || Xt(e[y])))
            throw new zf(`streams[${y}]`, i[y], "must be writable");
        }
      let n, r, s, a, c;
      function l(y) {
        let S = a;
        (a = null), S ? S(y) : y ? c.destroy(y) : !b && !h && c.destroy();
      }
      o(l, "onfinished");
      let f = e[0],
        d = mg(e, l),
        h = !!(jf(f) || qf(f) || Xt(f)),
        b = !!(Uf(d) || $f(d) || Xt(d));
      if (
        ((c = new Sr({
          writableObjectMode: !!(f != null && f.writableObjectMode),
          readableObjectMode: !!(d != null && d.readableObjectMode),
          writable: h,
          readable: b,
        })),
        h)
      ) {
        if (_r(f))
          (c._write = function (S, g, I) {
            f.write(S, g) ? I() : (n = I);
          }),
            (c._final = function (S) {
              f.end(), (r = S);
            }),
            f.on("drain", function () {
              if (n) {
                let S = n;
                (n = null), S();
              }
            });
        else if (Eo(f)) {
          let g = (Xt(f) ? f.writable : f).getWriter();
          (c._write = async function (I, k, A) {
            try {
              await g.ready, g.write(I).catch(() => {}), A();
            } catch (L) {
              A(L);
            }
          }),
            (c._final = async function (I) {
              try {
                await g.ready, g.close().catch(() => {}), (r = I);
              } catch (k) {
                I(k);
              }
            });
        }
        let y = Xt(d) ? d.readable : d;
        Sg(y, () => {
          if (r) {
            let S = r;
            (r = null), S();
          }
        });
      }
      if (b) {
        if (_r(d))
          d.on("readable", function () {
            if (s) {
              let y = s;
              (s = null), y();
            }
          }),
            d.on("end", function () {
              c.push(null);
            }),
            (c._read = function () {
              for (;;) {
                let y = d.read();
                if (y === null) {
                  s = c._read;
                  return;
                }
                if (!c.push(y)) return;
              }
            });
        else if (Eo(d)) {
          let S = (Xt(d) ? d.readable : d).getReader();
          c._read = async function () {
            for (;;)
              try {
                let { value: g, done: I } = await S.read();
                if (!c.push(g)) return;
                if (I) {
                  c.push(null);
                  return;
                }
              } catch {
                return;
              }
          };
        }
      }
      return (
        (c._destroy = function (y, S) {
          !y && a !== null && (y = new gg()),
            (s = null),
            (n = null),
            (r = null),
            a === null ? S(y) : ((a = S), _r(d) && bg(d, y));
        }),
        c
      );
    }, "compose");
  });
  var tu = O((lE, Fo) => {
    "use strict";
    var _g = globalThis.AbortController || hi().AbortController,
      {
        codes: {
          ERR_INVALID_ARG_VALUE: Eg,
          ERR_INVALID_ARG_TYPE: yn,
          ERR_MISSING_ARGS: xg,
          ERR_OUT_OF_RANGE: kg,
        },
        AbortError: it,
      } = ae(),
      {
        validateAbortSignal: Jt,
        validateInteger: Hf,
        validateObject: Qt,
      } = mi(),
      vg = q().Symbol("kWeak"),
      Fg = q().Symbol("kResistStopPropagation"),
      { finished: Ig } = ht(),
      Ag = xo(),
      { addAbortSignalNoValidate: Tg } = sn(),
      { isWritable: Pg, isNodeStream: Og } = Qe(),
      { deprecate: Rg } = re(),
      {
        ArrayPrototypePush: Ng,
        Boolean: Lg,
        MathFloor: Kf,
        Number: Cg,
        NumberIsNaN: Bg,
        Promise: Gf,
        PromiseReject: Yf,
        PromiseResolve: Dg,
        PromisePrototypeThen: Xf,
        Symbol: Qf,
      } = q(),
      Er = Qf("kEmpty"),
      Jf = Qf("kEof");
    function Mg(t, e) {
      if (
        (e != null && Qt(e, "options"),
        e?.signal != null && Jt(e.signal, "options.signal"),
        Og(t) && !Pg(t))
      )
        throw new Eg("stream", t, "must be writable");
      let i = Ag(this, t);
      return e != null && e.signal && Tg(e.signal, i), i;
    }
    o(Mg, "compose");
    function xr(t, e) {
      if (typeof t != "function")
        throw new yn("fn", ["Function", "AsyncFunction"], t);
      e != null && Qt(e, "options"),
        e?.signal != null && Jt(e.signal, "options.signal");
      let i = 1;
      e?.concurrency != null && (i = Kf(e.concurrency));
      let n = i - 1;
      return (
        e?.highWaterMark != null && (n = Kf(e.highWaterMark)),
        Hf(i, "options.concurrency", 1),
        Hf(n, "options.highWaterMark", 0),
        (n += i),
        o(async function* () {
          let s = re().AbortSignalAny([e?.signal].filter(Lg)),
            a = this,
            c = [],
            l = { signal: s },
            f,
            d,
            h = !1,
            b = 0;
          function y() {
            (h = !0), S();
          }
          o(y, "onCatch");
          function S() {
            (b -= 1), g();
          }
          o(S, "afterItemProcessed");
          function g() {
            d && !h && b < i && c.length < n && (d(), (d = null));
          }
          o(g, "maybeResume");
          async function I() {
            try {
              for await (let k of a) {
                if (h) return;
                if (s.aborted) throw new it();
                try {
                  if (((k = t(k, l)), k === Er)) continue;
                  k = Dg(k);
                } catch (A) {
                  k = Yf(A);
                }
                (b += 1),
                  Xf(k, S, y),
                  c.push(k),
                  f && (f(), (f = null)),
                  !h &&
                    (c.length >= n || b >= i) &&
                    (await new Gf((A) => {
                      d = A;
                    }));
              }
              c.push(Jf);
            } catch (k) {
              let A = Yf(k);
              Xf(A, S, y), c.push(A);
            } finally {
              (h = !0), f && (f(), (f = null));
            }
          }
          o(I, "pump"), I();
          try {
            for (;;) {
              for (; c.length > 0; ) {
                let k = await c[0];
                if (k === Jf) return;
                if (s.aborted) throw new it();
                k !== Er && (yield k), c.shift(), g();
              }
              await new Gf((k) => {
                f = k;
              });
            }
          } finally {
            (h = !0), d && (d(), (d = null));
          }
        }, "map").call(this)
      );
    }
    o(xr, "map");
    function Wg(t = void 0) {
      return (
        t != null && Qt(t, "options"),
        t?.signal != null && Jt(t.signal, "options.signal"),
        o(async function* () {
          let i = 0;
          for await (let r of this) {
            var n;
            if (
              t != null &&
              (n = t.signal) !== null &&
              n !== void 0 &&
              n.aborted
            )
              throw new it({ cause: t.signal.reason });
            yield [i++, r];
          }
        }, "asIndexedPairs").call(this)
      );
    }
    o(Wg, "asIndexedPairs");
    async function Zf(t, e = void 0) {
      for await (let i of vo.call(this, t, e)) return !0;
      return !1;
    }
    o(Zf, "some");
    async function Ug(t, e = void 0) {
      if (typeof t != "function")
        throw new yn("fn", ["Function", "AsyncFunction"], t);
      return !(await Zf.call(this, async (...i) => !(await t(...i)), e));
    }
    o(Ug, "every");
    async function jg(t, e) {
      for await (let i of vo.call(this, t, e)) return i;
    }
    o(jg, "find");
    async function qg(t, e) {
      if (typeof t != "function")
        throw new yn("fn", ["Function", "AsyncFunction"], t);
      async function i(n, r) {
        return await t(n, r), Er;
      }
      o(i, "forEachFn");
      for await (let n of xr.call(this, i, e));
    }
    o(qg, "forEach");
    function vo(t, e) {
      if (typeof t != "function")
        throw new yn("fn", ["Function", "AsyncFunction"], t);
      async function i(n, r) {
        return (await t(n, r)) ? n : Er;
      }
      return o(i, "filterFn"), xr.call(this, i, e);
    }
    o(vo, "filter");
    var ko = class extends xg {
      static {
        o(this, "ReduceAwareErrMissingArgs");
      }
      constructor() {
        super("reduce"),
          (this.message =
            "Reduce of an empty stream requires an initial value");
      }
    };
    async function $g(t, e, i) {
      var n;
      if (typeof t != "function")
        throw new yn("reducer", ["Function", "AsyncFunction"], t);
      i != null && Qt(i, "options"),
        i?.signal != null && Jt(i.signal, "options.signal");
      let r = arguments.length > 1;
      if (i != null && (n = i.signal) !== null && n !== void 0 && n.aborted) {
        let f = new it(void 0, { cause: i.signal.reason });
        throw (this.once("error", () => {}), await Ig(this.destroy(f)), f);
      }
      let s = new _g(),
        a = s.signal;
      if (i != null && i.signal) {
        let f = { once: !0, [vg]: this, [Fg]: !0 };
        i.signal.addEventListener("abort", () => s.abort(), f);
      }
      let c = !1;
      try {
        for await (let f of this) {
          var l;
          if (
            ((c = !0),
            i != null && (l = i.signal) !== null && l !== void 0 && l.aborted)
          )
            throw new it();
          r ? (e = await t(e, f, { signal: a })) : ((e = f), (r = !0));
        }
        if (!c && !r) throw new ko();
      } finally {
        s.abort();
      }
      return e;
    }
    o($g, "reduce");
    async function zg(t) {
      t != null && Qt(t, "options"),
        t?.signal != null && Jt(t.signal, "options.signal");
      let e = [];
      for await (let n of this) {
        var i;
        if (t != null && (i = t.signal) !== null && i !== void 0 && i.aborted)
          throw new it(void 0, { cause: t.signal.reason });
        Ng(e, n);
      }
      return e;
    }
    o(zg, "toArray");
    function Vg(t, e) {
      let i = xr.call(this, t, e);
      return o(async function* () {
        for await (let r of i) yield* r;
      }, "flatMap").call(this);
    }
    o(Vg, "flatMap");
    function eu(t) {
      if (((t = Cg(t)), Bg(t))) return 0;
      if (t < 0) throw new kg("number", ">= 0", t);
      return t;
    }
    o(eu, "toIntegerOrInfinity");
    function Hg(t, e = void 0) {
      return (
        e != null && Qt(e, "options"),
        e?.signal != null && Jt(e.signal, "options.signal"),
        (t = eu(t)),
        o(async function* () {
          var n;
          if (e != null && (n = e.signal) !== null && n !== void 0 && n.aborted)
            throw new it();
          for await (let s of this) {
            var r;
            if (
              e != null &&
              (r = e.signal) !== null &&
              r !== void 0 &&
              r.aborted
            )
              throw new it();
            t-- <= 0 && (yield s);
          }
        }, "drop").call(this)
      );
    }
    o(Hg, "drop");
    function Kg(t, e = void 0) {
      return (
        e != null && Qt(e, "options"),
        e?.signal != null && Jt(e.signal, "options.signal"),
        (t = eu(t)),
        o(async function* () {
          var n;
          if (e != null && (n = e.signal) !== null && n !== void 0 && n.aborted)
            throw new it();
          for await (let s of this) {
            var r;
            if (
              e != null &&
              (r = e.signal) !== null &&
              r !== void 0 &&
              r.aborted
            )
              throw new it();
            if ((t-- > 0 && (yield s), t <= 0)) return;
          }
        }, "take").call(this)
      );
    }
    o(Kg, "take");
    Fo.exports.streamReturningOperators = {
      asIndexedPairs: Rg(
        Wg,
        "readable.asIndexedPairs will be removed in a future version."
      ),
      drop: Hg,
      filter: vo,
      flatMap: Vg,
      map: xr,
      take: Kg,
      compose: Mg,
    };
    Fo.exports.promiseReturningOperators = {
      every: Ug,
      forEach: qg,
      reduce: $g,
      toArray: zg,
      some: Zf,
      find: jg,
    };
  });
  var Io = O((uE, iu) => {
    "use strict";
    var { ArrayPrototypePop: Gg, Promise: Yg } = q(),
      { isIterable: Xg, isNodeStream: Jg, isWebStream: Qg } = Qe(),
      { pipelineImpl: Zg } = wr(),
      { finished: ew } = ht();
    Ao();
    function tw(...t) {
      return new Yg((e, i) => {
        let n,
          r,
          s = t[t.length - 1];
        if (s && typeof s == "object" && !Jg(s) && !Xg(s) && !Qg(s)) {
          let a = Gg(t);
          (n = a.signal), (r = a.end);
        }
        Zg(
          t,
          (a, c) => {
            a ? i(a) : e(c);
          },
          { signal: n, end: r }
        );
      });
    }
    o(tw, "pipeline");
    iu.exports = { finished: ew, pipeline: tw };
  });
  var Ao = O((hE, uu) => {
    var { Buffer: iw } = ve(),
      { ObjectDefineProperty: mt, ObjectKeys: su, ReflectApply: ou } = q(),
      {
        promisify: { custom: au },
      } = re(),
      { streamReturningOperators: nu, promiseReturningOperators: ru } = tu(),
      {
        codes: { ERR_ILLEGAL_CONSTRUCTOR: cu },
      } = ae(),
      nw = xo(),
      { setDefaultHighWaterMark: rw, getDefaultHighWaterMark: sw } = on(),
      { pipeline: lu } = wr(),
      { destroyer: ow } = Vt(),
      fu = ht(),
      To = Io(),
      mn = Qe(),
      C = (uu.exports = ir().Stream);
    C.isDestroyed = mn.isDestroyed;
    C.isDisturbed = mn.isDisturbed;
    C.isErrored = mn.isErrored;
    C.isReadable = mn.isReadable;
    C.isWritable = mn.isWritable;
    C.Readable = ln();
    for (let t of su(nu)) {
      let i = function (...n) {
        if (new.target) throw cu();
        return C.Readable.from(ou(e, this, n));
      };
      (Po = i), o(i, "fn");
      let e = nu[t];
      mt(i, "name", { __proto__: null, value: e.name }),
        mt(i, "length", { __proto__: null, value: e.length }),
        mt(C.Readable.prototype, t, {
          __proto__: null,
          value: i,
          enumerable: !1,
          configurable: !0,
          writable: !0,
        });
    }
    var Po;
    for (let t of su(ru)) {
      let i = function (...r) {
        if (new.target) throw cu();
        return ou(e, this, r);
      };
      (Po = i), o(i, "fn");
      let e = ru[t];
      mt(i, "name", { __proto__: null, value: e.name }),
        mt(i, "length", { __proto__: null, value: e.length }),
        mt(C.Readable.prototype, t, {
          __proto__: null,
          value: i,
          enumerable: !1,
          configurable: !0,
          writable: !0,
        });
    }
    var Po;
    C.Writable = yr();
    C.Duplex = tt();
    C.Transform = lo();
    C.PassThrough = uo();
    C.pipeline = lu;
    var { addAbortSignal: aw } = sn();
    C.addAbortSignal = aw;
    C.finished = fu;
    C.destroy = ow;
    C.compose = nw;
    C.setDefaultHighWaterMark = rw;
    C.getDefaultHighWaterMark = sw;
    mt(C, "promises", {
      __proto__: null,
      configurable: !0,
      enumerable: !0,
      get: o(function () {
        return To;
      }, "get"),
    });
    mt(lu, au, {
      __proto__: null,
      enumerable: !0,
      get: o(function () {
        return To.pipeline;
      }, "get"),
    });
    mt(fu, au, {
      __proto__: null,
      enumerable: !0,
      get: o(function () {
        return To.finished;
      }, "get"),
    });
    C.Stream = C;
    C._isUint8Array = o(function (e) {
      return e instanceof Uint8Array;
    }, "isUint8Array");
    C._uint8ArrayToBuffer = o(function (e) {
      return iw.from(e.buffer, e.byteOffset, e.byteLength);
    }, "_uint8ArrayToBuffer");
  });
  var du = O((yE, H) => {
    "use strict";
    var Z = Ao(),
      cw = Io(),
      lw = Z.Readable.destroy;
    H.exports = Z.Readable;
    H.exports._uint8ArrayToBuffer = Z._uint8ArrayToBuffer;
    H.exports._isUint8Array = Z._isUint8Array;
    H.exports.isDisturbed = Z.isDisturbed;
    H.exports.isErrored = Z.isErrored;
    H.exports.isReadable = Z.isReadable;
    H.exports.Readable = Z.Readable;
    H.exports.Writable = Z.Writable;
    H.exports.Duplex = Z.Duplex;
    H.exports.Transform = Z.Transform;
    H.exports.PassThrough = Z.PassThrough;
    H.exports.addAbortSignal = Z.addAbortSignal;
    H.exports.finished = Z.finished;
    H.exports.destroy = Z.destroy;
    H.exports.destroy = lw;
    H.exports.pipeline = Z.pipeline;
    H.exports.compose = Z.compose;
    Object.defineProperty(Z, "promises", {
      configurable: !0,
      enumerable: !0,
      get: o(function () {
        return cw;
      }, "get"),
    });
    H.exports.Stream = Z.Stream;
    H.exports.default = H.exports;
  });
  var Aw = {};
  Fn(Aw, {
    Async: () => Ho,
    AsyncTransaction: () => ss,
    BigIntStats: () => me,
    BigIntStatsFs: () => $i,
    Dir: () => vt,
    Dirent: () => kt,
    Errno: () => W,
    ErrnoError: () => u,
    Fetch: () => xw,
    FetchFS: () => Br,
    File: () => Bt,
    FileSystem: () => pe,
    InMemory: () => Xi,
    InMemoryStore: () => Nn,
    Index: () => Cr,
    IndexFS: () => kn,
    Inode: () => Ve,
    MutexLock: () => Dr,
    Mutexed: () => ea,
    NoSyncFile: () => ci,
    Overlay: () => vw,
    OverlayFS: () => vn,
    Port: () => mw,
    PortFS: () => Lr,
    PortFile: () => En,
    PreloadFile: () => ge,
    ReadStream: () => Pt,
    Readonly: () => Qo,
    SimpleAsyncStore: () => os,
    SimpleTransaction: () => li,
    Stats: () => Y,
    StatsCommon: () => ji,
    StatsFs: () => qi,
    StoreFS: () => Ki,
    Sync: () => Fw,
    SyncTransaction: () => Yi,
    Transaction: () => Gi,
    UnmutexedOverlayFS: () => Wr,
    WriteStream: () => Ot,
    ZenFsType: () => rs,
    _InMemory: () => Pa,
    _Port: () => dd,
    __MutexedFS: () => Mr,
    _toUnixTimestamp: () => Ad,
    access: () => Hu,
    accessSync: () => Ja,
    appendFile: () => Eu,
    appendFileSync: () => Da,
    attachFS: () => ud,
    checkOptions: () => $r,
    chmod: () => ju,
    chmodSync: () => Ga,
    chown: () => Wu,
    chownSync: () => Ha,
    close: () => ku,
    closeSync: () => xt,
    configure: () => dw,
    configureSingle: () => uw,
    constants: () => St,
    copyFile: () => ed,
    copyFileSync: () => ps,
    cp: () => rd,
    cpSync: () => ys,
    createReadStream: () => Xu,
    createWriteStream: () => Ju,
    credentials: () => ye,
    decode: () => ti,
    decodeDirListing: () => Tn,
    default: () => Iw,
    detachFS: () => yw,
    encode: () => Re,
    encodeDirListing: () => _e,
    errorMessages: () => jr,
    exists: () => pu,
    existsSync: () => Ge,
    fchmod: () => Ou,
    fchmodSync: () => jn,
    fchown: () => Pu,
    fchownSync: () => Un,
    fdatasync: () => Iu,
    fdatasyncSync: () => ja,
    flagToMode: () => zi,
    flagToNumber: () => Nh,
    flagToString: () => Aa,
    fs: () => _n,
    fstat: () => xu,
    fstatSync: () => Ma,
    fsync: () => Fu,
    fsyncSync: () => Ua,
    ftruncate: () => vu,
    ftruncateSync: () => Wa,
    futimes: () => Ru,
    futimesSync: () => qn,
    handleRequest: () => xn,
    isAppendable: () => ft,
    isBackend: () => Ci,
    isBackendConfig: () => Bi,
    isExclusive: () => Hi,
    isReadable: () => _t,
    isStatsEqual: () => ns,
    isSynchronous: () => Lh,
    isTruncating: () => Vi,
    isWriteable: () => be,
    lchmod: () => qu,
    lchmodSync: () => Ya,
    lchown: () => Uu,
    lchownSync: () => Ka,
    levenshtein: () => qr,
    link: () => Bu,
    linkSync: () => za,
    lopenSync: () => tn,
    lstat: () => mu,
    lstatSync: () => ls,
    lutimes: () => zu,
    lutimesSync: () => Xa,
    mkdir: () => Lu,
    mkdirSync: () => $n,
    mkdirpSync: () => oa,
    mkdtemp: () => Zu,
    mkdtempSync: () => Qa,
    mount: () => Mt,
    mountObject: () => Qi,
    mounts: () => Ae,
    normalizeMode: () => Ee,
    normalizeOptions: () => xe,
    normalizePath: () => x,
    normalizeTime: () => Nt,
    open: () => wu,
    openAsBlob: () => od,
    openSync: () => en,
    opendir: () => nd,
    opendirSync: () => tc,
    parseFlag: () => D,
    promises: () => Sn,
    randomIno: () => Ui,
    read: () => Tu,
    readFile: () => Su,
    readFileSync: () => Wn,
    readSync: () => $a,
    readdir: () => Cu,
    readdirSync: () => di,
    readlink: () => Mu,
    readlinkSync: () => us,
    readv: () => td,
    readvSync: () => Za,
    realpath: () => Vu,
    realpathSync: () => Ke,
    rename: () => hu,
    renameSync: () => La,
    resolveMountConfig: () => Oi,
    resolveRemoteMount: () => bw,
    rm: () => Qu,
    rmSync: () => hs,
    rmdir: () => Nu,
    rmdirSync: () => fs,
    rootCredentials: () => Td,
    rootIno: () => He,
    setImmediate: () => Id,
    size_max: () => Ie,
    stat: () => yu,
    statSync: () => Te,
    statfs: () => sd,
    statfsSync: () => ic,
    symlink: () => Du,
    symlinkSync: () => Va,
    truncate: () => bu,
    truncateSync: () => Ca,
    umount: () => fi,
    unlink: () => gu,
    unlinkSync: () => Mn,
    unwatchFile: () => Gu,
    utimes: () => $u,
    utimesSync: () => ds,
    version: () => Zo,
    watch: () => Yu,
    watchFile: () => Ku,
    write: () => Au,
    writeFile: () => _u,
    writeFileSync: () => nn,
    writeSync: () => qa,
    writev: () => id,
    writevSync: () => ec,
  });
  var W = ((p) => (
      (p[(p.EPERM = 1)] = "EPERM"),
      (p[(p.ENOENT = 2)] = "ENOENT"),
      (p[(p.EINTR = 4)] = "EINTR"),
      (p[(p.EIO = 5)] = "EIO"),
      (p[(p.ENXIO = 6)] = "ENXIO"),
      (p[(p.EBADF = 9)] = "EBADF"),
      (p[(p.EAGAIN = 11)] = "EAGAIN"),
      (p[(p.ENOMEM = 12)] = "ENOMEM"),
      (p[(p.EACCES = 13)] = "EACCES"),
      (p[(p.EFAULT = 14)] = "EFAULT"),
      (p[(p.ENOTBLK = 15)] = "ENOTBLK"),
      (p[(p.EBUSY = 16)] = "EBUSY"),
      (p[(p.EEXIST = 17)] = "EEXIST"),
      (p[(p.EXDEV = 18)] = "EXDEV"),
      (p[(p.ENODEV = 19)] = "ENODEV"),
      (p[(p.ENOTDIR = 20)] = "ENOTDIR"),
      (p[(p.EISDIR = 21)] = "EISDIR"),
      (p[(p.EINVAL = 22)] = "EINVAL"),
      (p[(p.ENFILE = 23)] = "ENFILE"),
      (p[(p.EMFILE = 24)] = "EMFILE"),
      (p[(p.ETXTBSY = 26)] = "ETXTBSY"),
      (p[(p.EFBIG = 27)] = "EFBIG"),
      (p[(p.ENOSPC = 28)] = "ENOSPC"),
      (p[(p.ESPIPE = 29)] = "ESPIPE"),
      (p[(p.EROFS = 30)] = "EROFS"),
      (p[(p.EMLINK = 31)] = "EMLINK"),
      (p[(p.EPIPE = 32)] = "EPIPE"),
      (p[(p.EDOM = 33)] = "EDOM"),
      (p[(p.ERANGE = 34)] = "ERANGE"),
      (p[(p.EDEADLK = 35)] = "EDEADLK"),
      (p[(p.ENAMETOOLONG = 36)] = "ENAMETOOLONG"),
      (p[(p.ENOLCK = 37)] = "ENOLCK"),
      (p[(p.ENOSYS = 38)] = "ENOSYS"),
      (p[(p.ENOTEMPTY = 39)] = "ENOTEMPTY"),
      (p[(p.ELOOP = 40)] = "ELOOP"),
      (p[(p.ENOMSG = 42)] = "ENOMSG"),
      (p[(p.EBADE = 52)] = "EBADE"),
      (p[(p.EBADR = 53)] = "EBADR"),
      (p[(p.EXFULL = 54)] = "EXFULL"),
      (p[(p.ENOANO = 55)] = "ENOANO"),
      (p[(p.EBADRQC = 56)] = "EBADRQC"),
      (p[(p.ENOSTR = 60)] = "ENOSTR"),
      (p[(p.ENODATA = 61)] = "ENODATA"),
      (p[(p.ETIME = 62)] = "ETIME"),
      (p[(p.ENOSR = 63)] = "ENOSR"),
      (p[(p.ENONET = 64)] = "ENONET"),
      (p[(p.EREMOTE = 66)] = "EREMOTE"),
      (p[(p.ENOLINK = 67)] = "ENOLINK"),
      (p[(p.ECOMM = 70)] = "ECOMM"),
      (p[(p.EPROTO = 71)] = "EPROTO"),
      (p[(p.EBADMSG = 74)] = "EBADMSG"),
      (p[(p.EOVERFLOW = 75)] = "EOVERFLOW"),
      (p[(p.EBADFD = 77)] = "EBADFD"),
      (p[(p.ESTRPIPE = 86)] = "ESTRPIPE"),
      (p[(p.ENOTSOCK = 88)] = "ENOTSOCK"),
      (p[(p.EDESTADDRREQ = 89)] = "EDESTADDRREQ"),
      (p[(p.EMSGSIZE = 90)] = "EMSGSIZE"),
      (p[(p.EPROTOTYPE = 91)] = "EPROTOTYPE"),
      (p[(p.ENOPROTOOPT = 92)] = "ENOPROTOOPT"),
      (p[(p.EPROTONOSUPPORT = 93)] = "EPROTONOSUPPORT"),
      (p[(p.ESOCKTNOSUPPORT = 94)] = "ESOCKTNOSUPPORT"),
      (p[(p.ENOTSUP = 95)] = "ENOTSUP"),
      (p[(p.ENETDOWN = 100)] = "ENETDOWN"),
      (p[(p.ENETUNREACH = 101)] = "ENETUNREACH"),
      (p[(p.ENETRESET = 102)] = "ENETRESET"),
      (p[(p.ETIMEDOUT = 110)] = "ETIMEDOUT"),
      (p[(p.ECONNREFUSED = 111)] = "ECONNREFUSED"),
      (p[(p.EHOSTDOWN = 112)] = "EHOSTDOWN"),
      (p[(p.EHOSTUNREACH = 113)] = "EHOSTUNREACH"),
      (p[(p.EALREADY = 114)] = "EALREADY"),
      (p[(p.EINPROGRESS = 115)] = "EINPROGRESS"),
      (p[(p.ESTALE = 116)] = "ESTALE"),
      (p[(p.EREMOTEIO = 121)] = "EREMOTEIO"),
      (p[(p.EDQUOT = 122)] = "EDQUOT"),
      p
    ))(W || {}),
    jr = {
      1: "Operation not permitted",
      2: "No such file or directory",
      4: "Interrupted system call",
      5: "Input/output error",
      6: "No such device or address",
      9: "Bad file descriptor",
      11: "Resource temporarily unavailable",
      12: "Cannot allocate memory",
      13: "Permission denied",
      14: "Bad address",
      15: "Block device required",
      16: "Resource busy or locked",
      17: "File exists",
      18: "Invalid cross-device link",
      19: "No such device",
      20: "File is not a directory",
      21: "File is a directory",
      22: "Invalid argument",
      23: "Too many open files in system",
      24: "Too many open files",
      26: "Text file busy",
      27: "File is too big",
      28: "No space left on disk",
      29: "Illegal seek",
      30: "Cannot modify a read-only file system",
      31: "Too many links",
      32: "Broken pipe",
      33: "Numerical argument out of domain",
      34: "Numerical result out of range",
      35: "Resource deadlock would occur",
      36: "File name too long",
      37: "No locks available",
      38: "Function not implemented",
      39: "Directory is not empty",
      40: "Too many levels of symbolic links",
      42: "No message of desired type",
      52: "Invalid exchange",
      53: "Invalid request descriptor",
      54: "Exchange full",
      55: "No anode",
      56: "Invalid request code",
      60: "Device not a stream",
      61: "No data available",
      62: "Timer expired",
      63: "Out of streams resources",
      64: "Machine is not on the network",
      66: "Object is remote",
      67: "Link has been severed",
      70: "Communication error on send",
      71: "Protocol error",
      74: "Bad message",
      75: "Value too large for defined data type",
      77: "File descriptor in bad state",
      86: "Streams pipe error",
      88: "Socket operation on non-socket",
      89: "Destination address required",
      90: "Message too long",
      91: "Protocol wrong type for socket",
      92: "Protocol not available",
      93: "Protocol not supported",
      94: "Socket type not supported",
      95: "Operation is not supported",
      100: "Network is down",
      101: "Network is unreachable",
      102: "Network dropped connection on reset",
      110: "Connection timed out",
      111: "Connection refused",
      112: "Host is down",
      113: "No route to host",
      114: "Operation already in progress",
      115: "Operation now in progress",
      116: "Stale file handle",
      121: "Remote I/O error",
      122: "Disk quota exceeded",
    },
    u = class t extends Error {
      constructor(i, n = jr[i], r, s = "") {
        super(n);
        this.errno = i;
        this.path = r;
        this.syscall = s;
        (this.code = W[i]),
          (this.message = `${this.code}: ${n}${
            this.path ? `, '${this.path}'` : ""
          }`);
      }
      static {
        o(this, "ErrnoError");
      }
      static fromJSON(i) {
        let n = new t(i.errno, i.message, i.path, i.syscall);
        return (n.code = i.code), (n.stack = i.stack), n;
      }
      static With(i, n, r) {
        return new t(W[i], jr[W[i]], n, r);
      }
      toString() {
        return this.message;
      }
      toJSON() {
        return {
          errno: this.errno,
          code: this.code,
          path: this.path,
          stack: this.stack,
          message: this.message,
          syscall: this.syscall,
        };
      }
      bufferSize() {
        return 4 + JSON.stringify(this.toJSON()).length;
      }
    };
  var vd = "/";
  function sa(t, e) {
    let i = "",
      n = 0,
      r = -1,
      s = 0,
      a = "\0";
    for (let c = 0; c <= t.length; ++c) {
      if (c < t.length) a = t[c];
      else {
        if (a == "/") break;
        a = "/";
      }
      if (a == "/") {
        if (!(r === c - 1 || s === 1))
          if (s === 2) {
            if (
              i.length < 2 ||
              n !== 2 ||
              i.at(-1) !== "." ||
              i.at(-2) !== "."
            ) {
              if (i.length > 2) {
                let l = i.lastIndexOf("/");
                l === -1
                  ? ((i = ""), (n = 0))
                  : ((i = i.slice(0, l)),
                    (n = i.length - 1 - i.lastIndexOf("/"))),
                  (r = c),
                  (s = 0);
                continue;
              } else if (i.length !== 0) {
                (i = ""), (n = 0), (r = c), (s = 0);
                continue;
              }
            }
            e && ((i += i.length > 0 ? "/.." : ".."), (n = 2));
          } else
            i.length > 0
              ? (i += "/" + t.slice(r + 1, c))
              : (i = t.slice(r + 1, c)),
              (n = c - r - 1);
        (r = c), (s = 0);
      } else a === "." && s !== -1 ? ++s : (s = -1);
    }
    return i;
  }
  o(sa, "normalizeString");
  function gt(...t) {
    let e = "";
    for (let n of [...t.reverse(), vd])
      if (n.length && ((e = `${n}/${e}`), n.startsWith("/"))) break;
    let i = e.startsWith("/");
    return (e = sa(e, !i)), i ? `/${e}` : e.length ? e : "/";
  }
  o(gt, "resolve");
  function Fd(t) {
    if (!t.length) return ".";
    let e = t.startsWith("/"),
      i = t.endsWith("/");
    return (
      (t = sa(t, !e)),
      t.length ? (i && (t += "/"), e ? `/${t}` : t) : e ? "/" : i ? "./" : "."
    );
  }
  o(Fd, "normalize");
  function z(...t) {
    if (!t.length) return ".";
    let e = t.join("/");
    return e?.length ? Fd(e) : ".";
  }
  o(z, "join");
  function E(t) {
    if (t.length === 0) return ".";
    let e = t[0] === "/",
      i = -1,
      n = !0;
    for (let r = t.length - 1; r >= 1; --r)
      if (t[r] === "/") {
        if (!n) {
          i = r;
          break;
        }
      } else n = !1;
    return i === -1 ? (e ? "/" : ".") : e && i === 1 ? "//" : t.slice(0, i);
  }
  o(E, "dirname");
  function B(t, e) {
    let i = 0,
      n = -1,
      r = !0;
    if (e !== void 0 && e.length > 0 && e.length <= t.length) {
      if (e === t) return "";
      let s = e.length - 1,
        a = -1;
      for (let c = t.length - 1; c >= 0; --c)
        if (t[c] === "/") {
          if (!r) {
            i = c + 1;
            break;
          }
        } else
          a === -1 && ((r = !1), (a = c + 1)),
            s >= 0 &&
              (t[c] === e[s] ? --s === -1 && (n = c) : ((s = -1), (n = a)));
      return i === n ? (n = a) : n === -1 && (n = t.length), t.slice(i, n);
    }
    for (let s = t.length - 1; s >= 0; --s)
      if (t[s] === "/") {
        if (!r) {
          i = s + 1;
          break;
        }
      } else n === -1 && ((r = !1), (n = s + 1));
    return n === -1 ? "" : t.slice(i, n);
  }
  o(B, "basename");
  function In(t) {
    let e = t.startsWith("/"),
      i = { root: e ? "/" : "", dir: "", base: "", ext: "", name: "" };
    if (t.length === 0) return i;
    let n = e ? 1 : 0,
      r = -1,
      s = 0,
      a = -1,
      c = !0,
      l = t.length - 1,
      f = 0;
    for (; l >= n; --l) {
      if (t[l] === "/") {
        if (!c) {
          s = l + 1;
          break;
        }
        continue;
      }
      a === -1 && ((c = !1), (a = l + 1)),
        t[l] === "."
          ? r === -1
            ? (r = l)
            : f !== 1 && (f = 1)
          : r !== -1 && (f = -1);
    }
    if (a !== -1) {
      let d = s === 0 && e ? 1 : s;
      r === -1 || f === 0 || (f === 1 && r === a - 1 && r === s + 1)
        ? (i.base = i.name = t.slice(d, a))
        : ((i.name = t.slice(d, r)),
          (i.base = t.slice(d, a)),
          (i.ext = t.slice(r, a)));
    }
    return s > 0 ? (i.dir = t.slice(0, s - 1)) : e && (i.dir = "/"), i;
  }
  o(In, "parse");
  function oa(t, e, i) {
    i.existsSync(t) || (oa(E(t), e, i), i.mkdirSync(t, e));
  }
  o(oa, "mkdirpSync");
  function An(t, e, i, n, r) {
    return Math.min(t + 1, e + 1, i + 1, n === r ? e : e + 1);
  }
  o(An, "_min");
  function qr(t, e) {
    if (t === e) return 0;
    t.length > e.length && ([t, e] = [e, t]);
    let i = t.length,
      n = e.length;
    for (; i > 0 && t.charCodeAt(i - 1) === e.charCodeAt(n - 1); ) i--, n--;
    let r = 0;
    for (; r < i && t.charCodeAt(r) === e.charCodeAt(r); ) r++;
    if (((i -= r), (n -= r), i === 0 || n === 1)) return n;
    let s = new Array(i << 1);
    for (let b = 0; b < i; ) (s[i + b] = t.charCodeAt(r + b)), (s[b] = ++b);
    let a, c, l, f, d;
    for (a = 0; a + 3 < n; ) {
      let b = e.charCodeAt(r + (c = a)),
        y = e.charCodeAt(r + (l = a + 1)),
        S = e.charCodeAt(r + (f = a + 2)),
        g = e.charCodeAt(r + (d = a + 3)),
        I = (a += 4);
      for (let k = 0; k < i; ) {
        let A = s[i + k],
          L = s[k];
        (c = An(L, c, l, b, A)),
          (l = An(c, l, f, y, A)),
          (f = An(l, f, d, S, A)),
          (I = An(f, d, I, g, A)),
          (s[k++] = I),
          (d = f),
          (f = l),
          (l = c),
          (c = L);
      }
    }
    let h = 0;
    for (; a < n; ) {
      let b = e.charCodeAt(r + (c = a));
      h = ++a;
      for (let y = 0; y < i; y++) {
        let S = s[y];
        (s[y] = h =
          S < c || h < c
            ? S > h
              ? h + 1
              : S + 1
            : b === s[i + y]
            ? c
            : c + 1),
          (c = S);
      }
    }
    return h;
  }
  o(qr, "levenshtein");
  var Id =
    typeof globalThis.setImmediate == "function"
      ? globalThis.setImmediate
      : (t) => setTimeout(t, 0);
  function Re(t) {
    if (typeof t != "string") throw new u(22, "Can not encode a non-string");
    return new Uint8Array(Array.from(t).map((e) => e.charCodeAt(0)));
  }
  o(Re, "encode");
  function ti(t) {
    if (!(t instanceof Uint8Array))
      throw new u(22, "Can not decode a non-Uint8Array");
    return Array.from(t)
      .map((e) => String.fromCharCode(e))
      .join("");
  }
  o(ti, "decode");
  function Tn(t) {
    return JSON.parse(ti(t), (e, i) => (e == "" ? i : BigInt(i)));
  }
  o(Tn, "decodeDirListing");
  function _e(t) {
    return Re(JSON.stringify(t, (e, i) => (e == "" ? i : i.toString())));
  }
  o(_e, "encodeDirListing");
  function Ad(t) {
    if (typeof t == "number") return Math.floor(t);
    if (t instanceof Date) return Math.floor(t.getTime() / 1e3);
    throw new Error("Cannot parse time");
  }
  o(Ad, "_toUnixTimestamp");
  function Ee(t, e) {
    if (typeof t == "number") return t;
    if (typeof t == "string") {
      let i = parseInt(t, 8);
      if (!isNaN(i)) return i;
    }
    if (typeof e == "number") return e;
    throw new u(22, "Invalid mode: " + t?.toString());
  }
  o(Ee, "normalizeMode");
  function Nt(t) {
    if (t instanceof Date) return t;
    if (typeof t == "number") return new Date(t * 1e3);
    if (typeof t == "string") return new Date(t);
    throw new u(22, "Invalid time.");
  }
  o(Nt, "normalizeTime");
  function x(t) {
    if (((t = t.toString()), t.includes("\0")))
      throw new u(22, "Path can not contain null character");
    if (t.length == 0) throw new u(22, "Path can not be empty");
    return gt(t.replaceAll(/[/\\]+/g, "/"));
  }
  o(x, "normalizePath");
  function xe(t, e = "utf8", i, n = 0) {
    return typeof t != "object" || t === null
      ? { encoding: typeof t == "string" ? t : e ?? null, flag: i, mode: n }
      : {
          encoding: typeof t?.encoding == "string" ? t.encoding : e ?? null,
          flag: typeof t?.flag == "string" ? t.flag : i,
          mode: Ee("mode" in t ? t?.mode : null, n),
        };
  }
  o(xe, "normalizeOptions");
  function Ci(t) {
    return (
      t != null &&
      typeof t == "object" &&
      "isAvailable" in t &&
      typeof t.isAvailable == "function" &&
      "create" in t &&
      typeof t.create == "function"
    );
  }
  o(Ci, "isBackend");
  async function $r(t, e) {
    if (typeof e != "object" || e === null) throw new u(22, "Invalid options");
    for (let [i, n] of Object.entries(t.options)) {
      let r = e?.[i];
      if (r == null) {
        if (!n.required) continue;
        let a = Object.keys(e)
          .filter((c) => !(c in t.options))
          .map((c) => ({ str: c, distance: qr(i, c) }))
          .filter((c) => c.distance < 5)
          .sort((c, l) => c.distance - l.distance);
        throw new u(
          22,
          `${t.name}: Required option '${i}' not provided.${
            a.length > 0
              ? ` You provided '${a[0].str}', did you mean '${i}'.`
              : ""
          }`
        );
      }
      if (
        !(Array.isArray(n.type)
          ? n.type.indexOf(typeof r) != -1
          : typeof r == n.type)
      )
        throw new u(
          22,
          `${
            t.name
          }: Value provided for option ${i} is not the proper type. Expected ${
            Array.isArray(n.type) ? `one of {${n.type.join(", ")}}` : n.type
          }, but received ${typeof r}`
        );
      n.validator && (await n.validator(r));
    }
  }
  o($r, "checkOptions");
  function Bi(t) {
    return t != null && typeof t == "object" && "backend" in t && Ci(t.backend);
  }
  o(Bi, "isBackendConfig");
  var ye = { uid: 0, gid: 0, suid: 0, sgid: 0, euid: 0, egid: 0 },
    Td = { uid: 0, gid: 0, suid: 0, sgid: 0, euid: 0, egid: 0 };
  var _n = {};
  Fn(_n, {
    BigIntStatsFs: () => $i,
    Dir: () => vt,
    Dirent: () => kt,
    ReadStream: () => Pt,
    Stats: () => Y,
    StatsFs: () => qi,
    WriteStream: () => Ot,
    access: () => Hu,
    accessSync: () => Ja,
    appendFile: () => Eu,
    appendFileSync: () => Da,
    chmod: () => ju,
    chmodSync: () => Ga,
    chown: () => Wu,
    chownSync: () => Ha,
    close: () => ku,
    closeSync: () => xt,
    constants: () => St,
    copyFile: () => ed,
    copyFileSync: () => ps,
    cp: () => rd,
    cpSync: () => ys,
    createReadStream: () => Xu,
    createWriteStream: () => Ju,
    exists: () => pu,
    existsSync: () => Ge,
    fchmod: () => Ou,
    fchmodSync: () => jn,
    fchown: () => Pu,
    fchownSync: () => Un,
    fdatasync: () => Iu,
    fdatasyncSync: () => ja,
    fstat: () => xu,
    fstatSync: () => Ma,
    fsync: () => Fu,
    fsyncSync: () => Ua,
    ftruncate: () => vu,
    ftruncateSync: () => Wa,
    futimes: () => Ru,
    futimesSync: () => qn,
    lchmod: () => qu,
    lchmodSync: () => Ya,
    lchown: () => Uu,
    lchownSync: () => Ka,
    link: () => Bu,
    linkSync: () => za,
    lopenSync: () => tn,
    lstat: () => mu,
    lstatSync: () => ls,
    lutimes: () => zu,
    lutimesSync: () => Xa,
    mkdir: () => Lu,
    mkdirSync: () => $n,
    mkdtemp: () => Zu,
    mkdtempSync: () => Qa,
    mount: () => Mt,
    mountObject: () => Qi,
    mounts: () => Ae,
    open: () => wu,
    openAsBlob: () => od,
    openSync: () => en,
    opendir: () => nd,
    opendirSync: () => tc,
    promises: () => Sn,
    read: () => Tu,
    readFile: () => Su,
    readFileSync: () => Wn,
    readSync: () => $a,
    readdir: () => Cu,
    readdirSync: () => di,
    readlink: () => Mu,
    readlinkSync: () => us,
    readv: () => td,
    readvSync: () => Za,
    realpath: () => Vu,
    realpathSync: () => Ke,
    rename: () => hu,
    renameSync: () => La,
    rm: () => Qu,
    rmSync: () => hs,
    rmdir: () => Nu,
    rmdirSync: () => fs,
    stat: () => yu,
    statSync: () => Te,
    statfs: () => sd,
    statfsSync: () => ic,
    symlink: () => Du,
    symlinkSync: () => Va,
    truncate: () => bu,
    truncateSync: () => Ca,
    umount: () => fi,
    unlink: () => gu,
    unlinkSync: () => Mn,
    unwatchFile: () => Gu,
    utimes: () => $u,
    utimesSync: () => ds,
    watch: () => Yu,
    watchFile: () => Ku,
    write: () => Au,
    writeFile: () => _u,
    writeFileSync: () => nn,
    writeSync: () => qa,
    writev: () => id,
    writevSync: () => ec,
  });
  var Vo = Li(ve(), 1);
  var St = {};
  Fn(St, {
    COPYFILE_EXCL: () => Wi,
    COPYFILE_FICLONE: () => lh,
    COPYFILE_FICLONE_FORCE: () => fh,
    F_OK: () => Mi,
    O_APPEND: () => ze,
    O_CREAT: () => te,
    O_DIRECT: () => bh,
    O_DIRECTORY: () => dh,
    O_DSYNC: () => yh,
    O_EXCL: () => qe,
    O_NOATIME: () => hh,
    O_NOCTTY: () => uh,
    O_NOFOLLOW: () => ph,
    O_NONBLOCK: () => gh,
    O_RDONLY: () => oi,
    O_RDWR: () => ue,
    O_SYMLINK: () => mh,
    O_SYNC: () => ai,
    O_TRUNC: () => $e,
    O_WRONLY: () => je,
    R_OK: () => Fe,
    S_IFBLK: () => at,
    S_IFCHR: () => ct,
    S_IFDIR: () => he,
    S_IFIFO: () => lt,
    S_IFLNK: () => Ne,
    S_IFMT: () => G,
    S_IFREG: () => de,
    S_IFSOCK: () => ot,
    S_IRGRP: () => vh,
    S_IROTH: () => Ah,
    S_IRUSR: () => Eh,
    S_IRWXG: () => ts,
    S_IRWXO: () => is,
    S_IRWXU: () => es,
    S_ISGID: () => Sh,
    S_ISUID: () => wh,
    S_ISVTX: () => _h,
    S_IWGRP: () => Fh,
    S_IWOTH: () => Th,
    S_IWUSR: () => xh,
    S_IXGRP: () => Ih,
    S_IXOTH: () => Ph,
    S_IXUSR: () => kh,
    UV_FS_O_FILEMAP: () => Oh,
    W_OK: () => J,
    X_OK: () => ch,
  });
  var Mi = 0,
    Fe = 4,
    J = 2,
    ch = 1,
    Wi = 1,
    lh = 2,
    fh = 4,
    oi = 0,
    je = 1,
    ue = 2,
    te = 64,
    qe = 128,
    uh = 256,
    $e = 512,
    ze = 1024,
    dh = 65536,
    hh = 262144,
    ph = 131072,
    ai = 1052672,
    yh = 4096,
    mh = 32768,
    bh = 16384,
    gh = 2048,
    G = 61440,
    ot = 49152,
    Ne = 40960,
    de = 32768,
    at = 24576,
    he = 16384,
    ct = 8192,
    lt = 4096,
    wh = 2048,
    Sh = 1024,
    _h = 512,
    es = 448,
    Eh = 256,
    xh = 128,
    kh = 64,
    ts = 56,
    vh = 32,
    Fh = 16,
    Ih = 8,
    is = 7,
    Ah = 4,
    Th = 2,
    Ph = 1,
    Oh = 0;
  var Ie = 2 ** 32 - 1,
    He = 0n;
  function Ia() {
    return Math.round(Math.random() * 2 ** 32).toString(16);
  }
  o(Ia, "_random");
  function Ui() {
    return BigInt("0x" + Ia() + Ia());
  }
  o(Ui, "randomIno");
  var U = {
    ino: 0,
    size: 8,
    mode: 12,
    nlink: 14,
    uid: 18,
    gid: 22,
    atime: 26,
    birthtime: 34,
    mtime: 42,
    ctime: 50,
    end: 58,
  };
  var Ve = class {
    static {
      o(this, "Inode");
    }
    get data() {
      return new Uint8Array(this.buffer);
    }
    constructor(e) {
      let i = !e;
      if (((e ??= new ArrayBuffer(U.end)), e?.byteLength < U.end))
        throw new RangeError(
          `Can not create an inode from a buffer less than ${U.end} bytes`
        );
      if (((this.view = new DataView(e)), (this.buffer = e), !i)) return;
      (this.ino = Ui()), (this.nlink = 1), (this.size = 4096);
      let n = Date.now();
      (this.atimeMs = n),
        (this.mtimeMs = n),
        (this.ctimeMs = n),
        (this.birthtimeMs = n);
    }
    get ino() {
      return this.view.getBigUint64(U.ino, !0);
    }
    set ino(e) {
      this.view.setBigUint64(U.ino, e, !0);
    }
    get size() {
      return this.view.getUint32(U.size, !0);
    }
    set size(e) {
      this.view.setUint32(U.size, e, !0);
    }
    get mode() {
      return this.view.getUint16(U.mode, !0);
    }
    set mode(e) {
      this.view.setUint16(U.mode, e, !0);
    }
    get nlink() {
      return this.view.getUint32(U.nlink, !0);
    }
    set nlink(e) {
      this.view.setUint32(U.nlink, e, !0);
    }
    get uid() {
      return this.view.getUint32(U.uid, !0);
    }
    set uid(e) {
      this.view.setUint32(U.uid, e, !0);
    }
    get gid() {
      return this.view.getUint32(U.gid, !0);
    }
    set gid(e) {
      this.view.setUint32(U.gid, e, !0);
    }
    get atimeMs() {
      return this.view.getFloat64(U.atime, !0);
    }
    set atimeMs(e) {
      this.view.setFloat64(U.atime, e, !0);
    }
    get birthtimeMs() {
      return this.view.getFloat64(U.birthtime, !0);
    }
    set birthtimeMs(e) {
      this.view.setFloat64(U.birthtime, e, !0);
    }
    get mtimeMs() {
      return this.view.getFloat64(U.mtime, !0);
    }
    set mtimeMs(e) {
      this.view.setFloat64(U.mtime, e, !0);
    }
    get ctimeMs() {
      return this.view.getFloat64(U.ctime, !0);
    }
    set ctimeMs(e) {
      this.view.setFloat64(U.ctime, e, !0);
    }
    toStats() {
      return new Y(this);
    }
    update(e) {
      let i = !1;
      return (
        this.size !== e.size && ((this.size = e.size), (i = !0)),
        this.mode !== e.mode && ((this.mode = e.mode), (i = !0)),
        this.nlink !== e.nlink && ((this.nlink = e.nlink), (i = !0)),
        this.uid !== e.uid && ((this.uid = e.uid), (i = !0)),
        this.uid !== e.uid && ((this.uid = e.uid), (i = !0)),
        this.atimeMs !== e.atimeMs && ((this.atimeMs = e.atimeMs), (i = !0)),
        this.mtimeMs !== e.mtimeMs && ((this.mtimeMs = e.mtimeMs), (i = !0)),
        this.ctimeMs !== e.ctimeMs && ((this.ctimeMs = e.ctimeMs), (i = !0)),
        i
      );
    }
  };
  var ji = class {
      constructor({
        atimeMs: e,
        mtimeMs: i,
        ctimeMs: n,
        birthtimeMs: r,
        uid: s,
        gid: a,
        size: c,
        mode: l,
        ino: f,
      } = {}) {
        this.dev = this._convert(0);
        this.ino = this._convert(0);
        this.rdev = this._convert(0);
        this.nlink = this._convert(1);
        this.blksize = this._convert(4096);
        this.uid = this._convert(0);
        this.gid = this._convert(0);
        let d = Date.now();
        (this.atimeMs = this._convert(e ?? d)),
          (this.mtimeMs = this._convert(i ?? d)),
          (this.ctimeMs = this._convert(n ?? d)),
          (this.birthtimeMs = this._convert(r ?? d)),
          (this.uid = this._convert(s ?? 0)),
          (this.gid = this._convert(a ?? 0)),
          (this.size = this._convert(c ?? 0)),
          (this.ino = this._convert(f ?? 0)),
          (this.mode = this._convert(l ?? 0)),
          this.mode & 61440 || (this.mode = this.mode | this._convert(32768));
      }
      static {
        o(this, "StatsCommon");
      }
      _convert(e) {
        return this._isBigint ? BigInt(e) : Number(e);
      }
      get blocks() {
        return this._convert(Math.ceil(Number(this.size) / 512));
      }
      get atime() {
        return new Date(Number(this.atimeMs));
      }
      set atime(e) {
        this.atimeMs = this._convert(e.getTime());
      }
      get mtime() {
        return new Date(Number(this.mtimeMs));
      }
      set mtime(e) {
        this.mtimeMs = this._convert(e.getTime());
      }
      get ctime() {
        return new Date(Number(this.ctimeMs));
      }
      set ctime(e) {
        this.ctimeMs = this._convert(e.getTime());
      }
      get birthtime() {
        return new Date(Number(this.birthtimeMs));
      }
      set birthtime(e) {
        this.birthtimeMs = this._convert(e.getTime());
      }
      isFile() {
        return (this.mode & 61440) === 32768;
      }
      isDirectory() {
        return (this.mode & 61440) === 16384;
      }
      isSymbolicLink() {
        return (this.mode & 61440) === 40960;
      }
      isSocket() {
        return (this.mode & 61440) === 49152;
      }
      isBlockDevice() {
        return (this.mode & 61440) === 24576;
      }
      isCharacterDevice() {
        return (this.mode & 61440) === 8192;
      }
      isFIFO() {
        return (this.mode & 61440) === 4096;
      }
      hasAccess(e) {
        if (ye.euid === 0 || ye.egid === 0) return !0;
        let i =
          (ye.uid == this.uid ? 448 : 0) | (ye.gid == this.gid ? 56 : 0) | 7;
        return (e & this.mode & i) == e;
      }
      cred(e = Number(this.uid), i = Number(this.gid)) {
        return {
          uid: e,
          gid: i,
          suid: Number(this.uid),
          sgid: Number(this.gid),
          euid: e,
          egid: i,
        };
      }
      chmod(e) {
        this.mode = this._convert((this.mode & 61440) | e);
      }
      chown(e, i) {
        (e = Number(e)),
          (i = Number(i)),
          !isNaN(e) && 0 <= e && e < 2 ** 32 && (this.uid = this._convert(e)),
          !isNaN(i) && 0 <= i && i < 2 ** 32 && (this.gid = this._convert(i));
      }
      get atimeNs() {
        return BigInt(this.atimeMs) * 1000n;
      }
      get mtimeNs() {
        return BigInt(this.mtimeMs) * 1000n;
      }
      get ctimeNs() {
        return BigInt(this.ctimeMs) * 1000n;
      }
      get birthtimeNs() {
        return BigInt(this.birthtimeMs) * 1000n;
      }
    },
    Y = class extends ji {
      constructor() {
        super(...arguments);
        this._isBigint = !1;
      }
      static {
        o(this, "Stats");
      }
    },
    me = class extends ji {
      constructor() {
        super(...arguments);
        this._isBigint = !0;
      }
      static {
        o(this, "BigIntStats");
      }
    };
  function ns(t, e) {
    return (
      t.size == e.size &&
      +t.atime == +e.atime &&
      +t.mtime == +e.mtime &&
      +t.ctime == +e.ctime &&
      t.mode == e.mode
    );
  }
  o(ns, "isStatsEqual");
  var rs = 525687744115,
    qi = class {
      constructor() {
        this.type = 525687744115;
        this.bsize = 4096;
        this.blocks = 0;
        this.bfree = 0;
        this.bavail = 0;
        this.files = Ie;
        this.ffree = Ie;
      }
      static {
        o(this, "StatsFs");
      }
    },
    $i = class {
      constructor() {
        this.type = 0x7a656e6673n;
        this.bsize = 4096n;
        this.blocks = 0n;
        this.bfree = 0n;
        this.bavail = 0n;
        this.files = BigInt(Ie);
        this.ffree = BigInt(Ie);
      }
      static {
        o(this, "BigIntStatsFs");
      }
    };
  var Sn = {};
  Fn(Sn, {
    FileHandle: () => ce,
    access: () => jo,
    appendFile: () => No,
    chmod: () => Mo,
    chown: () => Bo,
    constants: () => St,
    copyFile: () => Pr,
    cp: () => Or,
    exists: () => Me,
    lchmod: () => Wo,
    lchown: () => Do,
    link: () => Lo,
    lstat: () => vr,
    lutimes: () => Uo,
    mkdir: () => wn,
    mkdtemp: () => qo,
    open: () => we,
    opendir: () => $o,
    readFile: () => gn,
    readdir: () => Ut,
    readlink: () => Ir,
    realpath: () => De,
    rename: () => Oo,
    rm: () => Tr,
    rmdir: () => Fr,
    stat: () => nt,
    statfs: () => zo,
    symlink: () => Co,
    truncate: () => Ro,
    unlink: () => bn,
    utimes: () => Ar,
    watch: () => fw,
    writeFile: () => Ti,
  });
  var Zt = Li(ve(), 1);
  Promise.withResolvers ??= function () {
    let t, e;
    return {
      promise: new Promise((n, r) => {
        (t = n), (e = r);
      }),
      resolve: t,
      reject: e,
    };
  };
  Symbol.dispose ??= Symbol("Symbol.dispose");
  Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
  var Rh = [
    "r",
    "r+",
    "rs",
    "rs+",
    "w",
    "wx",
    "w+",
    "wx+",
    "a",
    "ax",
    "a+",
    "ax+",
  ];
  function D(t) {
    if (typeof t == "number") return Aa(t);
    if (!Rh.includes(t)) throw new Error("Invalid flag string: " + t);
    return t;
  }
  o(D, "parseFlag");
  function Aa(t) {
    switch (t) {
      case 0:
        return "r";
      case 1052672:
        return "rs";
      case 2:
        return "r+";
      case 1052674:
        return "rs+";
      case 577:
        return "w";
      case 705:
        return "wx";
      case 578:
        return "w+";
      case 706:
        return "wx+";
      case 1089:
        return "a";
      case 1217:
        return "ax";
      case 1090:
        return "a+";
      case 1218:
        return "ax+";
      default:
        throw new Error("Invalid flag number: " + t);
    }
  }
  o(Aa, "flagToString");
  function Nh(t) {
    switch (t) {
      case "r":
        return 0;
      case "rs":
        return 1052672;
      case "r+":
        return 2;
      case "rs+":
        return 1052674;
      case "w":
        return 577;
      case "wx":
        return 705;
      case "w+":
        return 578;
      case "wx+":
        return 706;
      case "a":
        return 1089;
      case "ax":
        return 1217;
      case "a+":
        return 1090;
      case "ax+":
        return 1218;
      default:
        throw new Error("Invalid flag string: " + t);
    }
  }
  o(Nh, "flagToNumber");
  function zi(t) {
    let e = 0;
    return (e <<= 1), (e += +_t(t)), (e <<= 1), (e += +be(t)), (e <<= 1), e;
  }
  o(zi, "flagToMode");
  function _t(t) {
    return t.indexOf("r") !== -1 || t.indexOf("+") !== -1;
  }
  o(_t, "isReadable");
  function be(t) {
    return (
      t.indexOf("w") !== -1 || t.indexOf("a") !== -1 || t.indexOf("+") !== -1
    );
  }
  o(be, "isWriteable");
  function Vi(t) {
    return t.indexOf("w") !== -1;
  }
  o(Vi, "isTruncating");
  function ft(t) {
    return t.indexOf("a") !== -1;
  }
  o(ft, "isAppendable");
  function Lh(t) {
    return t.indexOf("s") !== -1;
  }
  o(Lh, "isSynchronous");
  function Hi(t) {
    return t.indexOf("x") !== -1;
  }
  o(Hi, "isExclusive");
  var Bt = class {
      constructor(e, i) {
        this.fs = e;
        this.path = i;
      }
      static {
        o(this, "File");
      }
      [Symbol.asyncDispose]() {
        return this.close();
      }
      [Symbol.dispose]() {
        return this.closeSync();
      }
      datasync() {
        return this.sync();
      }
      datasyncSync() {
        return this.syncSync();
      }
    },
    ge = class extends Bt {
      constructor(
        i,
        n,
        r,
        s,
        a = new Uint8Array(
          new ArrayBuffer(
            0,
            i.metadata().noResizableBuffers ? {} : { maxByteLength: Ie }
          )
        )
      ) {
        super(i, n);
        this.fs = i;
        this.flag = r;
        this.stats = s;
        this._buffer = a;
        this._position = 0;
        this.dirty = !1;
        this.closed = !1;
        if (this.stats.size != a.byteLength) {
          if (_t(this.flag))
            throw new Error(
              `Size mismatch: buffer length ${a.byteLength}, stats size ${this.stats.size}`
            );
          this.dirty = !0;
        }
      }
      static {
        o(this, "PreloadFile");
      }
      get buffer() {
        return this._buffer;
      }
      get position() {
        return ft(this.flag) ? this.stats.size : this._position;
      }
      set position(i) {
        this._position = i;
      }
      async sync() {
        if (this.closed) throw u.With("EBADF", this.path, "File.sync");
        this.dirty &&
          (await this.fs.sync(this.path, this._buffer, this.stats),
          (this.dirty = !1));
      }
      syncSync() {
        if (this.closed) throw u.With("EBADF", this.path, "File.sync");
        this.dirty &&
          (this.fs.syncSync(this.path, this._buffer, this.stats),
          (this.dirty = !1));
      }
      async close() {
        if (this.closed) throw u.With("EBADF", this.path, "File.close");
        await this.sync(), this.dispose();
      }
      closeSync() {
        if (this.closed) throw u.With("EBADF", this.path, "File.close");
        this.syncSync(), this.dispose();
      }
      dispose(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File.dispose");
        if (this.dirty && !i) throw u.With("EBUSY", this.path, "File.dispose");
        delete this._buffer, delete this.stats, (this.closed = !0);
      }
      stat() {
        if (this.closed) throw u.With("EBADF", this.path, "File.stat");
        return Promise.resolve(new Y(this.stats));
      }
      statSync() {
        if (this.closed) throw u.With("EBADF", this.path, "File.stat");
        return new Y(this.stats);
      }
      _truncate(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File.truncate");
        if (((this.dirty = !0), !be(this.flag)))
          throw new u(1, "File not opened with a writeable mode.");
        if (((this.stats.mtimeMs = Date.now()), i > this._buffer.length)) {
          let n = new Uint8Array(i - this._buffer.length);
          this.writeSync(n, 0, n.length, this._buffer.length);
          return;
        }
        (this.stats.size = i), (this._buffer = this._buffer.slice(0, i));
      }
      async truncate(i) {
        this._truncate(i), await this.sync();
      }
      truncateSync(i) {
        this._truncate(i), this.syncSync();
      }
      _write(i, n = 0, r = this.stats.size, s = this.position) {
        if (this.closed) throw u.With("EBADF", this.path, "File.write");
        if (((this.dirty = !0), !be(this.flag)))
          throw new u(1, "File not opened with a writeable mode.");
        let a = s + r;
        if (
          a > this.stats.size &&
          ((this.stats.size = a), a > this._buffer.byteLength)
        )
          if (
            this._buffer.buffer.resizable &&
            this._buffer.buffer.maxByteLength <= a
          )
            this._buffer.buffer.resize(a);
          else {
            let l = new Uint8Array(
              new ArrayBuffer(
                a,
                this.fs.metadata().noResizableBuffers
                  ? {}
                  : { maxByteLength: Ie }
              )
            );
            l.set(this._buffer), (this._buffer = l);
          }
        let c = i.slice(n, n + r);
        return (
          this._buffer.set(c, s),
          (this.stats.mtimeMs = Date.now()),
          (this.position = s + c.byteLength),
          c.byteLength
        );
      }
      async write(i, n, r, s) {
        let a = this._write(i, n, r, s);
        return await this.sync(), a;
      }
      writeSync(i, n = 0, r = this.stats.size, s = this.position) {
        let a = this._write(i, n, r, s);
        return this.syncSync(), a;
      }
      _read(i, n = 0, r = this.stats.size, s) {
        if (this.closed) throw u.With("EBADF", this.path, "File.read");
        if (!_t(this.flag))
          throw new u(1, "File not opened with a readable mode.");
        (this.dirty = !0), (s ??= this.position);
        let a = s + r;
        a > this.stats.size && (a = s + Math.max(this.stats.size - s, 0)),
          (this.stats.atimeMs = Date.now()),
          (this._position = a);
        let c = a - s;
        return (
          c == 0 ||
            new Uint8Array(i.buffer, n, r).set(this._buffer.slice(s, a)),
          c
        );
      }
      async read(i, n, r, s) {
        let a = this._read(i, n, r, s);
        return await this.sync(), { bytesRead: a, buffer: i };
      }
      readSync(i, n, r, s) {
        let a = this._read(i, n, r, s);
        return this.statSync(), a;
      }
      async chmod(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File.chmod");
        (this.dirty = !0), this.stats.chmod(i), await this.sync();
      }
      chmodSync(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File.chmod");
        (this.dirty = !0), this.stats.chmod(i), this.syncSync();
      }
      async chown(i, n) {
        if (this.closed) throw u.With("EBADF", this.path, "File.chown");
        (this.dirty = !0), this.stats.chown(i, n), await this.sync();
      }
      chownSync(i, n) {
        if (this.closed) throw u.With("EBADF", this.path, "File.chown");
        (this.dirty = !0), this.stats.chown(i, n), this.syncSync();
      }
      async utimes(i, n) {
        if (this.closed) throw u.With("EBADF", this.path, "File.utimes");
        (this.dirty = !0),
          (this.stats.atime = i),
          (this.stats.mtime = n),
          await this.sync();
      }
      utimesSync(i, n) {
        if (this.closed) throw u.With("EBADF", this.path, "File.utimes");
        (this.dirty = !0),
          (this.stats.atime = i),
          (this.stats.mtime = n),
          this.syncSync();
      }
      async _setType(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File._setType");
        (this.dirty = !0),
          (this.stats.mode = (this.stats.mode & -61441) | i),
          await this.sync();
      }
      _setTypeSync(i) {
        if (this.closed) throw u.With("EBADF", this.path, "File._setType");
        (this.dirty = !0),
          (this.stats.mode = (this.stats.mode & -61441) | i),
          this.syncSync();
      }
      async [Symbol.asyncDispose]() {
        await this.close();
      }
      [Symbol.dispose]() {
        this.closeSync();
      }
    },
    ci = class extends ge {
      static {
        o(this, "NoSyncFile");
      }
      constructor(e, i, n, r, s) {
        super(e, i, n, r, s);
      }
      sync() {
        return Promise.resolve();
      }
      syncSync() {}
      close() {
        return Promise.resolve();
      }
      closeSync() {}
    };
  var Et = Li(ve(), 1);
  var pe = class {
    static {
      o(this, "FileSystem");
    }
    metadata() {
      return {
        name: this.constructor.name.toLowerCase(),
        readonly: !1,
        totalSpace: 0,
        freeSpace: 0,
        noResizableBuffers: !1,
        noAsyncCache: this._disableSync ?? !1,
        type: rs,
      };
    }
    constructor(...e) {}
    async ready() {}
    async exists(e) {
      try {
        return await this.stat(e), !0;
      } catch (i) {
        return i.code != "ENOENT";
      }
    }
    existsSync(e) {
      try {
        return this.statSync(e), !0;
      } catch (i) {
        return i.code != "ENOENT";
      }
    }
  };
  var Ta = 5,
    Ki = class extends pe {
      constructor(i) {
        super();
        this.store = i;
        this._initialized = !1;
      }
      static {
        o(this, "StoreFS");
      }
      async ready() {
        this._initialized || (await this.checkRoot(), (this._initialized = !0));
      }
      metadata() {
        return { ...super.metadata(), name: this.store.name };
      }
      async empty() {
        await this.store.clear(), await this.checkRoot();
      }
      emptySync() {
        this.store.clearSync(), this.checkRootSync();
      }
      async rename(i, n) {
        var S = [];
        try {
          let r = w(S, this.store.transaction(), !0);
          let s = E(i),
            a = B(i),
            c = E(n),
            l = B(n),
            f = await this.findINode(r, s),
            d = await this.getDirListing(r, f, s);
          if (!d[a]) throw u.With("ENOENT", i, "rename");
          let h = d[a];
          delete d[a];
          if ((c + "/").indexOf(i + "/") === 0) throw new u(16, s);
          let b, y;
          c === s
            ? ((b = f), (y = d))
            : ((b = await this.findINode(r, c)),
              (y = await this.getDirListing(r, b, c)));
          if (y[l]) {
            let L = await this.getINode(r, y[l], n);
            if (!L.toStats().isFile()) throw u.With("EPERM", n, "rename");
            await r.remove(L.ino), await r.remove(y[l]);
          }
          y[l] = h;
          await r.set(f.ino, _e(d));
          await r.set(b.ino, _e(y));
          await r.commit();
        } catch (g) {
          var I = g,
            k = !0;
        } finally {
          var A = _(S, I, k);
          A && (await A);
        }
      }
      renameSync(i, n) {
        var S = [];
        try {
          let r = w(S, this.store.transaction());
          let s = E(i),
            a = B(i),
            c = E(n),
            l = B(n),
            f = this.findINodeSync(r, s),
            d = this.getDirListingSync(r, f, s);
          if (!d[a]) throw u.With("ENOENT", i, "rename");
          let h = d[a];
          delete d[a];
          if ((c + "/").indexOf(i + "/") == 0) throw new u(16, s);
          let b, y;
          c === s
            ? ((b = f), (y = d))
            : ((b = this.findINodeSync(r, c)),
              (y = this.getDirListingSync(r, b, c)));
          if (y[l]) {
            let A = this.getINodeSync(r, y[l], n);
            if (!A.toStats().isFile()) throw u.With("EPERM", n, "rename");
            r.removeSync(A.ino), r.removeSync(y[l]);
          }
          y[l] = h;
          r.setSync(f.ino, _e(d));
          r.setSync(b.ino, _e(y));
          r.commitSync();
        } catch (g) {
          var I = g,
            k = !0;
        } finally {
          _(S, I, k);
        }
      }
      async stat(i) {
        var s = [];
        try {
          let n = w(s, this.store.transaction(), !0);
          let r = await this.findINode(n, i);
          if (!r) throw u.With("ENOENT", i, "stat");
          return r.toStats();
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          var f = _(s, c, l);
          f && (await f);
        }
      }
      statSync(i) {
        var r = [];
        try {
          let n = w(r, this.store.transaction());
          return this.findINodeSync(n, i).toStats();
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      async createFile(i, n, r) {
        let s = await this.commitNew(i, 32768, r, new Uint8Array(0));
        return new ge(this, i, n, s.toStats(), new Uint8Array(0));
      }
      createFileSync(i, n, r) {
        return this.commitNewSync(i, 32768, r), this.openFileSync(i, n);
      }
      async openFile(i, n) {
        var c = [];
        try {
          let r = w(c, this.store.transaction(), !0);
          let s = await this.findINode(r, i),
            a = await r.get(s.ino);
          if (!a) throw u.With("ENOENT", i, "openFile");
          return new ge(this, i, n, s.toStats(), a);
        } catch (l) {
          var f = l,
            d = !0;
        } finally {
          var h = _(c, f, d);
          h && (await h);
        }
      }
      openFileSync(i, n) {
        var c = [];
        try {
          let r = w(c, this.store.transaction());
          let s = this.findINodeSync(r, i),
            a = r.getSync(s.ino);
          if (!a) throw u.With("ENOENT", i, "openFile");
          return new ge(this, i, n, s.toStats(), a);
        } catch (l) {
          var f = l,
            d = !0;
        } finally {
          _(c, f, d);
        }
      }
      async unlink(i) {
        return this.remove(i, !1);
      }
      unlinkSync(i) {
        this.removeSync(i, !1);
      }
      async rmdir(i) {
        if ((await this.readdir(i)).length)
          throw u.With("ENOTEMPTY", i, "rmdir");
        await this.remove(i, !0);
      }
      rmdirSync(i) {
        if (this.readdirSync(i).length) throw u.With("ENOTEMPTY", i, "rmdir");
        this.removeSync(i, !0);
      }
      async mkdir(i, n) {
        await this.commitNew(i, 16384, n, Re("{}"));
      }
      mkdirSync(i, n) {
        this.commitNewSync(i, 16384, n, Re("{}"));
      }
      async readdir(i) {
        var s = [];
        try {
          let n = w(s, this.store.transaction(), !0);
          let r = await this.findINode(n, i);
          return Object.keys(await this.getDirListing(n, r, i));
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          var f = _(s, c, l);
          f && (await f);
        }
      }
      readdirSync(i) {
        var s = [];
        try {
          let n = w(s, this.store.transaction());
          let r = this.findINodeSync(n, i);
          return Object.keys(this.getDirListingSync(n, r, i));
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          _(s, c, l);
        }
      }
      async sync(i, n, r) {
        var f = [];
        try {
          let s = w(f, this.store.transaction(), !0);
          let a = await this._findINode(s, E(i), B(i)),
            c = await this.getINode(s, a, i),
            l = c.update(r);
          await s.set(c.ino, n);
          l && (await s.set(a, c.data));
          await s.commit();
        } catch (d) {
          var h = d,
            b = !0;
        } finally {
          var y = _(f, h, b);
          y && (await y);
        }
      }
      syncSync(i, n, r) {
        var f = [];
        try {
          let s = w(f, this.store.transaction());
          let a = this._findINodeSync(s, E(i), B(i)),
            c = this.getINodeSync(s, a, i),
            l = c.update(r);
          s.setSync(c.ino, n);
          l && s.setSync(a, c.data);
          s.commitSync();
        } catch (d) {
          var h = d,
            b = !0;
        } finally {
          _(f, h, b);
        }
      }
      async link(i, n) {
        var d = [];
        try {
          let r = w(d, this.store.transaction(), !0);
          let s = E(n),
            a = await this.findINode(r, s),
            c = await this.getDirListing(r, a, s);
          let l = await this._findINode(r, E(i), B(i));
          let f = await this.getINode(r, l, i);
          f.nlink++;
          c[B(n)] = l;
          r.setSync(l, f.data);
          r.setSync(a.ino, _e(c));
          r.commitSync();
        } catch (h) {
          var b = h,
            y = !0;
        } finally {
          var S = _(d, b, y);
          S && (await S);
        }
      }
      linkSync(i, n) {
        var d = [];
        try {
          let r = w(d, this.store.transaction());
          let s = E(n),
            a = this.findINodeSync(r, s),
            c = this.getDirListingSync(r, a, s);
          let l = this._findINodeSync(r, E(i), B(i));
          let f = this.getINodeSync(r, l, i);
          f.nlink++;
          c[B(n)] = l;
          r.setSync(l, f.data);
          r.setSync(a.ino, _e(c));
          r.commitSync();
        } catch (h) {
          var b = h,
            y = !0;
        } finally {
          _(d, b, y);
        }
      }
      async checkRoot() {
        var r = [];
        try {
          let i = w(r, this.store.transaction(), !0);
          if (await i.get(He)) return;
          let n = new Ve();
          n.mode = 16895;
          await i.set(n.ino, Re("{}"));
          await i.set(He, n.data);
          await i.commit();
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          var l = _(r, a, c);
          l && (await l);
        }
      }
      checkRootSync() {
        var r = [];
        try {
          let i = w(r, this.store.transaction());
          if (i.getSync(He)) return;
          let n = new Ve();
          n.mode = 16895;
          i.setSync(n.ino, Re("{}"));
          i.setSync(He, n.data);
          i.commitSync();
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      async _findINode(i, n, r, s = new Set()) {
        let a = z(n, r);
        if (s.has(a))
          throw new u(5, "Infinite loop detected while finding inode", a);
        if ((s.add(a), n == "/" && r === "")) return He;
        let c =
            n == "/"
              ? await this.getINode(i, He, n)
              : await this.findINode(i, n, s),
          l = await this.getDirListing(i, c, n);
        if (!(r in l)) throw u.With("ENOENT", gt(n, r), "_findINode");
        return l[r];
      }
      _findINodeSync(i, n, r, s = new Set()) {
        let a = z(n, r);
        if (s.has(a))
          throw new u(5, "Infinite loop detected while finding inode", a);
        if ((s.add(a), n == "/" && r === "")) return He;
        let c =
            n == "/"
              ? this.getINodeSync(i, He, n)
              : this.findINodeSync(i, n, s),
          l = this.getDirListingSync(i, c, n);
        if (!(r in l)) throw u.With("ENOENT", gt(n, r), "_findINode");
        return l[r];
      }
      async findINode(i, n, r = new Set()) {
        let s = await this._findINode(i, E(n), B(n), r);
        return this.getINode(i, s, n);
      }
      findINodeSync(i, n, r = new Set()) {
        let s = this._findINodeSync(i, E(n), B(n), r);
        return this.getINodeSync(i, s, n);
      }
      async getINode(i, n, r) {
        let s = await i.get(n);
        if (!s) throw u.With("ENOENT", r, "getINode");
        return new Ve(s.buffer);
      }
      getINodeSync(i, n, r) {
        let s = i.getSync(n);
        if (!s) throw u.With("ENOENT", r, "getINode");
        return new Ve(s.buffer);
      }
      async getDirListing(i, n, r) {
        if (!n.toStats().isDirectory())
          throw u.With("ENOTDIR", r, "getDirListing");
        let s = await i.get(n.ino);
        if (!s) throw u.With("ENOENT", r, "getDirListing");
        return Tn(s);
      }
      getDirListingSync(i, n, r) {
        if (!n.toStats().isDirectory())
          throw u.With("ENOTDIR", r, "getDirListing");
        let s = i.getSync(n.ino);
        if (!s) throw u.With("ENOENT", r, "getDirListing");
        return Tn(s);
      }
      async addNew(i, n, r) {
        for (let s = 0; s < Ta; s++) {
          let a = Ui();
          if (!(await i.get(a))) return await i.set(a, n), a;
        }
        throw new u(28, "No inode IDs available", r, "addNewNode");
      }
      addNewSync(i, n, r) {
        for (let s = 0; s < Ta; s++) {
          let a = Ui();
          if (!i.getSync(a)) return i.setSync(a, n), a;
        }
        throw new u(28, "No inode IDs available", r, "addNewNode");
      }
      async commitNew(i, n, r, s) {
        var b = [];
        try {
          let a = w(b, this.store.transaction(), !0);
          let c = E(i),
            l = await this.findINode(a, c);
          let f = B(i),
            d = await this.getDirListing(a, l, c);
          if (i === "/") throw u.With("EEXIST", i, "commitNew");
          if (d[f]) throw (await a.abort(), u.With("EEXIST", i, "commitNew"));
          let h = new Ve();
          h.ino = await this.addNew(a, s, i);
          h.mode = r | n;
          h.uid = ye.uid;
          h.gid = ye.gid;
          h.size = s.length;
          d[f] = await this.addNew(a, h.data, i);
          await a.set(l.ino, _e(d));
          await a.commit();
          return h;
        } catch (y) {
          var S = y,
            g = !0;
        } finally {
          var I = _(b, S, g);
          I && (await I);
        }
      }
      commitNewSync(i, n, r, s = new Uint8Array()) {
        var b = [];
        try {
          let a = w(b, this.store.transaction());
          let c = E(i),
            l = this.findINodeSync(a, c);
          let f = B(i),
            d = this.getDirListingSync(a, l, c);
          if (i === "/") throw u.With("EEXIST", i, "commitNew");
          if (d[f]) throw u.With("EEXIST", i, "commitNew");
          let h = new Ve();
          h.ino = this.addNewSync(a, s, i);
          h.size = s.length;
          h.mode = r | n;
          h.uid = ye.uid;
          h.gid = ye.gid;
          d[f] = this.addNewSync(a, h.data, i);
          a.setSync(l.ino, _e(d));
          a.commitSync();
          return h;
        } catch (y) {
          var S = y,
            g = !0;
        } finally {
          _(b, S, g);
        }
      }
      async remove(i, n) {
        var h = [];
        try {
          let r = w(h, this.store.transaction(), !0);
          let s = E(i),
            a = await this.findINode(r, s),
            c = await this.getDirListing(r, a, s),
            l = B(i);
          if (!c[l]) throw u.With("ENOENT", i, "remove");
          let f = c[l];
          let d = await this.getINode(r, f, i);
          delete c[l];
          if (!n && d.toStats().isDirectory())
            throw u.With("EISDIR", i, "remove");
          if (n && !d.toStats().isDirectory())
            throw u.With("ENOTDIR", i, "remove");
          await r.set(a.ino, _e(c));
          --d.nlink < 1 && (await r.remove(d.ino), await r.remove(f));
          await r.commit();
        } catch (b) {
          var y = b,
            S = !0;
        } finally {
          var g = _(h, y, S);
          g && (await g);
        }
      }
      removeSync(i, n) {
        var h = [];
        try {
          let r = w(h, this.store.transaction());
          let s = E(i),
            a = this.findINodeSync(r, s),
            c = this.getDirListingSync(r, a, s),
            l = B(i),
            f = c[l];
          if (!f) throw u.With("ENOENT", i, "remove");
          let d = this.getINodeSync(r, f, i);
          delete c[l];
          if (!n && d.toStats().isDirectory())
            throw u.With("EISDIR", i, "remove");
          if (n && !d.toStats().isDirectory())
            throw u.With("ENOTDIR", i, "remove");
          r.setSync(a.ino, _e(c));
          --d.nlink < 1 && (r.removeSync(d.ino), r.removeSync(f));
          r.commitSync();
        } catch (b) {
          var y = b,
            S = !0;
        } finally {
          _(h, y, S);
        }
      }
    };
  var Gi = class {
      constructor(e) {
        this.store = e;
        this.done = !1;
      }
      static {
        o(this, "Transaction");
      }
      async [Symbol.asyncDispose]() {
        this.done || (await this.abort());
      }
      [Symbol.dispose]() {
        this.done || this.abortSync();
      }
    },
    Yi = class extends Gi {
      static {
        o(this, "SyncTransaction");
      }
      async get(e) {
        return this.getSync(e);
      }
      async set(e, i) {
        return this.setSync(e, i);
      }
      async remove(e) {
        return this.removeSync(e);
      }
      async commit() {
        return this.commitSync();
      }
      async abort() {
        return this.abortSync();
      }
    },
    ss = class extends Gi {
      static {
        o(this, "AsyncTransaction");
      }
      getSync() {
        throw u.With("ENOSYS", void 0, "AsyncTransaction.getSync");
      }
      setSync() {
        throw u.With("ENOSYS", void 0, "AsyncTransaction.setSync");
      }
      removeSync() {
        throw u.With("ENOSYS", void 0, "AsyncTransaction.removeSync");
      }
      commitSync() {
        throw u.With("ENOSYS", void 0, "AsyncTransaction.commitSync");
      }
      abortSync() {
        throw u.With("ENOSYS", void 0, "AsyncTransaction.abortSync");
      }
    };
  var os = class {
      constructor() {
        this.cache = new Map();
        this.queue = new Set();
      }
      static {
        o(this, "SimpleAsyncStore");
      }
      get(e) {
        return this.cache.get(e);
      }
      set(e, i) {
        this.cache.set(e, i), this.queue.add(this._set(e, i));
      }
      delete(e) {
        this.cache.delete(e), this.queue.add(this._delete(e));
      }
      clearSync() {
        this.cache.clear(), this.queue.add(this.clear());
      }
      async sync() {
        for (let [e, i] of await this.entries())
          this.cache.has(e) || this.cache.set(e, i);
        for (let e of this.queue) await e;
      }
      transaction() {
        return new li(this);
      }
    },
    li = class extends Yi {
      constructor(i) {
        super(i);
        this.originalData = new Map();
        this.modifiedKeys = new Set();
      }
      static {
        o(this, "SimpleTransaction");
      }
      getSync(i) {
        let n = this.store.get(i);
        return this.stashOldValue(i, n), n;
      }
      setSync(i, n) {
        return this.markModified(i), this.store.set(i, n);
      }
      removeSync(i) {
        this.markModified(i), this.store.delete(i);
      }
      commitSync() {
        this.done = !0;
      }
      abortSync() {
        if (this.done) {
          for (let i of this.modifiedKeys) {
            let n = this.originalData.get(i);
            n ? this.store.set(i, n) : this.store.delete(i);
          }
          this.done = !0;
        }
      }
      stashOldValue(i, n) {
        this.originalData.has(i) || this.originalData.set(i, n);
      }
      markModified(i) {
        this.modifiedKeys.add(i),
          this.originalData.has(i) ||
            this.originalData.set(i, this.store.get(i));
      }
    };
  var Nn = class extends Map {
      constructor(i = "tmp") {
        super();
        this.name = i;
      }
      static {
        o(this, "InMemoryStore");
      }
      async sync() {}
      clearSync() {
        this.clear();
      }
      transaction() {
        return new li(this);
      }
    },
    Pa = {
      name: "InMemory",
      isAvailable: o(function () {
        return !0;
      }, "isAvailable"),
      options: {
        name: {
          type: "string",
          required: !1,
          description: "The name of the store",
        },
      },
      create: o(function ({ name: t }) {
        let e = new Ki(new Nn(t));
        return e.checkRootSync(), e;
      }, "create"),
    },
    Xi = Pa;
  var Dt = new Map(),
    Ch = 100;
  function Ji(t) {
    let e = Ch++;
    return Dt.set(e, t), e;
  }
  o(Ji, "file2fd");
  function j(t) {
    if (!Dt.has(t)) throw new u(9);
    return Dt.get(t);
  }
  o(j, "fd2file");
  var Ae = new Map();
  Mt("/", Xi.create({ name: "root" }));
  function Mt(t, e) {
    if ((t[0] !== "/" && (t = "/" + t), (t = gt(t)), Ae.has(t)))
      throw new u(22, "Mount point " + t + " is already in use.");
    Ae.set(t, e);
  }
  o(Mt, "mount");
  function fi(t) {
    if ((t[0] !== "/" && (t = `/${t}`), (t = gt(t)), !Ae.has(t)))
      throw new u(22, "Mount point " + t + " is already unmounted.");
    Ae.delete(t);
  }
  o(fi, "umount");
  function R(t) {
    t = x(t);
    let e = [...Ae].sort((i, n) => (i[0].length > n[0].length ? -1 : 1));
    for (let [i, n] of e)
      if (i.length <= t.length && t.startsWith(i))
        return (
          (t = t.slice(i.length > 1 ? i.length : 0)),
          t === "" && (t = "/"),
          { fs: n, path: t, mountPoint: i }
        );
    throw new u(5, "ZenFS not initialized with a file system");
  }
  o(R, "resolveMount");
  function Oa(t, e) {
    for (let [i, n] of Object.entries(e)) t = t?.replaceAll(i, n);
    return t;
  }
  o(Oa, "fixPaths");
  function X(t, e) {
    return (
      typeof t.stack == "string" && (t.stack = Oa(t.stack, e)),
      (t.message = Oa(t.message, e)),
      t
    );
  }
  o(X, "fixError");
  function Qi(t) {
    "/" in t && fi("/");
    for (let [e, i] of Object.entries(t)) Mt(e, i);
  }
  o(Qi, "mountObject");
  function Ln(t, e) {
    let i = t.metadata(),
      n = i.blockSize || 4096;
    return {
      type: (e ? BigInt : Number)(i.type),
      bsize: (e ? BigInt : Number)(n),
      ffree: (e ? BigInt : Number)(i.freeNodes || Ie),
      files: (e ? BigInt : Number)(i.totalNodes || Ie),
      bavail: (e ? BigInt : Number)(i.freeSpace / n),
      bfree: (e ? BigInt : Number)(i.freeSpace / n),
      blocks: (e ? BigInt : Number)(i.totalSpace / n),
    };
  }
  o(Ln, "_statfs");
  var cs = Li(Na(), 1);
  var Bn = class extends cs.default {
      constructor(i) {
        super();
        this.path = i;
      }
      static {
        o(this, "Watcher");
      }
      off(i, n, r, s) {
        return super.off(i, n, r, s);
      }
      removeListener(i, n, r, s) {
        return super.removeListener(i, n, r, s);
      }
      setMaxListeners() {
        throw u.With("ENOSYS", this.path, "Watcher.setMaxListeners");
      }
      getMaxListeners() {
        throw u.With("ENOSYS", this.path, "Watcher.getMaxListeners");
      }
      prependListener() {
        throw u.With("ENOSYS", this.path, "Watcher.prependListener");
      }
      prependOnceListener() {
        throw u.With("ENOSYS", this.path, "Watcher.prependOnceListener");
      }
      rawListeners() {
        throw u.With("ENOSYS", this.path, "Watcher.rawListeners");
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
    },
    ui = class extends Bn {
      constructor(i, n) {
        super(i);
        this.options = n;
        Mh(i.toString(), this);
      }
      static {
        o(this, "FSWatcher");
      }
      close() {
        super.emit("close"), Wh(this.path.toString(), this);
      }
      [Symbol.dispose]() {
        this.close();
      }
    },
    Dn = class extends Bn {
      constructor(i, n) {
        super(i);
        this.options = n;
        this.start();
      }
      static {
        o(this, "StatWatcher");
      }
      onInterval() {
        try {
          let i = Te(this.path);
          ns(this.previous, i) ||
            (this.emit("change", i, this.previous), (this.previous = i));
        } catch (i) {
          this.emit("error", i);
        }
      }
      start() {
        let i = this.options.interval || 5e3;
        try {
          this.previous = Te(this.path);
        } catch (n) {
          this.emit("error", n);
          return;
        }
        (this.intervalId = setInterval(this.onInterval.bind(this), i)),
          !this.options.persistent &&
            typeof this.intervalId == "object" &&
            this.intervalId.unref();
      }
      stop() {
        this.intervalId &&
          (clearInterval(this.intervalId), (this.intervalId = void 0)),
          this.removeAllListeners();
      }
    },
    Le = new Map();
  function Mh(t, e) {
    let i = x(t);
    Le.has(i) || Le.set(i, new Set()), Le.get(i).add(e);
  }
  o(Mh, "addWatcher");
  function Wh(t, e) {
    let i = x(t);
    Le.has(i) && (Le.get(i).delete(e), Le.get(i).size === 0 && Le.delete(i));
  }
  o(Wh, "removeWatcher");
  function M(t, e) {
    let i = x(e);
    if (Le.has(i)) for (let r of Le.get(i)) r.emit("change", t, B(e));
    let n = E(i);
    for (; n !== i && n !== "/"; ) {
      if (Le.has(n)) for (let r of Le.get(n)) r.emit("change", t, B(e));
      (i = n), (n = E(n));
    }
  }
  o(M, "emitChange");
  function La(t, e) {
    (t = x(t)), (e = x(e));
    let i = R(t),
      n = R(e);
    if (!Te(E(t)).hasAccess(2)) throw u.With("EACCES", t, "rename");
    try {
      if (i === n) {
        i.fs.renameSync(i.path, n.path), M("rename", t.toString());
        return;
      }
      nn(e, Wn(t)), Mn(t), M("rename", t.toString());
    } catch (r) {
      throw X(r, { [i.path]: t, [n.path]: e });
    }
  }
  o(La, "renameSync");
  function Ge(t) {
    t = x(t);
    try {
      let { fs: e, path: i } = R(Ke(t));
      return e.existsSync(i);
    } catch (e) {
      if (e.errno == 2) return !1;
      throw e;
    }
  }
  o(Ge, "existsSync");
  function Te(t, e) {
    t = x(t);
    let { fs: i, path: n } = R(Ge(t) ? Ke(t) : t);
    try {
      let r = i.statSync(n);
      if (!r.hasAccess(4)) throw u.With("EACCES", t, "stat");
      return e?.bigint ? new me(r) : r;
    } catch (r) {
      throw X(r, { [n]: t });
    }
  }
  o(Te, "statSync");
  function ls(t, e) {
    t = x(t);
    let { fs: i, path: n } = R(t);
    try {
      let r = i.statSync(n);
      return e?.bigint ? new me(r) : r;
    } catch (r) {
      throw X(r, { [n]: t });
    }
  }
  o(ls, "lstatSync");
  function Ca(t, e = 0) {
    var n = [];
    try {
      let i = w(n, Wt(t, "r+"));
      e ||= 0;
      if (e < 0) throw new u(22);
      i.truncateSync(e);
    } catch (r) {
      var s = r,
        a = !0;
    } finally {
      _(n, s, a);
    }
  }
  o(Ca, "truncateSync");
  function Mn(t) {
    t = x(t);
    let { fs: e, path: i } = R(t);
    try {
      if (!e.statSync(i).hasAccess(2)) throw u.With("EACCES", i, "unlink");
      e.unlinkSync(i), M("rename", t.toString());
    } catch (n) {
      throw X(n, { [i]: t });
    }
  }
  o(Mn, "unlinkSync");
  function Wt(t, e, i, n = !0) {
    t = x(t);
    let r = Ee(i, 420),
      s = D(e);
    t = n && Ge(t) ? Ke(t) : t;
    let { fs: a, path: c } = R(t);
    if (!a.existsSync(c)) {
      if ((!be(s) && !ft(s)) || s == "r+") throw u.With("ENOENT", t, "_open");
      let d = a.statSync(E(c));
      if (!d.hasAccess(2)) throw u.With("EACCES", E(t), "_open");
      if (!d.isDirectory()) throw u.With("ENOTDIR", E(t), "_open");
      return a.createFileSync(c, s, r);
    }
    let l = a.statSync(c);
    if (!l.hasAccess(r) || !l.hasAccess(zi(s)))
      throw u.With("EACCES", t, "_open");
    if (Hi(s)) throw u.With("EEXIST", t, "_open");
    let f = a.openFileSync(c, s);
    return Vi(s) && (f.truncateSync(0), f.syncSync()), f;
  }
  o(Wt, "_openSync");
  function en(t, e, i = 0) {
    return Ji(Wt(t, e, i, !0));
  }
  o(en, "openSync");
  function tn(t, e, i) {
    return Ji(Wt(t, e, i, !1));
  }
  o(tn, "lopenSync");
  function Ba(t, e, i) {
    var a = [];
    try {
      let n = w(a, Wt(t, e, 420, i));
      let r = n.statSync();
      let s = new Uint8Array(r.size);
      n.readSync(s, 0, r.size, 0);
      return s;
    } catch (c) {
      var l = c,
        f = !0;
    } finally {
      _(a, l, f);
    }
  }
  o(Ba, "_readFileSync");
  function Wn(t, e = {}) {
    let i = xe(e, null, "r", 420),
      n = D(i.flag);
    if (!_t(n))
      throw new u(22, "Flag passed to readFile must allow for reading.");
    let r = Et.Buffer.from(
      Ba(typeof t == "number" ? j(t).path : t.toString(), i.flag, !0)
    );
    return i.encoding ? r.toString(i.encoding) : r;
  }
  o(Wn, "readFileSync");
  function nn(t, e, i = {}) {
    var c = [];
    try {
      let n = xe(i, "utf8", "w+", 420);
      let r = D(n.flag);
      if (!be(r))
        throw new u(22, "Flag passed to writeFile must allow for writing.");
      if (typeof e != "string" && !n.encoding)
        throw new u(22, "Encoding not specified");
      let s =
        typeof e == "string"
          ? Et.Buffer.from(e, n.encoding)
          : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      if (!s) throw new u(22, "Data not specified");
      let a = w(
        c,
        Wt(typeof t == "number" ? j(t).path : t.toString(), r, n.mode, !0)
      );
      a.writeSync(s, 0, s.byteLength, 0);
      M("change", t.toString());
    } catch (l) {
      var f = l,
        d = !0;
    } finally {
      _(c, f, d);
    }
  }
  o(nn, "writeFileSync");
  function Da(t, e, i = {}) {
    var c = [];
    try {
      let n = xe(i, "utf8", "a", 420);
      let r = D(n.flag);
      if (!ft(r))
        throw new u(22, "Flag passed to appendFile must allow for appending.");
      if (typeof e != "string" && !n.encoding)
        throw new u(22, "Encoding not specified");
      let s =
        typeof e == "string"
          ? Et.Buffer.from(e, n.encoding)
          : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      let a = w(
        c,
        Wt(typeof t == "number" ? j(t).path : t.toString(), r, n.mode, !0)
      );
      a.writeSync(s, 0, s.byteLength);
    } catch (l) {
      var f = l,
        d = !0;
    } finally {
      _(c, f, d);
    }
  }
  o(Da, "appendFileSync");
  function Ma(t, e) {
    let i = j(t).statSync();
    return e?.bigint ? new me(i) : i;
  }
  o(Ma, "fstatSync");
  function xt(t) {
    j(t).closeSync(), Dt.delete(t);
  }
  o(xt, "closeSync");
  function Wa(t, e = 0) {
    if (((e ||= 0), e < 0)) throw new u(22);
    j(t).truncateSync(e);
  }
  o(Wa, "ftruncateSync");
  function Ua(t) {
    j(t).syncSync();
  }
  o(Ua, "fsyncSync");
  function ja(t) {
    j(t).datasyncSync();
  }
  o(ja, "fdatasyncSync");
  function qa(t, e, i, n, r) {
    let s, a, c, l;
    if (typeof e == "string") {
      l = typeof i == "number" ? i : null;
      let h = typeof n == "string" ? n : "utf8";
      (a = 0), (s = Et.Buffer.from(e, h)), (c = s.byteLength);
    } else
      (s = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
        (a = i),
        (c = n),
        (l = typeof r == "number" ? r : null);
    let f = j(t);
    l ??= f.position;
    let d = f.writeSync(s, a, c, l);
    return M("change", f.path), d;
  }
  o(qa, "writeSync");
  function $a(t, e, i, n, r) {
    let s = j(t),
      a = typeof i == "object" ? i.offset : i;
    return (
      typeof i == "object" && ((n = i.length), (r = i.position)),
      (r = Number(r)),
      isNaN(r) && (r = s.position),
      s.readSync(e, a, n, r)
    );
  }
  o($a, "readSync");
  function Un(t, e, i) {
    j(t).chownSync(e, i);
  }
  o(Un, "fchownSync");
  function jn(t, e) {
    let i = Ee(e, -1);
    if (i < 0) throw new u(22, "Invalid mode.");
    j(t).chmodSync(i);
  }
  o(jn, "fchmodSync");
  function qn(t, e, i) {
    j(t).utimesSync(Nt(e), Nt(i));
  }
  o(qn, "futimesSync");
  function fs(t) {
    t = x(t);
    let { fs: e, path: i } = R(Ge(t) ? Ke(t) : t);
    try {
      if (!e.statSync(i).hasAccess(2)) throw u.With("EACCES", i, "rmdir");
      e.rmdirSync(i), M("rename", t.toString());
    } catch (n) {
      throw X(n, { [i]: t });
    }
  }
  o(fs, "rmdirSync");
  function $n(t, e) {
    e = typeof e == "object" ? e : { mode: e };
    let i = Ee(e?.mode, 511);
    (t = x(t)), (t = Ge(t) ? Ke(t) : t);
    let { fs: n, path: r } = R(t),
      s = { [r]: t };
    try {
      if (!e?.recursive) {
        if (!n.statSync(E(r)).hasAccess(2))
          throw u.With("EACCES", E(r), "mkdir");
        return n.mkdirSync(r, i);
      }
      let a = [];
      for (let c = r, l = t; !n.existsSync(c); c = E(c), l = E(l))
        a.unshift(c), (s[c] = l);
      for (let c of a) {
        if (!n.statSync(E(c)).hasAccess(2))
          throw u.With("EACCES", E(c), "mkdir");
        n.mkdirSync(c, i), M("rename", c);
      }
      return a[0];
    } catch (a) {
      throw X(a, s);
    }
  }
  o($n, "mkdirSync");
  function di(t, e) {
    t = x(t);
    let { fs: i, path: n } = R(Ge(t) ? Ke(t) : t),
      r;
    if (!Te(t).hasAccess(4)) throw u.With("EACCES", t, "readdir");
    try {
      r = i.readdirSync(n);
    } catch (s) {
      throw X(s, { [n]: t });
    }
    for (let s of Ae.keys()) {
      if (!s.startsWith(t)) continue;
      let a = s.slice(t.length);
      a.includes("/") || a.length == 0 || r.push(a);
    }
    return r.map((s) =>
      typeof e == "object" && e?.withFileTypes
        ? new kt(s, Te(z(t.toString(), s)))
        : e == "buffer" || (typeof e == "object" && e?.encoding == "buffer")
        ? Et.Buffer.from(s)
        : s
    );
  }
  o(di, "readdirSync");
  function za(t, e) {
    if (((t = x(t)), !Te(E(t)).hasAccess(4)))
      throw u.With("EACCES", E(t), "link");
    if (((e = x(e)), !Te(E(e)).hasAccess(2)))
      throw u.With("EACCES", E(e), "link");
    let { fs: i, path: n } = R(t),
      r = R(e);
    if (i != r.fs) throw u.With("EXDEV", e, "link");
    try {
      if (!i.statSync(n).hasAccess(2)) throw u.With("EACCES", n, "link");
      return i.linkSync(n, e);
    } catch (s) {
      throw X(s, { [n]: t, [r.path]: e });
    }
  }
  o(za, "linkSync");
  function Va(t, e, i = "file") {
    if (!["file", "dir", "junction"].includes(i))
      throw new u(22, "Invalid type: " + i);
    if (Ge(e)) throw u.With("EEXIST", e.toString(), "symlink");
    nn(e, t.toString()), Wt(e, "r+", 420, !1)._setTypeSync(40960);
  }
  o(Va, "symlinkSync");
  function us(t, e) {
    let i = Et.Buffer.from(Ba(t.toString(), "r", !1)),
      n = typeof e == "object" ? e?.encoding : e;
    return n == "buffer" ? i : i.toString(n);
  }
  o(us, "readlinkSync");
  function Ha(t, e, i) {
    let n = en(t, "r+");
    Un(n, e, i), xt(n);
  }
  o(Ha, "chownSync");
  function Ka(t, e, i) {
    let n = tn(t, "r+");
    Un(n, e, i), xt(n);
  }
  o(Ka, "lchownSync");
  function Ga(t, e) {
    let i = en(t, "r+");
    jn(i, e), xt(i);
  }
  o(Ga, "chmodSync");
  function Ya(t, e) {
    let i = tn(t, "r+");
    jn(i, e), xt(i);
  }
  o(Ya, "lchmodSync");
  function ds(t, e, i) {
    let n = en(t, "r+");
    qn(n, e, i), xt(n);
  }
  o(ds, "utimesSync");
  function Xa(t, e, i) {
    let n = tn(t, "r+");
    qn(n, e, i), xt(n);
  }
  o(Xa, "lutimesSync");
  function Ke(t, e) {
    t = x(t);
    let { base: i, dir: n } = In(t),
      r = z(n == "/" ? "/" : Ke(n), i),
      { fs: s, path: a, mountPoint: c } = R(r);
    try {
      return s.statSync(a).isSymbolicLink() ? Ke(c + us(r, e).toString()) : r;
    } catch (l) {
      throw X(l, { [a]: r });
    }
  }
  o(Ke, "realpathSync");
  function Ja(t, e = 384) {
    if (!Te(t).hasAccess(e)) throw new u(13);
  }
  o(Ja, "accessSync");
  function hs(t, e) {
    switch (((t = x(t)), Te(t).mode & 61440)) {
      case 16384:
        if (e?.recursive) for (let n of di(t)) hs(z(t, n), e);
        fs(t);
        return;
      case 32768:
      case 40960:
        Mn(t);
        return;
      case 24576:
      case 8192:
      case 4096:
      case 49152:
      default:
        throw new u(1, "File type not supported", t, "rm");
    }
  }
  o(hs, "rmSync");
  function Qa(t, e) {
    let i = typeof e == "object" ? e?.encoding : e || "utf8",
      r = "/tmp/" + `${t}${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return $n(r), i == "buffer" ? Et.Buffer.from(r) : r;
  }
  o(Qa, "mkdtempSync");
  function ps(t, e, i) {
    if (((t = x(t)), (e = x(e)), i && i & 1 && Ge(e)))
      throw new u(17, "Destination file already exists.", e, "copyFile");
    nn(e, Wn(t)), M("rename", e.toString());
  }
  o(ps, "copyFileSync");
  function Za(t, e, i) {
    let n = j(t),
      r = 0;
    for (let s of e) r += n.readSync(s, 0, s.byteLength, i + r);
    return r;
  }
  o(Za, "readvSync");
  function ec(t, e, i) {
    let n = j(t),
      r = 0;
    for (let s of e)
      r += n.writeSync(new Uint8Array(s.buffer), 0, s.byteLength, i + r);
    return r;
  }
  o(ec, "writevSync");
  function tc(t, e) {
    return (t = x(t)), new vt(t);
  }
  o(tc, "opendirSync");
  function ys(t, e, i) {
    (t = x(t)), (e = x(e));
    let n = ls(t);
    if (i?.errorOnExist && Ge(e))
      throw new u(17, "Destination file or directory already exists.", e, "cp");
    switch (n.mode & 61440) {
      case 16384:
        if (!i?.recursive)
          throw new u(21, t + " is a directory (not copied)", t, "cp");
        $n(e, { recursive: !0 });
        for (let r of di(t, { withFileTypes: !0 }))
          (i.filter && !i.filter(z(t, r.name), z(e, r.name))) ||
            ys(z(t, r.name), z(e, r.name), i);
        break;
      case 32768:
      case 40960:
        ps(t, e);
        break;
      case 24576:
      case 8192:
      case 4096:
      case 49152:
      default:
        throw new u(1, "File type not supported", t, "rm");
    }
    i?.preserveTimestamps && ds(e, n.atime, n.mtime);
  }
  o(ys, "cpSync");
  function ic(t, e) {
    t = x(t);
    let { fs: i } = R(t);
    return Ln(i, e?.bigint);
  }
  o(ic, "statfsSync");
  var kt = class {
      constructor(e, i) {
        this.path = e;
        this.stats = i;
      }
      static {
        o(this, "Dirent");
      }
      get name() {
        return B(this.path);
      }
      get parentPath() {
        return this.path;
      }
      isFile() {
        return this.stats.isFile();
      }
      isDirectory() {
        return this.stats.isDirectory();
      }
      isBlockDevice() {
        return this.stats.isBlockDevice();
      }
      isCharacterDevice() {
        return this.stats.isCharacterDevice();
      }
      isSymbolicLink() {
        return this.stats.isSymbolicLink();
      }
      isFIFO() {
        return this.stats.isFIFO();
      }
      isSocket() {
        return this.stats.isSocket();
      }
    },
    vt = class {
      constructor(e) {
        this.path = e;
        this.closed = !1;
      }
      static {
        o(this, "Dir");
      }
      checkClosed() {
        if (this.closed) throw new u(9, "Can not use closed Dir");
      }
      close(e) {
        if (((this.closed = !0), !e)) return Promise.resolve();
        e();
      }
      closeSync() {
        this.closed = !0;
      }
      async _read() {
        return (
          this.checkClosed(),
          (this._entries ??= await Ut(this.path, { withFileTypes: !0 })),
          this._entries.length ? this._entries.shift() ?? null : null
        );
      }
      read(e) {
        if (!e) return this._read();
        this._read().then((i) => e(void 0, i));
      }
      readSync() {
        return (
          this.checkClosed(),
          (this._entries ??= di(this.path, { withFileTypes: !0 })),
          this._entries.length ? this._entries.shift() ?? null : null
        );
      }
      async next() {
        let e = await this._read();
        return e
          ? { done: !1, value: e }
          : (await this.close(), { done: !0, value: void 0 });
      }
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  var kr = Li(du(), 1);
  var Pt = class extends kr.Readable {
      static {
        o(this, "ReadStream");
      }
      close(e = () => null) {
        try {
          super.destroy(), super.emit("close"), e();
        } catch (i) {
          e(new u(5, i.toString()));
        }
      }
    },
    Ot = class extends kr.Writable {
      static {
        o(this, "WriteStream");
      }
      close(e = () => null) {
        try {
          super.destroy(), super.emit("close"), e();
        } catch (i) {
          e(new u(5, i.toString()));
        }
      }
    };
  var ce = class {
    static {
      o(this, "FileHandle");
    }
    constructor(e) {
      let i = typeof e != "number";
      (this.fd = i ? Ji(e) : e), (this.file = i ? e : j(e));
    }
    async chown(e, i) {
      await this.file.chown(e, i), M("change", this.file.path);
    }
    async chmod(e) {
      let i = Ee(e, -1);
      if (i < 0) throw new u(22, "Invalid mode.");
      await this.file.chmod(i), M("change", this.file.path);
    }
    datasync() {
      return this.file.datasync();
    }
    sync() {
      return this.file.sync();
    }
    async truncate(e) {
      if (((e ||= 0), e < 0)) throw new u(22);
      await this.file.truncate(e), M("change", this.file.path);
    }
    async utimes(e, i) {
      await this.file.utimes(Nt(e), Nt(i)), M("change", this.file.path);
    }
    async appendFile(e, i = {}) {
      let n = xe(i, "utf8", "a", 420),
        r = D(n.flag);
      if (!ft(r))
        throw new u(22, "Flag passed to appendFile must allow for appending.");
      if (typeof e != "string" && !n.encoding)
        throw new u(22, "Encoding not specified");
      let s = typeof e == "string" ? Zt.Buffer.from(e, n.encoding) : e;
      await this.file.write(s, 0, s.length), M("change", this.file.path);
    }
    read(e, i, n, r) {
      return isNaN(+r) && (r = this.file.position), this.file.read(e, i, n, r);
    }
    async readFile(e) {
      let i = xe(e, null, "r", 292),
        n = D(i.flag);
      if (!_t(n)) throw new u(22, "Flag passed must allow for reading.");
      let { size: r } = await this.stat(),
        { buffer: s } = await this.file.read(new Uint8Array(r), 0, r, 0),
        a = Zt.Buffer.from(s);
      return i.encoding ? a.toString(i.encoding) : a;
    }
    readableWebStream(e = {}) {
      let i = o(async (r) => {
          try {
            let c = 0,
              l = 0,
              f = NaN;
            for (; f > 0; ) {
              let d = await this.read(new Uint8Array(65536), 0, 65536, l);
              if (!d.bytesRead) {
                r.close();
                return;
              }
              if (
                (r.enqueue(d.buffer.slice(0, d.bytesRead)),
                (l += d.bytesRead),
                ++c >= 1e7)
              )
                throw new u(
                  27,
                  "Too many iterations on readable stream",
                  this.file.path,
                  "FileHandle.readableWebStream"
                );
              f = d.bytesRead;
            }
          } catch (s) {
            r.error(s);
          }
        }, "start"),
        n = globalThis;
      if (!("ReadableStream" in n))
        throw new u(38, "ReadableStream is missing on globalThis");
      return new n.ReadableStream({ start: i, type: e.type });
    }
    readLines(e) {
      throw u.With("ENOSYS", this.file.path, "FileHandle.readLines");
    }
    [Symbol.asyncDispose]() {
      return this.close();
    }
    async stat(e) {
      let i = await this.file.stat();
      if (!i.hasAccess(4)) throw u.With("EACCES", this.file.path, "stat");
      return e?.bigint ? new me(i) : i;
    }
    async write(e, i, n, r) {
      let s, a, c;
      if (typeof e == "string") {
        r = typeof i == "number" ? i : null;
        let f = typeof n == "string" ? n : "utf8";
        (a = 0), (s = Zt.Buffer.from(e, f)), (c = s.length);
      } else
        (s = new Uint8Array(e.buffer, e.byteOffset, e.byteLength)),
          (a = i),
          (c = n),
          (r = typeof r == "number" ? r : null);
      r ??= this.file.position;
      let l = await this.file.write(s, a, c, r);
      return M("change", this.file.path), { buffer: s, bytesWritten: l };
    }
    async writeFile(e, i = {}) {
      let n = xe(i, "utf8", "w", 420),
        r = D(n.flag);
      if (!be(r)) throw new u(22, "Flag passed must allow for writing.");
      if (typeof e != "string" && !n.encoding)
        throw new u(22, "Encoding not specified");
      let s = typeof e == "string" ? Zt.Buffer.from(e, n.encoding) : e;
      await this.file.write(s, 0, s.length, 0), M("change", this.file.path);
    }
    async close() {
      await this.file.close(), Dt.delete(this.fd);
    }
    async writev(e, i) {
      let n = 0;
      for (let r of e)
        n += (await this.write(r, 0, r.length, i + n)).bytesWritten;
      return { bytesWritten: n, buffers: e };
    }
    async readv(e, i) {
      let n = 0;
      for (let r of e)
        n += (await this.read(r, 0, r.byteLength, i + n)).bytesRead;
      return { bytesRead: n, buffers: e };
    }
    createReadStream(e) {
      let i = new Pt({
        highWaterMark: e?.highWaterMark || 65536,
        encoding: e.encoding,
        read: o(async (n) => {
          try {
            let r = await this.read(
              new Uint8Array(n),
              0,
              n,
              this.file.position
            );
            i.push(r.bytesRead ? r.buffer.slice(0, r.bytesRead) : null),
              (this.file.position += r.bytesRead);
          } catch (r) {
            i.destroy(r);
          }
        }, "read"),
      });
      return (i.path = this.file.path), i;
    }
    createWriteStream(e) {
      let i = {
          highWaterMark: e?.highWaterMark,
          encoding: e?.encoding,
          write: o(async (r, s, a) => {
            try {
              let { bytesWritten: c } = await this.write(r, null, s);
              a(c == r.length ? null : new Error("Failed to write full chunk"));
            } catch (c) {
              a(c);
            }
          }, "write"),
        },
        n = new Ot(i);
      return (n.path = this.file.path), n;
    }
  };
  async function Oo(t, e) {
    (t = x(t)), (e = x(e));
    let i = R(t),
      n = R(e);
    if (!(await nt(E(t))).hasAccess(2)) throw u.With("EACCES", t, "rename");
    try {
      if (i.mountPoint == n.mountPoint) {
        await i.fs.rename(i.path, n.path), M("rename", t.toString());
        return;
      }
      await Ti(e, await gn(t)), await bn(t), M("rename", t.toString());
    } catch (r) {
      throw X(r, { [i.path]: t, [n.path]: e });
    }
  }
  o(Oo, "rename");
  async function Me(t) {
    try {
      let { fs: e, path: i } = R(await De(t));
      return await e.exists(i);
    } catch (e) {
      if (e instanceof u && e.code == "ENOENT") return !1;
      throw e;
    }
  }
  o(Me, "exists");
  async function nt(t, e) {
    t = x(t);
    let { fs: i, path: n } = R((await Me(t)) ? await De(t) : t);
    try {
      let r = await i.stat(n);
      if (!r.hasAccess(4)) throw u.With("EACCES", t, "stat");
      return e?.bigint ? new me(r) : r;
    } catch (r) {
      throw X(r, { [n]: t });
    }
  }
  o(nt, "stat");
  async function vr(t, e) {
    t = x(t);
    let { fs: i, path: n } = R(t);
    try {
      let r = await i.stat(n);
      return e?.bigint ? new me(r) : r;
    } catch (r) {
      throw X(r, { [n]: t });
    }
  }
  o(vr, "lstat");
  async function Ro(t, e = 0) {
    var n = [];
    try {
      let i = w(n, await we(t, "r+"), !0);
      await i.truncate(e);
    } catch (r) {
      var s = r,
        a = !0;
    } finally {
      var c = _(n, s, a);
      c && (await c);
    }
  }
  o(Ro, "truncate");
  async function bn(t) {
    t = x(t);
    let { fs: e, path: i } = R(t);
    try {
      if (!(await e.stat(i)).hasAccess(2)) throw u.With("EACCES", i, "unlink");
      await e.unlink(i), M("rename", t.toString());
    } catch (n) {
      throw X(n, { [i]: t });
    }
  }
  o(bn, "unlink");
  async function Ai(t, e, i = 420, n) {
    t = x(t);
    let r = Ee(i, 420),
      s = D(e);
    t = n && (await Me(t)) ? await De(t) : t;
    let { fs: a, path: c } = R(t),
      l = await a.stat(c).catch(() => null);
    if (!l) {
      if ((!be(s) && !ft(s)) || s == "r+") throw u.With("ENOENT", t, "_open");
      let d = await a.stat(E(c));
      if (!d.hasAccess(2)) throw u.With("EACCES", E(t), "_open");
      if (!d.isDirectory()) throw u.With("ENOTDIR", E(t), "_open");
      return new ce(await a.createFile(c, s, r));
    }
    if (!l.hasAccess(zi(s))) throw u.With("EACCES", t, "_open");
    if (Hi(s)) throw u.With("EEXIST", t, "_open");
    let f = new ce(await a.openFile(c, s));
    return Vi(s) && (await f.truncate(0), await f.sync()), f;
  }
  o(Ai, "_open");
  async function we(t, e = "r", i = 420) {
    return await Ai(t, e, i, !0);
  }
  o(we, "open");
  async function gn(t, e) {
    var r = [];
    try {
      let i = xe(e, null, "r", 420);
      let n = w(
        r,
        typeof t == "object" && "fd" in t ? t : await we(t, i.flag, i.mode),
        !0
      );
      return await n.readFile(i);
    } catch (s) {
      var a = s,
        c = !0;
    } finally {
      var l = _(r, a, c);
      l && (await l);
    }
  }
  o(gn, "readFile");
  async function Ti(t, e, i) {
    var a = [];
    try {
      let n = xe(i, "utf8", "w+", 420);
      let r = w(
        a,
        t instanceof ce ? t : await we(t.toString(), n.flag, n.mode),
        !0
      );
      let s = e;
      if (typeof s != "string" && !(s instanceof Uint8Array))
        throw new u(
          22,
          "Iterables and streams not supported",
          r.file.path,
          "writeFile"
        );
      await r.writeFile(s, n);
    } catch (c) {
      var l = c,
        f = !0;
    } finally {
      var d = _(a, l, f);
      d && (await d);
    }
  }
  o(Ti, "writeFile");
  async function No(t, e, i) {
    var c = [];
    try {
      let n = xe(i, "utf8", "a", 420);
      let r = D(n.flag);
      if (!ft(r))
        throw new u(22, "Flag passed to appendFile must allow for appending.");
      if (typeof e != "string" && !n.encoding)
        throw new u(22, "Encoding not specified");
      let s =
        typeof e == "string"
          ? Zt.Buffer.from(e, n.encoding)
          : new Uint8Array(e.buffer, e.byteOffset, e.byteLength);
      let a = w(
        c,
        typeof t == "object" && "fd" in t ? t : await we(t, n.flag, n.mode),
        !0
      );
      await a.appendFile(s, n);
    } catch (l) {
      var f = l,
        d = !0;
    } finally {
      var h = _(c, f, d);
      h && (await h);
    }
  }
  o(No, "appendFile");
  async function Fr(t) {
    (t = x(t)), (t = (await Me(t)) ? await De(t) : t);
    let { fs: e, path: i } = R(t);
    try {
      if (!(await e.stat(i)).hasAccess(2)) throw u.With("EACCES", i, "rmdir");
      await e.rmdir(i), M("rename", t.toString());
    } catch (n) {
      throw X(n, { [i]: t });
    }
  }
  o(Fr, "rmdir");
  async function wn(t, e) {
    e = typeof e == "object" ? e : { mode: e };
    let i = Ee(e?.mode, 511);
    (t = x(t)), (t = (await Me(t)) ? await De(t) : t);
    let { fs: n, path: r } = R(t),
      s = { [r]: t };
    try {
      if (!e?.recursive) {
        if (!(await n.stat(E(r))).hasAccess(2))
          throw u.With("EACCES", E(r), "mkdir");
        await n.mkdir(r, i), M("rename", t.toString());
        return;
      }
      let a = [];
      for (let c = r, l = t; !(await n.exists(c)); c = E(c), l = E(l))
        a.unshift(c), (s[c] = l);
      for (let c of a) {
        if (!(await n.stat(E(c))).hasAccess(2))
          throw u.With("EACCES", E(c), "mkdir");
        await n.mkdir(c, i), M("rename", c);
      }
      return a[0];
    } catch (a) {
      throw X(a, s);
    }
  }
  o(wn, "mkdir");
  async function Ut(t, e) {
    if (((t = x(t)), !(await nt(t)).hasAccess(4)))
      throw u.With("EACCES", t, "readdir");
    t = (await Me(t)) ? await De(t) : t;
    let { fs: i, path: n } = R(t),
      r;
    try {
      r = await i.readdir(n);
    } catch (a) {
      throw X(a, { [n]: t });
    }
    for (let a of Ae.keys())
      if (a.startsWith(t)) {
        let c = a.slice(t.length);
        if (c.includes("/") || c.length == 0) continue;
        r.push(c);
      }
    let s = [];
    for (let a of r)
      s.push(
        typeof e == "object" && e?.withFileTypes
          ? new kt(a, await nt(z(t, a)))
          : a
      );
    return s;
  }
  o(Ut, "readdir");
  async function Lo(t, e) {
    if (((t = x(t)), !(await nt(E(t))).hasAccess(4)))
      throw u.With("EACCES", E(t), "link");
    if (((e = x(e)), !(await nt(E(e))).hasAccess(2)))
      throw u.With("EACCES", E(e), "link");
    let { fs: i, path: n } = R(t),
      r = R(e);
    if (i != r.fs) throw u.With("EXDEV", e, "link");
    try {
      if (!(await i.stat(n)).hasAccess(2)) throw u.With("EACCES", n, "link");
      return await i.link(n, r.path);
    } catch (s) {
      throw X(s, { [r.path]: e, [n]: t });
    }
  }
  o(Lo, "link");
  async function Co(t, e, i = "file") {
    if (!["file", "dir", "junction"].includes(i))
      throw new u(22, "Invalid symlink type: " + i);
    if (await Me(e)) throw u.With("EEXIST", e.toString(), "symlink");
    await Ti(e, t.toString()),
      await (await Ai(e, "r+", 420, !1)).file._setType(40960);
  }
  o(Co, "symlink");
  async function Ir(t, e) {
    var s = [];
    try {
      let i = w(s, await Ai(x(t), "r", 420, !1), !0);
      let n = await i.readFile();
      let r = typeof e == "object" ? e?.encoding : e;
      return r == "buffer" ? n : n.toString(r);
    } catch (a) {
      var c = a,
        l = !0;
    } finally {
      var f = _(s, c, l);
      f && (await f);
    }
  }
  o(Ir, "readlink");
  async function Bo(t, e, i) {
    var r = [];
    try {
      let n = w(r, await we(t, "r+"), !0);
      await n.chown(e, i);
    } catch (s) {
      var a = s,
        c = !0;
    } finally {
      var l = _(r, a, c);
      l && (await l);
    }
  }
  o(Bo, "chown");
  async function Do(t, e, i) {
    var r = [];
    try {
      let n = w(r, await Ai(t, "r+", 420, !1), !0);
      await n.chown(e, i);
    } catch (s) {
      var a = s,
        c = !0;
    } finally {
      var l = _(r, a, c);
      l && (await l);
    }
  }
  o(Do, "lchown");
  async function Mo(t, e) {
    var n = [];
    try {
      let i = w(n, await we(t, "r+"), !0);
      await i.chmod(e);
    } catch (r) {
      var s = r,
        a = !0;
    } finally {
      var c = _(n, s, a);
      c && (await c);
    }
  }
  o(Mo, "chmod");
  async function Wo(t, e) {
    var n = [];
    try {
      let i = w(n, await Ai(t, "r+", 420, !1), !0);
      await i.chmod(e);
    } catch (r) {
      var s = r,
        a = !0;
    } finally {
      var c = _(n, s, a);
      c && (await c);
    }
  }
  o(Wo, "lchmod");
  async function Ar(t, e, i) {
    var r = [];
    try {
      let n = w(r, await we(t, "r+"), !0);
      await n.utimes(e, i);
    } catch (s) {
      var a = s,
        c = !0;
    } finally {
      var l = _(r, a, c);
      l && (await l);
    }
  }
  o(Ar, "utimes");
  async function Uo(t, e, i) {
    var r = [];
    try {
      let n = w(r, await Ai(t, "r+", 420, !1), !0);
      await n.utimes(new Date(e), new Date(i));
    } catch (s) {
      var a = s,
        c = !0;
    } finally {
      var l = _(r, a, c);
      l && (await l);
    }
  }
  o(Uo, "lutimes");
  async function De(t, e) {
    t = x(t);
    let { base: i, dir: n } = In(t),
      r = z(n == "/" ? "/" : await De(n), i),
      { fs: s, path: a, mountPoint: c } = R(r);
    try {
      return (await s.stat(a)).isSymbolicLink() ? De(c + (await Ir(r))) : r;
    } catch (l) {
      throw X(l, { [a]: r });
    }
  }
  o(De, "realpath");
  function fw(t, e = {}) {
    return {
      [Symbol.asyncIterator]() {
        let i = new ui(
          t.toString(),
          typeof e != "string" ? e : { encoding: e }
        );
        function n(r) {
          return function () {
            let s = Promise.withResolvers();
            return (
              i.on("change", (a, c) => {
                s.resolve({ value: { eventType: a, filename: c }, done: r });
              }),
              s.promise
            );
          };
        }
        return o(n, "withDone"), { next: n(!1), return: n(!0), throw: n(!0) };
      },
    };
  }
  o(fw, "watch");
  async function jo(t, e = 0) {
    if (!(await nt(t)).hasAccess(e)) throw new u(13);
  }
  o(jo, "access");
  async function Tr(t, e) {
    switch (((t = x(t)), (await nt(t)).mode & 61440)) {
      case 16384:
        if (e?.recursive) for (let n of await Ut(t)) await Tr(z(t, n), e);
        await Fr(t);
        return;
      case 32768:
      case 40960:
        await bn(t);
        return;
      case 24576:
      case 8192:
      case 4096:
      case 49152:
      default:
        throw new u(1, "File type not supported", t, "rm");
    }
  }
  o(Tr, "rm");
  async function qo(t, e) {
    let i = typeof e == "object" ? e?.encoding : e || "utf8",
      r = "/tmp/" + `${t}${Date.now()}-${Math.random().toString(36).slice(2)}`;
    return await wn(r), i == "buffer" ? Zt.Buffer.from(r) : r;
  }
  o(qo, "mkdtemp");
  async function Pr(t, e, i) {
    if (((t = x(t)), (e = x(e)), i && i & 1 && (await Me(e))))
      throw new u(17, "Destination file already exists.", e, "copyFile");
    await Ti(e, await gn(t)), M("rename", e.toString());
  }
  o(Pr, "copyFile");
  async function $o(t, e) {
    return (t = x(t)), new vt(t);
  }
  o($o, "opendir");
  async function Or(t, e, i) {
    (t = x(t)), (e = x(e));
    let n = await vr(t);
    if (i?.errorOnExist && (await Me(e)))
      throw new u(17, "Destination file or directory already exists.", e, "cp");
    switch (n.mode & 61440) {
      case 16384:
        if (!i?.recursive)
          throw new u(21, t + " is a directory (not copied)", t, "cp");
        await wn(e, { recursive: !0 });
        for (let r of await Ut(t, { withFileTypes: !0 }))
          (i.filter && !i.filter(z(t, r.name), z(e, r.name))) ||
            (await Or(z(t, r.name), z(e, r.name), i));
        break;
      case 32768:
      case 40960:
        await Pr(t, e);
        break;
      case 24576:
      case 8192:
      case 4096:
      case 49152:
      default:
        throw new u(1, "File type not supported", t, "rm");
    }
    i?.preserveTimestamps && (await Ar(e, n.atime, n.mtime));
  }
  o(Or, "cp");
  async function zo(t, e) {
    t = x(t);
    let { fs: i } = R(t);
    return Ln(i, e?.bigint);
  }
  o(zo, "statfs");
  var v = o(() => {}, "nop");
  function hu(t, e, i = v) {
    Oo(t, e)
      .then(() => i())
      .catch(i);
  }
  o(hu, "rename");
  function pu(t, e = v) {
    Me(t)
      .then(e)
      .catch(() => e(!1));
  }
  o(pu, "exists");
  function yu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      nt(t, typeof e != "function" ? e : {})
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(yu, "stat");
  function mu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      vr(t, typeof e != "function" ? e : {})
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(mu, "lstat");
  function bu(t, e = 0, i = v) {
    (i = typeof e == "function" ? e : i),
      Ro(t, typeof e == "number" ? e : 0)
        .then(() => i())
        .catch(i);
  }
  o(bu, "truncate");
  function gu(t, e = v) {
    bn(t)
      .then(() => e())
      .catch(e);
  }
  o(gu, "unlink");
  function wu(t, e, i, n = v) {
    let r = Ee(i, 420);
    (n = typeof i == "function" ? i : n),
      we(t, e, r)
        .then((s) => n(void 0, s.fd))
        .catch(n);
  }
  o(wu, "open");
  function Su(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      gn(t, typeof e == "function" ? null : e)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(Su, "readFile");
  function _u(t, e, i, n = v) {
    (n = typeof i == "function" ? i : n),
      Ti(t, e, typeof i != "function" ? i : null)
        .then(() => n(void 0))
        .catch(n);
  }
  o(_u, "writeFile");
  function Eu(t, e, i, n = v) {
    let r = typeof i != "function" ? i : void 0;
    (n = typeof i == "function" ? i : n),
      No(t, e, r)
        .then(() => n())
        .catch(n);
  }
  o(Eu, "appendFile");
  function xu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      j(t)
        .stat()
        .then((n) =>
          i(void 0, typeof e == "object" && e?.bigint ? new me(n) : n)
        )
        .catch(i);
  }
  o(xu, "fstat");
  function ku(t, e = v) {
    new ce(t)
      .close()
      .then(() => e())
      .catch(e);
  }
  o(ku, "close");
  function vu(t, e, i = v) {
    let n = typeof e == "number" ? e : 0;
    i = typeof e == "function" ? e : i;
    let r = j(t);
    if (n < 0) throw new u(22);
    r.truncate(n)
      .then(() => i())
      .catch(i);
  }
  o(vu, "ftruncate");
  function Fu(t, e = v) {
    j(t)
      .sync()
      .then(() => e())
      .catch(e);
  }
  o(Fu, "fsync");
  function Iu(t, e = v) {
    j(t)
      .datasync()
      .then(() => e())
      .catch(e);
  }
  o(Iu, "fdatasync");
  function Au(t, e, i, n, r, s = v) {
    let a,
      c,
      l,
      f,
      d,
      h = new ce(t);
    if (typeof e == "string") {
      switch (((d = "utf8"), typeof i)) {
        case "function":
          s = i;
          break;
        case "number":
          (f = i),
            (d = typeof n == "string" ? n : "utf8"),
            (s = typeof r == "function" ? r : s);
          break;
        default:
          (s = typeof n == "function" ? n : typeof r == "function" ? r : s),
            s(new u(22, "Invalid arguments."));
          return;
      }
      (a = Vo.Buffer.from(e)), (c = 0), (l = a.length);
      let b = s;
      h.write(a, c, l, f)
        .then(({ bytesWritten: y }) => b(void 0, y, a.toString(d)))
        .catch(b);
    } else {
      (a = Vo.Buffer.from(e.buffer)),
        (c = i),
        (l = n),
        (f = typeof r == "number" ? r : null);
      let b = typeof r == "function" ? r : s;
      h.write(a, c, l, f)
        .then(({ bytesWritten: y }) => b(void 0, y, a))
        .catch(b);
    }
  }
  o(Au, "write");
  function Tu(t, e, i, n, r, s = v) {
    new ce(t)
      .read(e, i, n, r)
      .then(({ bytesRead: a, buffer: c }) => s(void 0, a, c))
      .catch(s);
  }
  o(Tu, "read");
  function Pu(t, e, i, n = v) {
    new ce(t)
      .chown(e, i)
      .then(() => n())
      .catch(n);
  }
  o(Pu, "fchown");
  function Ou(t, e, i) {
    new ce(t)
      .chmod(e)
      .then(() => i())
      .catch(i);
  }
  o(Ou, "fchmod");
  function Ru(t, e, i, n = v) {
    new ce(t)
      .utimes(e, i)
      .then(() => n())
      .catch(n);
  }
  o(Ru, "futimes");
  function Nu(t, e = v) {
    Fr(t)
      .then(() => e())
      .catch(e);
  }
  o(Nu, "rmdir");
  function Lu(t, e, i = v) {
    wn(t, e)
      .then(() => i())
      .catch(i);
  }
  o(Lu, "mkdir");
  function Cu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      Ut(t, typeof e != "function" ? e : {})
        .then((r) => i(void 0, r))
        .catch(i);
  }
  o(Cu, "readdir");
  function Bu(t, e, i = v) {
    Lo(t, e)
      .then(() => i())
      .catch(i);
  }
  o(Bu, "link");
  function Du(t, e, i, n = v) {
    let r = typeof i == "string" ? i : "file";
    (n = typeof i == "function" ? i : n),
      Co(t, e, r)
        .then(() => n())
        .catch(n);
  }
  o(Du, "symlink");
  function Mu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      Ir(t)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(Mu, "readlink");
  function Wu(t, e, i, n = v) {
    Bo(t, e, i)
      .then(() => n())
      .catch(n);
  }
  o(Wu, "chown");
  function Uu(t, e, i, n = v) {
    Do(t, e, i)
      .then(() => n())
      .catch(n);
  }
  o(Uu, "lchown");
  function ju(t, e, i = v) {
    Mo(t, e)
      .then(() => i())
      .catch(i);
  }
  o(ju, "chmod");
  function qu(t, e, i = v) {
    Wo(t, e)
      .then(() => i())
      .catch(i);
  }
  o(qu, "lchmod");
  function $u(t, e, i, n = v) {
    Ar(t, e, i)
      .then(() => n())
      .catch(n);
  }
  o($u, "utimes");
  function zu(t, e, i, n = v) {
    Uo(t, e, i)
      .then(() => n())
      .catch(n);
  }
  o(zu, "lutimes");
  function Vu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      De(t, typeof e == "function" ? null : e)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(Vu, "realpath");
  function Hu(t, e, i = v) {
    let n = typeof e == "number" ? e : 4;
    (i = typeof e == "function" ? e : i),
      jo(t, n)
        .then(() => i())
        .catch(i);
  }
  o(Hu, "access");
  var Pi = new Map();
  function Ku(t, e, i) {
    let n = x(t.toString()),
      r = typeof e != "function" ? e : {};
    if ((typeof e == "function" && (i = e), !i))
      throw new u(22, "No listener specified", t.toString(), "watchFile");
    if (Pi.has(n)) {
      let a = Pi.get(n);
      a && a.listeners.add(i);
      return;
    }
    let s = new Dn(n, r);
    s.on("change", (a, c) => {
      let l = Pi.get(n);
      if (l) for (let f of l.listeners) f(a, c);
    }),
      Pi.set(n, { watcher: s, listeners: new Set() });
  }
  o(Ku, "watchFile");
  function Gu(t, e = v) {
    let i = x(t.toString()),
      n = Pi.get(i);
    n &&
      (e && e !== v ? n.listeners.delete(e) : n.listeners.clear(),
      n.listeners.size === 0 && (n.watcher.stop(), Pi.delete(i)));
  }
  o(Gu, "unwatchFile");
  function Yu(t, e, i) {
    let n = new ui(x(t), typeof e == "object" ? e : {});
    return (i = typeof e == "function" ? e : i), n.on("change", i || v), n;
  }
  o(Yu, "watch");
  function Xu(t, e) {
    let i = typeof e == "object" ? e : { encoding: e },
      n,
      r = new Pt({
        highWaterMark: i.highWaterMark || 64 * 1024,
        encoding: i.encoding || "utf8",
        read: o(async function (s) {
          try {
            n ||= await we(t, "r", i?.mode);
            let a = await n.read(new Uint8Array(s), 0, s, n.file.position);
            r.push(a.bytesRead ? a.buffer.slice(0, a.bytesRead) : null),
              (n.file.position += a.bytesRead),
              a.bytesRead || (await n.close());
          } catch (a) {
            await n?.close(), r.destroy(a);
          }
        }, "read"),
        destroy: o(function (s, a) {
          n?.close()
            .then(() => a(s))
            .catch(v);
        }, "destroy"),
      });
    return (r.path = t.toString()), r;
  }
  o(Xu, "createReadStream");
  function Ju(t, e) {
    let i = typeof e == "object" ? e : { encoding: e },
      n,
      r = new Ot({
        highWaterMark: i?.highWaterMark,
        write: o(async function (s, a, c) {
          try {
            (n ||= await we(t, "w", i?.mode || 438)),
              await n.write(s, 0, a),
              c(void 0);
          } catch (l) {
            await n?.close(), c(l);
          }
        }, "write"),
        destroy: o(function (s, a) {
          a(s),
            n
              ?.close()
              .then(() => a(s))
              .catch(a);
        }, "destroy"),
        final: o(function (s) {
          n?.close()
            .then(() => s())
            .catch(s);
        }, "final"),
      });
    return (r.path = t.toString()), r;
  }
  o(Ju, "createWriteStream");
  function Qu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      Tr(t, typeof e == "function" ? void 0 : e)
        .then(() => i(void 0))
        .catch(i);
  }
  o(Qu, "rm");
  function Zu(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      qo(t, typeof e != "function" ? e : null)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(Zu, "mkdtemp");
  function ed(t, e, i, n = v) {
    (n = typeof i == "function" ? i : n),
      Pr(t, e, typeof i == "function" ? void 0 : i)
        .then(() => n(void 0))
        .catch(n);
  }
  o(ed, "copyFile");
  function td(t, e, i, n = v) {
    (n = typeof i == "function" ? i : n),
      new ce(t)
        .readv(e, typeof i == "function" ? void 0 : i)
        .then(({ buffers: r, bytesRead: s }) => n(void 0, s, r))
        .catch(n);
  }
  o(td, "readv");
  function id(t, e, i, n = v) {
    (n = typeof i == "function" ? i : n),
      new ce(t)
        .writev(e, typeof i == "function" ? void 0 : i)
        .then(({ buffers: r, bytesWritten: s }) => n(void 0, s, r))
        .catch(n);
  }
  o(id, "writev");
  function nd(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      $o(t, typeof e == "function" ? void 0 : e)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(nd, "opendir");
  function rd(t, e, i, n = v) {
    (n = typeof i == "function" ? i : n),
      Or(t, e, typeof i == "function" ? void 0 : i)
        .then(() => n(void 0))
        .catch(n);
  }
  o(rd, "cp");
  function sd(t, e, i = v) {
    (i = typeof e == "function" ? e : i),
      zo(t, typeof e == "function" ? void 0 : e)
        .then((n) => i(void 0, n))
        .catch(i);
  }
  o(sd, "statfs");
  async function od(t, e) {
    let i = await we(t.toString(), "r"),
      n = await i.readFile();
    return await i.close(), new Blob([n], e);
  }
  o(od, "openAsBlob");
  function ad(t) {
    return Bi(t) || Ci(t) || t instanceof pe;
  }
  o(ad, "isMountConfig");
  async function Oi(t, e = 0) {
    if (typeof t != "object" || t == null)
      throw new u(22, "Invalid options on mount configuration");
    if (!ad(t)) throw new u(22, "Invalid mount configuration");
    if (t instanceof pe) return t;
    Ci(t) && (t = { backend: t });
    for (let [r, s] of Object.entries(t))
      if (r != "backend" && ad(s)) {
        if (e > 10)
          throw new u(
            22,
            "Invalid configuration, too deep and possibly infinite"
          );
        t[r] = await Oi(s, ++e);
      }
    let { backend: i } = t;
    if (!(await i.isAvailable()))
      throw new u(1, "Backend not available: " + i.name);
    await $r(i, t);
    let n = await i.create(t);
    return (n._disableSync = t.disableAsyncCache || !1), await n.ready(), n;
  }
  o(Oi, "resolveMountConfig");
  async function uw(t) {
    if (!Bi(t)) throw new TypeError("Invalid single mount point configuration");
    let e = await Oi(t);
    fi("/"), Mt("/", e);
  }
  o(uw, "configureSingle");
  async function dw(t) {
    let e = ("uid" in t && t.uid) || 0,
      i = ("gid" in t && t.gid) || 0;
    if (
      (Object.assign(ye, {
        uid: e,
        gid: i,
        suid: e,
        sgid: i,
        euid: e,
        egid: i,
      }),
      !!t.mounts)
    ) {
      for (let [n, r] of Object.entries(t.mounts)) {
        if (!n.startsWith("/"))
          throw new u(22, "Mount points must have absolute paths");
        Bi(r) && (r.disableAsyncCache ??= t.disableAsyncCache || !1),
          (t.mounts[n] = await Oi(r));
      }
      Qi(t.mounts);
    }
  }
  o(dw, "configure");
  function Ho(t) {
    class e extends t {
      constructor() {
        super(...arguments);
        this._queue = [];
        this._isInitialized = !1;
      }
      static {
        o(this, "AsyncFS");
      }
      get _queueRunning() {
        return !!this._queue.length;
      }
      queueDone() {
        return new Promise((r) => {
          let s = o(() => (this._queueRunning ? setTimeout(s) : r()), "check");
          s();
        });
      }
      async ready() {
        if (
          (await super.ready(), !(this._isInitialized || this._disableSync))
        ) {
          this.checkSync(), await this._sync.ready();
          try {
            await this.crossCopy("/"), (this._isInitialized = !0);
          } catch (r) {
            throw ((this._isInitialized = !1), r);
          }
        }
      }
      checkSync(r, s) {
        if (this._disableSync)
          throw new u(
            95,
            "Sync caching has been disabled for this async file system",
            r,
            s
          );
        if (!this._sync)
          throw new u(
            95,
            "No sync cache is attached to this async file system",
            r,
            s
          );
      }
      renameSync(r, s) {
        this.checkSync(r, "rename"),
          this._sync.renameSync(r, s),
          this.queue("rename", r, s);
      }
      statSync(r) {
        return this.checkSync(r, "stat"), this._sync.statSync(r);
      }
      createFileSync(r, s, a) {
        return (
          this.checkSync(r, "createFile"),
          this._sync.createFileSync(r, s, a),
          this.queue("createFile", r, s, a),
          this.openFileSync(r, s)
        );
      }
      openFileSync(r, s) {
        this.checkSync(r, "openFile");
        let a = this._sync.openFileSync(r, s),
          c = a.statSync(),
          l = new Uint8Array(c.size);
        return a.readSync(l), new ge(this, r, s, c, l);
      }
      unlinkSync(r) {
        this.checkSync(r, "unlinkSync"),
          this._sync.unlinkSync(r),
          this.queue("unlink", r);
      }
      rmdirSync(r) {
        this.checkSync(r, "rmdir"),
          this._sync.rmdirSync(r),
          this.queue("rmdir", r);
      }
      mkdirSync(r, s) {
        this.checkSync(r, "mkdir"),
          this._sync.mkdirSync(r, s),
          this.queue("mkdir", r, s);
      }
      readdirSync(r) {
        return this.checkSync(r, "readdir"), this._sync.readdirSync(r);
      }
      linkSync(r, s) {
        this.checkSync(r, "link"),
          this._sync.linkSync(r, s),
          this.queue("link", r, s);
      }
      syncSync(r, s, a) {
        this.checkSync(r, "sync"),
          this._sync.syncSync(r, s, a),
          this.queue("sync", r, s, a);
      }
      existsSync(r) {
        return this.checkSync(r, "exists"), this._sync.existsSync(r);
      }
      async crossCopy(r) {
        this.checkSync(r, "crossCopy");
        let s = await this.stat(r);
        if (!s.isDirectory()) {
          var c = [];
          try {
            let b = w(c, await this.openFile(r, D("r")), !0);
            let y = w(c, this._sync.createFileSync(r, D("w"), s.mode));
            let S = new Uint8Array(s.size);
            await b.read(S);
            y.writeSync(S, 0, s.size);
            return;
          } catch (l) {
            var f = l,
              d = !0;
          } finally {
            var h = _(c, f, d);
            h && (await h);
          }
        }
        if (r !== "/") {
          let b = await this.stat(r);
          this._sync.mkdirSync(r, b.mode);
        }
        let a = await this.readdir(r);
        for (let b of a) await this.crossCopy(z(r, b));
      }
      async _next() {
        if (!this._queueRunning) return;
        let [r, ...s] = this._queue.shift();
        await this[r](...s), await this._next();
      }
      queue(...r) {
        this._queue.push(r), this._next();
      }
    }
    return e;
  }
  o(Ho, "Async");
  function hw(t) {
    return (
      typeof t == "object" &&
      t != null &&
      "fd" in t &&
      "path" in t &&
      "position" in t
    );
  }
  o(hw, "isFileData");
  function Ko(t) {
    return typeof t == "object" && t != null && "_zenfs" in t && !!t._zenfs;
  }
  o(Ko, "isMessage");
  var Ri = new Map();
  function Go(t, { port: e, timeout: i = 1e3, fs: n } = {}) {
    let r = new Error().stack.slice(6);
    if (!e) throw u.With("EINVAL");
    return new Promise((s, a) => {
      let c = Math.random().toString(16).slice(10);
      Ri.set(c, { resolve: s, reject: a, fs: n }),
        e.postMessage({ ...t, _zenfs: !0, id: c, stack: r });
      let l = setTimeout(() => {
        let f = new u(5, "RPC Failed");
        (f.stack += r), a(f), typeof l == "object" && l.unref();
      }, i);
    });
  }
  o(Go, "request");
  function cd(t) {
    if (!Ko(t)) return;
    let { id: e, value: i, error: n, stack: r } = t;
    if (!Ri.has(e)) {
      let l = new u(5, "Invalid RPC id:" + e);
      throw ((l.stack += r), l);
    }
    let { resolve: s, reject: a, fs: c } = Ri.get(e);
    if (n) {
      let l = typeof i == "string" ? new Error(i) : u.fromJSON(i);
      (l.stack += r), a(l), Ri.delete(e);
      return;
    }
    if (hw(i)) {
      let { fd: l, path: f, position: d } = i,
        h = new En(c, l, f, d);
      s(h), Ri.delete(e);
      return;
    }
    s(i), Ri.delete(e);
  }
  o(cd, "handleResponse");
  function Rr(t, e) {
    if (!t) throw u.With("EINVAL");
    t["on" in t ? "on" : "addEventListener"]("message", (i) => {
      e("data" in i ? i.data : i);
    });
  }
  o(Rr, "attach");
  function Yo(t, e) {
    if (!t) throw u.With("EINVAL");
    t["off" in t ? "off" : "removeEventListener"]("message", (i) => {
      e("data" in i ? i.data : i);
    });
  }
  o(Yo, "detach");
  function ld(t) {
    let e = [],
      i = e.push.bind(e);
    return (
      Rr(t, i),
      function (n) {
        Yo(t, i);
        for (let r of e) {
          let s = "data" in r ? r.data : r;
          xn(t, n, s);
        }
      }
    );
  }
  o(ld, "catchMessages");
  var En = class extends Bt {
      constructor(i, n, r, s) {
        super(i, r);
        this.fs = i;
        this.fd = n;
        this.position = s;
      }
      static {
        o(this, "PortFile");
      }
      rpc(i, ...n) {
        return Go(
          { scope: "file", fd: this.fd, method: i, args: n },
          this.fs.options
        );
      }
      _throwNoSync(i) {
        throw new u(
          95,
          "Synchronous operations not supported on PortFile",
          this.path,
          i
        );
      }
      async stat() {
        return new Y(await this.rpc("stat"));
      }
      statSync() {
        this._throwNoSync("stat");
      }
      truncate(i) {
        return this.rpc("truncate", i);
      }
      truncateSync() {
        this._throwNoSync("truncate");
      }
      write(i, n, r, s) {
        return this.rpc("write", i, n, r, s);
      }
      writeSync() {
        this._throwNoSync("write");
      }
      async read(i, n, r, s) {
        return await this.rpc("read", i, n, r, s);
      }
      readSync() {
        this._throwNoSync("read");
      }
      chown(i, n) {
        return this.rpc("chown", i, n);
      }
      chownSync() {
        this._throwNoSync("chown");
      }
      chmod(i) {
        return this.rpc("chmod", i);
      }
      chmodSync() {
        this._throwNoSync("chmod");
      }
      utimes(i, n) {
        return this.rpc("utimes", i, n);
      }
      utimesSync() {
        this._throwNoSync("utimes");
      }
      _setType(i) {
        return this.rpc("_setType", i);
      }
      _setTypeSync() {
        this._throwNoSync("_setType");
      }
      close() {
        return this.rpc("close");
      }
      closeSync() {
        this._throwNoSync("close");
      }
      sync() {
        return this.rpc("sync");
      }
      syncSync() {
        this._throwNoSync("sync");
      }
    },
    Lr = class extends Ho(pe) {
      constructor(i) {
        super();
        this.options = i;
        this._sync = Xi.create({ name: "port-tmpfs" });
        (this.port = i.port), Rr(this.port, cd);
      }
      static {
        o(this, "PortFS");
      }
      metadata() {
        return { ...super.metadata(), name: "PortFS" };
      }
      rpc(i, ...n) {
        return Go(
          { scope: "fs", method: i, args: n },
          { ...this.options, fs: this }
        );
      }
      async ready() {
        await this.rpc("ready"), await super.ready();
      }
      rename(i, n) {
        return this.rpc("rename", i, n);
      }
      async stat(i) {
        return new Y(await this.rpc("stat", i));
      }
      sync(i, n, r) {
        return this.rpc("sync", i, n, r);
      }
      openFile(i, n) {
        return this.rpc("openFile", i, n);
      }
      createFile(i, n, r) {
        return this.rpc("createFile", i, n, r);
      }
      unlink(i) {
        return this.rpc("unlink", i);
      }
      rmdir(i) {
        return this.rpc("rmdir", i);
      }
      mkdir(i, n) {
        return this.rpc("mkdir", i, n);
      }
      readdir(i) {
        return this.rpc("readdir", i);
      }
      exists(i) {
        return this.rpc("exists", i);
      }
      link(i, n) {
        return this.rpc("link", i, n);
      }
    },
    fd = 0,
    Nr = new Map();
  async function xn(t, e, i) {
    if (!Ko(i)) return;
    let { method: n, args: r, id: s, scope: a, stack: c } = i,
      l,
      f = !1;
    try {
      switch (a) {
        case "fs":
          (l = await e[n](...r)),
            l instanceof Bt &&
              (Nr.set(++fd, l),
              (l = { fd, path: l.path, position: l.position }));
          break;
        case "file":
          let { fd: d } = i;
          if (!Nr.has(d)) throw new u(9);
          (l = await Nr.get(d)[n](...r)), n == "close" && Nr.delete(d);
          break;
        default:
          return;
      }
    } catch (d) {
      (l = d instanceof u ? d.toJSON() : d.toString()), (f = !0);
    }
    t.postMessage({
      _zenfs: !0,
      scope: a,
      id: s,
      error: f,
      method: n,
      stack: c,
      value: l,
    });
  }
  o(xn, "handleRequest");
  function ud(t, e) {
    Rr(t, (i) => xn(t, e, i));
  }
  o(ud, "attachFS");
  function yw(t, e) {
    Yo(t, (i) => xn(t, e, i));
  }
  o(yw, "detachFS");
  var dd = {
      name: "Port",
      options: {
        port: {
          type: "object",
          required: !0,
          description: "The target port that you want to connect to",
          validator: o(function (t) {
            if (typeof t?.postMessage != "function")
              throw new u(22, "option must be a port.");
          }, "validator"),
        },
        timeout: {
          type: "number",
          required: !1,
          description: "How long to wait before the request times out",
        },
      },
      isAvailable: o(async function () {
        return !0;
      }, "isAvailable"),
      create: o(function (t) {
        return new Lr(t);
      }, "create"),
    },
    mw = dd;
  async function bw(t, e, i = 0) {
    let n = ld(t),
      r = await Oi(e, i);
    return ud(t, r), n(r), r;
  }
  o(bw, "resolveRemoteMount");
  function hd(t) {
    try {
      return JSON.parse(t), !0;
    } catch {
      return !1;
    }
  }
  o(hd, "isJSON");
  function Xo(t) {
    return t.at(0).toUpperCase() + t.slice(1);
  }
  o(Xo, "capitalize");
  var Jo = Symbol("struct_init"),
    gw = Symbol("struct");
  var pd = [
      "int8",
      "uint8",
      "int16",
      "uint16",
      "int32",
      "uint32",
      "int64",
      "uint64",
      "float32",
      "float64",
    ],
    yd = [...pd, ...pd.map((t) => Xo(t)), "char"];
  function md(t, e) {
    return function (i, n) {
      let r = typeof n == "object" ? n.name : n;
      if (
        (typeof r == "symbol" &&
          (console.warn(
            "Symbol used for struct member name will be coerced to string: " +
              r.toString()
          ),
          (r = r.toString())),
        !r)
      )
        throw new ReferenceError("Invalid name for struct member");
      if (typeof i != "object")
        throw new TypeError("Invalid member for struct field");
      if (!("constructor" in i))
        throw new TypeError("Invalid member for struct field");
      let s = i.constructor;
      (s[Jo] ||= []), s[Jo].push({ name: r, type: t, length: e });
    };
  }
  o(md, "member");
  function _w(t) {
    function e(i, n) {
      return typeof i == "number" ? md(t, i) : md(t)(i, n);
    }
    return o(e, "_"), e;
  }
  o(_w, "_member");
  var Bx = Object.fromEntries(yd.map((t) => [t, _w(t)]));
  function Qo(t) {
    class e extends t {
      static {
        o(this, "ReadonlyFS");
      }
      metadata() {
        return { ...super.metadata(), readonly: !0 };
      }
      async rename(n, r) {
        throw new u(30);
      }
      renameSync(n, r) {
        throw new u(30);
      }
      async createFile(n, r, s) {
        throw new u(30);
      }
      createFileSync(n, r, s) {
        throw new u(30);
      }
      async unlink(n) {
        throw new u(30);
      }
      unlinkSync(n) {
        throw new u(30);
      }
      async rmdir(n) {
        throw new u(30);
      }
      rmdirSync(n) {
        throw new u(30);
      }
      async mkdir(n, r) {
        throw new u(30);
      }
      mkdirSync(n, r) {
        throw new u(30);
      }
      async link(n, r) {
        throw new u(30);
      }
      linkSync(n, r) {
        throw new u(30);
      }
      async sync(n, r, s) {
        throw new u(30);
      }
      syncSync(n, r, s) {
        throw new u(30);
      }
    }
    return e;
  }
  o(Qo, "Readonly");
  var Zo = 1,
    Cr = class t extends Map {
      static {
        o(this, "Index");
      }
      files() {
        let e = new Map();
        for (let [i, n] of this) n.isFile() && e.set(i, n);
        return e;
      }
      toJSON() {
        return { version: Zo, entries: Object.fromEntries(this) };
      }
      toString() {
        return JSON.stringify(this.toJSON());
      }
      dirEntries(e) {
        let i = [];
        for (let n of this.keys()) E(n) == e && i.push(B(n));
        return i;
      }
      fromJSON(e) {
        if (e.version != Zo) throw new u(22, "Index version mismatch");
        this.clear();
        for (let [i, n] of Object.entries(e.entries)) {
          let r = new Y(n);
          r.isDirectory() &&
            (r.fileData = Re(JSON.stringify(this.dirEntries(i)))),
            this.set(i, r);
        }
      }
      static parse(e) {
        if (!hd(e)) throw new u(22, "Invalid JSON");
        let i = JSON.parse(e),
          n = new t();
        return n.fromJSON(i), n;
      }
    },
    kn = class extends Qo(pe) {
      constructor(i) {
        super();
        this.indexData = i;
        this.index = new Cr();
        this._isInitialized = !1;
      }
      static {
        o(this, "IndexFS");
      }
      async ready() {
        await super.ready(),
          !this._isInitialized &&
            (this.index.fromJSON(await this.indexData),
            (this._isInitialized = !0));
      }
      async reloadFiles() {
        for (let [i, n] of this.index.files())
          delete n.fileData, (n.fileData = await this.getData(i, n));
      }
      reloadFilesSync() {
        for (let [i, n] of this.index.files())
          delete n.fileData, (n.fileData = this.getDataSync(i, n));
      }
      stat(i) {
        return Promise.resolve(this.statSync(i));
      }
      statSync(i) {
        if (!this.index.has(i)) throw u.With("ENOENT", i, "stat");
        return this.index.get(i);
      }
      async openFile(i, n) {
        if (be(n)) throw new u(1, i);
        let r = this.index.get(i);
        if (!r) throw u.With("ENOENT", i, "openFile");
        return new ci(
          this,
          i,
          n,
          r,
          r.isDirectory() ? r.fileData : await this.getData(i, r)
        );
      }
      openFileSync(i, n) {
        if (be(n)) throw new u(1, i);
        let r = this.index.get(i);
        if (!r) throw u.With("ENOENT", i, "openFile");
        return new ci(
          this,
          i,
          n,
          r,
          r.isDirectory() ? r.fileData : this.getDataSync(i, r)
        );
      }
      readdir(i) {
        return Promise.resolve(this.readdirSync(i));
      }
      readdirSync(i) {
        let n = this.index.get(i);
        if (!n) throw u.With("ENOENT", i, "readdir");
        if (!n.isDirectory()) throw u.With("ENOTDIR", i, "readdir");
        let r = JSON.parse(ti(n.fileData));
        if (!Array.isArray(r)) throw u.With("ENODATA", i, "readdir");
        if (!r.every((s) => typeof s == "string"))
          throw u.With("ENODATA", i, "readdir");
        return r;
      }
    };
  async function bd(t, e) {
    let i = await fetch(t).catch((n) => {
      throw new u(5, n.message);
    });
    if (!i.ok)
      throw new u(5, "fetch failed: response returned code " + i.status);
    switch (e) {
      case "buffer": {
        let n = await i.arrayBuffer().catch((r) => {
          throw new u(5, r.message);
        });
        return new Uint8Array(n);
      }
      case "json":
        return i.json().catch((n) => {
          throw new u(5, n.message);
        });
      default:
        throw new u(22, "Invalid download type: " + e);
    }
  }
  o(bd, "fetchFile");
  var Br = class t extends kn {
      static {
        o(this, "FetchFS");
      }
      async ready() {
        if (!this._isInitialized && (await super.ready(), !this._disableSync))
          for (let [e, i] of this.index.files()) await this.getData(e, i);
      }
      constructor({ index: e = "index.json", baseUrl: i = "" }) {
        super(typeof e != "string" ? e : bd(e, "json")),
          i.at(-1) != "/" && (i += "/"),
          (this.baseUrl = i);
      }
      metadata() {
        return { ...super.metadata(), name: t.name, readonly: !0 };
      }
      preload(e, i) {
        let n = this.index.get(e);
        if (!n) throw u.With("ENOENT", e, "preload");
        if (!n.isFile()) throw u.With("EISDIR", e, "preload");
        (n.size = i.length), (n.fileData = i);
      }
      async getData(e, i) {
        if (i.fileData) return i.fileData;
        let n = await bd(
          this.baseUrl + (e.startsWith("/") ? e.slice(1) : e),
          "buffer"
        );
        return (i.fileData = n), n;
      }
      getDataSync(e, i) {
        if (i.fileData) return i.fileData;
        throw new u(61, "", e, "getData");
      }
    },
    Ew = {
      name: "Fetch",
      options: {
        index: {
          type: ["string", "object"],
          required: !1,
          description:
            "URL to a file index as a JSON file or the file index object itself, generated with the make-index script. Defaults to `index.json`.",
        },
        baseUrl: {
          type: "string",
          required: !1,
          description:
            "Used as the URL prefix for fetched files. Default: Fetch files relative to the index.",
        },
      },
      isAvailable: o(function () {
        return typeof globalThis.fetch == "function";
      }, "isAvailable"),
      create: o(function (t) {
        return new Br(t);
      }, "create"),
    },
    xw = Ew;
  var Dr = class {
      constructor(e) {
        this.previous = e;
        this.current = Promise.withResolvers();
        this._isLocked = !0;
      }
      static {
        o(this, "MutexLock");
      }
      get isLocked() {
        return this._isLocked;
      }
      async done() {
        await this.previous?.done(), await this.current.promise;
      }
      unlock() {
        this.current.resolve(), (this._isLocked = !1);
      }
      [Symbol.dispose]() {
        this.unlock();
      }
    },
    Mr = class {
      static {
        o(this, "__MutexedFS");
      }
      async ready() {
        return await this._fs.ready();
      }
      metadata() {
        return this._fs.metadata();
      }
      addLock() {
        let e = new Dr(this.currentLock);
        return (this.currentLock = e), e;
      }
      async lock(e, i) {
        let n = this.currentLock,
          r = this.addLock(),
          s = new Error().stack;
        return (
          setTimeout(() => {
            if (r.isLocked) {
              let a = u.With("EDEADLK", e, i);
              throw ((a.stack += s?.slice(5)), a);
            }
          }, 5e3),
          await n?.done(),
          r
        );
      }
      lockSync(e, i) {
        if (this.currentLock) throw u.With("EBUSY", e, i);
        return this.addLock();
      }
      get isLocked() {
        return !!this.currentLock?.isLocked;
      }
      async rename(e, i) {
        var r = [];
        try {
          let n = w(r, await this.lock(e, "rename"));
          await this._fs.rename(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      renameSync(e, i) {
        var r = [];
        try {
          let n = w(r, this.lockSync(e, "rename"));
          return this._fs.renameSync(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      async stat(e) {
        var n = [];
        try {
          let i = w(n, await this.lock(e, "stat"));
          return await this._fs.stat(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      statSync(e) {
        var n = [];
        try {
          let i = w(n, this.lockSync(e, "stat"));
          return this._fs.statSync(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      async openFile(e, i) {
        var s = [];
        try {
          let n = w(s, await this.lock(e, "openFile"));
          let r = await this._fs.openFile(e, i);
          r.fs = this;
          return r;
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          _(s, c, l);
        }
      }
      openFileSync(e, i) {
        var s = [];
        try {
          let n = w(s, this.lockSync(e, "openFile"));
          let r = this._fs.openFileSync(e, i);
          r.fs = this;
          return r;
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          _(s, c, l);
        }
      }
      async createFile(e, i, n) {
        var a = [];
        try {
          let r = w(a, await this.lock(e, "createFile"));
          let s = await this._fs.createFile(e, i, n);
          s.fs = this;
          return s;
        } catch (c) {
          var l = c,
            f = !0;
        } finally {
          _(a, l, f);
        }
      }
      createFileSync(e, i, n) {
        var a = [];
        try {
          let r = w(a, this.lockSync(e, "createFile"));
          let s = this._fs.createFileSync(e, i, n);
          s.fs = this;
          return s;
        } catch (c) {
          var l = c,
            f = !0;
        } finally {
          _(a, l, f);
        }
      }
      async unlink(e) {
        var n = [];
        try {
          let i = w(n, await this.lock(e, "unlink"));
          await this._fs.unlink(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      unlinkSync(e) {
        var n = [];
        try {
          let i = w(n, this.lockSync(e, "unlink"));
          return this._fs.unlinkSync(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      async rmdir(e) {
        var n = [];
        try {
          let i = w(n, await this.lock(e, "rmdir"));
          await this._fs.rmdir(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      rmdirSync(e) {
        var n = [];
        try {
          let i = w(n, this.lockSync(e, "rmdir"));
          return this._fs.rmdirSync(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      async mkdir(e, i) {
        var r = [];
        try {
          let n = w(r, await this.lock(e, "mkdir"));
          await this._fs.mkdir(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      mkdirSync(e, i) {
        var r = [];
        try {
          let n = w(r, this.lockSync(e, "mkdir"));
          return this._fs.mkdirSync(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      async readdir(e) {
        var n = [];
        try {
          let i = w(n, await this.lock(e, "readdir"));
          return await this._fs.readdir(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      readdirSync(e) {
        var n = [];
        try {
          let i = w(n, this.lockSync(e, "readdir"));
          return this._fs.readdirSync(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      async exists(e) {
        var n = [];
        try {
          let i = w(n, await this.lock(e, "exists"));
          return await this._fs.exists(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      existsSync(e) {
        var n = [];
        try {
          let i = w(n, this.lockSync(e, "exists"));
          return this._fs.existsSync(e);
        } catch (r) {
          var s = r,
            a = !0;
        } finally {
          _(n, s, a);
        }
      }
      async link(e, i) {
        var r = [];
        try {
          let n = w(r, await this.lock(e, "link"));
          await this._fs.link(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      linkSync(e, i) {
        var r = [];
        try {
          let n = w(r, this.lockSync(e, "link"));
          return this._fs.linkSync(e, i);
        } catch (s) {
          var a = s,
            c = !0;
        } finally {
          _(r, a, c);
        }
      }
      async sync(e, i, n) {
        var s = [];
        try {
          let r = w(s, await this.lock(e, "sync"));
          await this._fs.sync(e, i, n);
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          _(s, c, l);
        }
      }
      syncSync(e, i, n) {
        var s = [];
        try {
          let r = w(s, this.lockSync(e, "sync"));
          return this._fs.syncSync(e, i, n);
        } catch (a) {
          var c = a,
            l = !0;
        } finally {
          _(s, c, l);
        }
      }
    };
  function ea(t) {
    class e extends Mr {
      static {
        o(this, "MutexedFS");
      }
      constructor(...n) {
        super(), (this._fs = new t(...n));
      }
    }
    return e;
  }
  o(ea, "Mutexed");
  var ta = "/.deleted",
    Wr = class extends pe {
      constructor({ writable: i, readable: n }) {
        super();
        this._isInitialized = !1;
        this._deletedFiles = new Set();
        this._deleteLog = "";
        this._deleteLogUpdatePending = !1;
        this._deleteLogUpdateNeeded = !1;
        if (
          ((this.writable = i),
          (this.readable = n),
          this.writable.metadata().readonly)
        )
          throw new u(22, "Writable file system must be writable.");
        this._ready = this._initialize();
      }
      static {
        o(this, "UnmutexedOverlayFS");
      }
      async ready() {
        await this.readable.ready(),
          await this.writable.ready(),
          await this._ready;
      }
      metadata() {
        return { ...super.metadata(), name: vn.name };
      }
      async sync(i, n, r) {
        await this.createParentDirectories(i),
          (await this.writable.exists(i)) ||
            (await this.writable.createFile(i, "w", 420)),
          await this.writable.sync(i, n, r);
      }
      syncSync(i, n, r) {
        this.createParentDirectoriesSync(i), this.writable.syncSync(i, n, r);
      }
      async _initialize() {
        if (!this._isInitialized) {
          try {
            let i = await this.writable.openFile(ta, D("r")),
              { size: n } = await i.stat(),
              { buffer: r } = await i.read(new Uint8Array(n));
            this._deleteLog = ti(r);
          } catch (i) {
            if (i.errno !== 2) throw i;
          }
          (this._isInitialized = !0), this._reparseDeletionLog();
        }
      }
      getDeletionLog() {
        return this._deleteLog;
      }
      async restoreDeletionLog(i) {
        (this._deleteLog = i),
          this._reparseDeletionLog(),
          await this.updateLog("");
      }
      async rename(i, n) {
        this.checkInitialized(), this.checkPath(i), this.checkPath(n);
        try {
          await this.writable.rename(i, n);
        } catch {
          if (this._deletedFiles.has(i)) throw u.With("ENOENT", i, "rename");
        }
      }
      renameSync(i, n) {
        this.checkInitialized(), this.checkPath(i), this.checkPath(n);
        try {
          this.writable.renameSync(i, n);
        } catch {
          if (this._deletedFiles.has(i)) throw u.With("ENOENT", i, "rename");
        }
      }
      async stat(i) {
        this.checkInitialized();
        try {
          return await this.writable.stat(i);
        } catch {
          if (this._deletedFiles.has(i)) throw u.With("ENOENT", i, "stat");
          let r = new Y(await this.readable.stat(i));
          return (r.mode |= 146), r;
        }
      }
      statSync(i) {
        this.checkInitialized();
        try {
          return this.writable.statSync(i);
        } catch {
          if (this._deletedFiles.has(i)) throw u.With("ENOENT", i, "stat");
          let r = new Y(this.readable.statSync(i));
          return (r.mode |= 146), r;
        }
      }
      async openFile(i, n) {
        if (await this.writable.exists(i)) return this.writable.openFile(i, n);
        let r = await this.readable.openFile(i, D("r")),
          s = new Y(await r.stat()),
          { buffer: a } = await r.read(new Uint8Array(s.size));
        return new ge(this, i, n, s, a);
      }
      openFileSync(i, n) {
        if (this.writable.existsSync(i))
          return this.writable.openFileSync(i, n);
        let r = this.readable.openFileSync(i, D("r")),
          s = new Y(r.statSync()),
          a = new Uint8Array(s.size);
        return r.readSync(a), new ge(this, i, n, s, a);
      }
      async createFile(i, n, r) {
        return (
          this.checkInitialized(),
          await this.writable.createFile(i, n, r),
          this.openFile(i, n)
        );
      }
      createFileSync(i, n, r) {
        return (
          this.checkInitialized(),
          this.writable.createFileSync(i, n, r),
          this.openFileSync(i, n)
        );
      }
      async link(i, n) {
        this.checkInitialized(), await this.writable.link(i, n);
      }
      linkSync(i, n) {
        this.checkInitialized(), this.writable.linkSync(i, n);
      }
      async unlink(i) {
        if (
          (this.checkInitialized(), this.checkPath(i), !(await this.exists(i)))
        )
          throw u.With("ENOENT", i, "unlink");
        (await this.writable.exists(i)) && (await this.writable.unlink(i)),
          (await this.exists(i)) && (await this.deletePath(i));
      }
      unlinkSync(i) {
        if ((this.checkInitialized(), this.checkPath(i), !this.existsSync(i)))
          throw u.With("ENOENT", i, "unlink");
        this.writable.existsSync(i) && this.writable.unlinkSync(i),
          this.existsSync(i) && this.deletePath(i);
      }
      async rmdir(i) {
        if ((this.checkInitialized(), !(await this.exists(i))))
          throw u.With("ENOENT", i, "rmdir");
        if (
          ((await this.writable.exists(i)) && (await this.writable.rmdir(i)),
          await this.exists(i))
        ) {
          if ((await this.readdir(i)).length > 0)
            throw u.With("ENOTEMPTY", i, "rmdir");
          await this.deletePath(i);
        }
      }
      rmdirSync(i) {
        if ((this.checkInitialized(), !this.existsSync(i)))
          throw u.With("ENOENT", i, "rmdir");
        if (
          (this.writable.existsSync(i) && this.writable.rmdirSync(i),
          this.existsSync(i))
        ) {
          if (this.readdirSync(i).length > 0)
            throw u.With("ENOTEMPTY", i, "rmdir");
          this.deletePath(i);
        }
      }
      async mkdir(i, n) {
        if ((this.checkInitialized(), await this.exists(i)))
          throw u.With("EEXIST", i, "mkdir");
        await this.createParentDirectories(i), await this.writable.mkdir(i, n);
      }
      mkdirSync(i, n) {
        if ((this.checkInitialized(), this.existsSync(i)))
          throw u.With("EEXIST", i, "mkdir");
        this.createParentDirectoriesSync(i), this.writable.mkdirSync(i, n);
      }
      async readdir(i) {
        if ((this.checkInitialized(), !(await this.stat(i)).isDirectory()))
          throw u.With("ENOTDIR", i, "readdir");
        let r = [];
        try {
          r.push(...(await this.writable.readdir(i)));
        } catch {}
        try {
          r.push(
            ...(await this.readable.readdir(i)).filter(
              (a) => !this._deletedFiles.has(`${i}/${a}`)
            )
          );
        } catch {}
        let s = {};
        return r.filter((a) => {
          let c = !s[a];
          return (s[a] = !0), c;
        });
      }
      readdirSync(i) {
        if ((this.checkInitialized(), !this.statSync(i).isDirectory()))
          throw u.With("ENOTDIR", i, "readdir");
        let r = [];
        try {
          r = r.concat(this.writable.readdirSync(i));
        } catch {}
        try {
          r = r.concat(
            this.readable
              .readdirSync(i)
              .filter((a) => !this._deletedFiles.has(`${i}/${a}`))
          );
        } catch {}
        let s = {};
        return r.filter((a) => {
          let c = !s[a];
          return (s[a] = !0), c;
        });
      }
      async deletePath(i) {
        this._deletedFiles.add(i),
          await this.updateLog(`d${i}
`);
      }
      async updateLog(i) {
        if (((this._deleteLog += i), this._deleteLogUpdatePending)) {
          this._deleteLogUpdateNeeded = !0;
          return;
        }
        this._deleteLogUpdatePending = !0;
        let n = await this.writable.openFile(ta, D("w"));
        try {
          await n.write(Re(this._deleteLog)),
            this._deleteLogUpdateNeeded &&
              ((this._deleteLogUpdateNeeded = !1), await this.updateLog(""));
        } catch (r) {
          this._deleteLogError = r;
        } finally {
          this._deleteLogUpdatePending = !1;
        }
      }
      _reparseDeletionLog() {
        this._deletedFiles.clear();
        for (let i of this._deleteLog.split(`
`))
          i.startsWith("d") && this._deletedFiles.add(i.slice(1));
      }
      checkInitialized() {
        if (!this._isInitialized)
          throw new u(
            1,
            "OverlayFS is not initialized. Please initialize OverlayFS using its initialize() method before using it."
          );
        if (!this._deleteLogError) return;
        let i = this._deleteLogError;
        throw (delete this._deleteLogError, i);
      }
      checkPath(i) {
        if (i == ta) throw u.With("EPERM", i, "checkPath");
      }
      createParentDirectoriesSync(i) {
        let n = E(i),
          r = [];
        for (; !this.writable.existsSync(n); ) r.push(n), (n = E(n));
        for (let s of r.reverse())
          this.writable.mkdirSync(s, this.statSync(s).mode);
      }
      async createParentDirectories(i) {
        let n = E(i),
          r = [];
        for (; !(await this.writable.exists(n)); ) r.push(n), (n = E(n));
        for (let s of r.reverse()) {
          let a = await this.stat(s);
          await this.writable.mkdir(s, a.mode);
        }
      }
      operateOnWritable(i) {
        if (!this.existsSync(i))
          throw u.With("ENOENT", i, "operateOnWriteable");
        this.writable.existsSync(i) || this.copyToWritableSync(i);
      }
      async operateOnWritableAsync(i) {
        if (!(await this.exists(i)))
          throw u.With("ENOENT", i, "operateOnWritable");
        if (!(await this.writable.exists(i))) return this.copyToWritable(i);
      }
      copyToWritableSync(i) {
        let n = this.statSync(i);
        if (n.isDirectory()) {
          this.writable.mkdirSync(i, n.mode);
          return;
        }
        let r = new Uint8Array(n.size),
          s = this.readable.openFileSync(i, D("r"));
        s.readSync(r), s.closeSync();
        let a = this.writable.openFileSync(i, D("w"));
        a.writeSync(r), a.closeSync();
      }
      async copyToWritable(i) {
        let n = await this.stat(i);
        if (n.isDirectory()) {
          await this.writable.mkdir(i, n.mode);
          return;
        }
        let r = new Uint8Array(n.size),
          s = await this.readable.openFile(i, D("r"));
        await s.read(r), await s.close();
        let a = await this.writable.openFile(i, D("w"));
        await a.write(r), await a.close();
      }
    },
    vn = class extends ea(Wr) {
      static {
        o(this, "OverlayFS");
      }
    },
    kw = {
      name: "Overlay",
      options: {
        writable: {
          type: "object",
          required: !0,
          description: "The file system to write modified files to.",
        },
        readable: {
          type: "object",
          required: !0,
          description:
            "The file system that initially populates this file system.",
        },
      },
      isAvailable: o(function () {
        return !0;
      }, "isAvailable"),
      create: o(function (t) {
        return new vn(t);
      }, "create"),
    },
    vw = kw;
  function Fw(t) {
    class e extends t {
      static {
        o(this, "SyncFS");
      }
      async exists(n) {
        return this.existsSync(n);
      }
      async rename(n, r) {
        return this.renameSync(n, r);
      }
      async stat(n) {
        return this.statSync(n);
      }
      async createFile(n, r, s) {
        return this.createFileSync(n, r, s);
      }
      async openFile(n, r) {
        return this.openFileSync(n, r);
      }
      async unlink(n) {
        return this.unlinkSync(n);
      }
      async rmdir(n) {
        return this.rmdirSync(n);
      }
      async mkdir(n, r) {
        return this.mkdirSync(n, r);
      }
      async readdir(n) {
        return this.readdirSync(n);
      }
      async link(n, r) {
        return this.linkSync(n, r);
      }
      async sync(n, r, s) {
        return this.syncSync(n, r, s);
      }
    }
    return e;
  }
  o(Fw, "Sync");
  var Iw = _n;
  return kd(Aw);
});
module.exports = ZenFS();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
//# sourceMappingURL=browser.min.js.map
