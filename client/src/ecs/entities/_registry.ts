import { hobbyBad } from "./hobby-route/hobby-bad";
import { hobbyGood } from "./hobby-route/hobby-good";
import { hobbyNeutral } from "./hobby-route/hobby-neutral";
import { hobbyRouteNode } from "./hobby-route/hobby-route";

import { iceCreamBad } from "./ice-cream-route/ice-cream-bad";
import { iceCreamGood } from "./ice-cream-route/ice-cream-good";
import { iceCreamNeutral } from "./ice-cream-route/ice-cream-neutral";
import { iceCreamRouteNode } from "./ice-cream-route/ice-cream-route";

import { nomadBad } from "./nomad-route/nomad-bad";
import { nomadGood } from "./nomad-route/nomad-good";
import { nomadNeutral } from "./nomad-route/nomad-neutral";
import { nomadRouteNode } from "./nomad-route/nomad-route";

import { startNodeEntity } from "./start-node";

export const ENTITY_MAP = {
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
