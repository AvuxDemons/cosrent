'use server'

import { TableName } from "@/types/xata";
import { getXataClient } from "@/xata";

const xata = getXataClient();

// READ
const getAllRecord = async (table: TableName) => {
    const records: any = await (xata.db[table] as any).getAll();
    return JSON.parse(records);
}

const getRecordByID = async (table: TableName, id: string) => {
    const record: any = await (xata.db[table] as any).read(id);
    return JSON.parse(record);
}

const searchRecord = async (table: TableName, filters: { attr: string, value: any }[]) => {
    let query = xata.db[table];

    filters.forEach(filter => {
        query = (query as any).filter(filter.attr, filter.value);
    });

    const records: any = await query.getFirst();
    return JSON.parse(records);
}

const filterRecords = async (
    table: TableName,
    filters: { attr: string, value: any }[],
    sort: { attr: string, order: "asc" | "desc" } | null = { attr: "", order: "asc" }
) => {
    let query = xata.db[table] as any;

    // Apply filters
    filters.forEach(filter => {
        query = query.filter(filter.attr, filter.value);
    });

    // Apply sorting if specified
    if (sort && sort.attr) {
        query = query.sort(sort.attr, sort.order);
    }

    const records = await query.getMany();
    return JSON.parse(records);
}

// CREATE

const insertRecord = async (table: TableName, data: any) => {
    const record = await (xata.db[table] as any).create(data);
    return JSON.parse(record);
}

// UPDATE

const updateRecord = async (table: TableName, id: string, data: any) => {
    const record = await (xata.db[table] as any).update(id, data);
    return JSON.parse(record);
}

// DELETE

const deleteRecord = async (table: TableName, id: string) => {
    const record: any = await (xata.db[table] as any).delete(id);
    return JSON.parse(record);
}

export {
    getAllRecord,
    getRecordByID,
    searchRecord,
    filterRecords,
    insertRecord,
    updateRecord,
    deleteRecord
};
