# VPCI Clubs Website

The official website for VPCI clubs (currently under development).

## Constraints

As this website is ultimately associated with the school, there are some constraints related to its development that should be adhered to when possible. These constraints are described below.

### Independence

The website **should not** depend on external resources hosted by an individual account. All the code and services necessary to run the main features of the website should be deployable using GitHub pages. This comes with a few implications:

- The website should not depend on a backend for the main features to work.
- The website's main features should not depend on the API of a third-party service.
- The website should not depend on any secrets as all the code for the website is public on the repository.

These constraints may be reconsidered in the future should the functionality of the website extend beyond a client-only website, but for the time-being, a backend for a school website is impractical for many reasons, not limited to:

- The limitations of free backend service providers (e.g. Heroku putting Dynos to sleep).
- The significant costs and maintenance requirements of a backend server.
- The need for a backend service to be linked with an individual's account.

Note that this constraint does not apply to **optional** services associated with the functionality of the website. For example, one of the features/integrations includes the automatic update of the clubs from a Google Sheets, which depends on the use of a backend server. However, note that this service is not necessary for the **main functionality** of the website (i.e. the website functions perfectly without this service). Thus, the constraint of independence does not apply. However, if the website needed to read from the list of clubs from the Google Sheets on page load, then this service would no longer become optional as the website would then depend on the service for one of its main functionalities (displaying a list of clubs). To learn more about this example, check out the [README](https://github.com/Vic-Park/vic-park.github.io/tree/dev/google-sheets-auto-update) of the Google Sheets Auto PR service.

### Automation

Whenever possible, non-code changes/updates to the website should be automated. As a school website, it is unreasonable to expect staff members to own a GitHub account, as GitHub is mainly a site for developers. It is also impractical for the developers to have to manually update the site for changes for things that can be easily automated, such as a new announcement or changes to a club description. Thus, when adding a new feature, try your best to reduce as much manual effort required from developers when the feature is used by end-users.

### Code Quality

As a student-led effort, it is ultimately our responsibility to make sure that our code is understandable by one another. Thus, please keep in mind that other students may have to work with your code in the future (especially when you graduate), and that it is your responsibility to make sure that the code is readable and well-commented. Avoid using obscure syntax or hard-to-understand names for your variables. While there are linters and formatters to help keep the code clean, it is ultimately up to the developer to enforce a reasonable level of readability for their code.

## Branches

There are 3 main branches on this repository: `dev`, `master`, and `gh-pages`. The `dev` branch is where the main development occurs; this branch does not get deployed to GitHub pages. The `master` branch contains the most recent code that has been deployed to GitHub Pages (using an automated GitHub action). The `gh-pages` branch contains the built and minified code that is hosted by GitHub actions; you should not need to interact with this branch. For certain features/development-in-progress, it is recommended to create your own branch before merging with the `dev` branch to avoid breaking things for other developers.
