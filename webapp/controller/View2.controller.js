// // sap.ui.define([
// //     "sap/ui/core/mvc/Controller",
// //     "sap/ui/core/routing/History"
// // ], function (Controller, History) {
// //     "use strict";

// //     return Controller.extend("finalmrp.finalmrp.controller.View2", {
// //         onNavBack: function () {
// //             var oHistory = History.getInstance();
// //             var sPreviousHash = oHistory.getPreviousHash();

// //             if (sPreviousHash !== undefined) {
// //                 // The browser has a previous history entry, go back naturally
// //                 window.history.go(-1);
// //             } else {
// //                 // No history exists, explicitly route back to the home route
// //                 this.getOwnerComponent().getRouter().navTo("RouteHome", {}, true);
// //             }
// //         }
// //     });
// // });

// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/core/routing/History"
// ], function (Controller, History) {
//     "use strict";

//     return Controller.extend("com.mycompany.salesapp.controller.View2", {
        
//         onInit: function () {
//             var oRouter = this.getOwnerComponent().getRouter();
            
//             // Attach a listener that fires every time this specific route is hit
//             oRouter.getRoute("RouteDetail-screen").attachPatternMatched(this._onRouteMatched, this);
//         },

//         _onRouteMatched: function (oEvent) {
//             // Extract the arguments passed through the URL
//             var oArgs = oEvent.getParameter("arguments");
//             var sIncomingProductId = oArgs.productId;

//             // console.log("Loading details for Product ID: " + sIncomingProductId);
//             console.log("Dynamically loaded view for Style: " + sIncomingStyleId);
            
//             // Production Use Case: You can now use this ID to bind your view data 
//             // e.g., this.getView().bindElement("/Products('" + sIncomingProductId + "')");
//         },

//         onNavBack: function () {
//             var oHistory = History.getInstance();
//             var sPreviousHash = oHistory.getPreviousHash();

//             if (sPreviousHash !== undefined) {
//                 window.history.go(-1);
//             } else {
//                 this.getOwnerComponent().getRouter().navTo("RouteHome", {}, true);
//             }
//         }
//     });
// });

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("finalmrp.finalmrp.controller.View2", {
        
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteDetail-screen").attachPatternMatched(this._onElementMatched, this);
        },

        _onElementMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oView = this.getView();
            var sStyleId = oArgs.styleId.replace(/'/g, "''");
            var sSeason = oArgs.season.replace(/'/g, "''");
            var sContextPath = "/ZC_BINDRA_HDR(StyleId='" + sStyleId + "',Season='" + sSeason + "',IsActiveEntity=" + oArgs.isActiveEntity + ")";

            oView.bindElement({ path: sContextPath });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("RouteView1", {}, true);
            }
        }
    });
});
