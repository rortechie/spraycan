$(function() {
  Spraycan.init(); //start backbone
});

WebFontConfig = {
  google: { families: [ 'Patua One', 'Tangerine', 'Cantarell', 'Droid Sans','Allan','Allerta','Allerta Stencil','Anonymous Pro','Arimo','Arvo','Bentham','Buda','Cabin','Calligraffitti','Cantarell','Cardo','Cherry Cream Soda','Chewy','Coda','Coming Soon','Copse','Corben','Cousine','Covered By Your Grace','Crafty Girls','Crimson Text','Crushed','Cuprum','Droid Sans','Droid Sans Mono','Droid Serif','Fontdiner Swanky','GFS Didot','GFS Neohellenic','Geo','Gruppo','Hanuman','Homemade Apple','IM Fell DW Pica','IM Fell DW Pica SC','IM Fell Double Pica','IM Fell Double Pica SC','IM Fell English','IM Fell English SC','IM Fell French Canon','IM Fell French Canon SC','IM Fell Great Primer','IM Fell Great Primer SC','Inconsolata','Irish Growler','Josefin Sans','Josefin Slab','Just Another Hand','Just Me Again Down Here','Kenia','Kranky','Kristi','Lato','Lekton','Lobster','Luckiest Guy','Merriweather','Molengo','Mountains of Christmas','Neucha','Neuton','Nobile','OFL Sorts Mill Goudy TT','Old Standard TT','Orbitron','PT Sans','PT Sans Caption','PT Sans Narrow','Permanent Marker','Philosopher','Puritan','Raleway','Reenie Beanie','Rock Salt','Schoolbell','Slackey','Sniglet','Sunshiney','Syncopate','Tangerine','Tinos','Ubuntu','UnifrakturCook','UnifrakturMaguntia','Unkempt','Vibur','Vollkorn','Walter Turncoat','Yanone Kaffeesatz']
}};

//helper to serialize entire form
$.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
