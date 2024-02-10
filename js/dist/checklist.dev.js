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
  /**
   * Cloning contents from a &lt;template&gt; element is more performant
   * than using innerHTML because it avoids addtional HTML parse costs.
   */
  var template = document.createElement('template');
  styles = "\n    <style>\n      .filter {\n        display: flex;\n        flex-flow: row-wrap;\n        text-align: center;\n      }\n      .filter div {\n        flex: 1 1 auto;\n      }\n\n      \n    .intro {\n      //display: none;\n    }\n    .item {\n      display: flex;\n      padding: 2em 0 1em 5px;\n    }\n    .item .triggeredBy {\n      text-align: right;\n    }\n    .item .check {\n      flex: 3 1 auto;\n      overflow: hidden;\n      white-space: nowrap;\n    }\n    .item .check:after {\n      font-family: Monospace;\n      opacity: 0.25;\n      content: \" ..........................................................................................................................................\";\n    }\n    .item .value {\n      flex: 1 1 auto;\n      padding-left: 1em;\n      text-align: right;\n    }\n    .item .value:after {\n      padding-left: 5px;\n      color: #333333;\n      content: \"\u2610\";\n    }\n\n    .item.completed {\n      opacity: 0.5;\n      color: #517051;\n    }\n    .item.completed .value:after {\n      text-decoration: none;\n      content: \"\u2611\";\n      color: beige;\n    }\n\n    .pf {\n      border-left: 2px solid #ff00ff75;\n    }\n\n    .pm {\n      border-left: 2px solid #ffff00b0;\n    }\n\n    </style>";
  template.innerHTML = styles + "\n    <div class=\"filter\">\n      <div class=\"cpt\"><a href=\"?\">ALL</a></div>\n      <div class=\"fo\"><a href=\"?fo\">CPT</a></div>     \n      <div class=\"fo\"><a href=\"?cpt\">FO</a></div>\n    </div>\n    <div id=\"checklistContainer\"></div>\n    <slot>to make use of this checklist element, just add child elements of classes either '.item.check' andr '.item.value' within this tag.</slot></div>";

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
      var hideClass = urlParams.toString().replace("=", "");

      window.onload = function init() {
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
                  console.log(clConfig);
                  return _context.abrupt("return", clConfig);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          });
        }

        ;
        getConfig().then(function (clConfig) {
          checklistHtml += "<h1>" + clConfig.aircraft + "</h1>";
          clConfig.checklists.forEach(function (checklist) {
            checklistHtml += "\n<div id='" + checklist.name.replace(/\s/g, '') + "'>\n  <h2>" + checklist.name + "</h2>\n  <p>Triggered by: " + checklist.triggeredBy + "</p>";
            checklist.items.forEach(function (item) {
              var roleClass = item.role !== undefined ? " " + item.role : "";
              checklistHtml += "\n  <div class='item" + roleClass + "'>\n    <div class='check'>" + item.checkpoint + "</div>\n    <div class='value'>" + item.value + "</div>\n  </div>";
            });
            checklistHtml += "\n</div>";
          });
          template.innerHTML += "\n\n" + checklistHtml;
          var shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.innerHTML = template.innerHTML;
          shadow.shadowRoot.querySelectorAll('.item').forEach(function (checklistItem) {
            console.log(checklistItem);
            checklistItem.addEventListener("click", function (event) {
              event.currentTarget.classList.contains("completed") ? event.currentTarget.classList.remove("completed") : event.currentTarget.classList.add("completed");
            });

            if (hideClass.length) {
              document.querySelectorAll('.' + hideClass).forEach(function (checklistItem) {
                checklistItem.classList.contains(hideClass) ? checklistItem.classList.remove("hidden") : checklistItem.classList.add("hidden");
                checklistItem.classList.add("hidden");
                console.log(checklistItem.classList.contains(hideClass));
              });
            }
          });
        });
      };

      return _this2;
    }
    /**
     * `connectedCallback()` fires when the element is inserted into the DOM.
     * It's a good place to set the initial `role`, `tabindex`, internal state,
     * and install event listeners.
     */


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