import { db } from '$lib/database/db.js';
import { riskTable } from '$lib/database/schema/rcm.js';
import { count } from 'drizzle-orm';

export const load = async () => {
	return {
		riskTotalKPI: await db.select({ count: count() }).from(riskTable)

		// riskCoveredByControlKPI:
		// riskUncoveredByControlKPI:
	};
};
