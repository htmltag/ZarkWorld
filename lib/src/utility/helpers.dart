part of zarkworld;

class Helpers {
  Helpers();

  Vector3 vectorApplyEuler(Vector3 vector, Euler euler) {
    Quaternion quaternion;

    if (euler == null) {
      print('.applyEuler() now expects a Euler rotation rather than a Vector3 and order.');
    }

    if (quaternion == null) quaternion = new Quaternion(0.0, 0.0, 0.0, 0.0);
    quaternion = quaternionSetFromEuler(quaternion, euler);
    return applyQuaternion(vector, quaternion);
  }

  Vector3 applyQuaternion(Vector3 vector3, Quaternion quaternion) {
    double x = vector3.x;
    double y = vector3.y;
    double z = vector3.z;

    double qx = quaternion.x;
    double qy = quaternion.y;
    double qz = quaternion.z;
    double qw = quaternion.w;

    // calculate quat * vector

    double ix = qw * x + qy * z - qz * y;
    double iy = qw * y + qz * x - qx * z;
    double iz = qw * z + qx * y - qy * x;
    double iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat

    vector3.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    vector3.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    vector3.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

    return vector3;
  }

  Quaternion quaternionSetFromEuler(Quaternion quaternion, Euler euler) {
    var c1 = Math.cos(euler._x / 2);
    var c2 = Math.cos(euler._y / 2);
    var c3 = Math.cos(euler._z / 2);
    var s1 = Math.sin(euler._x / 2);
    var s2 = Math.sin(euler._y / 2);
    var s3 = Math.sin(euler._z / 2);

    var order = euler.order;

    if (order == 'XYZ') {
      quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order == 'YXZ') {
      quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order == 'ZXY') {
      quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order == 'ZYX') {
      quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
    } else if (order == 'YZX') {
      quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
    } else if (order == 'XZY') {
      quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
      quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
      quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
      quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
    }

    return quaternion;
  }
}
