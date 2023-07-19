webpackJsonp([2],{

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(348)

var Component = __webpack_require__(101)(
  /* script */
  __webpack_require__(283),
  /* template */
  __webpack_require__(373),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_getData__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_env__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(104);









/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      baseImgPath: __WEBPACK_IMPORTED_MODULE_4__config_env__["b" /* baseImgPath */]
    };
  },
  created: function created() {
    if (!this.adminInfo.id) {}
  },

  computed: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["b" /* mapState */])(["adminInfo"])),
  methods: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["c" /* mapActions */])(["getAdminData"]), {
    handleCommand: function handleCommand(command) {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.mark(function _callee() {
        var res;
        return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(command == "home")) {
                  _context.next = 4;
                  break;
                }

                _this.$router.push("/manage");
                _context.next = 9;
                break;

              case 4:
                if (!(command == "signout")) {
                  _context.next = 9;
                  break;
                }

                _context.next = 7;
                return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__api_getData__["b" /* signout */])();

              case 7:
                res = _context.sent;

                if (res.status == 1) {
                  _this.$message({
                    type: "success",
                    message: "退出成功"
                  });
                  _this.$router.push("/");
                } else {
                  _this.$message({
                    type: "error",
                    message: res.message
                  });
                }

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  })
});

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(235)(false);
// imports


// module
exports.push([module.i, ".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.header_container{background-color:#eff2f7;height:60px;display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:center;align-items:center;padding-left:20px}.avator{width:36px;height:36px;border-radius:50%;margin-right:37px}.el-dropdown-menu__item{text-align:center}", ""]);

// exports


/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(236)("77fd51a6", content, true);

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(262)

var Component = __webpack_require__(101)(
  /* script */
  __webpack_require__(260),
  /* template */
  __webpack_require__(264),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 264:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "header_container"
  }, [_c('el-breadcrumb', {
    attrs: {
      "separator": "/"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/manage'
      }
    }
  }, [_vm._v("首页")]), _vm._v(" "), _vm._l((_vm.$route.meta), function(item, index) {
    return _c('el-breadcrumb-item', {
      key: index
    }, [_vm._v(_vm._s(item))])
  })], 2), _vm._v(" "), _c('el-dropdown', {
    attrs: {
      "menu-align": "start"
    },
    on: {
      "command": _vm.handleCommand
    }
  }, [_c('img', {
    staticClass: "avator",
    attrs: {
      "src": _vm.baseImgPath + _vm.adminInfo.avatar
    }
  }), _vm._v(" "), _c('el-dropdown-menu', {
    attrs: {
      "slot": "dropdown"
    },
    slot: "dropdown"
  }, [_c('el-dropdown-item', {
    attrs: {
      "command": "home"
    }
  }, [_vm._v("首页")]), _vm._v(" "), _c('el-dropdown-item', {
    attrs: {
      "command": "signout"
    }
  }, [_vm._v("退出")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(267), __esModule: true };

/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(265);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60);
__webpack_require__(269);
module.exports = __webpack_require__(5).Array.from;


/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(12);
var createDesc = __webpack_require__(29);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(28);
var $export = __webpack_require__(11);
var toObject = __webpack_require__(30);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(105);
var toLength = __webpack_require__(59);
var createProperty = __webpack_require__(268);
var getIterFn = __webpack_require__(108);

$export($export.S + $export.F * !__webpack_require__(107)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_headTop__ = __webpack_require__(263);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_headTop___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_headTop__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_time_formater__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_time_formater___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_time_formater__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__api_getData__ = __webpack_require__(102);










/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[], [], []]
    };
  },

  components: {
    headTop: __WEBPACK_IMPORTED_MODULE_4__components_headTop___default.a
  },
  mounted: function mounted() {
    for (var i = 6; i > -1; i--) {
      var date = __WEBPACK_IMPORTED_MODULE_5_time_formater___default()(new Date().getTime() - 86400000 * i).format("YYYY-MM-DD");
      this.sevenDay.push(date);
    }
  },

  computed: {},
  methods: {
    initData: function initData() {
      var _this = this;

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee() {
        var today;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                today = __WEBPACK_IMPORTED_MODULE_5_time_formater___default()().format("YYYY-MM-DD");

                __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.all([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["s" /* userCount */])(today), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["t" /* orderCount */])(today), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["u" /* adminDayCount */])(today), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["v" /* getUserCount */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["j" /* getOrderCount */])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["h" /* adminCount */])()]).then(function (res) {
                  _this.userCount = res[0].count;
                  _this.orderCount = res[1].count;
                  _this.adminCount = res[2].count;
                  _this.allUserCount = res[3].count;
                  _this.allOrderCount = res[4].count;
                  _this.allAdminCount = res[5].count;
                }).catch(function (err) {
                  console.log(err);
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    },
    getSevenData: function getSevenData() {
      var _this2 = this;

      return __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_asyncToGenerator___default()(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.mark(function _callee2() {
        var apiArr, promiseArr;
        return __WEBPACK_IMPORTED_MODULE_1_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                apiArr = [[], [], []];

                _this2.sevenDay.forEach(function (item) {
                  apiArr[0].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["s" /* userCount */])(item));
                  apiArr[1].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["t" /* orderCount */])(item));
                  apiArr[2].push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__api_getData__["u" /* adminDayCount */])(item));
                });
                promiseArr = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(apiArr[0]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(apiArr[1]), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(apiArr[2]));

                __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_promise___default.a.all(promiseArr).then(function (res) {
                  var resArr = [[], [], []];
                  res.forEach(function (item, index) {
                    if (item.status == 1) {
                      resArr[Math.floor(index / 7)].push(item.count);
                    }
                  });
                  _this2.sevenDate = resArr;
                }).catch(function (err) {
                  console.log(err);
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  }
});

