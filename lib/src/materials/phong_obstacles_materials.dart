//**********************************
// Author: Jonathan Søyland-lier
// Phong materials
//**********************************

part of zarkworld;

class PhongObstaclesMaterials implements IObstaclesMaterials {
  //Colors
  static num dirt = 0xFF5B0E;
  static num stone = 0xC9D9E8;
  static num steel = 0xDDF8FF;
  static num wood = 0xE88036;
  static num bricks = 0x663366;
  static num groundBricks = 0x660066;

  THREE.Material blockDirt() => new THREE.MeshPhongMaterial(color: dirt);

  THREE.Material blockStone() => new THREE.MeshPhongMaterial(color: stone);

  THREE.Material blockSteel() => new THREE.MeshPhongMaterial(color: steel);

  THREE.Material blockWood() => new THREE.MeshPhongMaterial(color: wood);

  THREE.Material wallBrick() => new THREE.MeshPhongMaterial(color: bricks);

  THREE.Material groundBrick() => new THREE.MeshPhongMaterial(color: groundBricks);

  //shader
  THREE.Material brickwall() {
    THREE.Material bricksMaterial = new THREE.ShaderMaterial(
        vertexShader: querySelector('#bricksvertexshader').text,
        fragmentShader: querySelector('#bricksfragmentshader').text);
    return bricksMaterial;
  }
}
