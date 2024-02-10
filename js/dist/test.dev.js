"use strict";

url = "js/A320_family.json";
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
      roleClass = item.role !== undefined ? " " + item.role : "";
      checklistHtml += "\n  <div class='item" + roleClass + "'>\n    <div class='check'>" + item.checkpoint + "</div>\n    <div class='value'>" + item.value + "</div>\n  </div>";
    });
    checklistHtml += "\n</div>";
  });
  console.log(checklistHtml);
});