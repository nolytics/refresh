import { Env, fromEnv } from "./config";
import { handler } from "./http";

export default {
	async scheduled(
		controller: ScheduledController,
		env: Env,
		ctx: ExecutionContext
	): Promise<void> {
		const atlas = fromEnv(env);

		return handler(atlas);
	},
};
