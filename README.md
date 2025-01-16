# Mist Gate

Mist Gate is a secure e-commerce application created to practice and showcase my skills.

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)
* [TODO](#todo)

## Features

* Secure login functionality
* Product cart
* Order management (except payment currently)
* Responsive design for all screen sizes

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/mist-gate.git`
2. Navigate to the project directory: `cd mist-gate`
3. Install the dependencies: `npm install`
4. Set up the backend server by cloning the separate repository: https://github.com/Aztaban/mist-server.git
5. Follow the installation instructions in the `mist-server` repository to set up the backend server.
6. Update the `baseUrl` in `src/api/apiSlice.ts` to point to your local backend server, for example:
```diff
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500', // Update this to your local backend server URL
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
```
7. Start the development server: `npm run dev`

Note: Please replace `http://localhost:3500` with the actual URL of your local backend server. Also, keep in mind that the `mist-server` repository is currently private, so you may need to update the link once it becomes public.

## Usage

Once the development server is running, you can access the e-shop at `http://localhost:3500`. You can log in using the provided credentials or create a new account.

## Contributing

Contributions are not currently accepted. This project is for showcasing my skills and is owned by me.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## TODO

* Add payment form
* Improve payment functionality with api handlers.
* Improve user with email, name, surname, save card, save address, prime user
* Improve user interface design
* Implement search functionality
* Add more products and categories