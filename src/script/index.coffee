$(document).ready ->
	delay = false
	showFooter = false
	timeOut = 0


	$('#fullpage').fullpage 
		# anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sisthPage', 'seventhPage', 'eighthPage','ninthPage', 'tenthPage']
		# navigation: true
		# navigationPosition: 'right'
		# showActiveTooltip: true
                resize: true
                css3: true
                anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'page11', 'page12', 'page13']
                # menu: '#menu'
                navigation: true
                navigationPosition: 'right'
                navigationColor: '#000'
                loopBottom: true
                responsiveWidth: 960
                # autoScrolling: false

                onLeave: (index, nextIndex, direction) ->
                	if nextIndex is 4
                		$('.page4 .active').removeClass('active')
                		$('.morning').addClass('active')

                	if index is 4 and nextIndex is 5
                		undelay = ->
                			delay = false
                			return
                		last = $('.night').hasClass('active')
                		if delay
                			setTimeout undelay, 500
                			return false
                		else
                			if last then return true 
        	        		$('.page4 .active')
        	        		.removeClass('active')
        	        		.next()
        	        		.addClass('active')
        	        		delay = true
                			return false

                	if index is 13 
                		change =  -> 
                			showFooter = false
                			console.log(showFooter)
                			return
                		if nextIndex is 1
        	        		$('.page13').addClass('footer-active')
        	        		showFooter = true
        	        		return false
        	        	else if nextIndex is 12 and showFooter
                			$('.page13').removeClass('footer-active')
                			setTimeout change, 1000
                			return false		
        	        	else 
        	        		$('.page13').removeClass('footer-active')
        	        		showFooter = false
        	        		return true

        return
        # $(window).resize -> 
        #         if document.documentElement.clientWidth < 960
        #                 $('#fullpage').fullpage
        #                         autoScrolling: false
        #                 return           
        # return
			
	
