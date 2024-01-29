import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(30, window.innerWidth/window.innerHeight, 1, 1000);
const ambient_light = new THREE.AmbientLight(0xffffff,0.1);
scene.add(ambient_light);

const pointLight = new THREE.PointLight(0xffffff, 80, 100);
pointLight.position.set(0, 0, 0);
scene.add(pointLight);

const bulb_geo = new THREE.SphereGeometry(0.1);
const bulb_mtr = new THREE.MeshBasicMaterial(
    {color: "yellow"}
);
const bulb = new THREE.Mesh(bulb_geo, bulb_mtr);
scene.add(bulb);

const renderer = new THREE.WebGL1Renderer(
    {
        antialias: true,
    }
);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('App').appendChild(renderer.domElement);


var brick = new THREE.TextureLoader().load('./images/brick.avif');
const cube_geometry = new THREE.BoxGeometry(2,2,2);
const cube_metarial = new THREE.MeshStandardMaterial(
    {map:brick,}
);
const cube = new THREE.Mesh(cube_geometry, cube_metarial);
scene.add(cube);
camera.position.z = 10;
scene.add(cube);

const orbit_con = new OrbitControls(camera, renderer.domElement);
scene.add(orbit_con);
var a = 0;
function animation() {
    requestAnimationFrame(animation);
    cube.position.x = 5*Math.sin(a+=0.01);
    cube.position.z = 5*Math.cos(a+=0.01);
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    renderer.render(scene, camera)
}

animation();