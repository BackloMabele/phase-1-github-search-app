//show DOM content first
document.addEventListener('DOMContentLoaded', () => {
    
    //global scope constant declaration with const
    const githubContainer = document.getElementById("github-container")
    const gitHubFormElements = document.getElementById('github-form');
    const gitHubSearchSubmission = document.getElementById('search');
    const gitHubUserListElements = document.getElementById('user-list');
    const gitHubReposListElements = document.getElementById('repos-list');
  
    // adding an event listener to the submission event
    gitHubFormElements.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = gitHubSearchSubmission.value;
      if (user) {
        searchForGitHubUsers(user);
      }
    });
  
    // using a function to fetch user data
    function searchForGitHubUsers(username) {
      const userFetchUrl = `https://api.github.com/search/users?q=${username}`;
      fetch(userFetchUrl)
        .then(response => response.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            const users = data.items[0];
            displayUserInfo(users);
            findTheUserRepositories(users.login);
          } else {
            alert('users not found.');
          }
        })
        .catch(error => console.error('error finding users:', error));
    }
  
    // displaying user information
    function displayUserInfo(users) {
      gitHubUserListElements.innerHTML = `
        <li>
        <p>Username: <a href="${users.html_url}" target="_blank">${users.login}</a></p>  
        <img src="${users.avatar_url}" alt="${users.login}" width="75" height="75">
        </li>
      `;
    }
  
    //using a function to fetch user repositories
    function findTheUserRepositories(user) {
      const userRepositoryUrl = `https://api.github.com/users/${user}/repos`;
      fetch(userRepositoryUrl)
        .then(response => response.json())
        .then(data => {
          displayTheUserRepositories(data);
        })
        //catching errors
        .catch(error => console.error('error getting repositories:', error));
    }
  
    //using a function to display the user repositories
    function displayTheUserRepositories(repos) {
      let htmlRepositories = '<h3>Repositories:</h3><ul>';
      repos.forEach(repo => {
        htmlRepositories += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
      });
      htmlRepositories += '</ul>';
      gitHubReposListElements.innerHTML = htmlRepositories;
    }
  });
  