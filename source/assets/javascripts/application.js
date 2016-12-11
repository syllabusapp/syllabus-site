var THREE = require('three');

var cone = document.getElementById('three-cone');
var height = cone.offsetHeight;
var width = cone.offsetWidth;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 1000);
camera.position.y = 20;
camera.position.z = 45;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(cone.offsetWidth, cone.offsetHeight);
renderer.setClearColor(new THREE.Color(0xffffff));
cone.appendChild(renderer.domElement);

var geometry = new THREE.ConeGeometry(8, 12, 100);
var material = new THREE.MeshLambertMaterial({
										 color: 0x568298,
										 emissive: 0x6795ac
									 });
var cone = new THREE.Mesh(geometry, material);
cone.position.y = 5;

camera.lookAt(cone.position);

scene.add(cone);

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-5, 10, 10);
 
scene.add(pointLight);

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
