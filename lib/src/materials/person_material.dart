//*************************************
// Author: Jonathan Søyland-Lier
// Persons materials
//*************************************

part of zarkworld;

class PersonMaterial {
  PersonMaterial();

  static num torsoColor = 0x66AEFF;
  static num headColor = 0xFFE5BB;
  static num leftArmColor = 0x6FA2FF;
  static num rightArmColor = 0x6FA2FF;
  static num leftLegColor = 0xD8D7FF;
  static num rightLegColor = 0xD8D7FF;

  PersonMaterialParts Jacob() {
    THREE.Material torso = new THREE.MeshPhongMaterial(color: torsoColor);
    THREE.Material head = new THREE.MeshPhongMaterial(color: headColor);
    THREE.Material lArm = new THREE.MeshPhongMaterial(color: leftArmColor);
    THREE.Material rArm = new THREE.MeshPhongMaterial(color: rightArmColor);
    THREE.Material lLeg = new THREE.MeshPhongMaterial(color: leftLegColor);
    THREE.Material rLeg = new THREE.MeshPhongMaterial(color: rightLegColor);
    PersonMaterialParts materials = new PersonMaterialParts(torso, head, lArm, rArm, lLeg, rLeg);
    return materials;
  }

  PersonMaterialParts JacobBasic() {
    THREE.Material torso = new THREE.MeshBasicMaterial(color: torsoColor);
    THREE.Material head = new THREE.MeshBasicMaterial(color: headColor);
    THREE.Material lArm = new THREE.MeshBasicMaterial(color: leftArmColor);
    THREE.Material rArm = new THREE.MeshBasicMaterial(color: rightArmColor);
    THREE.Material lLeg = new THREE.MeshBasicMaterial(color: leftLegColor);
    THREE.Material rLeg = new THREE.MeshBasicMaterial(color: rightLegColor);
    PersonMaterialParts materials = new PersonMaterialParts(torso, head, lArm, rArm, lLeg, rLeg);
    return materials;
  }
}
