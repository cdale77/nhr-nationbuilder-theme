var CollectiveTheme = CollectiveTheme || {};

$(document).ready(function(){

  (function(){

    // Updates navigation area styling
    this.initNavigation = function(nav, placeholder, menu, minheight) {
      var scrollTimer;
      var resizeTimer;
      if (menu.length && ($(window).width() > 320)) {
        CollectiveTheme.updateNavigation(nav, placeholder, menu, minheight);
        if(nav.height() >= 150){
          placeholder.height(Math.ceil(nav.height())-1);  
        } else {
          placeholder.height(149);
        }
        $(window).resize(function(){
          if (resizeTimer) {
            clearTimeout(resizeTimer);
          }
          resizeTimer = setTimeout(CollectiveTheme.updateNavigation(nav, placeholder, menu, minheight),50);
        });
        $(window).scroll(function(){
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }
          scrollTimer = setTimeout(CollectiveTheme.updateNavigation(nav, placeholder, menu, minheight),50);
        });
        $(window).load(function(){
          CollectiveTheme.updateNavigation(nav, placeholder, menu, minheight);
        });
        if ($(window).width() <= 768) {
          CollectiveTheme.updateHamburger(nav, placeholder, menu, minheight);
        }
      }
      else if (menu.length) {
        CollectiveTheme.updateHamburger(nav, placeholder, menu, minheight);
      }
    }

    this.updateNavigation = function(nav, placeholder, menu, minheight) {
      var placeholderTimer;
      var fromTop = $(window).scrollTop();
      if((fromTop >= 0) && ($(window).width() > 768)) {
        menu.css('height', minheight - $(window).scrollTop());
      }
    }

    this.updateHamburger = function(nav, placeholder, menu, minheight) {
      $('i.icon-menu').css('line-height',Math.ceil(nav.height())-1+'px');
      $(window).resize(function(){
        $('i.icon-menu').css('line-height',Math.ceil(nav.height())-1+'px');
      });
    }

    this.updateActivities = function(activities) {
      activities.each(function(){
        var iconHeight = $(this).find('.stream-pic').height();
        var signupBlock = $(this).find('.activity-signup');
        signupBlock.css('top',iconHeight + 'px');
      });
    }

    // Footer sizing
    this.updateFooter = function() {
      var heightDiff = $(window).height() - $('#body').height();
      if($('footer').length) {
        var footer = $('footer');
        var footerHeight = footer.height();
        if(heightDiff > 0) {
          footer.css({'height':footerHeight+heightDiff+'px'});
        }
      }
    }

    // Converts CSS column tiling order from top to bottom to left to right 
    this.tileLTR = function(tiles, columns, type) {
      var newTileStack = [];
      for(var i=0; i<tiles.length; i++) {
        if((i+1)%columns == 0) {
          newTileStack.push(tiles.eq(i).clone().addClass('desktop-visible'));
          tiles.eq(i).addClass('mobile-visible');
        }
      }
      if (newTileStack.length > 0) {
        tiles.parent().parent().append('<div class="span6 '+type+'-column-2"></div>');
      }
      for(var j=0; j<newTileStack.length; j++) {
        $('.'+type+' .'+type+'-column-2').append(newTileStack[j]);
      }
    }

    // Centers calendar homepage excerpt event title on map
    this.centerExcerptEventTitle = function(events) {
      if (events.length == 1) {
        events.eq(0).css('margin-top','80px');
      }
    }

    // Initialize on page load
    this.initialize = function() {

      var navBar = $('.header-container').eq(0);
      var navPlaceholder = $('.nav-placeholder').eq(0);
      var navMenu = navBar.find('nav');
      var activities = $('.activities li.activity');
      var blogPageExcerpts = $('#body[class$="-wide"] .blog .page-excerpt');
      var faqPageExcerpts = $('#body[class$="-wide"] .faq .page-excerpt');
      var excerptEventInfoBlocks = $('.homepage-excerpt .event-info-block');

      this.initNavigation(navBar, navPlaceholder, navMenu, 150);

      this.updateFooter();

      if(blogPageExcerpts.length) {
        this.tileLTR(blogPageExcerpts, 2, 'blog');
      }

      if(faqPageExcerpts.length) {
        this.tileLTR(faqPageExcerpts, 2, 'faq');
      }

      if(excerptEventInfoBlocks.length) {
        this.centerExcerptEventTitle(excerptEventInfoBlocks, 2);
      }

      if(activities.length && ($(window).width() >= 768)) {
        this.updateActivities(activities);
      }

    }

  }).apply(CollectiveTheme);

  CollectiveTheme.initialize();

});