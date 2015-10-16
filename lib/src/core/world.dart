//**************************************************
// Author: Jonathan Søyland-Lier
// Creat the world with scene, camera and renderer
//**************************************************

part of zarkworld;

class World {
  THREE.Scene scene;
  THREE.PerspectiveCamera camera;
  Element container;
  THREE.WebGLRenderer renderer;
  Player jacob;
  Collidable collidable;
  CollisionPlayerObstacles collisionPlayerObstacles;
  THREE.PointLight plight;
  Block block6;
  Player jacob2;
  THREE.Mesh targetMesh;
  bool pointerlockEnabled;
  Block placeBlock;

  Unitsizes us;
  //PhongObstaclesMaterials materials;
  BasicObstaclesMaterials materials;

  World() {
    pointerlockEnabled = false;
    this.us = new Unitsizes();
    //this.materials = new PhongObstaclesMaterials();
    this.materials = new BasicObstaclesMaterials();
    this.collidable = new Collidable();
    this.collisionPlayerObstacles = new CollisionPlayerObstacles();
    this._createScene();
    this._setUpCamera();
    this._setUpLights();
    this._setUpRoom();
    this._setUpPlayer();
    this._addBlock();
    this._setUpThrees();
    this._setUpRenderer();

    this._axisHelper();

    //Small block which shows where to place new block
    this.placeBlock = new Block(us.unitsize / 8, 3, materials.blockDirt());
    this.placeBlock.mesh.visible = false;

    this.renderer.domElement.onMouseDown.listen(this.onMouseDown);
  }

