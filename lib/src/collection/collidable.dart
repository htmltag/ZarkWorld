//*************************************
// Author: Jonathan Søyland-Lier
// An collection of collidable objects
//*************************************

part of zarkworld;

class Collidable {
  List<THREE.Object3D> collidableMeshList;

  Collidable() {
    this.collidableMeshList = new List<THREE.Object3D>();
  }
}
