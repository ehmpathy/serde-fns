import { DomainLiteral } from 'domain-objects';
import { given, then } from 'test-fns';

import type { Serializable } from './Serializable';

// path to your definition

describe('Serializable type', () => {
  given('valid Serializable examples', () => {
    then('string, number, boolean, null are valid', () => {
      const a: Serializable = 'hello';
      expect(a);
      const b: Serializable = 42;
      expect(b);
      const c: Serializable = true;
      expect(c);
      const d: Serializable = null;
      expect(d);
    });

    then('array of serializables is valid', () => {
      const arr: Serializable = ['x', 1, false, null];
      expect(arr);
    });

    then('nested object is valid', () => {
      const obj: Serializable = {
        name: 'Alice',
        age: 30,
        tags: ['a', 'b'],
        profile: {
          bio: 'hello',
          nested: { level: 2 },
        },
      };
      expect(obj);
    });
  });

  given('invalid Serializable examples', () => {
    then('functions are not valid', () => {
      // @ts-expect-error: fn is not serializable
      const fn: Serializable = () => {};
      expect(fn);
    });

    then('undefined is not valid', () => {
      // @ts-expect-error: undefined is not serializable
      const u: Serializable = undefined;
      expect(u);
    });

    then('Date is not valid', () => {
      // @ts-expect-error: date is not serializable
      const d: Serializable = new Date();
      expect(d);
    });

    then('Map and Set are not valid', () => {
      // @ts-expect-error: map not serializable
      const m: Serializable = new Map();
      expect(m);

      // @ts-expect-error: set not serializable
      const s: Serializable = new Set();
      expect(s);
    });
  });

  given('a DomainObject instance', () => {
    interface Address {
      street: string;
      suite?: string;
      city: string;
      state: string;
      postal: string;
    }
    class Address extends DomainLiteral<Address> implements Address {}
    const address = new Address({
      street: '123 Elm Street',
      city: 'Austin',
      state: 'TX',
      postal: '78704',
    });

    then('cannot assign domain object to Serializable', () => {
      // @ts-expect-error: dobj not serializable
      const s: Serializable = address;
      expect(s);
    });
  });
});
