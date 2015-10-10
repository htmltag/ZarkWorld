//************************************
// Author: Jonathan Søyland-Lier
// Sets up some basic light
//************************************

part of zarkworld;

class BasicLight {
  THREE.AmbientLight ambient;
  THREE.DirectionalLight directional;
  THREE.PointLight point;

  BasicLight() {
    this.ambient = new THREE.AmbientLight(0x070707);
    this.directional = new THREE.DirectionalLight(0xffffff, 0.6);
    this.point = new THREE.PointLight(0xff4400, intensity: 1.5, distance: 50.0);
    this.point.position.setValues(100.0, 50.0, 100.0);
  }
}
