import { hobbyBad } from "./entities/hobby-route/hobby-bad";
import { hobbyGood } from "./entities/hobby-route/hobby-good";
import { hobbyNeutral } from "./entities/hobby-route/hobby-neutral";
import { hobbyRouteNode } from "./entities/hobby-route/hobby-route";

import { iceCreamBad } from "./entities/ice-cream-route/ice-cream-bad";
import { iceCreamGood } from "./entities/ice-cream-route/ice-cream-good";
import { iceCreamNeutral } from "./entities/ice-cream-route/ice-cream-neutral";
import { iceCreamRouteNode } from "./entities/ice-cream-route/ice-cream-route";

import { nomadBad } from "./entities/nomad-route/nomad-bad";
import { nomadGood } from "./entities/nomad-route/nomad-good";
import { nomadNeutral } from "./entities/nomad-route/nomad-neutral";
import { nomadRouteNode } from "./entities/nomad-route/nomad-route";

import { startNodeEntity } from "./entities/start-node";

export const entitiesMap = {
  start: startNodeEntity,
  
  // Hobby Route
  hobbyRoute: hobbyRouteNode,
  hobbyBad,
  hobbyNeutral,
  hobbyGood,
  
  // Nomad Route
  nomadRoute: nomadRouteNode,
  nomadBad,
  nomadNeutral,
  nomadGood,
  
  // Ice Cream Route
  iceCreamRoute: iceCreamRouteNode,
  iceCreamBad,
  iceCreamNeutral,
  iceCreamGood
};
