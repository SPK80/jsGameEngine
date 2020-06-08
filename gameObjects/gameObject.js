import { IUpdating } from "./common.js";

export class IGameObject extends IUpdating {
	get name() { throw ('name must be implemented') };
}