var Montage=require("montage/core/core").Montage,RangeController=require("montage/core/range-controller").RangeController,Promise=require("montage/core/promise").Promise,CategoryController=require("./category-controller").CategoryController,sharedTransport=require("./jsonp-transport").shared,defaultLocalizer=require("montage/core/localizer").defaultLocalizer,API_KEY="dbf71473cf25bbd06939baef47b626eb",API_URL="https://api.themoviedb.org/3/",BOX_OFFICE_FEED=API_URL+"movie/now_playing",UPCOMING_FEED=API_URL+"movie/upcoming",TOP_RATED_FEED=API_URL+"movie/top_rated",POPULAR_FEED=API_URL+"movie/popular",POPULAR_FEED=API_URL+"movie/popular",MOVIE=API_URL+"movie/";exports.TmdbService=Montage.specialize({constructor:{value:function(){this.categories=(new RangeController).initWithContent([]),this.categories.avoidsEmptySelection=!0}},defaultParams:{get:function(){var e=defaultLocalizer.locale||"en";return"?api_key="+API_KEY+"&language="+e}},load:{value:function(){var e=this;e.latestBoxOffice=new CategoryController("Box Office","box_office"),e.upcoming=new CategoryController("Upcoming","upcoming"),e.topDvdRentals=new CategoryController("Top Rated","rentals"),e.inTheaters=new CategoryController("Popular","in_theaters"),e.latestBoxOffice.contentController.addRangeAtPathChangeListener("selection",this,"handleMovieSelectionChange"),e.upcoming.contentController.addRangeAtPathChangeListener("selection",this,"handleMovieSelectionChange"),e.topDvdRentals.contentController.addRangeAtPathChangeListener("selection",this,"handleMovieSelectionChange"),e.inTheaters.contentController.addRangeAtPathChangeListener("selection",this,"handleMovieSelectionChange");var t=this.loadLatestBoxOfficeMovies().then(function(t){return e.latestBoxOffice.contentController.content=t,e.categories.content.push(e.latestBoxOffice,e.inTheaters,e.upcoming,e.topDvdRentals),e.categories.select(e.latestBoxOffice),t}).then(function(t){t&&t.length>0&&e.preloadMovie(t[0])});return t.then(function(){return[e.loadUpcomingMovies(),e.loadTopRated(),e.loadPopular()]}).spread(function(t,n,o){return e.upcoming.contentController.content=t,e.topDvdRentals.contentController.content=n,e.inTheaters.contentController.content=o,[t,n,o]}).spread(function(t,n,o){t&&t.length>0&&e.preloadMovie(t[0]),n&&n.length>0&&e.preloadMovie(n[0]),o&&o.length>0&&e.preloadMovie(o[0])}).done(),t}},categories:{value:null},latestBoxOffice:{value:null},upcoming:{value:null},topDvdRentals:{value:null},inTheaters:{value:null},loadLatestBoxOfficeMovies:{value:function(){return sharedTransport.makeRequest(BOX_OFFICE_FEED+this.defaultParams,"tmdb").then(function(e){return e.results})}},loadUpcomingMovies:{value:function(){return sharedTransport.makeRequest(UPCOMING_FEED+this.defaultParams,"tmdb").then(function(e){return e.results})}},loadTopRated:{value:function(){return sharedTransport.makeRequest(TOP_RATED_FEED+this.defaultParams,"tmdb").then(function(e){return e.results})}},loadPopular:{value:function(){return sharedTransport.makeRequest(POPULAR_FEED+this.defaultParams,"tmdb").then(function(e){return e.results})}},loadMovie:{value:function(e){return sharedTransport.makeRequest(MOVIE+e.id+this.defaultParams+"&append_to_response=trailers","tmdb").then(function(e){return e})}},loadReleases:{value:function(e){return sharedTransport.makeRequest(MOVIE+e.id+"/releases"+this.defaultParams,"tmdb").then(function(e){return e})}},preloadMovie:{value:function(e){if(e&&!e.loaded){var t,n=this;return e.loaded=!0,this.loadMovie(e).then(function(e){return t=e.runtime,n.loadReleases(e)}).then(function(o){var r=o.countries[0].certification;0===r.length&&(r="none");for(var a=0,l=n.categories.content.length;a<l;a++)for(var i=n.categories.content[a],c=i.contentController.content?i.contentController.content.length:0,s=0;s<c;s++){var u=i.contentController.content[s];u.id===e.id&&(i.contentController.content[s].mpaaRating=r,i.contentController.content[s].runtime=t,i.contentController.content[s].loaded=!0)}})}return Promise.resolve()}},handleMovieSelectionChange:{value:function(){var e=this,t=this.categories.selection.one();if(t&&t.contentController&&t.contentController.selection)for(var n=0,o=t.contentController.content.length;n<o;n++){var r=t.contentController.content[n];if(r===t.contentController.selection[0]){this.preloadMovie(t.contentController.content[n+1]).then(e.preloadMovie.bind(e,t.contentController.content[n+2])).then(e.preloadMovie.bind(e,t.contentController.content[n+3]));break}}}}}),exports.shared=new exports.TmdbService;