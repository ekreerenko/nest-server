import { writeFileSync } from 'fs';

import { configService } from '../config/config.service';

writeFileSync('ormconfig.json',
 JSON.stringify(configService.getTypeOrmConfig(), null, 2)
);
