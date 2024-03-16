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
        flex-wrap: wrap;
      }
      .item span {
        padding-left: 50px;
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
      .pfChecked {
        border-left: 5px solid rgba(69,145,80,1);
      }
      .pmChecked {
        border-right: 5px solid rgba(69,145,80,1);
      }
      </style>`

  class checklist extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      let fetchUrl;
      let initalized = false;
      let checkedItems = [];
      let checklistHtml = "";
      let hideRole = urlParams.has('hideRole') ? urlParams.get('hideRole') : "";
      urlParams.delete('hideRole');
      checklistHtml = styles + `
      <div class="filter">
        <div class="all"><a href="`+window.location.origin + window.location.pathname + '?' + urlParams+`&">BOTH</a></div>
        <div class="pf"><a href="`+window.location.origin + window.location.pathname + '?' + urlParams+`&hideRole=pm">Pilot flying</a></div>     
        <div class="pm"><a href="`+window.location.origin + window.location.pathname + '?' + urlParams+`&hideRole=pf">Pilot monitoring</a></div></div>`;
      let clConfig = {};
      
      window.onload = function init() {
        let _this = this;
        document._currentScript = document._currentScript || document.currentScript;
        
        if (urlParams.has('reset')) { 
          localStorage.clear('checkedItems')
          urlParams.delete('reset');
          const reloadUrl = window.location.origin + window.location.pathname + '?' + urlParams;
          location.href = reloadUrl;
        };
        
        async function getConfig(fetchUrl) {
          switch (true) {
            case urlParams.has('checklistUrl'):
              fetchUrl = urlParams.get('checklistUrl');
              break;
            case (document.querySelector('joeherwig-checklist').getAttribute('checklistUrl') !== null):
              fetchUrl = document.querySelector('joeherwig-checklist').getAttribute('checklistUrl');
              break;
            default:
              fetchUrl = "js/A320_family.json";
              break;
          } 
          const response = await fetch(fetchUrl);
          const clConfig = await response.json();
          return clConfig;
        };

        async function buildChecklistFromJson(clConfig) {
          checklistHtml += "<h1>"+clConfig.aircraft+"</h1>";
          //checklistHtml += `<div class="filter"><div id="stdBtn">setToStandard</div></div>`;
          let clNumber = 1;
          clConfig.checklists.forEach(checklist => {
            checklistHtml += "\n<div id='"+checklist.name.replace(/[\W_]+/g,'')+"'>\n  <h2>"+checklist.name+"</h2>\n  <div class='"+checklist.name.replace(/[\W_]+/g,'')+"Cl'><p class='triggeredBy'>"+checklist.triggeredBy+"</p>";
            let clItemNumber = 1;
            checklist.items.forEach(item =>{
              let roleClass = item.role !== undefined ? " " + item.role : "";
              checklistHtml += "\n  <div class='item" + roleClass +"' id='"+clNumber+'.'+clItemNumber+'_'+checklist.name.replace(/[\W_]+/g,'')+"_"+item.checkpoint.replace(/[\W_]+/g,'')+"'>\n    <div class='check'>"+item.checkpoint+"</div>\n    <div class='value'>"+item.value+"</div>";
              //checklistHtml += item.hint ? "<div class='hint'>"+item.hint.replace(/\n/g,'<br>')+"</div>" : ""
              checklistHtml += "\n  </div>";
              clItemNumber++;
            })
            clNumber++;
            checklistHtml += "\n</div></div>"
          });
          checklistHtml += `<div class="filter"><div class="resetBtn"><a href="`+window.location.origin + window.location.pathname + '?' + urlParams+`&reset">reset checklist</a></div></div>`;
          template.innerHTML += "\n\n"+checklistHtml;
          let shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.innerHTML = template.innerHTML;
        }

        async function scrollIfReady(node){
          let nextChecklist = node.parentElement.parentElement.nextElementSibling;
          if (node.parentElement.querySelectorAll('.item:not(.completed)').length <= 0) {
            nextChecklist.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
          }
        }

        async function addClickEventListener(){
          let shadow = document.querySelector('joeherwig-checklist');
          let checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : []; 
          shadow.shadowRoot.querySelectorAll('.item').forEach(checklistItem => {
            checklistItem.addEventListener("click", (event) => {
              let newArrayItem = checklistItem.querySelector('.check').parentElement.id;
              if (event.currentTarget.classList.contains("completed")) {
                event.currentTarget.classList.remove("completed")
                checkedItems = checkedItems.filter(item => item !== newArrayItem);
              } else {
                event.currentTarget.classList.add("completed")
                checkedItems.push(newArrayItem);
                
                scrollIfReady(event.currentTarget);
              }
              localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
            });
          });


          /* --  */
          shadow.shadowRoot.querySelector('#stdBtn').addEventListener("click", (event) => {
            updateChecklist(["Cockpitpreparation_Gearpinscovers","Cockpitpreparation_Fuelquantity","Cockpitpreparation_Seatbeltsigns","Cockpitpreparation_ADIRS","Cockpitpreparation_BaroRef","BeforeStart_ATC","BeforeStart_TOSpeedsThrust"]);
          })
          /* -- */
        }

        async function hideRoleInChecklist(){
          if(hideRole) {
            let shadow = document.querySelector('joeherwig-checklist');
            shadow.shadowRoot.querySelectorAll('.item.' + hideRole).forEach(checklistItem => {
              checklistItem.classList.add("hidden");
            });
          }
        }

        async function updateChecklist(checkedItems){
          let checkedItemsLocal = [];
          if (checkedItems.length > 0) { 
            checkedItems.forEach(checkedElement => {
              checkedItemsLocal.push(checkedElement);
            })
            initalized = true;
          }
          let shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.querySelectorAll('.item').forEach(checklistItem => {
            if (checkedItems.includes(checklistItem.id)) {
              checklistItem.classList.add("completed")
              checkedItems = checkedItems.filter(item => item !== checklistItem.id);
              scrollIfReady(checklistItem);
            } else {
              checklistItem.classList.remove("completed")
              checkedItems.push(checkedItemsLocal);
            }
          })
          localStorage.setItem("checkedItems", JSON.stringify(checkedItemsLocal));
        }


        getConfig()
        .then(clConfig => {
          buildChecklistFromJson(clConfig);
          addClickEventListener();
          hideRoleInChecklist();
          checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : []; 
          updateChecklist(checkedItems);
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
