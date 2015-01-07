function callPics (options) {
	if(new Date().getFullYear() >= year_of_interest && year_of_interest >= 2014){
		$('#mainGallery').html(waitLoading);
		var src = 'https://api.mongolab.com/api/1/databases/webinfo/collections/events?q={%22year%22:'+year_of_interest+'}&apiKey=ST64G4MrsqqqiAWcWx41zPuDbwraAZ0U';
		console.log(src);
	$.ajax({url:src,
			async:true,
			//dataType: 'jsonp'
		}).done(function(data){
				data = data[0].data;
			//Load Newsbits
				gallery.more = data;
				gallery.current = data[new Date().getUTCMonth()+1 + "/" + new Date().getUTCFullYear()];
				if(!gallery){console.log({err:'No Data was Retrived'})};
			console.log('gallery loaded!',gallery);
			//Main bar
			if(options.big){
				if(gallery.more[time]){
					$('#mainGallery').html(htmlGallery(gallery.more[time]));
				}else{
					month_of_interest--;
					if(month_of_interest <= 0){
						year_of_interest--;
						month_of_interest = 12;
					};
					time = month_of_interest+'/'+year_of_interest;
					callPics(options);
					var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
					$('#date').val(year_of_interest+'-'+ex+month_of_interest);
					var time_transform = ['Jan-'+year_of_interest,'Feb-'+year_of_interest,'Mar-'+year_of_interest,'Apr-'+year_of_interest,'May-'+year_of_interest,'Jun-'+year_of_interest,'Jul-'+year_of_interest,'Aug-'+year_of_interest,'Sep-'+year_of_interest,'Oct-'+year_of_interest,'Nov-'+year_of_interest,'Dec-'+year_of_interest];
						var avadatelist = Object.getOwnPropertyNames(gallery.more);
						//temp fix
							if(avadatelist[0] == "_id"){avadatelist[0] = avadatelist[1]};
					$('#dateerr').html('<span style="font-size: 15px;text-transform: initial";>'+
											'Sorry, this was the closest date found. <b>Try: </b>'+time_transform[avadatelist[avadatelist.length - 1].replace('/'+year_of_interest,'') - 1]+' to ' +time_transform[avadatelist[0].replace('/'+year_of_interest,'') - 1]+
										'</span>');
					setTimeout(function(){$('#dateerr').html('')},2500)
					
				};
			};
		}).fail(function(d,e){
			console.log({"err":e});
			$('#mainGallery').html('No Data');
		});
		}else{
		year_of_interest = new Date().getFullYear();
		month_of_interest = new Date().getMonth() + 1;
		time = month_of_interest+'/'+year_of_interest;
		callData(options);
		var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
		$('#date').val(year_of_interest+'-'+ex+month_of_interest);
		$('#dateerr').html('<span style="font-size: 15px;text-transform: initial";>Sorry, we do not have events for that year</span>');
	};
};

function retGalleryAndPost(options){
	$.ajax({
		  url: "images/Events/"+year_of_interest+"/"+month_of_interest+"/"+options.id,
		  success: function(data){
		  	var results = '';
		  	//gallery retrival
		    $(data).find("td > a").each(function(i,d){
		     	imgitem = $(this).attr("href");
		     	console.log(imgitem);
		     	if(imgitem.indexOf('main') != 0 && i != 0){
		     		results += thumb_maker({src:"images/Events/"+year_of_interest+"/"+month_of_interest+"/"+options.id+"/"+imgitem});
		     	}
		     });
		    //post
		     	$('#thumbs').html(results);
		  }
		});
};

function htmlGallery(list){
	var results = '';
	list.forEach(function(d,i) {
		var bit = d.eventbit;
			bit.n = i;
		results+=eventbit(bit);
	})
	return results;
};

function eventbit (options) {
	//defaults
	var pic = {src:'http://placehold.it/400x250',href:'#',class:'6u'};
	var text = {title:'Project One',subtitle:'Subheading',class:'5u',text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.'};
	var btn = {text:'View Project', href:'#',class:'News_button'};
	//overide
	if(options){
		if(options.pic){pic=options.pic};
		if(options.text){text = options.text};
		if(options.btn){btn=options.btn};
	};
	//btn.href = '#/gallery/event#&t:'+time+'&&i:'+options.n+'&t:'+text.title;
	pic.class='4u';text.class='6u';pic.href=btn.href;
	//function
  var img = '<div class="'+pic.class+'">'+
	 			'<a href="'+pic.href+'">'+
	 				'<img class="img-responsive" src="'+pic.src+'" alt="">'+
	 			'</a>'+
	 		'</div>';
  var text ='<div class="'+text.class+'">'+
  				'<h3>'+text.title+'</h3>'+
  				'<h4>'+text.subtitle+'</h4>'+
  				'<p>'+text.text+'</p>'+
  				'<a class="'+btn.class+'" href="'+btn.href+'">'+btn.text+'</a>'+
  			'</div>';
	return '<div class="row">' + img + text + '</div>'
};

function thumb_maker (options) {
	var thumb = '<a class="thumbnail" href="'+options.src+'">'+
				'<img class="img-responsive" src="'+options.src+'" alt="">'+
				'</a>';

	return '<div class="3u thumb">'+ thumb +'</div>';
};
//Global Variable
	var imglist =[];
	var gallery={};
	