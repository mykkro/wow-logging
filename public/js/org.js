var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 800,
    height: 600,
    gridSize: 1,
    model: graph,
    perpendicularLinks: true
});

var member = function(x, y, rank, name, image, background, border) {

    var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
            '.card': { fill: background, stroke: border},
              image: { 'xlink:href': '/images/'+ image },
            '.rank': { text: rank }, '.name': { text: name }
        }
    });
    graph.addCell(cell);
    return cell;
};

function link(source, target, breakpoints) {

    var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints
    });
    graph.addCell(cell);
    return cell;
}

var bart = member(300,70,'CEO', 'Bart Simpson', 'member1.png', '#F1C40F', 'gray');
var homer = member(90,200,'VP Marketing', 'Homer Simpson', 'member2.png', '#2ECC71', '#008e09');
var marge = member(300,200,'VP Sales', 'Marge Simpson', 'member3.png', '#2ECC71', '#008e09');
var lisa = member(500,200,'VP Production' , 'Lisa Simpson', 'member4.png', '#2ECC71', '#008e09');
var maggie = member(400,350,'Manager', 'Maggie Simpson', 'member5.png', '#3498DB', '#333');
var lenny = member(190,350,'Manager', 'Lenny Leonard', 'member6.png', '#3498DB', '#333');
var carl = member(190,500,'Manager', 'Carl Carlson', 'member7.png', '#3498DB', '#333');

link(bart, marge, [{x: 385, y: 180}]);
link(bart, homer, [{x: 385, y: 180}, {x: 175, y: 180}]);
link(bart, lisa, [{x: 385, y: 180}, {x: 585, y: 180}]);
link(homer, lenny, [{x:175 , y: 380}]);
link(homer, carl, [{x:175 , y: 530}]);
link(marge, maggie, [{x:385 , y: 380}]);