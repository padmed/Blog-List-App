const { dummy } = require("../utils/list_helper");

describe("test dummy", () => {
  test("test dummy with empty array", () => {
    const blogs = [];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });

  test("test dummy with 1 value", () => {
    const blogs = [1];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });

  test("test dummy with arbitrary values", () => {
    const blogs = [1, 2, 3, 4];
    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});
