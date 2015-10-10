//********************************
// Author: Jonathan Søyland-Lier
// Setting up the block object
//********************************

part of zarkworld;

class Block extends BlockGeometry implements IObstacle {
  ObjectTypes type;
  bool toDelete;
  int strength;
  int hits;
  THREE.Material material;
  THREE.Mesh mesh;

  ///Constructs a new block. double size, int strength, THREE.Material material
  Block(double size, this.strength, this.material) : super(size) {
    this.toDelete = false;
    this.hits = 0;
    this.mesh = new THREE.Mesh(this.blockGeometry, this.material);
    this.mesh.name = 'block';
  }

  ///Hits. Count number of hits. Set block toRemove if hits <= strength
  void hit() {
    this.hits++;
    if (hits <= this.strength) {
      this.toDelete = true;
    }
  }
}
