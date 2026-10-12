// // // sap.ui.define([
// // //     "sap/ui/core/mvc/Controller",
// // //     "sap/m/MessageToast",
// // //     "sap/ui/model/json/JSONModel"
// // // ], (Controller, MessageToast, JSONModel) => {
// // //     "use strict";

// // //     return Controller.extend("finalmrp.finalmrp.controller.View1", {
// // //         onInit() {
// // //             // 1. Create a SECOND model container
// // //             var oCustomerModel = new sap.ui.model.json.JSONModel();

// // //             // 2. Put different data inside it
// // //             oCustomerModel.setData({
// // //                 Company: "SAP Labs India",
// // //                 Region: "Bangalore"
// // //             });

// // //             // 3. Assign it to the view, but give it a specific NICKNAME: "customer"
// // //             this.getView().setModel(oCustomerModel, "customer");
// // //             var oModel = new JSONModel();
// // //             oModel.setData({
// // //                 CurrentUser: "sonu pndey",
// // //                 AppStatus: "Active"
// // //             });
// // //             var oCurrentData = oModel.getData();
// // //             console.log(oCurrentData.CustomerName); // "SAP SE"
// // //             this.getView().setModel(oModel, "local");

// // //             // 1. Create a dynamic draft storage box in memory
// // //             var oDraftModel = new JSONModel({
// // //                 NewStyleID: "",
// // //                 NewSeason: "",
// // //                 NewDesc: ""
// // //             });
// // //             this.getView().setModel(oDraftModel, "draft");

// // //         },
// // //         // onSaveDraft: function () {
// // //         //     // 2. Fetch our staging local memory model instance
// // //         //     var oDraftModel = this.getView().getModel("draft");

// // //         //     // 3. Extract the current raw text payload tree using getData()
// // //         //     var oPayload = oDraftModel.getData();

// // //         //     // 1. Fetch the text resource bundle instance from model memory
// // //         //     var oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

// // //         //     // 2. Read the text key and inject our style ID parameter into the {0} token placeholder
// // //         //     var sSuccessMessage = oResourceBundle.getText("msgSaveSuccess", [oPayload.NewStyleID]);

// // //         //     // 4. Validate that the fields aren't completely blank
// // //         //     if (!oPayload.NewStyleID || !oPayload.NewSeason) {
// // //         //         sap.m.MessageToast.show("Error: Please fill in mandatory key fields first.");
// // //         //         return;
// // //         //     }

// // //         //     // 3. Display the translated, formatted message toast smoothly on screen
// // //         //     sap.m.MessageToast.show("from resources: " + sSuccessMessage);

// // //         //     // 5. PRODUCTION DIRECTIVE: Send to backend database
// // //         //     // In a production app connected to an SAP system, you pass this object to your OData model:
// // //         //     // var oODataModel = this.getView().getModel("myODataService");
// // //         //     // oODataModel.create("/StyleSet", oPayload, { success: function() {...} });

// // //         //     // For now, let's verify our extracted payload object structure is pristine:
// // //         //     console.log("Transmission Payload ready for Database:", oPayload);
// // //         //     // sap.m.MessageToast.show("Success! Sent payload for " + oPayload.NewStyleID + " to backend server.");

// // //         //     // 6. Reset form values back to empty blank lines after successful save
// // //         //     oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
// // //         // },
// // //         onButtonPress() {
// // //             MessageToast.show("Button pressed!");
// // //         },
// // //         onSaveDraft: function () {
// // //             // 1. Fetch values from your screen's local draft model
// // //             var oDraftModel = this.getView().getModel("draft");
// // //             var oPayload = oDraftModel.getData();

// // //             // 2. Fetch your live default OData V4 Model
// // //             var oODataModel = this.getView().getModel();

// // //             // 3. Bind directly to your backend table entity path
// // //             var oListBinding = oODataModel.bindList("/ZC_BINDRA_HDR");

// // //             // 4. Send the payload! Properties on the left MUST match your SAP backend keys exactly
// // //             var oNewContext = oListBinding.create({
// // //                 "StyleId": oPayload.NewStyleID,
// // //                 "Season": oPayload.NewSeason,
// // //                 "ProductDescription": oPayload.NewDesc,
// // //                 "Category": "KURTA", // Optional placeholder default
// // //                 "Status": "OPEN"     // Optional placeholder default
// // //             });

// // //             // 5. Success/Failure confirmation handling
// // //             oNewContext.created().then(function () {
// // //                 sap.m.MessageToast.show("Record saved permanently to SAP Database!");
// // //             }, function (oError) {
// // //                 sap.m.MessageBox.error("Database Insertion Failed: " + oError.message);
// // //             });

// // //             // 6. Clear your layout form input fields
// // //             oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
// // //         }
// // //         ,
// // //         onUpdateRecord: function () {
// // //             var oODataModel = this.getView().getModel();

// // //             // Transmit all modified input field values safely to the server
// // //             oODataModel.submitBatch("$auto").then(function () {
// // //                 sap.m.MessageToast.show("Database record updated successfully!");
// // //             }, function (oError) {
// // //                 sap.m.MessageBox.error("Update failed: " + oError.message);
// // //             });
// // //         },
// // //         onDeleteRecord: function () {
// // //             // 1. Get the table instance and extract the currently highlighted row item
// // //             var oTable = this.byId("stylesTable");
// // //             var oSelectedItem = oTable.getSelectedItem();

// // //             if (!oSelectedItem) {
// // //                 sap.m.MessageToast.show("Please select a table row first to delete it.");
// // //                 return;
// // //             }

// // //             // 2. Extract the backend entity binding context from that row
// // //             var oBindingContext = oSelectedItem.getBindingContext();

