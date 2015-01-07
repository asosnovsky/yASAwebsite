//Creation
Array.prototype.CreateList = function(options){
	if(options){
		if(options.type){type=options.type};
	};
	var results = '';
		this.forEach(function(d,i){
			options.id=i;
			results += CreateItem(d,options);
		});
	return results;
};
function CreateItem(arg,options){
	var innerTime = (new Date(arg.time).getMonth()+1) +'-'+arg.time.substr(arg.time.length-4,arg.time.length);
	var holders = {open:'<li>',close:'</li>'};

	var h3 = arg.h3 || arg.title;
	var h7 = arg.h7 || arg.time;
	var a = {link:'#/news/article#&t:'+ innerTime +'&&i:' + options.id + '&t:' + h3.replace(/ /g,'_')};

	var img = arg.img;
		img.width = 150;
		img.height = 150;

	var p = arg.p ||arg.text; 

	if(options){
		if(options.numofchar){
			var dotdotdot = '';
			if(options.numofchar < p.length){dotdotdot = '...'}
			p = p.replace(/(<([^>]+)>)/ig,'').substr(0,options.numofchar)+dotdotdot;
		};
		if(options.imgsize){
			img.width = options.imgsize.width;
			img.height = options.imgsize.height;
		};
		if(options.holders){
			holders = options.holders
			if(holders.open == '<li>' || holders == 'list'){holders = {open:'<li>',close:'</li>'}};
			if(holders.open == '<div class="row">' || holders == 'row'){holders = {open:'<div class="row">',close:'</div>'};};
			if(holders == '9u' || holders.open == '<div class="9u">'){
				holders = {open:'<div class="9u">',close:'</div>'};
				img = arg.banner;
					img.width = 500;
					img.height;
			};
		};
	};

	var id;if(holders.open == '<div class="row">'){id = options.id + 1}else{id = options.id};
	var bg_color; if(id% 2 !== 0) {bg_color = 'background-color: #FBE6E6;';}else{bg_color = 'background-color: #FFF6F6;';}
	
	var results;//console.log('inside option'+id,options);
	if(holders.open == '<li>'){results = holders.open + 
										'<div class="newsbit listbit" style="'+ bg_color +'">' + 
											'<a href="' + a.link + '">'+
												'<h3>' + h3 + '</h3>'+
												'<h7>' + h7 + '</h7>'+
											'</a>'+
											'<p>' + p + '</p>' + 
										'</div>' + 
										holders.close;
							};
	if(holders.open == '<div class="row">'){results = '<div class="row" style="'+ bg_color +'">'+
														'<a href="'+ a.link +'">' + 
															'<div class="2u">'+
																		'<img src="' + arg.img.src + '"'+
																			' class="newsbit rowimg" '+
																			' width="'+ img.width +'" '+
																			' height="'+ img.height +'"'+
																			' style="float: left;";>'+
														    '</div>'+
														  	'<div class="7u">'+
														  		'<div class="row">'+
																  	'<h3>' + h3 + '</h3><br>'+
																  	'<h7>' + h7 + '</h7><br>'+
																  	'<p style="margin-bottom:0px">' + p + '</p>'+
															  	'</div>' +
															  	'<div class="row">'+
															  		//'<div class="3u">'+
															  			'<a href="'+ a.link +'" class="News_button" style="text-align: center;">More</a>'+
															  		//'</div>' +
															  	'</div>' +
														  	'</div>' + 
														'</a>'+
													holders.close;
										};
	if(holders.open == '<div class="9u">'){results = '<div class="newsbit 9ubit" >'+
														'<header>'+
															'<a href="'+ img.link +'">'+
																'<img src="'+ img.src +'" width="'+ img.width +'" height="'+ img.height +'">'+
															'</a>'+
															'<h2>' + h3 + '</h2>'+
															'<span class="byline">' + h7 + '</span>'+
														'</header><br>'+
														'<p>' + p + '</p>'+
													  '</div>'
										};
	return results;
};
//Carousel
function logoCarousel() {
	$('.logoCarousel').slick({
		  centerMode: true,
		  centerPadding: '60px',
		  slidesToShow: 3,
		  responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 3
		      }
		    },
		    {
		      breakpoint: 480,
		      settings: {
		        arrows: false,
		        centerMode: true,
		        centerPadding: '40px',
		        slidesToShow: 1
		      }
		    }
		  ]
		});	
};