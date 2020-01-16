/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global history */
sap.ui.define([
		"sap/ui/documentation/sdk/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("sap.ui.documentation.sdk.controller.DemoApps", {

			/**
			 * Called when the controller is instantiated.
			 * @public
			 */
			onInit: function () {
				this.getRouter().getRoute("demoapps").attachPatternMatched(this._onMatched, this);
			},

			/**
			 * Handles "demoapps" routing
			 * @function
			 * @private
			 */
			_onMatched: function () {
				try {
					this.hideMasterSide();
				} catch (e) {
					// try-catch due to a bug in UI5 SplitApp, CL 1898264 should fix it
					jQuery.sap.log.error(e);
				}
			}
		});
	}
);