//*************************************
// Author: Jonathan Søyland-Lier
// The player
//*************************************

part of zarkworld;

class Player extends Person {
  THREE.Object3D personObject3D;
  PersonMaterialParts materials;

  Player(double size, this.materials) : super(size) {
    THREE.Mesh torso = new THREE.Mesh(this.torsoCube, materials.torsoMaterial)
      ..name = 'torso'
      ..position.setFrom(this.torsoV3);
    THREE.Mesh head = new THREE.Mesh(this.headCube, materials.headMaterial)
      ..name = 'head'
      ..position.setFrom(this.headV3);
    THREE.Mesh lArm = new THREE.Mesh(this.leftArmCube, materials.leftArmMaterial)
      ..name = 'leftarm'
      ..position.setFrom(this.leftArmV3);
    THREE.Mesh rArm = new THREE.Mesh(this.rightArmCube, materials.rightArmMaterial)
      ..name = 'rightarm'
      ..rotation.x = THREE.degToRad(45)
      ..position.setFrom(this.rightArmV3);
    THREE.Mesh lLeg = new THREE.Mesh(this.leftLegCube, materials.leftLegMaterial)
      ..name = 'leftleg'
      ..position.setFrom(this.leftLegV3);
    THREE.Mesh rLeg = new THREE.Mesh(this.rightLegCube, materials.rightLegMaterial)
      ..name = 'rightleg'
      ..position.setFrom(this.rightLegV3);

    this.personObject3D = head; //build around the torso.
    this.personObject3D.add(torso);
    this.personObject3D.add(lArm);
    this.personObject3D.add(rArm);
    this.personObject3D.add(lLeg);
    this.personObject3D.add(rLeg);
    //this.personObject3D.rotation.y = THREE.degToRad(90);
  }
}
