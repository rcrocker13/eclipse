const margin = 5;
// Pick the place to put our globe
const svg = d3
  .select("body")
  .append("svg");
const sphere = svg
  .append("path")
  .attr("id", "sphere")
  .datum({ type: "Sphere" })
  .style("fill","#94C532");
const graticule = d3.geoGraticule();
const land = svg
  .append("path");
const eclipsesG = svg
  .append("g")
  .classed("eclipses", true);
const projection = d3
  .geoOrthographic()
  // .scale(200)
  // .translate([200,200])
  // .center([0,0])
  .rotate([-80, -35]);
const path = d3
  .geoPath()
  .projection(projection);

function draw() {
  const width = Math.min(960, window.innerWidth),
    height = Math.min(800, window.innerHeight);
    projection
      .fitExtent(
        [
          [margin, margin],
          [width - margin, height - margin]
        ], {type: "Sphere"});

  svg
    .attr("width", width)
    .attr("height", height);

  svg.selectAll("path")
    .attr("d", path);

  eclipsesG
    .selectAll('path')
    .style('fill-opacity', 0.6);

  svg
    .selectAll("path")
    .attr("d", path);
}

d3
  .queue()
  .defer(d3.json, "data/world.json")
  .defer(d3.json, "data/eclipse.json")
  .await(function(error, file1, file2) {
    createGlobe(file1, file2);
  });

function createGlobe(world, eclipses) {

svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);

  land
    .datum(topojson.feature(world, world.objects.land))
    .style("fill", "#3A5315");

  eclipsesG
    .selectAll("path")
    .data(eclipses.features)
    .enter()
    .append("path")
    .style("fill", "#D3CFCE");

  draw();

  // var inertia = d3.geoInertiaDrag(svg, draw);
  // d3.timer(function(e){
  //   if (inertia.timer) return;
  //   var rotate = projection.rotate();
  //   projection.rotate([rotate[0] - 0.5, rotate[1], rotate[2]]);
  //   draw();
  // })
}