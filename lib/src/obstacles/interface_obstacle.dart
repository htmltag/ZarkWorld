//********************************
// Author: Jonathan Søyland-Lier
// Interface Obstacles
//********************************

part of zarkworld;

class IObstacle {
  ObjectTypes type;
  bool toDelete;
  int strength;
  int hits;
  THREE.Material material;
  THREE.Object3D mesh;

  void hit() {
    this.hits++;
    if (hits <= this.strength) {
      this.toDelete = true;
    }
  }
}
