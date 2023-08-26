import { SalteAuth } from "@salte-auth/salte-auth";
import { GitLab } from "@salte-auth/gitlab";
import { Popup } from "@salte-auth/popup";
import axios from "axios";
import { useLiveStorageState } from "./useLiveSessionState.jsx";
import { Gitlab } from "@gitbeaker/rest";
import { Button } from "antd";
import { GITLAB_APP_ID, GITLAB_CALLBACK_URL, gitlabOAuthURL } from "./Data.jsx";

const GitLabOAuth = () => {
  const [authToken, setAuthToken] = useLiveStorageState("authToken", {
    token: "",
    authenticated: false,
    buttonText: "Login",
  });
  const [gitlabUser, setGitlabUser] = useLiveStorageState("gitlabUser", {});
  const auth = new SalteAuth({
    providers: [
      new GitLab({
        clientID: GITLAB_APP_ID,
        responseType: "code",
        scope: "api openid",
        redirectUrl: GITLAB_CALLBACK_URL,
      }),
    ],

    handlers: [
      new Popup({
        default: true,
      }),
    ],
  });

  const gitLabAPI = (token) =>
    new Gitlab({
      oauthToken: token,
    });

  const onLogin = () => {
    auth.login("gitlab").then().catch();
    auth.on("login", async (error, idToken) => {
      await axios
        .post(gitlabOAuthURL + "&code=" + idToken.data)
        .then((tokenValue) => {
          gitLabAPI(tokenValue.data.access_token)
            .Users.showCurrentUser()
            .then((value) => {
              setGitlabUser(value);
              setAuthToken({
                ...authToken,
                token: tokenValue.data.access_token,
                authenticated: true,
                buttonText: "Logout",
              });
            });
        });
    });
  };

  const onLogout = () => {
    setAuthToken({
      ...authToken,
      token: "",
      authenticated: false,
      buttonText: "Login",
    });
  };
  return (
    <div>
      <Button
        variant={"shadow"}
        color={authToken.authenticated ? "success" : "danger"}
        onClick={() => {
          if (authToken.authenticated) {
            onLogout();
          } else {
            onLogin();
          }
        }}
      >
        {authToken.authenticated ? `${gitlabUser.name}` : authToken.buttonText}
      </Button>
    </div>
  );
};

export default GitLabOAuth;
