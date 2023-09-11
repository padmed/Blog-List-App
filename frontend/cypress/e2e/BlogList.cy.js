describe("BlogList", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/api/testing/reset`);

    const newUser = {
      name: "tester",
      username: "test",
      password: "test",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/api/users`, newUser);

    cy.visit("");
  });

  it("Login page can be opened", function () {
    cy.get("body").contains("Log in to application");
  });

  describe("Login", function () {
    it("Logging in works", function () {
      cy.get("#usernameInput").type("test");
      cy.get("#passwordInput").type("test");
      cy.get("#loginButton").click();

      cy.get("body")
        .should("contain", "tester is logged in")
        .and("contain", "Logged in as tester");
    });

    it("Fails with the wrong credentials", function () {
      cy.get("#usernameInput").type("unexisted");
      cy.get("#passwordInput").type("unexisted");
      cy.get("#loginButton").click();

      cy.contains("Invalid username or password")
        .parent()
        .should("have.css", "border", "4px solid rgb(255, 0, 0)");
    });
  });

  describe("While logged in", function () {
    beforeEach(function () {
      cy.loginUser({ username: "test", password: "test" });
    });

    it("Blog can be created", function () {
      cy.contains("Add new blog").click();
      cy.get("#title").type("title of a blog");
      cy.get("#author").type("author of a blog");
      cy.get("#url").type("url of a blog");
      cy.get("#createBlogButton").click();

      cy.contains('A new blog "title of a blog" added')
        .parent()
        .should("have.css", "border", "4px solid rgb(0, 128, 0)");

      cy.contains("title of a blog author of a blog");
    });

    describe.only("When the blogs are created", function () {
      beforeEach(function () {
        const fistBlog = {
          title: "first blog",
          author: "author of the first blog",
          url: "url of the first blog",
        };
        cy.createBlog(fistBlog);

        const secondBlog = {
          title: "second blog",
          author: "author of the second blog",
          url: "url of the second blog",
        };
        cy.createBlog(secondBlog);
      });

      it("Blog can be fully viewed", function () {
        cy.contains("first blog").contains("View").click();
        cy.contains("first blog").parent().as("firstBlog");
        cy.get("@firstBlog").contains("url of the first blog");
        cy.get("@firstBlog").contains("Likes");
      });

      it("Blogs are sorted in order by likes", function () {
        cy.contains("second blog").contains("View").click();
        cy.contains("second blog").parent().as("blogToLike");
        cy.get("@blogToLike").contains("Like").click();
        cy.wait(500);
        cy.get("@blogToLike").contains("Like").click();
        cy.get(".blog").eq(0).should("contain", "second blog");
      });

      describe("When the blog is fully viewed", function () {
        beforeEach(function () {
          cy.contains("first blog").contains("View").click();
        });

        it("Blog can be liked", function () {
          cy.contains("Likes").contains("Like").click();
          cy.contains("Likes 1");
        });

        it("Blog can be deleted", function () {
          cy.contains("Delete").click();
          cy.contains("Deleted Succesfully");
          cy.should("not.contain", "first blog");
        });
      });

      describe("When another user logs in", function () {
        beforeEach(function () {
          cy.clearAllLocalStorage();
          cy.visit("");
          const anotherUser = {
            name: "another tester",
            username: "test2",
            password: "test2",
          };

          cy.addNewUser(anotherUser);
          cy.loginUser({
            username: anotherUser.username,
            password: anotherUser.password,
          });
        });

        it("Blog cannot be deleted by another user", function () {
          cy.contains("first blog").contains("View").click();
          cy.contains("first blog").parent().should("not.contain", "Delete");
        });
      });
    });
  });
});
