
const mergeConfigs = (...configs) => {
    let result = {};
    for (const config of configs) {
        result = { ...result, ...config };
    }
    return result;
}

const defaults = { theme: "light", lang: "vi", size: 14 };

const user = { theme: "dark", size: 16 };

const session = { lang: "en" };

const final = mergeConfigs(defaults, null, user, undefined, session);

console.log(final);
