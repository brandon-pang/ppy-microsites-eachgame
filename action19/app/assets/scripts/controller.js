'use strict';

app.controller('mainController', function ($scope,
$state, $translate, $localStorage, $document, bowser) {

    $scope.browser = bowser.name;

    var storageDefaultLang = localStorage[$translate.storageKey()];
    var browserDefaultLang = $translate.preferredLanguage();

    if ($state.params.language === 'en') {
        $scope.flag = "uk";
        $scope.lang = "English";
    } else if ($state.params.language === 'de') {
        $scope.flag = "germany";
        $scope.lang = "Deutsche";
    } else if ($state.params.language === "fr") {
        $scope.flag = "france";
        $scope.lang = "Français";
    } else if ($state.params.language === "pt") {
        $scope.flag = "brazil";
        $scope.lang = "Português";
    } else {
        if (browserDefaultLang !== storageDefaultLang) {
            if (storageDefaultLang === 'en') {
                $scope.flag = "uk";
                $scope.lang = "English";
            } else if (storageDefaultLang === 'de') {
                $scope.flag = "germany";
                $scope.lang = "Deutsche"; 
            } else if (storageDefaultLang === 'fr') {
                $scope.flag = "france";
                $scope.lang = "Français";
            } else if (storageDefaultLang === 'pt') {
                $scope.flag = "brazil";
                $scope.lang = "Português";
            }
        } else {
            if (browserDefaultLang === 'en') {
                $scope.flag = "uk";
                $scope.lang = "English";
            } else if (browserDefaultLang === 'de') {
                $scope.flag = "germany";
                $scope.lang = "Deutsche";
            } else if (browserDefaultLang === 'fr') {
                $scope.flag = "france";
                $scope.lang = "Français";
            } else if (browserDefaultLang === 'pt') {
                $scope.flag = "brazil";
                $scope.lang = "Português";
            }
        }
    }

    $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        $translate.use(toParams.language);
    }); 

    $scope.switchLanguage = function (language) {
        $state.go($state.current.name, {language: language});
        $translate.use(language);
        
        if (language === 'en') {
            $scope.flag = "uk";
            $scope.lang = "English";
        } else if (language === "de") {
            $scope.flag = "germany";
            $scope.lang = "Deutsche";
        } else if (language === "fr") {
            $scope.flag = "france";
            $scope.lang = "Français";
        } else if (language === "pt") {
            $scope.flag = "brazil";
            $scope.lang = "Português";
        }
    };
    var awsUrl="https://papayacdn.s3.amazonaws.com/static/dekaron/update/action19/";
    $scope.imgUrl=awsUrl+'assets/images';
    $scope.s1imgPath=awsUrl+"assets/images/section1/";
    $scope.s4sl_url=awsUrl+"assets/images/section4/";

    $scope.linkUrl={
        dekaron:"https://dekaron.papayaplay.com/dekaron.do",
        seemore:"#",
        learnmore:"#",
        papayaplay:"https://www.papayaplay.com/",
        ubifun:"http://www.ubifun.com/"
    };

    $scope.secNode=[
        {
            title:'section-node1-title',
            subtitle:'section-node1-subtitle',
            text:'section-node1-text',
            button:'',
            linkUrl:"#",
            image:'search-agency.png'
        },
        {
            title:'section-node2-title',
            subtitle:'',
            text:'section-node2-text',
            button:'',
            linkUrl:"",
            image:'chat-img.png'
        },
        {
            title:'section-node4-title',
            subtitle:'',
            text:'section-node4-text',
            button:'',
            linkUrl:"#",
            image:'inventory-lock.png'
        }
    ];

    $scope.dungeonNode=[
        {
            class: 'active',
            text: "s1-tab1-btn-name",
            tablink: "#d-node1"
        },
        {
            class: '',
            text: "s1-tab2-btn-name",
            tablink: "#d-node2"
        },
        {
            class: '',
            text: "s1-tab3-btn-name",
            tablink: "#d-node3"
        },
        {
            class: '',
            text: "s1-tab4-btn-name",
            tablink: "#d-node4"
        }
    ];

    $scope.s1sl0=[
        {image:'section1-dungeon1.jpg'},
        {image:'section1-dungeon2.jpg'},
        {image:'section1-dungeon3.jpg'},
        {image:'section1-dungeon4.jpg'},
        {image:'section1-dungeon5.jpg'}
    ];

    $scope.s1sl1=[
        {image:'section1-monster1.png'},
        {image:'section1-monster2.png'},
        {image:'section1-monster3.png'},
        {image:'section1-monster4.png'},
        {image:'section1-monster5.png'},
        {image:'section1-monster6.png'},
        {image:'section1-monster7.png'},
        {image:'section1-monster8.png'}
    ];

    $scope.s1sl2=[
        {image:'section1-item1.png'},
        {image:'section1-item2.png'},
        {image:'section1-item3.png'},
        {image:'section1-item4.png'},
        {image:'section1-item5.png'},
        {image:'section1-item6.png'},
        {image:'section1-item7.png'}
    ];

    $scope.s2nodes=[
        {
            class:'active',
            text:"s2-tab1-btn-name",
            tablink:"#s2-node1"
        },
        {
            class:'',
            text:"s2-tab2-btn-name",
            tablink:"#s2-node2"
        },
        {
            class:'',
            text:"s2-tab3-btn-name",
            tablink:"#s2-node3"
        },
        {
            class:'',
            text:"s2-tab4-btn-name",
            tablink:"#s2-node4"
        },
        {
            class:'',
            text:"s2-tab5-btn-name",
            tablink:"#s2-node5"
        },
        {
            class:'',
            text:"s2-tab6-btn-name",
            tablink:"#s2-node6"
        },
        {
            class:'',
            text:"s2-tab7-btn-name",
            tablink:"#s2-node7"
        },
        {
            class:'',
            text:"s2-tab8-btn-name",
            tablink:"#s2-node8"
        },
        {
            class:'',
            text:"s2-tab9-btn-name",
            tablink:"#s2-node9"
        },
        {
            class:'',
            text:"s2-tab10-btn-name",
            tablink:"#s2-node10"
        },
        {
            class:'',
            text:"s2-tab11-btn-name",
            tablink:"#s2-node11"
        },
        {
            class:'',
            text:"s2-tab12-btn-name",
            tablink:"#s2-node12"
        },
        {
            class:'',
            text:"s2-tab13-btn-name",
            tablink:"#s2-node13"
        }
    ];

    $scope.s2tabs=[
        {
            class:'in active',
            name:'s2-tab1-btn-name',
            reward:'',
            quest:'s2-tab1-quest',
            map:'s2-tab1-map',
            effect:'s2-tab1-effect',
            tablink:"s2-node1"
        },
        {
            class:'',
            name:'s2-tab2-btn-name',
            reward:'',
            quest:'s2-tab2-quest',
            map:'s2-tab2-map',
            effect:'s2-tab2-effect',
            tablink:"s2-node2"
        },
        {
            class:'',
            name:'s2-tab3-btn-name',
            reward:'',
            quest:'s2-tab3-quest',
            map:'s2-tab3-map',
            effect:'s2-tab3-effect',
            tablink:"s2-node3"
        },
        {
            class:'',
            name:'s2-tab4-btn-name',
            reward:'',
            quest:'s2-tab4-quest',
            map:'s2-tab4-map',
            effect:'s2-tab4-effect',
            tablink:"s2-node4"
        },
        {
            class:'',
            name:'s2-tab5-btn-name',
            reward:'quest-reward',
            quest:'s2-tab5-quest',
            map:'s2-tab5-map',
            effect:'s2-tab5-effect',
            tablink:"s2-node5"
        },
        {
            class:'',
            name:'s2-tab6-btn-name',
            reward:'',
            quest:'s2-tab6-quest',
            map:'s2-tab6-map',
            effect:'s2-tab6-effect',
            tablink:"s2-node6"
        },
        {
            class:'',
            name:'s2-tab7-btn-name',
            reward:'',
            quest:'s2-tab7-quest',
            map:'',
            effect:'s2-tab7-effect',
            tablink:"s2-node7"
        },
        {
            class:'',
            name:'s2-tab8-btn-name',
            reward:'',
            quest:'s2-tab8-quest',
            map:'s2-tab8-map',
            effect:'s2-tab8-effect',
            tablink:"s2-node8"
        },
        {
            class:'',
            name:'s2-tab9-btn-name',
            reward:'',
            quest:'s2-tab9-quest',
            map:'s2-tab9-map',
            effect:'s2-tab9-effect',
            tablink:"s2-node9"
        },
        {
            class:'',
            name:'s2-tab10-btn-name',
            reward:'first-degree',
            quest:'s2-tab10-quest',
            map:'s2-tab10-map',
            effect:'s2-tab10-effect',
            tablink:"s2-node10"
        },
        {
            class:'',
            name:'s2-tab11-btn-name',
            reward:'',
            quest:'s2-tab11-quest',
            map:'',
            effect:'s2-tab11-effect',
            tablink:"s2-node11"
        },
        {
            class:'',
            name:'s2-tab12-btn-name',
            reward:'quest-reward',
            quest:'s2-tab12-quest',
            map:'s2-tab12-map',
            effect:'s2-tab12-effect',
            tablink:"s2-node12"
        },
        {
            class:'',
            name:'s2-tab13-btn-name',
            reward:'quest-reward',
            quest:'s2-tab13-quest',
            map:'',
            effect:'',
            tablink:"s2-node13"
        }
    ];

    $scope.s3tabs=[
        {
            class:'active',
            text:"s3-tab1-btn-name",
            tablink:"#s3-node1"
        },
        {
            class:'',
            text:"s3-tab2-btn-name",
            tablink:"#s3-node2"
        },
        {
            class:'',
            text:"s3-tab3-btn-name",
            tablink:"#s3-node3"
        },
        {
            class:'',
            text:"s3-tab4-btn-name",
            tablink:"#s3-node4"
        }
    ];

    $scope.s4tabs=[
        {
            class:'active',
            text:"s4-tab1-btn-name",
            tablink:"#s4-node1"
        },
        {
            class:'',
            text:"s4-tab2-btn-name",
            tablink:"#s4-node2"
        },
        {
            class:'',
            text:"s4-tab3-btn-name",
            tablink:"#s4-node3"
        }
    ];

    $scope.s4sl0=[
        {imgName:"Axe.png"},
        {imgName:"Blood-Whip.png"},
        {imgName:"Bow.png"},
        {imgName:"Crossbow.png"},
        {imgName:"Dagger.png"},
        {imgName:"Dual-Blade.png"},
        {imgName:"Falchion.png"},
        {imgName:"Gauntlet.png"},
        {imgName:"Great-Axe.png"},
        {imgName:"Great-Mace.png"},
        {imgName:"Great-Sword.png"},
        {imgName:"Guardarm.png"},
        {imgName:"Katar.png"},
        {imgName:"Mace.png"},
        {imgName:"Orb.png"},
        {imgName:"SealForce.png"},
        {imgName:"Spear.png"},
        {imgName:"Sword.png"},
        {imgName:"Twin-Sword.png"},
        {imgName:"Wand.png"}
    ];

    $scope.s4sl1=[
        {imgName:"section4-Armor_Aloken.png"},
        {imgName:"section4-Armor_Segnale.png"},
        {imgName:"section4-Armor_Seguriper.png"},
        {imgName:"section4-Armor_Vicious-Summoner.png"},
        {imgName:"section4-Azure-Knight.png"},
        {imgName:"section4-Bagi-Warrior.png"},
        {imgName:"section4-Black-Wizard.png"},
        {imgName:"section4-Conserra-Summoner.png"},
        {imgName:"section4-Dragon-Knight.png"},
        {imgName:"section4-Half-Bagi.png"},
        {imgName:"section4-Incar-Magician.png"},
        {imgName:"section4-Segita-Hunter.png"}
    ];

    $scope.s6tabs=[
        {
            class:'active',
            text:"s6-tab1-btn-name",
            tablink:"#s6-node1"
        },
        {
            class:'',
            text:"s6-tab2-btn-name",
            tablink:"#s6-node2"
        },
        {
            class:'',
            text:"s6-tab3-btn-name",
            tablink:"#s6-node3"
        }
    ];

    $scope.s7nodes=[
        {
            class:'active',
            text:"s7-tab1-btn-name",
            tablink:"#s7-node1"
        },
        {
            class:'',
            text:"s7-tab2-btn-name",
            tablink:"#s7-node2"
        },
        {
            class:'',
            text:"s7-tab3-btn-name",
            tablink:"#s7-node3"
        },
        {
            class:'',
            text:"s7-tab4-btn-name",
            tablink:"#s7-node4"
        },
        {
            class:'',
            text:"s7-tab5-btn-name",
            tablink:"#s7-node5"
        },
        {
            class:'',
            text:"s7-tab6-btn-name",
            tablink:"#s7-node6"
        },
        {
            class:'',
            text:"s7-tab7-btn-name",
            tablink:"#s7-node7"
        },
        {
            class:'',
            text:"s7-tab8-btn-name",
            tablink:"#s7-node8"
        },
        {
            class:'',
            text:"s7-tab9-btn-name",
            tablink:"#s7-node9"
        },
        {
            class:'',
            text:"s7-tab10-btn-name",
            tablink:"#s7-node10"
        },
        {
            class:'',
            text:"s7-tab11-btn-name",
            tablink:"#s7-node11"
        },
        {
            class:'',
            text:"s7-tab12-btn-name",
            tablink:"#s7-node12"
        }
    ];

    $scope.s7tabs=[
        {
            class:'in active',
            name:'s7-tab1-btn-name',
            reward:'',
            quest:'s7-tab1-quest',
            map:'s7-tab1-map',
            tablink:"s7-node1"
        },
        {
            class:'',
            name:'s7-tab2-btn-name',
            reward:'',
            quest:'s7-tab2-quest',
            map:'s7-tab2-map',
            tablink:"s7-node2"
        },
        {
            class:'',
            name:'s7-tab3-btn-name',
            reward:'',
            quest:'s7-tab3-quest',
            map:'s7-tab3-map',
            tablink:"s7-node3"
        },
        {
            class:'',
            name:'s7-tab4-btn-name',
            reward:'',
            quest:'s7-tab4-quest',
            map:'s7-tab4-map',
            tablink:"s7-node4"
        },
        {
            class:'',
            name:'s7-tab5-btn-name',
            reward:'quest-reward',
            quest:'s7-tab5-quest',
            map:'s7-tab5-map',
            tablink:"s7-node5"
        },
        {
            class:'',
            name:'s7-tab6-btn-name',
            reward:'',
            quest:'s7-tab6-quest',
            map:'s7-tab6-map',
            tablink:"s7-node6"
        },
        {
            class:'',
            name:'s7-tab7-btn-name',
            reward:'',
            quest:'s7-tab7-quest',
            map:'',
            tablink:"s7-node7"
        },
        {
            class:'',
            name:'s7-tab8-btn-name',
            reward:'',
            quest:'s7-tab8-quest',
            map:'s7-tab8-map',
            tablink:"s7-node8"
        },
        {
            class:'',
            name:'s7-tab9-btn-name',
            reward:'',
            quest:'s7-tab9-quest',
            map:'s7-tab9-map',
            tablink:"s7-node9"
        },
        {
            class:'',
            name:'s7-tab10-btn-name',
            reward:'first-degree',
            quest:'s7-tab10-quest',
            map:'s7-tab10-map',
            tablink:"s7-node10"
        },
        {
            class:'',
            name:'s7-tab11-btn-name',
            reward:'',
            quest:'s7-tab11-quest',
            map:'',
            tablink:"s7-node11"
        },
        {
            class:'',
            name:'s7-tab12-btn-name',
            reward:'quest-reward',
            quest:'s7-tab12-quest',
            map:'s7-tab12-map',
            tablink:"s7-node12"
        }
    ];

    $scope.topNavVisible = false;

    $document.on('scroll', function() {
        var scrollPos = $document.scrollTop();
        if (scrollPos > 1565) {
            $scope.$apply(function() {
                $scope.topNavVisible = true;
            });
        } else {
            $scope.$apply(function() {
                $scope.topNavVisible = false;
            });
        }
    });
});
