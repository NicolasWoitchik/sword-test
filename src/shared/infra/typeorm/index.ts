import { Logger } from 'tslog';
import { createConnection } from 'typeorm';

const logger = new Logger({
  prefix: ['[TypeOrm]'],
});

export default function execute(): Promise<void> {
  return createConnection().then(() => {
    logger.info('Connection stabilished');
  });
}
