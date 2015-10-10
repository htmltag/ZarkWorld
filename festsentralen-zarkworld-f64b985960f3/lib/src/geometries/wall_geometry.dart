//*******************************
// Author: Jonathan Søyland-Lier
// Wall geometry class
//******************************

part of zarkworld;

class WallGeometry {
  double size, height;
  THREE.CubeGeometry wallGeometry;

  WallGeometry(this.size, this.height) {
    this.wallGeometry = new THREE.CubeGeometry(this.size, this.height, 30.0);
  }
}
