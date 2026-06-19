const mergeConfigs = (...configs) => { 
  return configs.reduce((result, config) => {
    if (config) {
      return { ...result, ...config };  
    }
    return result;
  }, {}); 
};

const defaults = { theme: "light", lang: "vi", size: 14 }; 
const user = { theme: "dark", size: 16 }; 
const session = { lang: "en" };

const final = mergeConfigs(defaults, user, null, session, undefined);
console.log(final); 