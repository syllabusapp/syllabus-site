var $ = require('jquery');
var THREE = require('three');

if (document.getElementById('three-circle')) {

  function setup(target) {
    var height = target.offsetHeight;
    var width = target.offsetWidth;
    return {height: height, width: width};
  }

  function circle() {
    var target = document.getElementById('three-circle');
    var config = setup(target);
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(25, config.width / config.height, 0.1, 1000);
    camera.position.y = 20;
    camera.position.z = 45;

    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(target.offsetWidth, target.offsetWidth);
    target.appendChild(renderer.domElement);

    var circleGeometry = new THREE.BoxGeometry(10, 10, 10);
    var circleMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, emissive: 0xF1AD71});
    var circle = new THREE.Mesh(circleGeometry, circleMaterial);
    camera.lookAt(circle.position);
    scene.add(circle);

    var pointLight = new THREE.SpotLight(0xffffff, 0.4);
    pointLight.position.set(-5, 10, 10);
    scene.add(pointLight);

    function render() {
      requestAnimationFrame(render);
      circle.rotation.x += 0.005;
      circle.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    render();
  }
  circle();

  function cone() {
    var target = document.getElementById('three-cone');
    var config = setup(target);
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(25, config.width / config.height, 0.1, 1000);
    camera.position.y = 20;
    camera.position.z = 45;

    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(target.offsetWidth, target.offsetWidth);
    target.appendChild(renderer.domElement);

    var coneGeometry = new THREE.ConeGeometry(9, 13, 5);
    var coneMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, emissive: 0x58AFCE});
    var cone = new THREE.Mesh(coneGeometry, coneMaterial);
    camera.lookAt(cone.position);
    cone.position.y = 2;
    scene.add(cone);

    var pointLight = new THREE.SpotLight(0xffffff, 0.4);
    pointLight.position.set(-5, 10, 10);
    scene.add(pointLight);

    function render() {
      requestAnimationFrame(render);
      cone.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    render();
  }
  cone();

  function ico() {
    var target = document.getElementById('three-ico');
    var config = setup(target);
    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(25, config.width / config.height, 0.1, 1000);
    camera.position.y = 20;
    camera.position.z = 45;

    var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(target.offsetWidth, target.offsetWidth);
    target.appendChild(renderer.domElement);

    var icoGeometry = new THREE.IcosahedronGeometry(9, 0);
    var icoMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, emissive: 0x91D1A9});
    var ico = new THREE.Mesh(icoGeometry, icoMaterial);
    camera.lookAt(ico.position);
    scene.add(ico);

    var pointLight = new THREE.SpotLight(0xffffff, 0.4);
    pointLight.position.set(-5, 10, 10);
    scene.add(pointLight);

    function render() {
      requestAnimationFrame(render);
      ico.rotation.x += 0.005;
      ico.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    render();
  }
  ico();

}

// ------------------------------------

$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};

$("#contact").on("submit", function(e) {
  e.preventDefault();
  var data = $(this).serializeObject();
  $("#contact .btn").addClass("is-disabled").attr("disabled", true).attr("value", "Sending...");
  $.ajax({
      url: "https://formspree.io/hello@syllabusapp.com", 
      method: "POST",
      data: data,
      dataType: "json"
  })
  .done(function() {
    $("#contact").replaceWith("<div class='card'><h2 class='heading heading--xl'>Thanks for your interest!</h2><p class='mb0'>We will reach out soon.</p></div>");
    $("html, body").animate({
      scrollTop: $("#finished").offset().top - 40
    }, 500);
  })
  .fail(function() {
    $("#contact .btn").removeClass("is-disabled").addClass("is-errored").attr("value", "Oops! Please email hello@syllabusapp.com");  
  });
});
