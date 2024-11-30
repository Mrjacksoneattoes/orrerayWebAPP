import './style.css'

import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

   // Créer une scène
   const scene = new THREE.Scene();

   // Créer un moteur de rendu
   const renderer = new THREE.WebGLRenderer();
   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   // Créer une caméra
   const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.z = 50;

   // Créer les contrôles d'orbite
   const controls = new OrbitControls(camera, renderer.domElement);
   controls.enableZoom = true;
   controls.enablePan = true;

   // Fonction pour créer une planète
   function createPlanet(size, color, position) {
       const geometry = new THREE.SphereGeometry(size, 32, 32);
       const material = new THREE.MeshBasicMaterial({ color: color });
       const planet = new THREE.Mesh(geometry, material);
       planet.position.set(position.x, position.y, position.z);
       return planet;
   }

   // Fonction pour dessiner une orbite
   function drawOrbit(radius) {
       const points = [];
       const segments = 100; // Nombre de segments pour l'orbite
       for (let i = 0; i <= segments; i++) {
           const angle = (i / segments) * Math.PI * 2; // Angle en radians
           const x = radius * Math.cos(angle);
           const z = radius * Math.sin(angle);
           points.push(new THREE.Vector3(x, 0, z));
       }
       const geometry = new THREE.BufferGeometry().setFromPoints(points);
       const material = new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.5, transparent: true });
       const orbit = new THREE.LineLoop(geometry, material);
       return orbit;
   }

   // Ajouter des planètes et leurs orbites à la scène
   const sun = createPlanet(5, 0xffff00, { x: 0, y: 0, z: 0 });
   const earth = createPlanet(1, 0x0000ff, { x: 10, y: 0, z: 0 });
   const mars = createPlanet(0.5, 0xff0000, { x: 15, y: 0, z: 0 });

   scene.add(sun);
   scene.add(earth);
   scene.add(mars);

   // Ajouter les orbites
   const earthOrbit = drawOrbit(10);
   const marsOrbit = drawOrbit(15);
   scene.add(earthOrbit);
   scene.add(marsOrbit);

   // Variables pour contrôler le mouvement orbital
   let earthAngle = 0;
   let marsAngle = 0;
   const earthSpeed = 0.01; // Vitesse de la Terre
   const marsSpeed = 0.005; // Vitesse de Mars

   // Fonction d'animation
   function animate() {
       requestAnimationFrame(animate);

       // Mettre à jour les contrôles
       controls.update();

       // Mettre à jour la position des planètes
       earthAngle += earthSpeed;
       marsAngle += marsSpeed;

       // Positionner la Terre
       earth.position.x = 10 * Math.cos(earthAngle);
       earth.position.z = 10 * Math.sin(earthAngle);

       // Positionner Mars
       mars.position.x = 15 * Math.cos(marsAngle);
       mars.position.z = 15 * Math.sin(marsAngle);

       // Rendu de la scène
       renderer.render(scene, camera);
   }

   animate();