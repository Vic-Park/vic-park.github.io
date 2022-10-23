# VPCI Clubs Auto Update

This is a service that reads the contents from a Google Sheets and programmatically updates the data files in the repository using the GitHub API.

This service was deliberately created in a way that makes it an optional service (i.e. not necessary for the functioning of the main website). This is the reason why we didn't just dynamically load the data from the Google Sheets every time the page was loaded; this would cause the website to become dependent on this service, violating the constraint of independence—should the backend server malfunction, the main website would also end up breaking.

## Elements

This service currently consists of only a backend (which should be hosted on a cloud service like Heroku). While there were originally plans to also include a Google Apps Script, some limitations with Google Apps prevented us from moving forward with that idea. Instead, teachers will now manually visit a page on the frontend which will send a request to the backend to update the website.

## Flow

1. The frontend has an update page which prompts the user for a secret and then sends a request to the backend, triggering the update function.
2. The backend verifies that the secret sent by the frontend is valid.
3. The backend then retrieves the data from the Google Sheets, parses them, and compares them to the files currently active on the repository.
4. If changes were detected between the Google Sheets' data and the repository, the backend will then programmatically update files in the repository, making sure only to trigger the GitHub Actions on the last file that needs to be updated.
5. The GitHub actions workflow will automatically be run and will re-build and update the main site.

## Requirements

In order for the backend to read the content of the Google Sheets, it needs an account's Google Cloud credentials and access to the Google Sheets API.

# VPCI Clubs Auto Update Backend

## Hosting

Store these values in GitHub secrets:

**SECRET** - The secret which must be entered for the auto-update script to run.

**SPREADSHEET_ID** - The ID of the Google Sheet from where to collect the data.

**GH_TOKEN** - A generated GitHub token from the GitHub account with which you wish to associate changes to the repository.