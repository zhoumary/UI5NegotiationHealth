/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global Promise*/
sap.ui.define(['jquery.sap.global'], function (jQuery) {
	"use strict";

	var oCodeCache = {};
	return function (sUrl) {
		return new Promise(function (fnResolve) {
			var fnSuccess = function (result) {
				oCodeCache[sUrl] = result;
				fnResolve(result);
			};
			var fnError = function () {
				fnResolve({errorMessage: "File not found: '" + sUrl + "'"});
			};

			if (!(sUrl in oCodeCache)) {
				jQuery.ajax({
					url: sUrl,
					type: "GET",
					dataType: "text",
					beforeSend: function(request) {
						request.overrideMimeType("text/plain; charset=x-user-defined");
					}
				}).done(fnSuccess).fail(fnError);
			} else {
				fnResolve(oCodeCache[sUrl]);
			}
		});
	};
});
