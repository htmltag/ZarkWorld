//*******************************
// Author: Jonathan Søyland-Lier
// Starts the game
//*******************************

import 'dart:html';
import 'dart:math' as Math;
import 'dart:async';
import 'package:vector_math/vector_math.dart';
import 'package:three/three.dart' as THREE;
import 'package:ZarkWorld/zarkworld.dart' as ZarkWorld;

class Game {
  ZarkWorld.World world;
  ZarkWorld.PointerLockControls controls;
  ZarkWorld.CollisionPlayerObstacles playerCollision;
  DateTime prevTime = new DateTime.now();
  Vector3 velocity = new Vector3.zero();
  bool canJump;
  double jumpHeight;
  THREE.Ray raycaster;
  final double movespeed = 1300.0;

  bool moveForward;
  bool moveBackward;
  bool moveLeft;
  bool moveRight;
  bool mouse0;
  bool mouse2;

  Vector3 v3 = new Vector3(0.0, 0.0, 0.0);
  Vector3 vec3 = new Vector3(0.0, 0.0, -100.0);

  void init() {
    world = new ZarkWorld.World();

    this.playerCollision = new ZarkWorld.CollisionPlayerObstacles();

    controls = new ZarkWorld.PointerLockControls(
        this.world.camera, this.world.jacob.personObject3D.position.y);
    //this.world.jacob.personObject3D.getChildByName('head', true).add(controls.getObject());
    this.controls.enabled = true;
    this.jumpHeight = this.controls.posY;
    this.world.scene.add(controls.getObject());

    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    this.mouse0 = false;
    this.mouse2 = false;

    onKeyDown(event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = true;
          break;

        case 37: // left
        case 65: // a
          moveLeft = true;
          break;

        case 40: // down
        case 83: // s
          moveBackward = true;
          break;

        case 39: // right
        case 68: // d
          moveRight = true;
          break;

        case 32: // space
          if (canJump == true) velocity.y += 350;
          canJump = false;
          break;
      }
    }
    ;

    onKeyUp(event) {
      switch (event.keyCode) {
        case 38: // up
        case 87: // w
          moveForward = false;
          break;

        case 37: // left
        case 65: // a
          moveLeft = false;
          break;

        case 40: // down
        case 83: // s
          moveBackward = false;
          break;

        case 39: // right
        case 68: // d
          moveRight = false;
          break;
      }
    }
    ;

    onMouseDown(event) {
      switch (event.button) {
        case 0:
          print("mouse");
          this.mouse0 = true;
          break;
        case 2:
          this.mouse2 = true;
          break;
      }
    }
    ;

    onMouseUp(event) {
      switch (event.button) {
        case 0:
          this.mouse0 = false;
          break;
        case 2:
          this.mouse2 = false;
          break;
      }
    }
    ;

    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);

    raycaster = new THREE.Ray(new Vector3(0.0, 0.0, 0.0), new Vector3(0.0, -1.0, 0.0), 0, 10);

    this.world.scene.add(this.world.placeBlock.mesh);

    Timer.run(() => logic());
    //new Timer.periodic(const Duration(milliseconds: 16), (Timer time) => logic());
  }

  void animate(num time) {
    window.requestAnimationFrame(animate);

    //Render the scene.
    this.world.render();
  }

  void logic() {
    if (this.world.pointerlockEnabled) {
      raycaster.origin.setFrom(controls.getObject().position);
      raycaster.origin.y -= this.jumpHeight;

      //jump
      var intersections = raycaster.intersectObjects(this.world.collidable.collidableMeshList);
      var isOnObject = intersections.length > 0.0 && intersections.length < this.jumpHeight;

      //calculate delta
      DateTime time = new DateTime.now();
      double delta = time.difference(prevTime).inMilliseconds / 1000;

      velocity.x -= velocity.x.toDouble() * 10.0 * delta;
      velocity.z -= velocity.z.toDouble() * 10.0 * delta;

      velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

      if (isOnObject == true) {
        velocity.y = Math.max(0.0, velocity.y);

        canJump = true;
      }

      List collisions = this.playerCollision.collisionTest2(
          this.world.jacob.personObject3D,
          this.world.collidable.collidableMeshList,
          this.world.us.unitsize / 4,
          moveBackward,
          moveForward,
          moveLeft,
          moveRight);

      for (ZarkWorld.CollisionDirections cd in collisions[1]) {
        switch (cd) {
          case ZarkWorld.CollisionDirections.backward:
            this.moveBackward = false;
            velocity.z -= (movespeed * delta) +
                collisions[0] +
                this.world.us.unitsize; //(this.world.us.unitsize + 0.1);
            break;
          case ZarkWorld.CollisionDirections.forward:
            this.moveForward = false;
            velocity.z += (movespeed * delta) +
                collisions[0] +
                this.world.us.unitsize; //(this.world.us.unitsize + 0.1);
            break;
          case ZarkWorld.CollisionDirections.left:
            this.moveLeft = false;
            velocity.x += movespeed * delta + collisions[0] + this.world.us.unitsize;
            break;
          case ZarkWorld.CollisionDirections.right:
            this.moveRight = false;
            velocity.x -= movespeed * delta + collisions[0] + this.world.us.unitsize;
            break;
        }
      }

      if (moveForward) velocity.z -= movespeed * delta;
      if (moveBackward) velocity.z += movespeed * delta;

      if (moveLeft) velocity.x -= movespeed * delta;
      if (moveRight) velocity.x += movespeed * delta;

      controls.getObject().translateX(velocity.x.toDouble() * delta);
      controls.getObject().translateY(velocity.y.toDouble() * delta);
      controls.getObject().translateZ(velocity.z.toDouble() * delta);

      this.world.jacob.personObject3D.rotation.setValues(0.0, controls.getObject().rotation.y, 0.0);
      this.world.jacob.personObject3D.position.setFrom(this.controls.getObject().position);
      if (controls.getObject().position.y < this.jumpHeight) {
        velocity.y = 0.0;
        controls.getObject().position.y = this.jumpHeight;

        canJump = true;
      }

      v3 = vec3.clone().applyProjection(this.world.camera.matrixWorld).clone();
      this.world.placeBlock.mesh.position.setFrom(v3);

      List result = this.world.collisionPlayerObstacles.collisionTestPoint(
          this.world.placeBlock.mesh,
          this.world.collidable.collidableMeshList,
          this.world.us.unitsize,
          this.world.us.unitsize);

      if (this.mouse0) {
        if (result[0]) {
          ZarkWorld.Block block =
              new ZarkWorld.Block(this.world.us.unitsize, 3, this.world.materials.rockStone());
          block.mesh.position.setFrom(result[1]);
          this.world.scene.add(block.mesh);
          this.world.addToCollidable(block.mesh);
        }
        this.mouse0 = false;
      }

      if (this.mouse2) {
        if (result[0] && result[2] != null) {
          print('remove');
          this.world.removeCollidable(result[2]);
          this.world.scene.remove(result[2]);
        }
        this.mouse2 = false;
      }

      prevTime = time;
    }
    Timer.run(() => logic());
  }
}

void main() {
  Game game = new Game();
  game.init();
  game.animate(0);
}
