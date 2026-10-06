sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("finalmrp.finalmrp.controller.View1", {
        onInit() {
            // 1. Create a SECOND model container
            var oCustomerModel = new sap.ui.model.json.JSONModel();

            // 2. Put different data inside it
            oCustomerModel.setData({
                Company: "SAP Labs India",
                Region: "Bangalore"
            });

            // 3. Assign it to the view, but give it a specific NICKNAME: "customer"
            this.getView().setModel(oCustomerModel, "customer");
            var oModel = new JSONModel();
            oModel.setData({
                CurrentUser: "sonu pndey",
                AppStatus: "Active"
            });
            var oCurrentData = oModel.getData();
            console.log(oCurrentData.CustomerName); // "SAP SE"
            this.getView().setModel(oModel);

            // 1. Create a dynamic draft storage box in memory
            var oDraftModel = new JSONModel({
                NewStyleID: "",
                NewSeason: "",
                NewDesc: ""
            });
            this.getView().setModel(oDraftModel, "draft");

        },
        onSaveDraft: function () {
            // 2. Fetch our staging local memory model instance
            var oDraftModel = this.getView().getModel("draft");

            // 3. Extract the current raw text payload tree using getData()
            var oPayload = oDraftModel.getData();

            // 1. Fetch the text resource bundle instance from model memory
            var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

            // 2. Read the text key and inject our style ID parameter into the {0} token placeholder
            var sSuccessMessage = oResourceBundle.getText("msgSaveSuccess", [oPayload.NewStyleID]);

            // 4. Validate that the fields aren't completely blank
            if (!oPayload.NewStyleID || !oPayload.NewSeason) {
                sap.m.MessageToast.show("Error: Please fill in mandatory key fields first.");
                return;
            }

            // 3. Display the translated, formatted message toast smoothly on screen
            sap.m.MessageToast.show("from resources: " + sSuccessMessage);

            // 5. PRODUCTION DIRECTIVE: Send to backend database
            // In a production app connected to an SAP system, you pass this object to your OData model:
            // var oODataModel = this.getView().getModel("myODataService");
            // oODataModel.create("/StyleSet", oPayload, { success: function() {...} });

            // For now, let's verify our extracted payload object structure is pristine:
            console.log("Transmission Payload ready for Database:", oPayload);
            // sap.m.MessageToast.show("Success! Sent payload for " + oPayload.NewStyleID + " to backend server.");

            // 6. Reset form values back to empty blank lines after successful save
            oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
        },
        onButtonPress() {
            MessageToast.show("Button pressed!");
        },
        onClearStyleForm() {
            ["styleIdInput", "seasonInput", "styleColorInput", "descriptionInput", "categoryInput", "brandInput"]
                .forEach((sInputId) => this.byId(sInputId).setValue(""));
        },
        onNavigateToView2() {
            var oSelectedItem = this.byId("stylesTable").getSelectedItem();

            if (oSelectedItem) {
                this._navigateToDetail(oSelectedItem.getBindingContext());
            }
        },
        onRowPress: function (oEvent) {
            this._navigateToDetail(oEvent.getSource().getBindingContext());
        },

        _navigateToDetail: function (oBindingContext) {
            if (!oBindingContext) {
                return;
            }

            this.getOwnerComponent().getRouter().navTo("RouteDetail-screen", {
                styleId: oBindingContext.getProperty("StyleId"),
                season: oBindingContext.getProperty("Season"),
                isActiveEntity: String(oBindingContext.getProperty("IsActiveEntity"))
            });
        },
        // 1. OPEN THE DIALOG FRAGMENT
        onOpenDialog: function () {
            var oView = this.getView();

            // Guard pattern: Ensure we only load the fragment file once from the server
            if (!this._pDialog) {
                this._pDialog = this.loadFragment({
                    name: "finalmrp.finalmrp.view.InfoDialog" // Your Root Namespace + path to file
                }).then(function (oDialog) {
                    // Good practice: Connect the dialog to the view lifecycle (models, routing, etc.)
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            // Once the Promise resolves, open the dialog
            this._pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        // 2. CLOSE THE DIALOG FRAGMENT
        // This is called automatically because the fragment button targets 'onCloseDialog'
        onCloseDialog: function () {
            // Because loadFragment handles unique IDs, we can safely target the ID we set in the XML
            this.byId("myInfoDialog").close();
        }

    });

});