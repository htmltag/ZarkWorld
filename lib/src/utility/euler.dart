//Port of the Three.js euler to Dart.

/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

part of zarkworld;

class Euler {
  double _x, _y, _z;
  String _order;
  String defaultOrder = 'XYZ';
  List<String> rotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];

  Euler({double x: 0.0, double y: 0.0, double z: 0.0, String order: "XYZ"}) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;
  }
  //getter setter
  double x() {
    return this._x;
  }

  void setX(value) {
    this._x = value;
    this.onChangeCallback();
  }

  double y() {
    return this._y;
  }

  void setY(value) {
    this._y = value;
    this.onChangeCallback();
  }

  double z() {
    return this._z;
  }

  void setZ(value) {
    this._z = value;
    this.onChangeCallback();
  }

  String order() {
    return this._order;
  }

  void setOrder(value) {
    this._order = value;
    this.onChangeCallback();
  }

  Euler set(x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order;

    this.onChangeCallback();

    return this;
  }

  Euler clone() {
    return new Euler(x: this._x, y: this._y, z: this._z, order: this._order);
  }

  Euler copy(euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;

    this.onChangeCallback();

    return euler;
  }

  Euler setFromRotationMatrix(m, order, update) {
    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[0], m12 = te[4], m13 = te[8];
    var m21 = te[1], m22 = te[5], m23 = te[9];
    var m31 = te[2], m32 = te[6], m33 = te[10];

    order = order;

    if (order == 'XYZ') {
      this._y = Math.asin(m13.clamp(-1, 1));

      if (m13.abs() < 0.99999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0.0;
      }
    } else if (order == 'YXZ') {
      this._x = Math.asin(-m23.clamp(-1, 1));

      if (m23.abs() < 0.99999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0.0;
      }
    } else if (order == 'ZXY') {
      this._x = Math.asin(m32.clamp(-1, 1));

      if (m32.abs() < 0.99999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0.0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order == 'ZYX') {
      this._y = Math.asin(-m31.clamp(-1, 1));

      if (m31.abs() < 0.99999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0.0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order == 'YZX') {
      this._z = Math.asin(m21.clamp(-1, 1));

      if (m21.abs() < 0.99999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0.0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order == 'XZY') {
      this._z = Math.asin(-m12.clamp(-1, 1));

      if (m12.abs() < 0.99999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0.0;
      }
    } else {
      print('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }

    this._order = order;

    if (update != false) this.onChangeCallback();

    return this;
  }

  /*
 Euler setFromQuaternion() {

     var matrix;

     return function ( q, order, update ) {

       if ( matrix == null ) matrix = new THREE.Matrix4();

       matrix.makeRotationFromQuaternion( q );
       this.setFromRotationMatrix( matrix, order, update );

       return this;

     };

   }
   *
    */

  setFromVector3(v, order) {
    return set(v.x, v.y, v.z, order);
  }

  /*
   reorder() {

     // WARNING: this discards revolution information -bhouston

     var q = new THREE.Quaternion();

     return function ( newOrder ) {

       q.setFromEuler( this );
       this.setFromQuaternion( q, newOrder );

     };

   }
*/

  bool equals(Euler euler) {
    return (euler._x == this._x) &&
        (euler._y == this._y) &&
        (euler._z == this._z) &&
        (euler._order == this._order);
  }

  Euler fromArray(List array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] != null) this._order = array[3];

    this.onChangeCallback();

    return this;
  }

  List toArray(List array, num offset) {
    if (array == null) array = [];
    if (offset == null) offset = 0;

    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;

    return array;
  }

  Vector3 toVector3(Vector3 optionalResult) {
    if (optionalResult != null) {
      return optionalResult.setValues(this._x, this._y, this._z);
    } else {
      return new Vector3(this._x, this._y, this._z);
    }
  }

  Euler onChange(callback) {
    print(callback);
    return this;
  }

  void onChangeCallback() {}
}
