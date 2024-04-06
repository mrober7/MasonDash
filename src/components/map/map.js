// import html from user.html to display custom data in using innerHTML
import template from "./map.hbs";
// import user scss file to style and display the username on the dashboard
import "./map.scss";

import { buildingsData } from "./buildings";

const map = {
    init() {
        this.element = document.querySelector(".item.map");

        this._renderLayout();
        this._loadBuildings();
        this._bindListeners();
    },

    _renderLayout() {
        // generate the HTML using the Handlebars template with main as true
        let mainHtml = template({
            main: true,
        });

        // set the inner HTML of the selected element to the generated HTML
        this.element.querySelector(".item-body").innerHTML = mainHtml;
        this.mapImage = this.element.querySelector(".map-image img");
        this.mapView = this.element.querySelector(".map-view img");
        this.mapHighlight = this.element.querySelector(".map-image .map-highlight")
    },

    _loadBuildings() {
        let selectControl = this.element.querySelector(".item-controls select");
        selectControl.insertAdjacentHTML(
            "beforeend",
            `<option value=''>View Building</option>`
        );
        buildingsData.forEach((building) => {
            let buildingId = building.id;
            let name = building.name;
            selectControl.insertAdjacentHTML(
                "beforeend",
                `<option value='${buildingId}'>${name}</option>`
            );
        });
    },

    _bindListeners() {
        // select all elements with the class 'header-link' in the layout
        let selectControl = this.element.querySelector(".item-controls select");

        selectControl.addEventListener("change", (e) => {
            let selectedIndex = selectControl.selectedIndex;
            let buildingId = selectControl.options[selectedIndex].value;
            if (!buildingId) {
                this.mapImage.style.top = '-290px';
                this.mapImage.style.left = '-80px';
                this.mapImage.style.scale = '0.9';
                this.mapView.setAttribute('src', '');
                return;
            }

            let building = buildingsData.filter((row) => {
                return row.id === buildingId;
            })[0];
            this.mapImage.style.top = building.y + 'px';
            this.mapImage.style.left = building.x + 'px';
            this.mapImage.style.scale = building.scale;
            this.mapView.setAttribute('src', `./images/${buildingId}.jpeg`);
        });
    },
};
// export user object to make it available for other modules to use
export default map;
