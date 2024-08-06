import { insertRecord, searchRecord } from "@/lib/xata";

export const upsertUser = async (user: any) => {
    const existingUser = await searchRecord('user', [{ attr: 'email', value: user.email }]);

    if (!existingUser) {
        const userRecord = await insertRecord('user', { email: user.email });
        return userRecord;
    }

    return existingUser;
}