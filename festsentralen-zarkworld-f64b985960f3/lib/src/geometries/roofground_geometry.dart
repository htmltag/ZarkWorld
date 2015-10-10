//*******************************
// Author: Jonathan Søyland-Lier
// Wall geometry class
//******************************

part of zarkworld;

class RoofGroundGeometry {
  double size;
  THREE.PlaneGeometry roofGroundGeometry;

  RoofGroundGeometry(this.size) {
    this.roofGroundGeometry =
        new THREE.PlaneGeometry(this.size, this.size, 1, 1);
  }
}
