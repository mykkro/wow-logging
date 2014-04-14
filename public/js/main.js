$(document).ready(function() {
	
	var eventsDescUri = "data/structures.json"

	var root = $("#eventdocs")

	function displayClasses(cls) {
		var nav = $("#nav")
		var ul = $("<ul>").appendTo(nav)
		for(var i=0; i<cls.length; i++) {
			displayClass(cls[i])
			ul.append($("<li>").html(
				$("<a>").attr("href", "#"+cls[i].name).text(cls[i].name)
			))
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
			.addClass("eventclass def rounded-corners")
			.append($("<a>").attr("name", cls.name))
			.append($("<a>").attr("name", cls.className))
			.append($("<div>").addClass("name").text(cls.name))
			.append($("<div>").addClass("version").html(displayVersion(cls.version)))
			.append($("<div>").addClass("defs").text(cls.className))
		if(cls.extends) {
			out.append(
				$("<a>").attr("href", "#"+cls.extends).html($("<div>").addClass("extends").text(cls['extends'])))
		}
		out.append($("<div>").addClass("description").text(cls.description))		
		if(cls.fields) {
			var fieldsDiv = $("<div>").addClass("fields")
			out.append(fieldsDiv)
			for(var key in cls.fields) {
				displayField(key, cls.fields[key], fieldsDiv)
			}
		}
		root.append(out)
	}

	function displayTypeLink(type) {
		if(type[0].toUpperCase() == type[0]) {
			return $("<a>").attr("href", "#"+type).text(type)
		} else {
			return $("<span>").text(type)
		}
	}

	function displayVersion(ver) {
		return ver ? $("<span>").text(ver) : $("<span>").addClass("version-missing").text("Version number missing!")
	}

	function displayField(name, data, root) {
		console.log("Displaying field "+name, data)
		var out = $("<div>")
			.addClass("field rounded-corners")
			.append($("<div>").addClass("name").text(name))
			.append($("<div>").addClass("title").text(data.title))
			if(data.type == "array") {				
				out.append($("<div>").addClass("arraytype").html(displayTypeLink(data.items.type)))
			} else {
				out.append($("<div>").addClass("type").html(displayTypeLink(data.type)))
			}
		out.append($("<div>").addClass("description").text(data.description))
		root.append(out)
	}

	function displayUseClass(cls) {
		console.log("Display derived class", cls)
		var out = $("<div>")
			.addClass("eventclass use rounded-corners")
			.append($("<a>").attr("name", cls.name))
			.append($("<div>").addClass("name").text(cls.name))
			.append(
				$("<a>").attr("href", "#"+cls.uses).html($("<div>").addClass("uses").text(cls.uses)))
			.append($("<div>").addClass("description").text(cls.description))
		root.append(out)
	}

	Array.prototype.sortOn = function(key){
	    this.sort(function(a, b){
	        if(a[key] < b[key]){
	            return -1;
	        }else if(a[key] > b[key]){
	            return 1;
	        }
	        return 0;
	    });
	}

	$.getJSON(eventsDescUri).done(function(data) {
		console.log(data)
		var cls = data.classes
		cls.sortOn("name")
		displayClasses(cls)
	})
})
