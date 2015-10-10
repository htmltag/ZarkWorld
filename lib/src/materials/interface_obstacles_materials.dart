//**********************************
// Author: Jonathan Søyland-lier
// Interface obstacles materials
//**********************************

part of zarkworld;

class IObstaclesMaterials {
  //Colors
  static num dirt;
  static num stone;
  static num steel;
  static num wood;
  static num bricks;
  static num groundBricks;

  THREE.Material blockDirt() => new THREE.MeshPhongMaterial(color: dirt);

  THREE.Material blockStone() => new THREE.MeshPhongMaterial(color: stone);

  THREE.Material blockSteel() => new THREE.MeshPhongMaterial(color: steel);

  THREE.Material blockWood() => new THREE.MeshPhongMaterial(color: wood);

  THREE.Material wallBrick() => new THREE.MeshPhongMaterial(color: bricks);

  THREE.Material groundBrick() =>
      new THREE.MeshPhongMaterial(color: groundBricks);

  //shader
  THREE.Material brickwall() {
    THREE.Material bricksMaterial = new THREE.ShaderMaterial(
        vertexShader: querySelector('#bricksvertexshader').text,
        fragmentShader: querySelector('#bricksfragmentshader').text);
    return bricksMaterial;
  }
}
