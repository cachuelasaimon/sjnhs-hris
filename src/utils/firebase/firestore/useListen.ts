import { useEffect, useState } from 'react';

import {
  CollectionReference,
  DocumentSnapshot,
  collection,
  onSnapshot,
} from 'firebase/firestore';

import { database } from '~/utils';

export interface IFilterParams<T> {
  key: keyof T;
  value: string | number | object;
}
export interface IListenProps<T> {
  collectionRef: CollectionReference | string;
  filters?: IFilterParams<T>[];
}

/**
 * @param collectionRef - firebase CollectionReference, object can be used for adding documents, getting document references, and querying for documents (using query).
 * @returns { docs, isLoading } Array of items in the type of generic provided and a loading state for rendering loading UI
 */

export const useListen = <T>({ collectionRef, filters }: IListenProps<T>) => {
  const [docs, setDocs] = useState<T[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      if (!collectionRef) {
        return;
      } else {
        onSnapshot(
          typeof collectionRef === 'string'
            ? collection(database, collectionRef)
            : collectionRef,
          (snapshot: any) => {
            // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";

            // Filter Documents
            if (!!filters && filters.length > 0) {
              let filteredDocs: T[] | null = [];
              filteredDocs = snapshot.docs
                .map((doc: DocumentSnapshot) => ({
                  id: doc.id,
                  ...doc.data(),
                  // doc,
                }))
                .filter((doc: T) =>
                  filters.some((filter) => doc[filter.key] === filter.value)
                );
              setDocs(filteredDocs);
            } else {
              setDocs(
                snapshot.docs.map((doc: DocumentSnapshot) => ({
                  id: doc.id,
                  ...doc.data(),
                  doc,
                }))
              );
            }
            // console.log(
            //   "data: ",
            //   snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
            // );
            setIsLoading(false);
          }
        );
      }
    };

    if (isLoading) fetch();
  }, [collectionRef, isLoading, filters]);

  return { docs, isLoading };
};
