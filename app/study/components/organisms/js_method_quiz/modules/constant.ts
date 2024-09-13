export const INIT_CATEGORY_GROUP = {
  Array: [],
  String: [],
  Object: [],
  Map: [],
  Date: [],
  Math: [],
  URL: [],
};

export const CATEGORY_ID = {
  Array: {
    startId: 1,
    endId: 50,
  },
  String: {
    startId: 51,
    endId: 100,
  },
  Object: {
    startId: 101,
    endId: 150,
  },
  Map: {
    startId: 151,
    endId: 200,
  },
  Date: {
    startId: 201,
    endId: 250,
  },
  Math: {
    startId: 251,
    endId: 300,
  },
  URL: {
    startId: 301,
    endId: 350,
  },
} as const;

export const CORRECT_IMAGES: readonly string[] = [
  'yes',
  'yeah',
  'great',
  'awesome',
];
export const INCORRECT_IMAGES: readonly string[] = [
  'no',
  'oh-no',
  'omg',
  'oops',
];

export const TIME_LIMIT = 10 as const;
