import 'models';
import { databaseService } from 'utils/database';

async function syncDatabase() {
  await databaseService.authenticate();
  console.log('Connection with the DB was successful');

  await databaseService.sync({
    // force: true,
  });
  console.log('All schemes were created successfully');
}

syncDatabase().catch((err) => {
  console.error('Error when syncing database', { err });
  databaseService.close();
});
