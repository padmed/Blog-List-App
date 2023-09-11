import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import testHelpers from "./testHelpers";

test("Blog is rendered in initial state", () => {
  const { container } = testHelpers.renderBlog();
  const previewedBlog = container.querySelector(".previewedBlog");

  expect(previewedBlog).not.toHaveStyle("display: none");
  expect(previewedBlog).not.toHaveTextContent(testHelpers.blog.likes);
  expect(previewedBlog).not.toHaveTextContent(testHelpers.blog.url);

  expect(previewedBlog).toHaveTextContent(testHelpers.blog.author);
  expect(previewedBlog).toHaveTextContent(testHelpers.blog.title);
});

test("Complete blog is shown when clicking on the button", async () => {
  const { container } = testHelpers.renderBlog();

  const viewButton = screen.getByRole("button", { name: /view/i });
  const user = userEvent.setup();
  await user.click(viewButton);

  const previewedBlog = container.querySelector(".previewedBlog");
  expect(previewedBlog).toHaveStyle("display: none");

  const viewedBlog = container.querySelector(".viewedBlog");
  expect(viewedBlog).not.toHaveStyle("display: none");
  expect(viewedBlog).toHaveTextContent(testHelpers.blog.url);
  expect(viewedBlog).toHaveTextContent(testHelpers.blog.likes);
  expect(viewedBlog).toHaveTextContent(testHelpers.blog.title);
  expect(viewedBlog).toHaveTextContent(testHelpers.blog.author);
});

test("Event handler is called when like button is pressed", async () => {
  testHelpers.renderBlog();

  const viewButton = screen.getByRole("button", { name: /view/i });
  const user = userEvent.setup();
  await user.click(viewButton);

  const mockLikeHandler = testHelpers.mockUpdateBlog;
  const likeButton = screen.getByRole("button", { name: /like/i });
  await user.click(likeButton);
  expect(mockLikeHandler.mock.calls).toHaveLength(1);

  await user.click(likeButton);
  expect(mockLikeHandler.mock.calls).toHaveLength(2);
});
