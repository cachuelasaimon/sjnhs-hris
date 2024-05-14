import {
  CollectionReference,
  DocumentReference,
  DocumentSnapshot,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import type { WhereFilterOp } from 'firebase/firestore';

import { NewItem } from '~/types';
import { database } from '~/utils';
// import { useEffect, useState } from "react";

export interface ISetDocProps<T> {
  docRef: string | DocumentReference;
  data: T;
}

export interface IAddDocProps<T> {
  collectionRef: string | CollectionReference;
  data: NewItem<T>;
}

export interface IGetOneDocumentProps {
  docRef: DocumentReference | string;
}

export interface ICollectionWithQueryProps {
  collectionRef: string | CollectionReference;
  queryParams: {
    key: string;
    operator: WhereFilterOp;
    searchValue: any;
  };
}

/**
 * This function sets data in a Firestore document using TypeScript and React.
 * @param  - The `Set` function takes in an object with the following parameters:
 */
export const Set: <T>(params: ISetDocProps<T>) => any = async ({
  docRef,
  data,
}) => {
  try {
    await setDoc(
      typeof docRef === 'string' ? doc(database, docRef) : docRef,
      data as any
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * The `Add` function asynchronously adds a document to a Firestore collection with additional data and
 * a creation timestamp.
 * @param  - The `Add` function takes in an object `params` with the following properties:
 */
export const Add: <T>(params: IAddDocProps<T>) => any = async ({
  collectionRef,
  data,
}) => {
  try {
    await addDoc(
      typeof collectionRef === 'string'
        ? collection(database, collectionRef)
        : collectionRef,
      {
        ...data,
        createdAt: new Date(),
      }
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCollectionWithQuery: (
  params: ICollectionWithQueryProps
) => any = async ({ collectionRef: _a, queryParams: _b }) => {
  try {
    // const { key, operator, searchValue } = queryParams;
    // const q = query(collectionRef, where(key, operator, searchValue));
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * The function `Get` retrieves data from a Firestore document using a DocumentReference or document
 * path.
 * @param  - The `Get` function is an asynchronous function that retrieves a document from a Firestore
 * database using the provided `docRef`. The `docRef` parameter can be either a `DocumentReference`
 * object or a string representing the path to the document.
 * @returns The `Get` function is returning the data from a document specified by the `docRef`
 * parameter as type `T`.
 */
export const Get = async <T,>({
  docRef,
}: {
  docRef: DocumentReference | string;
}) => {
  try {
    const snap: DocumentSnapshot = await getDoc(
      typeof docRef === 'string' ? doc(database, docRef) : docRef
    );

    return snap.data() as T;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Set;
