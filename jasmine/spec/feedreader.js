/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  describe('RSS Feeds', function() {

    // tests to make sure that the allFeeds variable has been defined and that it is not empty.
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
    it('has a URL', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });


    // loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
    it('has a name', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  describe('The menu', function() {

    //ensures the menu element is hidden by default
    it('has menu hidden as default', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // ensures the menu changes visibility when the menu icon is clicked and hides when clicked again.
    it('has menu changes when icon is clicked', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).not.toBe(true);

      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function() {

    // ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
    // Matthew Cranford https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
    beforeEach(function(done) {
      loadFeed(0, done);
    });

    it('completes loadFeed', function() {

      expect(document.querySelector('.feed').children.length === 10).toBe(true);
    });
  });

  describe('New Feed Selection', function() {
    // ensures when a new feed is loadedby the loadFeed function that the content actually changes.
    let firstCheck;
    let secondCheck;

    beforeEach(function(done) {
      loadFeed(0, function() {
        firstCheck = document.querySelector('.feed').children[0].innerText;
        loadFeed(1, function() {
          secondCheck = document.querySelector('.feed').children[0].innerText;
          done();
        });
      });
    });

    it('content changes', function() {
      expect(firstCheck === secondCheck).toBe(false);
    });

  });

}());
