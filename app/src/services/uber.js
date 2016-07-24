/*
 * Service: Uber
 */

import crypto from 'crypto';
import querystring from 'querystring';
import { remote, ipcRenderer } from 'electron';

const BrowserWindow = remote.BrowserWindow;

export default (app) => {
    return app.factory('Uber', ($http) => {
        return {
            authorize: (options) => {
                //Build the OAuth consent page URL
                let authWindow = new BrowserWindow({
                    minWidth: 600,
                    minHeight: 835,
                    width: 600,
                    height: 835,
                    show: true,
                    center: true,
                    resizable: true,
                    webPreferences: {
                        nodeIntegration: false
                    },
                    titleBarStyle: 'hidden'
                });

                // Generate request state
                let state = crypto.randomBytes(256).toString('hex')
                // Populate data
                let data = {
                    response_type: 'code',
                    client_id: options.client_id,
                    scope: options.scope,
                    state: state,
                    redirect_uri: options.redirect_url,
                };

                let qs = querystring.stringify(data)
                let authUrl = 'https://login.uber.com/oauth/v2/authorize?' + qs;

                // Get token
                let getAccessToken = (code) => {
                    let data = {
                        grant_type: 'authorization_code',
                        client_id: options.client_id,
                        client_secret: options.client_secret,
                        redirect_uri: options.redirect_url,
                        code: code
                    };

                    let request_data = {
                        method: 'POST',
                        url: 'https://login.uber.com/oauth/v2/token',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        transformRequest: function(obj) {
                            var str = [];
                            for(var p in obj)
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            return str.join("&");
                        },
                        data: data
                    };

                    return $http(request_data)
                        .success((data, status) => {
                            if (status === 200) {
                                return ipcRenderer.send('load-success-page', data.access_token);
                            }
                        })
                        .error(() => {
                            return ipcRenderer.send('open-error-dialog');
                        });
                };

                let handleCallback = (url) => {
                    let raw_code = /code=([^&]*)/.exec(url) || null;
                    let code = (raw_code && raw_code.length > 1) ? raw_code[1] : null;
                    let error = /\?error=(.+)$/.exec(url);

                    if (!code && error) {
                        // Close the browser if has an error
                        authWindow.destroy();
                        return ipcRenderer.send('open-error-dialog');
                    }

                    // If there is a code, proceed to get token from github
                    if (code) {
                        authWindow.destroy();
                        return getAccessToken(code);
                    }
                };

                authWindow.loadURL(authUrl);

                authWindow.webContents.on('will-navigate', (event, url) => {
                    return handleCallback(url);
                });

                authWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
                    return handleCallback(newUrl);
                });

                // If "Done" button is pressed, hide "Loading"
                authWindow.on('close', () => {
                    authWindow = null;
                });
            }
        };
    });
};
