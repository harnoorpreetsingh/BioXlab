export interface TestCategory {
  name?: string;
}

export interface Test {
  id: string;
  name: string;
  test_category: TestCategory | null; // included via join
}

export interface GroupedTestCategory {
  category: string;
  tests: {
    id: string;
    name: string;
  }[];
}

