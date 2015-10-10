//************************************
// Author: Jonathan Søyland-Lier
// Wall class
//************************************

part of zarkworld;

class Wall extends WallGeometry implements IObstacle {
  ObjectTypes type;
  bool toDelete;
  int strength;
  int hits;
  THREE.Material material;
  THREE.Object3D mesh;

  Wall(double size, double wallHeight, this.material) : super(size, wallHeight) {
    this.toDelete = false;
    this.hits = 0;
    arrangeWalls();
  }

  void arrangeWalls() {
    THREE.Mesh wall = new THREE.Mesh(this.wallGeometry, this.material);
    wall.scale.x = 1.1;
    wall.position.y = this.height / 2;
    wall.name = 'wall';

    THREE.Mesh wall2 = new THREE.Mesh(this.wallGeometry, this.material);
    wall2.position.y = this.height / 2;
    wall2.name = 'wall';

    THREE.Mesh wall3 = new THREE.Mesh(this.wallGeometry, this.material);
    wall3.position.y = this.height / 2;
    wall3.name = 'wall';

    THREE.Mesh wall4 = new THREE.Mesh(this.wallGeometry, this.material);
    wall4.scale.x = 1.1;
    wall4.position.y = this.height / 2;
    wall4.name = 'wall';

    List<THREE.Mesh> walls = new List<THREE.Mesh>();
    walls.add(wall);
    walls.add(wall2);
    walls.add(wall3);
    walls.add(wall4);

    //Rotate and position
    walls[0].rotation.y = -Math.PI / 2;
    walls[0].position.x = this.size / 2;
    walls[1].position.z = -this.size / 2;
    walls[2].rotation.y = THREE.degToRad(180);
    walls[2].position.z = this.size / 2;
    walls[3].rotation.y = THREE.degToRad(90);
    walls[3].position.x = -this.size / 2;

    this.mesh = new THREE.Object3D();
    for (int i = 0; i < walls.length; i++) {
      this.mesh.add(walls[i]);
    }
  }

  //Do nothing. Can't break walls
  void hit() {}
}
