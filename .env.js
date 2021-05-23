
const NODE_ENV = 'dev'; // dev:开发环境 | test:测试环境  
let ENV_VAR = null;

if (process.env.NODE_ENV === "development") {

    ENV_VAR = {
        baseUrl: "http://zhongyong.wxneed.com"
    };

} else if (process.env.NODE_ENV === "production") {

    ENV_VAR = {
        baseUrl: "https://zy-api.wxthe.com"
    };

}

if (ENV_VAR) {
    process.uniEnv = {};
    for (let key in ENV_VAR) {
        process.uniEnv[key] = ENV_VAR[key];
    }
}