// // //             // 3. Direct execution of the destructive database call
// // //             oBindingContext.delete().then(function () {
// // //                 sap.m.MessageToast.show("Record deleted permanently from database.");
// // //             }, function (oError) {
// // //                 sap.m.MessageBox.error("Deletion rejected by database: " + oError.message);
// // //             });
// // //         }
// // //         ,
// // //         onClearStyleForm() {
// // //             ["styleIdInput", "seasonInput", "styleColorInput", "descriptionInput", "categoryInput", "brandInput"]
// // //                 .forEach((sInputId) => this.byId(sInputId).setValue(""));
// // //         },
// // //         onNavigateToView2() {
// // //             var oSelectedItem = this.byId("stylesTable").getSelectedItem();

// // //             if (oSelectedItem) {
// // //                 this._navigateToDetail(oSelectedItem.getBindingContext());
// // //             }
// // //         },
// // //         onRowPress: function (oEvent) {
// // //             this._navigateToDetail(oEvent.getSource().getBindingContext());
// // //         },

// // //         _navigateToDetail: function (oBindingContext) {
// // //             if (!oBindingContext) {
// // //                 return;
// // //             }

// // //             this.getOwnerComponent().getRouter().navTo("RouteDetail-screen", {
// // //                 styleId: oBindingContext.getProperty("StyleId"),
// // //                 season: oBindingContext.getProperty("Season"),
// // //                 isActiveEntity: String(oBindingContext.getProperty("IsActiveEntity"))
// // //             });
// // //         },
// // //         // 1. OPEN THE DIALOG FRAGMENT
// // //         onOpenDialog: function () {
// // //             var oView = this.getView();

// // //             // Guard pattern: Ensure we only load the fragment file once from the server
// // //             if (!this._pDialog) {
// // //                 this._pDialog = this.loadFragment({
// // //                     name: "finalmrp.finalmrp.view.InfoDialog" // Your Root Namespace + path to file
// // //                 }).then(function (oDialog) {
// // //                     // Good practice: Connect the dialog to the view lifecycle (models, routing, etc.)
// // //                     oView.addDependent(oDialog);
// // //                     return oDialog;
// // //                 });
// // //             }

// // //             // Once the Promise resolves, open the dialog
// // //             this._pDialog.then(function (oDialog) {
// // //                 oDialog.open();
// // //             });
// // //         },

// // //         // 2. CLOSE THE DIALOG FRAGMENT
// // //         // This is called automatically because the fragment button targets 'onCloseDialog'
// // //         onCloseDialog: function () {
// // //             // Because loadFragment handles unique IDs, we can safely target the ID we set in the XML
// // //             this.byId("myInfoDialog").close();
// // //         }

// // //     });

// // // });

// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller",
// //     "sap/m/MessageToast",
// //     "sap/ui/model/json/JSONModel",
// //     "sap/m/MessageBox"
// // ], (Controller, MessageToast, JSONModel, MessageBox) => {
// //     "use strict";

// //     return Controller.extend("finalmrp.finalmrp.controller.View1", {

// //         onInit() {
// //             // ==========================================
// //             // 1. NAMED JSON MODEL: Customer Data
// //             // ==========================================
// //             var oCustomerModel = new JSONModel();
// //             oCustomerModel.setData({
// //                 Company: "SAP Labs India",
// //                 Region: "Bangalore"
// //             });
// //             // Assigning with a specific NICKNAME: "customer"
// //             this.getView().setModel(oCustomerModel, "customer");

// //             // ==========================================
// //             // 2. NAMED JSON MODEL: Local App State
// //             // ==========================================
// //             var oModel = new JSONModel();
// //             oModel.setData({
// //                 CurrentUser: "sonu pndey",
// //                 AppStatus: "Active"
// //             });

// //             // Note: oCurrentData.CustomerName was undefined because it wasn't defined above, 
// //             // but left intact for your learning practice!
// //             var oCurrentData = oModel.getData();
// //             console.log("Checking optional property:", oCurrentData.CustomerName); // undefined (expected)

// //             // Assigning with nickname: "local"
// //             this.getView().setModel(oModel, "local");

// //             // ==========================================
// //             // 3. NAMED JSON MODEL: Draft Form Storage
// //             // ==========================================
// //             var oDraftModel = new JSONModel({
// //                 NewStyleID: "",
// //                 NewSeason: "",
// //                 NewDesc: ""
// //             });
// //             this.getView().setModel(oDraftModel, "draft");
// //         },

// //         // ==========================================
// //         // DRAFT FORM CREATION (CREATE OPERATION - OData V4)
// //         // ==========================================
// //         // ==========================================
// //         // DRAFT FORM CREATION (OData V4 with Draft Handling)
// //         // ==========================================
// //         // onSaveDraft: function () {
// //         //     var that = this;

// //         //     // 1. Fetch values from your screen's local draft model
// //         //     var oDraftModel = this.getView().getModel("draft");
// //         //     var oPayload = oDraftModel.getData();

// //         //     // Client-side validation
// //         //     if (!oPayload.NewStyleID || !oPayload.NewSeason) {
// //         //         sap.m.MessageToast.show("Error: Please fill in mandatory key fields first.");
// //         //         return;
// //         //     }

// //         //     // 2. Fetch your live default OData V4 Model
// //         //     var oODataModel = this.getView().getModel();

// //         //     // 3. Bind directly to your backend table entity path list
// //         //     var oListBinding = oODataModel.bindList("/ZC_BINDRA_HDR");

// //         //     // 4. Send the payload to create the draft record in backend draft tables
// //         //     var oNewContext = oListBinding.create({
// //         //         "StyleId": oPayload.NewStyleID,
// //         //         "Season": oPayload.NewSeason,
// //         //         "ProductDescription": oPayload.NewDesc,
// //         //         "Category": "KURTA", 
// //         //         "Status": "OPEN"     
// //         //     });

