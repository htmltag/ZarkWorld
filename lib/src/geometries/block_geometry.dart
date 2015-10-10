//*******************************
// Author: Jonathan Søyland-Lier
// Block geometry class
//******************************

part of zarkworld;

class BlockGeometry {
  double size;
  THREE.CubeGeometry blockGeometry;

  BlockGeometry(this.size) {
    this.blockGeometry =
        new THREE.CubeGeometry(this.size, this.size, this.size, 1, 1, 1);
  }
}
