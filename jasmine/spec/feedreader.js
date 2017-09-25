$(function() {

  /* -------Test suite named "RSS Feeds"------ */

  describe('RSS Feeds', function() {

    /* This test make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('all Feeds are defined', function() {
      //checks if allFeeds variable has been defined
      expect(allFeeds).toBeDefined();

      //checks if allFeeds variable is not empty
      expect(allFeeds.length).not.toBe(0);
    });


    /* test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('all URL defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).not.toBeNull();
      });
    });


    /* test loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('all names defined', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).not.toBeNull();
      });
    });
  });




  /* -------Test suite named "The menu"------ */

  //custom matcher defination
  var customMatcher = {
    toHaveClass: function() {
      return {
        compare: function(actual, className) {
          return {
            pass: $(actual).hasClass(className)
          }
        }
      }
    },
  };

  describe('The menu', function() {

    beforeEach(function() {
      //added custom matcher to check if DOM element contains a class
      jasmine.addMatchers(customMatcher);
    });

    /* Test ensures the menu element is
     * hidden by default.
     */
    it('menu hidden by default', function() {
      expect('body').toHaveClass('menu-hidden');
    });

    /* Test ensures the menu changes
     * visibility when the menu icon is clicked.
     */

    it('menu display and hide on click', function() {

      // trigger first click to display menu
      $('.menu-icon-link').trigger('click');

      //checks if menu is visible
      expect('body').not.toHaveClass('menu-hidden');

      // triggers second click to hide menu
      $('.menu-icon-link').trigger('click');

      // checks if menu is hidden
      expect('body').toHaveClass('menu-hidden');
    });

  });



  /* -------Test suite named "Initial Entries"------ */

  describe('Inital Entries', function() {

    //async request before executing spec
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });

    /* Test ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('feed entry exist', function(done) {

      //checks if atleast one entry is available
      expect($('.feed').children()[0]).not.toBeNull();
      done();
    });

  });



  /* -------Test suite named "New Feed Selection"------ */

  describe('New Feed Selection', function() {
    var initContent, newContent;

    /* Since content only changes when different feed is requests
       hence, called loadfeed function twice in beforeEach,
       Saved content in different variables for later comparison
    */

    beforeEach(function(done) {

      //first async call
      loadFeed(0, function() {

        //saving h2 text of first entry
        initContent = $('.feed').find("h2").first().text();

        //second async call

        /* calling second async request in a callback function
          of first async request to cause delay otherwise,
          second request will be called at the same time as first request
          with results undefined
        */
        loadFeed(1, function() {
          newContent = $('.feed').find("h2").first().text();
          done();
        });
      });
    });

    /* Test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */

    it('content changes with feed', function(done) {

      // checks if h2 text of first entries from both async requests are not same
      expect(initContent).not.toEqual(newContent);

      // calling this to load Udacity Blog feeds
      loadFeed(0);
      done();
    });

  });

}());
