function changeDate(){
	year_of_interest = $('#date').val().split('-')[0];
	month_of_interest = parseFloat($('#date').val().split('-')[1]).toString();
	time = month_of_interest+'/'+year_of_interest;

	if(window.location.hash.substr(0,3) == "#/n"){
		$('#dateerr').html('');
		$('#recent_news_small').html(waitLoading);
		$('#recent_news_big').html(waitLoading);
		callData({sidebar:true,news_big:true,news_big_main:false});
	}

	if(window.location.hash.substr(0,3) == "#/g"){
		$('#mainGallery').html(waitLoading);
		callPics({big:true});
	}
	
};

function callData(options){
	if(new Date().getFullYear() >= year_of_interest && year_of_interest >= 2014){
	$('#mainGallery').html(waitLoading);
	var src = 'https://api.mongolab.com/api/1/databases/webinfo/collections/news?q={%22year%22:'+year_of_interest+'}&apiKey=ST64G4MrsqqqiAWcWx41zPuDbwraAZ0U';
		$.ajax({url:src,
			//url:'http://yuasa-data271828.herokuapp.com/mongo/List/news/'+year_of_interest+'?xpt_yuASA_data_info_pack_271828=?',
			async:true,
			//dataType: 'jsonp'
		}).done(function(data){
				data = data[0].data;
			//Load Newsbits
			news.more = data;
			news.current = data[new Date().getMonth()+1 + "/" + new Date().getFullYear()];
			if(!news){console.log({err:'No Data was Retrived'})};
			if(!news.current){news.current = data[new Date().getMonth() + "/" + new Date().getFullYear()];};
			
			//Parse recent news side bar
			if(options.sidebar){
				thismonth = news.current;
				if (news.current.length <= 5) {
					for (var i = 5 - news.current.length - 1; i >= 0; i--) {
						news.current.push(news.more[new Date().getMonth() + "/" + new Date().getFullYear()][i]);
					};
				};
				$('#recent_news_small').html(news.current.CreateList({
					holders:'list',
					numofchar:100
				}));
				news.current = thismonth;
			};
			//Main bar
			if(options.news_big){
				if(news.more[time]){
					$('#recent_news_big').html(news.more[time].CreateList({
						holders:'row',
						numofchar:100,
						imgsize:{width:150,height:150}
					}));
				}else{
					month_of_interest--;
					if(month_of_interest == 0){
						year_of_interest--;
						month_of_interest = 12;
					};
					time = month_of_interest+'/'+year_of_interest;
					callData(options);
					var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
					$('#date').val(year_of_interest+'-'+ex+month_of_interest);
					var time_transform = ['Jan-'+year_of_interest,'Feb-'+year_of_interest,'Mar-'+year_of_interest,'Apr-'+year_of_interest,'May-'+year_of_interest,'Jun-'+year_of_interest,'Jul-'+year_of_interest,'Aug-'+year_of_interest,'Sep-'+year_of_interest,'Oct-'+year_of_interest,'Nov-'+year_of_interest,'Dec-'+year_of_interest];
						var avadatelist = Object.getOwnPropertyNames(news.more);
					$('#dateerr').html('<span style="font-size: 15px;text-transform: initial";>'+
											'Sorry, this was the closest date found. <b>Try: </b>'+time_transform[avadatelist[avadatelist.length - 1].replace('/'+year_of_interest,'') - 1]+' to ' +time_transform[avadatelist[0].replace('/'+year_of_interest,'') - 1]+
										'</span>');
					setTimeout(function(){$('#dateerr').html('')},3000)
					
				};
			};
			//Parse home-page news
			if(options.news_big_main){
				$('#recent_news_big_main').html('<p style="text-align:left"><a href="#/news"><u><h2>Latest News!</h2></u></a></p>'+CreateItem(news.current[0],{
					holders:'row',
					numofchar:100,
					imgsize:{width:150,height:150},
					id:0
				}));
			};
			//Parse Article
			if(options.article){
				$('#news_specifc').html(CreateItem(news['more'][time][id],{
					holders:'9u',
					imgsize:{width:500}
				}));
			};
		}).fail(function(e,d) {
			console.log({"error":d});
			$('#recent_news_small').html('!error!');
			$('#recent_news_big').html('!error!');
			$('#recent_news_big_main').html('!error!');
			$('#news_specifc').html('!error!');
		});
	}else{
		year_of_interest = new Date().getFullYear();
		month_of_interest = new Date().getMonth() + 1;
		time = month_of_interest+'/'+year_of_interest;
		callData(options);
		var ex;if(month_of_interest.toString().length == 1){ex = 0}else{ex = ''};
		$('#date').val(year_of_interest+'-'+ex+month_of_interest);
		$('#dateerr').html('<span style="font-size: 15px;text-transform: initial";>Sorry, we do not have news for that year</span>');
	};
};

//Global Variable
var year_of_interest;
var month_of_interest;
var news = {};
var id;
var time;