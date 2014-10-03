/*
 * EllipticText 1.0.0
 *
 * Display <li> elements along an elliptic curve
 *
 * MIT licensed
 *
 * Copyright (C) 2014 Yuki Yamashina
 */

(function($) {
  	$.fn.ellipticText = function(options) {
    		// Create some defaults, extending them with any options that were provided
    		opts = $.extend({
            'ellipse'     : true,  // ellitic function if true, hyperbolic function if false
            'trsvDiameter': 500,   // transverse diameter a
            'cnjgDiameter': 100,   // transverse diameter b
            'proportion'  : 1.0,   // proportion of text area in vertical direction to 2 * b
            'units'       : 'px',  // units for margin-left
            'marginLR'    : 'left' // margin-left or margin-right
    		}, options);

        var elements = this;

        // Get the total # of <li> in <ul class=".arc-text">
        var numberOfList = 0;
        elements.find('li').each(function() {
            ++numberOfList;
        });

        var count = 0, xPosition, yPosition;
        elements.find('li').each(function() {
            ++count;
            /*
             * The eliptic/hyperbolic equation is given by
             *     x^2/a^2 +/- y^2/b^2 = 1,
             * and can be written as
             *     x = a * sqrt (1 -/+ y^2/b^2)
             */
            yPosition = - opts.cnjgDiameter * opts.proportion + 2 * opts.cnjgDiameter * opts.proportion / ( numberOfList + 1 ) * count;

            if ( opts.ellipse ) {
                xPosition = opts.trsvDiameter * Math.sqrt( 1 - Math.pow(yPosition,2) / Math.pow(opts.cnjgDiameter,2) );          
            } else {
                xPosition = opts.trsvDiameter * Math.sqrt( 1 + Math.pow(yPosition,2) / Math.pow(opts.cnjgDiameter,2) );          
            }            
            $('ul.'+ elements.attr('class') +' > li:nth-of-type('+count+')').css('margin-left',xPosition + opts.units);
        });
    };
}) (jQuery);

(function($) {
  	$.fn.parabolicText = function(options) {
    		// Create some defaults, extending them with any options that were provided
    		opts = $.extend({
            'ellipse'     : false,  // ellitic function if true, hyperbolic function if false
            'trsvDiameter':  30,    // transverse diameter a
            'cnjgDiameter':  10,    // transverse diameter b
            'proportion'  : 1.0,    // proportion of text area in vertical direction to 2 * b
            'units'       : '%',   // units for margin-left
            'marginLR'    : 'right' // margin-left or margin-right
    		}, options);

        var elements = this;

        // Get the total # of <li> in <ul class=".arc-text">
        var numberOfList = 0;
        elements.find('dt').each(function() {
            ++numberOfList;
        });

        var count = 0, xPosition, yPosition;
        elements.find('dt').each(function() {
            ++count;
            /*
             * The eliptic/hyperbolic equation is given by
             *     x^2/a^2 +/- y^2/b^2 = 1,
             * and can be written as
             *     x = a * sqrt (1 -/+ y^2/b^2)
             */
            yPosition = - opts.cnjgDiameter * opts.proportion + 2 * opts.cnjgDiameter * opts.proportion / ( numberOfList + 1 ) * count;

            if ( opts.ellipse ) {
                xPosition = opts.trsvDiameter * Math.sqrt( 1 - Math.pow(yPosition,2) / Math.pow(opts.cnjgDiameter,2) );          
            } else {
                xPosition = opts.trsvDiameter * Math.sqrt( 1 + Math.pow(yPosition,2) / Math.pow(opts.cnjgDiameter,2) );          
            }            
            $('dl.'+ elements.attr('class') +' > dt:nth-of-type('+count+')').css('padding-right',xPosition + opts.units);
            $('dl.'+ elements.attr('class') +' > dd:nth-of-type('+count+')').css('margin-left',xPosition + opts.units);
        });
    };
}) (jQuery);