$(document).ready(function() {
	
	var eventsDescUri = "data/events.json"

	var root = $("#eventdocs")

	function displayClasses(cls) {
		for(var i=0; i<cls.length; i++) {
			displayClass(cls[i])
		}
	}

	function displayClass(cls) {
		// class either establishes new event class
		// or uses existing one
		if(cls.uses) {
			displayUseClass(cls)
		} else {
			displayDefClass(cls)
		}
	}

	function displayDefClass(cls) {
		console.log("Display class definition", cls)
		var out = $("<div>")
			.addClass("eventclass def")
			.append($("<h2>").text(cls.name))
			.append($("<h3>").text(cls.className))
			.append($("<h4>").text(cls['extends'] || ""))
			.append($("<div>").text(cls.description))
		root.append(out)
	}

	function displayUseClass(cls) {
		console.log("Display derived class", cls)
		var out = $("<div>")
			.addClass("eventclass use")
			.append($("<h2>").text(cls.name))
			.append($("<h3>").text(cls.uses))
			.append($("<div>").text(cls.description))
		root.append(out)
	}

	$.getJSON(eventsDescUri).done(function(data) {
		console.log(data)
		displayClasses(data.classes)
	})
})
