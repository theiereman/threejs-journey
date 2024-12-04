import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);

const debugObject = {
  color: "#134ed8",
  subdivisions: 2,
  spin: () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
  },
  scale: () => {
    gsap.to(camera.position, {
      duration: 1,
      z: camera.position.z * 1.75,
    });
    gsap.to(mesh.scale, {
      duration: 1,
      x: mesh.scale.x * 2,
      ease: "bounce.out",
    });
  },
};

const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
});

// Object
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  1,
  100
);
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -2 * aspectRatio,
//   2 * aspectRatio,
//   2,
//   -2,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(mesh.position);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const gui = new GUI({ title: "Debug UI" });
gui.add(mesh.position, "y", -1, 1, 0.001);
gui.add(mesh, "visible");

gui.add(material, "wireframe");
gui.addColor(debugObject, "color").onChange((value) => {
  material.color.set(value);
});
gui.add(debugObject, "spin");
gui.add(debugObject, "scale");

gui
  .add(debugObject, "subdivisions")
  .step(1)
  .min(1)
  .max(20)
  .onChange(() => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivisions,
      debugObject.subdivisions,
      debugObject.subdivisions
    );
  });

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  //camera position
  //   camera.position.x = Math.sin(cursor.x * (Math.PI * 2)) * 2;
  //   camera.position.y = cursor.y * 2;
  //   camera.position.z = Math.cos(cursor.x * (Math.PI * 2)) * 2;
  //   camera.lookAt(mesh.position);

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
