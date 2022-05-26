import { ConfigService } from '@nestjs/config';
import fs = require('fs');

import { ConfigOptions } from 'src/config/config';

const generateTypeormConfigFile = (configSerivice: ConfigService) => {
  const typeormConfig = configSerivice.get(ConfigOptions.database);
  fs.writeFileSync('ormconfig.json', JSON.stringify(typeormConfig, null, 2));
};

export default generateTypeormConfigFile;
