'use strict';

app.controller('mainController', function($scope, $translate, $location) {

    this.init = function () {

    	var storageDefaultLang = localStorage[$translate.storageKey()];
    	var browserDefaultLang = $translate.preferredLanguage();
    	if (browserDefaultLang != storageDefaultLang) {
    		if (storageDefaultLang == 'en') {
		    	this.flag = "uk";
		    	this.lang = "English";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-en.svg');
    			
		    } else if (storageDefaultLang == 'de') {
		    	this.flag = "germany";
		    	this.lang = "German";
		    	$('.main-copy').attr('src', 'assets/images/header-title-de.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-de.svg');
    			
		    } else if (storageDefaultLang == 'fr') {
		    	this.flag = "france";
		    	this.lang = "French";
		    	$('.main-copy').attr('src', 'assets/images/header-title-fr.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-fr.svg');
    		
		    } else if (storageDefaultLang == 'pt') {
		    	this.flag = "brazil";
		    	this.lang = "Portuguese";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-pt.svg');
    			
		    } else {
		    	this.flag = "uk";
		    	this.lang = "English";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-en.svg');
    		
		    }
    	} else {
    		if (browserDefaultLang == 'en') {
		    	this.flag = "uk";
		    	this.lang = "English";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-en.svg');
    			
		    } else if (browserDefaultLang == 'de') {
		    	this.flag = "germany";
		    	this.lang = "German";
		    	$('.main-copy').attr('src', 'assets/images/header-title-de.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-de.svg');
    			
		    } else if (browserDefaultLang == 'fr') {
		    	this.flag = "france";
		    	this.lang = "French";
		    	$('.main-copy').attr('src', 'assets/images/header-title-fr.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-fr.svg');
    			
		    } else if (browserDefaultLang == 'pt') {
		    	this.flag = "brazil";
		    	this.lang = "Portuguese";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-pt.svg');
    			$location.url('pt');
		    } else {
		    	this.flag = "uk";
		    	this.lang = "English";
		    	$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    			$('.nina-title').attr('src', 'assets/images/nina-title-en.svg');
    			
		    }
    	}
    }
    
    this.init();

    this.switchLanguage = function (key) {
    	$translate.use(key);
    	if (key == 'en') {
    		this.flag = "uk";
    		this.lang = "English";
    		$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    		$('.nina-title').attr('src', 'assets/images/nina-title-en.svg');
    		$location.path('/en');
    	} else if (key == "de") {
    		this.flag = "germany";
    		this.lang = "German";
    		$('.main-copy').attr('src', 'assets/images/header-title-de.svg');
    		$('.nina-title').attr('src', 'assets/images/nina-title-de.svg');
    		$location.path('/de');
    	} else if (key == "fr") {
    		this.flag = "france";
    		this.lang = "French";
    		$('.main-copy').attr('src', 'assets/images/header-title-fr.svg');
    		$('.nina-title').attr('src', 'assets/images/nina-title-fr.svg');
    		$location.path('/fr');
    	} else if (key == "pt") {
    		this.flag = "brazil";
    		this.lang = "Portuguese";
    		$('.main-copy').attr('src', 'assets/images/header-title-en.svg');
    		$('.nina-title').attr('src', 'assets/images/nina-title-pt.svg');
    		$location.path('/pt');
    	}
  	};
});