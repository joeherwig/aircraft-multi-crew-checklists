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
    </div>
    <div id="checklistContainer"></div>
    <slot>to make use of this checklist element, just add child elements of classes either '.item.check' andr '.item.value' within this tag.</slot></div>`;
  class checklist extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(template.content.cloneNode(true));
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const hideClass = urlParams.toString().replace("=","");
      
      window.onload = function init() {


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
              checklistHtml += "\n  <div class='item" + roleClass +"'>\n    <div class='check'>"+item.checkpoint+"</div>\n    <div class='value'>"+item.value+"</div>\n  </div>";
            })
            checklistHtml += "\n</div>"
          });
          template.innerHTML += "\n\n"+checklistHtml;
          let shadow = document.querySelector('joeherwig-checklist');
          shadow.shadowRoot.innerHTML = template.innerHTML;
          
          shadow.shadowRoot.querySelectorAll('.item').forEach(checklistItem => {
            console.log(checklistItem);
            checklistItem.addEventListener("click", (event) => {
              event.currentTarget.classList.contains("completed") ? event.currentTarget.classList.remove("completed") : event.currentTarget.classList.add("completed"); 
            });
            if(hideClass.length) {
              document.querySelectorAll('.'+hideClass).forEach(checklistItem => {
                checklistItem.classList.contains(hideClass) ? checklistItem.classList.remove("hidden") : checklistItem.classList.add("hidden"); 
                checklistItem.classList.add("hidden");
                console.log(checklistItem.classList.contains(hideClass));
              });
            }
          });
        });
      }
    }
    
      /**
       * `connectedCallback()` fires when the element is inserted into the DOM.
       * It's a good place to set the initial `role`, `tabindex`, internal state,
       * and install event listeners.
       */
      connectedCallback() {
        let _this = this;
        document._currentScript = document._currentScript || document.currentScript;
      };
    }

  window.customElements.define('joeherwig-checklist', checklist);
})();
