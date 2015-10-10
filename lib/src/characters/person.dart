//***************************************************
// Author: Jonathan Søyland-lier
// Base class for a person
//***************************************************

part of zarkworld;

class Person {
  THREE.CubeGeometry leftArmCube;
  Vector3 leftArmV3;
  THREE.CubeGeometry rightArmCube;
  Vector3 rightArmV3;
  THREE.CubeGeometry leftLegCube;
  Vector3 leftLegV3;
  THREE.CubeGeometry rightLegCube;
  Vector3 rightLegV3;
  THREE.CubeGeometry torsoCube;
  Vector3 torsoV3;
  THREE.CubeGeometry headCube;
  Vector3 headV3;

  Person(double size) {
    Unitsizes wus = new Unitsizes();
    double usize = wus.unitsize * size;
    double halfsize = usize / 2;
    this.torsoCube = new THREE.CubeGeometry(halfsize, halfsize, halfsize);
    this.torsoCube.faces.removeAt(2); //Remove top face

    this.headCube = new THREE.CubeGeometry(halfsize, halfsize, halfsize);

    this.leftArmCube =
        new THREE.CubeGeometry(wus.unitsize / 8, (wus.unitsize * size) / 2, wus.unitsize / 4);

    this.rightArmCube =
        new THREE.CubeGeometry(wus.unitsize / 8, (wus.unitsize * size) / 2, wus.unitsize / 4);

    this.leftLegCube =
        new THREE.CubeGeometry(wus.unitsize / 4, (wus.unitsize * size) / 8, wus.unitsize / 4);

    this.rightLegCube =
        new THREE.CubeGeometry(wus.unitsize / 4, (wus.unitsize * size) / 8, wus.unitsize / 4);

    this.torsoV3 = new Vector3(0.0, -halfsize, 0.0);

    this.headV3 = new Vector3(0.0, 0.0, 0.0);

    this.leftArmV3 = new Vector3(-wus.unitsize * size / 4, -halfsize, 0.0);

    this.rightArmV3 = new Vector3(wus.unitsize * size / 4, -halfsize, 0.0);

    this.leftLegV3 = new Vector3(-wus.unitsize * size / 4, -usize, 0.0);

    this.rightLegV3 = new Vector3(wus.unitsize * size / 4, -usize, 0.0);
  }
}
