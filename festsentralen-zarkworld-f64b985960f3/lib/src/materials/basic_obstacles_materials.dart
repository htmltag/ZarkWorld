//**********************************
// Author: Jonathan Søyland-lier
// Basic materials
//**********************************

part of zarkworld;

class BasicObstaclesMaterials implements IObstaclesMaterials {
  //Colors
  static num dirt = 0xFF5B0E;
  static num stone = 0xC9D9E8;
  static num steel = 0xDDF8FF;
  static num wood = 0xE88036;
  static num bricks = 0x663366;
  static num groundBricks = 0x660066;

  THREE.Texture floorTexture;

  BasicObstaclesMaterials() {
    floorTexture = ImageUtils.loadTexture('img/checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.setValues(10.0, 10.0);
  }

  THREE.Material blockDirt() => new THREE.MeshBasicMaterial(color: dirt);

  THREE.Material blockStone() => new THREE.MeshBasicMaterial(color: stone);

  THREE.Material rockStone() =>
      new THREE.MeshBasicMaterial(map: ImageUtils.loadTexture('img/rock.png'));

  THREE.Material ground() => new THREE.MeshBasicMaterial(map: this.floorTexture);

  THREE.Material blockSteel() => new THREE.MeshBasicMaterial(color: steel);

  THREE.Material blockWood() =>
      new THREE.MeshBasicMaterial(map: ImageUtils.loadTexture('img/wood.png'));

  THREE.Material blockLeaves() =>
      new THREE.MeshBasicMaterial(map: ImageUtils.loadTexture('img/leaves.png'));

  THREE.Material wallBrick() => new THREE.MeshBasicMaterial(color: bricks);

  THREE.Material groundBrick() => new THREE.MeshBasicMaterial(color: groundBricks);

  //shader
  THREE.Material brickwall() {
    THREE.Material bricksMaterial = new THREE.ShaderMaterial(
        vertexShader: querySelector('#bricksvertexshader').text,
        fragmentShader: querySelector('#bricksfragmentshader').text);
    return bricksMaterial;
  }
}
