import { db } from 'services';
import { prisma } from 'services/prisma';

const prefix = 'SERVER:';
const messages = {
	insert_start: console.log(prefix + 'creating a time entry for signup count'),
	insert_finish: console.log(prefix + 'signup count has been inserted'),
	insert2_start: console.log(prefix + 'creating a time entry for tickets count'),
	insert2_finish: console.log(prefix + 'tickets count has been inserted'),
};

export const extractDailyMetrics = async () => {
	messages.insert_start;
	// Signups
	const x1 = await db.selectOne(
		`WITH date_range AS (
      SELECT
        generate_series(CURRENT_DATE - INTERVAL '1 days',
          -- Start date (e.g., 30 days ago)
          CURRENT_DATE,
          -- End date (today)
          INTERVAL '1 day' -- Interval (1 day)
    )::date AS date
    )
    SELECT
      date_range.date AS signup_date,
      COUNT(accounts.created_at) AS signup_count
    FROM
      date_range
      LEFT JOIN accounts ON DATE(accounts.created_at) = date_range.date
    GROUP BY
      date_range.date
    ORDER BY
      date_range.date;`
	);

	const i1 = await prisma.signups_daily.create({ data: { id: x1.signup_date, value: x1.signup_date } });
	if (i1.id) {
		messages.insert_finish;
	}

	messages.insert2_start;

	// Tickets
	const x2 = await db.selectOne(
		`WITH date_range AS (
      SELECT generate_series(
               CURRENT_DATE - INTERVAL '30 days', -- Start date (e.g., 30 days ago)
               CURRENT_DATE,                      -- End date (today)
               INTERVAL '1 day'                   -- Interval (1 day)
             )::date AS date
    )
    SELECT
      date_range.date AS ticket_date,
      COUNT(tickets.created_at) AS ticket_count
    FROM
      date_range
    LEFT JOIN
      tickets ON DATE(tickets.created_at) = date_range.date
    GROUP BY
      date_range.date
    ORDER BY
      date_range.date;`
	);

	const i2 = await prisma.tickets_daily.create({ data: { id: x2.ticket_date, value: x2.ticket_count } });
	if (i2.id) {
		messages.insert2_finish;
	}
};
