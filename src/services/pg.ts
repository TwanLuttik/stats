import { QueryResult } from 'pg';
import { LocalPGClient, ProductionPGClient } from './database';

/**
 * @description This is a wrapper that will catch errors like bad querys
 * or other issues that will be logged into a table
 */
const queryWrapper = async (text: string, values: any[], local?: boolean): Promise<QueryResult> => {
	try {
		if (local) {
			return await LocalPGClient.query({ text, values });
		}
		return await ProductionPGClient.query({ text, values });
	} catch (error) {
		throw 'pg error: ' + error;
	}
};

const queryRowCount = async (text: string, values?: any[]): Promise<boolean> => (await queryWrapper(text, values)).rowCount > 0;

export const insertAndReturnOne = async <T extends Object>(text: string, values?: any[]): Promise<T> => (await queryWrapper(text, values))?.rows[0];

export const query = async (text: string, values?: any[], bool?: boolean): Promise<QueryResult> => await queryWrapper(text, values, bool);

export const select = async <T extends {}>(text: string, values?: any[], bool?: boolean): Promise<T[]> =>
	(await queryWrapper(text, values, bool)).rows;

export const insert = async (text: string, values?: any[]): Promise<boolean> => await queryRowCount(text, values);

export const update = async (text: string, values?: any[]): Promise<boolean> => (await queryWrapper(text, values)).rowCount !== 0;

export const selectOne = async <T extends Object>(text: string, values?: any[], bool?: boolean): Promise<T | any> =>
	(await queryWrapper(text, values, bool))?.rows[0];

export const selectOneKey = async <T extends Object>(key: string, text: string, values?: any[]): Promise<T> =>
	(await queryWrapper(text, values))?.rows[0][key];
