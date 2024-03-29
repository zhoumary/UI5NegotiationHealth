/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.demokit.HexagonButton.
sap.ui.define(['sap/ui/core/Control', './library'],
	function(Control, library) {
	"use strict";


	/**
	 * Constructor for a new HexagonButton.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * A custom button with a 'hexagon' shape
	 * @extends sap.ui.core.Control
	 * @version 1.50.5
	 *
	 * @constructor
	 * @private
	 * @sap-restricted sdk
	 * @alias sap.ui.demokit.HexagonButton
	 */
	var HexagonButton = Control.extend("sap.ui.demokit.HexagonButton", /** @lends sap.ui.demokit.HexagonButton.prototype */ { metadata : {

		library : "sap.ui.demokit",
		properties : {

			/**
			 * Icon to display
			 */
			icon : {type : "string", group : "Misc", defaultValue : null},

			/**
			 * The color of the hexagon
			 */
			color : {type : "string", group : "Misc", defaultValue : 'blue'},

			/**
			 * The position. If set, the button is rendered with an absolute position.
			 */
			position : {type : "string", group : "Misc", defaultValue : null},

			/**
			 * Whether the button is enabled or not.
			 */
			enabled : {type : "boolean", group : "Misc", defaultValue : true},

			/**
			 * The position of the contained image. If not set the image is rendered with a fixed relative position.
			 */
			imagePosition : {type : "string", group : "Misc", defaultValue : null}
		},
		events : {

			/**
			 * Fired when the user clicks the hex button
			 */
			press : {}
		}
	}});

	/**
	 * Function is called when hexagon is clicked.
	 *
	 * @param oBrowserEvent the forwarded sap.ui.core.BrowserEvent
	 * @private
	 */
	HexagonButton.prototype.onclick = function(oBrowserEvent) {
		// TODO check for the hexagon
		if ( this.getEnabled() ) {
			this.firePress({id:this.getId()});
		}
		oBrowserEvent.preventDefault();
		oBrowserEvent.stopPropagation();
	};

	// intercept attach/detachPress to be able to rerender (renderer behaves differently for purely "decorative" buttons)
	HexagonButton.prototype._attachPress = HexagonButton.prototype.attachPress;
	HexagonButton.prototype.attachPress = function() {
		this._attachPress.apply(this, arguments);
		this.invalidate();
	};

	HexagonButton.prototype._detachPress = HexagonButton.prototype.detachPress;
	HexagonButton.prototype.detachPress = function() {
		this._detachPress.apply(this, arguments);
		this.invalidate();
	};

	return HexagonButton;

});
