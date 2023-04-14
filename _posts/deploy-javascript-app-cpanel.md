---
title: "Deploy Javascript App to Cpanel"
date: "2023-04-14"
author: "Alfin Surya"
coverImage: "https://images.unsplash.com/photo-1518315064-bec5daa6062b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1257&q=80"
---

*(Gambar diambil dari: [unsplash.com](https://unsplash.com))*

> Overview 
> Provider: [Niaga Hoster](https://www.niagahoster.co.id/),
> NodeJS: Node V.16^ ,
> NextJS (Turborepo): 13

## Deploy NodeJS:
- Setup nodejs app in cpanel
    - Application root: [<domain.com>](domain.com)
- copy `package.json` & `dist/*` -> applications directory
    - Setting main in `package.json` -> `main.js`
-  Login to **ssh**,
    - Setting environment variables(cpanel)
        - `export PATH=$PATH:/opt/alt/alt-nodejs16/root/usr/bin/`
        - Related Issue: (/usr/bin/env: node: No such file or directory)
    - `/opt/alt/alt-nodejs16/root/usr/bin/npm install` (maybe different, in other device e.g /opt/cpanel)
        - Several modules need install manually
            - Bycrpt node-pre-gyp, so install npm install node-gyp first
            - And do npm install again
- Setting app environment
- Go to cpanel (node js app management): **run npm install** and **run js script**
  
## Deploy NextJS:
- Setup nextjs build
    - Set `main:”server.js”` in package.json
    - Create new file server.js in root directory and copy this [server.js gist](https://gist.github.com/natserract/9cfe6ed76483c8f2e74778d8f4bf6058)
    - Add more scripts `"serve:production": "NODE_ENV=production node server.js"` in package.json
      - Set next.config.js
        ```js
        module.exports = ({
            …
            output: "standalone",
            …
        });
        ```
    - `yarn build`
    - Run this script (or check the comment in shared gist above)
       ```shell
        #!/bin/bash
        
        NODE_ENV=production
        rm -r build build.zip
        yarn build && mkdir build
        cp -R ./.next/standalone/node_modules ./.next/standalone/packages build
        cp -R server.js package.json build
        mkdir build/out
        cp -R ./.next/standalone/apps/web/.next/* build/out
        zip -r build.zip ./build
        ```
- Setup node js app cpanel
    - Application root: [<domain.com>](domain.com)
    - Application startup: `server.js`
    - Add environment
        - **HOSTNAME**, **PORT**
        - Upload & extract build.zip to file manager
    - **run npm install** and **run js script**

## Notes:
- Issue: **Can't acquire lock for app public_html/domain.com**
    - Go to /home/<your_username>/nodevenv/public_html/<domain.com>/
    - **Then remove .lock**
- Issue: **number of process full**
    - `kill -9 $(ps faux | grep node | grep -v grep | awk {'print $2'})`
    - [https://stackoverflow.com/questions/56825540/high-process-count-on-cpanel-hosted-node-js-app-and-increasing](https://stackoverflow.com/questions/56825540/high-process-count-on-cpanel-hosted-node-js-app-and-increasing)

## Further reading:
- [https://support.niagahoster.co.id/cara-install-node-js-melalui-cpanel/](https://support.niagahoster.co.id/cara-install-node-js-melalui-cpanel/)