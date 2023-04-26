import { container } from 'tsyringe';

import KafkaConfig from '@config/kafka';

import ITransporterProvider from './models/ITransporterProvider';

import KafkaJsProvider from './implementations/KafkaJsProvider';

container.registerInstance<ITransporterProvider>(
  'TransporterProvider',
  new KafkaJsProvider(KafkaConfig)
);
