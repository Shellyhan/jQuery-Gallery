$(function() {
	$("#form_dialog").dialog({
		autoOpen: false,
		resizable: false,
		show: {
			effect: "clip",
			duration: 200
		},
		hide: {
			effect: "clip",
			duration: 100
		},
		width: 535,
		height: 520
	});

	$("#theme-button").offset({top: 12.5});

	/* Position Control Related */
	var numberOfImage = $("#footer li").size();
	$(window).resize(function() {
  		position();
	});
	function position(){
		$("h1").position({
			of: $("#nav"),
			my: "left+20",
			at: "left"
		});

		$("#theme-button").position({
			of: $("#nav")
		});


		$("#help").position({
			of: $("#nav"),
			my: "right-20",
			at: "right"
		});

		$("#scroll-left").position({
			of: $("#footer"),
			my: "left+20",
			at: "left"
		});

		$("#mask").position({
			of: $("#footer")
		});

		$("#scroll-right").position({
			of: $("#footer"),
			my: "right-20",
			at: "right"
		});
	}

	/* Theme Related */
	$(".theme-updater").click(function() {
		$("#theme-css").attr("href", "themes/" + $(this).attr("id") + "/jquery-ui.theme.css");
	})
	$(".theme-updater").button();

	/* Dialog Related */
	$("#dialog").dialog({
		autoOpen: false,
		show: {
			effect: "clip",
			duration: 200
		},
		hide: {
			effect: "clip",
			duration: 100
		},
		buttons: {
        	"Apply": function() {
          		$(this).dialog("close");
        	},
        	Cancel: function() {
          		$(this).dialog( "close" );
        	}
      	},
		closeOnEscape: true,
		width: 400,
        height: 700,
		position: {
			my: "right bottom",
			at: "right-20 bottom-193",
			of: window
		}
	});
	$("#help").on("click", function() {
		$("#form_dialog").dialog("open");
	});

	$("#tabs").tabs();

	/* Photo Gallery Related*/
	var updating = false;
	$(".thumbnail").on("click", function() {
		if (updating == false) {
			updating = true;
			$("#main-container").css('background-image', 'url(../imgs/' + $(this).attr('order') + '.jpg)');
			setTimeout(function(){ updating = false; }, 550);
		}
	});

	var lis = $("li");
	for (i = 0; i < numberOfImage; i++) {
		$(lis[i]).css('background-image', 'url(../imgs/' + (i + 1) + '.thumbnail.jpg)');
	}

	var scrollSpeed = 300;
	var scrollDispl = 408;
	var scrollEase = "swing";
	$("#scroll-right").click(function() {
		$("ol").animate({
			scrollLeft: $("ol").scrollLeft() + scrollDispl
			}, scrollSpeed, scrollEase);
	});
	$("#scroll-left").click(function() {
		$("ol").animate({
			scrollLeft: $("ol").scrollLeft() - scrollDispl
			}, scrollSpeed, scrollEase);
	});

	$("ol").sortable();

	/* High Priority */
	position();

	// EVERYTHING BELOW IS FROM TEST ///////////////////////////////////////////

  // Splash Screen
  var splash = $("#splash");
  var jqueryLogo = $("#jquery-logo");
	var jqueryUiLogo = $("#jquery-ui-logo");

  jqueryLogo.delay(1000).fadeIn(500);
	jqueryLogo.delay(1000).toggle("pulsate");

	jqueryUiLogo.delay(3000).toggle("slide");
  jqueryUiLogo.delay(1000).animate({rotate: '360'}, 600);
  jqueryUiLogo.animate({
    width: [ "toggle", "swing" ],
    height: [ "toggle", "swing" ],
    opacity: "toggle"
  });

  splash.delay(5000).fadeOut(500);

  // Captcha
  var captcha = $("#captcha");
  captcha.sortable();
  captcha.disableSelection();

  // Datepicker
  $("#datepicker").datepicker({
    buttonText: "Select date",
          changeMonth: true,
          changeYear: true
  });

	// Info Button
	var infoButton = $("#info-button");
	infoButton.click(function() {
			 $.ajax({url: "contact.txt", success: function(result) {
					 $("#form_dialog").append(result);
			 }});

			 infoButton.hide();
	 });

	// Footer tooltip
	var footerTooltip = $("#footer-tooltip");
	footerTooltip.hover(function() {
		footerTooltip.css("background-color", "rgba(0, 0, 0, 0.5)");
		footerTooltip.delay(3000).fadeOut();
	});

  // Form Submission: Next + submit (using ID to distinct two inputs) /////
  var myForm = $("#my-form");

  $('#Next-btn').click(function(e) {
            e.preventDefault();
            $( "#tabs" ).tabs({ active: 1 });
  });

  $('#Submit-btn').click(function(e) {
      myForm.hide();
			infoButton.show();

      myForm.before('<div id="progressbar"><div class="progress-label">Downloading wallpapers...</div></div>');
      var progressbar = $("#progressbar"),
              progressLabel = $(".progress-label");

      progressbar.progressbar({
      value: false,
      change: function() {
        progressLabel.text( progressbar.progressbar( "value" ) + "%" );
      },
      complete: function() {
        progressLabel.text( "Wallpapers downloaded!" );
      }
    });

    function progress() {
      var val = progressbar.progressbar( "value" ) || 0;

      progressbar.progressbar( "value", val + 2 );

      if ( val < 99 ) {
        setTimeout( progress, 80 );
      }
    }

    setTimeout( progress, 2000 );



    e.preventDefault();
  });

 	$( "#province" ).selectmenu();
	$( "#tabs" ).tabs();
	$(".tooltip").tooltip();

	// Custom Widget /////////////////////////////////////////

	$.widget( "custom.colorize", {
      // default options
      options: {
        red: 255,
        green: 0,
        blue: 0,

        // Callbacks
        change: null,
        random: null
      },

      // The constructor
      _create: function() {
        this.element
          // add a class for theming
          .addClass( "custom-colorize" );

        this.changer = $( "<button>", {
          text: "Change Filter",
          "id": "filter-button"
        })
        .appendTo( "#nav" )
        .button();

        // Bind click events on the changer button to the random method
        this._on( this.changer, {
          // _on won't call random when widget is disabled
          click: "random"
        });
        this._refresh();
      },

      // Called when created, and later when changing options
      _refresh: function() {
        this.element.css( "background-color", "rgb(" +
          this.options.red +"," +
          this.options.green + "," +
          this.options.blue + ", 0.1)"
        );

        // Trigger a callback/event
        this._trigger( "change" );
      },

      // A public method to change the color to a random value
      // can be called directly via .colorize( "random" )
      random: function( event ) {
        var colors = {
          red: Math.floor( Math.random() * 256 ),
          green: Math.floor( Math.random() * 256 ),
          blue: Math.floor( Math.random() * 256 )
        };

        // Trigger an event, check if it's canceled
        if ( this._trigger( "random", event, colors ) !== false ) {
          this.option( colors );
        }
      },

      // Events bound via _on are removed automatically
      // revert other modifications here
      _destroy: function() {
        // remove generated elements
        this.changer.remove();

        this.element
          .removeClass( "custom-colorize" )
          .enableSelection()
          .css( "background-color", "transparent" );
      },

      // _setOptions is called with a hash of all options that are changing
      // always refresh when changing options
      _setOptions: function() {
        // _super and _superApply handle keeping the right this-context
        this._superApply( arguments );
        this._refresh();
      },

      // _setOption is called for each individual option that is changing
      _setOption: function( key, value ) {
        // prevent invalid color values
        if ( /red|green|blue/.test(key) && (value < 0 || value > 255) ) {
          return;
        }
        this._super( key, value );
      }
    });

    // Initialize with two customized options
    $( "#filter" ).colorize({
      red: 60,
      blue: 60
    });
});
