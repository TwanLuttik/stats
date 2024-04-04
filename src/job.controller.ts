import { db } from 'services';
import { prisma } from 'services/prisma';

export const extractDailyMetrics = async () => {
	console.log('Inserting accounts signups count');
	// Signups
	const x1 = await db.select<any>(
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
	await prisma.signups_daily.create({ data: { id: x1[1].signup_date, value: x1[1].signup_date } });

	console.log('Inserting tickets created count');

	const x2 = await db.select<any>(
		`WITH date_range AS (
      SELECT generate_series(
               CURRENT_DATE - INTERVAL '1 days', -- Start date (e.g., 1 days ago)
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
	await prisma.tickets_daily.create({ data: { id: x2[1].ticket_date, value: x2[1].ticket_count } });

	console.log('Inserting business signup count');
	// Tickets
	const x3 = await db.select<any>(
		`WITH date_range AS (
      SELECT generate_series(
               CURRENT_DATE - INTERVAL '1 days', -- Start date (e.g., 1 days ago)
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
	await prisma.tickets_daily.create({ data: { id: x3[1].ticket_date, value: x3[1].ticket_count } });
};
