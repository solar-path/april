import { fail, superValidate, withFiles } from "sveltekit-superforms";
import { companySchema, deleteCompanySchema } from "./company.schema";
import { zod } from "sveltekit-superforms/adapters";
import { db } from "$lib/database/db";
import { companyTable } from "$lib/database/schema/entity";
import { eq } from "drizzle-orm";
import { fileProcessor } from "$lib/helpers/fileProcessor";

export const actions = {
    // COMPANY CRUD
createCompany: async (event) => {
    const form = await superValidate(await event.request.formData(), zod(companySchema));

    if (!form.valid) {
        console.log('invalid form => ', form);
        if (!form.valid) return fail(400, withFiles({ form }));
    }

    const checkCompany = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.title, form.data.title.trim() as string));

    if (checkCompany.length > 0) {
        return fail(400, { form, error: 'Company already exists' });
    }

    await db.insert(companyTable).values({
        id: crypto.randomUUID(),
        title: form.data.title.trim(),
        description: form.data.description?.trim(),
        logo: form.data.logo instanceof File ? await fileProcessor(form.data.logo, 'logo') : '',
        type: 'company', // Ensure this is a valid value
        regionId: form.data.regionId,
        workspaceId: form.data.workspaceId,
        industryId: form.data.industryId,
        BIN: form.data.BIN.trim().toUpperCase(),
        author: event.locals.user?.id as string
    });

    return withFiles({ form });
},
updateCompany: async (event) => {
    console.log('update company endpoint reached');
    const form = await superValidate(await event.request.formData(), zod(companySchema));
    if (!form.valid) {
        console.log('form is not valid => ', form);
        return fail(400, { form });
    }
    return { form };
},
deleteCompany: async (event) => {
    console.log('delete company endpoint reached');
    const form = await superValidate(await event.request.formData(), zod(deleteCompanySchema));
    if (!form.valid) {
        console.log('form is not valid => ', form);
        return fail(400, { form });
    }
    const record = await db
        .select()
        .from(companyTable)
        .where(eq(companyTable.id, form.data.id as string));

    if (record.length === 0) {
        return fail(400, { form, error: 'Company not found' });
    }

    await db.delete(companyTable).where(eq(companyTable.id, form.data.id as string));
    return { form };
},
}