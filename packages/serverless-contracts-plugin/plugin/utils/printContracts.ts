import { ContractsLocation } from '../../types/locations';
import { ServerlessContracts } from '../../types/serviceOptions';

export const printContracts = (
  { provides, consumes }: ServerlessContracts,
  contractsLocation: ContractsLocation,
): void => {
  console.log(`--- Serverless contracts for location ${contractsLocation} ---`);
  console.log();
  console.log('-- Provides --');
  console.log();
  console.log(JSON.stringify(provides));
  console.log();
  console.log('-- Consumes --');
  console.log(JSON.stringify(consumes));
};
