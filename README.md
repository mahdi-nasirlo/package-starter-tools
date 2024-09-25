# Open Id Connect React Provider
[![npm version](https://img.shields.io/npm/v/@nasirlo-m/opic-starter-tools.svg)](https://www.npmjs.com/package/@nasirlo-m/opic-starter-tools)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

### Overview
`oidc-react-hub-connector` is an enhancement for the `oidc-react` library, allowing seamless integration with OpenID Connect hubs. This package enables a socket connection to the hub and listens for specific messages, such as “kill user” signals. It provides an easy way for developers to define custom behaviors in response to these messages via props passed to the provider.


### Features

- Connects to an OpenID Connect hub via WebSocket.
- Listens for incoming messages from the hub.
- Calls a custom function from props upon receiving specific messages (e.g., “kill user”).
- Ideal for implementing notifications, session timeouts, and more.


## Installation

```bash
npm i @nasirlo-m/opic-starter-tools
```

## Usage

To use `oidc-react-hub-connector`, follows these simple steps:

1. **Wrap your application with the `OIDCProvider`.**
2. **Pass the config enticement and handler function as a prop to the provider.**

## Example

### General Config To SSO

In this example, we demonstrate how to use the `AuthProvider` from the `@nasirlo-m/opic-starter-tools` library to configure your application to connect to a Single Sign-On (SSO) system. The `AuthProvider` wraps your application and provides authentication functionality based on the OpenID Connect protocol.

```javascript
import { AuthProvider } from '@nasirlo-m/opic-starter-tools'

function App() {

  return (
    <AuthProvider
      // general config for connect to SSO
      authority={process.env.NEXT_PUBLIC_OPIC_AUTHORITY}
      responseType="code"
      loadUserInfo={false}
      clientId={process.env.NEXT_PUBLIC_OPIC_CLIENT_ID}
      clientSecret={process.env.NEXT_PUBLIC_OPIC_CLIENT_SECRET}
      scope="openid profile offline_access estsecurity.read"
      redirectUri={window.location.origin}
      // general config for connect to SSO
    >
      {/* children component */}
    </AuthProvider>
  )
}

export default App

```
## Protected Routes 

In addition to the basic configuration, you can utilize the `autosignin` prop within the `AuthProvider` to enable automatic sign-in behavior. When `autosignin` is set to `true`, the application will handle the authentication process without rendering its child components until the authentication is complete. During this time, a loading state will be displayed.

Here’s an updated example illustrating how to implement this functionality:

```javascript
import { AuthProvider } from '@nasirlo-m/opic-starter-tools'

function App() {

  return (
    <AuthProvider
        // ..... 
        // general config for connect to SSO
        loading={<>loading ....</>}
        autoSignIn={true}
    >
      {/* children component */}
    </AuthProvider>
  )
}

export default App

```

## Integrating Axios with SSO Authentication

To facilitate API calls using the token obtained from the SSO authentication, you can pass an `axiosInstance` prop to the `AuthProvider`. This allows the `AuthProvider` to automatically set the Bearer token in the headers of the specified Axios instances after successful authentication.

Here’s an example of how to implement this feature:

```javascript
import { AuthProvider } from '@nasirlo-m/opic-starter-tools';
import axios from 'axios';

const baseAxios = axios.create({
  baseURL: 'https://api.yourservice.com', // Set your API base URL
  timeout: 1000, // Optional: Set the timeout for requests
});

function App() {
  return (
    <AuthProvider
       // ..... 
        // general config for connect to SSO
      autosignin={true} // Enable automatic sign-in
      loading={<LoadingComponent />} // Loading component to display during authentication
      axiosInstance={[baseAxios]} // Pass Axios instance(s)
    >
      {/* Children component will not render until authentication is complete */}
    </AuthProvider>
  );
}

export default App;
```

## Handling User Events with `onKillUser` and Socket Events

In addition to SSO authentication, the `AuthProvider` can be configured to manage user-related events and socket interactions using the `onKillUser` and `socketEventKeys` props. These props provide an effective way to handle specific scenarios such as user session termination and real-time updates from a socket connection.

```javascript
import { AuthProvider } from '@nasirlo-m/opic-starter-tools';
import axios from 'axios';

function App() {
  return (
    <AuthProvider
        // ..... 
        // general config for connect to SSO
        autosignin={true} // Enable automatic sign-in
        onKillUser={(data, signOut) => 
            notification.open({
                type: "error",
                message: data,
                duration: 0,
                onClose: signOut 
            })
        }
        socketEventKeys={[{ eventName: "TestEvent", onClose: (data) => { console.log(data) } }]}
    >
      {/* Children component will not render until authentication is complete */}
    </AuthProvider>
  );
}

export default App;
```
