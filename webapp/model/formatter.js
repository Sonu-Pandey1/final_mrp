sap.ui.define([], function () {
    "use strict";

    return {
        /**
         * Transforms short technical backend status codes into clean display text
         * @param {string} sStatus Raw status code from the database
         * @returns {string} Human-readable descriptive text
         */
        statusText: function (sStatus) {
            if (!sStatus) {
                return "Unknown Status";
            }

            switch (sStatus.toUpperCase()) {
                case "OPEN":
                    return "New / Staging";
                case "APPROVED":
                    return "Released for Production";
                case "CLOSED":
                    return "Archived / Completed";
                default:
                    return sStatus; // Fallback to raw text if no match
            }
        }
    };
});
