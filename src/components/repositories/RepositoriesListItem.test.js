import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RepositoriesListItem from "./RepositoriesListItem";

function renderComponent() {
  const repository = {
    full_name: "facebook/react",
    language: "Javascript",
    description: "test description",
    owner: "c0demonkey",
    name: "react",
    html_url: "https://github.com/test-user/test-repo",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
}

test("shows a link to the github repo", async () => {
  const { repository } = renderComponent();

  await screen.findByRole("img", { name: "Javascript" });

  const link = screen.getByRole("link", {
    name: /github repository/i
  });
  expect(link).toHaveAttribute("href", repository.html_url);
});

test("shows a file icon with the appropriate icon", async () => {
  renderComponent();

  const icon = await screen.findByRole("img", { name: "Javascript" });

  expect(icon).toHaveClass("js-icon");
})