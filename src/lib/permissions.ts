import * as db from '@/lib/xata';

export const getPermissions = async (role: string, module: string) => {
    try {
        const roleRecord = await db.searchRecord('role', [{ attr: 'id', value: role }]);
        if (!roleRecord) throw new Error(`Role not found: ${role}`);

        const moduleRecord = await db.searchRecord('module', [{ attr: 'key', value: module }]);
        if (!moduleRecord) throw new Error(`Module not found: ${module}`);

        const permissionRecord = await db.searchRecord('permission', [
            { attr: 'role', value: roleRecord.id },
            { attr: 'module', value: moduleRecord.id },
        ]);

        return {
            canCreate: permissionRecord?.canCreate || false,
            canRead: permissionRecord?.canRead || false,
            canUpdate: permissionRecord?.canUpdate || false,
            canDelete: permissionRecord?.canDelete || false,
        };
    } catch (error) {
        console.error("Error fetching permission record:", error);
        return {
            canCreate: false,
            canRead: false,
            canUpdate: false,
            canDelete: false,
        };
    }
};
