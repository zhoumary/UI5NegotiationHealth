/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/unified/CalendarLegend','./library'],function(q,C,a,l){"use strict";var P=a.extend("sap.m.PlanningCalendarLegend",{metadata:{library:"sap.ui.unified",properties:{standardItems:{type:"string[]",group:"Misc",defaultValue:['Today','Selected','WorkingDay','NonWorkingDay']},itemsHeader:{type:"string",group:"Appearance",defaultValue:"Calendar"},appointmentItemsHeader:{type:"string",group:"Appearance",defaultValue:"Appointments"}},aggregations:{appointmentItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"appointmentItem"}}}});P._COLUMN_WIDTH_DEFAULT="auto";P.prototype.init=function(){a.prototype.init.call(this);this.setProperty("columnWidth",P._COLUMN_WIDTH_DEFAULT);this.addStyleClass("sapMPlanCalLegend");};P.prototype.setColumnWidth=function(w){if(w==undefined){w=P._COLUMN_WIDTH_DEFAULT;}return this.setProperty("columnWidth",w);};P.prototype.setStandardItems=function(v){var i;if(v){v=this.validateProperty("standardItems",v);for(i=0;i<v.length;i++){if(!sap.ui.unified.StandardCalendarLegendItem[v[i]]){throw new Error("Invalid value '"+v[i]+"'. Property standardItems must contain values from sap.ui.unified.StandardCalendarLegendItem.");}}}this.setProperty("standardItems",v);a.prototype._addStandardItems.call(this,this.getStandardItems(),true);return this;};return P;},true);
