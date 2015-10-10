//***************************************************
// Author: Jonathan Søyland-lier
// Detect collision between player and obstacles
//***************************************************

part of zarkworld;

class CollisionPlayerObstacles {
  var rays, rays_adjusted, pointRays;
  Vector3 targetPoint;
  THREE.Ray caster;
  Helpers helper;
  Vector3 placePosition;
  //var forwardRays, bacwardRays, leftRays, rightRays;
  List<CollisionDirections> collisionList;
  CollisionPlayerObstacles() {
    targetPoint = new Vector3(0.0, 0.0, 1.0);
    rays = [
      new Vector3(0.0, 0.0, 1.0),
      new Vector3(1.0, 0.0, 1.0),
      new Vector3(1.0, 0.0, 0.0),
      new Vector3(1.0, 0.0, -1.0),
      new Vector3(0.0, 0.0, -1.0),
      new Vector3(-1.0, 0.0, -1.0),
      new Vector3(-1.0, 0.0, 0.0),
      new Vector3(-1.0, 0.0, 1.0)
    ];
    rays_adjusted = [
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0),
      new Vector3(0.0, 0.0, 0.0)
    ];

    pointRays = [
      new Vector3(0.0, 0.0, 1.0),
      new Vector3(1.0, 0.0, 1.0),
      new Vector3(1.0, 0.0, 0.0),
      new Vector3(1.0, 0.0, -1.0),
      new Vector3(0.0, 0.0, -1.0),
      new Vector3(-1.0, 0.0, -1.0),
      new Vector3(-1.0, 0.0, 0.0),
      new Vector3(-1.0, 0.0, 1.0),
      new Vector3(0.0, 1.0, 0.0),
      new Vector3(0.0, -1.0, 0.0)
    ];
    collisionList = new List<CollisionDirections>();
    this.placePosition = new Vector3(0.0, 0.0, 0.0);
    this.helper = new Helpers();
  }

  //Collision test
  List<CollisionDirections> collisionTest2(
      THREE.Object3D rayObject,
      List<THREE.Object3D> collidables,
      double distance,
      bool keyBackward,
      bool keyForward,
      bool keyLeft,
      bool keyRight) {
    collisionList.clear();
    double dist = 0.0;
    // For each ray
    for (int i = 0; i < this.rays.length - 1; i++) {
      rays_adjusted[i] = this.helper.applyQuaternion(rays[i].clone(), rayObject.quaternion.clone());
      // We reset the raycaster to this direction
      this.caster = new THREE.Ray(rayObject.position, this.rays_adjusted[i]);
      // Test if we intersect with any obstacle mesh
      List<THREE.Intersect> collisions = this.caster.intersectObjects(collidables);
/*
      if (collisions.length > 0 && collisions[0].distance <= distance * 2) {
        if (this.rays_adjusted[i].z > 0.0) {
          THREE.Object3D obj = collisions[0].object;
          THREE.MeshBasicMaterial material = obj.material;
          material.color.setHex(0xff0000);
        }
      }
      * */

      // And disable that direction if we do
      if ((collisions.length > 0 && collisions[0].distance <= distance) &&
          collisions[0].object.name != 'ground') {
        dist = collisions[0].distance;
        // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
        if (/*(i == 0 || i == 1 || i == 7) && */ keyForward) {
          collisionList.add(CollisionDirections.forward);
        } else if (/*(i == 3 || i == 4 || i == 5) && */ keyBackward) {
          collisionList.add(CollisionDirections.backward);
        }
        if (/*(i == 1 || i == 2 || i == 3) && */ keyLeft) {
          collisionList.add(CollisionDirections.left);
        } else if (/*(i == 5 || i == 6 || i == 7) && */ keyRight) {
          collisionList.add(CollisionDirections.right);
        }
      }
    }
    return [dist, this.collisionList];
  }

  //Testing if we can place or remove block
  List collisionTestPoint(THREE.Object3D rayObject, List<THREE.Object3D> collidables,
      double distance, double unitSize) {
    collisionList.clear();
    bool isHit = false;
    double x = 0.0;
    double y = 0.0;
    double z = 0.0;
    THREE.Object3D o3d = null;
    // For each ray
    rayObject.visible = false;
    THREE.MeshBasicMaterial material = rayObject.material;
    material.wireframe = false;
    for (int i = 0; i < this.pointRays.length - 1; i++) {
      // We reset the raycaster to this direction
      this.caster = new THREE.Ray(rayObject.position, this.pointRays[i]);
      // Test if we intersect with any obstacle mesh
      List<THREE.Intersect> collisions = this.caster.intersectObjects(collidables);

      if (collisions.length > 0 && collisions[0].distance <= distance) {
        isHit = true;
        o3d = collisions[0].object;
        rayObject.visible = true;
        material.wireframe = true;

        double xd = 0.0;
        double yd = 0.0;
        double zd = 0.0;
        bool isRayXBigger = false;
        bool isRayYBigger = false;
        bool isRayZBigger = false;

        //Calculate distances
        if (o3d.position.x > rayObject.position.x) {
          xd = o3d.position.x - rayObject.position.x;
        } else {
          xd = rayObject.position.x - o3d.position.x;
          isRayXBigger = true;
        }

        if (o3d.position.y > rayObject.position.y) {
          yd = o3d.position.y - rayObject.position.y;
        } else {
          yd = rayObject.position.y - o3d.position.y;
          isRayYBigger = true;
        }

        if (o3d.position.z > rayObject.position.z) {
          zd = o3d.position.z - rayObject.position.z;
        } else {
          zd = rayObject.position.z - o3d.position.z;
          isRayZBigger = true;
        }

        //Place cube
        if (isRayXBigger) {
          if ((xd > zd) && (xd > yd)) {
            x = o3d.position.x + unitSize;
          } else {
            x = o3d.position.x;
          }
        } else {
          if ((xd > zd) && (xd > yd)) {
            x = o3d.position.x - unitSize;
          } else {
            x = o3d.position.x;
          }
        }

        if (isRayYBigger) {
          if (i == 9) {
            y = o3d.position.y + unitSize;
          } else {
            y = o3d.position.y;
          }
        } else {
          if (i == 8) {
            y = o3d.position.y - unitSize;
          } else {
            y = o3d.position.y;
          }
        }

        if (isRayZBigger) {
          if ((zd > xd) && (zd > yd)) {
            z = o3d.position.z + unitSize;
          } else {
            z = o3d.position.z;
          }
        } else {
          if ((zd > xd) && (zd > yd)) {
            z = o3d.position.z - unitSize;
          } else {
            z = o3d.position.z;
          }
        }
      }
    }

    return [isHit, new Vector3(x, y, z), o3d];
  }
}
