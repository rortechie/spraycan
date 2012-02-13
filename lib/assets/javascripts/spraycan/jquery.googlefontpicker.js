/***
@title:
Google Font Picker

@version:
1.0

@author:
Tinus Guichelaar

@date:
2011-01-09

@url:
http://www.visualmedia.nl/html5/fontpicker/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2011 VisualMedia BV (visualmedia.nl)

@requires:
jquery, jquery.googlefontpicker.js, index.htm, googlefontpicker.css

@does:
This plugin provides a selector for all Google Fonts.

@exampleJS:
$('#fontselector').googleFontPicker({ 
	defaultFont: 'Allan',	
	callbackFunc: changeFont
});

***/

(function( $ ){
jQuery.fn.googleFontPicker = function(settings) {

var fonts = new Array(
'Allan,Allan',
'Allerta,Allerta',
'Allerta Stencil,Allerta Stencil',
'Anonymous Pro,Anonymous Pro',
'Arimo,Arimo',
'Arvo,Arvo',
'Bentham,Bentham',
'Buda,Buda',
'Cabin,Cabin',
'Calligraffitti,Calligraffitti',
'Cantarell,Cantarell',
'Cardo,Cardo',
'Cherry Cream Soda,Cherry Cream Soda',
'Chewy,Chewy',
'Coda,Coda',
'Coming Soon,Coming Soon',
'Copse,Copse',
'Corben,Corben',
'Cousine,Cousine',
'Covered By Your Grace,Covered By Your Grace',
'Crafty Girls,Crafty Girls',
'Crimson Text,Crimson Text',
'Crushed,Crushed',
'Cuprum,Cuprum',
'Droid Sans,Droid Sans',
'Droid Sans Mono,Droid Sans Mono',
'Droid Serif,Droid Serif',
'Fontdiner Swanky,Fontdiner Swanky',
'GFS Didot,GFS Didot',
'GFS Neohellenic,GFS Neohellenic',
'Geo,Geo',
'Gruppo,Gruppo',
'Hanuman,Hanuman',
'Homemade Apple,Homemade Apple',
'IM Fell DW Pica,IM Fell DW Pica',
'IM Fell DW Pica SC,IM Fell DW Pica SC',
'IM Fell Double Pica,IM Fell Double Pica',
'IM Fell Double Pica SC,IM Fell Double Pica SC',
'IM Fell English,IM Fell English',
'IM Fell English SC,IM Fell English SC',
'IM Fell French Canon,IM Fell French Canon',
'IM Fell French Canon SC,IM Fell French Canon SC',
'IM Fell Great Primer,IM Fell Great Primer',
'IM Fell Great Primer SC,IM Fell Great Primer SC',
'Inconsolata,Inconsolata',
'Irish Growler,Irish Growler',
'Josefin Sans,Josefin Sans',
'Josefin Slab,Josefin Slab',
'Just Another Hand,Just Another Hand',
'Just Me Again Down Here,Just Me Again Down Here',
'Kenia,Kenia',
'Kranky,Kranky',
'Kristi,Kristi',
'Lato,Lato',
'Lekton,Lekton',
'Lobster,Lobster',
'Luckiest Guy,Luckiest Guy',
'Merriweather,Merriweather',
'Molengo,Molengo',
'Mountains of Christmas,Mountains of Christmas',
'Neucha,Neucha',
'Neuton,Neuton',
'Nobile,Nobile',
'OFL Sorts Mill Goudy TT,OFL Sorts Mill Goudy TT',
'Old Standard TT,Old Standard TT',
'Orbitron,Orbitron',
'PT Sans,PT Sans',
'PT Sans Caption,PT Sans Caption',
'PT Sans Narrow,PT Sans Narrow',
'Permanent Marker,Permanent Marker',
'Philosopher,Philosopher',
'Puritan,Puritan',
'Raleway,Raleway',
'Reenie Beanie,Reenie Beanie',
'Rock Salt,Rock Salt',
'Schoolbell,Schoolbell',
'Slackey,Slackey',
'Sniglet,Sniglet',
'Sunshiney,Sunshiney',
'Syncopate,Syncopate',
'Tangerine,Tangerine',
'Tinos,Tinos',
'Ubuntu,Ubuntu',
'UnifrakturCook,UnifrakturCook',
'UnifrakturMaguntia,UnifrakturMaguntia',
'Unkempt,Unkempt',
'Vibur,Vibur',
'Vollkorn,Vollkorn',
'Walter Turncoat,Walter Turncoat',
'Yanone Kaffeesatz,Yanone Kaffeesatz'
);

return this.each(function() {

		var config = $.extend({
		    defaultFont: 'Tahoma',              // default font to display in selector
			id:			 'fontbox'+this.id,		// id of font picker container
			selid:		 this.id,				// id of font selector field
			fontclass:   'font'+this.id,		// class for the font divs
			speed:		 100					// speed of dialog animation, default is fast
		}, settings);

		var fontPicker = $('#' + config.id);		

		if (!fontPicker.length) {
			fontPicker = $('<div id="'+config.id+'" class="fontbox" ><div class="scrollbox"><div class="viewport"><ul></ul></div></div></div>').insertAfter($(this)).hide();

			$(document.body).click(function(event) {									
					if ($(event.target).is('#'+config.selid) || $(event.target).is('#'+config.id)) return;					
					fontPicker.slideUp(config.speed);
					fontPicker.removeClass('active')
			});
		}

		$(this).click(function () {
			if (fontPicker.is(':hidden'))
			{
				fontPicker.css({
					position: 'absolute'
				});
				fontPicker.slideDown(config.speed, function(){
					fontPicker.find('.viewport').jScrollPane();
					fontPicker.addClass('active')
				});				

			}
			else
				fontPicker.slideUp(config.speed);		
		});
		
		if (config.defaultFont.length)
		{
		   $(this).css('fontFamily', config.defaultFont);
		   $(this).text(config.defaultFont);
		}

		$.each(fonts, function(i, item) {			
			fontPicker.find('ul').append('<li><a class="'+config.fontclass+'" style="font-family: '+item+';" value="' + item + '"> ' + item.split(',')[0] + '</a></li>');
		});
		
		$('.'+config.fontclass).click(function() {				
		  $('#'+config.selid).text($(this).text());
		  var fontFamily = ($(this).attr('value'));		  
		  $('#'+config.selid).css('fontFamily', fontFamily);
		  
		  config.callbackFunc(fontFamily);
		});
		
	});	
}
})( jQuery );

