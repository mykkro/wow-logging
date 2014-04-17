$(document).ready(function() {
	
	var eventsDescUri = "data/wow-logging-spec.json"

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

	$("#showList").click(function() {
		$("#views .view").hide()
		$("#eventdocs").show()
		return false
	})

	$("#showDiagram").click(function() {
		$("#views .view").hide()
		$("#classgraph").show()
		return false
	})

	var graph = new joint.dia.Graph;
	var uml = joint.shapes.uml;

	var generateClassInfo = function(c) {
	    var attrs = []
	    var lines = 0
	    if(c.fields) {
	        for(var key in c.fields) {
	            var attr = key + ": " + c.fields[key].type
	            attrs.push(attr)
	            lines++
	        }
	    }
	    return new uml.Class({
	        position: { x:0  , y: 0 },
	        size: { width: 220, height: 40 + lines*16 },
	        name: c.className,
	        attributes: attrs,
	        methods: []
	    })
	}

	var displayDiagram = function(cls) {
		var paper = new joint.dia.Paper({
		    el: $('#paper'),
		    width: 1000,
		    height: 2500,
		    gridSize: 1,
		    model: graph
		});

	    var jointClasses = {}
	    var relations = []
	    _.each(cls, function(c) {
	        if(c.className) {
	            console.log("Processing class: "+c.className)
	            jointClasses[c.className] = generateClassInfo(c)
	        }
	    })
	    _.each(cls, function(c) {
	        if(c.extends && c.className) {
	            var thisClass = jointClasses[c.className]
	            var parentClass = jointClasses[c.extends]
	            relations.push(new uml.Generalization({ source: { id: thisClass.id }, target: { id: parentClass.id }}))
	        }
	    })
	    _.each(jointClasses, function(c) { graph.addCell(c); });
	    _.each(relations, function(r) { graph.addCell(r); });
	    joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false, rankDir: 'RL' });
	}

	$.getJSON(eventsDescUri).done(function(data) {
		console.log(data)
		var cls = data.classes
		cls.sortOn("name")
        $("#api-version").text(data.version)
        $("#api-updated").text(data.lastUpdate)

		displayClasses(cls)
		displayDiagram(cls)
	})
})