  void _createScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xFFFFFF, 0.001);
  }

  void _setUpCamera() {
    this.camera =
        new THREE.PerspectiveCamera(75.0, window.innerWidth / window.innerHeight, 1.0, 1000.0);
    this.camera.name = 'cam';
  }

  void _setUpLights() {
    BasicLight light = new BasicLight();
    BasicLight light2 = new BasicLight();
    scene.add(light.directional);
    light.directional.position.setValues(-1.0, us.wallHeight - us.unitsize, -1.0);
    scene.add(light2.directional);
    light2.directional.position.setValues(1.0, us.wallHeight - us.unitsize, 1.0);
    scene.add(light.ambient);
  }

  void _setUpRoom() {
    /*
    Wall wall = new Wall(us.wallLenght, us.wallHeight, materials.wallBrick());
    scene.add(wall.mesh);
    for (int i = 0; i < wall.mesh.children.length; i++) {
      this._addToCollidable(wall.mesh.children[i]);
    }
*/
    RoofGround roofGround = new RoofGround(us.wallLenght, us.wallHeight, materials.ground());
    scene.add(roofGround.mesh);
  }

  void _setUpPlayer() {
    double jacobSize = 1.0;
    jacob = new Player(jacobSize, new PersonMaterial().JacobBasic());
    jacob.personObject3D.position.setValues(us.unitsize, us.unitsize, us.unitsize);
    scene.add(jacob.personObject3D);

    jacob2 = new Player(1.0, new PersonMaterial().JacobBasic());
    jacob2.personObject3D.position.setValues(0.0, us.unitsize, us.unitsize * 3);
    scene.add(jacob2.personObject3D);
    this.addToCollidable(jacob2.personObject3D);
  }

  void _addBlock() {
    Block block = new Block(us.unitsize, 3, materials.rockStone());
    block.mesh.position.setValues(block.size, block.size / 2, block.size * 5);
    scene.add(block.mesh);
    this.addToCollidable(block.mesh);

    Block block2 = new Block(us.unitsize, 3, materials.rockStone());
    block2.mesh.position.setValues(block.size, block.mesh.position.y * 3, block.size * 5);
    scene.add(block2.mesh);
    this.addToCollidable(block2.mesh);

    Block block3 = new Block(us.unitsize, 3, materials.rockStone());
    block3.mesh.position.setValues(block.size, block.size / 2, block.size * 4);
    scene.add(block3.mesh);
    this.addToCollidable(block3.mesh);

    Block block4 = new Block(us.unitsize, 3, materials.rockStone());
    block4.mesh.position.setValues(block.size, block.mesh.position.y * 3, block.size * 4);
    scene.add(block4.mesh);
    this.addToCollidable(block4.mesh);

    Block block5 = new Block(us.unitsize, 3, materials.blockDirt());
    block5.mesh.position.setValues(block.size * 2, block.size / 2, block.size * 2);
    scene.add(block5.mesh);
    this.addToCollidable(block5.mesh);

    block6 = new Block(us.unitsize, 3, materials.rockStone());
    block6.mesh.position.setValues(block.size * 6, block.size / 2, block.size * 6);
    scene.add(block6.mesh);
    this.addToCollidable(block6.mesh);

    for (int i = 7; i < 14; i++) {
      for (int j = 1; j < 7; j++) {
        if ((j != 1 && i != 10) || (j != 2 && i != 10)) {
          Block block9 = new Block(us.unitsize, 3, materials.rockStone());
          block9.mesh.position
              .setValues(block.size * i, (block.size * j) - (block.size / 2), block.size * 6);
          scene.add(block9.mesh);
          this.addToCollidable(block9.mesh);
        }
      }
    }

    for (int i = 7; i < 14; i++) {
      for (int j = 1; j < 7; j++) {
        Block block9 = new Block(us.unitsize, 3, materials.rockStone());
        block9.mesh.position
            .setValues(block.size * i, (block.size * j) - (block.size / 2), block.size * 13);
        scene.add(block9.mesh);
        this.addToCollidable(block9.mesh);
      }
    }

    for (int i = 7; i < 14; i++) {
      for (int j = 1; j < 7; j++) {
        Block block9 = new Block(us.unitsize, 3, materials.rockStone());
        block9.mesh.position
            .setValues(block.size * 6, (block.size * j) - (block.size / 2), block.size * i);
        scene.add(block9.mesh);
        this.addToCollidable(block9.mesh);
      }
    }

    for (int i = 7; i < 14; i++) {
      for (int j = 7; j < 14; j++) {
        Block block9 = new Block(us.unitsize, 3, materials.rockStone());
        block9.mesh.position
            .setValues(block.size * j, (block.size * 7) - (block.size / 2), block.size * i);
        scene.add(block9.mesh);
        this.addToCollidable(block9.mesh);
      }
    }

    for (int i = 7; i < 14; i++) {
      for (int j = 1; j < 7; j++) {
        Block block9 = new Block(us.unitsize, 3, materials.rockStone());
        block9.mesh.position
            .setValues(block.size * 14, (block.size * j) - (block.size / 2), block.size * i);
        scene.add(block9.mesh);
        this.addToCollidable(block9.mesh);
      }
    }
  }

  void _setUpThrees() {
    Block threeBlock = new Block(us.unitsize, 3, materials.blockWood());
    threeBlock.mesh.position
        .setValues(threeBlock.size * 8, threeBlock.size / 2, threeBlock.size * 4);
    scene.add(threeBlock.mesh);
    this.addToCollidable(threeBlock.mesh);

    Block threeBlock2 = new Block(us.unitsize, 3, materials.blockWood());
    threeBlock2.mesh.position.setValues(
        threeBlock.size * 8, (threeBlock.size * 2) - (threeBlock.size / 2), threeBlock.size * 4);
    scene.add(threeBlock2.mesh);
    this.addToCollidable(threeBlock2.mesh);

    Block threeBlock3 = new Block(us.unitsize, 3, materials.blockWood());
    threeBlock3.mesh.position.setValues(
        threeBlock.size * 8, (threeBlock.size * 3) - (threeBlock.size / 2), threeBlock.size * 4);
    scene.add(threeBlock3.mesh);
    this.addToCollidable(threeBlock3.mesh);

    Block threeBlock4 = new Block(us.unitsize, 3, materials.blockWood());
    threeBlock4.mesh.position.setValues(
        threeBlock.size * 8, (threeBlock.size * 4) - (threeBlock.size / 2), threeBlock.size * 4);
    scene.add(threeBlock4.mesh);
    this.addToCollidable(threeBlock4.mesh);

    Block threeLeaves = new Block(us.unitsize, 3, materials.blockLeaves());
    threeLeaves.mesh.position.setValues(threeLeaves.size * 8,
        (threeLeaves.size * 4) - (threeLeaves.size / 2), threeLeaves.size * 5);
    scene.add(threeLeaves.mesh);
    this.addToCollidable(threeLeaves.mesh);

    Block threeLeaves2 = new Block(us.unitsize, 3, materials.blockLeaves());
    threeLeaves2.mesh.position.setValues(threeLeaves2.size * 8,
        (threeLeaves2.size * 4) - (threeLeaves2.size / 2), threeLeaves2.size * 3);
    scene.add(threeLeaves2.mesh);
    this.addToCollidable(threeLeaves2.mesh);

    Block threeLeaves3 = new Block(us.unitsize, 3, materials.blockLeaves());
    threeLeaves3.mesh.position.setValues(threeLeaves3.size * 8,
        (threeLeaves3.size * 5) - (threeLeaves3.size / 2), threeLeaves3.size * 4);
    scene.add(threeLeaves3.mesh);
    this.addToCollidable(threeLeaves3.mesh);

    Block threeLeaves4 = new Block(us.unitsize, 3, materials.blockLeaves());
    threeLeaves4.mesh.position.setValues(threeLeaves4.size * 7,
        (threeLeaves4.size * 4) - (threeLeaves4.size / 2), threeLeaves4.size * 4);
    scene.add(threeLeaves4.mesh);
    this.addToCollidable(threeLeaves4.mesh);

    Block threeLeaves5 = new Block(us.unitsize, 3, materials.blockLeaves());
    threeLeaves5.mesh.position.setValues(threeLeaves5.size * 9,
        (threeLeaves5.size * 4) - (threeLeaves5.size / 2), threeLeaves5.size * 4);
    scene.add(threeLeaves5.mesh);
    this.addToCollidable(threeLeaves5.mesh);
  }

  void _setUpRenderer() {
    //Sets up the renderer.
    container = new Element.tag('span');
    document.body.nodes.add(container);
    renderer = new THREE.WebGLRenderer(antialias: true)
      ..setSize(window.innerWidth, window.innerHeight);
    container.nodes.add(renderer.domElement);

    window.onResize.listen(onWindowResize);
  }

  void render() {
    renderer.render(scene, camera);
  }

  //Takes action if window resizes.
  onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //Helpers
  //****************************
  void _axisHelper() {
    THREE.AxisHelper axis = new THREE.AxisHelper();
    scene.add(axis);
  }

  void onMouseDown(event) {
    renderer.domElement.requestPointerLock();
    pointerlockEnabled = true;
  }

  void addToCollidable(THREE.Object3D obj) {
    this.collidable.collidableMeshList.add(obj);
  }

  void removeCollidable(THREE.Object3D obj) {
    this.collidable.collidableMeshList.removeWhere((item) => item.position == obj.position);
  }
}
