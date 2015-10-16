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
      new Vector3(0.0, 0.0, -1.0),
      new Vector3(1.0, 0.0, 0.0),
      new Vector3(-1.0, 0.0, 0.0),
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
    //rayObject.updateMatrixWorld();
    num rotation = THREE.radToDeg(rayObject.rotation.y);
    Vector3 dist = new Vector3(0.0, 0.0, 0.0);
    // For each ray
    for (int i = 0; i < this.rays.length; i++) {
      rays_adjusted[i] = this.helper.applyQuaternion(rays[i].clone(), rayObject.quaternion.clone());
      // We reset the raycaster to this direction
      this.caster = new THREE.Ray(rayObject.position, this.rays_adjusted[i]);
      // Test if we intersect with any obstacle mesh
      List<THREE.Intersect> collisions = this.caster.intersectObjects(collidables);

      // And disable that direction if we do
      if (collisions.length > 0 && collisions[0].distance <= distance) {
        dist = collisions[0].point;
        // Yep, this.rays[i] gives us : 0 => up, 1 => up-left, 2 => left, ...
        if (/*(i == 0 || i == 1 || i == 7)*/ (rotation > rotation - 45.1 &&
                rotation < rotation + 45.0) &&
            keyBackward) {
          collisionList.add(CollisionDirections.backward);
        } else if (/*(i == 3 || i == 4 || i == 5)*/ (rotation > rotation - 135.1 &&
                rotation < rotation + 225.0) &&
            keyForward) {
          collisionList.add(CollisionDirections.forward);
        }
        if (/*(i == 1 || i == 2 || i == 3)*/ (rotation > rotation - 45.1 &&
                rotation < rotation + 135.0) &&
            keyRight) {
          collisionList.add(CollisionDirections.right);
        } else if (/*(i == 5 || i == 6 || i == 7)*/ (rotation > rotation - 225.1 &&
                rotation < rotation + 315.0) &&
            keyLeft) {
          collisionList.add(CollisionDirections.left);
        }
      }
    }
    return [dist.x, dist.y, dist.z, this.collisionList];
  }

  //Testing if we can place or remove block
  List collisionTestPoint(THREE.Object3D rayObject, List<THREE.Object3D> collidables,
      double distance, double unitSize) {
    collisionList.clear();
    bool isHit = false;
    THREE.Object3D o3d;
    double x = 0.0;
    double y = 0.0;
    double z = 0.0;
    // For each ray
    rayObject.visible = false;
    THREE.MeshBasicMaterial material = rayObject.material;
    material.wireframe = false;
    for (int i = 0; i < this.pointRays.length; i++) {
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

        if (o3d.position.x > collisions[0].point.x) {
          xd = o3d.position.x - collisions[0].point.x;
        } else {
          xd = collisions[0].point.x - o3d.position.x;
          isRayXBigger = true;
        }

        if (o3d.position.y > collisions[0].point.y) {
          yd = o3d.position.y - collisions[0].point.y;
        } else {
          yd = collisions[0].point.y - o3d.position.y;
          isRayYBigger = true;
        }

        if (o3d.position.z > collisions[0].point.z) {
          zd = o3d.position.z - collisions[0].point.z;
        } else {
          zd = collisions[0].point.z - o3d.position.z;
          isRayZBigger = true;
        }

        //Finding where to place or remove
        if (isRayXBigger) {
          if (xd > zd && xd > yd) {
            x = o3d.position.x + unitSize;
          } else {
            x = o3d.position.x;
          }
        } else {
          if (xd > zd && xd > yd) {
            x = o3d.position.x - unitSize;
          } else {
            x = o3d.position.x;
          }
        }

        if (isRayYBigger) {
          if (i == 5) {
            y = o3d.position.y + unitSize;
          } else {
            y = o3d.position.y;
          }
        } else {
          if (i == 4) {
            y = o3d.position.y - unitSize;
          } else {
            y = o3d.position.y;
          }
        }

        if (isRayZBigger) {
          if (zd > xd && zd > yd) {
            z = o3d.position.z + unitSize;
          } else {
            z = o3d.position.z;
          }
        } else {
          if (zd > xd && zd > yd) {
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
