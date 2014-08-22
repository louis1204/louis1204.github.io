$( 
	window.onload = function() {
    var pictures = [],
        $thumbnails = $( '#thumbnails' ),
        $thumbnails_area = $( '#thumbnails-area' ),
        $title = $( '#title' ),
        $pause = $( '#pause' ),
        $flash = $( '#flash' ),
        $sidebar = $( '#sidebarwrapper'),
        $gallery_link = $('#gallery-link');

    // jScrollPane

    $thumbnails.find( 'ul' ).width( function() {
        var totalWidth = 0;
        $( this ).find( 'li' ).each( function() {
            totalWidth += $( this ).outerWidth( true );
        });
        return totalWidth;
    });

    $thumbnails.jScrollPane();

    var jScrollPaneApi = $thumbnails.data( 'jsp' );

	//reintialize jScrollPane on window resize
	
    $( window ).bind( 'resize', function() {
        jScrollPaneApi.reinitialise();
    });

    // Vegas Background

    $thumbnails.find( 'a' ).each( function() {
        pictures.push({
            src: $( this ).attr( 'href' ),    
            title: $( this ).find( 'img' ).attr( 'title' ),
            valign: $( this ).find( 'img' ).data( 'valign' )
        });
    })

    $.vegas( 'slideshow', { 
        backgrounds: pictures,
        delay: 4000
     })( 'overlay' );
    
    $( 'body' ).bind( 'vegasload', function( e, img ) {
        var src = $( img ).attr( 'src' ),
            idx = $( 'a[href="' + src + '"]' ).parent( 'li' ).index();
    
        $title.fadeOut( function() {
            $( this ).find( 'h1' ).text( pictures[ idx ].title );
            $( this ).fadeIn();
        });

        $flash.show().fadeOut( 500 );

        var pointerPosition = $thumbnails.find( 'li' ).eq( idx ).position().left;

        if ( ( pointerPosition > $thumbnails.width() || pointerPosition < jScrollPaneApi.getContentPositionX() ) && !$thumbnails.is( ':hover' ) ) {
            jScrollPaneApi.scrollToX( pointerPosition, true );
        }
    });

    // Photograph

    $thumbnails.find( 'a' ).click( function() {
        $pause.show();

        $thumbnails.hide();//animate( { top: '-90px' });
        $title.hide();//animate( { bottom: '-90px' });    
		$sidebar.hide();
        var idx = $( this ).parent( 'li' ).index();
        $.vegas( 'slideshow', { step: idx } )( 'pause' );
    
        return false;
    });

    $pause.click( function() {
        $pause.hide();

        $title.show();//animate( { bottom:'0px' });
        $thumbnails.show();//animate( { top:'0px' });
		$sidebar.show()
        $.vegas( 'slideshow' );

        return false;
    });
    
    $thumbnails_area.mouseenter( function() {
    	$thumbnails.stop(true,false).animate( { top: '0' }, 500);
    	$sidebar.stop(true,false).animate( { top: '130px' }, 500);
    });
    
    $thumbnails.mouseleave( function() {
    	$sidebar.stop(true,false).animate( { top: '10px' }, 500);
    	$thumbnails.stop(true,false).animate( { top: '-120px' }, 500);
    });

    
    $title.animate( { bottom: '0' }, 1000);
    $sidebar.animate( { top: '10px' }, 1000);
    $thumbnails.animate( { top: '-120px' }, 1000);
});