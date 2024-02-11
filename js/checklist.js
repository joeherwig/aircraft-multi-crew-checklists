(function() {
  /**
   * Cloning contents from a &lt;template&gt; element is more performant
   * than using innerHTML because it avoids addtional HTML parse costs.
   */
  const template = document.createElement('template');
  styles = `
    <style>
      .filter {
        display: flex;
        flex-flow: row-wrap;
        text-align: center;
      }
      .filter div {
        flex: 1 1 auto;
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

      .pf {
        border-left: 2px solid #ff00ff75;
      }

      .pm {
        border-left: 2px solid #ffff00b0;
      }

      </style>`

    template.innerHTML = styles + `
      <div class="filter">
        <div class="cpt"><a href="?">ALL</a></div>
        <div class="fo"><a href="?fo">CPT</a></div>     
        <div class="fo"><a href="?cpt">FO</a></div>
        <div class="resetBtn"><a href="?reset">reset</a></div>`;
  class checklist extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hideClass = urlParams.toString().replace("=","");
      let initalized = false;
      window.onload = function init() {
        if (urlParams.has('reset')) { 
          localStorage.clear('checkedItems')
          urlParams.delete('reset');
          window.location = window.location.href.split("?")[0];
        };


        let url = "js/A320_family.json";
        let checklistHtml = "";
        let clConfig = {};

        async function getConfig() {
          const response = await fetch(url);
          const clConfig = await response.json();
          console.log(clConfig);
          return clConfig;
        };

        getConfig()
        .then(clConfig => {
          checklistHtml += "<h1>"+clConfig.aircraft+"</h1>";
          clConfig.checklists.forEach(checklist => {
            checklistHtml += "\n<div id='"+checklist.name.replace(/\s/g,'')+"'>\n  <h2>"+checklist.name+"</h2>\n  <p>Triggered by: "+checklist.triggeredBy+"</p>";
            checklist.items.forEach(item =>{
              let roleClass = item.role !== undefined ? " " + item.role : "";
              console.log(roleClass);
              checklistHtml += "\n  <div class='item" + roleClass +"' id='"+item.checkpoint.replace(/\s/g,'').replace(/&/g,'')+"'>\n    <div class='check'>"+item.checkpoint+"</div>\n    <div class='value'>"+item.value+"</div>\n  </div>";
            })
            checklistHtml += "\n</div>"
          });
          console.log(checklistHtml);
          template.innerHTML += "\n\n"+checklistHtml;
          let shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.innerHTML = template.innerHTML;
          shadow.shadowRoot.querySelectorAll('.item').forEach(checklistItem => {
            checklistItem.addEventListener("click", (event) => {
                //event.currentTarget.classList.contains("completed") ? event.currentTarget.classList.remove("completed") : event.currentTarget.classList.add("completed");
              /**/ 
              /**/
              let newArrayItem = checklistItem.querySelector('.check').textContent.replace(/\s/g,'').replace(/&/g,'');
              console.log(typeof(checkedItems) + ' ' + JSON.stringify(checkedItems)+' gets added : '+newArrayItem);
              if (event.currentTarget.classList.contains("completed")) {
                event.currentTarget.classList.remove("completed")
                checkedItems = checkedItems.filter(item => item !== newArrayItem);
              } else {
                event.currentTarget.classList.add("completed")
                checkedItems.push(newArrayItem);
              }
              localStorage.setItem("checkedItems", JSON.stringify(checkedItems));
            });
            if(hideClass.length) {
              document.querySelectorAll('.'+hideClass).forEach(checklistItem => {
                checklistItem.classList.contains(hideClass) ? checklistItem.classList.remove("hidden") : checklistItem.classList.add("hidden"); 
                checklistItem.classList.add("hidden");
                console.log(checklistItem.classList.contains(hideClass));
              });
            }
          });
          let checkedItems = JSON.parse(localStorage.getItem("checkedItems")) ? JSON.parse(localStorage.getItem("checkedItems")) : []; 
          if (!initalized && checkedItems.length > 0) { 
            checkedItems.forEach(checkedElement => {
              console.log(checkedElement);
              const checkedNode = shadow.shadowRoot.querySelector('#'+checkedElement);
              console.log(shadow.shadowRoot.querySelector('#'+checkedElement));
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
