# Workspace
Project management tool, bugtracker
status: IN DEVELOPMENT, draft stage. Design decisions, styling of elements are going to be changed.
The project is being created for learning purposes, and it going to be upgraded every day

<!-- How to contribute -->
## How to contribute

Here are the instructions on setting up the project locally.

### Installation

1. Fork <a href="https://github.com/Abrosss/Workspace">this</a> repository
2. Clone your fork
   ```sh
   git clone  https://github.com/<your_name>/Workspace.git
   ```
3. Navigate to the project directory
   ```sh
   cd Workspace
   ```
4. Add a reference to the original repository.
   ```sh
   git remote add upstream https://github.com/Abrosss/Workspace.git
   ```
5. Check that you now have two remotes: an origin that points to your fork, and an upstream that points to the project repository.
   ```sh
   git remote -v
   ```
6. Synchronize your local repository with the project repository. 
   ```sh
   git pull upstream main
   ```
7. Create a new branch. 
   ```sh
   git checkout -b <your_branch_name>
   ```
8. **Install NPM packages**
   ```sh
   npm install
   ```
9. Make changes in your local repository
10. Track your changes
   ```sh
   git add .
   ```
11. Commit your changes
   ```sh
   git commit -m "DESCRIPTION OF CHANGES"
   ```
12. Push these changes in your branch to your fork
   ```sh
   git push origin <your_branch_name>
   ```
13. To create a pull request, return to your fork on GitHub, and refresh the page.Click on `compare and pull request`
14. Add a title and description to your pull request explaining the changes you made.
15. Click the green `Create pull request` button.

You have now created a pull request!

