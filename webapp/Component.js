sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "MGitNegoHealth/model/models"

], function(UIComponent, Device, JSONModel, ODataModel, models) {
    "use strict";

    return UIComponent.extend("MGitNegoHealth.Component", {

        metadata: {
            manifest: "json"
        },

        /**
         * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
         * @public
         * @override
         */
        init: function() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            this.getRouter().initialize();

            // set Negotiation Health OData Model
            let oModel = new ODataModel({
                serviceUrl: "http://localhost:8081/https://my344548.crm.ondemand.com/sap/c4c/odata/cust/v1/ibso_odata_api_cn/",
                user : "ext.fiona.zhou@vcimentos.com",
                password : "Zyw323799",
                serviceUrlParams : {
                    format : "json"
                }
            });
            oModel.read("/NegotiationHealthConfigCollection", {
                success: (oData) => {
                    let negoHealthData = oData.results;

                    let allCategories = new JSONModel();
                    allCategories.setData({modelData: negoHealthData});
                },
                error: (oError) => {

                }
            });
        }
    });
});