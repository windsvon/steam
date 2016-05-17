(function() {
  $(document).ready(function() {
    var delay, showFooter, timeOut;
    delay = false;
    showFooter = false;
    timeOut = 0;
    $('#fullpage').fullpage({
      resize: true,
      css3: true,
      anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8', 'page9', 'page10', 'page11', 'page12', 'page13'],
      navigation: true,
      navigationPosition: 'right',
      navigationColor: '#000',
      loopBottom: true,
      responsiveWidth: 960,
      onLeave: function(index, nextIndex, direction) {
        var change, last, undelay;
        if (nextIndex === 4) {
          $('.page4 .active').removeClass('active');
          $('.morning').addClass('active');
        }
        if (index === 4 && nextIndex === 5) {
          undelay = function() {
            delay = false;
          };
          last = $('.night').hasClass('active');
          if (delay) {
            setTimeout(undelay, 500);
            return false;
          } else {
            if (last) {
              return true;
            }
            $('.page4 .active').removeClass('active').next().addClass('active');
            delay = true;
            return false;
          }
        }
        if (index === 13) {
          change = function() {
            showFooter = false;
            console.log(showFooter);
          };
          if (nextIndex === 1) {
            $('.page13').addClass('footer-active');
            showFooter = true;
            return false;
          } else if (nextIndex === 12 && showFooter) {
            $('.page13').removeClass('footer-active');
            setTimeout(change, 1000);
            return false;
          } else {
            $('.page13').removeClass('footer-active');
            showFooter = false;
            return true;
          }
        }
      }
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
