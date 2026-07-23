export function getAppBaseUrl(origin?: string | null) {
    if (origin?.trim()) {
        return origin.replace(/\/+$/, '')
    }

    const configuredLink = process.env.NEXT_PUBLIC_LINK?.trim()
    if (configuredLink) {
        return configuredLink.replace(/\/+$/, '')
    }

    return process.env.NEXT_PUBLIC_LINK
}

export function getRedirectUrl(path: string, origin?: string | null) {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${getAppBaseUrl(origin)}${normalizedPath}`
}
