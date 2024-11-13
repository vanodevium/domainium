import normalizeUrl from "normalize-url";

const normalize = (domain = "") => new URL(normalizeUrl(domain)).hostname;

export default normalize;