// //         //     // 5. Success confirmation handling for Draft creation
// //         //     oNewContext.created().then(function () {
// //         //         sap.m.MessageToast.show("Draft record created successfully! It is now saved as a draft.");

// //         //         // Refresh the table so the new draft record appears in the table list
// //         //         that.byId("stylesTable").getBinding("items").refresh();

// //         //     }, function (oError) {
// //         //         sap.m.MessageBox.error("Draft Creation Failed: " + oError.message);
// //         //     });

// //         //     // 6. Clear your layout form input fields and draft model
// //         //     oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
// //         // },

// //         // ==========================================
// //         // UPDATE RECORD OPERATION (OData V4)
// //         // ==========================================
// //         //     onUpdateRecord: function () {
// //         //         var oODataModel = this.getView().getModel();

// //         //         // OData V4 auto-tracks changes via two-way binding. 
// //         //         // submitBatch("$auto" or default group) sends pending modifications to the backend.
// //         //         oODataModel.submitBatch("$auto").then(function () {
// //         //             MessageToast.show("Database record updated successfully!");
// //         //         }, function (oError) {
// //         //             MessageBox.error("Update failed: " + oError.message);
// //         //         });
// //         //     },

// //         //     // ==========================================
// //         //     // DELETE RECORD OPERATION (OData V4)
// //         //     // ==========================================
// //         //    // ==========================================
// //         //     // DELETE RECORD OPERATION (OData V4 with RAP Draft Support)
// //         //     // ==========================================
// //         //     onDeleteRecord: function () {
// //         //         // 1. Get the table instance and extract the currently highlighted row item
// //         //         var oTable = this.byId("stylesTable");
// //         //         var oSelectedItem = oTable.getSelectedItem();

// //         //         if (!oSelectedItem) {
// //         //             MessageToast.show("Please select a table row first to delete it.");
// //         //             return;
// //         //         }

// //         //         // 2. Extract the backend entity binding context from that row
// //         //         var oBindingContext = oSelectedItem.getBindingContext();

// //         //         // 3. Check if the selected row is a Draft instance
// //         //         var bIsActiveEntity = oBindingContext.getProperty("IsActiveEntity");

// //         //         // SAP RAP restriction: Draft records cannot be deleted using standard delete.
// //         //         if (bIsActiveEntity === false || bIsActiveEntity === "false") {
// //         //             sap.m.MessageBox.error("Deletion blocked: This is a Draft instance. Drafts cannot be deleted directly—use a Discard action instead.");
// //         //             return;
// //         //         }

// //         //         // 4. Direct execution of the destructive database call for Active records
// //         //         oBindingContext.delete().then(function () {
// //         //             MessageToast.show("Active record deleted permanently from database.");
// //         //         }, function (oError) {
// //         //             sap.m.MessageBox.error("Deletion rejected by database: " + oError.message);
// //         //         });
// //         //     },
// //         // ==========================================
// //         // 1. CREATE DRAFT & IMMEDIATELY ACTIVATE (SAVE TO DB)
// //         // ==========================================
// //         onSaveDraft: function () {
// //             var that = this;

// //             // Fetch values from local draft model
// //             var oDraftModel = this.getView().getModel("draft");
// //             var oPayload = oDraftModel.getData();

// //             if (!oPayload.NewStyleID || !oPayload.NewSeason) {
// //                 sap.m.MessageToast.show("Error: Please fill in mandatory key fields first.");
// //                 return;
// //             }

// //             var oODataModel = this.getView().getModel();
// //             var oListBinding = oODataModel.bindList("/ZC_BINDRA_HDR");

// //             // Step A: Create the draft record in the backend draft tables
// //             var oNewContext = oListBinding.create({
// //                 "StyleId": oPayload.NewStyleID,
// //                 "Season": oPayload.NewSeason,
// //                 "ProductDescription": oPayload.NewDesc,
// //                 "Category": "KURTA",
// //                 "Status": "OPEN"
// //             });

// //             // Step B: Wait for the draft instance to initialize, then invoke Activation
// //             oNewContext.created().then(function () {

// //                 // In SAP RAP OData V4, we bind and execute the standard entity action "activation" 
// //                 // or "DraftActivate" depending on the service definition. 
// //                 // The safest generic OData V4 bound action call for RAP draft activation:
// //                 var sPath = oNewContext.getPath() + "/com.sap.gateway.default.ivbep.v1.0001.draftActivate(...)";

// //                 // Alternatively, if your service metadata uses standard names, 
// //                 // you can invoke execute on a context binding:
// //                 var oActionBinding = oODataModel.bindContext("DraftActivate(...)", oNewContext);

// //                 oActionBinding.execute().then(function () {
// //                     sap.m.MessageToast.show("Success! Record activated and saved permanently to the database.");

// //                     // Refresh table to show the new active record
// //                     that.byId("stylesTable").getBinding("items").refresh();

// //                 }, function (oActionError) {
// //                     // Fallback try with standard action path if method naming differs
// //                     that._fallbackActivate(oNewContext, oODataModel, that);
// //                 });

// //             }, function (oCreateError) {
// //                 sap.m.MessageBox.error("Draft Creation Failed: " + oCreateError.message);
// //             });

// //             // Clear input form fields
// //             oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
// //         },

// //         // Helper fallback for activation naming variances in SAP RAP OData V4 services
// //         _fallbackActivate: function (oContext, oModel, that) {
// //             var oAction = oModel.bindContext("activation(...)", oContext);
// //             oAction.execute().then(function () {
// //                 sap.m.MessageToast.show("Record successfully activated via fallback method!");
// //                 that.byId("stylesTable").getBinding("items").refresh();
// //             }.bind(that)).catch(function (err) {
// //                 sap.m.MessageBox.error("Activation failed completely: " + err.message);
// //             });
// //         },

