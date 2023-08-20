import {Button} from "antd";
import {SalteAuth} from '@salte-auth/salte-auth';
import {GitLab} from '@salte-auth/gitlab';
import {Popup} from "@salte-auth/popup";
import axios from "axios";
import {useLiveSessionState} from "./useLiveSessionState.jsx";
import {GitlabOutlined} from "@ant-design/icons";
import {Gitlab} from "@gitbeaker/rest";

const GITLAB_APP_ID = '821d3be84f59e96edf5cc524838ffa8e692dbc3d1397ebe4745230f4b60e120e';
const GITLAB_CALLBACK_URL = 'http://localhost:5173/expense-tracker';
const gitlabOAuthURL = `https://gitlab.com/oauth/token?client_id=${GITLAB_APP_ID}&redirect_uri=${encodeURIComponent(GITLAB_CALLBACK_URL)}&grant_type=authorization_code&scope=api openid`;

const GitLabOAuth = () => {

    const [authToken, setAuthToken] = useLiveSessionState("authToken", {
        token: "", authenticated: false, buttonText: "Login using GitLab"
    })
    const [gitlabUser, setGitlabUser] = useLiveSessionState("gitlabUser", {})
    const auth = new SalteAuth({
        providers: [new GitLab({
            clientID: GITLAB_APP_ID, responseType: 'code', scope: 'api openid', redirectUrl: GITLAB_CALLBACK_URL
        })],

        handlers: [new Popup({
            default: true
        })]
    });

    const gitLabAPI = (token) => new Gitlab(
        {
            oauthToken: token
        }
    )

    const onLogin = () => {
        auth.login("gitlab").then().catch();
        auth.on('login', async (error, idToken) => {
            await axios.post(gitlabOAuthURL + '&code=' + idToken.data).then(tokenValue => {
                gitLabAPI(tokenValue.data.access_token).Users.showCurrentUser().then((value) => {
                    setGitlabUser(value)
                    setAuthToken({
                        ...authToken, token: tokenValue.data.access_token, authenticated: true, buttonText: "Logout"
                    })
                })
            })
        })
    }

    const onLogout = () => {
        setAuthToken({
            ...authToken, token: '', authenticated: false, buttonText: "Login using GitLab"
        })
    }
    return (<div>
        <Button type={"primary"} danger={authToken.authenticated} icon={<GitlabOutlined/>} onClick={() => {
            if (authToken.authenticated) {
                onLogout()
            } else {
                onLogin()
            }
        }}>
            {authToken.authenticated ? `${gitlabUser.name}` : authToken.buttonText}
        </Button>
    </div>);
};

export default GitLabOAuth;
