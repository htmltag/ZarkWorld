//*************************************
// Author: Jonathan Søyland-Lier
// Class for the roof and ground
//*************************************

part of zarkworld;

class RoofGround extends RoofGroundGeometry implements IObstacle {
  ObjectTypes type;
  bool toDelete;
  int strength;
  int hits;
  THREE.Material material;
  THREE.Object3D mesh;

  RoofGround(double size, double roofHeight, this.material) : super(size) {
    this.toDelete = false;
    this.hits = 0;
    THREE.Mesh groundMesh = new THREE.Mesh(this.roofGroundGeometry, this.material);
    THREE.Mesh roofMesh = new THREE.Mesh(this.roofGroundGeometry, this.material);
    groundMesh.rotation.x = -Math.PI / 2;
    roofMesh.rotation.x = THREE.degToRad(-270);
    roofMesh.position.y = roofHeight;
    this.mesh = new THREE.Object3D();
    this.mesh.add(groundMesh);
    //this.mesh.add(roofMesh);
  }

  //Do nothing. Cant break roof
  void hit() {}
}
