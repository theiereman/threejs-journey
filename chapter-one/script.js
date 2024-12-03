import * as THREE from "three";

const scene = new THREE.Scene();
const canvas = document.querySelector("canvas.webgl");

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

//mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.rotateX(0.5);
mesh.rotateY(0.5);

scene.add(mesh);

//camera
const sizes = {
  height: 800,
  width: 600,
};
const perspectiveCam = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height
);
perspectiveCam.position.z = 3;
scene.add(perspectiveCam);

//renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, perspectiveCam);
