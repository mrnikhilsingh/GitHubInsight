# GitHubInsight

GitHub Insight is a React application using the GitHub API that allows searching and viewing of GitHub profiles. The application offers in-depth information on repositories, followers, following, and more, which may be very helpful for users while working with GitHub profiles.

![App Screenshot](https://github.com/mrnikhilsingh/GitHubInsight/blob/main/src/assets/showcase_design.png)

## Features

- **Profile Search**: Search Github user profiles based on their username.
- **Repository Overview**: View repositories of a user with pagination.
- **Forked Repositories**: Explore the forked repositories of a user.
- **Followers & Following**: Get details about the followers and users being followed.
- **Responsive Design**: Optimized for all screen sizes using Material-UI components.
- **Lazy Loading**: API calls are made only when any of the 'Forked', 'Followers', and 'Followings' tabs are clicked.

## Demo

Try the live site for GitHub Insight at [Website Link](https://githubinsights.netlify.app/).

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mrnikhilsingh/GitHubInsight.git
```

2. Navigate to the project directory:

```bash
cd GitHubInsight
```

3. Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

### Running the App

To start the development server, run:

```bash
npm start
```

or

```bash
yarn start
```

The app will be available at http://localhost:5173.

## Usage

1. Type a GitHub username or Organization name into the searchbox.
2. View profile details, repositories, followers, and following lists.
3. Use the pagination controls to navigate through the repositories.
4. Click different tabs to load respective data: Forked Repositories, Followers, Following.

## Technologies Used

- **React:** Frontend library for building the user interface.
- **Material-UI:** UI components for a responsive and modern design.
- **Axios:** HTTP client for API requests.
- **GitHub API:** Fetching GitHub profile data.

## Contributing

Contributions are welcome! If you'd like to report a bug, suggest a feature, or improve the codebase, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. For further details, please refer to the [LICENSE](./LICENSE) file.

## Contact

For any inquiries or feedback, feel free to reach out:

- [Nikhil Singh](https://www.github.com/mrnikhilsingh/)
- Email: [m.j882600@gmail.com](mailto:m.j882600@gmail.com)
