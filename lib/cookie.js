'use server';

import { cookies } from 'next/headers';

export async function setCookie(name, value, options = {}) {
    const cookiesInstance = await cookies();
    cookiesInstance.set({
        name,
        value,
        httpOnly: options.httpOnly || false,
        secure: options.secure || false,
        path: options.path || '/',
        maxAge: options.maxAge || null,
        sameSite: options.sameSite || 'strict',
    });
    return value;
}


export async function getCookie(name) {
    const allCookies = await cookies();
    const value = allCookies.get(name)?.value || null;
    return value;
}

export async function deleteCookie(name) {
    const cookieStore = await cookies();
    cookieStore.delete(name);
}

export async function generateToken(length = 5) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }
    return token;
}