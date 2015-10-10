/**
  * @author mrdoob / http://mrdoob.com/
  * @author alteredq / http://alteredqualia.com/
  * @author paulirish / http://paulirish.com/
  *
  * Ported to Dart from JS by:
  * @author jessevogt / http://jvogt.net/
  *
  * based on rev 04b652ae26e228796f67838c0ec4d555e8b16528
  */
/*
part of zarkworld;

class PlayerControl {
  THREE.Object3D object;
  Player jacob;
  Vector3 target = new Vector3.zero();
  Vector3 jacobTarget = new Vector3.zero();

  Element domElement;

  num movementSpeed = 1.0;
  num lookSpeed = 0.005;

  bool lookVertical = true;
  bool autoForward = false;
  // bool invertVertical = false;

  bool activeLook = true;

  bool heightSpeed = false;
  num heightCoef = 1.0;
  num heightMin = 0.0;
  num heightMax = 1.0;

  bool constrainVertical = false;
  num verticalMin = 0;
  num verticalMax = Math.PI;

  num autoSpeedFactor = 0.0;

  num mouseX = 0;
  num mouseY = 0;

  num lat = 0;
  num lon = 0;
  num phi = 0;
  num theta = 0;

  bool moveForward = false;
  bool moveBackward = false;
  bool moveLeft = false;
  bool moveRight = false;
  bool moveUp = false;
  bool moveDown = false;
  bool freeze = false;
  bool mouseFreeze = true;

  bool mouseDragOn = false;

  num viewHalfX = 0;
  num viewHalfY = 0;

  Unitsizes us;

  PlayerControl(this.object, [Element domElement]) {
    us = new Unitsizes();
    this.domElement = (domElement != null) ? domElement : document.body;

    if (this.domElement != document.body) {
      this.domElement.tabIndex = -1;
    }

    this.domElement.onContextMenu.listen((event) => event.preventDefault());

    this.domElement.onMouseMove.listen(this.onMouseMove);
    this.domElement.onMouseDown.listen(this.onMouseDown);
    this.domElement.onMouseUp.listen(this.onMouseUp);
    this.domElement.onKeyDown.listen(this.onKeyDown);
    this.domElement.onKeyUp.listen(this.onKeyUp);

    this.handleResize();
  }

  void handleResize() {
    if (this.domElement == document.body) {
      this.viewHalfX = window.innerWidth / 2;
      this.viewHalfY = window.innerHeight / 2;
    } else {
      this.viewHalfX = this.domElement.offsetWidth / 2;
      this.viewHalfY = this.domElement.offsetHeight / 2;
    }
  }

  void onMouseDown(event) {
    if (this.domElement != document.body) {
      this.domElement.focus();
    }

    event.preventDefault();
    event.stopPropagation();

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          //this.moveForward = true;
          this.mouseFreeze = false;
          break;
        case 2:
          this.moveBackward = true;
          break;
      }
    }

    this.mouseDragOn = true;
  }

  void onMouseUp(event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.activeLook) {
      switch (event.button) {
        case 0:
          //this.moveForward = false;
          this.mouseFreeze = true;
          break;
        case 2:
          this.moveBackward = false;
          break;
      }
    }
    this.mouseDragOn = false;
  }

  void onMouseMove(event) {
    if (this.domElement == document.body) {
      this.mouseX = event.movement.x; //event.page.x - this.viewHalfX;
      this.mouseY = event.movement.y; //event.page.y - this.viewHalfY;
    } else {
      this.mouseX = event.movement.x; //event.page.x - this.domElement.offsetLeft - this.viewHalfX;
      this.mouseY = event.movement.y; //event.page.y - this.domElement.offsetTop - this.viewHalfY;
    }
  }

  void onKeyDown(event) {
    //event.preventDefault();

    switch (event.keyCode) {
      case 38:
      /*up*/
      case 87:
        /*W*/ this.moveForward = true;
        //this.jacob.moveForward = true;
        break;

      case 37:
      /*left*/
      case 65:
        /*A*/ this.moveLeft = true;
        //this.jacob.moveLeft = true;
        break;

      case 40:
      /*down*/
      case 83:
        /*S*/ this.moveBackward = true;
        //this.jacob.moveBackward = true;
        break;

      case 39:
      /*right*/
      case 68:
        /*D*/ this.moveRight = true;
        //this.jacob.moveRight = true;
        break;

      case 82:
        /*R*/ //this.moveUp = true;
        break;
      case 70:
        /*F*/ //this.moveDown = true;
        break;

      case 81:
        /*Q*/ //this.freeze = !this.freeze;
        break;
    }
  }

  void onKeyUp(event) {
    switch (event.keyCode) {
      case 38:
      /*up*/
      case 87:
        /*W*/ this.moveForward = false;
        //this.jacob.moveForward = false;
        break;

      case 37:
      /*left*/
      case 65:
        /*A*/ this.moveLeft = false;
        //this.jacob.moveLeft = false;
        break;

      case 40:
      /*down*/
      case 83:
        /*S*/ this.moveBackward = false;
        //this.jacob.moveBackward = false;
        break;

      case 39:
      /*right*/
      case 68:
        /*D*/ this.moveRight = false;
        //this.jacob.moveRight = false;
        break;

      case 82:
        /*R*/ //this.moveUp = false;
        break;
      case 70:
        /*F*/ //this.moveDown = false;
        break;
    }
  }

  void update(delta, CollisionPlayerObstacles collisionPlayerObstacles,
      List<THREE.Object3D> collidable, Player jacob) {
    var actualMoveSpeed = 0.0;
    var actualLookSpeed = 0.0;
    if (this.freeze) {
      return;
    } else {
      if (this.heightSpeed) {
        var y = THREEMath.clamp(this.object.position.y, this.heightMin, this.heightMax);
        var heightDelta = y - this.heightMin;

        this.autoSpeedFactor = delta * (heightDelta * this.heightCoef);
      } else {
        this.autoSpeedFactor = 0.0;
      }

      actualMoveSpeed = delta * this.movementSpeed;

      //Collision test
      List<CollisionDirections> collisionList = collisionPlayerObstacles.collisionTest(
          jacob,
          collidable,
          this.moveBackward,
          this.moveForward,
          this.moveLeft,
          this.moveRight,
          actualMoveSpeed,
          this.object.getChildByName('targetmesh', true));

/*
      if (this.moveForward || (this.autoForward && !this.moveBackward)) {
        jacob.personObject3D
            .translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      }
      if (this.moveBackward) jacob.personObject3D.translateZ(actualMoveSpeed);

      if (this.moveLeft) jacob.personObject3D.translateX(-actualMoveSpeed);
      if (this.moveRight) jacob.personObject3D.translateX(actualMoveSpeed);

      if (this.moveUp) this.object.translateY(actualMoveSpeed);
      if (this.moveDown) this.object.translateY(-actualMoveSpeed);
*/
      if (this.mouseFreeze) {
        return;
      }

      var actualLookSpeed = delta * this.lookSpeed;

      if (!this.activeLook) {
        actualLookSpeed = 0;
      }
      this.lon += this.mouseX * actualLookSpeed;

      //direction of camera
      if (this.lookVertical) this.lat -=
          this.mouseY * actualLookSpeed; // * this.invertVertical?-1:1;

      this.lat = Math.max(-85, Math.min(85, this.lat));
      this.phi = (90 - this.lat) * Math.PI / 180;
      this.theta = this.lon * Math.PI / 180;

      var targetPosition = this.target, position = this.object.position;

      targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
      targetPosition.y = position.y + 100 * Math.cos(this.phi);
      targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
    }

    var verticalLookRatio = 1;

    if (this.constrainVertical) {
      verticalLookRatio = Math.PI / (this.verticalMax - this.verticalMin);
    }

    this.lon += this.mouseX * actualLookSpeed;
    if (this.lookVertical) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = (90 - this.lat) * Math.PI / 180;

    this.theta = this.lon * Math.PI / 180;

    if (this.constrainVertical) {
      this.phi = THREEMath.mapLinear(this.phi, 0, Math.PI, this.verticalMin, this.verticalMax);
    }

    var targetPosition = this.target, position = this.object.position;

    targetPosition.x = position.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    targetPosition.y = position.y + 100 * Math.cos(this.phi);
    targetPosition.z = position.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);

    //Lock the camera to only look up and down. Rotating around the y axis is the palyer only.
    //Vector3 tp = new Vector3(0.0, targetPosition.y, -us.unitsize);
    this.object.lookAt(targetPosition);
  }
}*/