// //         // ==========================================
// //         // 2. DELETE RECORD OPERATION (Now works because it's Active!)
// //         // ==========================================
// //         onDeleteRecord: function () {
// //             var oTable = this.byId("stylesTable");
// //             var oSelectedItem = oTable.getSelectedItem();

// //             if (!oSelectedItem) {
// //                 sap.m.MessageToast.show("Please select a table row first to delete it.");
// //                 return;
// //             }

// //             var oBindingContext = oSelectedItem.getBindingContext();

// //             // Verify if it's active before deleting
// //             var bIsActiveEntity = oBindingContext.getProperty("IsActiveEntity");
// //             if (bIsActiveEntity === false || bIsActiveEntity === "false") {
// //                 sap.m.MessageBox.error("Cannot delete a draft. Please activate it first or discard it.");
// //                 return;
// //             }

// //             // Standard OData V4 delete execution on the Active record
// //             oBindingContext.delete().then(function () {
// //                 sap.m.MessageToast.show("Active record deleted permanently from database.");
// //             }, function (oError) {
// //                 sap.m.MessageBox.error("Deletion rejected by database: " + oError.message);
// //             });
// //         },

// //         // ==========================================
// //         // TABLE ROW SELECTION (Binds selected row to update VBox)
// //         // ==========================================
// //         onTableSelectionChange: function (oEvent) {
// //             var oSelectedItem = oEvent.getParameter("listItem");
// //             if (oSelectedItem) {
// //                 var oContext = oSelectedItem.getBindingContext();
// //                 // Bind the selected row context to the update VBox so {ProductDescription} works correctly
// //                 this.byId("updateBox").setBindingContext(oContext);
// //             }
// //         },

// //         // ==========================================
// //         // CLEAR FORM UTILITY (Fixed to match XML IDs & Draft Model)
// //         // ==========================================
// //         onClearStyleForm() {
// //             // Clear input fields safely if they exist
// //             ["newStyleIdInput", "seasonClassificationInput", "styleDescriptionInput"]
// //                 .forEach((sInputId) => {
// //                     var oInput = this.byId(sInputId);
// //                     if (oInput) {
// //                         oInput.setValue("");
// //                     }
// //                 });

// //             // Also reset the draft JSON model data
// //             var oDraftModel = this.getView().getModel("draft");
// //             if (oDraftModel) {
// //                 oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
// //             }
// //             MessageToast.show("Form cleared.");
// //         },

// //         onButtonPress() {
// //             MessageToast.show("Button pressed!");
// //         },

// //         onNavigateToView2() {
// //             var oSelectedItem = this.byId("stylesTable").getSelectedItem();
// //             if (oSelectedItem) {
// //                 this._navigateToDetail(oSelectedItem.getBindingContext());
// //             } else {
// //                 MessageToast.show("Please select a row to navigate.");
// //             }
// //         },

// //         onRowPress: function (oEvent) {
// //             this._navigateToDetail(oEvent.getSource().getBindingContext());
// //         },

// //         _navigateToDetail: function (oBindingContext) {
// //             if (!oBindingContext) {
// //                 return;
// //             }

// //             this.getOwnerComponent().getRouter().navTo("RouteDetail-screen", {
// //                 styleId: oBindingContext.getProperty("StyleId"),
// //                 season: oBindingContext.getProperty("Season"),
// //                 isActiveEntity: String(oBindingContext.getProperty("IsActiveEntity"))
// //             });
// //         },

// //         // ==========================================
// //         // DIALOG MANAGEMENT FRAGMENT
// //         // ==========================================
// //         onOpenDialog: function () {
// //             var oView = this.getView();

// //             if (!this._pDialog) {
// //                 this._pDialog = this.loadFragment({
// //                     name: "finalmrp.finalmrp.view.InfoDialog"
// //                 }).then(function (oDialog) {
// //                     oView.addDependent(oDialog);
// //                     return oDialog;
// //                 });
// //             }

// //             this._pDialog.then(function (oDialog) {
// //                 oDialog.open();
// //             });
// //         },

// //         onCloseDialog: function () {
// //             this.byId("myInfoDialog").close();
// //         }

// //     });
// // });

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/m/MessageToast",
//     "sap/ui/model/json/JSONModel",
//     "sap/m/MessageBox"
// ], (Controller, MessageToast, JSONModel, MessageBox) => {
//     "use strict";

//     return Controller.extend("finalmrp.finalmrp.controller.View1", {

//         onInit() {
//             // 1. NAMED JSON MODEL: Customer Data
//             var oCustomerModel = new JSONModel({
//                 Company: "SAP Labs India",
//                 Region: "Bangalore"
//             });
//             this.getView().setModel(oCustomerModel, "customer");

//             // 2. NAMED JSON MODEL: Local App State
//             var oModel = new JSONModel({
//                 CurrentUser: "sonu pndey",
//                 AppStatus: "Active"
//             });
//             this.getView().setModel(oModel, "local");

//             // 3. NAMED JSON MODEL: Draft Form Storage
//             var oDraftModel = new JSONModel({
//                 NewStyleID: "",
//                 NewSeason: "",
//                 NewDesc: ""
//             });
//             this.getView().setModel(oDraftModel, "draft");
//         },

//         // =========================================================================
//         // 📥 1. CREATE DRAFT & AUTOMATICALLY ACTIVATE NATIVELY (OData V4 RAP Mode)
//         // =========================================================================
//         onSaveDraft: function () {
//             var that = this;
//             var oDraftModel = this.getView().getModel("draft");
//             var oPayload = oDraftModel.getData();