/***/ }),

/***/ 322:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(235)(false);
// imports


// module
exports.push([module.i, ".allcover{position:absolute;top:0;right:0}.ctt{left:50%;transform:translate(-50%,-50%)}.ctt,.tb{position:absolute;top:50%}.tb{transform:translateY(-50%)}.lr{position:absolute;left:50%;transform:translateX(-50%)}.data_section{padding:20px;margin-bottom:40px}.data_section .section_title{text-align:center;font-size:30px;margin-bottom:10px}.data_section .data_list{text-align:center;font-size:14px;color:#666;border-radius:6px;background:#e5e9f2}.data_section .data_list .data_num{color:#333;font-size:26px}.data_section .data_list .head{border-radius:6px;font-size:22px;padding:4px 0;color:#fff;display:inline-block}.data_section .today_head{background:#ff9800}.data_section .all_head{background:#20a0ff}.wan{font-size:16px;color:#333}", ""]);

// exports


/***/ }),

/***/ 348:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(322);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(236)("4fc53c95", content, true);

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

const MONTH_DISPLAY = ['', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const WEEK_DISPLAY = ['日', '一', '二', '三', '四', '五', '六']
// 单位大小
const UNIT_SIZE = {
    d: 86400000, // 毫秒/天
    H: 3600000, // 毫秒/小时
    m: 60000, // 毫秒/分钟
    s: 1000, // 毫秒/秒
    S: 1 // 毫秒
}

const TimeFormater = function (input) {
    if (!(this instanceof TimeFormater)) {
        return new TimeFormater(input)
    }
    this[0] = input ? new Date(input) : new Date()
}

TimeFormater.prototype = {

    format(token) {
        if (typeof token !== 'string') {
            return this.toLocaleString()
        }

        const reg = /Y{4}|M{1,4}|Do|D{1,2}|d{1,4}|Q|H{1,2}|h{1,2}|m{1,2}|s{1,2}|S{1,3}|A|a|x|X/g
        return token.replace(reg, (match) => this[match] ? this[match]() : match)
    },

    fromNow() {
        let oldTime = this[0].getTime()
        let newTime = Date.now()
        let diff = Math.floor(newTime - oldTime)

        if (diff < 10000) {
            return '刚刚'
        } else if (diff < 60000) {
            return parseInt(diff / 1000) + '秒前'
        } else if (diff < 3600000) {
            return parseInt(diff / 60000) + '分钟前'
        } else if (diff < 86400000) {
            return parseInt(diff / 3600000) + '小时前'
        } else if (diff < 2592000000) {
            return parseInt(diff / 86400000) + '天前'
        } else if (diff < 31104000000) {
            return parseInt(diff / 2592000000) + '月前'
        } else {
            return parseInt(diff / 31104000000) + '年前'
        }
    },
    
    fillZero(num) {
        return num < 10 ? '0' + num : num
    },

    YYYY() {
        return this[0].getFullYear()
    },

    Q() {
        return Math.ceil(this.M() / 3)
    },

    // 月份 [1..12]
    M() {
        return this[0].getMonth() + 1
    },

    // 月份 [01..12]
    MM() {
        return this.fillZero(this.M())
    },

    // 月份 [1月..12月]
    MMM() {
        return this.M() + '月'
    },

    // 月份 [一月..十二月]
    MMMM() {
        return MONTH_DISPLAY[this.M()]
    },

    // 日期 [1..31]
    D() {
        return this[0].getDate()
    },

    // 日期 [1日..31日]
    Do() {
        return this.D() + '日'
    },

    // 日期 [01..31]
    DD() {
        return this.fillZero(this.D())
    },

    // 星期 [0..6]
    d() {
        return this[0].getDay()
    },

    // 星期 [日..六]
    dd() {
        return WEEK_DISPLAY[this.d()]
    },

    // 星期 [周日..周六]
    ddd() {
        return '周' + this.dd()
    },

    // 星期 [星期日..星期六]
    dddd() {
        return '星期' + this.dd()
    },

    // 时 [0..23]
    H() {
        return this[0].getHours()
    },

    // 时 [00..23]
    HH() {
        return this.fillZero(this.H())
    },

    // 时 [1.12]
    h() {
        let hour = this.H() % 12
        return hour || 12
    },

    // 时 [01..12]
    hh() {
        return this.fillZero(this.h())
    },

    // 分钟 [0..59]
    m() {
        return this[0].getMinutes()
    },

    // 分钟 [00..59]
    mm() {
        return this.fillZero(this.m())
    },

    // 秒 [0..59]
    s() {
        return this[0].getSeconds()
    },

    // 秒 [00..59]
    ss() {
        return this.fillZero(this.s())
    },

    // 毫秒 [0..999]
    SSS() {
        return this[0].getMilliseconds()
    },

    // 毫秒 [0..99]
    SS() {
        return Math.floor(this.SSS() / 10)
    },

    // 毫秒 [0..9]
    S() {
        return Math.floor(this.SS() / 10)
    },

    A() {
        let hm = this.H() * 100 + this.m()
        let part = ['凌晨', '早上', '上午', '中午', '下午', '晚上']
        let interval = [600, 900, 1130, 1230, 1800, Infinity]
        let i = interval.findIndex(function (item) {
            return hm < item
        })
        return part[i]
    },

    // A 的别名
    a() {
        return this.A()
    },

    // 时间戳，单位：毫秒
    x() {
        return this[0].getTime()
    },

    // 时间戳，单位：秒
    X() {
        return Math.floor(this.x() / 1000)
    }
}

/**
 * 倒计时
 * @param {number|string|Date} time 类型为数字表示剩余的秒数，为Date实例或字符串（符合ISO 8601格式），表示结束的时间点。
 */
TimeFormater.countdown = function (time) {
    let endPoint = 0
    if (typeof time === 'number') {
        // time 为数字类型，表示剩余的秒数
        endPoint = time * 1000 + Date.now()
    } else if (typeof time === 'string') {
        // time 为字符串，则应符合ISO 8601格式，表示结束的时间点
        endPoint = new Date(time).getTime()
    } else if (time instanceof Date) {
        // time 为Date对象实例，表示结束的时间点
        endPoint = time.getTime()
    }

    /**
     * 将剩余的时间量格式化为字符串
     * @param {string} token 用于指定输出格式。例：'剩余：d天H小时m分钟s秒' => "剩余：1天11小时4分钟38秒"。
     */
    let format = function (token) {
        let now = Date.now()
        let remain = endPoint - now
        let limit = 0 // 忽略负数
        remain = Math.max(limit, remain)

        return token.replace(/(?:#(\d+))?([dHmsS])/g, function (all, width, key) {
            // 如果存在换算单位，则进行单位转换
            if (UNIT_SIZE[key]) {
                let r = remain
                remain %= UNIT_SIZE[key]
                let str = parseInt(r / UNIT_SIZE[key]).toString()
                // 如果指定宽度，则进行填充处理
                if (width && str.length < width) {
                    str = new Array(width - str.length).fill(0).join('') + str
                }
                return str
            } else {
                return key
            }
        })
    }

    return { format }
}

module.exports = TimeFormater

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('head-top'), _vm._v(" "), _c('section', {
    staticClass: "data_section"
  }, [_vm._v("欢迎进入Fortis管理")])], 1)
},staticRenderFns: []}

/***/ })

});