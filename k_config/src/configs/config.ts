import common from "./common";
import local from "./local";
import dev from "./dev";
import prod from "./prod";

const phase = process.env.NODE_ENV;
console.log(`phase: ${phase}`);

let conf = {}; // phase에 따라 적절한 환경 변숫값을 conf에 저장
if(phase === 'local') {
    conf = local;
} else if(phase === 'dev') {
    conf = dev;
} else if(phase === 'prod') {
    conf = prod;
}

// export default () => ({
//     ...common,
//     ...conf
// });


import { readFileSync } from "fs";
import * as yaml from 'js-yaml';

const yamlConfig: Record<string, any> = yaml.load(
    readFileSync(`${process.cwd()}/envs/config.yaml`, 'utf8'),
)

export default () => ({
    ...common,
    ...conf,
    ...yamlConfig
});