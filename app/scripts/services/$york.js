'use strict';
/**
 * @ngdoc function
 * @name yuAsaApp.service:$york
 * @description
 * # $york
 * service of the yuAsaApp
 */
angular.module('yuAsaApp')
	.service('$york', function ($location, $http, $sce) {
	/**
	 * Go to Address
	 * 
	 * @param  {String} path
	 *
	 * @param  {String} hash
	 * 
	 */
	this.goTo = function goTo (path, hash) {
		if(!hash) {
			hash = '';
		}
		// console.log(path);
		$location.path(path).replace();
		$location.hash(hash);
		window.scrollTo(0,0);
	};
	/**
	 * Returns Tumblr Data
	 * 
	 * @return {Object}
	 * 
	 */
	this.tumblr = (function () {
		//-----------------------------------------
		//	Api Variables
		//-----------------------------------------
		var API_LOC = '//api.tumblr.com/v2/blog/';//	Location of API
		var API_DIR = 'asayorku.tumblr.com/posts';//	Directory of blog
		var API_KEY = '9JEt1AQMzS7zhaLwn9I9kRlyq0MHzW7SkGxyjg3PIGmGKbC1Ek';//	Consumer key
		var JSON_CALLBACK = 'JSON_CALLBACK';//	JSON callback
		var LIM = 200;//	Limit on posts
		
		//-----------------------------------------
		//	Memoization
		//-----------------------------------------
		var tumblr = {	
			posts:[],
			partialposts:[],
			total_posts:'',
			posts_by_id: {}
		};
		//-----------------------------------------
		//	Tumblr Class
		//-----------------------------------------
		function Tumblr () {}

		/**
		 * Gets Tumblr data
		 * 
		 * @param  {Function} cb Callback
		 * 
		 */
		Tumblr.prototype.get = function(cb) {
			if( tumblr.total_posts !== '' ){
				cb(false, tumblr);

			}else{
				//-----------------------------------------
				//	$http call to tumblr
				//-----------------------------------------
				$http.jsonp(API_LOC + API_DIR + '?api_key=' + API_KEY + '&limit=' + LIM + '&callback=' + JSON_CALLBACK)
					.success(function (data) {
						if(data.meta.status === 401 || data.response === []){
							cb(true, {
								title: 'Data Error',
								body: 'Sorry we encoutered some issues with our news-source',
								link: '',
								time: moment().fromNow(),
								img: 'images/error/Error02.jpg'

							});
							throw new Error('Could not retrieve tumblr data; E:' + data.meta.status);
						}
						//-----------------------------------------
						//	Analyze data
						//-----------------------------------------
						$each(data.response.posts, function (value, index) {
			
							var img;//	Define variable

							var imgtext = value.body.substring((value.body.indexOf('<img')),(value.body.indexOf('"/>')+3));//	Get first image
							
							//-----------------------------------------
							//	Attempt to return src of img
							//	if fails return empty
							//-----------------------------------------
							try {
								img = $(imgtext)[0].src;
							}
							catch(err) {
								img = './images/misc/noimage.jpg';
							}
							//-----------------------------------------
							//	Create a full post
							//-----------------------------------------
							tumblr.posts[index] = {
								title: value.title,
								id: value.id,
								body: $sce.trustAsHtml(value.body),
								link: value.post_url,
								time: moment(value.date.replace(' ','T').replace(' GMT','Z')).fromNow(),
								img: img
							};
							window.__value = value;
							//-----------------------------------------
							//	Create a partial posts
							//-----------------------------------------
							tumblr.partialposts[index] = {
								title: value.title,
								id: value.id,
								body: value.body.replace(/<[^>]*>/g, '').substr(0,210)+'...',
								link: value.post_url,
								time: moment(value.date.replace(' ','T').replace(' GMT','Z')).fromNow(),
								img: img
							};

						});

						tumblr.total_posts = data.response.total_posts;

						cb(false, tumblr);
					});
			}
		};

		/**
		 * Request a data point by id
		 * 
		 * @param  {Numerical}   id 
		 * 
		 * @param  {Function} cb Callback
		 * 
		 */
		Tumblr.prototype.request = function(id, cb) {
			//-----------------------------------------
			//	Request full Tumblr data
			//-----------------------------------------
			new Tumblr().get(function (err, data) {
				if(!err){//	if its okay we go
					//-----------------------------------------
					//	If we have it, we return it
					//-----------------------------------------
					if(tumblr.posts_by_id[id]){
						cb(false, tumblr.posts_by_id[id]);
					}else{
						//-----------------------------------------
						//	if we don't have, we find it!
						//-----------------------------------------
						var count = 0;//	Count our errors
						$each(data.posts, function (value, index) {//	Async foreach
							if(parseInt(id) === parseInt(value.id) && index <= tumblr.total_posts){//	if its the id we want, we return it!
								tumblr.posts_by_id[id] = value;//and save it for later calls
								cb(false, value);
							}else if(index <= tumblr.total_posts) {//	if its not, we count an error
								count++;
							}
							if(count === tumblr.total_posts){//	if all came back as errors, let the user know!
								cb(true,{
									title: 'Article Eror',
									body: $sce.trustAsHtml('<p>Sorry we couldn\'t find your article, perhaps the wrong address? or its too old?</p>'),
									link: '',
									time: moment().fromNow(),
									img: 'images/error/Error01.jpg'
								});
							}
						});
					}
				}
			});
		};

		//-----------------------------------------
		//	Exports
		//-----------------------------------------
		return new Tumblr();	
	})();
});