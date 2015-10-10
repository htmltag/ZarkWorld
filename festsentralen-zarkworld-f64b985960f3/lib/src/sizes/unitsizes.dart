//**************************************
// Author: Jonathan Søyland-lier
// Setting up worlds unit sizes
//**************************************

part of zarkworld;

class Unitsizes {
  double unitsize, wallLenght, wallHeight;

  Unitsizes() {
    this.unitsize = 50.0;
    this.wallLenght = this.unitsize * 40.0;
    this.wallHeight = this.unitsize * 10.0;
  }
}
