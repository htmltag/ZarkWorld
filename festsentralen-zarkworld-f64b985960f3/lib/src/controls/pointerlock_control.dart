/**
 * Port of the three.js pointerlock control to dart
 * @author mrdoob / http://mrdoob.com/
 */

part of zarkworld;

class PointerLockControls {
  THREE.PerspectiveCamera camera;
  THREE.Object3D pitchObject, yawObject;
  num PI_2;
  bool enabled = false;
  Element domElement;
  num movementX;
  num movementY;
  double posY;
  Vector3 vectorDirection = new Vector3.zero();
  Helpers helper;

  PointerLockControls(this.camera, this.posY) {
    this.domElement = (domElement != null) ? domElement : document.body;

    if (this.domElement != document.body) {
      this.domElement.tabIndex = -1;
    }

    this.domElement.onContextMenu.listen((event) => event.preventDefault());
    this.domElement.onMouseMove.listen(this.onMouseMove);

    camera.rotation.setValues(0.0, 0.0, 0.0);

    pitchObject = new THREE.Object3D();
    pitchObject.add(camera);

    yawObject = new THREE.Object3D();
    yawObject.position.y = this.posY;
    yawObject.add(pitchObject);

    PI_2 = Math.PI / 2;
    this.helper = new Helpers();
  }

  onMouseMove(event) {
    if (enabled == false) return;

    movementX = event.movement.x;
    movementY = event.movement.y;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-PI_2, Math.min(PI_2, pitchObject.rotation.x));
  }

  void dispose() {
    document.removeEventListener('mousemove', onMouseMove, false);
  }

  THREE.Object3D getObject() {
    return yawObject;
  }

  Vector3 getDirection() {
    // assumes the camera itself is not rotated

    Vector3 direction = new Vector3(0.0, 0.0, -1.0);
    Euler rotation = new Euler(x: 0.0, y: 0.0, z: 0.0, order: 'YXZ');
    rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0.0, 'YXZ');
    this.vectorDirection = this.helper.vectorApplyEuler(direction, rotation);
    return this.vectorDirection;
  }
}
