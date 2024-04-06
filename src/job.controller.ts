import dayjs from 'dayjs';
import { db } from 'services';
import { prisma } from 'services/prisma';

export const extractDailyMetrics = async () => {
	console.log('Inserting accounts signups count');

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

	await prisma.signups_daily.upsert({
		create: { time: dayjs(x1[1].signup_date).toDate(), value: Number(x1[1].signup_count) },
		update: {},
		where: { time: dayjs(x1[1].signup_date).toDate() },
	});

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

	await prisma.tickets_daily.upsert({
		create: { time: dayjs(x2[1].ticket_date).toDate(), value: Number(x2[1].ticket_count) },
		update: {},
		where: { time: dayjs(x2[1].ticket_date).toDate() },
	});

	console.log('Inserting business signup count');
	const x3 = await db.select<any>(
		`WITH date_range AS (
      SELECT generate_series(
               CURRENT_DATE - INTERVAL '1 days', -- Start date (e.g., 1 days ago)
               CURRENT_DATE,                      -- End date (today)
               INTERVAL '1 day'                   -- Interval (1 day)
             )::date AS date
    )
    SELECT
      date_range.date AS busienss_date,
      COUNT(business.created_at) AS busienss_count
    FROM
      date_range
    LEFT JOIN
      business ON DATE(business.created_at) = date_range.date
    GROUP BY
      date_range.date
    ORDER BY
      date_range.date;`
	);

	await prisma.business_signups_daily.upsert({
		create: { time: dayjs(x3[1].busienss_date).toDate(), value: Number(x3[1].busienss_count) },
		update: {},
		where: { time: dayjs(x3[1].busienss_date).toDate() },
	});
	// await prisma.business_signups_daily.upsert({ create: { data: { time: dayjs(x3[1].signup_date).toDate(), value: Number(x3[1].busienss_count) } } });
};
