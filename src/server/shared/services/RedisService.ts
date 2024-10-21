export function generateCacheKey(url: string, params: any): string {
    const {w, h, gray, q, fm } = params;
    return `${url}?w=${w}&h=${h}&gray=${gray}&q=${q}&fm=${fm}`;
}
