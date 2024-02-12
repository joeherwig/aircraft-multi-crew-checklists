(function() {
  const template = document.createElement('template');
  styles = `
    <style>
      .filter {
        display: flex;
        flex-flow: row-wrap;
        text-align: center;
        justify-content: center;
      }
      .filter a{
        flex: 1 1 auto;
        margin: 1em;
        color: black;
        text-decoration: none;
        word-break: break-all;
        white-space: nowrap;
        padding: .5em;
        border-radius: .25em;
      }
      .intro {
        //display: none;
      }
      .item {
        display: flex;
        padding: 2em 0 1em 5px;
      }
      .item .triggeredBy {
        text-align: right;
      }
      .item .check {
        flex: 3 1 auto;
        overflow: hidden;
        white-space: nowrap;
      }
      .item .check:after {
        font-family: Monospace;
        opacity: 0.25;
        content: " ..........................................................................................................................................";
      }
      .item .value {
        flex: 1 1 auto;
        padding-left: 1em;
        text-align: right;
        word-break: break-all;
        white-space: nowrap;
        text-transform: uppercase;
      }
      .item .value:after {
        padding-left: 5px;
        color: #333333;
        content: "☐";
      }

      .item.completed {
        opacity: 0.5;
        color: #517051;
      }
      .item.completed .value:after {
        text-decoration: none;
        content: "☑";
        color: beige;
      }

      .item.pf {
        border-left: 2px solid #ff00ff75;
      }

      .item.pm {
        border-left: 2px solid #ffff00b0;
      }

      .triggeredBy {
        color: #666666;
        word-break: break-all;
        white-space: nowrap;

      }
      .filter .all a{
        border: 1px solid silver;
        color: silver;
      }
      .filter .pf a{
        background: #ff00ff75;
      }
      .filter .pm a{
        background: #ffff00b0;
      }
      .resetBtn {
        margin-top: 5em;
      }
      .resetBtn a{
        background: #761919;
        color: white;
      }
      .hidden {
        display: none;
      }
      </style>`

    template.innerHTML = styles + `
      <div class="filter">
        <div class="all"><a href="?">BOTH</a></div>
        <div class="pf"><a href="?hideRole=pm">Pilot flying</a></div>     
        <div class="pm"><a href="?hideRole=pf">Pilot monitoring</a></div></div>`;
  class checklist extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let initalized = false;
      window.onload = function init() {
        if (urlParams.has('reset')) { 
          localStorage.clear('checkedItems')
          urlParams.delete('reset');
          window.location = window.location.href.split("?")[0];
        };
        let hideRole = urlParams.has('hideRole') ? urlParams.get('hideRole') : "";
        console.log(hideRole);

        let url = "js/A320_family.json";
        let checklistHtml = "";
        let clConfig = {};

        async function getConfig() {
          const response = await fetch(url);
          const clConfig = await response.json();
          return clConfig;
        };

        getConfig()
        .then(clConfig => {
          checklistHtml += "<h1>"+clConfig.aircraft+"</h1>";
          clConfig.checklists.forEach(checklist => {
            checklistHtml += "\n<div id='"+checklist.name.replace(/\s/g,'')+"'>\n  <h2>"+checklist.name+"</h2>\n  <p class='triggeredBy'>"+checklist.triggeredBy+"</p>";
            checklist.items.forEach(item =>{
              let roleClass = item.role !== undefined ? " " + item.role : "";
              checklistHtml += "\n  <div class='item" + roleClass +"' id='"+item.checkpoint.replace(/\s/g,'').replace(/&/g,'')+"'>\n    <div class='check'>"+item.checkpoint+"</div>\n    <div class='value'>"+item.value+"</div>\n  </div>";
            })
            checklistHtml += "\n</div>"
          });
          checklistHtml += `<div class="filter"><div class="resetBtn"><a href="?reset">reset checklist</a></div></div>`;
          template.innerHTML += "\n\n"+checklistHtml;
          let shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.innerHTML = template.innerHTML;
          shadow.shadowRoot.querySelectorAll('.item').forEach(checklistItem => {
            checklistItem.addEventListener("click", (event) => {
              let newArrayItem = checklistItem.querySelector('.check').textContent.replace(/\s/g,'').replace(/&/g,'');
              if (event.currentTarget.classList.contains("completed")) {
                event.currentTarget.classList.remove("completed")
                checkedItems = checkedItems.filter(item => item !== newArrayItem);
              } else {
                event.currentTarget.classList.add("completed")
                checkedItems.push(newArrayItem);
              }
              localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
            });
          });
          if(hideRole) {
            shadow.shadowRoot.querySelectorAll('.item.' + hideRole).forEach(checklistItem => {
              checklistItem.classList.add("hidden");
            });
          }
          let checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : []; 
          if (!initalized && checkedItems.length > 0) { 
            checkedItems.forEach(checkedElement => {
              const checkedNode = shadow.shadowRoot.querySelector('#'+checkedElement);
              checkedNode.classList.add("completed");
            })
            initalized = true;
          }

        });
      }
    }
    
      connectedCallback() {
        let _this = this;
        document._currentScript = document._currentScript || document.currentScript;
      };
    }

  window.customElements.define('joeherwig-checklist', checklist);
})();
