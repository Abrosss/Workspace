# Workspace
**Project management tool, bugtracker**
status: _IN DEVELOPMENT_ (draft stage) 
Design and styling of elements are going to be changed.

<!-- How to contribute -->
## How to contribute
If you have a suggestion that would make this project better, please fork the repository and create a pull request.
Any contributions you make are **greatly appreciated**! Thank you!
Here are the instructions on setting up the project locally.

_Replace everything in angle brackets with your <relevant_data> without including the brackets_

### Installation

1. Fork <a href="https://github.com/Abrosss/Workspace">this</a> repository.
2. Clone your fork.
   ```sh
   git clone  https://github.com/<your_name>/Workspace.git
   ```
3. Navigate to the project directory.
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
9. Make changes to files.
10. Track your changes.
   ```sh
   git add .
   ```
11. Commit your changes.
   ```sh
   git commit -m "<description_of_changes>"
   ```
12. Push these changes in your branch to your fork
   ```sh
   git push origin <your_branch_name>
   ```
13. To create a pull request, return to your fork on GitHub, and refresh the page.Click on `compare and pull request`
14. Add a title and description to your pull request explaining the changes you made.
15. Click the green `Create pull request` button.

You have now created a pull request! It's going to be reviewed!

