sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox"
], function(Controller, JSONModel, ODataModel, Filter, FilterOperator, MessageBox) {
    "use strict";

    return Controller.extend("MGitNegoHealth.controller.NegotiationHealth", {
        onInit: function(){
            let oView = this.getView();
            let oViewModel = new JSONModel({
                sul: 0,
                se: 0,
                cn: 0,
                ne: 0,
                countAll: 0,
                formVisible: false,
                negoData : []
            });
            oView.setModel(oViewModel, "negoView");

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

            let metadata = this.getOwnerComponent().getModel("negotiations");

            metadata.read("/NegotiationHealthConfigCollection", {
                success: (oData) => {
                    let negoHealthData = oData.results;
                    if (negoHealthData) {
                        oView.getModel("negoView").setProperty("/negoData", negoHealthData);
                    }
                },
                error: (oError) => {

                }
            });
        }
    });
});