//             if (!oPayload.NewStyleID || !oPayload.NewSeason) {
//                 MessageToast.show("Error: Please fill in mandatory key fields first.");
//                 return;
//             }

//             var oODataModel = this.getView().getModel();

//             // Note: OData V4 with RAP requires an explicit binding parameter configuration map 
//             // to support seamlessly executing a draft creation statement.
//             var oListBinding = oODataModel.bindList("/ZC_BINDRA_HDR", null, null, null, {
//                 $$updateGroupId: "mySaveGroup"
//             });

//             // Step A: Initialize the record inside the framework tracking context loop
//             var oNewContext = oListBinding.create({
//                 "StyleId": oPayload.NewStyleID,
//                 "Season": oPayload.NewSeason,
//                 "ProductDescription": oPayload.NewDesc,
//                 "Category": "KURTA",
//                 "Status": "OPEN"
//             });

//             // Step B: Submit the Batch change request so the draft record is created on the server
//             oODataModel.submitBatch("mySaveGroup").then(function () {

//                 // Step C: Execute Native OData V4 Operation Activation
//                 // In standard RAP definitions, the OData V4 framework provides a native operation 
//                 // execution method called 'execute' directly bound to the backend context instance definition mapping.
//                 // We fetch the internal operation bound context:
//                 var oOperation = oODataModel.bindContext("com.sap.gateway.default.ivbep.v1.0001.draftActivate(...)", oNewContext);

//                 // If your service structure metadata features custom named actions, you can use:
//                 // var oOperation = oODataModel.bindContext("Activation(...)", oNewContext);

//                 oOperation.execute().then(function () {
//                     MessageToast.show("Success! Record activated and saved permanently to the database.");
//                     that.byId("stylesTable").getBinding("items").refresh();
//                 }, function (oActionError) {
//                     // Fallback Option: If your RAP service is set to auto-save, the draft might already be live.
//                     // Let's attempt a normal batch update request sequence:
//                     oODataModel.submitBatch("$auto").then(function () {
//                         MessageToast.show("Record saved successfully to the backend!");
//                         that.byId("stylesTable").getBinding("items").refresh();
//                     }).catch(function (oErr) {
//                         MessageBox.error("Activation failed completely: " + oActionError.message);
//                     });
//                 });

//             }, function (oCreateError) {
//                 MessageBox.error("Draft Creation Failed: " + oCreateError.message);
//             });

//             // Clear input form fields
//             oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
//         },

//         // =========================================================================
//         // 🔄 2. UPDATE RECORD OPERATION (OData V4 Auto-Tracking)
//         // =========================================================================
//         onUpdateRecord: function () {
//             var oODataModel = this.getView().getModel();

//             oODataModel.submitBatch("$auto").then(function () {
//                 MessageToast.show("Database record updated successfully!");
//             }, function (oError) {
//                 MessageBox.error("Update failed: " + oError.message);
//             });
//         },

//         // =========================================================================
//         // ❌ 3. FIXED DELETE RECORD OPERATION (Handles both Drafts and Active rows)
//         // =========================================================================
//         // onDeleteRecord: function () {
//         //     var oTable = this.byId("stylesTable");
//         //     var oSelectedItem = oTable.getSelectedItem();

//         //     if (!oSelectedItem) {
//         //         MessageToast.show("Please select a table row first to delete it.");
//         //         return;
//         //     }

//         //     var oBindingContext = oSelectedItem.getBindingContext();
//         //     var bIsActiveEntity = oBindingContext.getProperty("IsActiveEntity");

//         //     // Build dynamic text messages depending on whether it's an active database item or a current draft
//         //     var sPromptText = (bIsActiveEntity === false || bIsActiveEntity === "false") 
//         //         ? "This is an un-saved Draft instance. Would you like to completely discard it?" 
//         //         : "Are you sure you want to permanently delete this active record from the database?";

//         //     MessageBox.confirm(sPromptText, {
//         //         onClose: function (sAction) {
//         //             if (sAction === MessageBox.Action.OK) {

//         //                 // 🧠 THE BIG FIX: 
//         //                 // In standard OData V4 with RAP, you call oBindingContext.delete() for BOTH.
//         //                 // If IsActiveEntity is false, the UI5 V4 model translates this request 
//         //                 // into an HTTP DELETE directed at the draft entity lifecycle instance, 
//         //                 // which acts as the exact "Discard" command you were looking for!
//         //                 oBindingContext.delete().then(function () {
//         //                     var sSuccessMsg = (bIsActiveEntity === false || bIsActiveEntity === "false")
//         //                         ? "Draft instance successfully discarded and removed."
//         //                         : "Active record deleted permanently from database.";
//         //                     MessageToast.show(sSuccessMsg);
//         //                 }, function (oError) {
//         //                     MessageBox.error("Server execution failed: " + oError.message);
//         //                 });

//         //             }
//         //         }
//         //     });
//         // },
//         onDeleteRecord: function () {
//             var that = this;
//             var oTable = this.byId("stylesTable");
//             var oSelectedItem = oTable.getSelectedItem();

//             if (!oSelectedItem) {
//                 MessageToast.show("Please select a table row first to delete it.");
//                 return;
//             }

//             var oBindingContext = oSelectedItem.getBindingContext();
//             var oODataModel = this.getView().getModel();

//             // Read the RAP technical flag to check if it's an active database row or a draft
//             var bIsActiveEntity = oBindingContext.getProperty("IsActiveEntity");

//             // Configure appropriate user message prompts
//             var sPromptText = (bIsActiveEntity === false || bIsActiveEntity === "false")
//                 ? "This is an un-saved Draft instance. Would you like to discard it?"
//                 : "Are you sure you want to permanently delete this active record?";

