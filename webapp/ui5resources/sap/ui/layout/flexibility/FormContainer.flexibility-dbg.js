/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global sap */

sap.ui.define([
	"sap/ui/layout/changeHandler/RenameFormContainer"
], function (RenameFormContainer) {
	"use strict";

	return {
		"hideControl": "default",
		"renameGroup": RenameFormContainer,
		"moveControls": "default"

	};
}, /* bExport= */true);
