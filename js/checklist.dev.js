"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(function () {
  var template = document.createElement('template');
  styles = "\n    <style>\n      .filter {\n        display: flex;\n        flex-flow: row-wrap;\n        text-align: center;\n        justify-content: center;\n      }\n      .filter a{\n        flex: 1 1 auto;\n        margin: 1em;\n        color: black;\n        text-decoration: none;\n        word-break: break-all;\n        white-space: nowrap;\n        padding: .5em;\n        border-radius: .25em;\n      }\n      .intro {\n        //display: none;\n      }\n      .item {\n        display: flex;\n        padding: 2em 0 1em 5px;\n      }\n      .item .triggeredBy {\n        text-align: right;\n      }\n      .item .check {\n        flex: 3 1 auto;\n        overflow: hidden;\n        white-space: nowrap;\n      }\n      .item .check:after {\n        font-family: Monospace;\n        opacity: 0.25;\n        content: \" ..........................................................................................................................................\";\n      }\n      .item .value {\n        flex: 1 1 auto;\n        padding-left: 1em;\n        text-align: right;\n        word-break: break-all;\n        white-space: nowrap;\n        text-transform: uppercase;\n      }\n      .item .value:after {\n        padding-left: 5px;\n        color: #333333;\n        content: \"\u2610\";\n      }\n\n      .item.completed {\n        opacity: 0.5;\n        color: #517051;\n      }\n      .item.completed .value:after {\n        text-decoration: none;\n        content: \"\u2611\";\n        color: beige;\n      }\n\n      .item.pf {\n        border-left: 2px solid #ff00ff75;\n      }\n\n      .item.pm {\n        border-left: 2px solid #ffff00b0;\n      }\n\n      .triggeredBy {\n        color: #666666;\n        word-break: break-all;\n        white-space: nowrap;\n\n      }\n      .filter .all a{\n        border: 1px solid silver;\n        color: silver;\n      }\n      .filter .pf a{\n        background: #ff00ff75;\n      }\n      .filter .pm a{\n        background: #ffff00b0;\n      }\n      .resetBtn {\n        margin-top: 5em;\n      }\n      .resetBtn a{\n        background: #761919;\n        color: white;\n      }\n      .hidden {\n        display: none;\n      }\n      .pfChecked {\n        border-left: 5px solid rgba(69,145,80,1);\n      }\n      .pmChecked {\n        border-right: 5px solid rgba(69,145,80,1);\n      }\n      h2 {\n        margin-top: 4em;\n      }\n      </style>";
  template.innerHTML = styles + "\n      <div class=\"filter\">\n        <div class=\"all\"><a href=\"?\">BOTH</a></div>\n        <div class=\"pf\"><a href=\"?hideRole=pm\">Pilot flying</a></div>     \n        <div class=\"pm\"><a href=\"?hideRole=pf\">Pilot monitoring</a></div></div>";

  var checklist =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(checklist, _HTMLElement);

    function checklist() {
      var _this2;

      _classCallCheck(this, checklist);

      _this2 = _possibleConstructorReturn(this, _getPrototypeOf(checklist).call(this));

      _this2.attachShadow({
        mode: 'open'
      });

      _this2.shadowRoot.append(template.content.cloneNode(true));

      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var initalized = false;
      var checkedItems = [];

      window.onload = function init() {
        if (urlParams.has('reset')) {
          localStorage.clear('checkedItems');
          urlParams["delete"]('reset');
          window.location = window.location.href.split("?")[0];
        }

        ;
        var hideRole = urlParams.has('hideRole') ? urlParams.get('hideRole') : "";
        var url = "js/A320_family.json";
        var checklistHtml = "";
        var clConfig = {};

        function getConfig() {
          var response, clConfig;
          return regeneratorRuntime.async(function getConfig$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(fetch(url));

                case 2:
                  response = _context.sent;
                  _context.next = 5;
                  return regeneratorRuntime.awrap(response.json());

                case 5:
                  clConfig = _context.sent;
                  return _context.abrupt("return", clConfig);

                case 7:
                case "end":
                  return _context.stop();
              }
            }
          });
        }

        ;

        function log(clcompleted) {
          return regeneratorRuntime.async(function log$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  //clcompleted = document.querySelector('joeherwig-checklist').shadowRoot.querySelector('#BaroRef').parentElement.querySelectorAll('.item:not(.completed)').length > 0? "stay" : "next checklist";
                  console.log(clcompleted);

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          });
        }

        function buildChecklistFromJson(clConfig) {
          var shadow;
          return regeneratorRuntime.async(function buildChecklistFromJson$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  checklistHtml += "<h1>" + clConfig.aircraft + "</h1>";
                  checklistHtml += "<div class=\"filter\"><div id=\"stdBtn\">setToStandard</div></div>";
                  clConfig.checklists.forEach(function (checklist) {
                    checklistHtml += "\n<div id='" + checklist.name.replace(/[\W_]+/g, '') + "'>\n  <h2>" + checklist.name + "</h2>\n  <div class='" + checklist.name.replace(/[\W_]+/g, '') + "Cl'><p class='triggeredBy'>" + checklist.triggeredBy + "</p>";
                    checklist.items.forEach(function (item) {
                      var roleClass = item.role !== undefined ? " " + item.role : "";
                      checklistHtml += "\n  <div class='item" + roleClass + "' id='" + item.checkpoint.replace(/[\W_]+/g, '').replace(/&/g, '') + "'>\n    <div class='check'>" + item.checkpoint + "</div>\n    <div class='value'>" + item.value + "</div>\n  </div>";
                    });
                    checklistHtml += "\n</div></div>";
                  });
                  checklistHtml += "<div class=\"filter\"><div class=\"resetBtn\"><a href=\"?reset\">reset checklist</a></div></div>";
                  template.innerHTML += "\n\n" + checklistHtml;
                  shadow = document.querySelector('joeherwig-checklist');
                  shadow.shadowRoot.innerHTML = template.innerHTML;

                case 7:
                case "end":
                  return _context3.stop();
              }
            }
          });
        }

        function scrollIfReady(node) {
          var nextChecklist;
          return regeneratorRuntime.async(function scrollIfReady$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  nextChecklist = node.parentElement.parentElement.nextElementSibling;

                  if (node.parentElement.querySelectorAll('.item:not(.completed)').length <= 0) {
                    nextChecklist.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest"
                    });
                  }

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          });
        }

        function addClickEventListener() {
          var shadow, checkedItems;
          return regeneratorRuntime.async(function addClickEventListener$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  shadow = document.querySelector('joeherwig-checklist');
                  checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : [];
                  shadow.shadowRoot.querySelectorAll('.item').forEach(function (checklistItem) {
                    checklistItem.addEventListener("click", function (event) {
                      var newArrayItem = checklistItem.querySelector('.check').textContent.replace(/[\W_]+/g, '').replace(/&/g, '');

                      if (event.currentTarget.classList.contains("completed")) {
                        event.currentTarget.classList.remove("completed");
                        checkedItems = checkedItems.filter(function (item) {
                          return item !== newArrayItem;
                        });
                      } else {
                        event.currentTarget.classList.add("completed");
                        checkedItems.push(newArrayItem);
                        scrollIfReady(event.currentTarget);
                      }

                      localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
                    });
                  });
                  /* --  */

                  shadow.shadowRoot.querySelector('#stdBtn').addEventListener("click", function (event) {
                    updateChecklist(["Gearpinscovers", "Fuelquantity", "Seatbeltsigns", "ADIRS", "BaroRef"]);
                  });
                  /* -- */

                case 4:
                case "end":
                  return _context5.stop();
              }
            }
          });
        }

        function hideRoleInChecklist() {
          var shadow;
          return regeneratorRuntime.async(function hideRoleInChecklist$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  if (hideRole) {
                    shadow = document.querySelector('joeherwig-checklist');
                    shadow.shadowRoot.querySelectorAll('.item.' + hideRole).forEach(function (checklistItem) {
                      checklistItem.classList.add("hidden");
                    });
                  }

                case 1:
                case "end":
                  return _context6.stop();
              }
            }
          });
        }

        function updateChecklist(checkedItems) {
          var checkedItemsLocal, shadow;
          return regeneratorRuntime.async(function updateChecklist$(_context7) {
            while (1) {
              switch (_context7.prev = _context7.next) {
                case 0:
                  console.log(JSON.stringify(checkedItems));
                  checkedItemsLocal = [];

                  if (checkedItems.length > 0) {
                    checkedItems.forEach(function (checkedElement) {
                      checkedItemsLocal.push(checkedElement);
                    });
                    initalized = true;
                  }

                  console.log(checkedItemsLocal);
                  shadow = document.querySelector('joeherwig-checklist');
                  shadow.shadowRoot.querySelectorAll('.item').forEach(function (checklistItem) {
                    if (checkedItems.includes(checklistItem.id)) {
                      checklistItem.classList.add("completed");
                      checkedItems = checkedItems.filter(function (item) {
                        return item !== checklistItem.id;
                      });
                      scrollIfReady(checklistItem);
                    } else {
                      checklistItem.classList.remove("completed");
                      checkedItems.push(checkedItemsLocal);
                    }
                  });
                  localStorage.setItem("checkedItems", JSON.stringify(checkedItemsLocal));

                case 7:
                case "end":
                  return _context7.stop();
              }
            }
          });
        }

        getConfig().then(function (clConfig) {
          buildChecklistFromJson(clConfig);
          addClickEventListener();
          hideRoleInChecklist();
          checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : [];
          updateChecklist(checkedItems);
        });
      };

      return _this2;
    }

    _createClass(checklist, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        var _this = this;

        document._currentScript = document._currentScript || document.currentScript;
      }
    }]);

    return checklist;
  }(_wrapNativeSuper(HTMLElement));

  window.customElements.define('joeherwig-checklist', checklist);
})();