//             MessageBox.confirm(sPromptText, {
//                 onClose: function (sAction) {
//                     if (sAction === MessageBox.Action.OK) {

//                         if (bIsActiveEntity === false || bIsActiveEntity === "false") {
//                             // 🚀 CASE A: DRAFT INSTANCE (Requires Bound Discard Action Execution)
//                             // In SAP RAP OData V4, the standard action name is simply "Discard(...)"
//                             var oDiscardOperation = oODataModel.bindContext("Discard(...)", oBindingContext);

//                             oDiscardOperation.execute().then(function () {
//                                 MessageToast.show("Draft successfully discarded.");
//                                 // Refresh the table binding to remove the row from the list view
//                                 that.byId("stylesTable").getBinding("items").refresh();
//                             }, function (oError) {
//                                 // Fallback: If your specific RAP definition uses lower-case or custom naming
//                                 that._fallbackDiscard(oBindingContext, oODataModel, that);
//                             });

//                         } else {
//                             // 💾 CASE B: ACTIVE INSTANCE (Standard HTTP DELETE Allowed)
//                             oBindingContext.delete().then(function () {
//                                 MessageToast.show("Active record deleted permanently from database.");
//                             }, function (oError) {
//                                 MessageBox.error("Deletion failed: " + oError.message);
//                             });
//                         }

//                     }
//                 }
//             });
//         },

//         // Helper fallback utility to catch naming variations for Discard in RAP metadata
//         _fallbackDiscard: function (oContext, oModel, that) {
//             var oAction = oModel.bindContext("draftDiscard(...)", oContext);
//             oAction.execute().then(function () {
//                 MessageToast.show("Draft discarded via fallback configuration!");
//                 that.byId("stylesTable").getBinding("items").refresh();
//             }).catch(function (err) {
//                 MessageBox.error("Discard action failed completely: " + err.message);
//             });
//         },


//         // ==========================================
//         // UI UTILITIES & EVENT HANDLERS
//         // ==========================================
//         onTableSelectionChange: function (oEvent) {
//             var oSelectedItem = oEvent.getParameter("listItem");
//             if (oSelectedItem) {
//                 var oContext = oSelectedItem.getBindingContext();
//                 this.byId("updateBox").setBindingContext(oContext);
//             }
//         },

//         onClearStyleForm() {
//             ["newStyleIdInput", "seasonClassificationInput", "styleDescriptionInput"]
//                 .forEach((sInputId) => {
//                     var oInput = this.byId(sInputId);
//                     if (oInput) { oInput.setValue(""); }
//                 });

//             var oDraftModel = this.getView().getModel("draft");
//             if (oDraftModel) {
//                 oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
//             }
//             MessageToast.show("Form cleared.");
//         },

//         onButtonPress() {
//             MessageToast.show("Button pressed!");
//         },

//         onNavigateToView2() {
//             var oSelectedItem = this.byId("stylesTable").getSelectedItem();
//             if (oSelectedItem) {
//                 this._navigateToDetail(oSelectedItem.getBindingContext());
//             } else {
//                 MessageToast.show("Please select a row to navigate.");
//             }
//         },

//         onRowPress: function (oEvent) {
//             this._navigateToDetail(oEvent.getSource().getBindingContext());
//         },

//         _navigateToDetail: function (oBindingContext) {
//             if (!oBindingContext) { return; }

//             this.getOwnerComponent().getRouter().navTo("RouteDetail-screen", {
//                 styleId: oBindingContext.getProperty("StyleId"),
//                 season: oBindingContext.getProperty("Season"),
//                 isActiveEntity: String(oBindingContext.getProperty("IsActiveEntity"))
//             });
//         },

//         onOpenDialog: function () {
//             var oView = this.getView();
//             if (!this._pDialog) {
//                 this._pDialog = this.loadFragment({
//                     name: "finalmrp.finalmrp.view.InfoDialog"
//                 }).then(function (oDialog) {
//                     oView.addDependent(oDialog);
//                     return oDialog;
//                 });
//             }
//             this._pDialog.then(function (oDialog) { oDialog.open(); });
//         },

//         onCloseDialog: function () {
//             this.byId("myInfoDialog").close();
//         }

