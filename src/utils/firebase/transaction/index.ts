import { doc, runTransaction, setDoc } from 'firebase/firestore';

import { database, getPropertyByString } from '~/utils';

/**
 * @param read - contains ref and array of properties to read
 * @param write - contains ref and array of properties to read, properties array must be of the same length with the prperties array or read
 */

interface ITransactionParams {
  ref: string;
  properties: string[];
}

interface ITransactionProps {
  read: ITransactionParams;
  write: { initialProps: Record<string, unknown> } & ITransactionParams;
}

const createSimpleTransaction = async (
  transactions: ITransactionProps[]
): Promise<any> => {
  try {
    const values: any[] = [];
    await Promise.all(
      transactions.map(({ read, write }) => {
        if (read.properties.length !== write.properties.length) {
          throw new Error(
            'Read and Write Properties are not the same length, transation cancelled'
          );
        }
        return runTransaction(database, async (transaction) => {
          const srcDoc = await transaction.get(doc(database, read.ref));
          const writeDoc = await transaction.get(doc(database, write.ref));
          if (!writeDoc) {
            await setDoc(writeDoc, write.initialProps);
          }
          if (!srcDoc.exists) {
            throw new Error(`${read.ref} doesn't exists`);
          }
          const newValue = {};

          read.properties.forEach((property, index) => {
            Object.assign(newValue, {
              [write.properties[index]]: getPropertyByString(
                srcDoc.data(),
                property
              ),
            });
          });
          //   transaction.update(doc(database, write.ref), newValue);
        });
      })
    );
    return values;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default createSimpleTransaction;
