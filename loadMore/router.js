	app.get("/loadMore", function(req,res){
		var currentIndex = req.query.index;
		var length = req.query.length;
		var data = [];

		for (var i = 0; i < length; i++) {
			data.push("内容" + (parseInt(currentIndex) + i))
		}
		res.send(data);
	});