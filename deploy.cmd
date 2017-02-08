:: 3. Install npm packages
IF EXIST "%DEPLOYMENT_TARGET%\package.json" (
pushd "%DEPLOYMENT_TARGET%"
call :ExecuteCmd !NPM_CMD! install --production
IF !ERRORLEVEL! NEQ 0 goto error
popd
)
:: 4. webpack
IF EXIST "%DEPLOYMENT_TARGET%\webpack.config.js" (
pushd "%DEPLOYMENT_TARGET%"
call :ExecuteCmd !NPM_CMD! run webpack
IF !ERRORLEVEL! NEQ 0 goto error
popd
)