# Sleep360 Virtual Machine Docs

#### Original OS: Ubuntu 22.04

#### Host Name: sleep360.csse.rose-hulman.edu

## Installed Software:

- Ubuntu Server 24.04
- Microsoft SQL Server°
- NodeJS
- Btop

° MSSQL server 16.0.\_ is officially incompatible with the Ubuntu Server 24.04 LTS, but it does function fully if two extra packages are installed locally. In the future, upgrade the MSSQL version and remove any untracked dependencies. The .deb files for the untracked dependencies can be found in the csse user home directory and can be removed with:

`sudo apt remove <file.deb>`

## User Accounts:

sudo group users are marked with \*

#### PERSISTENT

- root
- csse\*
- mssql\*

#### AS NEEDED

- (other team member’s users here)

##### Account Management Guidelines

“PERSISTENT” accounts are permanent and should live through any ownership of the system. csse should be managed by the student responsible for the transition of the system to a new team each year. “AS NEEDED” accounts are the other student members of the team. After each academic year, they should be reviewed. If they are not remaining on the project for the next academic year, they should be removed for security.

## Microsoft SQL Server:

- Running MSSQL Express (Free License) on port 3306
- Database Accounts:
  - System Admins:
    - sa (disabled)
    - api (login disabled)
    - greenlwm
    - hallamcs
    - boykinjt
    - brookse1

## Web App Serving:

All served files are located under /srv and are owned by root. Nothing is containerized so
**THOROUGHLY VET ANY CODE RUN UNDER THIS DIRECTORY BY NODE OR OTHERWISE**

- Processes are managed by PM2. This document does not cover how to use PM2 as there are many other sources available that cover it
- Sleep360 App Specifics
  - Regular deploys should be covered by the deploy script, and should always be tested beforehand because this script performs no other validation
- PM2 automatically manages startup behavior, so no custom scripts are otherwise required
- A resources dashboard can be found at app.pm2.io, each new user needs to create an account and re-link to the dashboard from the server side. The free license allows a few users to be linked at a time.

## Transition Guidelines:

There are three components of transitioning the server and app:

- Github Repo
  - Ownership must be transferred
  - Old maintainers must be removed
- Linux VM
  - New team users must be added
  - Old team users must be removed
  - Review and delete any unused /home directories
  - Review and delete any unused groups
  - CSSE account
    - Add new SSH keys to the trusted keys in the .ssh directory
    - New owner must immediately log in and remove old owner’s keys
    - Communicate old user password and reset it as soon as possible. Best course of action would be for the old owner to expire the account credentials on logout
    - Communicate any otherwise important information concerning active processes or items in need of maintenance
- MSSQL Server
  - New team users must be added
  - Old team users must be removed (swap API password when this happens)
  - New team users can remove old team users after transition

## Troubleshooting

#### If the website is not up:

1. Check if the server responds (try to ping/login)
   a. If not, contact the VM system administrator (currently Darryl Mouck)
2. Log in and check that pm2 is running
   a. If not, start pm2
3. Check that sleep360 is running under pm2
   a. If not, run the deploy.sh script in the repo

#### If the website cannot communicate with the database (errors when trying to log in or view reports):

1. Check if the server responds (try to ping/login)
   a. If not, contact the VM system administrator (currently Darryl Mouck)
2. Log in and check that SQL server has a process ID
   a. If not, start SQL server
3. Ensure SQL server can run properly, check that no port conflicts have occurred
   a. If not, stop whatever process is running on the SQL port

#### Other errors:

1. Run the local instance
   a. If errors persist, it is a problem in the app itself
   b. Otherwise, it is a server-side issue

## Sunsetting (app shutdown)

The simplest way to sunset the app is to shut down the VM. This will ensure the website and database are no longer running. If any data should be preserved (e.g. for future restarting of the app) then it must be backed up prior to VM shutdown and saved on a separate storage device. MSSQL server has a built in back-up and restore function which can be accessed from the DBMS. It will generate a file which can be copied anywhere.

Finally, ensure access rights to the repository remain as desired, or that the repository is deleted if there are no plans to reinstate the app.

## Sunrising (app restart)

From a fresh VM instance, install the software found in the `Installed Software` section, and restore the backup of the SQL server. Clone the repository to the /srv directory and run the deploy script.