//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",          // 1. Import Filter class
    "sap/ui/model/FilterOperator",  // 2. Import FilterOperator enum
    "sap/ui/model/Sorter"           // 3. Import Sorter class
], (Controller, MessageToast, JSONModel, MessageBox, Filter, FilterOperator, Sorter) => {
    "use strict";

    // Namespace of your RAP service (taken from $metadata)
    var NS = "com.sap.gateway.srvd.zsd_bindra_sp.v0001";

    return Controller.extend("finalmrp.finalmrp.controller.View1", {

        onInit() {
            this.getView().setModel(new JSONModel({
                Company: "SAP Labs India",
                Region: "Bangalore"
            }), "customer");

            this.getView().setModel(new JSONModel({
                CurrentUser: "sonu pndey",
                AppStatus: "Active"
            }), "local");

            this.getView().setModel(new JSONModel({
                NewStyleID: "",
                NewSeason: "",
                NewDesc: ""
            }), "draft");

            // holds the description of the selected row for the update box
            this.getView().setModel(new JSONModel({
                Description: ""
            }), "edit");
        },
        // =========================================================================
        // 🔍 LIVE SEARCH ACTION (FILTERING OPERATION)
        // =========================================================================
        onSearchStyles: function (oEvent) {
            // A. Get the user-entered string value out of the search field event payload
            var sQuery = oEvent.getParameter("query");
            var aFilters = [];

            if (sQuery && sQuery.length > 0) {
                // B. Instantiate a Filter object
                // Look for records where 'ProductDescription' Contains your typed query string
                var oSearchFilter = new Filter("ProductDescription", FilterOperator.Contains, sQuery);
                aFilters.push(oSearchFilter);
            }

            // C. Retrieve the Table container control from the view layout viewport
            var oTable = this.byId("stylesTable");

            // D. Query the aggregation list binding object managing the rows
            var oItemsBinding = oTable.getBinding("items");

            // E. Pass the array with the Filter object to trigger a server-side request
            oItemsBinding.filter(aFilters);

            MessageToast.show("Applying search filter query parameters...");
        },

        // =========================================================================
        // 📊 TOGGLE SORT ALGORITHM (SORTING OPERATION)
        // =========================================================================
        onSortStyles: function () {
            // A. Toggle state management: store sorting direction flag on our local model
            var oLocalModel = this.getView().getModel("local");
            var bCurrentOrder = oLocalModel.getProperty("/SortDescending") || false;

            // Reverse the Boolean flag (true becomes false, false becomes true)
            var bNewOrder = !bCurrentOrder;
            oLocalModel.setProperty("/SortDescending", bNewOrder);

            // B. Instantiate a Sorter object targeting the 'Season' database property
            // The second parameter specifies true for descending order, false for ascending order
            var oSeasonSorter = new Sorter("Season", bNewOrder);
            var aSorters = [oSeasonSorter];

            // C. Extract our aggregation items list binding interface object context reference
            var oTable = this.byId("stylesTable");
            var oItemsBinding = oTable.getBinding("items");

            // D. Fire the sort reordering execution straight to the model layer proxy
            oItemsBinding.sort(aSorters);

            var sDirectionMsg = bNewOrder ? "Descending" : "Ascending";
            MessageToast.show("Table successfully re-ordered by Season: " + sDirectionMsg);
        },
        // ============================================================
        // CREATE: creates a draft on the server, then activates it
        // ============================================================
        // onSaveDraft: function () {
        //     var that = this;
        //     var oDraftModel = this.getView().getModel("draft");
        //     var oPayload = oDraftModel.getData();

        //     if (!oPayload.NewStyleID || !oPayload.NewSeason) {
        //         MessageToast.show("Please fill Style ID and Season.");
        //         return;
        //     }

        //     var oModel = this.getView().getModel();
        //     // separate list binding, so the table filter does not interfere
        //     var oListBinding = oModel.bindList("/ZC_BINDRA_HDR");

        //     var oCtx = oListBinding.create({
        //         StyleId: oPayload.NewStyleID,
        //         Season: oPayload.NewSeason,
        //         ProductDescription: oPayload.NewDesc,
        //         Category: "KURTA",
        //         Status: "OPEN"
        //     });

        //     oCtx.created().then(function () {
        //         // draft exists on the server -> activate it
        //         return oModel.bindContext(NS + ".Activate(...)", oCtx, { $$inheritExpandSelect: true }).execute();
        //     }).then(function () {
        //         MessageToast.show("Record saved and activated.");
        //         that.byId("stylesTable").getBinding("items").refresh();
        //     }).catch(function (oError) {
        //         MessageBox.error(oError.message);
        //     });

        //     oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
        // },

        // // ============================================================
        // // UPDATE: Edit (creates draft copy) -> change -> Activate
        // // ============================================================
        // onUpdateRecord: function () {
        //     var that = this;
        //     var oItem = this.byId("stylesTable").getSelectedItem();

        //     if (!oItem) {
        //         MessageToast.show("Please select a row first.");
        //         return;
        //     }

        //     var sNewDesc = this.getView().getModel("edit").getProperty("/Description");
        //     var oModel = this.getView().getModel();
        //     var oActiveCtx = oItem.getBindingContext();

        //     if (oActiveCtx.getProperty("IsActiveEntity") === false) {
        //         MessageToast.show("This row is a draft. Discard it or create the record again.");
        //         return;
        //     }

        //     var oEdit = oModel.bindContext(NS + ".Edit(...)", oActiveCtx, { $$inheritExpandSelect: true });
        //     oEdit.setParameter("PreserveChanges", true);

        //     oEdit.execute().then(function () {
        //         var oDraftCtx = oEdit.getBoundContext();   // the new draft copy
        //         return oDraftCtx.setProperty("ProductDescription", sNewDesc).then(function () {
        //             return oModel.bindContext(NS + ".Activate(...)", oDraftCtx, { $$inheritExpandSelect: true }).execute();
        //         });
        //     }).then(function () {
        //         MessageToast.show("Record updated.");
        //         that.byId("stylesTable").getBinding("items").refresh();
        //     }).catch(function (oError) {
        //         MessageBox.error(oError.message);
        //     });
        // },

        // ============================================================
        // CREATE: create draft -> set description -> Activate
        // ============================================================
        onSaveDraft: function () {
            var that = this;
            var oDraftModel = this.getView().getModel("draft");
            var oPayload = oDraftModel.getData();

            if (!oPayload.NewStyleID || !oPayload.NewSeason) {
                MessageToast.show("Please fill Style ID and Season.");
                return;
            }

            var oModel = this.getView().getModel();
            var oListBinding = oModel.bindList("/ZC_BINDRA_HDR");

            var sStyleId = oPayload.NewStyleID;
            var sSeason = oPayload.NewSeason;
            var sDesc = oPayload.NewDesc;

            var sDraftPath = "/ZC_BINDRA_HDR(StyleId='" + sStyleId.replace(/'/g, "''") +
                "',Season='" + sSeason.replace(/'/g, "''") + "',IsActiveEntity=false)";

            var oCtx = oListBinding.create({
                StyleId: sStyleId,
                Season: sSeason,
                ProductDescription: sDesc,
                Category: "KURTA",
                Status: "OPEN"
            });

            var oDraftCtx;

            oCtx.created().then(function () {
                // open the new draft again as a fresh context (reads the real server values)
                var oDraftBinding = oModel.bindContext(sDraftPath);
                return oDraftBinding.requestObject().then(function () {
                    oDraftCtx = oDraftBinding.getBoundContext();
                });
            }).then(function () {
                // PATCH the fields that the server dropped during create
                return Promise.all([
                    oDraftCtx.setProperty("ProductDescription", sDesc),
                    oDraftCtx.setProperty("Category", "KURTA"),
                    oDraftCtx.setProperty("Status", "OPEN")
                ]);
            }).then(function () {
                return oModel.bindContext(NS + ".Activate(...)", oDraftCtx).execute();
            }).then(function () {
                MessageToast.show("Record saved and activated.");
                that.byId("stylesTable").getBinding("items").refresh();
            }).catch(function (oError) {
                MessageBox.error(oError.message);
            });

            oDraftModel.setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
        },

        // ============================================================
        // UPDATE: Edit -> change draft (by key) -> Activate
        // ============================================================
        onUpdateRecord: function () {
            var that = this;
            var oItem = this.byId("stylesTable").getSelectedItem();

            if (!oItem) {
                MessageToast.show("Please select a row first.");
                return;
            }

            var sNewDesc = this.getView().getModel("edit").getProperty("/Description");
            var oModel = this.getView().getModel();
            var oActiveCtx = oItem.getBindingContext();

            if (oActiveCtx.getProperty("IsActiveEntity") === false) {
                MessageToast.show("This row is a draft. Discard it first.");
                return;
            }

            var sStyleId = oActiveCtx.getProperty("StyleId").replace(/'/g, "''");
            var sSeason = oActiveCtx.getProperty("Season").replace(/'/g, "''");
            var sDraftPath = "/ZC_BINDRA_HDR(StyleId='" + sStyleId + "',Season='" + sSeason + "',IsActiveEntity=false)";

            var oEdit = oModel.bindContext(NS + ".Edit(...)", oActiveCtx);
            oEdit.setParameter("PreserveChanges", true);

            var oDraftCtx;

            oEdit.execute().then(function () {
                // normal context on the draft row, addressed by its key
                var oDraftBinding = oModel.bindContext(sDraftPath);
                return oDraftBinding.requestObject().then(function () {
                    oDraftCtx = oDraftBinding.getBoundContext();
                    return oDraftCtx.requestProperty("ProductDescription");
                });
            }).then(function () {
                return oDraftCtx.setProperty("ProductDescription", sNewDesc);
            }).then(function () {
                return oModel.bindContext(NS + ".Activate(...)", oDraftCtx).execute();
            }).then(function () {
                MessageToast.show("Record updated.");
                that.byId("stylesTable").getBinding("items").refresh();
            }).catch(function (oError) {
                MessageBox.error(oError.message);
            });
        },

        // ============================================================
        // DELETE: Discard for drafts, normal DELETE for active rows
        // ============================================================
        onDeleteRecord: function () {
            var that = this;
            var oItem = this.byId("stylesTable").getSelectedItem();

            if (!oItem) {
                MessageToast.show("Please select a row first.");
                return;
            }

            var oCtx = oItem.getBindingContext();
            var oModel = this.getView().getModel();
            var bActive = oCtx.getProperty("IsActiveEntity");

            MessageBox.confirm(bActive ? "Delete this record permanently?" : "Discard this draft?", {
                onClose: function (sAction) {
                    if (sAction !== MessageBox.Action.OK) {
                        return;
                    }

                    if (bActive === false) {
                        oModel.bindContext(NS + ".Discard(...)", oCtx).execute()
                            .then(function () {
                                MessageToast.show("Draft discarded.");
                                that.byId("stylesTable").getBinding("items").refresh();
                            })
                            .catch(function (oError) {
                                MessageBox.error(oError.message);
                            });
                    } else {
                        oCtx.delete().then(function () {
                            MessageToast.show("Record deleted.");
                        }).catch(function (oError) {
                            MessageBox.error(oError.message);
                        });
                    }
                }
            });
        },

        // ============================================================
        // TABLE SELECTION: fills the update box
        // ============================================================
        onTableSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            if (oItem) {
                var oCtx = oItem.getBindingContext();
                this.getView().getModel("edit").setProperty("/Description", oCtx.getProperty("ProductDescription"));
                this.byId("updateBox").setVisible(true);
            }
        },

        // ============================================================
        // UTILITIES
        // ============================================================
        onClearStyleForm() {
            this.getView().getModel("draft").setData({ NewStyleID: "", NewSeason: "", NewDesc: "" });
            MessageToast.show("Form cleared.");
        },

        onNavigateToView2() {
            var oItem = this.byId("stylesTable").getSelectedItem();
            if (oItem) {
                this._navigateToDetail(oItem.getBindingContext());
            } else {
                MessageToast.show("Please select a row to navigate.");
            }
        },

        onRowPress: function (oEvent) {
            this._navigateToDetail(oEvent.getSource().getBindingContext());
        },

        _navigateToDetail: function (oBindingContext) {
            if (!oBindingContext) { return; }

            this.getOwnerComponent().getRouter().navTo("RouteDetail-screen", {
                styleId: oBindingContext.getProperty("StyleId"),
                season: oBindingContext.getProperty("Season"),
                isActiveEntity: String(oBindingContext.getProperty("IsActiveEntity"))
            });
        },

        onOpenDialog: function () {
            var oView = this.getView();
            if (!this._pDialog) {
                this._pDialog = this.loadFragment({
                    name: "finalmrp.finalmrp.view.InfoDialog"
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }
            this._pDialog.then(function (oDialog) { oDialog.open(); });
        },

        onCloseDialog: function () {
            this.byId("myInfoDialog").close();
        }
    });
});