# VPCI Clubs Auto Update

This is a service that reads the contents from a Google Sheets and programmatically updates the data files in the repository using the GitHub API.

This service was deliberately created in a way that makes it an optional service (i.e. not necessary for the functioning of the main website). This is the reason why we didn't just dynamically load the data from the Google Sheets every time the page was loaded; this would cause the website to become dependent on this service, violating the constraint of independence—should the backend server malfunction, the main website would also end up breaking.

## Elements

The two main elements of this service are the backend (which should be hosted on a cloud service like Heroku), and the Google Apps Script (which should be attached to a Google Sheets).

## Flow

1. The backend hosts a minimalistic UI which allows the user to press a button to update the site provided they know the secret.
2. The button sends a post request to the backend, triggering the update function.
3. The backend verifies that the secret is valid.
4. The backend then retrieves the data from the Google Sheets, parses them, and compares them to the files currently active on the repository.
5. If changes were detected between the Google Sheets' data and the repository, the backend will then programmatically update files in the repository, making sure only to trigger the GitHub Actions on the last file that needs to be updated.
6. The GitHub actions workflow will automatically be run and will re-build and update the main site.

## Requirements

In order for the backend to read the content of the Google Sheets, it needs an account's Google Cloud credentials and access to the Google Sheets API.
