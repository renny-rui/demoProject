@echo off
echo Starting deployment to 192.168.31.131...

:: You may need to update these variables
set SERVER_USER=renny-rui
set SERVER_IP=192.168.31.131
set REMOTE_PATH=/usr/share/nginx/html
set NGINX_CONF_PATH=/etc/nginx/conf.d/vue-app.conf

:: Make sure we have a dist folder
if not exist dist (
  echo Building the project...
  call npm run build
  if errorlevel 1 (
    echo Build failed!
    exit /b 1
  )
)

echo Copying files to server...

:: We're using the Windows built-in SSH tools
echo Using Windows SSH tools for file transfer...

:: Create the directory if it doesn't exist
ssh.exe %SERVER_USER%@%SERVER_IP% "mkdir -p %REMOTE_PATH%"

:: Copy the distribution files
scp.exe -r dist\* %SERVER_USER%@%SERVER_IP%:%REMOTE_PATH%
if errorlevel 1 (
  echo Deployment of app files failed!
  exit /b 1
)

:: Copy the nginx configuration
scp.exe nginx.conf %SERVER_USER%@%SERVER_IP%:%NGINX_CONF_PATH%
if errorlevel 1 (
  echo Deployment of nginx config failed!
  exit /b 1
)

echo Restarting Nginx on the server...
ssh.exe %SERVER_USER%@%SERVER_IP% "sudo nginx -t && sudo systemctl restart nginx"

echo Deployment completed successfully!
echo Your application is now available at http://%SERVER_IP%/
