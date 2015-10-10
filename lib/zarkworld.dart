//*******************************
// Author: Jonathan Søyland-Lier
// The ZarkWorld lib file
//*******************************

library zarkworld;

//Import libraries.
import 'dart:html';
import 'dart:math' as Math;
import 'package:three/three.dart' as THREE;
import 'package:vector_math/vector_math.dart';
import 'package:three/src/core/three_math.dart' as THREEMath;
import 'package:three/extras/image_utils.dart' as ImageUtils;

//Geometries
part 'src/geometries/block_geometry.dart';
part 'src/geometries/wall_geometry.dart';
part 'src/geometries/roofground_geometry.dart';

//Obstacles
part 'src/obstacles/interface_obstacle.dart';
part 'src/obstacles/block.dart';
part 'src/obstacles/wall.dart';
part 'src/obstacles/roofground.dart';

//Enums
part 'src/enums/object_types.dart';
part 'src/enums/collision_directions.dart';

//Materials
part 'src/materials/interface_obstacles_materials.dart';
part 'src/materials/basic_obstacles_materials.dart';
part 'src/materials/phong_obstacles_materials.dart';
part 'src/materials/person_material_parts.dart';
part 'src/materials/person_material.dart';

//Sizes
part 'src/sizes/unitsizes.dart';

//Lights
part 'src/lights/basic_light.dart';

//Core
part 'src/core/world.dart';

//Characters
part 'src/characters/person.dart';
part 'src/characters/player.dart';

//Controls
//part 'src/controls/player_control.dart';
part 'src/controls/pointerlock_control.dart';

//Collection
part 'src/collection/collidable.dart';

//collition
part 'src/collision/collision_player_obstacles.dart';

//utility
part 'src/utility/euler.dart';
part 'src/utility/helpers.dart';
part 'src/utility/place_block.dart';
