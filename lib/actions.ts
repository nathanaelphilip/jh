'use server';

import { redirect } from 'next/navigation';

export const search = (params: string) => redirect(`/?${params}`);
